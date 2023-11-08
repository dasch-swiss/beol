import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadResource,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '../../dsp-ui-lib/core';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { BeolCompoundResource, BeolResource } from './../beol-resource';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-simple-resource',
    templateUrl: './simpleResource.component.html',
    styleUrls: ['./simpleResource.component.scss']
})
export class SimpleResourceComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    dspConstants = Constants;
    navigationSubscription: Subscription;

    propIris;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        protected _snackBar: MatSnackBar
        ) {

        super(_dspApiConnection, _route, _incomingService, _beolService, _snackBar);
    }

    initProps() {

    }

    /**
     * Display incoming links as clickable links
     *
     * @param resIri
     * @param resType
     */
    showIncomingRes(resIri, resType, res) {
        this._beolService.routeByResourceType(resType, resIri, res);
    }

}
