import { Component } from '@angular/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadIntegerValue,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ReadTextValue,
    ResourceService,
    SearchService
} from '@knora/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BeolService } from '../../services/beol.service';
import { Subscription } from 'rxjs';
import { AppInitService } from '../../app-init.service';

class TranscriptionProps implements PropertyValues {
    text: ReadTextValue[] = [];
    layer: ReadIntegerValue[] = [];
    transcriptionOf: ReadLinkValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-transcription',
    templateUrl: './transcription.component.html',
    styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    otherLayers: ReadResource[] = [];

    propIris: PropIriToNameMapping = {
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'layer': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#layer',
        'transcriptionOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#transcriptionOfValue'

    };

    props: TranscriptionProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                private _searchService: SearchService,
                public location: Location,
                protected _beolService: BeolService,
                private _appInitService: AppInitService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);
    }

    initProps() {

        const props = new TranscriptionProps();

        this.mapper(props);

        this.props = props;

        this.getOtherLayersForManuscriptEntry();

    }

    getOtherLayersForManuscriptEntry() {

        if (this.props.transcriptionOf.length !== 1 || this.props.layer.length !== 1) {
            return;
        }

        const otherLayersForManEntry =
            this._beolService.getTranscriptionsForManuscriptEntry(this.props.transcriptionOf[0].referredResourceIri, this.props.layer[0].integer, true);

        this._searchService.doExtendedSearchReadResourceSequence(otherLayersForManEntry).subscribe(
            (otherLayers: ReadResourcesSequence) => {
                if (otherLayers.numberOfResources > 0) {
                    this.otherLayers = otherLayers.resources;
                }
            }
        );
    }

    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }

    goToResource(resType: string, resIri: string) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
