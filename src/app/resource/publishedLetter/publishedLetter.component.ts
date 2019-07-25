import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService,
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

class PublishedLetterProps implements PropertyValues {
    letterNumber: ReadTextValue[] = [];
    startPage: ReadTextValue[] = [];
    endPage: ReadTextValue[] = [];
    isPublishedIn: ReadLinkValue[] = [];
    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-publishedLetter',
    templateUrl: './publishedLetter.component.html',
    styleUrls: ['./publishedLetter.component.scss']
})
export class PublishedLetterComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'isPublishedIn': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPublishedInValue',
        'letterNumber': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterNumber"',
        'startPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterStartPage',
        'endPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publishedLetterEndPage'
    };

    props: PublishedLetterProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                private _appInitService: AppInitService
    ) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new PublishedLetterProps();

        this.mapper(props);

        this.props = props;
        console.log(this.props.letterNumber[0].getContent());
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
