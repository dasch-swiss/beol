import { Component, OnInit } from '@angular/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _beol: BeolService
    ) {
    }

    ngOnInit() {
    }

    searchForManuscriptEntries(manuscriptIri: string) {

        const gravsearch = this._beol.getEntriesForManuscript(manuscriptIri);

        this._router.navigate(['/search/extended/', gravsearch], { relativeTo: this._route });
    }

}
