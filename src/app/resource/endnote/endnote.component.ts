import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection, ReadLinkValue,
    ReadTextValue,
    ReadValue,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken, AppInitService } from '../../dsp-ui-lib/core';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { BeolCompoundResource, BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

class EndnoteProps implements PropertyValues {
    number: ReadTextValue[] = [];
    text: ReadTextValue[] = [];
    figure: ReadLinkValue[] = [];

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-endnote',
    templateUrl: './endnote.component.html',
    styleUrls: ['./endnote.component.scss']
})
export class EndnoteComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;

    propIris: PropIriToNameMapping = {
        'number': this._appInitService.config['ontologyIRI'] + '/ontology/0801/beol/v2#endnoteHasNumber',
        'text': this._appInitService.config['ontologyIRI'] + '/ontology/0801/beol/v2#hasText',
        'figure': this._appInitService.config['ontologyIRI'] + '/ontology/0801/beol/v2#hasFigureValue'
    };

    props: EndnoteProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService,
        protected _snackBar: MatSnackBar
    ) {

        super(_dspApiConnection, _route, _incomingService, _beolService, _snackBar);

    }

    initProps() {

        const props = new EndnoteProps();

        this.mapper(props);

        this.props = props;
    }

}
