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
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { Subscription } from 'rxjs';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { BeolService } from '../../services/beol.service';

class BiblioItemsProps implements PropertyValues {
    startPage: ReadTextValue[] = [];
    endPage: ReadTextValue[] = [];
    mentionedIn: ReadTextValue[] = [];
    comment: ReadTextValue[] = [];
    isPartOfJournal: ReadLinkValue[] = [];
    isPartOfCollection: ReadLinkValue[] = [];
    isPartOfEditedBook: ReadLinkValue[] = [];
    journalVolume: ReadTextValue[] = [];
    numVolumes: ReadTextValue[] = [];
    numPages: ReadTextValue[] = [];
    author: ReadLinkValue[] = [];
    editor: ReadLinkValue[] = [];
    editorOrg: ReadLinkValue[] = [];
    date: ReadDateValue[] = [];
    title: ReadTextValue[] = [];
    subtitle: ReadTextValue[] = [];
    name: ReadTextValue[] = [];
    publisher: ReadLinkValue[] = [];
    abbreviation: ReadTextValue[] = [];
    location: ReadTextValue[] = [];
    isReprinted: ReadLinkValue[] = [];
    bookContent: ReadLinkValue[] = [];
    isbn: ReadTextValue[] = [];
    collectionNumber: ReadTextValue[] = [];
    introduction: ReadLinkValue[] = [];
    translator: ReadLinkValue[] = [];
    isTranslationOf: ReadLinkValue[] = [];
    journalIssue: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-biblio-items',
    templateUrl: './biblio-items.component.html',
    styleUrls: ['./biblio-items.component.scss']
})
export class BiblioItemsComponent extends BeolResource {

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

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new BiblioItemsProps();

        this.mapper(props);

        this.props = props;
    }

}
