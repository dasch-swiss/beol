import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ResourceService,
    SearchService
} from '@knora/core';
import { BeolService } from '../services/beol.service';
import { JsonObject, JsonProperty } from 'json2typescript';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare let require: any;
const jsonld = require('jsonld');

export interface IntroProps {
    'title': ReadPropertyItem[];
    'text': ReadPropertyItem[];
}


/**
 *
 */
@JsonObject('introduction')
export class Introduction {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('children', [Introduction], true)
    public children?: Introduction[] = [];
}

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, OnDestroy {

    id: string;
    iri: string;
    project: string;
    isbn: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    errorMessage;

    KnoraConstants = KnoraConstants;
    sectionUrl = environment.externalApiURL + '/ontology/0801/beol/v2#section';

    list: Introduction[];

    props: IntroProps;

    // current index of introduction
    curIndex: number;
    curChildIndex: number;

    isLoading = true;

    propIris: any = {
        'title': environment.externalApiURL + '/ontology/0801/beol/v2#sectionHasTitle',
        'text': environment.externalApiURL + '/ontology/0801/beol/v2#hasText',
    };

    navigationSubscription;

    constructor(private _route: ActivatedRoute,
        private _http: HttpClient,
        private _router: Router,
        private _searchService: SearchService,
        private _beol: BeolService,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        private _incomingService: IncomingService,
        public location: Location) {

        // subscribe to the router events
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // if it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.searchForBook(this.id);
            }
        });

    }

    ngOnInit() {

        this._http.get('assets/data/introduction.json').subscribe(
            (result: any) => {
                this.list = result.introductions;
                this.isLoading = false;
            },
            (error: any) => {
                console.error(error);
            }
        );

        this._route.params.subscribe((params: Params) => {
            this.project = params['project'];
            // console.log('project', this.project);
            this.id = params['id'];
            // console.log('id ', this.id);
        });
        this.searchForBook(this.id);
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    searchForBook(id: string): void {

        const gravsearch: string = this._beol.searchForBookById(id);

        this._searchService.doExtendedSearch(gravsearch).subscribe(
            (result: ApiServiceResult) => {

                const promises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                const promise = promises.compact(result.body, {});

                promise.then((compacted) => {

                    const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);
                    // console.log('resourceSeq', resourceSeq);
                    if (resourceSeq.resources.length === 1) {
                        // console.log('we got a resource sequence ', resourceSeq.resources);
                        this.requestResource(resourceSeq.resources[0].id);
                    }

                }, function (err) {

                    console.log('JSONLD of full resource request could not be expanded:' + err);
                });

            }
        );

    }

    /**
     * Requests a resource from Knora.
     *
     * @param iri the Iri of the resource to be requested.
     */
    private requestResource(iri: string): void {

        this.props = undefined;

        this._resourceService.getResource(iri)
            .subscribe(
                (result: ApiServiceResult) => {
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

                                    this.resource = resourceSeq.resources[0];
                                    // console.log('resource: ', this.resource);

                                    this.props = {
                                        title: [],
                                        text: []
                                    };

                                    for (const key in this.resource.properties) {
                                        if (this.resource.properties.hasOwnProperty(key)) {
                                            for (const val of this.resource.properties[key]) {
                                                switch (val.propIri) {
                                                    case this.propIris.title:
                                                        this.props.title.push(val);
                                                        break;

                                                    case this.propIris.text:
                                                        this.props.text.push(val);
                                                        break;

                                                    default:
                                                    // do nothing
                                                }
                                            }
                                        }
                                    }
                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`

                        }

                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    /**
     * Navigate to the introduction page using the beolId as parameter
     * @param label beolID
     */
    goToIntro(label: any) {

        // recreate the beolId based on the referred resource label
        let beolId = label.toLowerCase();
        beolId = beolId.replace(' ', '_');
        beolId = 'goldbach_' + beolId;

        this._router.navigateByUrl('introduction/leoo/' + beolId);

    }

    /**
     * Navigate to the page of the list of abbreviations
     */
    goToListAbbreviation() {
        this._router.navigateByUrl('introduction/leoo/goldbach_abbreviations');
    }

    toggleChildren(index: number) {
        this.curIndex = (index === this.curIndex ? undefined : index);
        // reset grand children
        this.curChildIndex = undefined;
    }

    toggleGrandChildren(index: number) {
        this.curChildIndex = (index === this.curChildIndex ? undefined : index);
    }

}
