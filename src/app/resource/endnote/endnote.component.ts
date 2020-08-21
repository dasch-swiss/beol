import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadResource,
    ReadTextValue,
    ReadValue,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '@dasch-swiss/dsp-ui';
import { OntologyCacheService } from '@knora/core';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { AppInitService } from '../../app-init.service';
import { BeolService } from '../../services/beol.service';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';

class EndnoteProps implements PropertyValues {
    number: ReadTextValue[] = [];
    text: ReadValue[] = [];
    figure: ReadValue[] = [];

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-endnote',
    templateUrl: './endnote.component.html',
    styleUrls: ['./endnote.component.scss']
})
export class EndnoteComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    DspConstants = Constants;

    propIris: PropIriToNameMapping = {
        'number': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#endnoteHasNumber',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'figure': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasFigureValue'
    };

    props: EndnoteProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        protected _cacheService: OntologyCacheService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService
    ) {

        super(_dspApiConnection, _route, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new EndnoteProps();

        this.mapper(props);

        this.props = props;
    }

}
