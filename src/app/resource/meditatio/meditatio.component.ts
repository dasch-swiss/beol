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

        // check if there is an active region (submitted as a parameter)
        const activeRegionIri = this.params.get('region');

        if (activeRegionIri !== null) {
            this.activeRegion = activeRegionIri;
            this.getTranscription(activeRegionIri);
        }
    }

    private getTranscription(regionIri: string) {

        const gravsearchQuery: string = this._beolService.getTranscriptionIrisForRegion(regionIri);

        this._searchService.doExtendedSearchReadResourceSequence(gravsearchQuery).subscribe(
            (transcriptions: ReadResourcesSequence) => {
                if (transcriptions.numberOfResources === 1) {
                    // get transcription associated to region
                    this._resourceService.getReadResource(transcriptions.resources[0].id).subscribe(
                        (result: ReadResourcesSequence) => {

                            // initialize ontology information
                            this.ontologyInfo.updateOntologyInformation(result.ontologyInformation);

                            this.transcription =
                               result.resources[0].properties[this.apiUrl + '/ontology/0801/beol/v2#hasText'][0] as ReadTextValueAsHtml;
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
            },
            (err) => {
                console.log('Could not load transcription for active region');
            }
        );
    }

    regionActive(regionIri: string) {
        this._beolService.routeToPageWithActiveRegion(regionIri);
    }

    goToResource(resType: string, resIri: string) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
