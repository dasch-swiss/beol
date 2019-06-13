import { Component, OnInit } from '@angular/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { ActivatedRoute } from '@angular/router';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation, ReadDateValue, ReadLinkValue, ReadListValue, ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService
} from '@knora/core';
import { Location } from '@angular/common';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';
import { Subscription } from 'rxjs';

class CommentProps implements PropertyValues {
    commentOf: ReadLinkValue[] = [];
    text: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BeolResource {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    ontologyIri = this._appInitService.getSettings().ontologyIRI;

    propIris: PropIriToNameMapping = {
        'commentOf': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#entryCommentOfValue',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
    };

    props: CommentProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                private _appInitService: AppInitService) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);
    }

    initProps() {

        const props = new CommentProps();

        this.mapper(props);

        this.props = props;

    }
}
