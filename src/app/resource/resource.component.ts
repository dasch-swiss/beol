import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    ImageRegion,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ReadStillImageFileValue,
    ResourceService,
    SearchService,
    StillImageRepresentation,
    Utils
} from '@knora/core';
import { RequestStillImageRepresentations } from '@knora/viewer';
import { BeolResource } from './beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../services/beol.service';

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss']
})
export class ResourceComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;
    navigationSubscription: Subscription;

    propIris;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        protected _resourceService: ResourceService,
        protected _cacheService: OntologyCacheService,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService) {

        super(_resourceService, _cacheService, _incomingService, _beolService);

        this._route.params.subscribe((params: Params) => {
            this.iri = params['id'];
        });

        // subscribe to the router events
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // if it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.getResource(this.iri);
            }
        });
    }

    initProps() {
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
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
