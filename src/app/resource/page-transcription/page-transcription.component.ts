import { Component, Inject} from '@angular/core';
import { Location } from '@angular/common';
import { BeolCompoundResource, BeolResource, PropIriToNameMapping } from '../beol-resource';
import { Constants, KnoraApiConnection, ReadResource } from '@dasch-swiss/dsp-js';
import { Subscription } from 'rxjs';
import { AppInitService, DspApiConnectionToken } from '../../dsp-ui-lib/core';
import { ActivatedRoute } from '@angular/router';
import { IncomingService } from '../../services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { MatDialog } from '@angular/material/dialog';
import { ArkUrlDialogComponent } from '../../dialog/ark-url-dialog.component';

@Component({
  selector: 'app-page-transcription',
  templateUrl: './page-transcription.component.html',
  styleUrls: ['./page-transcription.component.scss']
})
export class PageTranscriptionComponent extends BeolResource {
    isLoading = true;
    versionArkUrl: string;
    dspConstants: Constants;
    errorMessage: any;
    incomingStillImageRepresentationCurrentOffset: number;
    iri: string;
    navigationSubscription: Subscription;
    propIris: PropIriToNameMapping;
    resource: BeolCompoundResource | any;
    previousPage: ReadResource | any;
    nextPage: ReadResource | any;
    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        protected _beolService: BeolService,
        private _appInitService: AppInitService,
        public location: Location,
        public dialog: MatDialog
    ) {
        super(_dspApiConnection, _route, _incomingService, _beolService);
        setTimeout(() => {
            this.isLoading = false;
            this.previousPage = {label: "previous"};
            this.nextPage = {label: "next"};
            this.resource = {readResource: {label: "Med_Ms_p0002"}};
        }, 1000);
        // this.isLoading = false;
    }

    openDialog(arkURL: string) {
        this.dialog.open(ArkUrlDialogComponent, {
            hasBackdrop: true,
            width: '500px',
            data: {
                arkURL: arkURL
            }
        });
    }

    initProps(): void {
    }

    goToResource(resType: string, resIri: string, res) {
        // this._beolService.routeByResourceType(resType, resIri, res);
    }
}
