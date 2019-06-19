import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    ApiServiceResult,
    CountQueryResult,
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
import { Subscription } from 'rxjs';
import { AppInitService } from '../app-init.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    isLoading = true;

    KnoraConstants = KnoraConstants;

    result: ReadResource[] = []; // the results of a search query
    externalResults: ReadResourcesSequence;
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`
    numberOfAllResults: number; // total number of results (count query)
    rerender = false;

    // with the http get request, we need also a variable for error messages;
    // just in case something goes wrong
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
        private _beol: BeolService,
        private _appInitService: AppInitService) {

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
     * Get text search results from The Newton Project
     */
    getResultNewton() {
        const searchOpticsCategory = '&nt1=1&name_text=&cat=Optics&loc=&idno=&sort=relevance&order=desc';
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://www.newtonproject.ox.ac.uk/search/results?keyword=';

        const url = basePath + this.searchQuery + searchOpticsCategory; // site that doesn’t send Access-Control-*

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
               console.log(contents);
            })
            .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'));
    }

    /**
     * Get text search results from The Newton Project
     */
    getResultLeibniz() {
        const searchOpticsCategory = '&nt1=1&name_text=&cat=Optics&loc=&idno=&sort=relevance&order=desc';
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://www.newtonproject.ox.ac.uk/search/results?keyword=';

        const url = basePath + this.searchQuery + searchOpticsCategory; // site that doesn’t send Access-Control-*

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
                console.log(contents);
            })
            .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'));
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
            // here get the search results from the other projects
            this.getResultNewton();
            if (this.externalResults !== undefined) {

                this.result = this.result.concat(this.externalResults.resources);
            }
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
            this.maxOffset = Math.floor((this.numberOfAllResults - 1) / this._appInitService.getSettings().pagingLimit);
        } else {
            this.maxOffset = 0;
        }
    }

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
    }

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
