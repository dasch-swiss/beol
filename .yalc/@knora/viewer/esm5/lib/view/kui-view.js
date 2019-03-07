var KuiView = /** @class */ (function () {
    function KuiView(_route, _searchService, _searchParamsService, _router) {
        var _this = this;
        this._route = _route;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this._router = _router;
        /**
         *
         * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
         * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
         *
         * @param {ReadResourcesSequence} searchResult the answer to a search request.
         */
        this.processSearchResults = function (searchResult) {
            // assign ontology information to a variable so it can be used in the component's template
            if (_this.ontologyInfo === undefined) {
                // init ontology information
                _this.ontologyInfo = searchResult.ontologyInformation;
            }
            else {
                // update ontology information
                _this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
            }
            // append results to search results
            _this.result = _this.result.concat(searchResult.resources);
            _this.isLoading = false;
            _this.rerender = false;
        };
        /**
         * Shows total number of results returned by a count query.
         *
         * @param {ApiServiceResult} countQueryResult the response to a count query.
         */
        this.showNumberOfAllResults = function (countQueryResult) {
            _this.numberOfAllResults = countQueryResult.numberOfResults;
            if (_this.numberOfAllResults > 0) {
                // offset is 0-based
                // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                _this.maxOffset = Math.floor((_this.numberOfAllResults - 1) / _this.pagingLimit);
            }
            else {
                _this.maxOffset = 0;
            }
        };
    }
    KuiView.prototype.ngOnInit = function () {
        var _this = this;
        this.navigationSubscription = this._route.paramMap.subscribe(function (params) {
            _this.searchMode = params.get('mode');
            // init offset  and result
            _this.offset = 0;
            _this.result = [];
            if (_this.searchMode === 'fulltext') {
                _this.searchQuery = params.get('q');
            }
            else if (_this.searchMode === 'extended') {
                _this.gravsearchGenerator = _this._searchParamsService.getSearchParams();
                _this.generateGravsearchQuery();
            }
            _this.rerender = true;
            _this.getResult();
        });
    };
    KuiView.prototype.ngOnDestroy = function () {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    };
    /**
     * Generates the Gravsearch query for the current offset.
     */
    KuiView.prototype.generateGravsearchQuery = function () {
        var gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], { relativeTo: this._route });
            return;
        }
        else {
            this.searchQuery = gravsearch;
        }
    };
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    KuiView.prototype.getResult = function () {
        var _this = this;
        this.isLoading = true;
        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            if (this.offset === 0) {
                // perform count query
                this._searchService.doFullTextSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(this.showNumberOfAllResults, function (error) {
                    _this.errorMessage = error;
                });
            }
            // perform full text search
            this._searchService.doFullTextSearchReadResourceSequence(this.searchQuery, this.offset)
                .subscribe(this.processSearchResults, // function pointer
            function (error) {
                _this.errorMessage = error;
            });
            // EXTENDED SEARCH
        }
        else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService.doExtendedSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(this.showNumberOfAllResults, function (error) {
                    _this.errorMessage = error;
                });
            }
            this._searchService.doExtendedSearchReadResourceSequence(this.searchQuery)
                .subscribe(this.processSearchResults, // function pointer
            function (error) {
                _this.errorMessage = error;
            });
        }
        else {
            this.errorMessage = "search mode invalid: " + this.searchMode;
        }
    };
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     *
     * @param {number} offset
     * @returns void
     */
    KuiView.prototype.loadMore = function (offset) {
        // update the page offset when the end of scroll is reached to get the next page of search results
        if (this.offset < this.maxOffset) {
            this.offset++;
        }
        else {
            return;
        }
        if (this.searchMode === 'extended') {
            this.generateGravsearchQuery();
        }
        this.getResult();
    };
    return KuiView;
}());
export { KuiView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3VpLXZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcva3VpLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUE7SUFpQkksaUJBQ2MsTUFBc0IsRUFDdEIsY0FBNkIsRUFDN0Isb0JBQXlDLEVBQ3pDLE9BQWU7UUFKN0IsaUJBS0M7UUFKYSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFrRzdCOzs7Ozs7V0FNRztRQUNLLHlCQUFvQixHQUFHLFVBQUMsWUFBbUM7WUFFL0QsMEZBQTBGO1lBQzFGLElBQUksS0FBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLDRCQUE0QjtnQkFDNUIsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsbUJBQW1CLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0gsOEJBQThCO2dCQUM5QixLQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2pGO1lBQ0QsbUNBQW1DO1lBQ25DLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXpELEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLENBQUMsQ0FBQTtRQUVEOzs7O1dBSUc7UUFDSywyQkFBc0IsR0FBRyxVQUFDLGdCQUFrQztZQUNoRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1lBRTNELElBQUksS0FBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtnQkFDN0Isb0JBQW9CO2dCQUNwQixxRUFBcUU7Z0JBQ3JFLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDakY7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUE7SUF6SUQsQ0FBQztJQUVELDBCQUFRLEdBQVI7UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWM7WUFDeEUsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXJDLDBCQUEwQjtZQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVqQixJQUFJLEtBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEM7aUJBQU0sSUFBSSxLQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtnQkFDdkMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkUsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDbEM7WUFFRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLHNCQUFzQixLQUFLLFNBQVMsRUFBRTtZQUMzQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDTyx5Q0FBdUIsR0FBakM7UUFFSSxJQUFNLFVBQVUsR0FBcUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RixJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDdEIseURBQXlEO1lBQ3pELGFBQWE7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELE9BQU87U0FDVjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBWSxVQUFVLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDTywyQkFBUyxHQUFuQjtRQUFBLGlCQWdEQztRQS9DRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUVoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsMENBQTBDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztxQkFDM0UsU0FBUyxDQUNOLElBQUksQ0FBQyxzQkFBc0IsRUFDM0IsVUFBQyxLQUFVO29CQUNQLEtBQUksQ0FBQyxZQUFZLEdBQVMsS0FBSyxDQUFDO2dCQUNwQyxDQUFDLENBQ0osQ0FBQzthQUNUO1lBRUQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsb0NBQW9DLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNsRixTQUFTLENBQ04sSUFBSSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQjtZQUM5QyxVQUFDLEtBQVU7Z0JBQ1AsS0FBSSxDQUFDLFlBQVksR0FBUyxLQUFLLENBQUM7WUFDcEMsQ0FBQyxDQUNKLENBQUM7WUFFTixrQkFBa0I7U0FDckI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLHNCQUFzQjtZQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7cUJBQzNFLFNBQVMsQ0FDTixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLFVBQUMsS0FBVTtvQkFDUCxLQUFJLENBQUMsWUFBWSxHQUFTLEtBQUssQ0FBQztnQkFDcEMsQ0FBQyxDQUNKLENBQUM7YUFDVDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsb0NBQW9DLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDckUsU0FBUyxDQUNOLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUI7WUFDOUMsVUFBQyxLQUFVO2dCQUNQLEtBQUksQ0FBQyxZQUFZLEdBQVMsS0FBSyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1NBRWQ7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsMEJBQXdCLElBQUksQ0FBQyxVQUFZLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBNENEOzs7Ozs7T0FNRztJQUNILDBCQUFRLEdBQVIsVUFBUyxNQUFjO1FBQ25CLGtHQUFrRztRQUNsRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVMLGNBQUM7QUFBRCxDQUFDLEFBdkxELElBdUxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIENvdW50UXVlcnlSZXN1bHQsXG4gICAgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsXG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gICAgT250b2xvZ3lJbmZvcm1hdGlvbixcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgU2VhcmNoU2VydmljZVxufSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEt1aVZpZXcgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBhYnN0cmFjdCBvZmZzZXQ6IG51bWJlcjtcbiAgICBhYnN0cmFjdCBtYXhPZmZzZXQ6IG51bWJlcjtcbiAgICBhYnN0cmFjdCByZXN1bHQ6IFJlYWRSZXNvdXJjZVtdO1xuICAgIGFic3RyYWN0IG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICBhYnN0cmFjdCBuYXZpZ2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYWJzdHJhY3QgZ3JhdnNlYXJjaEdlbmVyYXRvcjogRXh0ZW5kZWRTZWFyY2hQYXJhbXM7XG4gICAgYWJzdHJhY3Qgc2VhcmNoUXVlcnk6IHN0cmluZztcbiAgICBhYnN0cmFjdCBzZWFyY2hNb2RlOiBzdHJpbmc7XG4gICAgYWJzdHJhY3QgbnVtYmVyT2ZBbGxSZXN1bHRzOiBudW1iZXI7XG4gICAgYWJzdHJhY3QgS25vcmFDb25zdGFudHM6IEtub3JhQ29uc3RhbnRzO1xuICAgIGFic3RyYWN0IHJlcmVuZGVyOiBib29sZWFuO1xuICAgIGFic3RyYWN0IGlzTG9hZGluZzogYm9vbGVhbjtcbiAgICBhYnN0cmFjdCBlcnJvck1lc3NhZ2U6IGFueTtcbiAgICBhYnN0cmFjdCBwYWdpbmdMaW1pdDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcm90ZWN0ZWQgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLl9yb3V0ZS5wYXJhbU1hcC5zdWJzY3JpYmUoKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaE1vZGUgPSBwYXJhbXMuZ2V0KCdtb2RlJyk7XG5cbiAgICAgICAgICAgIC8vIGluaXQgb2Zmc2V0ICBhbmQgcmVzdWx0XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZnVsbHRleHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHBhcmFtcy5nZXQoJ3EnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yID0gdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5nZXRTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdWJzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIEdyYXZzZWFyY2ggcXVlcnkgZm9yIHRoZSBjdXJyZW50IG9mZnNldC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKSB7XG5cbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaDogc3RyaW5nIHwgYm9vbGVhbiA9IHRoaXMuZ3JhdnNlYXJjaEdlbmVyYXRvci5nZW5lcmF0ZUdyYXZzZWFyY2godGhpcy5vZmZzZXQpO1xuICAgICAgICBpZiAoZ3JhdnNlYXJjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIG5vIHZhbGlkIHNlYXJjaCBwYXJhbXMgKGFwcGxpY2F0aW9uIGhhcyBiZWVuIHJlbG9hZGVkKVxuICAgICAgICAgICAgLy8gZ28gdG8gcm9vdFxuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gPHN0cmluZz4gZ3JhdnNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzZWFyY2ggcmVzdWx0IGZyb20gS25vcmEgLSAyIGNhc2VzOiBzaW1wbGUgc2VhcmNoIGFuZCBleHRlbmRlZCBzZWFyY2hcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UmVzdWx0KCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gRlVMTFRFWFQgU0VBUkNIXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBjb3VudCBxdWVyeVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2UuZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KHRoaXMuc2VhcmNoUXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT4gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBlcmZvcm0gZnVsbCB0ZXh0IHNlYXJjaFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZS5kb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UodGhpcy5zZWFyY2hRdWVyeSwgdGhpcy5vZmZzZXQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VhcmNoUmVzdWx0cywgLy8gZnVuY3Rpb24gcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PiBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIEVYVEVOREVEIFNFQVJDSFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2V4dGVuZGVkJykge1xuICAgICAgICAgICAgLy8gcGVyZm9ybSBjb3VudCBxdWVyeVxuICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQodGhpcy5zZWFyY2hRdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mQWxsUmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PiBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHRoaXMuc2VhcmNoUXVlcnkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VhcmNoUmVzdWx0cywgLy8gZnVuY3Rpb24gcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PiBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gYHNlYXJjaCBtb2RlIGludmFsaWQ6ICR7dGhpcy5zZWFyY2hNb2RlfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnZlcnRzIHNlYXJjaCByZXN1bHRzIGZyb20gSlNPTi1MRCB0byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0gYW5kIHJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IG9udG9sb2d5IGVudGl0aWVzLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIGBzdWJzY3JpYmVgIGFzIGEgcG9pbnRlciAoaW5zdGVhZCBvZiByZWR1bmRhbnRseSBkZWZpbmluZyB0aGUgc2FtZSBsYW1iZGEgZnVuY3Rpb24pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkUmVzb3VyY2VzU2VxdWVuY2V9IHNlYXJjaFJlc3VsdCB0aGUgYW5zd2VyIHRvIGEgc2VhcmNoIHJlcXVlc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9jZXNzU2VhcmNoUmVzdWx0cyA9IChzZWFyY2hSZXN1bHQ6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuXG4gICAgICAgIC8vIGFzc2lnbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBhIHZhcmlhYmxlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZVxuICAgICAgICBpZiAodGhpcy5vbnRvbG9neUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gaW5pdCBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8gPSBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXBwZW5kIHJlc3VsdHMgdG8gc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLnJlc3VsdC5jb25jYXQoc2VhcmNoUmVzdWx0LnJlc291cmNlcyk7XG5cbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXJlbmRlciA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgcmV0dXJuZWQgYnkgYSBjb3VudCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXBpU2VydmljZVJlc3VsdH0gY291bnRRdWVyeVJlc3VsdCB0aGUgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dOdW1iZXJPZkFsbFJlc3VsdHMgPSAoY291bnRRdWVyeVJlc3VsdDogQ291bnRRdWVyeVJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLm51bWJlck9mQWxsUmVzdWx0cyA9IGNvdW50UXVlcnlSZXN1bHQubnVtYmVyT2ZSZXN1bHRzO1xuXG4gICAgICAgIGlmICh0aGlzLm51bWJlck9mQWxsUmVzdWx0cyA+IDApIHtcbiAgICAgICAgICAgIC8vIG9mZnNldCBpcyAwLWJhc2VkXG4gICAgICAgICAgICAvLyBpZiBudW1iZXJPZkFsbFJlc3VsdHMgZXF1YWxzIHRoZSBwYWdpbmdMaW1pdCwgdGhlIG1heC4gb2Zmc2V0IGlzIDBcbiAgICAgICAgICAgIHRoaXMubWF4T2Zmc2V0ID0gTWF0aC5mbG9vcigodGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgLSAxKSAvIHRoaXMucGFnaW5nTGltaXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIG5leHQgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIFRoZSByZXN1bHRzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGxvYWRNb3JlKG9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGFnZSBvZmZzZXQgd2hlbiB0aGUgZW5kIG9mIHNjcm9sbCBpcyByZWFjaGVkIHRvIGdldCB0aGUgbmV4dCBwYWdlIG9mIHNlYXJjaCByZXN1bHRzXG4gICAgICAgIGlmICh0aGlzLm9mZnNldCA8IHRoaXMubWF4T2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2V4dGVuZGVkJykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRSZXN1bHQoKTtcbiAgICB9XG5cbn1cbiJdfQ==