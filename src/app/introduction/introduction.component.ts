import { Component, OnInit } from '@angular/core';
import { ApiServiceResult, ConvertJSONLD, ReadResourcesSequence, SearchService } from '@knora/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params } from '@angular/router';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    id: string;
    project: string;

    constructor(private _route: ActivatedRoute,
        private _searchService: SearchService,
        private _beol: BeolService) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.project = params['project'];
            // console.log('project', this.project);
            this.id = params['id'];
            // console.log('id ', this.id);
        });
    }

    searchForBook(isbn: string, id: string) {

        const gravsearch: string = this._beol.searchForBook(isbn, id);

        this._searchService.doExtendedSearch(gravsearch).subscribe(
            (result: ApiServiceResult) => {

                const promises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                const promise = promises.compact(result.body, {});

                promise.then((compacted) => {

                    const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    if (resourceSeq.resources.length === 1) {

                        console.log('we got a resource');

                        // const config: MatDialogConfig = ObjectDialogComponent.createConfiguration(resourceSeq.resources[0].id);

                        // this.dialog.open(ObjectDialogComponent, config);

                    }

                }, function (err) {

                    console.log('JSONLD of full resource request could not be expanded:' + err);
                });

            }
        );

    }

}
