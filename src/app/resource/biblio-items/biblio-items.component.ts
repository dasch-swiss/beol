import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadDateValue,
    ReadLinkValue,
    ReadResource,
    ReadTextValue,
    ReadUriValue,
    ReadValue
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '@dasch-swiss/dsp-ui';
import { OntologyCacheService } from '@knora/core';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { AppInitService } from '../../app-init.service';
import { BeolService } from '../../services/beol.service';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';

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

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-biblio-items',
    templateUrl: './biblio-items.component.html',
    styleUrls: ['./biblio-items.component.scss']
})
export class BiblioItemsComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = Constants;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'comment': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#comment',
        'mentionedIn': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#mentionedIn',
        'endPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#endPage',
        'startPage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#startPage',
        'isPartOfJournal': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPartOfJournalValue',
        'isPartOfEditedBook': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPartOfEditedBookValue',
        'isPartOfCollection': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPartOfCollectionValue',
        'journalVolume': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#journalVolume',
        'numVolumes': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#numVolumes',
        'numPages': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#numPages',
        'collectionNumber': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#collectionNumber',
        'author': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasAuthorValue',
        'editor': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasEditorValue',
        'editorOrg': this._appInitService.getSettings().ontologyIRI + '/0801/biblio/v2#publicationHasEditorOrgValue',
        'date': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasDate',
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTitle',
        'subtitle': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasSubtitle',
        'name': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#hasName',
        'publisher': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasPublisherValue',
        'abbreviation': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasAbbreviation',
        'location': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasLocation',
        'isReprinted': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReprintedValue',
        'bookContent': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#bookHasContentValue',
        'isbn': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#bookHasISBN',
        'introduction': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#hasIntroductionValue',
        'translator': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'isTranslationOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsTranslationOfValue',
        'journalIssue': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#journalIssue',
        'externalLink': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasExternalLink',

        /* // Unused properties (names come from Knora biblio ontology)
        'volumeSubtitle': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#volumeSubtitle',
        'edited': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsEditedValue',
        'editionOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsEditionOfValue',
        'reprintOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReprintOfValue',
        'reviewed': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReviewedValue',
        'reviewOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsReviewOfValue',
        'hasManuscript': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasManuscriptValue',
        'link': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#hasLinkValue',
        'translatedTo': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationIsTranslatedValue',
        'doi': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasDOI',
        'publisherLocation': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publisherHasLocation',
        'editionEditor': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#editionHasEditorValue',
        'editionOrg': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#editionHasOrganizationValue',
        'editionNumber': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#editionHasNumber',
        'editionName': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#editionHasName',
        'uri': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#hasURI',
        'content': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#hasContentValue',
        'webpageHrefTag': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#webpageHasHrefTag',
        'translationOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#translationOfValue',
        'translationLanguage': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#translationHasLanguage',
        'translationTitle': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#translationHasTitle',
        'publicationTranslator': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'translationDate': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#translationHasDate',
        'IsPartOfWebsite': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/biblio/v2#isPartOfWebsiteValue' */
    };

    props: BiblioItemsProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _cacheService: OntologyCacheService,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService
    ) {

        super(_dspApiConnection, _route, _cacheService, _incomingService, _beolService);

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
