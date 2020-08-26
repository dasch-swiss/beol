import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadIntValue,
    ReadLinkValue,
    ReadResource,
    ReadResourceSequence,
    ReadTextValue,
    ReadValue,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '@dasch-swiss/dsp-ui';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { AppInitService } from '../../app-init.service';
import { BeolService } from '../../services/beol.service';
import { BeolCompoundResource, BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';

class TranscriptionProps implements PropertyValues {
    text: ReadTextValue[] = [];
    layer: ReadIntValue[] = [];
    transcriptionOf: ReadLinkValue[] = [];
    belongsToRegion: ReadLinkValue[] = [];

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-transcription',
    templateUrl: './transcription.component.html',
    styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;

    otherLayers: ReadResource[] = [];

    propIris: PropIriToNameMapping = {
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'layer': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#layer',
        'transcriptionOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#transcriptionOfValue',
        'belongsToRegion': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#belongsToRegionValue'

    };

    props: TranscriptionProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService) {

        super(_dspApiConnection, _route, _incomingService, _beolService);
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
            this._beolService.getTranscriptionsForManuscriptEntry(
                this.props.transcriptionOf[0].linkedResourceIri,
                this.props.layer[0].int, true
            );

        this._dspApiConnection.v2.search.doExtendedSearch(otherLayersForManEntry).subscribe(
            (otherLayers: ReadResourceSequence) => {
                if (otherLayers.resources.length > 0) {
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
