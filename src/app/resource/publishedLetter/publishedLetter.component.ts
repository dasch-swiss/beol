import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadLinkValue,
    ReadResource,
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

class PublishedLetterProps implements PropertyValues {
    publishedLetterNumber: ReadTextValue[] = [];
    startPage: ReadTextValue[] = [];
    endPage: ReadTextValue[] = [];
    isPublishedIn: ReadLinkValue[] = [];
    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-publishedLetter',
    templateUrl: './publishedLetter.component.html',
    styleUrls: ['./publishedLetter.component.scss']
})
export class PublishedLetterComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'isPublishedIn': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPublishedInValue',
        'publishedLetterNumber': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterNumber',
        'startPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterStartPage',
        'endPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterEndPage'
    };

    props: PublishedLetterProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService
    ) {

        super(_dspApiConnection, _route, _incomingService, _beolService);

    }

    initProps() {

        const props = new PublishedLetterProps();

        this.mapper(props);

        this.props = props;
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
