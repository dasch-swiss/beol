import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription} from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeolService } from '../services/beol.service';

@Component({
  selector: 'app-bibliography',
  templateUrl: './bibliography.component.html',
  styleUrls: ['./bibliography.component.scss']
})
export class BibliographyComponent implements OnInit, OnDestroy{
    isLoading = true;
    props: any;
    name: string;

    navigationSubscription: Subscription;

    constructor(
        public location: Location,
        private _router: Router,
        private _route: ActivatedRoute,
        private _beol: BeolService
    ) {
        this.isLoading = false;
        this.props = {};
    }

    ngOnInit() {
        this.navigationSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            this.name = params.get('person');
        })
    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }

    searchForManuscriptEntries(manuscriptIri: string) {

        const gravsearch = this._beol.getEntriesForManuscript(manuscriptIri);

        this._router.navigate(['/search/gravsearch/', gravsearch], { relativeTo: this._route });
    }
}
