import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
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
    StillImageRepresentation,
    Utils
} from '@knora/core';
import { RequestStillImageRepresentations, StillImageComponent } from '@knora/viewer';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

import { ViewChild } from '@angular/core';

import { BeolService } from '../services/beol.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnDestroy, OnInit } from '@angular/core';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

export interface PropIriToNameMapping {
    [index: string]: string;
}

export interface PropertyValues {
    [index: string]: ReadPropertyItem[];
}

export abstract class BeolResource implements OnInit, OnDestroy {

    abstract iri: string;
    abstract resource: ReadResource;
    abstract ontologyInfo: OntologyInformation;
    abstract isLoading: boolean;
    abstract errorMessage: any;
    abstract incomingStillImageRepresentationCurrentOffset: number;
    abstract navigationSubscription: Subscription;

    @ViewChild('OSDViewer') osdViewer: StillImageComponent;

    abstract KnoraConstants: KnoraConstants;
    apiUrl: string = environment.externalApiURL;

    abstract propIris: PropIriToNameMapping;

    constructor(
        protected _route: ActivatedRoute,
        protected _resourceService: ResourceService,
        protected _cacheService: OntologyCacheService,
        protected _incomingService: IncomingService,
        protected _beolService: BeolService) {
    }

    /**
     * Creates a collection of [[StillImageRepresentation]] belonging to the given resource and assigns it to it.
     * Each [[StillImageRepresentation]] represents an image including regions.
     *
     * @param {ReadResource} resource          The resource to get the images for.
     * @returns {StillImageRepresentation[]}   A collection of images for the given resource.
     */
    protected static collectImagesAndRegionsForResource(resource: ReadResource): void {

        const imgRepresentations: StillImageRepresentation[] = [];

        if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // resource has StillImageFileValues that are directly attached to it (properties)

            const fileValues: ReadStillImageFileValue[] = resource.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
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
                    // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
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

    /**
     * Given a `PropIriToNameMapping`, inverts its keys and values.
     *
     * @param propMapping mapping of names to property Iris.
     * @returns mapping of property Iris to names.
     */
    private static swap(propMapping: PropIriToNameMapping): object {
        const invertedMapping: PropIriToNameMapping = {};
        for (const key in propMapping) {
            if (propMapping.hasOwnProperty(key)) {
                invertedMapping[propMapping[key]] = key;
            }
        }
        return invertedMapping;
    }

    ngOnInit() {
        this.navigationSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            this.getResource(params.get('id'));
        });

    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }

    /**
     * Initializes properties for a specific resource class.
     * To be implemented in template component.
     */
    abstract initProps(): void;

    /**
     * Assigns the resource's properties to `propClass`.
     *
     * @param propClass instance to assign the property values to.
     */
    protected mapper(propClass: PropertyValues) {

        const swapped = BeolResource.swap(this.propIris);

        for (const key in this.resource.properties) {
            if (this.resource.properties.hasOwnProperty(key)) {
                for (const val of this.resource.properties[key]) {

                    const name = swapped[val.propIri];

                    if (name !== undefined && Array.isArray(propClass[name])) {
                        propClass[name].push(val);
                    }
                }
            }
        }
    }

    /**
     * The user clicked on an internal link.
     *
     * @param linkVal the value reprenting the referred resource.
     */
    protected resLinkClicked(linkVal: ReadLinkValue) {

        const refResType = (linkVal.referredResource !== undefined ? linkVal.referredResource.type : '');

        this._beolService.routeByResourceType(refResType, linkVal.referredResourceIri);
    }

    /**
     * Requests a resource.
     *
     * @param iri the Iri of the resource to be requested.
     */
    getResource(iri: string): void {
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

                                    // prepare a possibly attached image file to be displayed
                                    BeolResource.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];

                                    this.initProps();

                                    this.requestIncomingResources();

                                    // console.log(this.resource);
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

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    /**
     * Requests incoming resources for [[this.resource]].
     * Incoming resources are: regions, StillImageRepresentations, and incoming links.
     *
     **/
    protected requestIncomingResources(): void {

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
    protected getIncomingRegions(offset: number, callback?: (numberOfResources: number) => void): void {
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
                                BeolResource.collectImagesAndRegionsForResource(this.resource);

                                if (this.osdViewer) {
                                    this.osdViewer.updateRegions();
                                }

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
                this.isLoading = false;
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
    protected getIncomingStillImageRepresentations(offset: number, callback?: (numberOfResources: number) => void): void {
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

                        const incomingImageRepresentations: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

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
                                    // TODO: append existing images to response and then assign response to `this.resource.incomingStillImageRepresentations`
                                    // TODO: maybe we have to support non consecutive arrays (sparse arrays)

                                    // append incomingImageRepresentations.resources to this.resource.incomingStillImageRepresentations
                                    Array.prototype.push.apply(this.resource.incomingStillImageRepresentations, incomingImageRepresentations.resources);

                                    // prepare attached image files to be displayed
                                    BeolResource.collectImagesAndRegionsForResource(this.resource);
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
                this.isLoading = false;
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
    protected getIncomingLinks(offset: number, callback?: (numberOfResources: number) => void): void {

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
                this.isLoading = false;
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
