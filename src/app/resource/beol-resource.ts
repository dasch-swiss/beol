import {
    ApiServiceError,
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
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnDestroy, OnInit } from '@angular/core';

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

        this._resourceService.getReadResource(iri)
            .subscribe(
                (result: ReadResourcesSequence) => {

                    // make sure that exactly one resource is returned
                    if (result.resources.length === 1) {

                        // initialize ontology information
                        this.ontologyInfo = result.ontologyInformation;

                        // prepare a possibly attached image file to be displayed
                        BeolResource.collectImagesAndRegionsForResource(result.resources[0]);

                        this.resource = result.resources[0];

                        this.initProps();

                        this.isLoading = false;

                        this.requestIncomingResources();

                    } else {
                        // exactly one resource was expected, but resourceSeq.resources.length != 1
                        this.errorMessage = `Exactly one resource was expected, but ${result.resources.length} resource(s) given.`;

                    }

                },
                (error: any) => {
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
     */
    protected getIncomingRegions(offset: number): void {
        this._incomingService.getIncomingRegions(this.resource.id, offset).subscribe(
            (regions: ReadResourcesSequence) => {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(regions.ontologyInformation);

                // Append elements of regions.resources to resource.incoming
                Array.prototype.push.apply(this.resource.incomingRegions, regions.resources);

                // prepare regions to be displayed
                BeolResource.collectImagesAndRegionsForResource(this.resource);

                // TODO: implement osdViewer
                /* if (this.osdViewer) {
                  this.osdViewer.updateRegions();
                } */
            },
            (error: any) => {
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
     * It takes the number of images returned as an argument.
     */
    protected getIncomingStillImageRepresentations(offset: number): void {
        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) {
            return;
        }

        if (offset < 0) {
            console.log(`offset of ${offset} is invalid`);
            return;
        }

        this._incomingService.getStillImageRepresentationsForCompoundResource(this.resource.id, offset).subscribe(
            (incomingImageRepresentations: ReadResourcesSequence) => {

                if (incomingImageRepresentations.resources.length > 0) {
                    // update ontology information
                    this.ontologyInfo.updateOntologyInformation(incomingImageRepresentations.ontologyInformation);

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
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );

    }

    /**
     * Get resources pointing to [[this.resource]] with properties other than knora-api:isPartOf and knora-api:isRegionOf.
     *
     * @param offset the offset to be used (needed for paging). First request uses an offset of 0.
     * It takes the number of images returned as an argument.
     */
    protected getIncomingLinks(offset: number): void {

        this._incomingService.getIncomingLinksForResource(this.resource.id, offset).subscribe(
            (incomingResources: ReadResourcesSequence) => {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(incomingResources.ontologyInformation);

                // Append elements incomingResources to this.resource.incomingLinks
                Array.prototype.push.apply(this.resource.incomingLinks, incomingResources.resources);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );
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
