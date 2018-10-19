import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ResourceService,
    ReadResourcesSequence,
    ReadPropertyItem,
    ReadResource,
} from '@knora/core';
import { AppConfig } from '../../app.config';


declare let require: any;
let jsonld = require('jsonld');

export interface EndnoteProps {
    'number': string;
    'text': ReadPropertyItem[];
    'figure': ReadPropertyItem[];
}

@Component({
    selector: 'app-endnote',
    templateUrl: './endnote.component.html',
    styleUrls: ['./endnote.component.scss']
})
export class EndnoteComponent implements OnInit {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    loading = true;
    errorMessage: any;

    KnoraConstants = KnoraConstants;
    apiUrl = AppConfig.settings.apiURL;

    propIris: any = {
        'number': this.apiUrl + '/ontology/0801/beol/v2#endnoteHasNumber',
        'text': this.apiUrl + '/ontology/0801/beol/v2#hasText',
        'figure': this.apiUrl + '/ontology/0801/beol/v2#hasFigureValue'
    };
    props: EndnoteProps;

    constructor(
        private _route: ActivatedRoute,
        private _resourceService: ResourceService,
        private _cacheService: OntologyCacheService,
        public location: Location
    ) {
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
                                    // EndnoteComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];
                                    // console.log('resource ', this.resource);

                                    this.props = {
                                        number: '',
                                        text: [],
                                        figure: []
                                    };

                                    // props list
                                    for (const key in this.resource.properties) {
                                        if (this.resource.properties.hasOwnProperty(key)) {
                                            for (const val of this.resource.properties[key]) {
                                                switch (val.propIri) {
                                                    case this.propIris.number:
                                                        this.props.number = val.getContent();
                                                        break;

                                                    case this.propIris.text:
                                                        this.props.text.push(val);
                                                        break;

                                                    case this.propIris.figure:
                                                        this.props.figure.push(val);
                                                        break;

                                                    default:
                                                    // do nothing
                                                }
                                            }
                                        }
                                    }


                                    // this.requestIncomingResources();

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

}
