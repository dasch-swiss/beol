import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ResourceService,
    SearchService
} from '@knora/core';
import { BeolService } from '../services/beol.service';
import { JsonObject, JsonProperty } from 'json2typescript';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare let require: any;
const jsonld = require('jsonld');

export interface IntroProps {
    'title': ReadPropertyItem[];
    'text': ReadPropertyItem[];
}

export interface Introduction {

    name: string;

    label: string;

    children?: Introduction[];
}

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    id: string;
    iri: string;
    project: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    errorMessage;

    KnoraConstants = KnoraConstants;

    list: Introduction[];

    props: IntroProps;

    // current index of introduction
    curIndex: number;
    curChildIndex: number;

    isLoading = true;

    propIris: any = {
        'title': environment.externalApiURL + '/ontology/0801/beol/v2#sectionHasTitle',
        'text': environment.externalApiURL + '/ontology/0801/beol/v2#hasText',
    };

    constructor(private _route: ActivatedRoute,
        private _http: HttpClient,
        private _router: Router,
        private _searchService: SearchService,
        private _beol: BeolService,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        public location: Location) {

    }

    ngOnInit() {

        const intro  = require('../../assets/data/introduction.json');
        this.list = <Introduction[]> intro.introductions;

        this._route.params.subscribe((params: Params) => {
            this.project = params['project'];
            this.id = params['id'];

            this.searchForBook(this.id);
        });

    }

    searchForBook(id: string): void {

        const gravsearch: string = this._beol.searchForIntroductionById(id);

        this._searchService.doExtendedSearch(gravsearch).subscribe(
            (result: ApiServiceResult) => {

                const promises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                const promise = promises.compact(result.body, {});

                promise.then((compacted) => {

                    const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    if (resourceSeq.resources.length === 1) {
                        // console.log('we got a resource sequence ', resourceSeq.resources);
                        this.requestResource(resourceSeq.resources[0].id);
                    }

                }, function (err) {

                    console.log('JSONLD of full resource request could not be expanded:' + err);
                });

            }
        );

    }

    /**
     * Requests a resource from Knora.
     *
     * @param iri the Iri of the resource to be requested.
     */
    private requestResource(iri: string): void {

        this._resourceService.getResource(iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    const promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length === 1) {

                            // get resource class Iris from response
                            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // console.log(resourceClassIris)

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: OntologyInformation) => {

                                    // console.log(JSON.stringify(resourceClassInfos.getResourceClasses()))

                                    // initialize ontology information
                                    this.ontologyInfo = resourceClassInfos;

                                    this.resource = resourceSeq.resources[0];
                                    // console.log('resource: ', this.resource);

                                    this.props = {
                                        title: [],
                                        text: []
                                    };

                                    for (const key in this.resource.properties) {
                                        if (this.resource.properties.hasOwnProperty(key)) {
                                            for (const val of this.resource.properties[key]) {
                                                switch (val.propIri) {
                                                    case this.propIris.title:
                                                        this.props.title.push(val);
                                                        break;

                                                    case this.propIris.text:
                                                        this.props.text.push(val);
                                                        break;

                                                    default:
                                                    // do nothing
                                                }
                                            }
                                        }
                                    }
                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`;

                        }

                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    toggleChildren(index: number) {
        this.curIndex = (index === this.curIndex ? undefined : index);
        // reset grand children
        this.curChildIndex = undefined;
    }

    toggleGrandChildren(index: number) {
        this.curChildIndex = (index === this.curChildIndex ? undefined : index);
    }

}
