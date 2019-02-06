import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeolService } from '../services/beol.service';
import { ReadResourcesSequence, SearchService } from '@knora/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-leoo-route',
    templateUrl: './leoo-route.component.html',
    styleUrls: ['./leoo-route.component.scss']
})
export class LeooRouteComponent implements OnInit {

    repertoriumNumber: string;

    apiUrl = environment.externalApiURL;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _beolService: BeolService,
        private _searchService: SearchService) {
    }

    ngOnInit() {
        this._route.paramMap.subscribe((params: ParamMap) => {

            this.repertoriumNumber = params.get('rn');

            if (this.repertoriumNumber !== null) {

                // create a query that gets the Iri of the LEOO letter
                const query = this._beolService.searchForLetterFromLEOO(this.repertoriumNumber);

                this._searchService.doExtendedSearchReadResourceSequence(query).subscribe(
                    (resourceSeq: ReadResourcesSequence) => {

                        if (resourceSeq.numberOfResources === 1) {

                            const letterIri: string = resourceSeq.resources[0].id;

                            // given the Iri of the letter, display the whole resource
                            this._beolService.routeByResourceType(this.apiUrl + '/ontology/0801/beol/v2#letter', letterIri);
                        } else {
                            // letter not found
                            console.log(`letter with repertorium number ${this.repertoriumNumber} not found`);
                        }

                    }, function (err) {
                        console.log('search failed ' + err);
                    }
                );
            }
        });
    }
}
