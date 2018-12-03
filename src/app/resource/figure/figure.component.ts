import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ResourceService,
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';

class FigureProps implements PropertyValues {
    caption: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-figure',
    templateUrl: './figure.component.html',
    styleUrls: ['./figure.component.scss']
})
export class FigureComponent extends BeolResource implements OnDestroy {

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
        'caption': this.apiUrl + '/ontology/0801/beol/v2#hasCaption'
    };

    props: FigureProps;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService) {

        super(_resourceService, _cacheService, _incomingService, _beolService);

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

        const props = new FigureProps();

        this.mapper(props);

        this.props = props;
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
