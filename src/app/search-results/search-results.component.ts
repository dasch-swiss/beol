import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    ApiServiceError,
    ApiServiceResult,
    ConvertJSONLD, CountQueryResult,
    ExtendedSearchParams,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadResource,
    ReadResourcesSequence,
    SearchParamsService,
    SearchService
} from '@knora/core';
import { BeolService } from '../services/beol.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    isLoading = true;

    KnoraConstants = KnoraConstants;

    result: ReadResource[] = []; // the results of a search query
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`
    numberOfAllResults: number; // total number of results (count query)
    rerender = false;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    offset = 0;
    maxOffset = 0;
    gravsearchGenerator: ExtendedSearchParams;

    step: number = undefined;
    panelOpenState = false;

    searchQuery: string;
    searchMode: string;

    navigationSubscription: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _searchService: SearchService,
        private _cacheService: OntologyCacheService,
        private _searchParamsService: SearchParamsService,
        private _router: Router,
        public location: Location,
        private _beol: BeolService) {

    }

    ngOnInit() {

        this.navigationSubscription = this._route.paramMap.subscribe((params: Params) => {
            this.searchMode = params.get('mode');

            // init offset to 0
            this.offset = 0;
            this.result = [];
            this.resetStep();

            if (this.searchMode === 'fulltext') {
                this.searchQuery = params.get('q');
            } else if (this.searchMode === 'extended') {
                this.gravsearchGenerator = this._searchParamsService.getSearchParams();
                this.generateGravsearchQuery();
            }

            this.rerender = true;
            this.getResult();
        });

    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }

    /**
     * Generates the Gravsearch query for the current offset.
     */
    private generateGravsearchQuery() {

        const gravsearch: string | boolean = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], {relativeTo: this._route});
            return;
        } else {
            this.searchQuery = <string> gravsearch;
        }
    }

    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {
        this.isLoading = true;

        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            // perform count query
            if (this.offset === 0) {

                this._searchService.doFullTextSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: any) => {
                            this.errorMessage = <any>error;
                            // console.log('numberOfAllResults', this.numberOfAllResults);
                        }
                    );
            }

            // perform full text search
            this._searchService.doFullTextSearchReadResourceSequence(this.searchQuery, this.offset)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: any) => {
                        this.errorMessage = <any>error;
                    },
                );

            // EXTENDED SEARCH
        } else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService.doExtendedSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: any) => {
                            this.errorMessage = <any>error;
                        }
                    );
            }

            this._searchService.doExtendedSearchReadResourceSequence(this.searchQuery)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: any) => {
                        this.errorMessage = <any>error;
                    });

        } else {
            this.errorMessage = `search mode invalid: ${this.searchMode}`;
        }
    }


    /**
     * Shows total number of results returned by a count query.
     *
     * @param {ApiServiceResult} countQueryResult the response to a count query.
     */
    private showNumberOfAllResults = (countQueryResult: CountQueryResult) => {
        this.numberOfAllResults = countQueryResult.numberOfResults;

        if (this.numberOfAllResults > 0) {
            // offset is 0-based
            // if numberOfAllResults equals the pagingLimit, the max. offset is 0
            this.maxOffset = Math.floor((this.numberOfAllResults - 1) / environment.pagingLimit);
        } else {
            this.maxOffset = 0;
        }
    };

    /**
     *
     * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
     * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
     *
     * Attention: this function definition makes uses of the arrow notation
     * because the context of `this` has to be inherited from the context.
     * See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this>
     *
     * @param {ApiServiceResult} searchResult the answer to a search request.
     */
    private processSearchResults = (searchResult: ReadResourcesSequence) => {
        // assign ontology information to a variable so it can be used in the component's template
        if (this.ontologyInfo === undefined) {
            // init ontology information
            this.ontologyInfo = searchResult.ontologyInformation;
        } else {
            // update ontology information
            this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
        }
        // append results to search results
        // console.log('results 1', this.result);
        this.result = this.result.concat(searchResult.resources);

        this.isLoading = false;
        this.rerender = false;
    };

    /* the following methods will be moved to @knora/viewer views */

    setStep(index: number) {
        this.step = index;
    }

    resetStep() {
        this.step = undefined;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    /**
     * Navigate to the viewer that displays the resource's content
     * @param resourceIri the Iri of the resource.
     * @param resourceType the type (class) of the resource.
     */
    goToViewer(resourceIri: string, resourceType: string) {

        this._beol.routeByResourceType(resourceType, resourceIri);
    }

    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     *
     */
    loadMore() {

        // update the page offset when the end of scroll is reached to get the next page of search results
        if (this.offset < this.maxOffset) {
            this.offset++;
        } else {
            return;
        }

        if (this.searchMode === 'extended') {
            this.generateGravsearchQuery();
        }

        this.getResult();

    }
}
