import { KuiView } from '../kui-view';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExtendedSearchParams, KnoraConstants, OntologyInformation, ReadResource, SearchParamsService, SearchService } from '@knora/core';
export declare class SearchResultsComponent extends KuiView {
    protected _route: ActivatedRoute;
    protected _searchService: SearchService;
    protected _searchParamsService: SearchParamsService;
    protected _router: Router;
    KnoraConstants: typeof KnoraConstants;
    offset: number;
    maxOffset: number;
    gravsearchGenerator: ExtendedSearchParams;
    result: ReadResource[];
    ontologyInfo: OntologyInformation;
    numberOfAllResults: number;
    rerender: boolean;
    searchQuery: string;
    searchMode: string;
    isLoading: boolean;
    errorMessage: any;
    navigationSubscription: Subscription;
    pagingLimit: number;
    constructor(_route: ActivatedRoute, _searchService: SearchService, _searchParamsService: SearchParamsService, _router: Router);
}
