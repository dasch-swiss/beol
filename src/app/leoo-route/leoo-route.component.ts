import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BeolService } from '../services/beol.service';
import { ApiServiceResult, ConvertJSONLD, SearchService, ReadResourcesSequence } from '@knora/core';
import {AppConfig} from '../app.config';

declare let require: any;
let jsonld = require('jsonld');

@Component({
  selector: 'app-leoo-route',
  templateUrl: './leoo-route.component.html',
  styleUrls: ['./leoo-route.component.scss']
})
export class LeooRouteComponent implements OnInit {

  repertoriumNumber: string;

  apiUrl = AppConfig.settings.apiURL;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _beolService: BeolService,
    private _searchService: SearchService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {

      this.repertoriumNumber = params['rn'];

      if (this.repertoriumNumber !== undefined) {

        // create a query that gets the Iri of the LEOO letter
        const query = this._beolService.searchForLetterFromLEOO(this.repertoriumNumber);

        this._searchService.doExtendedSearch(query).subscribe(
          (result: ApiServiceResult) => {

            const promises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            const promise = promises.compact(result.body, {});

            promise.then((compacted) => {

              const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

              if (resourceSeq.numberOfResources === 1) {

                const letterIri: string = resourceSeq.resources[0].id;

                // given the Iri of the letter, display the whole resource
                this._beolService.routeByResourceType(this.apiUrl + '/ontology/0801/beol/v2#letter', letterIri);
              } else {
                // letter not found
                console.log(`letter with repertorium number ${this.repertoriumNumber} not found`);
              }

            }, function (err) {
              console.log('JSONLD of full resource request could not be expanded:' + err);
            });


          }
        );
      }
    });
  }

}
