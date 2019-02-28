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
    ReadUriValue,
    ResourceService
} from '@knora/core';
import { Subscription } from 'rxjs';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

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
    externalLink: ReadUriValue[] = [];

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
        'id': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'comment': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#comment',
        'mentionedIn': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#mentionedIn',
        'endPage': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#endPage',
        'startPage': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#startPage',
        'isPartOfJournal': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#isPartOfJournalValue',
        'isPartOfEditedBook': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#isPartOfEditedBookValue',
        'isPartOfCollection': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#isPartOfCollectionValue',
        'journalVolume': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#journalVolume',
        'numVolumes': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#numVolumes',
        'numPages': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#numPages',
        'collectionNumber': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#collectionNumber',
        'author': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasAuthorValue',
        'editor': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasEditorValue',
        'editorOrg': AppInitService.settings.ontologyIRI + '/0801/biblio/v2#publicationHasEditorOrgValue',
        'date': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasDate',
        'title': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTitle',
        'subtitle': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasSubtitle',
        'name': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#hasName',
        'publisher': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasPublisherValue',
        'abbreviation': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasAbbreviation',
        'location': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasLocation',
        'isReprinted': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReprintedValue',
        'bookContent': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#bookHasContentValue',
        'isbn': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#bookHasISBN',
        'introduction': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#hasIntroductionValue',
        'translator': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'isTranslationOf': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsTranslationOfValue',
        'journalIssue': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#journalIssue',
        'externalLink': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasExternalLink',

        /* // Unused properties (names come from Knora biblio ontology)
        'volumeSubtitle': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#volumeSubtitle',
        'edited': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsEditedValue',
        'editionOf': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsEditionOfValue',
        'reprintOf': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReprintOfValue',
        'reviewed': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReviewedValue',
        'reviewOf': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReviewOfValue',
        'hasManuscript': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasManuscriptValue',
        'link': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#hasLinkValue',
        'translatedTo': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationIsTranslatedValue',
        'doi': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasDOI',
        'publisherLocation': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publisherHasLocation',
        'editionEditor': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#editionHasEditorValue',
        'editionOrg': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#editionHasOrganizationValue',
        'editionNumber': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#editionHasNumber',
        'editionName': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#editionHasName',
        'uri': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#hasURI',
        'content': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#hasContentValue',
        'webpageHrefTag': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#webpageHasHrefTag',
        'translationOf': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#translationOfValue',
        'translationLanguage': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#translationHasLanguage',
        'translationTitle': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#translationHasTitle',
        'publicationTranslator': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'translationDate': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#translationHasDate',
        'IsPartOfWebsite': AppInitService.settings.ontologyIRI + '/ontology/0801/biblio/v2#isPartOfWebsiteValue' */
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

    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
