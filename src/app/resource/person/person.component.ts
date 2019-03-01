import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

class PersonProps implements PropertyValues {
    comment: ReadTextValue[] = [];
    alternative: ReadTextValue[] = [];
    birthDate: ReadDateValue[] = [];
    birthPlace: ReadTextValue[] = [];
    deathDate: ReadDateValue[] = [];
    deathPlace: ReadTextValue[] = [];
    dictionary: ReadTextValue[] = [];
    givenName:  ReadTextValue[] = [];
    familyName:  ReadTextValue[] = [];
    title:  ReadTextValue[] = [];
    IAF: ReadTextValue[] = [];
    mentioned: ReadTextValue[] = [];
    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'comment': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#comment',
        'alternative': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasAlternativeName',
        'birthDate': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasBirthDate',
        'birthPlace': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasBirthPlace',
        'deathDate': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasDeathDate',
        'deathPlace': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasDeathPlace',
        'dictionary': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasDictionaryEntries',
        'familyName': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasFamilyName',
        'givenName': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasGivenName',
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#personHasTitle',
        'IAF': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasIAFIdentifier',
        'mentioned': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#mentionedIn',
    };

    props: PersonProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                private _appInitService: AppInitService
    ) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new PersonProps();

        this.mapper(props);

        this.props = props;
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
