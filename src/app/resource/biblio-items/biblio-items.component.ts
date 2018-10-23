import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    DateSalsah,
    ImageRegion,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ReadStillImageFileValue,
    ResourceService,
    SearchService,
    StillImageRepresentation,
    Utils
} from '@knora/core';

declare let require: any;
let jsonld = require('jsonld');

export interface BiblioItemsProps {
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
    'date': DateSalsah;
    'title': ReadPropertyItem[];
    'subtitle': ReadPropertyItem[];
    'name': ReadPropertyItem[];
    'publisher': ReadPropertyItem[];
    'abbreviation': string;
    'location': string;
    'isReprinted': ReadPropertyItem[];
    'content': ReadPropertyItem[];
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
export class BiblioItemsComponent implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    loading = true;
    errorMessage: any;
    navigationSubscription;

    KnoraConstants = KnoraConstants;
    apiUrl = environment.api;

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
        'content': this.apiUrl + '/ontology/0801/biblio/v2#bookHasContentValue',
        'isbn': this.apiUrl + '/ontology/0801/biblio/v2#bookHasISBN',
        'introduction': this.apiUrl + '/ontology/0801/biblio/v2#hasIntroductionValue',
        'translator': this.apiUrl + '/ontology/0801/biblio/v2#publicationHasTranslatorValue',
        'isTranslationOf': this.apiUrl + '/ontology/0801/biblio/v2#publicationIsTranslationOfValue',
        'journalIssue': this.apiUrl + '/ontology/0801/biblio/v2#journalIssue'
    };

    props: BiblioItemsProps;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _searchService: SearchService,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        private _incomingService: IncomingService,
        public location: Location) {

        this._route.params.subscribe((params: Params) => {
            this.iri = params['id'];
        });

        // subscribe to the router events to reload the content
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // if it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.requestResource(this.iri);
            }
        });

    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }


    /**
       * Requests a resource from Knora.
       *
       * @param {string} resourceIRI the Iri of the resource to be requested.
       */
    private requestResource(resourceIRI: string): void {

        this.props = undefined;


        this._resourceService.getResource(resourceIRI)
            .subscribe(
                (result: ApiServiceResult) => {

                    this.loading = true;

                    const promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length === 1) {

                            // get resource class Iris from response
                            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // console.log(resourceClassIris)

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: OntologyInformation) => {

                                    // initialize ontology information
                                    this.ontologyInfo = resourceClassInfos;

                                    // prepare a possibly attached image file to be displayed
                                    // BiblioItemsComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];
                                    // console.log('resource ', this.resource);

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
                                        date: new DateSalsah(),
                                        title: [],
                                        subtitle: [],
                                        name: [],
                                        publisher: [],
                                        abbreviation: '',
                                        location: '',
                                        isReprinted: [],
                                        content: [],
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
                                                        this.props.date = val.getDate();
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

                                                    case this.propIris.content:
                                                        this.props.content.push(val);
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


                                    this.requestIncomingResources();

                                    this.loading = false;

                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`;

                        }

                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });


                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.loading = false;
                }
            );
    }

    /**
     * Requests incoming resources for [[this.resource]].
     * Incoming resources are: regions, StillImageRepresentations, and incoming links.
     *
     **/
    private requestIncomingResources(): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) {
            return;
        }

        // request incoming regions
        if (this.resource.properties[KnoraConstants.hasStillImageFileValue]) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // the resource is a StillImageRepresentation, check if there are regions pointing to it

            // this.getIncomingRegions(0);

        } else {
            // this resource is not a StillImageRepresentation
            // check if there are StillImageRepresentations pointing to this resource

            // this gets the first page of incoming StillImageRepresentations
            // more pages may be requested by [[this.viewer]].
            // TODO: for now, we begin with offset 0. This may have to be changed later (beginning somewhere in a collection)
            // this.getIncomingStillImageRepresentations(0);
        }

        // check for incoming links for the current resource
        this.getIncomingLinks(0);


    }

    /**
     * Get resources pointing to [[this.resource]] with properties other than knora-api:isPartOf and knora-api:isRegionOf.
     *
     * @param offset the offset to be used (needed for paging). First request uses an offset of 0.
     * @param callback function to be called when new images have been loaded from the server.
     * It takes the number of images returned as an argument.
     */
    private getIncomingLinks(offset: number, callback?: (numberOfResources: number) => void): void {

        this._incomingService.getIncomingLinksForResource(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {
                const promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                    const incomingResources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // get resource class Iris from response
                    const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                    // request ontology information about resource class Iris (properties are implied)
                    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                        (resourceClassInfos: OntologyInformation) => {
                            // update ontology information
                            this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                            // Append elements incomingResources to this.resource.incomingLinks
                            Array.prototype.push.apply(this.resource.incomingLinks, incomingResources.resources);

                            // if callback is given, execute function with the amount of incoming resources as the parameter
                            if (callback !== undefined) {
                                callback(incomingResources.resources.length);
                            }

                        },
                        (err) => {

                            console.log('cache request failed: ' + err);
                        });
                },
                    function (err) {
                        console.log('JSONLD of regions request could not be expanded:' + err);
                    });
            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.loading = false;
            }
        );
    }

}
