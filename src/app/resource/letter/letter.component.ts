import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    DateSalsah,
    IncomingService,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ResourceService
} from '@knora/core';
import { BeolResource } from '../beol-resource';
import { Subscription } from 'rxjs';

declare let require: any;
let jsonld = require('jsonld');

interface LetterProps {
    'author': ReadPropertyItem[];
    'recipient': ReadPropertyItem[];
    'figure': ReadPropertyItem[];
    'date': DateSalsah;
    'subject': ReadPropertyItem[];
    'text': ReadPropertyItem[];
    'mentionedPerson': ReadPropertyItem[];
    'language': ReadPropertyItem[];
    'number': string;
    'original': ReadPropertyItem[];
    'repertorium': string;
    'translation': ReadPropertyItem[];
    'published': ReadPropertyItem[];
    'replyTo': ReadPropertyItem[];
    'location': string;
    'title': ReadPropertyItem[];
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

    propIris: any = {
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
        public location: Location) {

        super(_resourceService, _cacheService, _incomingService);

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

        this.props = {
            author: [],
            recipient: [],
            figure: [],
            date: new DateSalsah(),
            subject: [],
            text: [],
            mentionedPerson: [],
            language: [],
            number: '',
            original: [],
            repertorium: '',
            translation: [],
            published: [],
            replyTo: [],
            location: '',
            title: []
        };

        // props list
        for (const key in this.resource.properties) {
            if (this.resource.properties.hasOwnProperty(key)) {
                for (const val of this.resource.properties[key]) {
                    switch (val.propIri) {
                        case this.propIris.author:
                            this.props.author.push(val);
                            break;

                        case this.propIris.recipient:
                            this.props.recipient.push(val);
                            break;

                        case this.propIris.figure:
                            this.props.figure.push(val);
                            break;

                        case this.propIris.date:
                            this.props.date = val.getDate();
                            break;

                        case this.propIris.subject:
                            this.props.subject.push(val);
                            break;

                        case this.propIris.text:
                            this.props.text.push(val);
                            break;

                        case this.propIris.mentionedPerson:
                            this.props.mentionedPerson.push(val);
                            break;

                        case this.propIris.language:
                            this.props.language.push(val);
                            break;

                        case this.propIris.number:
                            this.props.number = val.getContent();
                            break;

                        case this.propIris.original:
                            this.props.original.push(val);
                            break;

                        case this.propIris.repertorium:
                            this.props.repertorium = val.getContent();
                            break;

                        case this.propIris.translation:
                            this.props.translation.push(val);
                            break;

                        case this.propIris.published:
                            this.props.published.push(val);
                            break;

                        case this.propIris.replyTo:
                            this.props.replyTo.push(val);
                            break;

                        case this.propIris.location:
                            this.props.location = val.getContent();
                            break;

                        case this.propIris.title:
                            this.props.title.push(val);
                            break;

                        default:
                        // do nothing
                    }
                }
            }
        }

    };

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
