import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BeolCompoundResource, BeolResource } from './beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../services/beol.service';
import { DspApiConnectionToken } from '../dsp-ui-lib/core';
import { Constants, KnoraApiConnection, ReadResource } from '@dasch-swiss/dsp-js';
import { IncomingService } from '../services/incoming.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss']
})
export class ResourceComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    dspConstants = Constants;
    navigationSubscription: Subscription;

    propIris;

    constructor(@Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
                protected _route: ActivatedRoute,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                protected _snackBar: MatSnackBar
    ) {

        super(_dspApiConnection, _route, _incomingService, _beolService, _snackBar);
    }

    initProps() {

        this.mapToComponent(this.resource.readResource.type, this.iri, this.resource.readResource);

    }

    mapToComponent(referredResourceType: string, referredResourceIri: string, referedResource: ReadResource): void {
        this._beolService.routeByResourceType(referredResourceType, referredResourceIri, referedResource);
    }

}
