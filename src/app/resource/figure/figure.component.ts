import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {
    ReadResource,
    OntologyInformation,
    KnoraConstants,
    ResourceService,
    OntologyCacheService,
    StillImageRepresentation,
    ImageRegion,
    ReadStillImageFileValue,
    ApiServiceResult,
    ReadResourcesSequence,
    ConvertJSONLD,
    DateSalsah,
    ApiServiceError,
    ReadPropertyItem,
    IncomingService,
    SearchService,
    ReadLinkValue,
    Utils
} from '@knora/core';
import { environment } from '../../../environments/environment';
import { RequestStillImageRepresentations } from '@knora/viewer';

declare let require: any;
let jsonld = require('jsonld');

export interface FigureProps {
    'caption': ReadPropertyItem[];
}


@Component({
    selector: 'app-figure',
    templateUrl: './figure.component.html',
    styleUrls: ['./figure.component.scss']
})
export class FigureComponent implements OnInit {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number;

    loading = true;
    errorMessage: any;

    KnoraConstants = KnoraConstants;
    apiUrl = environment.api;

    propIris: any = {
        'id': this.apiUrl + '/ontology/0801/beol/v2#beolIDs',
        'caption': this.apiUrl + '/ontology/0801/beol/v2#hasCaption'
    };

    props: FigureProps;

    /**
       * Creates a collection of [[StillImageRepresentation]] belonging to the given resource and assigns it to it.
       * Each [[StillImageRepresentation]] represents an image including regions.
       *
       * @param {ReadResource} resource          The resource to get the images for.
       * @returns {StillImageRepresentation[]}   A collection of images for the given resource.
       */

    private static collectImagesAndRegionsForResource(resource: ReadResource): void {

        const imgRepresentations: StillImageRepresentation[] = [];

        if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // resource has StillImageFileValues that are directly attached to it (properties)

            const fileValues: ReadStillImageFileValue[] =
                resource.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
            const imagesToDisplay: ReadStillImageFileValue[] = fileValues.filter((image) => {
                return !image.isPreview;
            });


            for (const img of imagesToDisplay) {

                const regions: ImageRegion[] = [];
                for (const incomingRegion of resource.incomingRegions) {

                    const region = new ImageRegion(incomingRegion);

                    regions.push(region);

                }

                const stillImage = new StillImageRepresentation(img, regions);
                imgRepresentations.push(stillImage);

            }


        } else if (resource.incomingStillImageRepresentations.length > 0) {
            // there are StillImageRepresentations pointing to this resource (incoming)

            const readStillImageFileValues: ReadStillImageFileValue[] = resource.incomingStillImageRepresentations.map(
                (stillImageRes: ReadResource) => {
                    const fileValues = stillImageRes.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
                    // TODO: check if resources is a StillImageRepresentation using the ontology responder
                    // (support for subclass relations required)
                    const imagesToDisplay = fileValues.filter((image) => {
                        return !image.isPreview;
                    });

                    return imagesToDisplay;
                }
            ).reduce(function (prev, curr) {
                // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                return prev.concat(curr);
            });

            for (const img of readStillImageFileValues) {

                const regions: ImageRegion[] = [];
                for (const incomingRegion of resource.incomingRegions) {

                    const region = new ImageRegion(incomingRegion);
                    regions.push(region);

                }

                const stillImage = new StillImageRepresentation(img, regions);
                imgRepresentations.push(stillImage);
            }

        }

        resource.stillImageRepresentationsToDisplay = imgRepresentations;

    }

    constructor(
        private _route: ActivatedRoute,
        private _searchService: SearchService,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        private _incomingService: IncomingService,
        public location: Location) {

        this._route.params.subscribe((params: Params) => {
            this.iri = params['id'];
        });

    }

    ngOnInit() {
        this.requestResource(this.iri);
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
                                    FigureComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];
                                    // console.log('resource ', this.resource);

                                    this.props = {
                                        caption: []
                                    };

                                    // TODO: build the new props list
                                    for (const key in this.resource.properties) {
                                        if (this.resource.properties.hasOwnProperty(key)) {
                                            for (const val of this.resource.properties[key]) {
                                                switch (val.propIri) {

                                                    case this.propIris.caption:
                                                        this.props.caption.push(val);
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

            this.getIncomingRegions(0);

        } else {
            // this resource is not a StillImageRepresentation
            // check if there are StillImageRepresentations pointing to this resource

            // this gets the first page of incoming StillImageRepresentations
            // more pages may be requested by [[this.viewer]].
            // TODO: for now, we begin with offset 0. This may have to be changed later (beginning somewhere in a collection)
            this.getIncomingStillImageRepresentations(0);
        }

        // check for incoming links for the current resource
        this.getIncomingLinks(0);


    }


    /**
       * Gets the incoming regions for [[this.resource]].
       *
       * @param {number} offset the offset to be used (needed for paging). First request uses an offset of 0.
       * @param callback function to be called when new images have been loaded from the server. It takes the
       * number of images returned as an argument.
       */
    private getIncomingRegions(offset: number, callback?: (numberOfResources: number) => void): void {
        this._incomingService.getIncomingRegions(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {
                const promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                    const regions: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // get resource class Iris from response
                    const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                    // request ontology information about resource class Iris (properties are implied)
                    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                        (resourceClassInfos: OntologyInformation) => {
                            // update ontology information
                            this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                            // Append elements of regions.resources to resource.incoming
                            Array.prototype.push.apply(this.resource.incomingRegions, regions.resources);

                            // prepare regions to be displayed
                            FigureComponent.collectImagesAndRegionsForResource(this.resource);

                            // TODO: implement osdViewer
                            /* if (this.osdViewer) {
                              this.osdViewer.updateRegions();
                            } */

                            // if callback is given, execute function with the amount of new images as the parameter
                            if (callback !== undefined) {
                                callback(regions.resources.length);
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

    /**
     * Get StillImageRepresentations pointing to [[this.resource]].
     * This method may have to called several times with an increasing offsetChange in order to get all available StillImageRepresentations.
     *
     * @param offset the offset to be used (needed for paging). First request uses an offset of 0.
     * @param callback function to be called when new images have been loaded from the server.
     * It takes the number of images returned as an argument.
     */
    private getIncomingStillImageRepresentations(offset: number, callback?: (numberOfResources: number) => void): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) {
            return;
        }

        if (offset < 0) {
            console.log(`offset of ${offset} is invalid`);
            return;
        }

        this._incomingService.getStillImageRepresentationsForCompoundResource(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {

                const promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                    // console.log(compacted);

                    const incomingImageRepresentations: ReadResourcesSequence =
                        ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // get resource class Iris from response
                    const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                    // request ontology information about resource class Iris (properties are implied)
                    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                        (resourceClassInfos: OntologyInformation) => {

                            if (incomingImageRepresentations.resources.length > 0) {
                                // update ontology information
                                this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                // set current offset
                                this.incomingStillImageRepresentationCurrentOffset = offset;

                                // TODO: implement prepending of StillImageRepresentations when moving to the left (getting previous pages)
                                // TODO: append existing images to response and then assign response
                                // to `this.resource.incomingStillImageRepresentations`
                                // TODO: maybe we have to support non consecutive arrays (sparse arrays)

                                // append incomingImageRepresentations.resources to this.resource.incomingStillImageRepresentations
                                Array.prototype.push.apply(
                                    this.resource.incomingStillImageRepresentations, incomingImageRepresentations.resources
                                );

                                // prepare attached image files to be displayed
                                FigureComponent.collectImagesAndRegionsForResource(this.resource);
                            }

                            // if callback is given, execute function with the amount of new images as the parameter
                            if (callback !== undefined) {
                                callback(incomingImageRepresentations.resources.length);
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


    /**
     * Gets the next or previous set of StillImageRepresentations from the server.
     *
     * @param request message sent from the child component requiring the loading of more incoming StillImageRepresentations.
     */
    changeOffsetForStillImageRepresentations(request: RequestStillImageRepresentations) {

        // TODO: implement negative offset change

        if (request.offsetChange === 1) {
            // get StillImageRepresentations for next page by increasing current offset
            this.getIncomingStillImageRepresentations(this.incomingStillImageRepresentationCurrentOffset + 1, request.whenLoadedCB);

        } else {
            console.log(
                `Illegal argument for changeOffsetForStillImageRepresentations, must either be -1 or 1, but ${request.offsetChange} given.`
            );
        }
    }

    /**
     * Gets the link value properties pointing from the incoming resource to [[this.resource]].
     *
     * @param {ReadResource} incomingResource the incoming resource.
     * @returns {string} a string containing all the labels of the link value properties.
     */
    getIncomingPropertiesFromIncomingResource(incomingResource: ReadResource) {

        const incomingProperties = [];

        // collect properties, if any
        if (incomingResource.properties !== undefined) {
            // get property Iris (keys)
            const propIris = Object.keys(incomingResource.properties);

            // iterate over the property Iris
            for (const propIri of propIris) {

                // get the values for the current property Iri
                const propVals: Array<ReadPropertyItem> = incomingResource.properties[propIri];

                for (const propVal of propVals) {
                    // add the property if it is a link value property pointing to [[this.resource]]
                    if (propVal.type === KnoraConstants.LinkValue) {
                        const linkVal = propVal as ReadLinkValue;

                        if (linkVal.referredResourceIri === this.resource.id) {
                            incomingProperties.push(propIri);
                        }

                    }
                }
            }
        }

        // eliminate duplicate Iris and transform to labels
        const propLabels = incomingProperties.filter(Utils.filterOutDuplicates).map(
            (propIri) => {
                return this.ontologyInfo.getLabelForProperty(propIri);
            }
        );

        // generate a string separating labels by a comma
        return `(${propLabels.join(', ')})`;

    }

}