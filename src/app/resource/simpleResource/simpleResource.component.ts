import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadResource,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '@dasch-swiss/dsp-ui';
import { OntologyCacheService } from '@knora/core';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { BeolResource } from './../beol-resource';

@Component({
    selector: 'app-simple-resource',
    templateUrl: './simpleResource.component.html',
    styleUrls: ['./simpleResource.component.scss']
})
export class SimpleResourceComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    DspConstants = Constants;
    navigationSubscription: Subscription;

    propIris;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _cacheService: OntologyCacheService,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService) {

        super(_dspApiConnection, _route, _cacheService, _incomingService, _beolService);
    }

    initProps() {

    }

    /**
     * Display incoming links as clickable links
     *
     * @param resIri
     * @param resType
     */
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }

}
