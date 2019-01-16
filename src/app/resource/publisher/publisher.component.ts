import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadLinkValue,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService,
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';

class PublisherProps implements PropertyValues {
    comment: ReadTextValue[] = [];
    mentioned: ReadTextValue[] = [];
    name: ReadTextValue[] = [];
    publisherLocation: ReadTextValue[] = [];
    publishingPerson: ReadLinkValue[] = [];
    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-publisher',
    templateUrl: './publisher.component.html',
    styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent extends BeolResource {

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
        'mentioned': this.apiUrl + '/ontology/0801/beol/v2#mentionedIn',
        'name': this.apiUrl + '/ontology/0801/biblio/v2#hasName',
        'publisherLocation': this.apiUrl + '/ontology/0801/biblio/v2#publisherHasLocation',
        'publishingPerson': this.apiUrl + '/ontology/0801/biblio/v2#publishingPersonValue'
    };

    props: PublisherProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new PublisherProps();

        this.mapper(props);

        this.props = props;
    }

}
