import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export class FulltextSearchComponent {
    constructor(_route, _router) {
        this._route = _route;
        this._router = _router;
        this.route = '/search';
        this.showSimpleSearch = true;
        this.searchPanelFocus = false;
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.focusOnSimple = 'inactive';
        this.searchLabel = 'Search';
    }
    ngOnInit() {
    }
    /**
     * @ignore
     * Do search on Enter click, reset search on Escape
     * @param search_ele
     * @param event
     * @returns void
     */
    onKey(search_ele, event) {
        this.focusOnSimple = 'active';
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
            this.doSearch(search_ele);
        }
        if (event.key === 'Escape' || event.keyCode === 27 || event.which === 27) {
            this.resetSearch(search_ele);
        }
    }
    /**
     * Realise a simple search
     * @param {HTMLElement} search_ele
     * @returns void
     */
    doSearch(search_ele) {
        if (this.searchQuery !== undefined && this.searchQuery !== null) {
            this.toggleMenu();
            this._router.navigate([this.route + '/fulltext/' + this.searchQuery]);
            // this._router.navigate(['/search/fulltext/' + this.searchQuery], { relativeTo: this._route });
            // push the search query into the local storage prevSearch array (previous search)
            // to have a list of recent search requests
            let existingPrevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            if (existingPrevSearch === null) {
                existingPrevSearch = [];
            }
            let i = 0;
            for (const entry of existingPrevSearch) {
                // remove entry, if exists already
                if (this.searchQuery === entry) {
                    existingPrevSearch.splice(i, 1);
                }
                i++;
            }
            existingPrevSearch.push(this.searchQuery);
            localStorage.setItem('prevSearch', JSON.stringify(existingPrevSearch));
        }
        else {
            search_ele.focus();
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        }
    }
    /**
     * Reset the search
     * @param {HTMLElement} search_ele
     * @returns void
     */
    resetSearch(search_ele) {
        this.searchQuery = null;
        search_ele.focus();
        this.focusOnSimple = 'inactive';
        this.searchPanelFocus = !this.searchPanelFocus;
    }
    /**
     * Switch according to the focus between simple or extended search
     *
     * @param {string} name 2 cases: simpleSearch or extendedSearch
     * @returns void
     */
    toggleMenu() {
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.focusOnSimple = (this.focusOnSimple === 'active' ? 'inactive' : 'active');
        this.showSimpleSearch = true;
    }
    /**
     * Set simple focus to active
     *
     * @returns void
     */
    setFocus() {
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.focusOnSimple = 'active';
        this.searchPanelFocus = !this.searchPanelFocus;
    }
    /**
     * Realise a previous search
     * @param {string} query
     * @returns void
     */
    doPrevSearch(query) {
        this.searchQuery = query;
        this._router.navigate([this.route + '/fulltext/' + query], { relativeTo: this._route });
        this.toggleMenu();
    }
    /**
     * Reset previous searches - the whole previous search or specific item by name
     * @param {string} name term of the search
     * @returns void
     */
    resetPrevSearch(name = null) {
        if (name) {
            // delete only this item with the name ...
            const i = this.prevSearch.indexOf(name);
            this.prevSearch.splice(i, 1);
            localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
        }
        else {
            // delete the whole "previous search" array
            localStorage.removeItem('prevSearch');
        }
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
    }
}
FulltextSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-fulltext-search',
                template: `<div class="search-bar-elements">

    <div class="fulltext-search-bar" [class.active]="searchPanelFocus">
        <div>
            <button class="prefix" (click)="doSearch(search)">
                <mat-icon>search</mat-icon>
            </button>
        </div>

        <div class="input-field">
            <input #search autocomplete="off" type="search" [placeholder]="searchLabel" [(ngModel)]="searchQuery" name="search" (keyup.esc)="resetSearch(search)" (keyup)="onKey(search, $event)" (click)="setFocus()" (focus)="toggleMenu()" />
        </div>

        <!-- switch button: on some focus we need a close button for the simple -->
        <div>
            <button class="suffix" *ngIf="focusOnSimple === 'active'" (click)="resetSearch(search)">
                <mat-icon>close</mat-icon>
            </button>
            <button class="suffix" *ngIf="focusOnSimple === 'inactive'"></button>
        </div>

        <!-- "dropdown" menu for simple search -->
        <div class="kui-menu simple-search" [@fulltextSearchMenu]="focusOnSimple" *ngIf="showSimpleSearch">
            <mat-list class="kui-previous-search-list">
                <mat-list-item *ngFor="let item of prevSearch | kuiReverse; let i=index">
                    <h4 mat-line *ngIf="i<10" (click)="doPrevSearch(item)">{{item}}</h4>
                    <button mat-icon-button (click)="resetPrevSearch(item)">
                        <mat-icon aria-label="close">close</mat-icon>
                    </button>
                </mat-list-item>
            </mat-list>
            <button mat-stroked-button color="accent" class="right" (click)="resetPrevSearch()" *ngIf="prevSearch">Clear</button>
        </div>

    </div>
</div>`,
                styles: [`input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.full-width{width:100%}.close{right:12px}.hide{display:none}.show{display:block}.search-bar-elements{display:flex;position:relative;z-index:100}.inactive{color:#7a7a7a}.fulltext-search-bar{background-color:#f9f9f9;border-radius:4px;display:inline-flex;height:40px;position:relative;width:680px;z-index:10}.fulltext-search-bar:hover{box-shadow:0 1px 3px rgba(0,0,0,.5)}.fulltext-search-bar div.input-field{flex:1}.fulltext-search-bar div.input-field input{border-style:none;font-size:14pt;height:38px;position:absolute;width:calc(100% - 80px)}.fulltext-search-bar div.input-field input:active,.fulltext-search-bar div.input-field input:focus{outline:0}.fulltext-search-bar div .prefix,.fulltext-search-bar div .suffix{background-color:#fff;border-radius:3px;border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:40px}.fulltext-search-bar div .prefix:active,.fulltext-search-bar div .suffix:active{color:#515151}.fulltext-search-bar div.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-menu{box-shadow:0 3px 5px -1px rgba(11,11,11,.2),0 6px 10px 0 rgba(11,11,11,.14),0 1px 18px 0 rgba(11,11,11,.12);background-color:#f9f9f9;border-radius:4px;position:absolute}.kui-menu.simple-search{min-height:680px;width:680px;padding-top:60px;z-index:-1}.kui-menu.simple-search .kui-previous-search-list .mat-list-item{cursor:pointer}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover{background-color:#f9f9f9}.kui-menu.simple-search .kui-previous-search-list .mat-list-item:hover mat-icon{display:block}.kui-menu.simple-search .kui-previous-search-list .mat-list-item mat-icon{display:none}.kui-menu.simple-search .right{margin-top:12px;margin-left:16px}@media screen and (max-width:1024px){.fulltext-search-bar{width:480px}.fulltext-search-bar div.input-field input{width:calc(480px - 80px)}.kui-menu.simple-search{width:480px}}@media screen and (max-width:768px){.fulltext-search-bar{width:calc(480px - 160px)}.fulltext-search-bar div.input-field input{width:calc(480px - 160px - 80px)}.kui-menu.simple-search{width:calc(480px - 80px)}}`],
                animations: [
                    trigger('fulltextSearchMenu', [
                        state('inactive', style({ display: 'none' })),
                        state('active', style({ display: 'block' })),
                        transition('inactive => active', animate('100ms ease-in')),
                        transition('active => inactive', animate('100ms ease-out'))
                    ])
                ]
            },] },
];
/** @nocollapse */
FulltextSearchComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
FulltextSearchComponent.propDecorators = {
    route: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBb0R6RCxNQUFNLE9BQU8sdUJBQXVCO0lBaUJoQyxZQUFvQixNQUFzQixFQUM5QixPQUFlO1FBRFAsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWhCbEIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUluQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFakMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLGVBQVUsR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUV0RSxrQkFBYSxHQUFXLFVBQVUsQ0FBQztRQUVuQyxnQkFBVyxHQUFXLFFBQVEsQ0FBQztJQUsvQixDQUFDO0lBRUQsUUFBUTtJQUNSLENBQUM7SUFHRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsVUFBdUIsRUFBRSxLQUFLO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxJQUFJLENBQUMsV0FB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QUUsQ0FBQyxrMEVBQWswRSxDQUFDO2dCQUM1MEUsVUFBVSxFQUFFO29CQUNSLE9BQU8sQ0FBQyxvQkFBb0IsRUFDeEI7d0JBQ0ksS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzt3QkFDN0MsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDNUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDMUQsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3FCQUM5RCxDQUNKO2lCQUNKO2FBQ0o7Ozs7WUFuRFEsY0FBYztZQUFFLE1BQU07OztvQkFzRDFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWZ1bGx0ZXh0LXNlYXJjaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VhcmNoLWJhci1lbGVtZW50c1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cImZ1bGx0ZXh0LXNlYXJjaC1iYXJcIiBbY2xhc3MuYWN0aXZlXT1cInNlYXJjaFBhbmVsRm9jdXNcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwcmVmaXhcIiAoY2xpY2spPVwiZG9TZWFyY2goc2VhcmNoKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxuICAgICAgICAgICAgPGlucHV0ICNzZWFyY2ggYXV0b2NvbXBsZXRlPVwib2ZmXCIgdHlwZT1cInNlYXJjaFwiIFtwbGFjZWhvbGRlcl09XCJzZWFyY2hMYWJlbFwiIFsobmdNb2RlbCldPVwic2VhcmNoUXVlcnlcIiBuYW1lPVwic2VhcmNoXCIgKGtleXVwLmVzYyk9XCJyZXNldFNlYXJjaChzZWFyY2gpXCIgKGtleXVwKT1cIm9uS2V5KHNlYXJjaCwgJGV2ZW50KVwiIChjbGljayk9XCJzZXRGb2N1cygpXCIgKGZvY3VzKT1cInRvZ2dsZU1lbnUoKVwiIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gc3dpdGNoIGJ1dHRvbjogb24gc29tZSBmb2N1cyB3ZSBuZWVkIGEgY2xvc2UgYnV0dG9uIGZvciB0aGUgc2ltcGxlIC0tPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1ZmZpeFwiICpuZ0lmPVwiZm9jdXNPblNpbXBsZSA9PT0gJ2FjdGl2ZSdcIiAoY2xpY2spPVwicmVzZXRTZWFyY2goc2VhcmNoKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWZmaXhcIiAqbmdJZj1cImZvY3VzT25TaW1wbGUgPT09ICdpbmFjdGl2ZSdcIj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBcImRyb3Bkb3duXCIgbWVudSBmb3Igc2ltcGxlIHNlYXJjaCAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImt1aS1tZW51IHNpbXBsZS1zZWFyY2hcIiBbQGZ1bGx0ZXh0U2VhcmNoTWVudV09XCJmb2N1c09uU2ltcGxlXCIgKm5nSWY9XCJzaG93U2ltcGxlU2VhcmNoXCI+XG4gICAgICAgICAgICA8bWF0LWxpc3QgY2xhc3M9XCJrdWktcHJldmlvdXMtc2VhcmNoLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBwcmV2U2VhcmNoIHwga3VpUmV2ZXJzZTsgbGV0IGk9aW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IG1hdC1saW5lICpuZ0lmPVwiaTwxMFwiIChjbGljayk9XCJkb1ByZXZTZWFyY2goaXRlbSlcIj57e2l0ZW19fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJyZXNldFByZXZTZWFyY2goaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiY2xvc2VcIj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LWxpc3QtaXRlbT5cbiAgICAgICAgICAgIDwvbWF0LWxpc3Q+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1zdHJva2VkLWJ1dHRvbiBjb2xvcj1cImFjY2VudFwiIGNsYXNzPVwicmlnaHRcIiAoY2xpY2spPVwicmVzZXRQcmV2U2VhcmNoKClcIiAqbmdJZj1cInByZXZTZWFyY2hcIj5DbGVhcjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbixpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9ue2Rpc3BsYXk6bm9uZX1pbnB1dFt0eXBlPXNlYXJjaF17LW1vei1hcHBlYXJhbmNlOm5vbmU7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9LmZ1bGwtd2lkdGh7d2lkdGg6MTAwJX0uY2xvc2V7cmlnaHQ6MTJweH0uaGlkZXtkaXNwbGF5Om5vbmV9LnNob3d7ZGlzcGxheTpibG9ja30uc2VhcmNoLWJhci1lbGVtZW50c3tkaXNwbGF5OmZsZXg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxMDB9LmluYWN0aXZle2NvbG9yOiM3YTdhN2F9LmZ1bGx0ZXh0LXNlYXJjaC1iYXJ7YmFja2dyb3VuZC1jb2xvcjojZjlmOWY5O2JvcmRlci1yYWRpdXM6NHB4O2Rpc3BsYXk6aW5saW5lLWZsZXg7aGVpZ2h0OjQwcHg7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6NjgwcHg7ei1pbmRleDoxMH0uZnVsbHRleHQtc2VhcmNoLWJhcjpob3Zlcntib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC41KX0uZnVsbHRleHQtc2VhcmNoLWJhciBkaXYuaW5wdXQtZmllbGR7ZmxleDoxfS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dHtib3JkZXItc3R5bGU6bm9uZTtmb250LXNpemU6MTRwdDtoZWlnaHQ6MzhweDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDpjYWxjKDEwMCUgLSA4MHB4KX0uZnVsbHRleHQtc2VhcmNoLWJhciBkaXYuaW5wdXQtZmllbGQgaW5wdXQ6YWN0aXZlLC5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9LmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2IC5wcmVmaXgsLmZ1bGx0ZXh0LXNlYXJjaC1iYXIgZGl2IC5zdWZmaXh7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6M3B4O2JvcmRlci1zdHlsZTpub25lO2NvbG9yOnJnYmEoNDEsNDEsNDEsLjQpO2N1cnNvcjpwb2ludGVyO2hlaWdodDozOHB4O291dGxpbmU6MDtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo0MHB4fS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdiAucHJlZml4OmFjdGl2ZSwuZnVsbHRleHQtc2VhcmNoLWJhciBkaXYgLnN1ZmZpeDphY3RpdmV7Y29sb3I6IzUxNTE1MX0uZnVsbHRleHQtc2VhcmNoLWJhciBkaXYuYWN0aXZle2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjUpfS5rdWktbWVudXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMTEsMTEsMTEsLjIpLDAgNnB4IDEwcHggMCByZ2JhKDExLDExLDExLC4xNCksMCAxcHggMThweCAwIHJnYmEoMTEsMTEsMTEsLjEyKTtiYWNrZ3JvdW5kLWNvbG9yOiNmOWY5Zjk7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGV9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2h7bWluLWhlaWdodDo2ODBweDt3aWR0aDo2ODBweDtwYWRkaW5nLXRvcDo2MHB4O3otaW5kZXg6LTF9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2ggLmt1aS1wcmV2aW91cy1zZWFyY2gtbGlzdCAubWF0LWxpc3QtaXRlbXtjdXJzb3I6cG9pbnRlcn0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaCAua3VpLXByZXZpb3VzLXNlYXJjaC1saXN0IC5tYXQtbGlzdC1pdGVtOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOX0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaCAua3VpLXByZXZpb3VzLXNlYXJjaC1saXN0IC5tYXQtbGlzdC1pdGVtOmhvdmVyIG1hdC1pY29ue2Rpc3BsYXk6YmxvY2t9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2ggLmt1aS1wcmV2aW91cy1zZWFyY2gtbGlzdCAubWF0LWxpc3QtaXRlbSBtYXQtaWNvbntkaXNwbGF5Om5vbmV9Lmt1aS1tZW51LnNpbXBsZS1zZWFyY2ggLnJpZ2h0e21hcmdpbi10b3A6MTJweDttYXJnaW4tbGVmdDoxNnB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MTAyNHB4KXsuZnVsbHRleHQtc2VhcmNoLWJhcnt3aWR0aDo0ODBweH0uZnVsbHRleHQtc2VhcmNoLWJhciBkaXYuaW5wdXQtZmllbGQgaW5wdXR7d2lkdGg6Y2FsYyg0ODBweCAtIDgwcHgpfS5rdWktbWVudS5zaW1wbGUtc2VhcmNoe3dpZHRoOjQ4MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2OHB4KXsuZnVsbHRleHQtc2VhcmNoLWJhcnt3aWR0aDpjYWxjKDQ4MHB4IC0gMTYwcHgpfS5mdWxsdGV4dC1zZWFyY2gtYmFyIGRpdi5pbnB1dC1maWVsZCBpbnB1dHt3aWR0aDpjYWxjKDQ4MHB4IC0gMTYwcHggLSA4MHB4KX0ua3VpLW1lbnUuc2ltcGxlLXNlYXJjaHt3aWR0aDpjYWxjKDQ4MHB4IC0gODBweCl9fWBdLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZnVsbHRleHRTZWFyY2hNZW51JyxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBzdGF0ZSgnaW5hY3RpdmUnLCBzdHlsZSh7IGRpc3BsYXk6ICdub25lJyB9KSksXG4gICAgICAgICAgICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHsgZGlzcGxheTogJ2Jsb2NrJyB9KSksXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgYW5pbWF0ZSgnMTAwbXMgZWFzZS1pbicpKSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gaW5hY3RpdmUnLCBhbmltYXRlKCcxMDBtcyBlYXNlLW91dCcpKVxuICAgICAgICAgICAgXVxuICAgICAgICApXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGdWxsdGV4dFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJy9zZWFyY2gnO1xuXG4gICAgc2VhcmNoUXVlcnk6IHN0cmluZztcblxuICAgIHNob3dTaW1wbGVTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgc2VhcmNoUGFuZWxGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldlNlYXJjaDogc3RyaW5nW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuXG4gICAgZm9jdXNPblNpbXBsZTogc3RyaW5nID0gJ2luYWN0aXZlJztcblxuICAgIHNlYXJjaExhYmVsOiBzdHJpbmcgPSAnU2VhcmNoJztcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIERvIHNlYXJjaCBvbiBFbnRlciBjbGljaywgcmVzZXQgc2VhcmNoIG9uIEVzY2FwZVxuICAgICAqIEBwYXJhbSBzZWFyY2hfZWxlXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIG9uS2V5KHNlYXJjaF9lbGU6IEhUTUxFbGVtZW50LCBldmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzT25TaW1wbGUgPSAnYWN0aXZlJztcbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgJiYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC53aGljaCA9PT0gMTMpKSB7XG4gICAgICAgICAgICB0aGlzLmRvU2VhcmNoKHNlYXJjaF9lbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LndoaWNoID09PSAyNykge1xuICAgICAgICAgICAgdGhpcy5yZXNldFNlYXJjaChzZWFyY2hfZWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVhbGlzZSBhIHNpbXBsZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWFyY2hfZWxlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGRvU2VhcmNoKHNlYXJjaF9lbGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWFyY2hRdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5XSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zZWFyY2gvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnldLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuXG4gICAgICAgICAgICAvLyBwdXNoIHRoZSBzZWFyY2ggcXVlcnkgaW50byB0aGUgbG9jYWwgc3RvcmFnZSBwcmV2U2VhcmNoIGFycmF5IChwcmV2aW91cyBzZWFyY2gpXG4gICAgICAgICAgICAvLyB0byBoYXZlIGEgbGlzdCBvZiByZWNlbnQgc2VhcmNoIHJlcXVlc3RzXG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdQcmV2U2VhcmNoOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQcmV2U2VhcmNoID09PSBudWxsKSB7IGV4aXN0aW5nUHJldlNlYXJjaCA9IFtdOyB9XG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZXhpc3RpbmdQcmV2U2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVudHJ5LCBpZiBleGlzdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ID09PSBlbnRyeSkgeyBleGlzdGluZ1ByZXZTZWFyY2guc3BsaWNlKGksIDEpOyB9XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnB1c2godGhpcy5zZWFyY2hRdWVyeSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJldlNlYXJjaCcsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nUHJldlNlYXJjaCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoX2VsZS5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWFyY2hfZWxlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlc2V0U2VhcmNoKHNlYXJjaF9lbGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBudWxsO1xuICAgICAgICBzZWFyY2hfZWxlLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNPblNpbXBsZSA9ICdpbmFjdGl2ZSc7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFuZWxGb2N1cyA9ICF0aGlzLnNlYXJjaFBhbmVsRm9jdXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoIGFjY29yZGluZyB0byB0aGUgZm9jdXMgYmV0d2VlbiBzaW1wbGUgb3IgZXh0ZW5kZWQgc2VhcmNoXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAyIGNhc2VzOiBzaW1wbGVTZWFyY2ggb3IgZXh0ZW5kZWRTZWFyY2hcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgdG9nZ2xlTWVudSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgdGhpcy5mb2N1c09uU2ltcGxlID0gKHRoaXMuZm9jdXNPblNpbXBsZSA9PT0gJ2FjdGl2ZScgPyAnaW5hY3RpdmUnIDogJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnNob3dTaW1wbGVTZWFyY2ggPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBzaW1wbGUgZm9jdXMgdG8gYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgc2V0Rm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldlNlYXJjaCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG4gICAgICAgIHRoaXMuZm9jdXNPblNpbXBsZSA9ICdhY3RpdmUnO1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSAhdGhpcy5zZWFyY2hQYW5lbEZvY3VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWxpc2UgYSBwcmV2aW91cyBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZG9QcmV2U2VhcmNoKHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyBxdWVyeV0sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG4gICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHByZXZpb3VzIHNlYXJjaGVzIC0gdGhlIHdob2xlIHByZXZpb3VzIHNlYXJjaCBvciBzcGVjaWZpYyBpdGVtIGJ5IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0ZXJtIG9mIHRoZSBzZWFyY2hcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcmVzZXRQcmV2U2VhcmNoKG5hbWU6IHN0cmluZyA9IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSBvbmx5IHRoaXMgaXRlbSB3aXRoIHRoZSBuYW1lIC4uLlxuICAgICAgICAgICAgY29uc3QgaTogbnVtYmVyID0gdGhpcy5wcmV2U2VhcmNoLmluZGV4T2YobmFtZSk7XG4gICAgICAgICAgICB0aGlzLnByZXZTZWFyY2guc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXZTZWFyY2gnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByZXZTZWFyY2gpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgd2hvbGUgXCJwcmV2aW91cyBzZWFyY2hcIiBhcnJheVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ByZXZTZWFyY2gnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuXG4gICAgfVxufVxuIl19