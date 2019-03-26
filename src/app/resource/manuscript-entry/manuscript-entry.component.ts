import { Component, OnInit } from '@angular/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import {
    IncomingService,
    KnoraConstants, OntologyCacheService,
    OntologyInformation,
    ReadIntegerValue,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource, ReadResourcesSequence,
    ReadTextValue, ResourceService, SearchService
} from '@knora/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BeolService } from '../../services/beol.service';
import { Location } from '@angular/common';
import { AppInitService } from '../../app-init.service';

class ManuscriptEntryProps implements PropertyValues {

    title: ReadTextValue[] = [];
    seqnum: ReadIntegerValue[] = [];
    manuscriptEntryOf: ReadLinkValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-manuscript-entry',
    templateUrl: './manuscript-entry.component.html',
    styleUrls: ['./manuscript-entry.component.scss']
})
export class ManuscriptEntryComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;
    navigationSubscription: Subscription;

    propIris: PropIriToNameMapping = {
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#title',
        'seqnum': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#seqnum',
        'manuscriptEntryOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#manuscriptEntryOfValue'
    };

    props: ManuscriptEntryProps;

    transcriptions: ReadResource[] = [];

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

        const props = new ManuscriptEntryProps();

        this.mapper(props);

        this.props = props;

        this.getTranscriptions();
    }

    private getTranscriptions() {

        const titleRegionTranscriptionQuery = this._beolService.getTitleRegionTranscriptionForManuscriptEntry(this.iri);

        const criticalLayersQuery = this._beolService.getTranscriptionsForManuscriptEntry(this.iri, 0, false);

        this._searchService.doExtendedSearchReadResourceSequence(titleRegionTranscriptionQuery).subscribe(
            (titleRegionTranscr) => {
                this._searchService.doExtendedSearchReadResourceSequence(criticalLayersQuery).subscribe(
                    (transcriptions: ReadResourcesSequence) => {
                        this.transcriptions = titleRegionTranscr.resources.concat(transcriptions.resources);
                    }
                );
            }
        );

    }

    goToResource(resType: string, resIri: string) {
        this._beolService.routeByResourceType(resType, resIri);
    }

}
