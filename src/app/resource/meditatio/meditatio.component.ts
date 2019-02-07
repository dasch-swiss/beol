import { Component } from '@angular/core';
import { BeolResource } from '../beol-resource';
import {
    ApiServiceError,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadLinkValue,
    ReadResource,
    ReadResourcesSequence,
    ReadTextValueAsHtml,
    ResourceService,
    SearchService
} from '@knora/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BeolService } from '../../services/beol.service';

@Component({
    selector: 'app-meditatio',
    templateUrl: './meditatio.component.html',
    styleUrls: ['./meditatio.component.scss']
})
export class MeditatioComponent extends BeolResource {

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
    manuscriptEntries: ReadResource[] = [];

    activeRegion: string;

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

        this._searchService.doExtendedSearchReadResourceSequence(gravsearchQuery).subscribe(
            (result: ReadResourcesSequence) => {

                // initialize ontology information
                this.ontologyInfo.updateOntologyInformation(result.ontologyInformation);

                for (const trans of result.resources) {
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
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );
    }

    private getTranscription(regionIri: string) {

        this.isLoading = true;
        const transcrIri = this.regionToTranscription[regionIri];

        if (transcrIri !== undefined) {

            // get transcription associated to region
            this._resourceService.getReadResource(transcrIri).subscribe(
                (result: ReadResourcesSequence) => {

                    // initialize ontology information
                    this.ontologyInfo.updateOntologyInformation(result.ontologyInformation);

                    this.transcription =
                        result.resources[0].properties[this.apiUrl + '/ontology/0801/beol/v2#hasText'][0] as ReadTextValueAsHtml;
                    this.isLoading = false;
                },
                (error) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );

            const manuscriptEntriesQuery = this._beolService.getManuscriptEntryForRegion(regionIri);

            this._searchService.doExtendedSearchReadResourceSequence(manuscriptEntriesQuery).subscribe(
                (manEntries: ReadResourcesSequence) => {
                    if (manEntries.numberOfResources > 0) {
                        this.manuscriptEntries = manEntries.resources;
                    }
                }
            );
        }
    }

    regionActive(regionIri: string) {
        this.activeRegion = regionIri;
        this.getTranscription(regionIri);
    }

    goToResource(resType: string, resIri: string) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
