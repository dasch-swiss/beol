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
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`
    numberOfAllResults: number; // total number of results (count query)
    numberOfExternalResults: number = 0; // total number of results of text search on 3rd party repos
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

    beolIri: string = 'http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF';

    constructor (
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
                // filter by project
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
            this._router.navigate([''], { relativeTo: this._route });
            return;
        } else {
            this.searchQuery = <string>gravsearch;
        }
    }
    filterExpression(results: string[]): string {
        let filter = '';

        for (let it = 0; it < results.length; it++) {
            filter += '?letterNumber = "' + results[it] + '"';
            if (it !== results.length - 1) {
                filter += " || "; // or operation should be in double quote otherwise it is skipped
            }
        }
        return filter;
    }
    /**
     * Given the letterID of a letter from The Newton Project, searches for that letter.
     *
     * @param letterID the letterID to search for.
     * @returns the Gravsearch query.
     */
    queryExpressionWithLetterID(filter: string, ontology: string, property: string): string {

        const letterByNumberTemplate = `
            PREFIX ${ontology}: <${this._appInitService.getSettings().ontologyIRI}/ontology/0801/${ontology}/simple/v2#>
            PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

            CONSTRUCT {
                ?letter knora-api:isMainResource true .

            } WHERE {

                ?letter a knora-api:Resource .
                ?letter a ${ontology}:letter .
                ?letter ${ontology}:${property} ?letterNumber.
                ${ontology}:${property} knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
                ?letterNumber a <http://www.w3.org/2001/XMLSchema#string> .
                FILTER(${filter}^^<http://www.w3.org/2001/XMLSchema#string>)
        }

        OFFSET 0
        `;
        return letterByNumberTemplate;

    }

    /**
     * Extended search for letters by ID
     */
    extendedSearchForExternalLetters(query: string) {
        this._searchService.doExtendedSearchReadResourceSequence(query).subscribe(
            (resourceSeq: ReadResourcesSequence) => {
                this.processSearchResults(resourceSeq);
                this.numberOfExternalResults += resourceSeq.resources.length;
            }
        );
    }
    /**
     * make search expression to be sent to search route of Briefportal Leibniz
     */
    makeLeibnizSearchExpressions(searchTerm: string, expressions: string[]) {
        for (let it = 0; it < expressions.length; it++) {
            searchTerm += '*' + this.searchQuery + '*+OR+' + expressions[it] + '%3A';
        }

        return searchTerm + '*' + this.searchQuery + '*';
    }
    /**
     * Get the search result leibniz letters by ID
     */
    getLeibnizLetters(retrunedSearchResults: HTMLObjectElement[]) {
        const results: string[] = [];
        for (let it = 0; it < retrunedSearchResults.length; it++) {
            results.push(retrunedSearchResults[it].id);
        }
        if (results.length) {
            const filter = this.filterExpression(results);
            const query = this.queryExpressionWithLetterID(filter, 'leibniz', 'letterID');
            this.extendedSearchForExternalLetters(query);
        }
    }
    /**
     * Get text search results from Briefportal Leibniz
     */
    getResultsLeibniz() {
        // cache the leibniz ontology before starting the text search to prevent unnecessary loading of ontology during the process
        this._cacheService.getEntityDefinitionsForOntologies(
            [this._appInitService.getSettings().ontologyIRI + '/ontology/0801/leibniz/v2']).subscribe(
            (info2: OntologyInformation) => {
                const searchRoute = 'https://solr.leibniz.sub.uni-goettingen.de/solr/leibniz/select?q=type%3Abrief+AND+(+volltext%3A';
                const proxyurl = 'https://cors-anywhere.herokuapp.com/';
                const experssions = ['id', 'reihe', 'band', 'brief_nummer', 'all_suggest', 'ort_anzeige',
                    'datum_anzeige', 'datum_gregorianisch', 'datum_julianisch', 'kontext'];
                const format = ')&rows=9999&wt=json';
                const searchExpression = this.makeLeibnizSearchExpressions(searchRoute, experssions) + format;
                fetch(searchExpression) // https://cors-anywhere.herokuapp.com/https://example.com
                    .then(response => response.json())
                    .then(contents => {
                        this.getLeibnizLetters(contents.response.docs);
                    })
                    .catch(() => console.log('Can’t access ' + searchExpression + ' response. Blocked by browser?'));
            });
    }
    getNewtonLetters(content: string) {
        /*todo just parses the first page of the results due to hard coded pagination*/
        const results: string[] = [];
        const html = new DOMParser().parseFromString(content, 'text/html');
        const returnedSearchResults = html.getElementsByTagName('tr');
        for (let it = 0; it < returnedSearchResults.length; it++) {

            // every row of the result table has two cells 0: key 1:content
            const links = returnedSearchResults[it].children[1].getElementsByClassName('link_wrapper');
            if (links.length) {
                const hrefSegmented = links[0].children[0].getAttribute('href').split('/');
                const letterID = hrefSegmented[hrefSegmented.length - 1];
                results.push(letterID);
            }
        }
        if (results.length) {
            const filter = this.filterExpression(results);
            const query = this.queryExpressionWithLetterID(filter, 'newton', 'newtonProjectID');
            this.extendedSearchForExternalLetters(query);
        }
    }
    /**
     * Get text search results from the Newton Project
     */
    getResultsNewton() {
        // cache the newton ontology before starting the text search to prevent unnecessary loading of ontology during the process
        this._cacheService.getEntityDefinitionsForOntologies(
            [this._appInitService.getSettings().ontologyIRI + '/ontology/0801/newton/v2']).subscribe(
            (info2: OntologyInformation) => {
                const searchRoute = 'http://www.newtonproject.ox.ac.uk/search/results?n=25&cat=';
                const proxyurl = 'https://cors-anywhere.herokuapp.com/';
                const mathCategory = 'Mathematics&ce=0&keyword=';
                const opticsCategory = 'Optics&ce=0&keyword=';
                const queryTail = '&sort=relevance';
                const searchExpressions = [searchRoute + mathCategory + this.searchQuery + queryTail,
                    searchRoute + opticsCategory + this.searchQuery + queryTail];
                for (let it = 0; it < searchExpressions.length; it++) {
                    fetch(proxyurl + searchExpressions[it]) // https://cors-anywhere.herokuapp.com/https://example.com
                        .then(response => response.text())
                        .then(contents => {
                            this.getNewtonLetters(contents);
                        })
                        .catch(() => console.log('Can’t access ' + searchExpressions[it] + ' response. Blocked by browser?'));
                }
            });
    }

    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {
        this.isLoading = true;

        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            // cache the beol ontology and its dependencies before starting the text search to
            // prevent unnecessary loading of ontology during the process
            this._cacheService.getEntityDefinitionsForOntologies(
                [this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2']).subscribe(
                (info2: OntologyInformation) => {

                    const searchParams = { limitToProject: this.beolIri };
                    // perform count query
                    if (this.offset === 0) {

                        this._searchService.doFullTextSearchCountQueryCountQueryResult(this.searchQuery, searchParams)
                            .subscribe(
                                this.showNumberOfAllResults,
                                (error: any) => {
                                    this.errorMessage = <any>error;
                                    // console.log('numberOfAllResults', this.numberOfAllResults);
                                }
                            );
                        // here get the search results from the other projects
                        this.getResultsLeibniz();
                        this.getResultsNewton();

                    }

                    // perform full text search

                    this._searchService.doFullTextSearchReadResourceSequence(this.searchQuery, this.offset, searchParams)
                        .subscribe(
                            this.processSearchResults, // function pointer
                            (error: any) => {
                                this.errorMessage = <any>error;
                            },
                        );
                });

            // EXTENDED SEARCH
        } else if (this.searchMode === 'extended') {
            console.log(this.searchQuery)
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
