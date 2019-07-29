import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeolService } from '../services/beol.service';
import { ReadResourcesSequence, SearchService } from '@knora/core';
import { AppInitService } from '../app-init.service';

@Component({
    selector: 'app-person-route',
    templateUrl: './person-route.component.html',
    styleUrls: ['./person-route.component.scss']
})
export class PersonRouteComponent implements OnInit {
    notFound: boolean;
    multipleFound: boolean;
    param: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _beolService: BeolService,
        private _searchService: SearchService,
        private _appInitService: AppInitService) {
    }

    ngOnInit() {
        this._route.paramMap.subscribe((params: ParamMap) => {
            this.param = params.get('gnd');
            if (this.param !== null) {
                // create a query that gets the Iri of the person
                const query = this._beolService.searchForPerson(this.param);
                this._searchService.doExtendedSearchReadResourceSequence(query).subscribe(
                    (resourceSeq: ReadResourcesSequence) => {

                        if (resourceSeq.numberOfResources === 1) {

                            const personIri: string = resourceSeq.resources[0].id;
                            // given the Iri of the person, display the whole resource
                            this._beolService.routeByResourceType(this._appInitService.getSettings().ontologyIRI +
                                '/ontology/0801/beol/v2#person', personIri);
                        } else if (resourceSeq.numberOfResources > 1) {
                            console.log(`more than one entry found for the given ${this.param}`);
                            this.multipleFound = true;
                            for (let it = 0; it < resourceSeq.resources.length; it++ ) {
                                const personIri: string = resourceSeq.resources[it].id;
                                // given the Iri of the person, display the whole resource
                                this._beolService.routeByResourceType(this._appInitService.getSettings().ontologyIRI +
                                    '/ontology/0801/beol/v2#person', personIri);
                            }
                        } else {
                                // person not found
                                console.log(`person with given ${this.param} not found`);
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
