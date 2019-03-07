import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncomingService, KnoraConstants, OntologyCacheService, OntologyInformation, ReadResource, ResourceService } from '@knora/core';
export declare class ResourceViewComponent implements OnInit {
    private _route;
    private _resourceService;
    private _cacheService;
    private _incomingService;
    iri?: string;
    ontologyInfo: OntologyInformation;
    resource: ReadResource;
    errorMessage: any;
    KnoraConstants: typeof KnoraConstants;
    constructor(_route: ActivatedRoute, _resourceService: ResourceService, _cacheService: OntologyCacheService, _incomingService: IncomingService);
    ngOnInit(): void;
    private getResource;
}
