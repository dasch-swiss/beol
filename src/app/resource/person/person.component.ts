import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    DateSalsah,
    IncomingService,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ResourceService
} from '@knora/core';
import { BeolResource } from '../beol-resource';
import { Subscription } from 'rxjs';


declare let require: any;
let jsonld = require('jsonld');

interface PersonProps {
    comment: ReadPropertyItem[];
    alternative: ReadPropertyItem[];
    birthDate: DateSalsah;
    birthPlace: string;
    deathDate: DateSalsah;
    deathPlace: string;
    dictionary: ReadPropertyItem[];
    IAF: string;
    mentioned: ReadPropertyItem[];
    name: string;
    publisherLocation: string;
}

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent extends BeolResource implements OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;

    propIris: any = {
        'id': this.apiUrl + '/ontology/0801/beol/v2#beolIDs',
        'comment': this.apiUrl + '/ontology/0801/beol/v2#comment',
        'alternative': this.apiUrl + '/ontology/0801/beol/v2#hasAlternativeName',
        'birthDate': this.apiUrl + '/ontology/0801/beol/v2#hasBirthDate',
        'birthPlace': this.apiUrl + '/ontology/0801/beol/v2#hasBirthPlace',
        'deathDate': this.apiUrl + '/ontology/0801/beol/v2#hasDeathDate',
        'deathPlace': this.apiUrl + '/ontology/0801/beol/v2#hasDeathPlace',
        'dictionary': this.apiUrl + '/ontology/0801/beol/v2#hasDictionaryEntries',
        'familyName': this.apiUrl + '/ontology/0801/beol/v2#hasFamilyName',
        'givenName': this.apiUrl + '/ontology/0801/beol/v2#hasGivenName',
        'IAF': this.apiUrl + '/ontology/0801/beol/v2#hasIAFIdentifier',
        'mentioned': this.apiUrl + '/ontology/0801/beol/v2#mentionedIn',
        'name': this.apiUrl + '/ontology/0801/biblio/v2#hasName',
        'publisherLocation': this.apiUrl + '/ontology/0801/biblio/v2#publisherHasLocation'
    };

    props: PersonProps;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
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
    }

    initProps() {

        // create a person props interface
        this.props = {
            'comment': [],
            'alternative': [],
            'birthDate': new DateSalsah(),
            'birthPlace': '',
            'deathDate': new DateSalsah(),
            'deathPlace': '',
            'dictionary': [],
            'IAF': '',
            'mentioned': [],
            'name': '',
            'publisherLocation': ''
        };

        for (const key in this.resource.properties) {
            if (this.resource.properties.hasOwnProperty(key)) {
                for (const val of this.resource.properties[key]) {
                    switch (val.propIri) {
                        case this.propIris.comment:
                            this.props.comment.push(val);
                            break;

                        case this.propIris.birthDate:
                            this.props.birthDate = val.getDate();
                            break;

                        case this.propIris.birthPlace:
                            this.props.birthPlace = val.getContent();
                            break;

                        case this.propIris.deathDate:
                            this.props.deathDate = val.getDate();
                            break;

                        case this.propIris.deathPlace:
                            this.props.deathPlace = val.getContent();
                            break;

                        case this.propIris.alternative:
                            this.props.alternative.push(val);
                            break;

                        case this.propIris.IAF:
                            this.props.IAF = val.getContent();
                            break;

                        case this.propIris.mentioned:
                            this.props.mentioned.push(val);
                            break;

                        case this.propIris.name:
                            this.props.name = val.getContent();
                            break;

                        case this.propIris.publisherLocation:
                            this.props.publisherLocation = val.getContent();
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
