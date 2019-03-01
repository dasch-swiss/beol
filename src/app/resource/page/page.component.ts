import { Component } from '@angular/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
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
    SearchService,
    ReadTextValue,
    ReadPropertyItem,
    ReadIntegerValue
} from '@knora/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

class PageProps implements PropertyValues {

    pagenum: ReadTextValue[] = [];
    seqnum: ReadIntegerValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;
    navigationSubscription: Subscription;

    propIris: PropIriToNameMapping = {
        'pagenum': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#pagenum',
        'seqnum': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#seqnum',
    };

    props: PageProps;

    transcription: ReadTextValueAsHtml;
    transcriptionBelongsToRegion: ReadLinkValue;
    manuscriptEntry: ReadLinkValue;
    transcriptionsForManuscriptEntry: ReadResource[] = [];

    activeRegion: string;

    constructor(protected _route: ActivatedRoute,
                private _router: Router,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                protected _beolService: BeolService,
                private _searchService: SearchService,
                public location: Location,
                private _appInitService: AppInitService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);
    }

    initProps() {

        const props = new PageProps();

        this.mapper(props);

        this.props = props;

        // check if there is an active region (submitted as a parameter)
        const activeRegionIri = this.params.get('region');

        if (activeRegionIri !== null) {
            this.activeRegion = activeRegionIri;
            this.getTranscription(activeRegionIri);
        }
    }

    private getTranscription(regionIri: string) {

        const gravsearchQuery: string = this._beolService.getTranscriptionIriForRegion(regionIri);

        this._searchService.doExtendedSearchReadResourceSequence(gravsearchQuery).subscribe(
            (transcriptions: ReadResourcesSequence) => {
                if (transcriptions.numberOfResources === 1) {
                    // get transcription associated to region
                    this._resourceService.getReadResource(transcriptions.resources[0].id).subscribe(
                        (transcr: ReadResourcesSequence) => {

                            // initialize ontology information
                            this.ontologyInfo.updateOntologyInformation(transcr.ontologyInformation);

                            this.transcriptionBelongsToRegion = transcr.resources[0].properties[this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#belongsToRegionValue'][0] as ReadLinkValue;

                            this.manuscriptEntry = transcr.resources[0].properties[this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#transcriptionOfValue'][0] as ReadLinkValue;

                            this.transcription =
                                transcr.resources[0].properties[this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText'][0] as ReadTextValueAsHtml;

                            const transcriptionsFormManuscriptEntry = this._beolService.getTranscriptionsForManuscriptEntry(this.manuscriptEntry.referredResourceIri, 0);

                            this._searchService.doExtendedSearchReadResourceSequence(transcriptionsFormManuscriptEntry).subscribe(
                                (manEntries: ReadResourcesSequence) => {
                                    if (manEntries.numberOfResources > 0) {
                                        this.transcriptionsForManuscriptEntry = manEntries.resources;
                                    }
                                }
                            );
                        },
                        (error) => {
                            this.errorMessage = <any>error;
                            this.isLoading = false;
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
