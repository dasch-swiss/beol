(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/animations'), require('@angular/forms'), require('@knora/core'), require('jdnconvertiblecalendar'), require('@angular/material'), require('jdnconvertiblecalendardateadapter'), require('@angular/common'), require('@angular/platform-browser/animations'), require('@knora/action'), require('@knora/viewer')) :
    typeof define === 'function' && define.amd ? define('@knora/search', ['exports', '@angular/core', '@angular/router', '@angular/animations', '@angular/forms', '@knora/core', 'jdnconvertiblecalendar', '@angular/material', 'jdnconvertiblecalendardateadapter', '@angular/common', '@angular/platform-browser/animations', '@knora/action', '@knora/viewer'], factory) :
    (factory((global.knora = global.knora || {}, global.knora.search = {}),global.ng.core,global.ng.router,global.ng.animations,global.ng.forms,null,null,global.ng.material,null,global.ng.common,global.ng.platformBrowser.animations,null,null));
}(this, (function (exports,core,router,animations,forms,core$1,jdnconvertiblecalendar,material,jdnconvertiblecalendardateadapter,common,animations$1,action,viewer) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var SearchComponent = /** @class */ (function () {
        function SearchComponent(_route, _router, _eleRef) {
            this._route = _route;
            this._router = _router;
            this._eleRef = _eleRef;
            this.route = '/search';
            this.searchPanelFocus = false;
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            this.focusOnSimple = 'inactive';
            this.focusOnExtended = 'inactive';
            this.searchLabel = 'Search';
            this.showSimpleSearch = true;
        }
        SearchComponent.prototype.ngOnInit = function () {
        };
        /**
         * @ignore
         * Do search on Enter click, reset search on Escape
         * @param search_ele
         * @param event
         * @returns void
         */
        SearchComponent.prototype.onKey = function (search_ele, event) {
            this.focusOnSimple = 'active';
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
                this.doSearch(search_ele);
            }
            if (event.key === 'Escape' || event.keyCode === 27 || event.which === 27) {
                this.resetSearch(search_ele);
            }
        };
        /**
         * Realise a simple search
         * @param {HTMLElement} search_ele
         * @returns void
         */
        SearchComponent.prototype.doSearch = function (search_ele) {
            var e_1, _a;
            if (this.searchQuery !== undefined && this.searchQuery !== null) {
                this.toggleMenu('simpleSearch');
                this._router.navigate([this.route + '/fulltext/' + this.searchQuery]);
                // this._router.navigate(['/search/fulltext/' + this.searchQuery], { relativeTo: this._route });
                // push the search query into the local storage prevSearch array (previous search)
                // to have a list of recent search requests
                var existingPrevSearch = JSON.parse(localStorage.getItem('prevSearch'));
                if (existingPrevSearch === null) {
                    existingPrevSearch = [];
                }
                var i = 0;
                try {
                    for (var existingPrevSearch_1 = __values(existingPrevSearch), existingPrevSearch_1_1 = existingPrevSearch_1.next(); !existingPrevSearch_1_1.done; existingPrevSearch_1_1 = existingPrevSearch_1.next()) {
                        var entry = existingPrevSearch_1_1.value;
                        // remove entry, if exists already
                        if (this.searchQuery === entry) {
                            existingPrevSearch.splice(i, 1);
                        }
                        i++;
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (existingPrevSearch_1_1 && !existingPrevSearch_1_1.done && (_a = existingPrevSearch_1.return))
                            _a.call(existingPrevSearch_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                existingPrevSearch.push(this.searchQuery);
                localStorage.setItem('prevSearch', JSON.stringify(existingPrevSearch));
                // TODO: save the previous search queries somewhere in the user's profile
            }
            else {
                search_ele.focus();
                this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            }
        };
        /**
         * @ignore
         *
         * Reset the search
         * @param {HTMLElement} search_ele
         * @returns void
         */
        SearchComponent.prototype.resetSearch = function (search_ele) {
            this.searchQuery = null;
            search_ele.focus();
            this.focusOnSimple = 'inactive';
            this.searchPanelFocus = !this.searchPanelFocus;
        };
        /**
         * @ignore
         *
         * Realise a previous search
         * @param {string} query
         * @returns void
         */
        SearchComponent.prototype.doPrevSearch = function (query) {
            this.searchQuery = query;
            this._router.navigate([this.route + '/fulltext/' + query], { relativeTo: this._route });
            this.toggleMenu('simpleSearch');
        };
        /**
         * @ignore
         *
         * Reset previous searches - the whole previous search or specific item by name
         * @param {string} name term of the search
         * @returns void
         */
        SearchComponent.prototype.resetPrevSearch = function (name) {
            if (name === void 0) {
                name = null;
            }
            if (name) {
                // delete only this item with the name ...
                var i = this.prevSearch.indexOf(name);
                this.prevSearch.splice(i, 1);
                localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
            }
            else {
                // delete the whole "previous search" array
                localStorage.removeItem('prevSearch');
            }
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        };
        /**
         * @ignore
         * Set simple focus to active
         *
         * @returns void
         */
        SearchComponent.prototype.setFocus = function () {
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            this.focusOnSimple = 'active';
            this.searchPanelFocus = !this.searchPanelFocus;
        };
        /**
         * @ignore
         *
         * Switch according to the focus between simple or extended search
         *
         * @param {string} name 2 cases: simpleSearch or extendedSearch
         * @returns void
         */
        SearchComponent.prototype.toggleMenu = function (name) {
            switch (name) {
                case 'simpleSearch':
                    this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
                    this.focusOnSimple = (this.focusOnSimple === 'active' ? 'inactive' : 'active');
                    this.showSimpleSearch = true;
                    break;
                case 'extendedSearch':
                    this.focusOnExtended = (this.focusOnExtended === 'active' ? 'inactive' : 'active');
                    this.showSimpleSearch = false;
                    break;
            }
        };
        SearchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-search',
                        template: "<div class=\"search-bar-elements\">\n\n    <!-- the next element - div.extended-search-panel - is a hidden dropdown filter menu -->\n\n    <div class=\"search-panel\" [class.active]=\"searchPanelFocus\">\n        <div>\n            <button class=\"prefix\" (click)=\"doSearch(search)\">\n                <mat-icon>search</mat-icon>\n            </button>\n        </div>\n\n        <div class=\"input-field\">\n            <input #search autocomplete=\"off\" type=\"search\" [placeholder]=\"searchLabel\" [(ngModel)]=\"searchQuery\" name=\"search\" (keyup.esc)=\"resetSearch(search)\" (keyup)=\"onKey(search, $event)\" (click)=\"setFocus()\" (focus)=\"toggleMenu('simpleSearch')\" [disabled]=\"focusOnExtended === 'active'\" />\n        </div>\n\n        <!-- switch button: on some focus we need a close button for the simple or extended panel -->\n        <div>\n            <button class=\"suffix\" *ngIf=\"focusOnSimple === 'active'\" (click)=\"resetSearch(search)\">\n                <mat-icon>close</mat-icon>\n            </button>\n            <button class=\"suffix\" *ngIf=\"focusOnSimple === 'inactive'\">\n            </button>\n        </div>\n\n        <!-- the search panel has two \"dropdown\" menus: one for simple search and another one for the extended search -->\n        <div class=\"kui-menu simple-search\" [@simpleSearchMenu]=\"focusOnSimple\" *ngIf=\"showSimpleSearch\">\n            <mat-list class=\"kui-previous-search-list\">\n                <mat-list-item *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                    <h4 mat-line *ngIf=\"i<10\" (click)=\"doPrevSearch(item)\">{{item}}</h4>\n                    <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                        <mat-icon aria-label=\"close\">close</mat-icon>\n                    </button>\n                </mat-list-item>\n            </mat-list>\n            <button mat-stroked-button color=\"accent\" class=\"right\" (click)=\"resetPrevSearch()\" *ngIf=\"prevSearch\">Clear</button>\n        </div>\n\n        <div class=\"kui-menu extended-search\" [@extendedSearchMenu]=\"focusOnExtended\">\n            <div class=\"kui-menu-header\">\n                <span class=\"kui-menu-title\">\n                    <h4>Advanced search</h4>\n                </span>\n                <span class=\"kui-menu-action\">\n                    <button mat-icon-button (click)=\"toggleMenu('extendedSearch')\">\n                        <mat-icon>close</mat-icon>\n                    </button>\n                </span>\n            </div>\n            <div class=\"extended-search-box\">\n                <kui-extended-search [route]=\"route\" (toggleExtendedSearchForm)=\"toggleMenu('extendedSearch')\"></kui-extended-search>\n            </div>\n        </div>\n    </div>\n\n    <!-- Extended search button to display the extended search form in the search panel -->\n    <button mat-button type=\"button\" color=\"primary\" class=\"advanced-search-button\" (click)=\"toggleMenu('extendedSearch')\">\n        advanced\n    </button>\n\n</div>",
                        styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{display:block;margin-left:auto;margin-right:auto}.close{right:12px}.extended-search-box{margin:12px}.advanced-search-button{margin-left:10px}.full-width{width:100%}.hide{display:none}.inactive,.mute{color:#7a7a7a}.search-panel{background-color:#f9f9f9;border-radius:4px;display:inline-flex;height:40px;width:680px;z-index:10}.search-panel:hover{box-shadow:0 1px 3px rgba(0,0,0,.5)}.search-panel div.input-field{flex:1}.search-panel div.input-field input{border-style:none;font-size:14pt;height:38px;position:absolute;width:calc(100% - 80px)}.search-panel div.input-field input:active,.search-panel div.input-field input:focus{outline:0}.search-panel div .prefix,.search-panel div .suffix{background-color:#fff;border-radius:3px;border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:40px}.search-panel div .prefix:active,.search-panel div .suffix:active{color:#515151}.search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-menu{box-shadow:0 3px 5px -1px rgba(11,11,11,.2),0 6px 10px 0 rgba(11,11,11,.14),0 1px 18px 0 rgba(11,11,11,.12);background-color:#f9f9f9;border-radius:4px;position:absolute}.kui-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-block;height:48px;width:100%}.kui-menu .kui-menu-header .kui-menu-title{float:left;font-size:14px;font-weight:400;margin-top:4px;padding:12px}.kui-menu .kui-menu-header .kui-menu-action{float:right;margin:4px}.kui-menu.extended-search,.kui-menu.simple-search{min-height:680px;width:680px}.kui-menu.simple-search{padding-top:60px;z-index:-1}.kui-menu.simple-search .kui-previous-search-list .mat-list-item{cursor:pointer}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover{background-color:#f9f9f9}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover mat-icon{display:block}.kui-menu.simple-search .kui-previous-search-list .mat-list-item mat-icon{display:none}.kui-menu.simple-search .right{margin-top:12px;margin-left:16px}.kui-menu.extended-search{z-index:20}.search-bar-elements{z-index:100}.show{display:block}@media screen and (max-width:1024px){.search-panel{width:480px}.search-panel div.input-field input{width:calc(480px - 80px)}.kui-menu.extended-search,.kui-menu.simple-search{width:480px}}@media screen and (max-width:768px){.search-panel{width:calc(480px - 160px)}.search-panel div.input-field input{width:calc(480px - 160px - 80px)}.kui-menu.extended-search,.kui-menu.simple-search{width:calc(480px - 80px)}}"],
                        animations: [
                            animations.trigger('simpleSearchMenu', [
                                animations.state('inactive', animations.style({ display: 'none' })),
                                animations.state('active', animations.style({ display: 'block' })),
                                animations.transition('inactive => true', animations.animate('100ms ease-in')),
                                animations.transition('true => inactive', animations.animate('100ms ease-out'))
                            ]),
                            animations.trigger('extendedSearchMenu', [
                                animations.state('inactive', animations.style({ display: 'none' })),
                                animations.state('active', animations.style({ display: 'block' })),
                                animations.transition('inactive => true', animations.animate('100ms ease-in')),
                                animations.transition('true => inactive', animations.animate('100ms ease-out'))
                            ]),
                        ]
                    },] },
        ];
        /** @nocollapse */
        SearchComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute },
                { type: router.Router },
                { type: core.ElementRef }
            ];
        };
        SearchComponent.propDecorators = {
            route: [{ type: core.Input }]
        };
        return SearchComponent;
    }());

    var SearchPanelComponent = /** @class */ (function () {
        function SearchPanelComponent() {
            this.route = '/search';
            this.showMenu = false;
            this.focusOnExtended = 'inactive';
        }
        /**
         * Show or hide the extended search menu
         *
         * @returns void
         */
        SearchPanelComponent.prototype.toggleMenu = function () {
            this.showMenu = !this.showMenu;
            this.focusOnExtended = (this.focusOnExtended === 'active' ? 'inactive' : 'active');
        };
        SearchPanelComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-search-panel',
                        template: "<div class=\"kui-search-panel\">\n\n    <div class=\"kui-search-bar\">\n\n        <div class=\"fulltext-search\">\n            <kui-fulltext-search [route]=\"route\"></kui-fulltext-search>\n        </div>\n\n        <div *ngIf=\"showMenu\" [@extendedSearchMenu]=\"focusOnExtended\" class=\"kui-menu extended-search\">\n            <div class=\"kui-menu-header\">\n                <span class=\"kui-menu-title\">\n                    <h4>Advanced search</h4>\n                </span>\n                <span class=\"kui-menu-action\">\n                    <button mat-icon-button (click)=\"toggleMenu()\">\n                        <mat-icon>close</mat-icon>\n                    </button>\n                </span>\n            </div>\n            <div class=\"extended-search-box\">\n                <kui-extended-search [route]=\"route\" (toggleExtendedSearchForm)=\"toggleMenu()\"></kui-extended-search>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"advanced-btn\">\n        <button mat-button color=\"primary\" (click)=\"toggleMenu()\">advanced</button>\n    </div>\n\n</div>",
                        styles: [".advanced-btn{margin-left:10px}.kui-search-panel{display:flex;position:relative;z-index:100}.kui-search-bar{background-color:#f9f9f9;border-radius:4px;display:inline-flex;height:40px;position:relative;z-index:10}.kui-search-bar:hover{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-menu{box-shadow:0 3px 5px -1px rgba(11,11,11,.2),0 6px 10px 0 rgba(11,11,11,.14),0 1px 18px 0 rgba(11,11,11,.12);background-color:#f9f9f9;border-radius:4px;position:absolute}.kui-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-block;height:48px;width:100%}.kui-menu .kui-menu-header .kui-menu-title{float:left;font-size:14px;font-weight:400;margin-top:4px;padding:12px}.kui-menu .kui-menu-header .kui-menu-action{float:right;margin:4px}.kui-menu.extended-search{min-height:680px;width:680px;z-index:20}.extended-search-box{margin:12px}@media screen and (max-width:1024px){.kui-search-bar{width:480px}.kui-search-bar div.input-field input{width:calc(480px - 80px)}.fulltext-search,.kui-menu.extended-search{width:480px}}@media screen and (max-width:768px){.kui-search-bar{width:calc(480px - 160px)}.kui-search-bar div.input-field input{width:calc(480px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(480px - 80px)}}"],
                        animations: [
                            animations.trigger('extendedSearchMenu', [
                                animations.state('inactive', animations.style({ display: 'none' })),
                                animations.state('active', animations.style({ display: 'block' })),
                                animations.transition('inactive => active', animations.animate('100ms ease-in')),
                                animations.transition('active => inactive', animations.animate('100ms ease-out'))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        SearchPanelComponent.ctorParameters = function () { return []; };
        SearchPanelComponent.propDecorators = {
            route: [{ type: core.Input }]
        };
        return SearchPanelComponent;
    }());

    var FulltextSearchComponent = /** @class */ (function () {
        function FulltextSearchComponent(_route, _router) {
            this._route = _route;
            this._router = _router;
            this.route = '/search';
            this.showSimpleSearch = true;
            this.searchPanelFocus = false;
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            this.focusOnSimple = 'inactive';
            this.searchLabel = 'Search';
        }
        FulltextSearchComponent.prototype.ngOnInit = function () {
        };
        /**
         * @ignore
         * Do search on Enter click, reset search on Escape
         * @param search_ele
         * @param event
         * @returns void
         */
        FulltextSearchComponent.prototype.onKey = function (search_ele, event) {
            this.focusOnSimple = 'active';
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
                this.doSearch(search_ele);
            }
            if (event.key === 'Escape' || event.keyCode === 27 || event.which === 27) {
                this.resetSearch(search_ele);
            }
        };
        /**
         * Realise a simple search
         * @param {HTMLElement} search_ele
         * @returns void
         */
        FulltextSearchComponent.prototype.doSearch = function (search_ele) {
            var e_1, _a;
            if (this.searchQuery !== undefined && this.searchQuery !== null) {
                this.toggleMenu();
                this._router.navigate([this.route + '/fulltext/' + this.searchQuery]);
                // this._router.navigate(['/search/fulltext/' + this.searchQuery], { relativeTo: this._route });
                // push the search query into the local storage prevSearch array (previous search)
                // to have a list of recent search requests
                var existingPrevSearch = JSON.parse(localStorage.getItem('prevSearch'));
                if (existingPrevSearch === null) {
                    existingPrevSearch = [];
                }
                var i = 0;
                try {
                    for (var existingPrevSearch_1 = __values(existingPrevSearch), existingPrevSearch_1_1 = existingPrevSearch_1.next(); !existingPrevSearch_1_1.done; existingPrevSearch_1_1 = existingPrevSearch_1.next()) {
                        var entry = existingPrevSearch_1_1.value;
                        // remove entry, if exists already
                        if (this.searchQuery === entry) {
                            existingPrevSearch.splice(i, 1);
                        }
                        i++;
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (existingPrevSearch_1_1 && !existingPrevSearch_1_1.done && (_a = existingPrevSearch_1.return))
                            _a.call(existingPrevSearch_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                existingPrevSearch.push(this.searchQuery);
                localStorage.setItem('prevSearch', JSON.stringify(existingPrevSearch));
            }
            else {
                search_ele.focus();
                this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            }
        };
        /**
         * Reset the search
         * @param {HTMLElement} search_ele
         * @returns void
         */
        FulltextSearchComponent.prototype.resetSearch = function (search_ele) {
            this.searchQuery = null;
            search_ele.focus();
            this.focusOnSimple = 'inactive';
            this.searchPanelFocus = !this.searchPanelFocus;
        };
        /**
         * Switch according to the focus between simple or extended search
         *
         * @param {string} name 2 cases: simpleSearch or extendedSearch
         * @returns void
         */
        FulltextSearchComponent.prototype.toggleMenu = function () {
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            this.focusOnSimple = (this.focusOnSimple === 'active' ? 'inactive' : 'active');
            this.showSimpleSearch = true;
        };
        /**
         * Set simple focus to active
         *
         * @returns void
         */
        FulltextSearchComponent.prototype.setFocus = function () {
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            this.focusOnSimple = 'active';
            this.searchPanelFocus = !this.searchPanelFocus;
        };
        /**
         * Realise a previous search
         * @param {string} query
         * @returns void
         */
        FulltextSearchComponent.prototype.doPrevSearch = function (query) {
            this.searchQuery = query;
            this._router.navigate([this.route + '/fulltext/' + query], { relativeTo: this._route });
            this.toggleMenu();
        };
        /**
         * Reset previous searches - the whole previous search or specific item by name
         * @param {string} name term of the search
         * @returns void
         */
        FulltextSearchComponent.prototype.resetPrevSearch = function (name) {
            if (name === void 0) {
                name = null;
            }
            if (name) {
                // delete only this item with the name ...
                var i = this.prevSearch.indexOf(name);
                this.prevSearch.splice(i, 1);
                localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
            }
            else {
                // delete the whole "previous search" array
                localStorage.removeItem('prevSearch');
            }
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        };
        FulltextSearchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-fulltext-search',
                        template: "<div class=\"search-bar-elements\">\n\n    <div class=\"fulltext-search-bar\" [class.active]=\"searchPanelFocus\">\n        <div>\n            <button class=\"prefix\" (click)=\"doSearch(search)\">\n                <mat-icon>search</mat-icon>\n            </button>\n        </div>\n\n        <div class=\"input-field\">\n            <input #search autocomplete=\"off\" type=\"search\" [placeholder]=\"searchLabel\" [(ngModel)]=\"searchQuery\" name=\"search\" (keyup.esc)=\"resetSearch(search)\" (keyup)=\"onKey(search, $event)\" (click)=\"setFocus()\" (focus)=\"toggleMenu()\" />\n        </div>\n\n        <!-- switch button: on some focus we need a close button for the simple -->\n        <div>\n            <button class=\"suffix\" *ngIf=\"focusOnSimple === 'active'\" (click)=\"resetSearch(search)\">\n                <mat-icon>close</mat-icon>\n            </button>\n            <button class=\"suffix\" *ngIf=\"focusOnSimple === 'inactive'\"></button>\n        </div>\n\n        <!-- \"dropdown\" menu for simple search -->\n        <div class=\"kui-menu simple-search\" [@fulltextSearchMenu]=\"focusOnSimple\" *ngIf=\"showSimpleSearch\">\n            <mat-list class=\"kui-previous-search-list\">\n                <mat-list-item *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                    <h4 mat-line *ngIf=\"i<10\" (click)=\"doPrevSearch(item)\">{{item}}</h4>\n                    <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                        <mat-icon aria-label=\"close\">close</mat-icon>\n                    </button>\n                </mat-list-item>\n            </mat-list>\n            <button mat-stroked-button color=\"accent\" class=\"right\" (click)=\"resetPrevSearch()\" *ngIf=\"prevSearch\">Clear</button>\n        </div>\n\n    </div>\n</div>",
                        styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.full-width{width:100%}.close{right:12px}.hide{display:none}.show{display:block}.search-bar-elements{display:flex;position:relative;z-index:100}.inactive{color:#7a7a7a}.fulltext-search-bar{background-color:#f9f9f9;border-radius:4px;display:inline-flex;height:40px;position:relative;width:680px;z-index:10}.fulltext-search-bar:hover{box-shadow:0 1px 3px rgba(0,0,0,.5)}.fulltext-search-bar div.input-field{flex:1}.fulltext-search-bar div.input-field input{border-style:none;font-size:14pt;height:38px;position:absolute;width:calc(100% - 80px)}.fulltext-search-bar div.input-field input:active,.fulltext-search-bar div.input-field input:focus{outline:0}.fulltext-search-bar div .prefix,.fulltext-search-bar div .suffix{background-color:#fff;border-radius:3px;border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:40px}.fulltext-search-bar div .prefix:active,.fulltext-search-bar div .suffix:active{color:#515151}.fulltext-search-bar div.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-menu{box-shadow:0 3px 5px -1px rgba(11,11,11,.2),0 6px 10px 0 rgba(11,11,11,.14),0 1px 18px 0 rgba(11,11,11,.12);background-color:#f9f9f9;border-radius:4px;position:absolute}.kui-menu.simple-search{min-height:680px;width:680px;padding-top:60px;z-index:-1}.kui-menu.simple-search .kui-previous-search-list .mat-list-item{cursor:pointer}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover{background-color:#f9f9f9}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover mat-icon{display:block}.kui-menu.simple-search .kui-previous-search-list .mat-list-item mat-icon{display:none}.kui-menu.simple-search .right{margin-top:12px;margin-left:16px}@media screen and (max-width:1024px){.fulltext-search-bar{width:480px}.fulltext-search-bar div.input-field input{width:calc(480px - 80px)}.kui-menu.simple-search{width:480px}}@media screen and (max-width:768px){.fulltext-search-bar{width:calc(480px - 160px)}.fulltext-search-bar div.input-field input{width:calc(480px - 160px - 80px)}.kui-menu.simple-search{width:calc(480px - 80px)}}"],
                        animations: [
                            animations.trigger('fulltextSearchMenu', [
                                animations.state('inactive', animations.style({ display: 'none' })),
                                animations.state('active', animations.style({ display: 'block' })),
                                animations.transition('inactive => active', animations.animate('100ms ease-in')),
                                animations.transition('active => inactive', animations.animate('100ms ease-out'))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        FulltextSearchComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute },
                { type: router.Router }
            ];
        };
        FulltextSearchComponent.propDecorators = {
            route: [{ type: core.Input }]
        };
        return FulltextSearchComponent;
    }());

    var ExtendedSearchComponent = /** @class */ (function () {
        function ExtendedSearchComponent(fb, _route, _router, _cacheService, _gravSearchService) {
            this.fb = fb;
            this._route = _route;
            this._router = _router;
            this._cacheService = _cacheService;
            this._gravSearchService = _gravSearchService;
            // trigger toggle for extended search form
            this.toggleExtendedSearchForm = new core.EventEmitter();
            // all available ontologies
            this.ontologies = [];
            // properties specified by the user
            this.activeProperties = [];
            // resource classes for the selected ontology
            this.resourceClasses = [];
            this.result = new core$1.ReadResourcesSequence([], 0);
            // form validation status
            this.formValid = false;
        }
        ExtendedSearchComponent.prototype.ngOnInit = function () {
            var _this = this;
            // parent form is empty, it gets passed to the child components
            this.form = this.fb.group({});
            // if form status changes, re-run validation
            this.form.statusChanges.subscribe(function (data) {
                _this.formValid = _this.validateForm();
                // console.log(this.form);
            });
            // initialize ontologies to be used for the ontologies selection in the search form
            this.initializeOntologies();
        };
        /**
         * Add a property to the search form.
         * @returns void
         */
        ExtendedSearchComponent.prototype.addProperty = function () {
            this.activeProperties.push(true);
        };
        /**
         * Remove the last property from the search form.
         * @returns void
         */
        ExtendedSearchComponent.prototype.removeProperty = function () {
            this.activeProperties.splice(-1, 1);
        };
        /**
         * Gets all available ontologies for the search form.
         * @returns void
         */
        ExtendedSearchComponent.prototype.initializeOntologies = function () {
            var _this = this;
            this._cacheService.getOntologiesMetadata().subscribe(function (ontologies) {
                _this.ontologies = ontologies;
            });
        };
        /**
         * Once an ontology has been selected, gets its classes and properties.
         * The classes and properties will be made available to the user for selection.
         *
         * @param ontologyIri Iri of the ontology chosen by the user.
         * @returns void
         */
        ExtendedSearchComponent.prototype.getResourceClassesAndPropertiesForOntology = function (ontologyIri) {
            var _this = this;
            // reset active resource class definition
            this.activeResourceClass = undefined;
            // reset specified properties
            this.activeProperties = [];
            this.activeOntology = ontologyIri;
            this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe(function (ontoInfo) {
                _this.resourceClasses = ontoInfo.getResourceClassesAsArray(true);
                _this.properties = ontoInfo.getProperties();
            });
        };
        /**
         * Once a resource class has been selected, gets its properties.
         * The properties will be made available to the user for selection.
         *
         * @param resourceClassIri
         * @returns void
         */
        ExtendedSearchComponent.prototype.getPropertiesForResourceClass = function (resourceClassIri) {
            var _this = this;
            // reset specified properties
            this.activeProperties = [];
            // if the client undoes the selection of a resource class, use the active ontology as a fallback
            if (resourceClassIri === null) {
                this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
            }
            else {
                this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(function (ontoInfo) {
                    _this.properties = ontoInfo.getProperties();
                    _this.activeResourceClass = ontoInfo.getResourceClasses()[resourceClassIri];
                });
            }
        };
        /**
         * Validates form and returns its status (boolean).
         */
        ExtendedSearchComponent.prototype.validateForm = function () {
            // check that either a resource class is selected or at least one property is specified
            return this.form.valid &&
                (this.propertyComponents.length > 0 || (this.resourceClassComponent !== undefined && this.resourceClassComponent.getResourceClassSelected() !== false));
        };
        /**
         * Resets the form (selected resource class and specified properties) preserving the active ontology.
         */
        ExtendedSearchComponent.prototype.resetForm = function () {
            if (this.activeOntology !== undefined) {
                this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
            }
        };
        /**
         * Creates a GravSearch query with the given form values and calls the extended search route.
         */
        ExtendedSearchComponent.prototype.submit = function () {
            if (!this.formValid)
                return; // check that from is valid
            var resClassOption = this.resourceClassComponent.getResourceClassSelected();
            var resClass;
            if (resClassOption !== false) {
                resClass = resClassOption;
            }
            var properties = this.propertyComponents.map(function (propComp) {
                return propComp.getPropertySelectedWithValue();
            });
            var gravsearch = this._gravSearchService.createGravsearchQuery(properties, resClass, 0);
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
            // toggle extended search form
            this.toggleExtendedSearchForm.emit(true);
        };
        ExtendedSearchComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-extended-search',
                        template: "<form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n\n  <div>\n    <kui-select-ontology *ngIf=\"ontologies.length > 0\" [formGroup]=\"form\" [ontologies]=\"ontologies\" (ontologySelected)=\"getResourceClassesAndPropertiesForOntology($event)\"></kui-select-ontology>\n  </div>\n\n  <div class=\"select-resource-class\" *ngIf=\"resourceClasses?.length > 0\">\n    <kui-select-resource-class #resourceClass [formGroup]=\"form\" [resourceClasses]=\"resourceClasses\" (resourceClassSelectedEvent)=\"getPropertiesForResourceClass($event)\"></kui-select-resource-class>\n  </div>\n\n  <div class=\"select-property\" *ngIf=\"properties !== undefined\">\n    <div *ngFor=\"let prop of activeProperties; let i = index\">\n\n      <kui-select-property #property [activeResourceClass]=\"activeResourceClass\" [formGroup]=\"form\" [index]=\"i\" [properties]=\"properties\"></kui-select-property>\n\n    </div>\n  </div>\n\n\n  <div>\n    <button mat-mini-fab class=\"property-buttons add-property-button\" color=\"primary\" type=\"button\" (click)=\"addProperty()\" [disabled]=\"activeOntology === undefined || activeProperties.length >= 4\">\n      <mat-icon aria-label=\"add a property\">add</mat-icon>\n    </button>\n\n    <button mat-mini-fab class=\"property-buttons remove-property-button\" color=\"primary\" type=\"button\" (click)=\"removeProperty()\" [disabled]=\"activeProperties.length == 0\">\n      <mat-icon aria-label=\"remove property\">remove</mat-icon>\n    </button>\n  </div>\n\n  <!--  <div>\n    <button mat-icon-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      <mat-icon aria-label=\"reset query form\">clear</mat-icon>\n    </button>\n\n    <button mat-icon-button type=\"submit\" [disabled]=\"!formValid\">\n      <mat-icon aria-label=\"submit query\">send</mat-icon>\n    </button>\n  </div> -->\n\n  <button class=\"extended-buttons extended-search-button\" mat-stroked-button color=\"primary\" type=\"submit\" [disabled]=\"!formValid\">\n    Search\n  </button>\n  <button class=\"extended-buttons reset\" mat-stroked-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n    Reset\n  </button>\n\n\n</form>\n",
                        styles: [".add-property-button{margin-right:5px}.extended-buttons{margin-top:25px}.extended-search-button{margin-right:5px}.property-buttons{margin-top:25px}.select-property{margin-left:22px}.select-resource-class{margin-left:12px}"]
                    },] },
        ];
        /** @nocollapse */
        ExtendedSearchComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] },
                { type: router.ActivatedRoute },
                { type: router.Router },
                { type: core$1.OntologyCacheService },
                { type: core$1.GravsearchGenerationService }
            ];
        };
        ExtendedSearchComponent.propDecorators = {
            route: [{ type: core.Input }],
            toggleExtendedSearchForm: [{ type: core.Output }],
            resourceClassComponent: [{ type: core.ViewChild, args: ['resourceClass',] }],
            propertyComponents: [{ type: core.ViewChildren, args: ['property',] }]
        };
        return ExtendedSearchComponent;
    }());

    var SelectOntologyComponent = /** @class */ (function () {
        function SelectOntologyComponent(fb) {
            this.fb = fb;
            this.ontologySelected = new core.EventEmitter();
        }
        SelectOntologyComponent.prototype.ngOnInit = function () {
            var _this = this;
            // build a form for the named graph selection
            this.form = this.fb.group({
                ontology: [null, forms.Validators.required]
            });
            // emit Iri of the ontology when being selected
            this.form.valueChanges.subscribe(function (data) {
                _this.ontologySelected.emit(data.ontology);
            });
            // add form to the parent form group
            this.formGroup.addControl('ontology', this.form);
        };
        SelectOntologyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-select-ontology',
                        template: "<mat-form-field *ngIf=\"ontologies.length > 0\">\n  <mat-select placeholder=\"Ontology\" [formControl]=\"form.controls['ontology']\">\n      <mat-option *ngFor=\"let onto of ontologies\" [value]=\"onto.id\">{{ onto.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        SelectOntologyComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        SelectOntologyComponent.propDecorators = {
            formGroup: [{ type: core.Input }],
            ontologies: [{ type: core.Input }],
            ontologySelected: [{ type: core.Output }]
        };
        return SelectOntologyComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise = Promise.resolve(null);
    var SelectPropertyComponent = /** @class */ (function () {
        function SelectPropertyComponent(fb) {
            this.fb = fb;
        }
        Object.defineProperty(SelectPropertyComponent.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            // setter method for properties when being updated by parent component
            set: function (value) {
                this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
                this._properties = value;
                this.updatePropertiesArray();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectPropertyComponent.prototype, "activeResourceClass", {
            // setter method for selected resource class
            set: function (value) {
                this._activeResourceClass = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectPropertyComponent.prototype.ngOnInit = function () {
            var _this = this;
            // build a form for the property selection
            this.form = this.fb.group({
                property: [null, forms.Validators.required],
                isSortCriterion: [false, forms.Validators.required]
            });
            // update the selected property
            this.form.valueChanges.subscribe(function (data) {
                var propIri = data.property;
                _this.propertySelected = _this._properties[propIri];
            });
            resolvedPromise.then(function () {
                _this.propIndex = 'property' + _this.index;
                // add form to the parent form group
                _this.formGroup.addControl(_this.propIndex, _this.form);
            });
        };
        SelectPropertyComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise.then(function () {
                _this.formGroup.removeControl(_this.propIndex);
            });
        };
        /**
         * Indicates if property can be used as a sort criterion.
         * Property has to have cardinality or max cardinality 1 for the chosen resource class.
         *
         * We cannot sort by properties whose cardinality is greater than 1.
         * Return boolean
         */
        SelectPropertyComponent.prototype.sortCriterion = function () {
            var _this = this;
            // check if a resource class is selected and if the property's cardinality is 1 for the selected resource class
            if (this._activeResourceClass !== undefined && this.propertySelected !== undefined && !this.propertySelected.isLinkProperty) {
                var cardinalities = this._activeResourceClass.cardinalities.filter(function (card) {
                    // cardinality 1 or max occurrence 1
                    return card.property === _this.propertySelected.id
                        && card.value === 1
                        && (card.occurrence === core$1.CardinalityOccurrence.card || card.occurrence === core$1.CardinalityOccurrence.maxCard);
                });
                return cardinalities.length === 1;
            }
            else {
                return false;
            }
        };
        /**
         * Updates the properties array that is accessed by the template.
         */
        SelectPropertyComponent.prototype.updatePropertiesArray = function () {
            // represent the properties as an array to be accessed by the template
            var propsArray = [];
            for (var propIri in this._properties) {
                if (this._properties.hasOwnProperty(propIri)) {
                    var prop = this._properties[propIri];
                    // only list editable props that are not link value props
                    if (prop.isEditable && !prop.isLinkValueProperty) {
                        propsArray.push(this._properties[propIri]);
                    }
                }
            }
            // sort properties by label (ascending)
            propsArray.sort(core$1.OntologyInformation.sortFunc);
            this.propertiesAsArray = propsArray;
        };
        /**
         * Returns the selected property with the specified value.
         */
        SelectPropertyComponent.prototype.getPropertySelectedWithValue = function () {
            var propVal = this.specifyPropertyValue.getComparisonOperatorAndValueLiteralForProperty();
            var isSortCriterion = false;
            // only non linking properties can be used for sorting
            if (!this.propertySelected.isLinkProperty) {
                isSortCriterion = this.form.value.isSortCriterion;
            }
            return new core$1.PropertyWithValue(this.propertySelected, propVal, isSortCriterion);
        };
        SelectPropertyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-select-property',
                        template: "<mat-form-field class=\"search-property-field\" *ngIf=\"propertiesAsArray?.length > 0\">\n  <mat-select placeholder=\"Properties\" [formControl]=\"form.controls['property']\">\n    <mat-option *ngFor=\"let prop of propertiesAsArray\" [value]=\"prop.id\">{{ prop.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<kui-specify-property-value #specifyPropertyValue [formGroup]=\"form\" *ngIf=\"propertySelected !== undefined\" [property]=\"propertySelected\"></kui-specify-property-value>\n\n<mat-checkbox matTooltip=\"Sort criterion\" *ngIf=\"propertySelected !== undefined && sortCriterion()\" [formControl]=\"form.controls['isSortCriterion']\"></mat-checkbox>",
                        styles: [".search-property-field{margin-right:8px}"]
                    },] },
        ];
        /** @nocollapse */
        SelectPropertyComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        SelectPropertyComponent.propDecorators = {
            formGroup: [{ type: core.Input }],
            index: [{ type: core.Input }],
            properties: [{ type: core.Input }],
            activeResourceClass: [{ type: core.Input }],
            specifyPropertyValue: [{ type: core.ViewChild, args: ['specifyPropertyValue',] }]
        };
        return SelectPropertyComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$1 = Promise.resolve(null);
    var SpecifyPropertyValueComponent = /** @class */ (function () {
        function SpecifyPropertyValueComponent(fb) {
            this.fb = fb;
            this.KnoraConstants = core$1.KnoraConstants;
            // available comparison operators for the property
            this.comparisonOperators = [];
        }
        Object.defineProperty(SpecifyPropertyValueComponent.prototype, "property", {
            // getter method for this._property
            get: function () {
                return this._property;
            },
            // setter method for the property chosen by the user
            set: function (prop) {
                this.comparisonOperatorSelected = undefined; // reset to initial state
                this._property = prop;
                this.resetComparisonOperators(); // reset comparison operators for given property (overwriting any previous selection)
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resets the comparison operators for this._property.
         */
        SpecifyPropertyValueComponent.prototype.resetComparisonOperators = function () {
            // depending on object class, set comparison operators and value entry field
            if (this._property.isLinkProperty) {
                this.propertyValueType = core$1.KnoraConstants.Resource;
            }
            else {
                this.propertyValueType = this._property.objectType;
            }
            switch (this.propertyValueType) {
                case core$1.KnoraConstants.TextValue:
                    this.comparisonOperators = [new core$1.Like(), new core$1.Match(), new core$1.Equals(), new core$1.NotEquals(), new core$1.Exists()];
                    break;
                case core$1.KnoraConstants.BooleanValue:
                case core$1.KnoraConstants.Resource:
                case core$1.KnoraConstants.UriValue:
                case core$1.KnoraConstants.IntervalValue:
                    this.comparisonOperators = [new core$1.Equals(), new core$1.NotEquals(), new core$1.Exists()];
                    break;
                case core$1.KnoraConstants.IntValue:
                case core$1.KnoraConstants.DecimalValue:
                case core$1.KnoraConstants.DateValue:
                    this.comparisonOperators = [new core$1.Equals(), new core$1.NotEquals(), new core$1.LessThan(), new core$1.LessThanEquals(), new core$1.GreaterThan(), new core$1.GreaterThanEquals(), new core$1.Exists()];
                    break;
                case core$1.KnoraConstants.ListValue:
                case core$1.KnoraConstants.GeomValue:
                case core$1.KnoraConstants.FileValue:
                case core$1.KnoraConstants.AudioFileValue:
                case core$1.KnoraConstants.StillImageFileValue:
                case core$1.KnoraConstants.DDDFileValue:
                case core$1.KnoraConstants.MovingImageFileValue:
                case core$1.KnoraConstants.TextFileValue:
                case core$1.KnoraConstants.ColorValue:
                    this.comparisonOperators = [new core$1.Exists()];
                    break;
                default:
                    console.log('ERROR: Unsupported value type ' + this._property.objectType);
            }
        };
        SpecifyPropertyValueComponent.prototype.ngOnInit = function () { };
        SpecifyPropertyValueComponent.prototype.ngOnChanges = function () {
            var _this = this;
            // build a form for comparison operator selection
            this.form = this.fb.group({
                comparisonOperator: [null, forms.Validators.required]
            });
            // store comparison operator when selected
            this.form.valueChanges.subscribe(function (data) {
                _this.comparisonOperatorSelected = data.comparisonOperator;
            });
            resolvedPromise$1.then(function () {
                // remove from the parent form group (clean reset)
                _this.formGroup.removeControl('comparisonOperator');
                // add form to the parent form group
                _this.formGroup.addControl('comparisonOperator', _this.form);
            });
        };
        /**
         * Gets the specified comparison operator and value for the property.
         *
         * returns {ComparisonOperatorAndValue} the comparison operator and the specified value
         */
        SpecifyPropertyValueComponent.prototype.getComparisonOperatorAndValueLiteralForProperty = function () {
            // return value (literal or IRI) from the child component
            var value;
            // comparison operator 'Exists' does not require a value
            if (this.comparisonOperatorSelected.getClassName() !== 'Exists') {
                value = this.propertyValueComponent.getValue();
            }
            // return the comparison operator and the specified value
            return new core$1.ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);
        };
        SpecifyPropertyValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-specify-property-value',
                        template: "<mat-form-field class=\"search-operator-field\" *ngIf=\"comparisonOperators?.length > 0\">\n    <mat-select placeholder=\"Comparison Operator\" [formControl]=\"form.controls['comparisonOperator']\">\n        <mat-option *ngFor=\"let compOp of comparisonOperators\" [value]=\"compOp\">{{ compOp.label }}</mat-option>\n    </mat-select>\n</mat-form-field>\n\n<!-- select apt component for value specification using a switch case statement-->\n<span\n    *ngIf=\"comparisonOperatorSelected !== undefined && comparisonOperatorSelected !== null && comparisonOperatorSelected.getClassName() != 'Exists'\"\n    [ngSwitch]=\"propertyValueType\">\n  <boolean-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.BooleanValue\"></boolean-value>\n  <date-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DateValue\"></date-value>\n  <decimal-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DecimalValue\"></decimal-value>\n  <integer-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.IntValue\"></integer-value>\n  <link-value #propertyValue [formGroup]=\"form\" [restrictResourceClass]=\"property.objectType\"\n              *ngSwitchCase=\"KnoraConstants.Resource\"></link-value>\n  <text-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.TextValue\"></text-value>\n  <uri-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.UriValue\"></uri-value>\n\n    <!-- TODO: Resource: handle linking properties with target class restriction: access property member to get objectClass via property() getter method -->\n  <span *ngSwitchDefault=\"\">Not supported {{propertyValueType}}</span>\n</span>\n",
                        styles: [".search-operator-field{margin-right:8px}"]
                    },] },
        ];
        /** @nocollapse */
        SpecifyPropertyValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        SpecifyPropertyValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }],
            propertyValueComponent: [{ type: core.ViewChild, args: ['propertyValue',] }],
            property: [{ type: core.Input }]
        };
        return SpecifyPropertyValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$2 = Promise.resolve(null);
    var BooleanValueComponent = /** @class */ (function () {
        function BooleanValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.BooleanValue;
        }
        BooleanValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                booleanValue: [false, forms.Validators.compose([forms.Validators.required])]
            });
            resolvedPromise$2.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        BooleanValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$2.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        BooleanValueComponent.prototype.getValue = function () {
            return new core$1.ValueLiteral(String(this.form.value.booleanValue), core$1.KnoraConstants.xsdBoolean);
        };
        BooleanValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'boolean-value',
                        template: "<mat-checkbox [formControl]=\"form.controls['booleanValue']\"></mat-checkbox>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        BooleanValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        BooleanValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return BooleanValueComponent;
    }());

    /** Custom header component containing a calendar format switcher */
    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent(_calendar, _dateAdapter, _datepickerContent, fb) {
            this._calendar = _calendar;
            this._dateAdapter = _dateAdapter;
            this._datepickerContent = _datepickerContent;
            this.fb = fb;
            // a list of supported calendar formats (Gregorian and Julian)
            this.supportedCalendarFormats = jdnconvertiblecalendar.JDNConvertibleCalendar.supportedCalendars;
        }
        HeaderComponent.prototype.ngOnInit = function () {
            var _this = this;
            // get the currently active calendar format from the date adapter
            if (this._dateAdapter instanceof jdnconvertiblecalendardateadapter.JDNConvertibleCalendarDateAdapter) {
                this.activeFormat = this._dateAdapter.activeCalendarFormat;
            }
            else {
                console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
            }
            // build a form for the calendar format selection
            this.form = this.fb.group({
                calendar: [this.activeFormat, forms.Validators.required]
            });
            // do the conversion when the user selects another calendar format
            this.form.valueChanges.subscribe(function (data) {
                // pass the target calendar format to the conversion method
                _this.convertDate(data.calendar);
            });
        };
        /**
         * Converts the date into the target format.
         *
         * @param calendar the target calendar format.
         */
        HeaderComponent.prototype.convertDate = function (calendar) {
            if (this._dateAdapter instanceof jdnconvertiblecalendardateadapter.JDNConvertibleCalendarDateAdapter) {
                // convert the date into the target calendar format
                var convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);
                // set the new date
                this._calendar.activeDate = convertedDate;
                // select the new date in the datepicker UI
                this._datepickerContent.datepicker.select(convertedDate);
                // update view after calendar format conversion
                this._calendar.updateTodaysDate();
            }
            else {
                console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
            }
        };
        HeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-calendar-header',
                        template: "\n      <mat-select placeholder=\"Calendar Format\" [formControl]=\"form.controls['calendar']\">\n        <mat-option *ngFor=\"let cal of supportedCalendarFormats\" [value]=\"cal\">{{cal}}</mat-option>\n      </mat-select>\n      <mat-calendar-header></mat-calendar-header>\n    ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        HeaderComponent.ctorParameters = function () {
            return [
                { type: material.MatCalendar, decorators: [{ type: core.Host }] },
                { type: material.DateAdapter },
                { type: material.MatDatepickerContent },
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        return HeaderComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$3 = Promise.resolve(null);
    var DateValueComponent = /** @class */ (function () {
        function DateValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.DateValue;
            // custom header for the datepicker
            this.headerComponent = HeaderComponent;
        }
        DateValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            // init datepicker
            this.form = this.fb.group({
                dateValue: [null, forms.Validators.compose([forms.Validators.required])]
            });
            this.form.valueChanges.subscribe(function (data) {
                // console.log(data.dateValue);
            });
            resolvedPromise$3.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        DateValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$3.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        DateValueComponent.prototype.getValue = function () {
            var dateObj = this.form.value.dateValue;
            // get calendar format
            var calendarFormat = dateObj.calendarName;
            // get calendar period
            var calendarPeriod = dateObj.toCalendarPeriod();
            // get the date
            var dateString = calendarFormat.toUpperCase() + ":" + calendarPeriod.periodStart.year + "-" + calendarPeriod.periodStart.month + "-" + calendarPeriod.periodStart.day + ":" + calendarPeriod.periodEnd.year + "-" + calendarPeriod.periodEnd.month + "-" + calendarPeriod.periodEnd.day;
            return new core$1.ValueLiteral(String(dateString), core$1.KnoraConstants.DateValue);
        };
        DateValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'date-value',
                        template: "<mat-form-field>\n    <kuiJdnDatepicker>\n        <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" [formControl]=\"form.controls['dateValue']\">\n        <mat-datepicker #picker [calendarHeaderComponent]=\"headerComponent\"></mat-datepicker>\n    </kuiJdnDatepicker>\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n</mat-form-field>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DateValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        DateValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return DateValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$4 = Promise.resolve(null);
    var DecimalValueComponent = /** @class */ (function () {
        function DecimalValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.DecimalValue;
        }
        DecimalValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                decimalValue: [null, forms.Validators.compose([forms.Validators.required])]
            });
            resolvedPromise$4.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        DecimalValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$4.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        DecimalValueComponent.prototype.getValue = function () {
            return new core$1.ValueLiteral(String(this.form.value.decimalValue), core$1.KnoraConstants.xsdDecimal);
        };
        DecimalValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'decimal-value',
                        template: "<mat-form-field>\n    <input matInput [formControl]=\"form.controls['decimalValue']\" placeholder=\"Decimal value\" value=\"\" type=\"number\">\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecimalValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        DecimalValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return DecimalValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$5 = Promise.resolve(null);
    var IntegerValueComponent = /** @class */ (function () {
        function IntegerValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.IntValue;
        }
        IntegerValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                integerValue: [null, forms.Validators.compose([forms.Validators.required, forms.Validators.pattern(/^-?\d+$/)])] // only allow for integer values (no fractions)
            });
            resolvedPromise$5.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        IntegerValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$5.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        IntegerValueComponent.prototype.getValue = function () {
            return new core$1.ValueLiteral(String(this.form.value.integerValue), core$1.KnoraConstants.xsdInteger);
        };
        IntegerValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'integer-value',
                        template: "<mat-form-field>\n    <input matInput [formControl]=\"form.controls['integerValue']\" placeholder=\"Integer value\" value=\"\" type=\"number\">\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        IntegerValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        IntegerValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return IntegerValueComponent;
    }());

    var jsonld = require('jsonld');
    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$6 = Promise.resolve(null);
    var LinkValueComponent = /** @class */ (function () {
        function LinkValueComponent(fb, _searchService, _cacheService) {
            this.fb = fb;
            this._searchService = _searchService;
            this._cacheService = _cacheService;
            this.type = core$1.KnoraConstants.LinkValue;
        }
        Object.defineProperty(LinkValueComponent.prototype, "restrictResourceClass", {
            get: function () {
                return this._restrictToResourceClass;
            },
            set: function (value) {
                this._restrictToResourceClass = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Displays a selected resource using its label.
         *
         * @param resource the resource to be displayed (or no selection yet).
         * @returns
         */
        LinkValueComponent.prototype.displayResource = function (resource) {
            // null is the initial value (no selection yet)
            if (resource !== null) {
                return resource.label;
            }
        };
        /**
         * Search for resources whose labels contain the given search term, restricting to to the given properties object constraint.
         *
         * @param searchTerm
         */
        LinkValueComponent.prototype.searchByLabel = function (searchTerm) {
            var _this = this;
            // at least 3 characters are required
            if (searchTerm.length >= 3) {
                this._searchService.searchByLabelReadResourceSequence(searchTerm, this._restrictToResourceClass).subscribe(function (result) {
                    _this.resources = result.resources;
                }, function (err) {
                    console.log('JSONLD of full resource request could not be expanded:' + err);
                });
            }
            else {
                // clear selection
                this.resources = undefined;
            }
        };
        /**
         * Checks that the selection is a [[ReadResource]].
         *
         * Surprisingly, [null] has to be returned if the value is valid: https://angular.io/guide/form-validation#custom-validators
         *
         * @param the form element whose value has to be checked.
         * @returns
         */
        LinkValueComponent.prototype.validateResource = function (c) {
            var isValidResource = (c.value instanceof core$1.ReadResource);
            if (isValidResource) {
                return null;
            }
            else {
                return {
                    noResource: {
                        value: c.value
                    }
                };
            }
        };
        LinkValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                resource: [null, forms.Validators.compose([
                        forms.Validators.required,
                        this.validateResource
                    ])]
            });
            this.form.valueChanges.subscribe(function (data) {
                _this.searchByLabel(data.resource);
            });
            resolvedPromise$6.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        LinkValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$6.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        LinkValueComponent.prototype.getValue = function () {
            return new core$1.IRI(this.form.value.resource.id);
        };
        LinkValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'link-value',
                        template: "<mat-form-field>\n    <input matInput placeholder=\"resource\" aria-label=\"resource\" [matAutocomplete]=\"auto\" [formControl]=\"form.controls['resource']\">\n    <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayResource\">\n        <mat-option *ngFor=\"let res of resources\" [value]=\"res\">\n            {{res?.label}}\n        </mat-option>\n    </mat-autocomplete>\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        LinkValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] },
                { type: core$1.SearchService },
                { type: core$1.OntologyCacheService }
            ];
        };
        LinkValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }],
            restrictResourceClass: [{ type: core.Input }]
        };
        return LinkValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$7 = Promise.resolve(null);
    var TextValueComponent = /** @class */ (function () {
        function TextValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.TextValue;
        }
        TextValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                textValue: [null, forms.Validators.required]
            });
            resolvedPromise$7.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        TextValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$7.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        TextValueComponent.prototype.getValue = function () {
            return new core$1.ValueLiteral(String(this.form.value.textValue), core$1.KnoraConstants.xsdString);
        };
        TextValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'text-value',
                        template: "<mat-form-field>\n    <input matInput [formControl]=\"form.controls['textValue']\" placeholder=\"text value\" value=\"\">\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        TextValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        TextValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return TextValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$8 = Promise.resolve(null);
    var UriValueComponent = /** @class */ (function () {
        function UriValueComponent(fb) {
            this.fb = fb;
            this.type = core$1.KnoraConstants.UriValue;
        }
        UriValueComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.fb.group({
                uriValue: [null, forms.Validators.compose([forms.Validators.required, forms.Validators.pattern(core$1.Utils.RegexUrl)])]
            });
            resolvedPromise$8.then(function () {
                // add form to the parent form group
                _this.formGroup.addControl('propValue', _this.form);
            });
        };
        UriValueComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            // remove form from the parent form group
            resolvedPromise$8.then(function () {
                _this.formGroup.removeControl('propValue');
            });
        };
        UriValueComponent.prototype.getValue = function () {
            return new core$1.ValueLiteral(String(this.form.value.uriValue), core$1.KnoraConstants.xsdUri);
        };
        UriValueComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'uri-value',
                        template: "<mat-form-field>\n    <input matInput [formControl]=\"form.controls['uriValue']\" placeholder=\"URI\" value=\"\">\n</mat-form-field>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        UriValueComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        UriValueComponent.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return UriValueComponent;
    }());

    // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
    var resolvedPromise$9 = Promise.resolve(null);
    var SelectResourceClassComponent = /** @class */ (function () {
        function SelectResourceClassComponent(fb) {
            this.fb = fb;
            // event emitted to parent component once a resource class is selected by the user
            this.resourceClassSelectedEvent = new core.EventEmitter();
        }
        Object.defineProperty(SelectResourceClassComponent.prototype, "resourceClasses", {
            // getter method for resource classes (used in template)
            get: function () {
                return this._resourceClasses;
            },
            // setter method for resource classes when being updated by parent component
            set: function (value) {
                this.resourceClassSelected = undefined; // reset on updates
                this._resourceClasses = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the Iri of the selected resource class.
         *
         * @returns the Iri of the selected resource class or false in case no resource class is selected.
         */
        SelectResourceClassComponent.prototype.getResourceClassSelected = function () {
            if (this.resourceClassSelected !== undefined && this.resourceClassSelected !== null) {
                return this.resourceClassSelected;
            }
            else {
                return false;
            }
        };
        /**
         * Initalizes the FormGroup for the resource class selection.
         * The initial value is set to null.
         */
        SelectResourceClassComponent.prototype.initForm = function () {
            var _this = this;
            // build a form for the resource class selection
            this.form = this.fb.group({
                resourceClass: [null] // resource class selection is optional
            });
            // store and emit Iri of the resource class when selected
            this.form.valueChanges.subscribe(function (data) {
                _this.resourceClassSelected = data.resourceClass;
                _this.resourceClassSelectedEvent.emit(_this.resourceClassSelected);
            });
        };
        SelectResourceClassComponent.prototype.ngOnInit = function () {
            this.initForm();
            // add form to the parent form group
            this.formGroup.addControl('resourceClass', this.form);
        };
        SelectResourceClassComponent.prototype.ngOnChanges = function () {
            var _this = this;
            if (this.form !== undefined) {
                // resource classes have been reinitialized
                // reset form
                resolvedPromise$9.then(function () {
                    // remove this form from the parent form group
                    _this.formGroup.removeControl('resourceClass');
                    _this.initForm();
                    // add form to the parent form group
                    _this.formGroup.addControl('resourceClass', _this.form);
                });
            }
        };
        SelectResourceClassComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'kui-select-resource-class',
                        template: "<mat-form-field *ngIf=\"resourceClasses.length > 0\">\n  <mat-select placeholder=\"Resource Class\" [formControl]=\"form.controls['resourceClass']\">\n    <mat-option [value]=\"null\">no selection</mat-option>\n    <!-- undo selection of a resource class -->\n    <mat-option *ngFor=\"let resourceClass of resourceClasses\" [value]=\"resourceClass.id\">{{ resourceClass.label }}</mat-option>\n  </mat-select>\n</mat-form-field>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        SelectResourceClassComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, decorators: [{ type: core.Inject, args: [forms.FormBuilder,] }] }
            ];
        };
        SelectResourceClassComponent.propDecorators = {
            formGroup: [{ type: core.Input }],
            resourceClasses: [{ type: core.Input }],
            resourceClassSelectedEvent: [{ type: core.Output }]
        };
        return SelectResourceClassComponent;
    }());

    var KuiSearchModule = /** @class */ (function () {
        function KuiSearchModule() {
        }
        KuiSearchModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            animations$1.BrowserAnimationsModule,
                            material.MatAutocompleteModule,
                            material.MatButtonModule,
                            material.MatCheckboxModule,
                            material.MatDatepickerModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatIconModule,
                            material.MatListModule,
                            material.MatSelectModule,
                            material.MatTooltipModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            core$1.KuiCoreModule,
                            action.KuiActionModule,
                            viewer.KuiViewerModule,
                            jdnconvertiblecalendardateadapter.MatJDNConvertibleCalendarDateAdapterModule
                        ],
                        declarations: [
                            SearchComponent,
                            SelectOntologyComponent,
                            ExtendedSearchComponent,
                            SelectResourceClassComponent,
                            SelectPropertyComponent,
                            SpecifyPropertyValueComponent,
                            BooleanValueComponent,
                            DateValueComponent,
                            DecimalValueComponent,
                            IntegerValueComponent,
                            LinkValueComponent,
                            TextValueComponent,
                            UriValueComponent,
                            HeaderComponent,
                            FulltextSearchComponent,
                            SearchPanelComponent
                        ],
                        exports: [
                            SearchComponent,
                            SearchPanelComponent,
                            FulltextSearchComponent,
                            ExtendedSearchComponent,
                            DateValueComponent
                        ],
                        entryComponents: [
                            HeaderComponent
                        ]
                    },] },
        ];
        return KuiSearchModule;
    }());

    /*
     * Public API Surface of search
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SearchComponent = SearchComponent;
    exports.SearchPanelComponent = SearchPanelComponent;
    exports.FulltextSearchComponent = FulltextSearchComponent;
    exports.ExtendedSearchComponent = ExtendedSearchComponent;
    exports.SelectOntologyComponent = SelectOntologyComponent;
    exports.SelectPropertyComponent = SelectPropertyComponent;
    exports.SpecifyPropertyValueComponent = SpecifyPropertyValueComponent;
    exports.BooleanValueComponent = BooleanValueComponent;
    exports.DateValueComponent = DateValueComponent;
    exports.HeaderComponent = HeaderComponent;
    exports.DecimalValueComponent = DecimalValueComponent;
    exports.IntegerValueComponent = IntegerValueComponent;
    exports.LinkValueComponent = LinkValueComponent;
    exports.TextValueComponent = TextValueComponent;
    exports.UriValueComponent = UriValueComponent;
    exports.SelectResourceClassComponent = SelectResourceClassComponent;
    exports.KuiSearchModule = KuiSearchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtc2VhcmNoLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9zZWFyY2guY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9zZWFyY2gtcGFuZWwvc2VhcmNoLXBhbmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9saWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvbGliL2V4dGVuZGVkLXNlYXJjaC9leHRlbmRlZC1zZWFyY2guY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LW9udG9sb2d5L3NlbGVjdC1vbnRvbG9neS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvbGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL3NwZWNpZnktcHJvcGVydHktdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvYm9vbGVhbi12YWx1ZS9ib29sZWFuLXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvaGVhZGVyLWNhbGVuZGFyL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvbGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9kYXRlLXZhbHVlL2RhdGUtdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvZGVjaW1hbC12YWx1ZS9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvbGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9saW5rLXZhbHVlL2xpbmstdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL3VyaS12YWx1ZS91cmktdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvc2VhcmNoL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXJlc291cmNlLWNsYXNzL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvbGliL3NlYXJjaC5tb2R1bGUudHMiLCJuZzovL0Brbm9yYS9zZWFyY2gvcHVibGljX2FwaS50cyIsIm5nOi8vQGtub3JhL3NlYXJjaC9rbm9yYS1zZWFyY2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBhbmltYXRlLFxuICAgIHN0YXRlLFxuICAgIHN0eWxlLFxuICAgIHRyYW5zaXRpb24sXG4gICAgdHJpZ2dlclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzZWFyY2gtYmFyLWVsZW1lbnRzXCI+XG5cbiAgICA8IS0tIHRoZSBuZXh0IGVsZW1lbnQgLSBkaXYuZXh0ZW5kZWQtc2VhcmNoLXBhbmVsIC0gaXMgYSBoaWRkZW4gZHJvcGRvd24gZmlsdGVyIG1lbnUgLS0+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXBhbmVsXCIgW2NsYXNzLmFjdGl2ZV09XCJzZWFyY2hQYW5lbEZvY3VzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJlZml4XCIgKGNsaWNrKT1cImRvU2VhcmNoKHNlYXJjaClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgIDxpbnB1dCAjc2VhcmNoIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJzZWFyY2hcIiBbcGxhY2Vob2xkZXJdPVwic2VhcmNoTGFiZWxcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFF1ZXJ5XCIgbmFtZT1cInNlYXJjaFwiIChrZXl1cC5lc2MpPVwicmVzZXRTZWFyY2goc2VhcmNoKVwiIChrZXl1cCk9XCJvbktleShzZWFyY2gsICRldmVudClcIiAoY2xpY2spPVwic2V0Rm9jdXMoKVwiIChmb2N1cyk9XCJ0b2dnbGVNZW51KCdzaW1wbGVTZWFyY2gnKVwiIFtkaXNhYmxlZF09XCJmb2N1c09uRXh0ZW5kZWQgPT09ICdhY3RpdmUnXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBzd2l0Y2ggYnV0dG9uOiBvbiBzb21lIGZvY3VzIHdlIG5lZWQgYSBjbG9zZSBidXR0b24gZm9yIHRoZSBzaW1wbGUgb3IgZXh0ZW5kZWQgcGFuZWwgLS0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VmZml4XCIgKm5nSWY9XCJmb2N1c09uU2ltcGxlID09PSAnYWN0aXZlJ1wiIChjbGljayk9XCJyZXNldFNlYXJjaChzZWFyY2gpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1ZmZpeFwiICpuZ0lmPVwiZm9jdXNPblNpbXBsZSA9PT0gJ2luYWN0aXZlJ1wiPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gdGhlIHNlYXJjaCBwYW5lbCBoYXMgdHdvIFwiZHJvcGRvd25cIiBtZW51czogb25lIGZvciBzaW1wbGUgc2VhcmNoIGFuZCBhbm90aGVyIG9uZSBmb3IgdGhlIGV4dGVuZGVkIHNlYXJjaCAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImt1aS1tZW51IHNpbXBsZS1zZWFyY2hcIiBbQHNpbXBsZVNlYXJjaE1lbnVdPVwiZm9jdXNPblNpbXBsZVwiICpuZ0lmPVwic2hvd1NpbXBsZVNlYXJjaFwiPlxuICAgICAgICAgICAgPG1hdC1saXN0IGNsYXNzPVwia3VpLXByZXZpb3VzLXNlYXJjaC1saXN0XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IGl0ZW0gb2YgcHJldlNlYXJjaCB8IGt1aVJldmVyc2U7IGxldCBpPWluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBtYXQtbGluZSAqbmdJZj1cImk8MTBcIiAoY2xpY2spPVwiZG9QcmV2U2VhcmNoKGl0ZW0pXCI+e3tpdGVtfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwicmVzZXRQcmV2U2VhcmNoKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cImNsb3NlXCI+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8L21hdC1saXN0PlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtc3Ryb2tlZC1idXR0b24gY29sb3I9XCJhY2NlbnRcIiBjbGFzcz1cInJpZ2h0XCIgKGNsaWNrKT1cInJlc2V0UHJldlNlYXJjaCgpXCIgKm5nSWY9XCJwcmV2U2VhcmNoXCI+Q2xlYXI8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImt1aS1tZW51IGV4dGVuZGVkLXNlYXJjaFwiIFtAZXh0ZW5kZWRTZWFyY2hNZW51XT1cImZvY3VzT25FeHRlbmRlZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImt1aS1tZW51LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwia3VpLW1lbnUtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0PkFkdmFuY2VkIHNlYXJjaDwvaDQ+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwia3VpLW1lbnUtYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVNZW51KCdleHRlbmRlZFNlYXJjaCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJleHRlbmRlZC1zZWFyY2gtYm94XCI+XG4gICAgICAgICAgICAgICAgPGt1aS1leHRlbmRlZC1zZWFyY2ggW3JvdXRlXT1cInJvdXRlXCIgKHRvZ2dsZUV4dGVuZGVkU2VhcmNoRm9ybSk9XCJ0b2dnbGVNZW51KCdleHRlbmRlZFNlYXJjaCcpXCI+PC9rdWktZXh0ZW5kZWQtc2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBFeHRlbmRlZCBzZWFyY2ggYnV0dG9uIHRvIGRpc3BsYXkgdGhlIGV4dGVuZGVkIHNlYXJjaCBmb3JtIGluIHRoZSBzZWFyY2ggcGFuZWwgLS0+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cImFkdmFuY2VkLXNlYXJjaC1idXR0b25cIiAoY2xpY2spPVwidG9nZ2xlTWVudSgnZXh0ZW5kZWRTZWFyY2gnKVwiPlxuICAgICAgICBhZHZhbmNlZFxuICAgIDwvYnV0dG9uPlxuXG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2BpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb257ZGlzcGxheTpub25lfWlucHV0W3R5cGU9c2VhcmNoXXstbW96LWFwcGVhcmFuY2U6bm9uZTstd2Via2l0LWFwcGVhcmFuY2U6bm9uZX0uY2VudGVye2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b30uY2xvc2V7cmlnaHQ6MTJweH0uZXh0ZW5kZWQtc2VhcmNoLWJveHttYXJnaW46MTJweH0uYWR2YW5jZWQtc2VhcmNoLWJ1dHRvbnttYXJnaW4tbGVmdDoxMHB4fS5mdWxsLXdpZHRoe3dpZHRoOjEwMCV9LmhpZGV7ZGlzcGxheTpub25lfS5pbmFjdGl2ZSwubXV0ZXtjb2xvcjojN2E3YTdhfS5zZWFyY2gtcGFuZWx7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5O2JvcmRlci1yYWRpdXM6NHB4O2Rpc3BsYXk6aW5saW5lLWZsZXg7aGVpZ2h0OjQwcHg7d2lkdGg6NjgwcHg7ei1pbmRleDoxMH0uc2VhcmNoLXBhbmVsOmhvdmVye2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjUpfS5zZWFyY2gtcGFuZWwgZGl2LmlucHV0LWZpZWxke2ZsZXg6MX0uc2VhcmNoLXBhbmVsIGRpdi5pbnB1dC1maWVsZCBpbnB1dHtib3JkZXItc3R5bGU6bm9uZTtmb250LXNpemU6MTRwdDtoZWlnaHQ6MzhweDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDpjYWxjKDEwMCUgLSA4MHB4KX0uc2VhcmNoLXBhbmVsIGRpdi5pbnB1dC1maWVsZCBpbnB1dDphY3RpdmUsLnNlYXJjaC1wYW5lbCBkaXYuaW5wdXQtZmllbGQgaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5zZWFyY2gtcGFuZWwgZGl2IC5wcmVmaXgsLnNlYXJjaC1wYW5lbCBkaXYgLnN1ZmZpeHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czozcHg7Ym9yZGVyLXN0eWxlOm5vbmU7Y29sb3I6cmdiYSg0MSw0MSw0MSwuNCk7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjM4cHg7b3V0bGluZTowO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjQwcHh9LnNlYXJjaC1wYW5lbCBkaXYgLnByZWZpeDphY3RpdmUsLnNlYXJjaC1wYW5lbCBkaXYgLnN1ZmZpeDphY3RpdmV7Y29sb3I6IzUxNTE1MX0uc2VhcmNoLXBhbmVsLmFjdGl2ZXtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC41KX0ua3VpLW1lbnV7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDExLDExLDExLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgxMSwxMSwxMSwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDExLDExLDExLC4xMik7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5O2JvcmRlci1yYWRpdXM6NHB4O3Bvc2l0aW9uOmFic29sdXRlfS5rdWktbWVudSAua3VpLW1lbnUtaGVhZGVye2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOTtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjRweDtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czo0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjQ4cHg7d2lkdGg6MTAwJX0ua3VpLW1lbnUgLmt1aS1tZW51LWhlYWRlciAua3VpLW1lbnUtdGl0bGV7ZmxvYXQ6bGVmdDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDA7bWFyZ2luLXRvcDo0cHg7cGFkZGluZzoxMnB4fS5rdWktbWVudSAua3VpLW1lbnUtaGVhZGVyIC5rdWktbWVudS1hY3Rpb257ZmxvYXQ6cmlnaHQ7bWFyZ2luOjRweH0ua3VpLW1lbnUuZXh0ZW5kZWQtc2VhcmNoLC5rdWktbWVudS5zaW1wbGUtc2VhcmNoe21pbi1oZWlnaHQ6NjgwcHg7d2lkdGg6NjgwcHh9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2h7cGFkZGluZy10b3A6NjBweDt6LWluZGV4Oi0xfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoIC5rdWktcHJldmlvdXMtc2VhcmNoLWxpc3QgLm1hdC1saXN0LWl0ZW17Y3Vyc29yOnBvaW50ZXJ9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2ggLmt1aS1wcmV2aW91cy1zZWFyY2gtbGlzdCAubWF0LWxpc3QtaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmOWY5Zjl9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2ggLmt1aS1wcmV2aW91cy1zZWFyY2gtbGlzdCAubWF0LWxpc3QtaXRlbTpob3ZlciBtYXQtaWNvbntkaXNwbGF5OmJsb2NrfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoIC5rdWktcHJldmlvdXMtc2VhcmNoLWxpc3QgLm1hdC1saXN0LWl0ZW0gbWF0LWljb257ZGlzcGxheTpub25lfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoIC5yaWdodHttYXJnaW4tdG9wOjEycHg7bWFyZ2luLWxlZnQ6MTZweH0ua3VpLW1lbnUuZXh0ZW5kZWQtc2VhcmNoe3otaW5kZXg6MjB9LnNlYXJjaC1iYXItZWxlbWVudHN7ei1pbmRleDoxMDB9LnNob3d7ZGlzcGxheTpibG9ja31AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjEwMjRweCl7LnNlYXJjaC1wYW5lbHt3aWR0aDo0ODBweH0uc2VhcmNoLXBhbmVsIGRpdi5pbnB1dC1maWVsZCBpbnB1dHt3aWR0aDpjYWxjKDQ4MHB4IC0gODBweCl9Lmt1aS1tZW51LmV4dGVuZGVkLXNlYXJjaCwua3VpLW1lbnUuc2ltcGxlLXNlYXJjaHt3aWR0aDo0ODBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjhweCl7LnNlYXJjaC1wYW5lbHt3aWR0aDpjYWxjKDQ4MHB4IC0gMTYwcHgpfS5zZWFyY2gtcGFuZWwgZGl2LmlucHV0LWZpZWxkIGlucHV0e3dpZHRoOmNhbGMoNDgwcHggLSAxNjBweCAtIDgwcHgpfS5rdWktbWVudS5leHRlbmRlZC1zZWFyY2gsLmt1aS1tZW51LnNpbXBsZS1zZWFyY2h7d2lkdGg6Y2FsYyg0ODBweCAtIDgwcHgpfX1gXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3NpbXBsZVNlYXJjaE1lbnUnLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHN0YXRlKCdpbmFjdGl2ZScsIHN0eWxlKHsgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICAgICAgICAgICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pKSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiB0cnVlJywgYW5pbWF0ZSgnMTAwbXMgZWFzZS1pbicpKSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKCd0cnVlID0+IGluYWN0aXZlJywgYW5pbWF0ZSgnMTAwbXMgZWFzZS1vdXQnKSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlcignZXh0ZW5kZWRTZWFyY2hNZW51JyxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBzdGF0ZSgnaW5hY3RpdmUnLCBzdHlsZSh7IGRpc3BsYXk6ICdub25lJyB9KSksXG4gICAgICAgICAgICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHsgZGlzcGxheTogJ2Jsb2NrJyB9KSksXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gdHJ1ZScsIGFuaW1hdGUoJzEwMG1zIGVhc2UtaW4nKSksXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbigndHJ1ZSA9PiBpbmFjdGl2ZScsIGFuaW1hdGUoJzEwMG1zIGVhc2Utb3V0JykpXG4gICAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgXVxufSlcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIHJlYWxpc2UsIHJlc2V0IG5ldyBvciBwcmV2aW91cyBzaW1wbGUgc2VhcmNoZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcm91dGU6IHN0cmluZyA9ICcvc2VhcmNoJztcblxuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG5cbiAgICBzZWFyY2hQYW5lbEZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcmV2U2VhcmNoOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG5cbiAgICBmb2N1c09uU2ltcGxlOiBzdHJpbmcgPSAnaW5hY3RpdmUnO1xuICAgIGZvY3VzT25FeHRlbmRlZDogc3RyaW5nID0gJ2luYWN0aXZlJztcblxuICAgIHNlYXJjaExhYmVsOiBzdHJpbmcgPSAnU2VhcmNoJztcblxuICAgIHNob3dTaW1wbGVTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfZWxlUmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogRG8gc2VhcmNoIG9uIEVudGVyIGNsaWNrLCByZXNldCBzZWFyY2ggb24gRXNjYXBlXG4gICAgICogQHBhcmFtIHNlYXJjaF9lbGVcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25LZXkoc2VhcmNoX2VsZTogSFRNTEVsZW1lbnQsIGV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNPblNpbXBsZSA9ICdhY3RpdmUnO1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSAmJiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LndoaWNoID09PSAxMykpIHtcbiAgICAgICAgICAgIHRoaXMuZG9TZWFyY2goc2VhcmNoX2VsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5Q29kZSA9PT0gMjcgfHwgZXZlbnQud2hpY2ggPT09IDI3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKHNlYXJjaF9lbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhbGlzZSBhIHNpbXBsZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWFyY2hfZWxlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGRvU2VhcmNoKHNlYXJjaF9lbGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWFyY2hRdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCdzaW1wbGVTZWFyY2gnKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnldKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NlYXJjaC9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeV0sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG5cbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlYXJjaCBxdWVyeSBpbnRvIHRoZSBsb2NhbCBzdG9yYWdlIHByZXZTZWFyY2ggYXJyYXkgKHByZXZpb3VzIHNlYXJjaClcbiAgICAgICAgICAgIC8vIHRvIGhhdmUgYSBsaXN0IG9mIHJlY2VudCBzZWFyY2ggcmVxdWVzdHNcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1ByZXZTZWFyY2g6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ByZXZTZWFyY2ggPT09IG51bGwpIHsgZXhpc3RpbmdQcmV2U2VhcmNoID0gW107IH1cbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBleGlzdGluZ1ByZXZTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZW50cnksIGlmIGV4aXN0cyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgPT09IGVudHJ5KSB7IGV4aXN0aW5nUHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7IH1cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4aXN0aW5nUHJldlNlYXJjaC5wdXNoKHRoaXMuc2VhcmNoUXVlcnkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXZTZWFyY2gnLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ1ByZXZTZWFyY2gpKTtcbiAgICAgICAgICAgIC8vIFRPRE86IHNhdmUgdGhlIHByZXZpb3VzIHNlYXJjaCBxdWVyaWVzIHNvbWV3aGVyZSBpbiB0aGUgdXNlcidzIHByb2ZpbGVcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoX2VsZS5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIFJlc2V0IHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWFyY2hfZWxlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlc2V0U2VhcmNoKHNlYXJjaF9lbGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBudWxsO1xuICAgICAgICBzZWFyY2hfZWxlLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNPblNpbXBsZSA9ICdpbmFjdGl2ZSc7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFuZWxGb2N1cyA9ICF0aGlzLnNlYXJjaFBhbmVsRm9jdXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogUmVhbGlzZSBhIHByZXZpb3VzIHNlYXJjaFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBkb1ByZXZTZWFyY2gocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHF1ZXJ5XSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgdGhpcy50b2dnbGVNZW51KCdzaW1wbGVTZWFyY2gnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBSZXNldCBwcmV2aW91cyBzZWFyY2hlcyAtIHRoZSB3aG9sZSBwcmV2aW91cyBzZWFyY2ggb3Igc3BlY2lmaWMgaXRlbSBieSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGVybSBvZiB0aGUgc2VhcmNoXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlc2V0UHJldlNlYXJjaChuYW1lOiBzdHJpbmcgPSBudWxsKTogdm9pZCB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAvLyBkZWxldGUgb25seSB0aGlzIGl0ZW0gd2l0aCB0aGUgbmFtZSAuLi5cbiAgICAgICAgICAgIGNvbnN0IGk6IG51bWJlciA9IHRoaXMucHJldlNlYXJjaC5pbmRleE9mKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2U2VhcmNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmV2U2VhcmNoJywgSlNPTi5zdHJpbmdpZnkodGhpcy5wcmV2U2VhcmNoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdob2xlIFwicHJldmlvdXMgc2VhcmNoXCIgYXJyYXlcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcmV2U2VhcmNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBTZXQgc2ltcGxlIGZvY3VzIHRvIGFjdGl2ZVxuICAgICAqXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHNldEZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB0aGlzLmZvY3VzT25TaW1wbGUgPSAnYWN0aXZlJztcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gIXRoaXMuc2VhcmNoUGFuZWxGb2N1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBTd2l0Y2ggYWNjb3JkaW5nIHRvIHRoZSBmb2N1cyBiZXR3ZWVuIHNpbXBsZSBvciBleHRlbmRlZCBzZWFyY2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIDIgY2FzZXM6IHNpbXBsZVNlYXJjaCBvciBleHRlbmRlZFNlYXJjaFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB0b2dnbGVNZW51KG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NpbXBsZVNlYXJjaCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25TaW1wbGUgPSAodGhpcy5mb2N1c09uU2ltcGxlID09PSAnYWN0aXZlJyA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2ltcGxlU2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2V4dGVuZGVkU2VhcmNoJzpcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzT25FeHRlbmRlZCA9ICh0aGlzLmZvY3VzT25FeHRlbmRlZCA9PT0gJ2FjdGl2ZScgPyAnaW5hY3RpdmUnIDogJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NpbXBsZVNlYXJjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1zZWFyY2gtcGFuZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJrdWktc2VhcmNoLXBhbmVsXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwia3VpLXNlYXJjaC1iYXJcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbHRleHQtc2VhcmNoXCI+XG4gICAgICAgICAgICA8a3VpLWZ1bGx0ZXh0LXNlYXJjaCBbcm91dGVdPVwicm91dGVcIj48L2t1aS1mdWxsdGV4dC1zZWFyY2g+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93TWVudVwiIFtAZXh0ZW5kZWRTZWFyY2hNZW51XT1cImZvY3VzT25FeHRlbmRlZFwiIGNsYXNzPVwia3VpLW1lbnUgZXh0ZW5kZWQtc2VhcmNoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwia3VpLW1lbnUtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJrdWktbWVudS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDQ+QWR2YW5jZWQgc2VhcmNoPC9oND5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJrdWktbWVudS1hY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZU1lbnUoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXh0ZW5kZWQtc2VhcmNoLWJveFwiPlxuICAgICAgICAgICAgICAgIDxrdWktZXh0ZW5kZWQtc2VhcmNoIFtyb3V0ZV09XCJyb3V0ZVwiICh0b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0pPVwidG9nZ2xlTWVudSgpXCI+PC9rdWktZXh0ZW5kZWQtc2VhcmNoPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYWR2YW5jZWQtYnRuXCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwidG9nZ2xlTWVudSgpXCI+YWR2YW5jZWQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5hZHZhbmNlZC1idG57bWFyZ2luLWxlZnQ6MTBweH0ua3VpLXNlYXJjaC1wYW5lbHtkaXNwbGF5OmZsZXg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxMDB9Lmt1aS1zZWFyY2gtYmFye2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOTtib3JkZXItcmFkaXVzOjRweDtkaXNwbGF5OmlubGluZS1mbGV4O2hlaWdodDo0MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MTB9Lmt1aS1zZWFyY2gtYmFyOmhvdmVye2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjUpfS5rdWktbWVudXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMTEsMTEsMTEsLjIpLDAgNnB4IDEwcHggMCByZ2JhKDExLDExLDExLC4xNCksMCAxcHggMThweCAwIHJnYmEoMTEsMTEsMTEsLjEyKTtiYWNrZ3JvdW5kLWNvbG9yOiNmOWY5Zjk7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGV9Lmt1aS1tZW51IC5rdWktbWVudS1oZWFkZXJ7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NHB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NDhweDt3aWR0aDoxMDAlfS5rdWktbWVudSAua3VpLW1lbnUtaGVhZGVyIC5rdWktbWVudS10aXRsZXtmbG9hdDpsZWZ0O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tdG9wOjRweDtwYWRkaW5nOjEycHh9Lmt1aS1tZW51IC5rdWktbWVudS1oZWFkZXIgLmt1aS1tZW51LWFjdGlvbntmbG9hdDpyaWdodDttYXJnaW46NHB4fS5rdWktbWVudS5leHRlbmRlZC1zZWFyY2h7bWluLWhlaWdodDo2ODBweDt3aWR0aDo2ODBweDt6LWluZGV4OjIwfS5leHRlbmRlZC1zZWFyY2gtYm94e21hcmdpbjoxMnB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MTAyNHB4KXsua3VpLXNlYXJjaC1iYXJ7d2lkdGg6NDgwcHh9Lmt1aS1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dHt3aWR0aDpjYWxjKDQ4MHB4IC0gODBweCl9LmZ1bGx0ZXh0LXNlYXJjaCwua3VpLW1lbnUuZXh0ZW5kZWQtc2VhcmNoe3dpZHRoOjQ4MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2OHB4KXsua3VpLXNlYXJjaC1iYXJ7d2lkdGg6Y2FsYyg0ODBweCAtIDE2MHB4KX0ua3VpLXNlYXJjaC1iYXIgZGl2LmlucHV0LWZpZWxkIGlucHV0e3dpZHRoOmNhbGMoNDgwcHggLSAxNjBweCAtIDgwcHgpfS5mdWxsdGV4dC1zZWFyY2gsLmt1aS1tZW51LmV4dGVuZGVkLXNlYXJjaHt3aWR0aDpjYWxjKDQ4MHB4IC0gODBweCl9fWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZXh0ZW5kZWRTZWFyY2hNZW51JyxcbiAgICAgIFtcbiAgICAgICAgc3RhdGUoJ2luYWN0aXZlJywgc3R5bGUoeyBkaXNwbGF5OiAnbm9uZScgfSkpLFxuICAgICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pKSxcbiAgICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgYW5pbWF0ZSgnMTAwbXMgZWFzZS1pbicpKSxcbiAgICAgICAgdHJhbnNpdGlvbignYWN0aXZlID0+IGluYWN0aXZlJywgYW5pbWF0ZSgnMTAwbXMgZWFzZS1vdXQnKSlcbiAgICAgIF1cbiAgICApXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFuZWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAnL3NlYXJjaCc7XG4gIHNob3dNZW51OiBib29sZWFuID0gZmFsc2U7XG4gIGZvY3VzT25FeHRlbmRlZDogc3RyaW5nID0gJ2luYWN0aXZlJztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBTaG93IG9yIGhpZGUgdGhlIGV4dGVuZGVkIHNlYXJjaCBtZW51XG4gICAqXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHRvZ2dsZU1lbnUoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93TWVudSA9ICF0aGlzLnNob3dNZW51O1xuICAgIHRoaXMuZm9jdXNPbkV4dGVuZGVkID0gKHRoaXMuZm9jdXNPbkV4dGVuZGVkID09PSAnYWN0aXZlJyA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZnVsbHRleHQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzZWFyY2gtYmFyLWVsZW1lbnRzXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZnVsbHRleHQtc2VhcmNoLWJhclwiIFtjbGFzcy5hY3RpdmVdPVwic2VhcmNoUGFuZWxGb2N1c1wiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInByZWZpeFwiIChjbGljayk9XCJkb1NlYXJjaChzZWFyY2gpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XG4gICAgICAgICAgICA8aW5wdXQgI3NlYXJjaCBhdXRvY29tcGxldGU9XCJvZmZcIiB0eXBlPVwic2VhcmNoXCIgW3BsYWNlaG9sZGVyXT1cInNlYXJjaExhYmVsXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hRdWVyeVwiIG5hbWU9XCJzZWFyY2hcIiAoa2V5dXAuZXNjKT1cInJlc2V0U2VhcmNoKHNlYXJjaClcIiAoa2V5dXApPVwib25LZXkoc2VhcmNoLCAkZXZlbnQpXCIgKGNsaWNrKT1cInNldEZvY3VzKClcIiAoZm9jdXMpPVwidG9nZ2xlTWVudSgpXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBzd2l0Y2ggYnV0dG9uOiBvbiBzb21lIGZvY3VzIHdlIG5lZWQgYSBjbG9zZSBidXR0b24gZm9yIHRoZSBzaW1wbGUgLS0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VmZml4XCIgKm5nSWY9XCJmb2N1c09uU2ltcGxlID09PSAnYWN0aXZlJ1wiIChjbGljayk9XCJyZXNldFNlYXJjaChzZWFyY2gpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1ZmZpeFwiICpuZ0lmPVwiZm9jdXNPblNpbXBsZSA9PT0gJ2luYWN0aXZlJ1wiPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFwiZHJvcGRvd25cIiBtZW51IGZvciBzaW1wbGUgc2VhcmNoIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwia3VpLW1lbnUgc2ltcGxlLXNlYXJjaFwiIFtAZnVsbHRleHRTZWFyY2hNZW51XT1cImZvY3VzT25TaW1wbGVcIiAqbmdJZj1cInNob3dTaW1wbGVTZWFyY2hcIj5cbiAgICAgICAgICAgIDxtYXQtbGlzdCBjbGFzcz1cImt1aS1wcmV2aW91cy1zZWFyY2gtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxtYXQtbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBpdGVtIG9mIHByZXZTZWFyY2ggfCBrdWlSZXZlcnNlOyBsZXQgaT1pbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDQgbWF0LWxpbmUgKm5nSWY9XCJpPDEwXCIgKGNsaWNrKT1cImRvUHJldlNlYXJjaChpdGVtKVwiPnt7aXRlbX19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlc2V0UHJldlNlYXJjaChpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJjbG9zZVwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9tYXQtbGlzdC1pdGVtPlxuICAgICAgICAgICAgPC9tYXQtbGlzdD5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LXN0cm9rZWQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgY2xhc3M9XCJyaWdodFwiIChjbGljayk9XCJyZXNldFByZXZTZWFyY2goKVwiICpuZ0lmPVwicHJldlNlYXJjaFwiPkNsZWFyPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2BpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb257ZGlzcGxheTpub25lfWlucHV0W3R5cGU9c2VhcmNoXXstbW96LWFwcGVhcmFuY2U6bm9uZTstd2Via2l0LWFwcGVhcmFuY2U6bm9uZX0uZnVsbC13aWR0aHt3aWR0aDoxMDAlfS5jbG9zZXtyaWdodDoxMnB4fS5oaWRle2Rpc3BsYXk6bm9uZX0uc2hvd3tkaXNwbGF5OmJsb2NrfS5zZWFyY2gtYmFyLWVsZW1lbnRze2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjEwMH0uaW5hY3RpdmV7Y29sb3I6IzdhN2E3YX0uZnVsbHRleHQtc2VhcmNoLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNmOWY5Zjk7Ym9yZGVyLXJhZGl1czo0cHg7ZGlzcGxheTppbmxpbmUtZmxleDtoZWlnaHQ6NDBweDtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo2ODBweDt6LWluZGV4OjEwfS5mdWxsdGV4dC1zZWFyY2gtYmFyOmhvdmVye2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjUpfS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZHtmbGV4OjF9LmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2LmlucHV0LWZpZWxkIGlucHV0e2JvcmRlci1zdHlsZTpub25lO2ZvbnQtc2l6ZToxNHB0O2hlaWdodDozOHB4O3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmNhbGMoMTAwJSAtIDgwcHgpfS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dDphY3RpdmUsLmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2LmlucHV0LWZpZWxkIGlucHV0OmZvY3Vze291dGxpbmU6MH0uZnVsbHRleHQtc2VhcmNoLWJhciBkaXYgLnByZWZpeCwuZnVsbHRleHQtc2VhcmNoLWJhciBkaXYgLnN1ZmZpeHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czozcHg7Ym9yZGVyLXN0eWxlOm5vbmU7Y29sb3I6cmdiYSg0MSw0MSw0MSwuNCk7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjM4cHg7b3V0bGluZTowO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjQwcHh9LmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2IC5wcmVmaXg6YWN0aXZlLC5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdiAuc3VmZml4OmFjdGl2ZXtjb2xvcjojNTE1MTUxfS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5hY3RpdmV7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuNSl9Lmt1aS1tZW51e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgxMSwxMSwxMSwuMiksMCA2cHggMTBweCAwIHJnYmEoMTEsMTEsMTEsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgxMSwxMSwxMSwuMTIpO2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOTtib3JkZXItcmFkaXVzOjRweDtwb3NpdGlvbjphYnNvbHV0ZX0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaHttaW4taGVpZ2h0OjY4MHB4O3dpZHRoOjY4MHB4O3BhZGRpbmctdG9wOjYwcHg7ei1pbmRleDotMX0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaCAua3VpLXByZXZpb3VzLXNlYXJjaC1saXN0IC5tYXQtbGlzdC1pdGVte2N1cnNvcjpwb2ludGVyfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoIC5rdWktcHJldmlvdXMtc2VhcmNoLWxpc3QgLm1hdC1saXN0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5fS5rdWktbWVudS5zaW1wbGUtc2VhcmNoIC5rdWktcHJldmlvdXMtc2VhcmNoLWxpc3QgLm1hdC1saXN0LWl0ZW06aG92ZXIgbWF0LWljb257ZGlzcGxheTpibG9ja30ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaCAua3VpLXByZXZpb3VzLXNlYXJjaC1saXN0IC5tYXQtbGlzdC1pdGVtIG1hdC1pY29ue2Rpc3BsYXk6bm9uZX0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaCAucmlnaHR7bWFyZ2luLXRvcDoxMnB4O21hcmdpbi1sZWZ0OjE2cHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoxMDI0cHgpey5mdWxsdGV4dC1zZWFyY2gtYmFye3dpZHRoOjQ4MHB4fS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dHt3aWR0aDpjYWxjKDQ4MHB4IC0gODBweCl9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2h7d2lkdGg6NDgwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NzY4cHgpey5mdWxsdGV4dC1zZWFyY2gtYmFye3dpZHRoOmNhbGMoNDgwcHggLSAxNjBweCl9LmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2LmlucHV0LWZpZWxkIGlucHV0e3dpZHRoOmNhbGMoNDgwcHggLSAxNjBweCAtIDgwcHgpfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoe3dpZHRoOmNhbGMoNDgwcHggLSA4MHB4KX19YF0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdmdWxsdGV4dFNlYXJjaE1lbnUnLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHN0YXRlKCdpbmFjdGl2ZScsIHN0eWxlKHsgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICAgICAgICAgICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pKSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLCBhbmltYXRlKCcxMDBtcyBlYXNlLWluJykpLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIGFuaW1hdGUoJzEwMG1zIGVhc2Utb3V0JykpXG4gICAgICAgICAgICBdXG4gICAgICAgIClcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGx0ZXh0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAnL3NlYXJjaCc7XG5cbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nO1xuXG4gICAgc2hvd1NpbXBsZVNlYXJjaDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzZWFyY2hQYW5lbEZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcmV2U2VhcmNoOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG5cbiAgICBmb2N1c09uU2ltcGxlOiBzdHJpbmcgPSAnaW5hY3RpdmUnO1xuXG4gICAgc2VhcmNoTGFiZWw6IHN0cmluZyA9ICdTZWFyY2gnO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogRG8gc2VhcmNoIG9uIEVudGVyIGNsaWNrLCByZXNldCBzZWFyY2ggb24gRXNjYXBlXG4gICAgICogQHBhcmFtIHNlYXJjaF9lbGVcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgb25LZXkoc2VhcmNoX2VsZTogSFRNTEVsZW1lbnQsIGV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNPblNpbXBsZSA9ICdhY3RpdmUnO1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSAmJiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LndoaWNoID09PSAxMykpIHtcbiAgICAgICAgICAgIHRoaXMuZG9TZWFyY2goc2VhcmNoX2VsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5Q29kZSA9PT0gMjcgfHwgZXZlbnQud2hpY2ggPT09IDI3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKHNlYXJjaF9lbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFsaXNlIGEgc2ltcGxlIHNlYXJjaFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNlYXJjaF9lbGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZG9TZWFyY2goc2VhcmNoX2VsZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlYXJjaFF1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnldKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NlYXJjaC9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeV0sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG5cbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlYXJjaCBxdWVyeSBpbnRvIHRoZSBsb2NhbCBzdG9yYWdlIHByZXZTZWFyY2ggYXJyYXkgKHByZXZpb3VzIHNlYXJjaClcbiAgICAgICAgICAgIC8vIHRvIGhhdmUgYSBsaXN0IG9mIHJlY2VudCBzZWFyY2ggcmVxdWVzdHNcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1ByZXZTZWFyY2g6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ByZXZTZWFyY2ggPT09IG51bGwpIHsgZXhpc3RpbmdQcmV2U2VhcmNoID0gW107IH1cbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBleGlzdGluZ1ByZXZTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZW50cnksIGlmIGV4aXN0cyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgPT09IGVudHJ5KSB7IGV4aXN0aW5nUHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7IH1cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleGlzdGluZ1ByZXZTZWFyY2gucHVzaCh0aGlzLnNlYXJjaFF1ZXJ5KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmV2U2VhcmNoJywgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdQcmV2U2VhcmNoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWFyY2hfZWxlLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHNlYXJjaFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNlYXJjaF9lbGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcmVzZXRTZWFyY2goc2VhcmNoX2VsZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IG51bGw7XG4gICAgICAgIHNlYXJjaF9lbGUuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c09uU2ltcGxlID0gJ2luYWN0aXZlJztcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gIXRoaXMuc2VhcmNoUGFuZWxGb2N1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2ggYWNjb3JkaW5nIHRvIHRoZSBmb2N1cyBiZXR3ZWVuIHNpbXBsZSBvciBleHRlbmRlZCBzZWFyY2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIDIgY2FzZXM6IHNpbXBsZVNlYXJjaCBvciBleHRlbmRlZFNlYXJjaFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB0b2dnbGVNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB0aGlzLmZvY3VzT25TaW1wbGUgPSAodGhpcy5mb2N1c09uU2ltcGxlID09PSAnYWN0aXZlJyA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuc2hvd1NpbXBsZVNlYXJjaCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHNpbXBsZSBmb2N1cyB0byBhY3RpdmVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBzZXRGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgdGhpcy5mb2N1c09uU2ltcGxlID0gJ2FjdGl2ZSc7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFuZWxGb2N1cyA9ICF0aGlzLnNlYXJjaFBhbmVsRm9jdXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhbGlzZSBhIHByZXZpb3VzIHNlYXJjaFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBkb1ByZXZTZWFyY2gocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHF1ZXJ5XSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgcHJldmlvdXMgc2VhcmNoZXMgLSB0aGUgd2hvbGUgcHJldmlvdXMgc2VhcmNoIG9yIHNwZWNpZmljIGl0ZW0gYnkgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRlcm0gb2YgdGhlIHNlYXJjaFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICByZXNldFByZXZTZWFyY2gobmFtZTogc3RyaW5nID0gbnVsbCk6IHZvaWQge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgLy8gZGVsZXRlIG9ubHkgdGhpcyBpdGVtIHdpdGggdGhlIG5hbWUgLi4uXG4gICAgICAgICAgICBjb25zdCBpOiBudW1iZXIgPSB0aGlzLnByZXZTZWFyY2guaW5kZXhPZihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMucHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJldlNlYXJjaCcsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJldlNlYXJjaCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aG9sZSBcInByZXZpb3VzIHNlYXJjaFwiIGFycmF5XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncHJldlNlYXJjaCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldlNlYXJjaCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLFxuICAgIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLFxuICAgIE9udG9sb2d5SW5mb3JtYXRpb24sXG4gICAgT250b2xvZ3lNZXRhZGF0YSxcbiAgICBQcm9wZXJ0aWVzLFxuICAgIFByb3BlcnR5V2l0aFZhbHVlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZXNvdXJjZUNsYXNzXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IFNlbGVjdFByb3BlcnR5Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtcHJvcGVydHkvc2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RSZXNvdXJjZUNsYXNzQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtcmVzb3VyY2UtY2xhc3Mvc2VsZWN0LXJlc291cmNlLWNsYXNzLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZXh0ZW5kZWQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZTogYDxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChuZ1N1Ym1pdCk9XCJzdWJtaXQoKVwiPlxuXG4gIDxkaXY+XG4gICAgPGt1aS1zZWxlY3Qtb250b2xvZ3kgKm5nSWY9XCJvbnRvbG9naWVzLmxlbmd0aCA+IDBcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBbb250b2xvZ2llc109XCJvbnRvbG9naWVzXCIgKG9udG9sb2d5U2VsZWN0ZWQpPVwiZ2V0UmVzb3VyY2VDbGFzc2VzQW5kUHJvcGVydGllc0Zvck9udG9sb2d5KCRldmVudClcIj48L2t1aS1zZWxlY3Qtb250b2xvZ3k+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3QtcmVzb3VyY2UtY2xhc3NcIiAqbmdJZj1cInJlc291cmNlQ2xhc3Nlcz8ubGVuZ3RoID4gMFwiPlxuICAgIDxrdWktc2VsZWN0LXJlc291cmNlLWNsYXNzICNyZXNvdXJjZUNsYXNzIFtmb3JtR3JvdXBdPVwiZm9ybVwiIFtyZXNvdXJjZUNsYXNzZXNdPVwicmVzb3VyY2VDbGFzc2VzXCIgKHJlc291cmNlQ2xhc3NTZWxlY3RlZEV2ZW50KT1cImdldFByb3BlcnRpZXNGb3JSZXNvdXJjZUNsYXNzKCRldmVudClcIj48L2t1aS1zZWxlY3QtcmVzb3VyY2UtY2xhc3M+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3QtcHJvcGVydHlcIiAqbmdJZj1cInByb3BlcnRpZXMgIT09IHVuZGVmaW5lZFwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgYWN0aXZlUHJvcGVydGllczsgbGV0IGkgPSBpbmRleFwiPlxuXG4gICAgICA8a3VpLXNlbGVjdC1wcm9wZXJ0eSAjcHJvcGVydHkgW2FjdGl2ZVJlc291cmNlQ2xhc3NdPVwiYWN0aXZlUmVzb3VyY2VDbGFzc1wiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIFtpbmRleF09XCJpXCIgW3Byb3BlcnRpZXNdPVwicHJvcGVydGllc1wiPjwva3VpLXNlbGVjdC1wcm9wZXJ0eT5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG4gIDxkaXY+XG4gICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJwcm9wZXJ0eS1idXR0b25zIGFkZC1wcm9wZXJ0eS1idXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFkZFByb3BlcnR5KClcIiBbZGlzYWJsZWRdPVwiYWN0aXZlT250b2xvZ3kgPT09IHVuZGVmaW5lZCB8fCBhY3RpdmVQcm9wZXJ0aWVzLmxlbmd0aCA+PSA0XCI+XG4gICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cImFkZCBhIHByb3BlcnR5XCI+YWRkPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwicHJvcGVydHktYnV0dG9ucyByZW1vdmUtcHJvcGVydHktYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVQcm9wZXJ0eSgpXCIgW2Rpc2FibGVkXT1cImFjdGl2ZVByb3BlcnRpZXMubGVuZ3RoID09IDBcIj5cbiAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwicmVtb3ZlIHByb3BlcnR5XCI+cmVtb3ZlPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPCEtLSAgPGRpdj5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlc2V0Rm9ybSgpXCIgW2Rpc2FibGVkXT1cInRoaXMuYWN0aXZlT250b2xvZ3kgPT09IHVuZGVmaW5lZFwiPlxuICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJyZXNldCBxdWVyeSBmb3JtXCI+Y2xlYXI8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCIhZm9ybVZhbGlkXCI+XG4gICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cInN1Ym1pdCBxdWVyeVwiPnNlbmQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj4gLS0+XG5cbiAgPGJ1dHRvbiBjbGFzcz1cImV4dGVuZGVkLWJ1dHRvbnMgZXh0ZW5kZWQtc2VhcmNoLWJ1dHRvblwiIG1hdC1zdHJva2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFmb3JtVmFsaWRcIj5cbiAgICBTZWFyY2hcbiAgPC9idXR0b24+XG4gIDxidXR0b24gY2xhc3M9XCJleHRlbmRlZC1idXR0b25zIHJlc2V0XCIgbWF0LXN0cm9rZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVzZXRGb3JtKClcIiBbZGlzYWJsZWRdPVwidGhpcy5hY3RpdmVPbnRvbG9neSA9PT0gdW5kZWZpbmVkXCI+XG4gICAgUmVzZXRcbiAgPC9idXR0b24+XG5cblxuPC9mb3JtPlxuYCxcbiAgICBzdHlsZXM6IFtgLmFkZC1wcm9wZXJ0eS1idXR0b257bWFyZ2luLXJpZ2h0OjVweH0uZXh0ZW5kZWQtYnV0dG9uc3ttYXJnaW4tdG9wOjI1cHh9LmV4dGVuZGVkLXNlYXJjaC1idXR0b257bWFyZ2luLXJpZ2h0OjVweH0ucHJvcGVydHktYnV0dG9uc3ttYXJnaW4tdG9wOjI1cHh9LnNlbGVjdC1wcm9wZXJ0eXttYXJnaW4tbGVmdDoyMnB4fS5zZWxlY3QtcmVzb3VyY2UtY2xhc3N7bWFyZ2luLWxlZnQ6MTJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgLSBSb3V0ZSBhZnRlciBzZWFyY2hcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZTtcblxuICAgIC8vIHRyaWdnZXIgdG9nZ2xlIGZvciBleHRlbmRlZCBzZWFyY2ggZm9ybVxuICAgIEBPdXRwdXQoKSB0b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvLyBhbGwgYXZhaWxhYmxlIG9udG9sb2dpZXNcbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiA9IFtdO1xuXG4gICAgLy8gb250b2xvZ3kgY2hvc2VuIGJ5IHRoZSB1c2VyXG4gICAgYWN0aXZlT250b2xvZ3k6IHN0cmluZztcblxuICAgIC8vIHByb3BlcnRpZXMgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyXG4gICAgYWN0aXZlUHJvcGVydGllczogYm9vbGVhbltdID0gW107XG5cbiAgICAvLyByZXNvdXJjZSBjbGFzc2VzIGZvciB0aGUgc2VsZWN0ZWQgb250b2xvZ3lcbiAgICByZXNvdXJjZUNsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAvLyBkZWZpbml0aW9uIG9mIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzcywgaWYgc2V0LlxuICAgIGFjdGl2ZVJlc291cmNlQ2xhc3M6IFJlc291cmNlQ2xhc3M7XG5cbiAgICAvLyBwcm9wZXJ0aWVzIGZvciB0aGUgc2VsZWN0ZWQgb250b2xvZ3kgb3Igc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3NcbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgcmVzdWx0OiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKFtdLCAwKTtcblxuICAgIC8vIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IHRoYXQgY29udHJvbHMgdGhlIHJlc291cmNlIGNsYXNzIHNlbGVjdGlvblxuICAgIEBWaWV3Q2hpbGQoJ3Jlc291cmNlQ2xhc3MnKSByZXNvdXJjZUNsYXNzQ29tcG9uZW50OiBTZWxlY3RSZXNvdXJjZUNsYXNzQ29tcG9uZW50O1xuXG4gICAgLy8gcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgY29udHJvbGxpbmcgdGhlIHByb3BlcnR5IHNlbGVjdGlvblxuICAgIEBWaWV3Q2hpbGRyZW4oJ3Byb3BlcnR5JykgcHJvcGVydHlDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2VsZWN0UHJvcGVydHlDb21wb25lbnQ+O1xuXG4gICAgLy8gRm9ybUdyb3VwICh1c2VkIGFzIHBhcmVudCBmb3IgY2hpbGQgY29tcG9uZW50cylcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBmb3JtIHZhbGlkYXRpb24gc3RhdHVzXG4gICAgZm9ybVZhbGlkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZ3JhdlNlYXJjaFNlcnZpY2U6IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIHBhcmVudCBmb3JtIGlzIGVtcHR5LCBpdCBnZXRzIHBhc3NlZCB0byB0aGUgY2hpbGQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHt9KTtcblxuICAgICAgICAvLyBpZiBmb3JtIHN0YXR1cyBjaGFuZ2VzLCByZS1ydW4gdmFsaWRhdGlvblxuICAgICAgICB0aGlzLmZvcm0uc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVZhbGlkID0gdGhpcy52YWxpZGF0ZUZvcm0oKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgb250b2xvZ2llcyB0byBiZSB1c2VkIGZvciB0aGUgb250b2xvZ2llcyBzZWxlY3Rpb24gaW4gdGhlIHNlYXJjaCBmb3JtXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU9udG9sb2dpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBwcm9wZXJ0eSB0byB0aGUgc2VhcmNoIGZvcm0uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGFkZFByb3BlcnR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMucHVzaCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGxhc3QgcHJvcGVydHkgZnJvbSB0aGUgc2VhcmNoIGZvcm0uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlbW92ZVByb3BlcnR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMuc3BsaWNlKC0xLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCBhdmFpbGFibGUgb250b2xvZ2llcyBmb3IgdGhlIHNlYXJjaCBmb3JtLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBpbml0aWFsaXplT250b2xvZ2llcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ2llcyA9IG9udG9sb2dpZXM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbmNlIGFuIG9udG9sb2d5IGhhcyBiZWVuIHNlbGVjdGVkLCBnZXRzIGl0cyBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzLlxuICAgICAqIFRoZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzIHdpbGwgYmUgbWFkZSBhdmFpbGFibGUgdG8gdGhlIHVzZXIgZm9yIHNlbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSBJcmkgb2YgdGhlIG9udG9sb2d5IGNob3NlbiBieSB0aGUgdXNlci5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzQW5kUHJvcGVydGllc0Zvck9udG9sb2d5KG9udG9sb2d5SXJpOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgICAgICAvLyByZXNldCBhY3RpdmUgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICB0aGlzLmFjdGl2ZVJlc291cmNlQ2xhc3MgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gcmVzZXQgc3BlY2lmaWVkIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5hY3RpdmVQcm9wZXJ0aWVzID0gW107XG5cbiAgICAgICAgdGhpcy5hY3RpdmVPbnRvbG9neSA9IG9udG9sb2d5SXJpO1xuXG4gICAgICAgIHRoaXMuX2NhY2hlU2VydmljZS5nZXRFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMoW29udG9sb2d5SXJpXSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG9udG9JbmZvLmdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gb250b0luZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbmNlIGEgcmVzb3VyY2UgY2xhc3MgaGFzIGJlZW4gc2VsZWN0ZWQsIGdldHMgaXRzIHByb3BlcnRpZXMuXG4gICAgICogVGhlIHByb3BlcnRpZXMgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBmb3Igc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0ZvclJlc291cmNlQ2xhc3MocmVzb3VyY2VDbGFzc0lyaTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVzZXQgc3BlY2lmaWVkIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5hY3RpdmVQcm9wZXJ0aWVzID0gW107XG5cbiAgICAgICAgLy8gaWYgdGhlIGNsaWVudCB1bmRvZXMgdGhlIHNlbGVjdGlvbiBvZiBhIHJlc291cmNlIGNsYXNzLCB1c2UgdGhlIGFjdGl2ZSBvbnRvbG9neSBhcyBhIGZhbGxiYWNrXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlc291cmNlQ2xhc3Nlc0FuZFByb3BlcnRpZXNGb3JPbnRvbG9neSh0aGlzLmFjdGl2ZU9udG9sb2d5KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhbcmVzb3VyY2VDbGFzc0lyaV0pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gb250b0luZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUmVzb3VyY2VDbGFzcyA9IG9udG9JbmZvLmdldFJlc291cmNlQ2xhc3NlcygpW3Jlc291cmNlQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgZm9ybSBhbmQgcmV0dXJucyBpdHMgc3RhdHVzIChib29sZWFuKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlRm9ybSgpIHtcblxuICAgICAgICAvLyBjaGVjayB0aGF0IGVpdGhlciBhIHJlc291cmNlIGNsYXNzIGlzIHNlbGVjdGVkIG9yIGF0IGxlYXN0IG9uZSBwcm9wZXJ0eSBpcyBzcGVjaWZpZWRcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybS52YWxpZCAmJlxuICAgICAgICAgICAgKHRoaXMucHJvcGVydHlDb21wb25lbnRzLmxlbmd0aCA+IDAgfHwgKHRoaXMucmVzb3VyY2VDbGFzc0NvbXBvbmVudCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVzb3VyY2VDbGFzc0NvbXBvbmVudC5nZXRSZXNvdXJjZUNsYXNzU2VsZWN0ZWQoKSAhPT0gZmFsc2UpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgZm9ybSAoc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3MgYW5kIHNwZWNpZmllZCBwcm9wZXJ0aWVzKSBwcmVzZXJ2aW5nIHRoZSBhY3RpdmUgb250b2xvZ3kuXG4gICAgICovXG4gICAgcmVzZXRGb3JtKCkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVPbnRvbG9neSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlc291cmNlQ2xhc3Nlc0FuZFByb3BlcnRpZXNGb3JPbnRvbG9neSh0aGlzLmFjdGl2ZU9udG9sb2d5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdyYXZTZWFyY2ggcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gZm9ybSB2YWx1ZXMgYW5kIGNhbGxzIHRoZSBleHRlbmRlZCBzZWFyY2ggcm91dGUuXG4gICAgICovXG4gICAgc3VibWl0KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtVmFsaWQpIHJldHVybjsgLy8gY2hlY2sgdGhhdCBmcm9tIGlzIHZhbGlkXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NPcHRpb24gPSB0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQuZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc09wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzID0gcmVzQ2xhc3NPcHRpb247XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVdpdGhWYWx1ZVtdID0gdGhpcy5wcm9wZXJ0eUNvbXBvbmVudHMubWFwKFxuICAgICAgICAgICAgKHByb3BDb21wKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BDb21wLmdldFByb3BlcnR5U2VsZWN0ZWRXaXRoVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBncmF2c2VhcmNoID0gdGhpcy5fZ3JhdlNlYXJjaFNlcnZpY2UuY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXMsIHJlc0NsYXNzLCAwKTtcblxuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2V4dGVuZGVkLycsIGdyYXZzZWFyY2hdLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuXG4gICAgICAgIC8vIHRvZ2dsZSBleHRlbmRlZCBzZWFyY2ggZm9ybVxuICAgICAgICB0aGlzLnRvZ2dsZUV4dGVuZGVkU2VhcmNoRm9ybS5lbWl0KHRydWUpO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9udG9sb2d5TWV0YWRhdGEgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktc2VsZWN0LW9udG9sb2d5JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJvbnRvbG9naWVzLmxlbmd0aCA+IDBcIj5cbiAgPG1hdC1zZWxlY3QgcGxhY2Vob2xkZXI9XCJPbnRvbG9neVwiIFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydvbnRvbG9neSddXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb250byBvZiBvbnRvbG9naWVzXCIgW3ZhbHVlXT1cIm9udG8uaWRcIj57eyBvbnRvLmxhYmVsIH19PC9tYXQtb3B0aW9uPlxuICA8L21hdC1zZWxlY3Q+XG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE9udG9sb2d5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICBASW5wdXQoKSBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICBAT3V0cHV0KCkgb250b2xvZ3lTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICAvLyBidWlsZCBhIGZvcm0gZm9yIHRoZSBuYW1lZCBncmFwaCBzZWxlY3Rpb25cbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIG9udG9sb2d5OiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcblxuICAgIC8vIGVtaXQgSXJpIG9mIHRoZSBvbnRvbG9neSB3aGVuIGJlaW5nIHNlbGVjdGVkXG4gICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMub250b2xvZ3lTZWxlY3RlZC5lbWl0KGRhdGEub250b2xvZ3kpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgnb250b2xvZ3knLCB0aGlzLmZvcm0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhcmRpbmFsaXR5LFxuICAgIENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICBQcm9wZXJ0aWVzLFxuICAgIFByb3BlcnR5LFxuICAgIFByb3BlcnR5V2l0aFZhbHVlLFxuICAgIFJlc291cmNlQ2xhc3Ncbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNwZWNpZnlQcm9wZXJ0eVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL3NwZWNpZnktcHJvcGVydHktdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICdAa25vcmEvY29yZSc7XG5cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlbGVjdC1wcm9wZXJ0eScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJzZWFyY2gtcHJvcGVydHktZmllbGRcIiAqbmdJZj1cInByb3BlcnRpZXNBc0FycmF5Py5sZW5ndGggPiAwXCI+XG4gIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiUHJvcGVydGllc1wiIFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydwcm9wZXJ0eSddXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IHByb3Agb2YgcHJvcGVydGllc0FzQXJyYXlcIiBbdmFsdWVdPVwicHJvcC5pZFwiPnt7IHByb3AubGFiZWwgfX08L21hdC1vcHRpb24+XG4gIDwvbWF0LXNlbGVjdD5cbjwvbWF0LWZvcm0tZmllbGQ+XG5cbjxrdWktc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZSAjc3BlY2lmeVByb3BlcnR5VmFsdWUgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKm5nSWY9XCJwcm9wZXJ0eVNlbGVjdGVkICE9PSB1bmRlZmluZWRcIiBbcHJvcGVydHldPVwicHJvcGVydHlTZWxlY3RlZFwiPjwva3VpLXNwZWNpZnktcHJvcGVydHktdmFsdWU+XG5cbjxtYXQtY2hlY2tib3ggbWF0VG9vbHRpcD1cIlNvcnQgY3JpdGVyaW9uXCIgKm5nSWY9XCJwcm9wZXJ0eVNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgc29ydENyaXRlcmlvbigpXCIgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ2lzU29ydENyaXRlcmlvbiddXCI+PC9tYXQtY2hlY2tib3g+YCxcbiAgICBzdHlsZXM6IFtgLnNlYXJjaC1wcm9wZXJ0eS1maWVsZHttYXJnaW4tcmlnaHQ6OHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFByb3BlcnR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgLy8gaW5kZXggb2YgdGhlIGdpdmVuIHByb3BlcnR5ICh1bmlxdWUpXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIC8vIHNldHRlciBtZXRob2QgZm9yIHByb3BlcnRpZXMgd2hlbiBiZWluZyB1cGRhdGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICBASW5wdXQoKVxuICAgIHNldCBwcm9wZXJ0aWVzKHZhbHVlOiBQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlTZWxlY3RlZCA9IHVuZGVmaW5lZDsgLy8gcmVzZXQgc2VsZWN0ZWQgcHJvcGVydHkgKG92ZXJ3cml0aW5nIGFueSBwcmV2aW91cyBzZWxlY3Rpb24pXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzQXJyYXkoKTtcbiAgICB9XG5cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgICB9XG5cbiAgICBfYWN0aXZlUmVzb3VyY2VDbGFzczogUmVzb3VyY2VDbGFzcztcblxuICAgIC8vIHNldHRlciBtZXRob2QgZm9yIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzXG4gICAgQElucHV0KClcbiAgICBzZXQgYWN0aXZlUmVzb3VyY2VDbGFzcyh2YWx1ZTogUmVzb3VyY2VDbGFzcykge1xuICAgICAgICB0aGlzLl9hY3RpdmVSZXNvdXJjZUNsYXNzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gcmVmZXJlbmNlIHRvIGNoaWxkIGNvbXBvbmVudDogY29tYmluYXRpb24gb2YgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUgZm9yIGNob3NlbiBwcm9wZXJ0eVxuICAgIEBWaWV3Q2hpbGQoJ3NwZWNpZnlQcm9wZXJ0eVZhbHVlJykgc3BlY2lmeVByb3BlcnR5VmFsdWU6IFNwZWNpZnlQcm9wZXJ0eVZhbHVlQ29tcG9uZW50O1xuXG4gICAgLy8gcHJvcGVydGllcyB0aGF0IGNhbiBiZSBzZWxlY3RlZCBmcm9tXG4gICAgcHJpdmF0ZSBfcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIC8vIHByb3BlcnRpZXMgYXMgYW4gQXJyYXkgc3RydWN0dXJlIChiYXNlZCBvbiB0aGlzLnByb3BlcnRpZXMpXG4gICAgcHJvcGVydGllc0FzQXJyYXk6IEFycmF5PFByb3BlcnR5PjtcblxuICAgIC8vIHJlcHJlc2VudHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBwcm9wZXJ0eVxuICAgIHByb3BlcnR5U2VsZWN0ZWQ6IFByb3BlcnR5O1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gdW5pcXVlIG5hbWUgZm9yIHRoaXMgcHJvcGVydHkgdG8gYmUgdXNlZCBpbiB0aGUgcGFyZW50IEZvcm1Hcm91cFxuICAgIHByb3BJbmRleDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIGJ1aWxkIGEgZm9ybSBmb3IgdGhlIHByb3BlcnR5IHNlbGVjdGlvblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIHByb3BlcnR5OiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBpc1NvcnRDcml0ZXJpb246IFtmYWxzZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzZWxlY3RlZCBwcm9wZXJ0eVxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvcElyaSA9IGRhdGEucHJvcGVydHk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5U2VsZWN0ZWQgPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BJbmRleCA9ICdwcm9wZXJ0eScgKyB0aGlzLmluZGV4O1xuXG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5wcm9wSW5kZXgsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGZvcm0gZnJvbSB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVtb3ZlQ29udHJvbCh0aGlzLnByb3BJbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBhcyBhIHNvcnQgY3JpdGVyaW9uLlxuICAgICAqIFByb3BlcnR5IGhhcyB0byBoYXZlIGNhcmRpbmFsaXR5IG9yIG1heCBjYXJkaW5hbGl0eSAxIGZvciB0aGUgY2hvc2VuIHJlc291cmNlIGNsYXNzLlxuICAgICAqXG4gICAgICogV2UgY2Fubm90IHNvcnQgYnkgcHJvcGVydGllcyB3aG9zZSBjYXJkaW5hbGl0eSBpcyBncmVhdGVyIHRoYW4gMS5cbiAgICAgKiBSZXR1cm4gYm9vbGVhblxuICAgICAqL1xuICAgIHNvcnRDcml0ZXJpb24oKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSByZXNvdXJjZSBjbGFzcyBpcyBzZWxlY3RlZCBhbmQgaWYgdGhlIHByb3BlcnR5J3MgY2FyZGluYWxpdHkgaXMgMSBmb3IgdGhlIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVSZXNvdXJjZUNsYXNzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wZXJ0eVNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgIXRoaXMucHJvcGVydHlTZWxlY3RlZC5pc0xpbmtQcm9wZXJ0eSkge1xuXG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0aWVzOiBDYXJkaW5hbGl0eVtdID0gdGhpcy5fYWN0aXZlUmVzb3VyY2VDbGFzcy5jYXJkaW5hbGl0aWVzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAoY2FyZDogQ2FyZGluYWxpdHkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FyZGluYWxpdHkgMSBvciBtYXggb2NjdXJyZW5jZSAxXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJkLnByb3BlcnR5ID09PSB0aGlzLnByb3BlcnR5U2VsZWN0ZWQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGNhcmQudmFsdWUgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIChjYXJkLm9jY3VycmVuY2UgPT09IENhcmRpbmFsaXR5T2NjdXJyZW5jZS5jYXJkIHx8IGNhcmQub2NjdXJyZW5jZSA9PT0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1heENhcmQpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhcmRpbmFsaXRpZXMubGVuZ3RoID09PSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzIGFycmF5IHRoYXQgaXMgYWNjZXNzZWQgYnkgdGhlIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0FycmF5KCkge1xuXG4gICAgICAgIC8vIHJlcHJlc2VudCB0aGUgcHJvcGVydGllcyBhcyBhbiBhcnJheSB0byBiZSBhY2Nlc3NlZCBieSB0aGUgdGVtcGxhdGVcbiAgICAgICAgY29uc3QgcHJvcHNBcnJheSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLl9wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wSXJpKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BJcmldO1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBsaXN0IGVkaXRhYmxlIHByb3BzIHRoYXQgYXJlIG5vdCBsaW5rIHZhbHVlIHByb3BzXG4gICAgICAgICAgICAgICAgaWYgKHByb3AuaXNFZGl0YWJsZSAmJiAhcHJvcC5pc0xpbmtWYWx1ZVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzQXJyYXkucHVzaCh0aGlzLl9wcm9wZXJ0aWVzW3Byb3BJcmldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzb3J0IHByb3BlcnRpZXMgYnkgbGFiZWwgKGFzY2VuZGluZylcbiAgICAgICAgcHJvcHNBcnJheS5zb3J0KE9udG9sb2d5SW5mb3JtYXRpb24uc29ydEZ1bmMpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllc0FzQXJyYXkgPSBwcm9wc0FycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlbGVjdGVkIHByb3BlcnR5IHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0eVNlbGVjdGVkV2l0aFZhbHVlKCk6IFByb3BlcnR5V2l0aFZhbHVlIHtcblxuICAgICAgICBjb25zdCBwcm9wVmFsOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSA9IHRoaXMuc3BlY2lmeVByb3BlcnR5VmFsdWUuZ2V0Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWVMaXRlcmFsRm9yUHJvcGVydHkoKTtcblxuICAgICAgICBsZXQgaXNTb3J0Q3JpdGVyaW9uID0gZmFsc2U7XG5cbiAgICAgICAgLy8gb25seSBub24gbGlua2luZyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIGZvciBzb3J0aW5nXG4gICAgICAgIGlmICghdGhpcy5wcm9wZXJ0eVNlbGVjdGVkLmlzTGlua1Byb3BlcnR5KSB7XG4gICAgICAgICAgICBpc1NvcnRDcml0ZXJpb24gPSB0aGlzLmZvcm0udmFsdWUuaXNTb3J0Q3JpdGVyaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdpdGhWYWx1ZSh0aGlzLnByb3BlcnR5U2VsZWN0ZWQsIHByb3BWYWwsIGlzU29ydENyaXRlcmlvbik7XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDb21wYXJpc29uT3BlcmF0b3IsXG4gICAgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgRXF1YWxzLFxuICAgIEV4aXN0cyxcbiAgICBHcmVhdGVyVGhhbixcbiAgICBHcmVhdGVyVGhhbkVxdWFscyxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBMZXNzVGhhbixcbiAgICBMZXNzVGhhbkVxdWFscyxcbiAgICBMaWtlLFxuICAgIE1hdGNoLFxuICAgIE5vdEVxdWFscyxcbiAgICBQcm9wZXJ0eSxcbiAgICBQcm9wZXJ0eVZhbHVlLFxuICAgIFZhbHVlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJzZWFyY2gtb3BlcmF0b3ItZmllbGRcIiAqbmdJZj1cImNvbXBhcmlzb25PcGVyYXRvcnM/Lmxlbmd0aCA+IDBcIj5cbiAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIkNvbXBhcmlzb24gT3BlcmF0b3JcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybS5jb250cm9sc1snY29tcGFyaXNvbk9wZXJhdG9yJ11cIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvbXBPcCBvZiBjb21wYXJpc29uT3BlcmF0b3JzXCIgW3ZhbHVlXT1cImNvbXBPcFwiPnt7IGNvbXBPcC5sYWJlbCB9fTwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG48L21hdC1mb3JtLWZpZWxkPlxuXG48IS0tIHNlbGVjdCBhcHQgY29tcG9uZW50IGZvciB2YWx1ZSBzcGVjaWZpY2F0aW9uIHVzaW5nIGEgc3dpdGNoIGNhc2Ugc3RhdGVtZW50LS0+XG48c3BhblxuICAgICpuZ0lmPVwiY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBjb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZCAhPT0gbnVsbCAmJiBjb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZC5nZXRDbGFzc05hbWUoKSAhPSAnRXhpc3RzJ1wiXG4gICAgW25nU3dpdGNoXT1cInByb3BlcnR5VmFsdWVUeXBlXCI+XG4gIDxib29sZWFuLXZhbHVlICNwcm9wZXJ0eVZhbHVlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWVcIj48L2Jvb2xlYW4tdmFsdWU+XG4gIDxkYXRlLXZhbHVlICNwcm9wZXJ0eVZhbHVlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWVcIj48L2RhdGUtdmFsdWU+XG4gIDxkZWNpbWFsLXZhbHVlICNwcm9wZXJ0eVZhbHVlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWVcIj48L2RlY2ltYWwtdmFsdWU+XG4gIDxpbnRlZ2VyLXZhbHVlICNwcm9wZXJ0eVZhbHVlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZVwiPjwvaW50ZWdlci12YWx1ZT5cbiAgPGxpbmstdmFsdWUgI3Byb3BlcnR5VmFsdWUgW2Zvcm1Hcm91cF09XCJmb3JtXCIgW3Jlc3RyaWN0UmVzb3VyY2VDbGFzc109XCJwcm9wZXJ0eS5vYmplY3RUeXBlXCJcbiAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlc291cmNlXCI+PC9saW5rLXZhbHVlPlxuICA8dGV4dC12YWx1ZSAjcHJvcGVydHlWYWx1ZSBbZm9ybUdyb3VwXT1cImZvcm1cIiAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuVGV4dFZhbHVlXCI+PC90ZXh0LXZhbHVlPlxuICA8dXJpLXZhbHVlICNwcm9wZXJ0eVZhbHVlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZVwiPjwvdXJpLXZhbHVlPlxuXG4gICAgPCEtLSBUT0RPOiBSZXNvdXJjZTogaGFuZGxlIGxpbmtpbmcgcHJvcGVydGllcyB3aXRoIHRhcmdldCBjbGFzcyByZXN0cmljdGlvbjogYWNjZXNzIHByb3BlcnR5IG1lbWJlciB0byBnZXQgb2JqZWN0Q2xhc3MgdmlhIHByb3BlcnR5KCkgZ2V0dGVyIG1ldGhvZCAtLT5cbiAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD1cIlwiPk5vdCBzdXBwb3J0ZWQge3twcm9wZXJ0eVZhbHVlVHlwZX19PC9zcGFuPlxuPC9zcGFuPlxuYCxcbiAgICBzdHlsZXM6IFtgLnNlYXJjaC1vcGVyYXRvci1maWVsZHttYXJnaW4tcmlnaHQ6OHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFNwZWNpZnlQcm9wZXJ0eVZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIC8vIHBhcmVudCBGb3JtR3JvdXBcbiAgICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIEBWaWV3Q2hpbGQoJ3Byb3BlcnR5VmFsdWUnKSBwcm9wZXJ0eVZhbHVlQ29tcG9uZW50OiBQcm9wZXJ0eVZhbHVlO1xuXG4gICAgLy8gc2V0dGVyIG1ldGhvZCBmb3IgdGhlIHByb3BlcnR5IGNob3NlbiBieSB0aGUgdXNlclxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHByb3BlcnR5KHByb3A6IFByb3BlcnR5KSB7XG4gICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQgPSB1bmRlZmluZWQ7IC8vIHJlc2V0IHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgdGhpcy5fcHJvcGVydHkgPSBwcm9wO1xuICAgICAgICB0aGlzLnJlc2V0Q29tcGFyaXNvbk9wZXJhdG9ycygpOyAvLyByZXNldCBjb21wYXJpc29uIG9wZXJhdG9ycyBmb3IgZ2l2ZW4gcHJvcGVydHkgKG92ZXJ3cml0aW5nIGFueSBwcmV2aW91cyBzZWxlY3Rpb24pXG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIG1ldGhvZCBmb3IgdGhpcy5fcHJvcGVydHlcbiAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5O1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gYXZhaWxhYmxlIGNvbXBhcmlzb24gb3BlcmF0b3JzIGZvciB0aGUgcHJvcGVydHlcbiAgICBjb21wYXJpc29uT3BlcmF0b3JzOiBBcnJheTxDb21wYXJpc29uT3BlcmF0b3I+ID0gW107XG5cbiAgICAvLyBjb21wYXJpc29uIG9wZXJhdG9yIHNlbGVjdGVkIGJ5IHRoZSB1c2VyXG4gICAgY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQ6IENvbXBhcmlzb25PcGVyYXRvcjtcblxuICAgIC8vIHRoZSB0eXBlIG9mIHRoZSBwcm9wZXJ0eVxuICAgIHByb3BlcnR5VmFsdWVUeXBlO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3JzIGZvciB0aGlzLl9wcm9wZXJ0eS5cbiAgICAgKi9cbiAgICByZXNldENvbXBhcmlzb25PcGVyYXRvcnMoKSB7XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIG9iamVjdCBjbGFzcywgc2V0IGNvbXBhcmlzb24gb3BlcmF0b3JzIGFuZCB2YWx1ZSBlbnRyeSBmaWVsZFxuICAgICAgICBpZiAodGhpcy5fcHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlWYWx1ZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlWYWx1ZVR5cGUgPSB0aGlzLl9wcm9wZXJ0eS5vYmplY3RUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BlcnR5VmFsdWVUeXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dFZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgTGlrZSgpLCBuZXcgTWF0Y2goKSwgbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JzID0gW25ldyBFcXVhbHMoKSwgbmV3IE5vdEVxdWFscygpLCBuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmlzb25PcGVyYXRvcnMgPSBbbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBMZXNzVGhhbigpLCBuZXcgTGVzc1RoYW5FcXVhbHMoKSwgbmV3IEdyZWF0ZXJUaGFuKCksIG5ldyBHcmVhdGVyVGhhbkVxdWFscygpLCBuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuR2VvbVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5GaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkF1ZGlvRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5ERERGaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLk1vdmluZ0ltYWdlRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogVW5zdXBwb3J0ZWQgdmFsdWUgdHlwZSAnICsgdGhpcy5fcHJvcGVydHkub2JqZWN0VHlwZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuXG4gICAgICAgIC8vIGJ1aWxkIGEgZm9ybSBmb3IgY29tcGFyaXNvbiBvcGVyYXRvciBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBjb21wYXJpc29uT3BlcmF0b3I6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzdG9yZSBjb21wYXJpc29uIG9wZXJhdG9yIHdoZW4gc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQgPSBkYXRhLmNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgcGFyZW50IGZvcm0gZ3JvdXAgKGNsZWFuIHJlc2V0KVxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVtb3ZlQ29udHJvbCgnY29tcGFyaXNvbk9wZXJhdG9yJyk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgnY29tcGFyaXNvbk9wZXJhdG9yJywgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIHJldHVybnMge0NvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlfSB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuICAgICAqL1xuICAgIGdldENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlTGl0ZXJhbEZvclByb3BlcnR5KCk6IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlIHtcbiAgICAgICAgLy8gcmV0dXJuIHZhbHVlIChsaXRlcmFsIG9yIElSSSkgZnJvbSB0aGUgY2hpbGQgY29tcG9uZW50XG4gICAgICAgIGxldCB2YWx1ZTogVmFsdWU7XG5cbiAgICAgICAgLy8gY29tcGFyaXNvbiBvcGVyYXRvciAnRXhpc3RzJyBkb2VzIG5vdCByZXF1aXJlIGEgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucHJvcGVydHlWYWx1ZUNvbXBvbmVudC5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB0aGUgc3BlY2lmaWVkIHZhbHVlXG4gICAgICAgIHJldHVybiBuZXcgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUodGhpcy5jb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZCwgdmFsdWUpO1xuXG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVmFsdWUsIFZhbHVlTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdib29sZWFuLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtY2hlY2tib3ggW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ2Jvb2xlYW5WYWx1ZSddXCI+PC9tYXQtY2hlY2tib3g+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBCb29sZWFuVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgYm9vbGVhblZhbHVlOiBbZmFsc2UsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Byb3BWYWx1ZScsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGZvcm0gZnJvbSB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVtb3ZlQ29udHJvbCgncHJvcFZhbHVlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKTogVmFsdWUge1xuICAgICAgICByZXR1cm4gbmV3IFZhbHVlTGl0ZXJhbChTdHJpbmcodGhpcy5mb3JtLnZhbHVlLmJvb2xlYW5WYWx1ZSksIEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBQcm9wZXJ0eVZhbHVlLCBWYWx1ZSwgVmFsdWVMaXRlcmFsIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgR3JlZ29yaWFuQ2FsZW5kYXJEYXRlLCBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyLCBKRE5QZXJpb2QgfSBmcm9tICdqZG5jb252ZXJ0aWJsZWNhbGVuZGFyJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9MT0NBTEUsIE1hdENhbGVuZGFyLCBNYXREYXRlcGlja2VyQ29udGVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlciB9IGZyb20gJ2pkbmNvbnZlcnRpYmxlY2FsZW5kYXJkYXRlYWRhcHRlcic7XG5cbi8qKiBDdXN0b20gaGVhZGVyIGNvbXBvbmVudCBjb250YWluaW5nIGEgY2FsZW5kYXIgZm9ybWF0IHN3aXRjaGVyICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1jYWxlbmRhci1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIkNhbGVuZGFyIEZvcm1hdFwiIFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydjYWxlbmRhciddXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjYWwgb2Ygc3VwcG9ydGVkQ2FsZW5kYXJGb3JtYXRzXCIgW3ZhbHVlXT1cImNhbFwiPnt7Y2FsfX08L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWNhbGVuZGFyLWhlYWRlcj48L21hdC1jYWxlbmRhci1oZWFkZXI+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudDxEPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwcml2YXRlIF9jYWxlbmRhcjogTWF0Q2FsZW5kYXI8SkROQ29udmVydGlibGVDYWxlbmRhcj4sXG4gICAgICAgIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxKRE5Db252ZXJ0aWJsZUNhbGVuZGFyPixcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckNvbnRlbnQ6IE1hdERhdGVwaWNrZXJDb250ZW50PEpETkNvbnZlcnRpYmxlQ2FsZW5kYXI+LFxuICAgICAgICBASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIC8vIGEgbGlzdCBvZiBzdXBwb3J0ZWQgY2FsZW5kYXIgZm9ybWF0cyAoR3JlZ29yaWFuIGFuZCBKdWxpYW4pXG4gICAgc3VwcG9ydGVkQ2FsZW5kYXJGb3JtYXRzID0gSkROQ29udmVydGlibGVDYWxlbmRhci5zdXBwb3J0ZWRDYWxlbmRhcnM7XG5cbiAgICAvLyB0aGUgY3VycmVudGx5IGFjdGl2ZSBjYWxlbmRhciBmb3JtYXRcbiAgICBhY3RpdmVGb3JtYXQ7XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgY2FsZW5kYXIgZm9ybWF0IGZyb20gdGhlIGRhdGUgYWRhcHRlclxuICAgICAgICBpZiAodGhpcy5fZGF0ZUFkYXB0ZXIgaW5zdGFuY2VvZiBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9ybWF0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWN0aXZlQ2FsZW5kYXJGb3JtYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZSBhZGFwdGVyIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGluc3RhbmNlIG9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYnVpbGQgYSBmb3JtIGZvciB0aGUgY2FsZW5kYXIgZm9ybWF0IHNlbGVjdGlvblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGNhbGVuZGFyOiBbdGhpcy5hY3RpdmVGb3JtYXQsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRvIHRoZSBjb252ZXJzaW9uIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbm90aGVyIGNhbGVuZGFyIGZvcm1hdFxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gcGFzcyB0aGUgdGFyZ2V0IGNhbGVuZGFyIGZvcm1hdCB0byB0aGUgY29udmVyc2lvbiBtZXRob2RcbiAgICAgICAgICAgIHRoaXMuY29udmVydERhdGUoZGF0YS5jYWxlbmRhcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIGRhdGUgaW50byB0aGUgdGFyZ2V0IGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxlbmRhciB0aGUgdGFyZ2V0IGNhbGVuZGFyIGZvcm1hdC5cbiAgICAgKi9cbiAgICBjb252ZXJ0RGF0ZShjYWxlbmRhcjogJ0dyZWdvcmlhbicgfCAnSnVsaWFuJykge1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRlQWRhcHRlciBpbnN0YW5jZW9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcikge1xuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRlIGludG8gdGhlIHRhcmdldCBjYWxlbmRhciBmb3JtYXRcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZERhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jb252ZXJ0Q2FsZW5kYXJGb3JtYXQodGhpcy5fY2FsZW5kYXIuYWN0aXZlRGF0ZSwgY2FsZW5kYXIpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIG5ldyBkYXRlXG4gICAgICAgICAgICB0aGlzLl9jYWxlbmRhci5hY3RpdmVEYXRlID0gY29udmVydGVkRGF0ZTtcblxuICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBuZXcgZGF0ZSBpbiB0aGUgZGF0ZXBpY2tlciBVSVxuICAgICAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckNvbnRlbnQuZGF0ZXBpY2tlci5zZWxlY3QoY29udmVydGVkRGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB2aWV3IGFmdGVyIGNhbGVuZGFyIGZvcm1hdCBjb252ZXJzaW9uXG4gICAgICAgICAgICB0aGlzLl9jYWxlbmRhci51cGRhdGVUb2RheXNEYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZSBhZGFwdGVyIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGluc3RhbmNlIG9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIFByb3BlcnR5VmFsdWUsIFZhbHVlLCBWYWx1ZUxpdGVyYWwgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBHcmVnb3JpYW5DYWxlbmRhckRhdGUsIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXIsIEpETlBlcmlvZCB9IGZyb20gJ2pkbmNvbnZlcnRpYmxlY2FsZW5kYXInO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXItY2FsZW5kYXIvaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1NjYxMDEwL2R5bmFtaWMtbmVzdGVkLXJlYWN0aXZlLWZvcm0tZXhwcmVzc2lvbmNoYW5nZWRhZnRlcml0aGFzYmVlbmNoZWNrZWRlcnJvclxuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RhdGUtdmFsdWUnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxrdWlKZG5EYXRlcGlja2VyPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCIgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ2RhdGVWYWx1ZSddXCI+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIFtjYWxlbmRhckhlYWRlckNvbXBvbmVudF09XCJoZWFkZXJDb21wb25lbnRcIj48L21hdC1kYXRlcGlja2VyPlxuICAgIDwva3VpSmRuRGF0ZXBpY2tlcj5cbiAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuPC9tYXQtZm9ybS1maWVsZD5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gY3VzdG9tIGhlYWRlciBmb3IgdGhlIGRhdGVwaWNrZXJcbiAgICBoZWFkZXJDb21wb25lbnQgPSBIZWFkZXJDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIGluaXQgZGF0ZXBpY2tlclxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGRhdGVWYWx1ZTogW251bGwsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YS5kYXRlVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Byb3BWYWx1ZScsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGZvcm0gZnJvbSB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVtb3ZlQ29udHJvbCgncHJvcFZhbHVlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKTogVmFsdWUge1xuXG4gICAgICAgIGNvbnN0IGRhdGVPYmo6IEpETkNvbnZlcnRpYmxlQ2FsZW5kYXIgPSB0aGlzLmZvcm0udmFsdWUuZGF0ZVZhbHVlO1xuXG4gICAgICAgIC8vIGdldCBjYWxlbmRhciBmb3JtYXRcbiAgICAgICAgY29uc3QgY2FsZW5kYXJGb3JtYXQgPSBkYXRlT2JqLmNhbGVuZGFyTmFtZTtcbiAgICAgICAgLy8gZ2V0IGNhbGVuZGFyIHBlcmlvZFxuICAgICAgICBjb25zdCBjYWxlbmRhclBlcmlvZCA9IGRhdGVPYmoudG9DYWxlbmRhclBlcmlvZCgpO1xuICAgICAgICAvLyBnZXQgdGhlIGRhdGVcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGAke2NhbGVuZGFyRm9ybWF0LnRvVXBwZXJDYXNlKCl9OiR7Y2FsZW5kYXJQZXJpb2QucGVyaW9kU3RhcnQueWVhcn0tJHtjYWxlbmRhclBlcmlvZC5wZXJpb2RTdGFydC5tb250aH0tJHtjYWxlbmRhclBlcmlvZC5wZXJpb2RTdGFydC5kYXl9OiR7Y2FsZW5kYXJQZXJpb2QucGVyaW9kRW5kLnllYXJ9LSR7Y2FsZW5kYXJQZXJpb2QucGVyaW9kRW5kLm1vbnRofS0ke2NhbGVuZGFyUGVyaW9kLnBlcmlvZEVuZC5kYXl9YDtcblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlTGl0ZXJhbChTdHJpbmcoZGF0ZVN0cmluZyksIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBQcm9wZXJ0eVZhbHVlLCBWYWx1ZSwgVmFsdWVMaXRlcmFsIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZWNpbWFsLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXQgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ2RlY2ltYWxWYWx1ZSddXCIgcGxhY2Vob2xkZXI9XCJEZWNpbWFsIHZhbHVlXCIgdmFsdWU9XCJcIiB0eXBlPVwibnVtYmVyXCI+XG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjaW1hbFZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBkZWNpbWFsVmFsdWU6IFtudWxsLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWRdKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdwcm9wVmFsdWUnLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Byb3BWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFZhbHVlKCk6IFZhbHVlIHtcblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlTGl0ZXJhbChTdHJpbmcodGhpcy5mb3JtLnZhbHVlLmRlY2ltYWxWYWx1ZSksIEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVmFsdWUsIFZhbHVlTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnaW50ZWdlci12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0IFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydpbnRlZ2VyVmFsdWUnXVwiIHBsYWNlaG9sZGVyPVwiSW50ZWdlciB2YWx1ZVwiIHZhbHVlPVwiXCIgdHlwZT1cIm51bWJlclwiPlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEludGVnZXJWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8vIHBhcmVudCBGb3JtR3JvdXBcbiAgICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGludGVnZXJWYWx1ZTogW251bGwsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eLT9cXGQrJC8pXSldIC8vIG9ubHkgYWxsb3cgZm9yIGludGVnZXIgdmFsdWVzIChubyBmcmFjdGlvbnMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncHJvcFZhbHVlJywgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZUxpdGVyYWwoU3RyaW5nKHRoaXMuZm9ybS52YWx1ZS5pbnRlZ2VyVmFsdWUpLCBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIENvbnZlcnRKU09OTEQsXG4gICAgSVJJLFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLFxuICAgIFByb3BlcnR5VmFsdWUsXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBTZWFyY2hTZXJ2aWNlLFxuICAgIFZhbHVlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaW5rLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJyZXNvdXJjZVwiIGFyaWEtbGFiZWw9XCJyZXNvdXJjZVwiIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiIFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydyZXNvdXJjZSddXCI+XG4gICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheVJlc291cmNlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCByZXMgb2YgcmVzb3VyY2VzXCIgW3ZhbHVlXT1cInJlc1wiPlxuICAgICAgICAgICAge3tyZXM/LmxhYmVsfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcmVzb3VyY2VzOiBSZWFkUmVzb3VyY2VbXTtcblxuICAgIHByaXZhdGUgX3Jlc3RyaWN0VG9SZXNvdXJjZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCByZXN0cmljdFJlc291cmNlQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCByZXN0cmljdFJlc291cmNlQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSwgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgYSBzZWxlY3RlZCByZXNvdXJjZSB1c2luZyBpdHMgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2UgdGhlIHJlc291cmNlIHRvIGJlIGRpc3BsYXllZCAob3Igbm8gc2VsZWN0aW9uIHlldCkuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBkaXNwbGF5UmVzb3VyY2UocmVzb3VyY2U6IFJlYWRSZXNvdXJjZSB8IG51bGwpIHtcblxuICAgICAgICAvLyBudWxsIGlzIHRoZSBpbml0aWFsIHZhbHVlIChubyBzZWxlY3Rpb24geWV0KVxuICAgICAgICBpZiAocmVzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgcmVzb3VyY2VzIHdob3NlIGxhYmVscyBjb250YWluIHRoZSBnaXZlbiBzZWFyY2ggdGVybSwgcmVzdHJpY3RpbmcgdG8gdG8gdGhlIGdpdmVuIHByb3BlcnRpZXMgb2JqZWN0IGNvbnN0cmFpbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybVxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gYXQgbGVhc3QgMyBjaGFyYWN0ZXJzIGFyZSByZXF1aXJlZFxuICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPj0gMykge1xuXG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlLnNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtLCB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IHJlc3VsdC5yZXNvdXJjZXM7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSlNPTkxEIG9mIGZ1bGwgcmVzb3VyY2UgcmVxdWVzdCBjb3VsZCBub3QgYmUgZXhwYW5kZWQ6JyArIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGF0IHRoZSBzZWxlY3Rpb24gaXMgYSBbW1JlYWRSZXNvdXJjZV1dLlxuICAgICAqXG4gICAgICogU3VycHJpc2luZ2x5LCBbbnVsbF0gaGFzIHRvIGJlIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyB2YWxpZDogaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2Zvcm0tdmFsaWRhdGlvbiNjdXN0b20tdmFsaWRhdG9yc1xuICAgICAqXG4gICAgICogQHBhcmFtIHRoZSBmb3JtIGVsZW1lbnQgd2hvc2UgdmFsdWUgaGFzIHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB2YWxpZGF0ZVJlc291cmNlKGM6IEZvcm1Db250cm9sKSB7XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZFJlc291cmNlID0gKGMudmFsdWUgaW5zdGFuY2VvZiBSZWFkUmVzb3VyY2UpO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkUmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBub1Jlc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjLnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcmVzb3VyY2U6IFtudWxsLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVJlc291cmNlXG4gICAgICAgICAgICBdKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQnlMYWJlbChkYXRhLnJlc291cmNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdwcm9wVmFsdWUnLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJUkkodGhpcy5mb3JtLnZhbHVlLnJlc291cmNlLmlkKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBQcm9wZXJ0eVZhbHVlLCBWYWx1ZSwgVmFsdWVMaXRlcmFsIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0ZXh0LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXQgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ3RleHRWYWx1ZSddXCIgcGxhY2Vob2xkZXI9XCJ0ZXh0IHZhbHVlXCIgdmFsdWU9XCJcIj5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgdGV4dFZhbHVlOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdwcm9wVmFsdWUnLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Byb3BWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFZhbHVlKCk6IFZhbHVlIHtcblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlTGl0ZXJhbChTdHJpbmcodGhpcy5mb3JtLnZhbHVlLnRleHRWYWx1ZSksIEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVXRpbHMsIFZhbHVlLCBWYWx1ZUxpdGVyYWwgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1NjYxMDEwL2R5bmFtaWMtbmVzdGVkLXJlYWN0aXZlLWZvcm0tZXhwcmVzc2lvbmNoYW5nZWRhZnRlcml0aGFzYmVlbmNoZWNrZWRlcnJvclxuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3VyaS12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0IFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWyd1cmlWYWx1ZSddXCIgcGxhY2Vob2xkZXI9XCJVUklcIiB2YWx1ZT1cIlwiPlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFVyaVZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgdXJpVmFsdWU6IFtudWxsLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybihVdGlscy5SZWdleFVybCldKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdwcm9wVmFsdWUnLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Byb3BWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFZhbHVlKCk6IFZhbHVlIHtcblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlTGl0ZXJhbChTdHJpbmcodGhpcy5mb3JtLnZhbHVlLnVyaVZhbHVlKSwgS25vcmFDb25zdGFudHMueHNkVXJpKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVzb3VyY2VDbGFzcyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlbGVjdC1yZXNvdXJjZS1jbGFzcycsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJyZXNvdXJjZUNsYXNzZXMubGVuZ3RoID4gMFwiPlxuICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIlJlc291cmNlIENsYXNzXCIgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ3Jlc291cmNlQ2xhc3MnXVwiPlxuICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJudWxsXCI+bm8gc2VsZWN0aW9uPC9tYXQtb3B0aW9uPlxuICAgIDwhLS0gdW5kbyBzZWxlY3Rpb24gb2YgYSByZXNvdXJjZSBjbGFzcyAtLT5cbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgcmVzb3VyY2VDbGFzcyBvZiByZXNvdXJjZUNsYXNzZXNcIiBbdmFsdWVdPVwicmVzb3VyY2VDbGFzcy5pZFwiPnt7IHJlc291cmNlQ2xhc3MubGFiZWwgfX08L21hdC1vcHRpb24+XG4gIDwvbWF0LXNlbGVjdD5cbjwvbWF0LWZvcm0tZmllbGQ+YCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgLy8gc2V0dGVyIG1ldGhvZCBmb3IgcmVzb3VyY2UgY2xhc3NlcyB3aGVuIGJlaW5nIHVwZGF0ZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHJlc291cmNlQ2xhc3Nlcyh2YWx1ZTogQXJyYXk8UmVzb3VyY2VDbGFzcz4pIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQgPSB1bmRlZmluZWQ7IC8vIHJlc2V0IG9uIHVwZGF0ZXNcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VDbGFzc2VzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyIG1ldGhvZCBmb3IgcmVzb3VyY2UgY2xhc3NlcyAodXNlZCBpbiB0ZW1wbGF0ZSlcbiAgICBnZXQgcmVzb3VyY2VDbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VDbGFzc2VzO1xuICAgIH1cblxuICAgIC8vIGV2ZW50IGVtaXR0ZWQgdG8gcGFyZW50IGNvbXBvbmVudCBvbmNlIGEgcmVzb3VyY2UgY2xhc3MgaXMgc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAgICBAT3V0cHV0KCkgcmVzb3VyY2VDbGFzc1NlbGVjdGVkRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIC8vIGF2YWlsYWJsZSByZXNvdXJjZSBjbGFzc2VzIGZvciBzZWxlY3Rpb25cbiAgICBwcml2YXRlIF9yZXNvdXJjZUNsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+O1xuXG4gICAgLy8gc3RvcmVzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3NcbiAgICBwcml2YXRlIHJlc291cmNlQ2xhc3NTZWxlY3RlZDogc3RyaW5nO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBJcmkgb2YgdGhlIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIElyaSBvZiB0aGUgc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3Mgb3IgZmFsc2UgaW4gY2FzZSBubyByZXNvdXJjZSBjbGFzcyBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzU2VsZWN0ZWQoKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRhbGl6ZXMgdGhlIEZvcm1Hcm91cCBmb3IgdGhlIHJlc291cmNlIGNsYXNzIHNlbGVjdGlvbi5cbiAgICAgKiBUaGUgaW5pdGlhbCB2YWx1ZSBpcyBzZXQgdG8gbnVsbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRGb3JtKCkge1xuICAgICAgICAvLyBidWlsZCBhIGZvcm0gZm9yIHRoZSByZXNvdXJjZSBjbGFzcyBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzOiBbbnVsbF0gLy8gcmVzb3VyY2UgY2xhc3Mgc2VsZWN0aW9uIGlzIG9wdGlvbmFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHN0b3JlIGFuZCBlbWl0IElyaSBvZiB0aGUgcmVzb3VyY2UgY2xhc3Mgd2hlbiBzZWxlY3RlZFxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQgPSBkYXRhLnJlc291cmNlQ2xhc3M7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZEV2ZW50LmVtaXQodGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG5cbiAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Jlc291cmNlQ2xhc3MnLCB0aGlzLmZvcm0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8vIHJlc291cmNlIGNsYXNzZXMgaGF2ZSBiZWVuIHJlaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgIC8vIHJlc2V0IGZvcm1cbiAgICAgICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGlzIGZvcm0gZnJvbSB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdyZXNvdXJjZUNsYXNzJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdyZXNvdXJjZUNsYXNzJywgdGhpcy5mb3JtKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgS3VpQ29yZU1vZHVsZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IEt1aUFjdGlvbk1vZHVsZSB9IGZyb20gJ0Brbm9yYS9hY3Rpb24nO1xuaW1wb3J0IHsgS3VpVmlld2VyTW9kdWxlIH0gZnJvbSAnQGtub3JhL3ZpZXdlcic7XG5cbmltcG9ydCB7IE1hdEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlck1vZHVsZSB9IGZyb20gJ2pkbmNvbnZlcnRpYmxlY2FsZW5kYXJkYXRlYWRhcHRlcic7XG5cbmltcG9ydCB7IFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdWxsdGV4dFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1wYW5lbC9zZWFyY2gtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbmRlZC1zZWFyY2gvZXh0ZW5kZWQtc2VhcmNoLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFNlbGVjdE9udG9sb2d5Q29tcG9uZW50IH0gZnJvbSAnLi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LW9udG9sb2d5L3NlbGVjdC1vbnRvbG9neS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdFByb3BlcnR5Q29tcG9uZW50IH0gZnJvbSAnLi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NlbGVjdC1wcm9wZXJ0eS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3BlY2lmeVByb3BlcnR5VmFsdWVDb21wb25lbnQgfSBmcm9tICcuL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCb29sZWFuVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9ib29sZWFuLXZhbHVlL2Jvb2xlYW4tdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvZGF0ZS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjaW1hbFZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvZGVjaW1hbC12YWx1ZS9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlZ2VyVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9pbnRlZ2VyLXZhbHVlL2ludGVnZXItdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmtWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2xpbmstdmFsdWUvbGluay12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dFZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcmlWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL3VyaS12YWx1ZS91cmktdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvaGVhZGVyLWNhbGVuZGFyL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEt1aUNvcmVNb2R1bGUsXG4gICAgICAgIEt1aUFjdGlvbk1vZHVsZSxcbiAgICAgICAgS3VpVmlld2VyTW9kdWxlLFxuICAgICAgICBNYXRKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdE9udG9sb2d5Q29tcG9uZW50LFxuICAgICAgICBFeHRlbmRlZFNlYXJjaENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0UHJvcGVydHlDb21wb25lbnQsXG4gICAgICAgIFNwZWNpZnlQcm9wZXJ0eVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBCb29sZWFuVmFsdWVDb21wb25lbnQsXG4gICAgICAgIERhdGVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRGVjaW1hbFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBJbnRlZ2VyVmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpbmtWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBVcmlWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBGdWxsdGV4dFNlYXJjaENvbXBvbmVudCxcbiAgICAgICAgU2VhcmNoUGFuZWxDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU2VhcmNoQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hQYW5lbENvbXBvbmVudCxcbiAgICAgICAgRnVsbHRleHRTZWFyY2hDb21wb25lbnQsXG4gICAgICAgIEV4dGVuZGVkU2VhcmNoQ29tcG9uZW50LFxuICAgICAgICBEYXRlVmFsdWVDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBIZWFkZXJDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEt1aVNlYXJjaE1vZHVsZSB7XG59XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIHNlYXJjaFxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VhcmNoLXBhbmVsL3NlYXJjaC1wYW5lbC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvZXh0ZW5kZWQtc2VhcmNoLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LW9udG9sb2d5L3NlbGVjdC1vbnRvbG9neS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zZWxlY3QtcHJvcGVydHkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvYm9vbGVhbi12YWx1ZS9ib29sZWFuLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvZGF0ZS12YWx1ZS9kYXRlLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvZGF0ZS12YWx1ZS9oZWFkZXItY2FsZW5kYXIvaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvZGVjaW1hbC12YWx1ZS9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvaW50ZWdlci12YWx1ZS9pbnRlZ2VyLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvbGluay12YWx1ZS9saW5rLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHRlbmRlZC1zZWFyY2gvc2VsZWN0LXByb3BlcnR5L3NwZWNpZnktcHJvcGVydHktdmFsdWUvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50JztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VhcmNoLm1vZHVsZSc7XG4iLCIvKipcbiAqIEdlbmVyYXRlZCBidW5kbGUgaW5kZXguIERvIG5vdCBlZGl0LlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vcHVibGljX2FwaSc7XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJBY3RpdmF0ZWRSb3V0ZSIsIlJvdXRlciIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIkV2ZW50RW1pdHRlciIsIlJlYWRSZXNvdXJjZXNTZXF1ZW5jZSIsIkZvcm1CdWlsZGVyIiwiSW5qZWN0IiwiT250b2xvZ3lDYWNoZVNlcnZpY2UiLCJHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJWaWV3Q2hpbGRyZW4iLCJWYWxpZGF0b3JzIiwiQ2FyZGluYWxpdHlPY2N1cnJlbmNlIiwiT250b2xvZ3lJbmZvcm1hdGlvbiIsIlByb3BlcnR5V2l0aFZhbHVlIiwicmVzb2x2ZWRQcm9taXNlIiwiS25vcmFDb25zdGFudHMiLCJMaWtlIiwiTWF0Y2giLCJFcXVhbHMiLCJOb3RFcXVhbHMiLCJFeGlzdHMiLCJMZXNzVGhhbiIsIkxlc3NUaGFuRXF1YWxzIiwiR3JlYXRlclRoYW4iLCJHcmVhdGVyVGhhbkVxdWFscyIsIkNvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlIiwiVmFsdWVMaXRlcmFsIiwiSkROQ29udmVydGlibGVDYWxlbmRhciIsIkpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlciIsIk1hdENhbGVuZGFyIiwiSG9zdCIsIkRhdGVBZGFwdGVyIiwiTWF0RGF0ZXBpY2tlckNvbnRlbnQiLCJSZWFkUmVzb3VyY2UiLCJJUkkiLCJTZWFyY2hTZXJ2aWNlIiwiVXRpbHMiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0Q2hlY2tib3hNb2R1bGUiLCJNYXREYXRlcGlja2VyTW9kdWxlIiwiTWF0Rm9ybUZpZWxkTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0TGlzdE1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJLdWlDb3JlTW9kdWxlIiwiS3VpQWN0aW9uTW9kdWxlIiwiS3VpVmlld2VyTW9kdWxlIiwiTWF0SkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxhQTRGZ0IsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMzQztTQUNKLENB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