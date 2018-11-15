import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadDateValue,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService,
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';

class PersonProps implements PropertyValues {
    comment: ReadTextValue[] = [];
    alternative: ReadTextValue[] = [];
    birthDate: ReadDateValue[] = [];
    birthPlace: ReadTextValue[] = [];
    deathDate: ReadDateValue[] = [];
    deathPlace: ReadTextValue[] = [];
    dictionary: ReadTextValue[] = [];
    IAF: ReadTextValue[] = [];
    mentioned: ReadTextValue[] = [];
    name: ReadTextValue[] = [];
    publisherLocation: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
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
    KnoraConstants = KnoraConstants;

    propIris: PropIriToNameMapping = {
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

        const props = new PersonProps();

        this.mapper(props);

        this.props = props;
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
