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
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BeolService } from '../../services/beol.service';
import { Subscription } from 'rxjs';

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

    propIris: PropIriToNameMapping = {
        'text': this.apiUrl + '/ontology/0801/beol/v2#hasText',
        'layer': this.apiUrl + '/ontology/0801/beol/v2#layer',
        'transcriptionOf': this.apiUrl + '/ontology/0801/beol/v2#transcriptionOfValue'

    };

    props: TranscriptionProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);
    }

    initProps() {

        const props = new TranscriptionProps();

        this.mapper(props);

        this.props = props;

        console.log(this.props);
    }

    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
