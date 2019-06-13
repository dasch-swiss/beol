import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadDateValue,
    ReadLinkValue,
    ReadListValue,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';
import { AppInitService, TeiConfigElement } from '../../app-init.service';

class LetterProps implements PropertyValues {
    id: ReadTextValue[] = [];
    author: ReadLinkValue[] = [];
    recipient: ReadLinkValue[] = [];
    figure: ReadLinkValue[] = [];
    date: ReadDateValue[] = [];
    subject: ReadListValue[] = [];
    text: ReadTextValue[] = [];
    mentionedPerson: ReadLinkValue[] = [];
    language: ReadTextValue[] = [];
    number: ReadTextValue[] = [];
    original: ReadLinkValue[] = [];
    repertorium: ReadTextValue[] = [];
    translation: ReadLinkValue[] = [];
    published: ReadLinkValue[] = [];
    replyTo: ReadLinkValue[] = [];
    location: ReadTextValue[] = [];
    title: ReadTextValue[] = [];
    sysnum: ReadTextValue[] = [];
    comment: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.scss']
})
export class LetterComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    ontologyIri = this._appInitService.getSettings().ontologyIRI;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'date': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#creationDate',
        'author': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasRecipientValue',
        'figure': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasFigureValue',
        'subject': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasSubject',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#mentionsPersonValue',
        'language': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasNumber',
        'original': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasOriginalValue',
        'repertorium': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasRepertoriumNumber',
        'translation': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasTranslationValue',
        'published': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterIsPublishedValue',
        'replyTo': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterIsReplyToValue',
        'location': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#location',
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#title',
        'sysnum': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasSystemNumber',
        'standoff': this._appInitService.getSettings().ontologyIRI + '/ontology/knora-api/v2#hasStandoffLinkToValue',
        'comment': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#comment'
    };

    props: LetterProps;

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

        const props = new LetterProps();

        this.mapper(props);

        this.props = props;

    }

    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }

}
