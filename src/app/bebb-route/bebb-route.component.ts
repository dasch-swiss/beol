import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeolService } from '../services/beol.service';
import { ReadResourcesSequence, SearchService } from '@knora/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-leoo-route',
    templateUrl: './bebb-route.component.html',
    styleUrls: ['./leoo-route.component.scss']
})
export class BebbRouteComponent implements OnInit {

    bebbLettertitle: string;
    notFound: boolean;

    apiUrl = environment.externalApiURL;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _beolService: BeolService,
        private _searchService: SearchService) {
    }

    ngOnInit() {
        this._route.paramMap.subscribe((params: ParamMap) => {

            this.bebbLettertitle = params.get('lt');

            if (this.bebbLettertitle !== null) {

                // create a query that gets the Iri of the LEOO letter
                const query = this._beolService.searchForLetterFromBEBB(this.bebbLettertitle);

                this._searchService.doExtendedSearchReadResourceSequence(query).subscribe(
                    (resourceSeq: ReadResourcesSequence) => {

                        if (resourceSeq.numberOfResources === 1) {

                            const letterIri: string = resourceSeq.resources[0].id;

                            // given the Iri of the letter, display the whole resource
                            this._beolService.routeByResourceType(this.apiUrl + '/ontology/0801/beol/v2#letter', letterIri);
                        } else {
                            // letter not found
                            this.notFound = true;
                            console.log(`letter with title ${this.bebbLettertitle} not found`);
                        }

                    }, (err) => {
                        this.notFound = true;
                        console.log('search failed ' + err);
                    }
                );
            }
        });
    }
}
