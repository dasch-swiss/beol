import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    DateSalsah,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ResourceService,
    ReadDateValue,
    DateRangeSalsah,
} from '@knora/core';
import { Subscription } from 'rxjs';
import { BeolResource } from '../beol-resource';

interface BiblioItemsProps {
    'startPage': string;
    'endPage': string;
    'mentionedIn': ReadPropertyItem[];
    'comment': ReadPropertyItem[];
    'isPartOfJournal': ReadPropertyItem[];
    'isPartOfCollection': ReadPropertyItem[];
    'isPartOfEditedBook': ReadPropertyItem[];
    'journalVolume': string;
    'numVolumes': string;
    'numPages': string;
    'author': ReadPropertyItem[];
    'editor': ReadPropertyItem[];
    'editorOrg': ReadPropertyItem[];
    'date'?: DateSalsah | DateRangeSalsah;
    'title': ReadPropertyItem[];
    'subtitle': ReadPropertyItem[];
    'name': ReadPropertyItem[];
    'publisher': ReadPropertyItem[];
    'abbreviation': string;
    'location': string;
    'isReprinted': ReadPropertyItem[];
    'bookContent': ReadPropertyItem[];
    'isbn': string;
    'collectionNumber': string;
    'introduction': ReadPropertyItem[];
    'translator': ReadPropertyItem[];
    'isTranslationOf': ReadPropertyItem[];
    'journalIssue': string;
}

@Component({
    selector: 'app-biblio-items',
    templateUrl: './biblio-items.component.html',
    styleUrls: ['./biblio-items.component.scss']
})
export class BiblioItemsComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    propIris: any = {
        'id': this.apiUrl + '/ontology/0801/beol/v2#beolIDs',
        'comment': this.apiUrl + '/ontology/0801/beol/v2#comment',
        'mentionedIn': this.apiUrl + '/ontology/0801/beol/v2#mentionedIn',
        'endPage': this.apiUrl + '/ontology/0801/biblio/v2#endPage',
        'startPage': this.apiUrl + '/ontology/0801/biblio/v2#startPage',
        'isPartOfJournal': this.apiUrl + '/ontology/0801/biblio/v2#isPartOfJournalValue',
        'isPartOfEditedBook': this.apiUrl + '/ontology/0801/biblio/v2#isPartOfEditedBookValue',
        'isPartOfCollection': this.apiUrl + '/ontology/0801/biblio/v2#isPartOfCollectionValue',
        'journalVolume': this.apiUrl + '/ontology/0801/biblio/v2#journalVolume',
        'numVolumes': this.apiUrl + '/ontology/0801/biblio/v2#numVolumes',
        'numPages': this.apiUrl + '/ontology/0801/biblio/v2#numPages',
        'collectionNumber': this.apiUrl + '/ontology/0801/biblio/v2#collectionNumber',
        'author': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasAuthorValue',
        'editor': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasEditorValue',
        'editorOrg': this.apiUrl + '/0801/biblio/v2#publicationHasEditorOrgValue',
        'date': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasDate',
        'title': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasTitle',
        'subtitle': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasSubtitle',
        'name': this.apiUrl + '/ontology/0801/biblio/v2#hasName',
        'publisher': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasPublisherValue',
        'abbreviation': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasAbbreviation',
        'location': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasLocation',
        'isReprinted': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsReprintedValue',
        'bookContent': this.apiUrl + '/ontology/0801/biblio/v2#bookHasContentValue',
        'isbn': this.apiUrl + '/ontology/0801/biblio/v2#bookHasISBN',
        'introduction': this.apiUrl + '/ontology/0801/biblio/v2#hasIntroductionValue',
        'translator': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'isTranslationOf': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsTranslationOfValue',
        'journalIssue': this.apiUrl + '/ontology/0801/biblio/v2#journalIssue'

        /* // Unused properties (names come from Knora biblio ontology)
        'volumeSubtitle': this.apiUrl + '/ontology/0801/biblio/v2#volumeSubtitle',
        'edited': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsEditedValue',
        'editionOf': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsEditionOfValue',
        'reprintOf': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsReprintOfValue',
        'reviewed': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsReviewedValue',
        'reviewOf': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsReviewOfValue',
        'hasManuscript': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasManuscriptValue',
        'link': this.apiUrl + '/ontology/0801/biblio/v2#hasLinkValue',
        'translatedTo': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsTranslatedValue',
        'doi': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasDOI',
        'publisherLocation': this.apiUrl + '/ontology/0801/biblio/v2#publisherHasLocation',
        'editionEditor': this.apiUrl + '/ontology/0801/biblio/v2#editionHasEditorValue',
        'editionOrg': this.apiUrl + '/ontology/0801/biblio/v2#editionHasOrganizationValue',
        'editionNumber': this.apiUrl + '/ontology/0801/biblio/v2#editionHasNumber',
        'editionName': this.apiUrl + '/ontology/0801/biblio/v2#editionHasName',
        'uri': this.apiUrl + '/ontology/0801/biblio/v2#hasURI',
        'content': this.apiUrl + '/ontology/0801/biblio/v2#hasContentValue',
        'webpageHrefTag': this.apiUrl + '/ontology/0801/biblio/v2#webpageHasHrefTag',
        'translationOf': this.apiUrl + '/ontology/0801/biblio/v2#translationOfValue',
        'translationLanguage': this.apiUrl + '/ontology/0801/biblio/v2#translationHasLanguage',
        'translationTitle': this.apiUrl + '/ontology/0801/biblio/v2#translationHasTitle',
        'publicationTranslator': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'translationDate': this.apiUrl + '/ontology/0801/biblio/v2#translationHasDate',
        'IsPartOfWebsite': this.apiUrl + '/ontology/0801/biblio/v2#isPartOfWebsiteValue' */
    };

    props: BiblioItemsProps;

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
            startPage: '',
            endPage: '',
            mentionedIn: [],
            comment: [],
            isPartOfJournal: [],
            isPartOfCollection: [],
            isPartOfEditedBook: [],
            journalVolume: '',
            numVolumes: '',
            numPages: '',
            author: [],
            editor: [],
            editorOrg: [],
            date: undefined,
            title: [],
            subtitle: [],
            name: [],
            publisher: [],
            abbreviation: '',
            location: '',
            isReprinted: [],
            bookContent: [],
            isbn: '',
            collectionNumber: '',
            introduction: [],
            translator: [],
            isTranslationOf: [],
            journalIssue: ''
        };

        // TODO: build the new props list
        for (const key in this.resource.properties) {
            if (this.resource.properties.hasOwnProperty(key)) {
                for (const val of this.resource.properties[key]) {
                    switch (val.propIri) {


                        case this.propIris.startPage:
                            this.props.startPage = val.getContent();
                            break;

                        case this.propIris.endPage:
                            this.props.endPage = val.getContent();
                            break;

                        case this.propIris.mentionedIn:
                            this.props.mentionedIn.push(val);
                            break;

                        case this.propIris.comment:
                            this.props.comment.push(val);
                            break;

                        case this.propIris.isPartOfJournal:
                            this.props.isPartOfJournal.push(val);
                            break;

                        case this.propIris.isPartOfCollection:
                            this.props.isPartOfCollection.push(val);
                            break;

                        case this.propIris.isPartOfEditedBook:
                            this.props.isPartOfEditedBook.push(val);
                            break;

                        case this.propIris.journalVolume:
                            this.props.journalVolume = val.getContent();
                            break;

                        case this.propIris.numVolumes:
                            this.props.numVolumes = val.getContent();
                            break;

                        case this.propIris.numPages:
                            this.props.numPages = val.getContent();
                            break;

                        case this.propIris.author:
                            this.props.author.push(val);
                            break;

                        case this.propIris.editor:
                            this.props.editor.push(val);
                            break;

                        case this.propIris.editorOrg:
                            this.props.editorOrg.push(val);
                            break;

                        case this.propIris.date:
                            this.props.date = (val as ReadDateValue).getDateSalsah();
                            break;

                        case this.propIris.title:
                            this.props.title.push(val);
                            break;

                        case this.propIris.subtitle:
                            this.props.subtitle.push(val);
                            break;

                        case this.propIris.name:
                            this.props.name.push(val);
                            break;

                        case this.propIris.publisher:
                            this.props.publisher.push(val);
                            break;

                        case this.propIris.abbreviation:
                            this.props.abbreviation = val.getContent();
                            break;

                        case this.propIris.location:
                            this.props.location = val.getContent();
                            break;

                        case this.propIris.isReprinted:
                            this.props.isReprinted.push(val);
                            break;

                        case this.propIris.bookContent:
                            this.props.bookContent.push(val);
                            break;

                        case this.propIris.isbn:
                            this.props.isbn = val.getContent();
                            break;

                        case this.propIris.collectionNumber:
                            this.props.collectionNumber = val.getContent();
                            break;

                        case this.propIris.introduction:
                            this.props.introduction.push(val);
                            break;

                        case this.propIris.translator:
                            this.props.translator.push(val);
                            break;

                        case this.propIris.isTranslationOf:
                            this.props.isTranslationOf.push(val);
                            break;

                        case this.propIris.journalIssue:
                            this.props.journalIssue = val.getContent();
                            break;

                        default:
                        // do nothing
                    }
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

}
