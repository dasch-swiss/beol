import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    ApiServiceResult,
    ConvertJSONLD,
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

declare let require: any;
const jsonld = require('jsonld');

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

    step: number = undefined;
    panelOpenState = false;

    searchQuery: string;
    searchMode: string;

    extendedSearchParamsSubscription: Subscription;

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

        this._route.params.subscribe((params: Params) => {
            this.searchMode = params['mode'];
            this.searchQuery = params['q'];

            // init offset to 0
            this.offset = 0;
            this.result = [];
            this.resetStep();

            this.rerender = true;
            this.getResult();
            this.rerender = false;
        });

    }

    ngOnDestroy() {
        // unsubscribe from extendedSearchParamsSubscription
        // otherwise old queries are still active
        if (this.searchMode === 'extended' && this.extendedSearchParamsSubscription !== undefined) {
            this.extendedSearchParamsSubscription.unsubscribe();
        }
    }

    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {

        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            // perform count query
            if (this.offset === 0) {

                this._searchService.doFulltextSearchCountQuery(this.searchQuery)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: any) => {
                            this.errorMessage = <any>error;
                            // console.log('numberOfAllResults', this.numberOfAllResults);
                        }
                    );
            }

            // perform full text search
            this._searchService.doFulltextSearch(this.searchQuery, this.offset)
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
                this._searchService.doExtendedSearchCountQuery(this.searchQuery)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: any) => {
                            this.errorMessage = <any>error;
                        }
                    );
            }

            // perform the extended search
            this.extendedSearchParamsSubscription = this._searchParamsService.currentSearchParams
                .subscribe((extendedSearchParams: ExtendedSearchParams) => {

                    if (this.offset === 0) {

                        // console.log(this.searchQuery);

                        this._searchService.doExtendedSearch(this.searchQuery)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: any) => {
                                    this.errorMessage = <any>error;
                                });
                    } else {
                        // generate new GravSearch
                        const gravSearch = extendedSearchParams.generateGravsearch(this.offset);

                        // console.log(gravSearch);

                        this._searchService.doExtendedSearch(gravSearch)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: any) => {
                                    console.error('3', error);
                                    this.errorMessage = <any>error;
                                }
                            );
                    }
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
    private showNumberOfAllResults = (countQueryResult: ApiServiceResult) => {

        const resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const resPromise = resPromises.compact(countQueryResult.body, {});

        resPromise.then((compacted) => {
            this.numberOfAllResults = compacted[KnoraConstants.schemaNumberOfItems];
            this.maxOffset = Math.floor(this.numberOfAllResults / environment.pagingLimit);
        }, function (err) {
            console.log('JSONLD could not be expanded:' + err);
        });
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
    private processSearchResults = (searchResult: ApiServiceResult) => {

        // unsubscribe from extendedSearchParamsSubscription when results are present
        if (this.extendedSearchParamsSubscription !== undefined) {
            this.extendedSearchParamsSubscription.unsubscribe();
        }

        this.isLoading = true;

        const resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const resPromise = resPromises.compact(searchResult.body, {});

        resPromise.then((compacted) => {

            // get resource class Iris from response
            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

            // request ontology information about resource class Iris (properties are implied)
            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                (resourceClassInfos: OntologyInformation) => {

                    const resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // assign ontology information to a variable so it can be used in the component's template
                    if (this.ontologyInfo === undefined) {
                        // init ontology information
                        this.ontologyInfo = resourceClassInfos;
                    } else {
                        // update ontology information
                        this.ontologyInfo.updateOntologyInformation(resourceClassInfos);
                    }
                    // append results to search results
                    // console.log('results 1', this.result);
                    this.result = this.result.concat(resources.resources);

                    this.isLoading = false;
                    // console.log('results 2', this.result);
                },
                (err) => {

                    console.log('cache request failed: ' + err);
                }
            );

        }, function (err) {

            console.log('JSONLD could not be expanded:' + err);
        });

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
     * Load more results:
     * update the offset and append the results to the existing ones
     * (similar to infiniteScroll event)
     *
     * @param offsetToUse
     */
    loadMore(offsetToUse: number) {
        // stop the offset, when all data is loaded

        // update the page offset when the end of scroll is reached to get the next page of search results
        this.offset = (offsetToUse === this.offset ? this.offset += 1 : offsetToUse);
        this.getResult();

    }
}
