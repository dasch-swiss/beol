import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    ApiServiceError,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadPropertyItem,
    ReadResource,
    ReadResourcesSequence,
    ResourceService,
    SearchService
} from '@knora/core';
import { BeolService } from '../services/beol.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AppInitService } from '../app-init.service';

declare let require: any;

export interface IntroProps {
    'title': ReadPropertyItem[];
    'text': ReadPropertyItem[];
}

export interface Introduction {

    name: string;

    label: string;

    children?: Introduction[];
}

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, OnDestroy {

    id: string;
    iri: string;
    project: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    errorMessage;

    KnoraConstants = KnoraConstants;

    listLeoo: Introduction[];
    listLece: Introduction[];
    props: IntroProps;

    // current index of introduction
    curIndex: number;
    curChildIndex: number;

    isLoading = true;

    paramsSubscription: Subscription;

    propIris: any = {
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#sectionHasTitle',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
    };

    constructor(private _route: ActivatedRoute,
                private _http: HttpClient,
                private _router: Router,
                private _searchService: SearchService,
                private _beol: BeolService,
                private _resourceService: ResourceService,
                private _cacheService: OntologyCacheService,
                public location: Location,
                private _appInitService: AppInitService) {
    }

    ngOnInit() {

        const introleoo = require('../../assets/data/introductionLeoo.json');
        const introLece = require('../../assets/data/introductionLece.json');
        this.listLeoo = <Introduction[]> introleoo.Introductions;
        this.listLece = <Introduction[]> introLece.Introductions;

        this.paramsSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            this.project = params.get('project');
            this.id = params.get('id');
            this.searchForIntro(this.id);
        });

    }

    ngOnDestroy() {
        if (this.paramsSubscription !== undefined) {
            this.paramsSubscription.unsubscribe();
        }
    }

    searchForIntro(id: string): void {

        const gravsearch: string = this._beol.searchForIntroductionById(id);

        this._searchService.doExtendedSearchReadResourceSequence(gravsearch).subscribe(
            (result: ReadResourcesSequence) => {

                if (result.resources.length === 1) {
                    // console.log('we got a resource sequence ', resourceSeq.resources);
                    this.requestResource(result.resources[0].id);
                }

            }, (error) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            });
    }

    /**
     * Requests a resource from Knora.
     *
     * @param iri the Iri of the resource to be requested.
     */
    private requestResource(iri: string): void {

        this._resourceService.getReadResource(iri)
            .subscribe(
                (result: ReadResourcesSequence) => {

                    // make sure that exactly one resource is returned
                    if (result.resources.length === 1) {

                        // initialize ontology information
                        this.ontologyInfo = result.ontologyInformation;

                        this.resource = result.resources[0];

                        this.props = {
                            title: [],
                            text: []
                        };

                        for (const key in this.resource.properties) {
                            if (this.resource.properties.hasOwnProperty(key)) {
                                for (const val of this.resource.properties[key]) {
                                    switch (val.propIri) {
                                        case this.propIris.title:
                                            this.props.title.push(val);
                                            break;

                                        case this.propIris.text:
                                            this.props.text.push(val);
                                            break;

                                        default:
                                        // do nothing
                                    }
                                }
                            }
                        }
                    }
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    toggleChildren(index: number) {
        this.curIndex = (index === this.curIndex ? undefined : index);
        // reset grand children
        this.curChildIndex = undefined;
    }

    toggleGrandChildren(index: number) {
        this.curChildIndex = (index === this.curChildIndex ? undefined : index);
    }

}
