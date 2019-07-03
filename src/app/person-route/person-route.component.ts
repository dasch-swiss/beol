import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeolService } from '../services/beol.service';
import { ReadResourcesSequence, SearchService } from '@knora/core';
import { AppInitService } from '../app-init.service';

@Component({
    selector: 'app-leoo-route',
    templateUrl: './person-route.component.html',
    styleUrls: ['./person-route.component.scss']
})
export class PersonRouteComponent implements OnInit {

    gndNumber: string;
    notFound: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _beolService: BeolService,
        private _searchService: SearchService,
        private _appInitService: AppInitService) {
    }

    ngOnInit() {
        this._route.paramMap.subscribe((params: ParamMap) => {

            this.gndNumber = params.get('rn');

            if (this.gndNumber !== null) {

                // create a query that gets the Iri of the person
                const query = this._beolService.searchForPerson(this.gndNumber);

                this._searchService.doExtendedSearchReadResourceSequence(query).subscribe(
                    (resourceSeq: ReadResourcesSequence) => {

                        if (resourceSeq.numberOfResources === 1) {

                            const personIri: string = resourceSeq.resources[0].id;

                            // given the Iri of the letter, display the whole resource
                            this._beolService.routeByResourceType(this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#person', personIri);
                        } else {
                            // letter not found
                            console.log(`person with gnd number ${this.gndNumber} not found`);
                            this.notFound = true;
                        }

                    }, (err) => {
                        console.log('search failed ' + err);
                        this.notFound = true;
                    }
                );
            }
        });
    }
}
