import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadDateValue,
    ReadLinkValue,
    ReadListValue, ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';

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

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.scss']
})
export class LetterComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    propIris: PropIriToNameMapping = {
        'id': this.apiUrl + '/ontology/0801/beol/v2#beolIDs',
        'date': this.apiUrl + '/ontology/0801/beol/v2#creationDate',
        'author': this.apiUrl + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this.apiUrl + '/ontology/0801/beol/v2#hasRecipientValue',
        'figure': this.apiUrl + '/ontology/0801/beol/v2#hasFigureValue',
        'subject': this.apiUrl + '/ontology/0801/beol/v2#hasSubject',
        'text': this.apiUrl + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this.apiUrl + '/ontology/0801/beol/v2#mentionsPersonValue',
        'language': this.apiUrl + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': this.apiUrl + '/ontology/0801/beol/v2#letterHasNumber',
        'original': this.apiUrl + '/ontology/0801/beol/v2#letterHasOriginalValue',
        'repertorium': this.apiUrl + '/ontology/0801/beol/v2#letterHasRepertoriumNumber',
        'translation': this.apiUrl + '/ontology/0801/beol/v2#letterHasTranslationValue',
        'published': this.apiUrl + '/ontology/0801/beol/v2#letterIsPublishedValue',
        'replyTo': this.apiUrl + '/ontology/0801/beol/v2#letterIsReplyToValue',
        'location': this.apiUrl + '/ontology/0801/beol/v2#location',
        'title': this.apiUrl + '/ontology/0801/beol/v2#title',
        'standoff': this.apiUrl + '/ontology/knora-api/v2#hasStandoffLinkToValue'
    };

    props: LetterProps;

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

        // subscribe to the router events to reload the content
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // if it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.getResource(this.iri);
            }
        });
    }

    initProps() {

        const props = new LetterProps();

        this.mapper(props);

        this.props = props;

    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

}
