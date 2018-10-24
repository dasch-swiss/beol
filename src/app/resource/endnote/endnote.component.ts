import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { IncomingService, OntologyCacheService, OntologyInformation, ReadPropertyItem, ReadResource, ResourceService, } from '@knora/core';
import { BeolResource } from '../beol-resource';
import { Subscription } from 'rxjs';


declare let require: any;
let jsonld = require('jsonld');

interface EndnoteProps {
    'number': string;
    'text': ReadPropertyItem[];
    'figure': ReadPropertyItem[];
}

@Component({
    selector: 'app-endnote',
    templateUrl: './endnote.component.html',
    styleUrls: ['./endnote.component.scss']
})
export class EndnoteComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;

    propIris: any = {
        'number': this.apiUrl + '/ontology/0801/beol/v2#endnoteHasNumber',
        'text': this.apiUrl + '/ontology/0801/beol/v2#hasText',
        'figure': this.apiUrl + '/ontology/0801/beol/v2#hasFigureValue'
    };

    props: EndnoteProps;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _incomingService: IncomingService,
                protected _cacheService: OntologyCacheService,
                public location: Location) {

        super(_resourceService, _cacheService, _incomingService);

        this._route.params.subscribe((params: Params) => {
            this.iri = params['id'];
        });

        // subscribe to the router events to reload the content
        this.navigationSubscription = this._router.events.subscribe((e: any) => {
            // if it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.getResource(this.iri);
            }
        });

        this._route.params.subscribe((params: Params) => {
            this.iri = params['id'];
        });
    }

    initProps() {

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
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
