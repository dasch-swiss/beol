import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtendedSearchParams, KnoraConstants, OntologyInformation, ReadResource, SearchParamsService, SearchService } from '@knora/core';
import { Subscription } from 'rxjs';
export declare abstract class KuiView implements OnInit, OnDestroy {
    protected _route: ActivatedRoute;
    protected _searchService: SearchService;
    protected _searchParamsService: SearchParamsService;
    protected _router: Router;
    abstract offset: number;
    abstract maxOffset: number;
    abstract result: ReadResource[];
    abstract ontologyInfo: OntologyInformation;
    abstract navigationSubscription: Subscription;
    abstract gravsearchGenerator: ExtendedSearchParams;
    abstract searchQuery: string;
    abstract searchMode: string;
    abstract numberOfAllResults: number;
    abstract KnoraConstants: KnoraConstants;
    abstract rerender: boolean;
    abstract isLoading: boolean;
    abstract errorMessage: any;
    abstract pagingLimit: number;
    constructor(_route: ActivatedRoute, _searchService: SearchService, _searchParamsService: SearchParamsService, _router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Generates the Gravsearch query for the current offset.
     */
    protected generateGravsearchQuery(): void;
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    protected getResult(): void;
    /**
     *
     * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
     * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
     *
     * @param {ReadResourcesSequence} searchResult the answer to a search request.
     */
    private processSearchResults;
    /**
     * Shows total number of results returned by a count query.
     *
     * @param {ApiServiceResult} countQueryResult the response to a count query.
     */
    private showNumberOfAllResults;
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     *
     * @param {number} offset
     * @returns void
     */
    loadMore(offset: number): void;
}
