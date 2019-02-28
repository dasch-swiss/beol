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
import { AppInitService } from '../../app-init.service';

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

    propIris: PropIriToNameMapping = {
        'id': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'date': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#creationDate',
        'author': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasRecipientValue',
        'figure': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasFigureValue',
        'subject': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasSubject',
        'text': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#mentionsPersonValue',
        'language': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterHasNumber',
        'original': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterHasOriginalValue',
        'repertorium': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterHasRepertoriumNumber',
        'translation': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterHasTranslationValue',
        'published': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterIsPublishedValue',
        'replyTo': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#letterIsReplyToValue',
        'location': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#location',
        'title': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#title',
        'sysnum': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasSystemNumber',
        'standoff': AppInitService.settings.ontologyIRI + '/ontology/knora-api/v2#hasStandoffLinkToValue'
    };

    props: LetterProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService) {

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
