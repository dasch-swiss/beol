import { Component } from '@angular/core';
import { SearchParams } from '@dasch-swiss/dsp-ui';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    searchParams: SearchParams;

    constructor(
        private _router: Router) { }

    /**
     * Perform the full text search
     * @param search
     */
    doSearch(search: SearchParams) {
        // reset search params
        this.searchParams = undefined;

        this.searchParams = search;

        this._router.navigate(['/search/' + this.searchParams.mode + '/' + encodeURIComponent(this.searchParams.query)]);
    }
}
