import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeolResource } from '../beol-resource';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadResource, ReadResourcesSequence,
    ResourceService,
    SearchService,
    ReadTextValueAsHtml,
    ReadLinkValue
} from '@knora/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BeolService } from '../../services/beol.service';


declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'app-meditatio',
    templateUrl: './meditatio.component.html',
    styleUrls: ['./meditatio.component.scss']
})
export class MeditatioComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;
    navigationSubscription: Subscription;

    propIris;

    regionToTranscription = {};
    transcriptionIrisReady = false;
    transcription: ReadTextValueAsHtml;

    constructor(protected _route: ActivatedRoute,
                private _router: Router,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                protected _beolService: BeolService,
                private _searchService: SearchService,
                public location: Location) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);
    }

    initProps() {

        const gravsearchQuery = this._beolService.getTranscriptionIrisForPage(this.iri, 0);

        this._searchService.doExtendedSearch(gravsearchQuery).subscribe(
            (result: ApiServiceResult) => {

                const promises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                const promise = promises.compact(result.body, {});

                promise.then((compacted) => {

                    const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // get resource class Iris from response
                    const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                    // request ontology information about resource class Iris (properties are implied)
                    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                        (resourceClassInfos: OntologyInformation) => {

                            // initialize ontology information
                            this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                            for (const trans of resourceSeq.resources) {
                                const linkVal =
                                    trans.properties[this.apiUrl + '/ontology/0801/beol/v2#transcriptionOfValue'][0] as ReadLinkValue;

                                this.regionToTranscription[linkVal.referredResourceIri] = trans.id;
                            }

                            this.transcriptionIrisReady = true;

                            // check if there is an active region (submitted as a parameter)
                            const activeRegionIri = this.params.get('region');

                            if (activeRegionIri !== null) {
                                this.regionActive(activeRegionIri);
                            }

                        },
                        (err) => {

                            console.log('cache request failed: ' + err);
                        });


                }, function (err) {

                    console.log('JSONLD of full resource request could not be expanded:' + err);
                });

            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );


    }

    private getTranscription(regionIri: string) {

        const transcrIri = this.regionToTranscription[regionIri];

        if (transcrIri !== undefined) {

            // get transcription associated to region
            this._resourceService.getResource(transcrIri).subscribe(
                (result: ApiServiceResult) => {
                    const promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                            const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                            // get resource class Iris from response
                            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: OntologyInformation) => {

                                    // initialize ontology information
                                    this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                    this.transcription =
                                        resourceSeq.resources[0].properties[this.apiUrl + '/ontology/0801/beol/v2#hasText'][0] as ReadTextValueAsHtml;

                                },
                                (err) => {
                                    console.error('cache request failed');
                                });
                        },
                        (err) => {
                            console.log('JSONLD of full resource request could not be expanded:' + err);
                        }
                    );
                },
                () => {

                }
            );
        }
    }

    regionActive(regionIri: string) {

        this.getTranscription(regionIri);

    }
}
