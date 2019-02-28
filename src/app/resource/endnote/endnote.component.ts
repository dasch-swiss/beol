import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

class EndnoteProps implements PropertyValues {
    number: ReadTextValue[] = [];
    text: ReadPropertyItem[] = [];
    figure: ReadPropertyItem[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-endnote',
    templateUrl: './endnote.component.html',
    styleUrls: ['./endnote.component.scss']
})
export class EndnoteComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    propIris: PropIriToNameMapping = {
        'number': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#endnoteHasNumber',
        'text': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'figure': AppInitService.settings.ontologyIRI + '/ontology/0801/beol/v2#hasFigureValue'
    };

    props: EndnoteProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _incomingService: IncomingService,
                protected _cacheService: OntologyCacheService,
                public location: Location,
                protected _beolService: BeolService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    initProps() {

        const props = new EndnoteProps();

        this.mapper(props);

        this.props = props;
    }

}
