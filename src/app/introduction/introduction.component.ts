import { Component, OnInit } from '@angular/core';
import {
    ApiServiceResult,
    ConvertJSONLD,
    KnoraConstants,
    OntologyInformation,
    ReadResource,
    ReadResourcesSequence,
    SearchService,
    ResourceService,
    OntologyCacheService,
    ApiServiceError,
    IncomingService,
    StillImageRepresentation
} from '@knora/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    id: string;
    iri: string;
    project: string;
    isbn: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;

    KnoraConstants = KnoraConstants;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _searchService: SearchService,
        private _beol: BeolService,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        private _incomingService: IncomingService) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.project = params['project'];
            // console.log('project', this.project);
            this.id = params['id'];
            // console.log('id ', this.id);
        });
        this.searchForBook(this.id);
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
                    } else {
                        console.log('We got 0 or more than 1 resource.');
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
        this._resourceService.getResource(iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    console.log('IRI : ', iri);
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
                                    // ResourceObjectComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];
                                    console.log('resource properties: ', resourceSeq.resources[0].properties);

                                    this.getIncomingLinks(0);
                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            // this.errorMessage =
                            // `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`

                        }

                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });

                    // this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    /* this.errorMessage = <any>error;
                    this.isLoading = false; */
                }
            );
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
                            if (callback !== undefined) { callback(incomingResources.resources.length); }

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
                console.error(error);
                /* this.errorMessage = <any>error;
                this.isLoading = false; */
            }
        );
    }

    goToIntro(label: any) {

        let beolId = label.toLowerCase();
        beolId = beolId.replace(' ', '_');
        beolId = 'goldbach_' + beolId;

        this._router.navigateByUrl('introduction/leoo/' + beolId);
        // location.reload();
    }


}
