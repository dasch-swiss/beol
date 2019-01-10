import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { KuiActionModule } from '@knora/action';

import {
    ConvertJSONLD,
    ExtendedSearchParams,
    KuiCoreConfig,
    OntologyCacheService, OntologyInformation, Properties, ResourceClasses,
    SearchParamsService,
    SearchService,
    CountQueryResult,
} from '@knora/core';
import { KuiViewerModule } from '@knora/viewer';

import { MathJaxDirective } from '../directives/mathjax.directive';
import { MatExpansionModule, MatIconModule } from '@angular/material';


describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    const mode = 'extended';
    const q = 'test';

    let mockSearchParamService;
    let searchServiceSpy: jasmine.SpyObj<SearchService>; // see https://angular.io/guide/testing#angular-testbed

    beforeEach(async(() => {

        mockSearchParamService = new MockSearchParamsService();
        const spySearchService =
            jasmine.createSpyObj('SearchService', ['doExtendedSearchCountQueryCountQueryResult', 'doExtendedSearchReadResourceSequence']);

        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                MatIconModule,
                MatExpansionModule
            ],
            declarations: [
                SearchResultsComponent,
                MathJaxDirective,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({
                            get: (param: string) => {
                                if (param === 'q') {
                                    return q;
                                } else {
                                    return mode;
                                }
                            }
                        })}
                },
                { provide: 'config', useValue: KuiCoreConfig },
                { provide: SearchParamsService, useValue: mockSearchParamService},
                { provide: SearchService, useValue: spySearchService },
            ]
        })
            .compileComponents();

        searchServiceSpy = TestBed.get(SearchService);

        searchServiceSpy.doExtendedSearchCountQueryCountQueryResult.and.callFake((gravsearch: string) => {

                const countQueryRes = new CountQueryResult(197);

                return of(
                    countQueryRes
                );
            }
        );

        searchServiceSpy.doExtendedSearchReadResourceSequence.and.callFake((gravsearch: string) => {

            const letters = require('../test-data/search-results/search-response-letters_expanded.json'); // mock response

            const lettersSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(letters);

            const resClasses: ResourceClasses = require('../test-data/search-results/ontology-info-resource-classes.json');
            const properties: Properties = require('../test-data/search-results/ontology-info-properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            lettersSeq.ontologyInformation.updateOntologyInformation(ontoInfo);

            return of(
                lettersSeq
            );
        });

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform a count query', () => {
        expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledWith('testquery0');

        expect(component.numberOfAllResults).toEqual(197);

    });

    it('should perform a gravsearch query', () => {
        expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledWith('testquery0');

        expect(component.result.length).toEqual(25);

    });


});

class MockSearchParamsService {

    private _currentSearchParams: BehaviorSubject<any>;

    constructor() {
        this._currentSearchParams = new BehaviorSubject<ExtendedSearchParams>(new ExtendedSearchParams((offset: number) => 'testquery' + offset));
    }

    changeSearchParamsMsg(searchParams: ExtendedSearchParams): void {
        this._currentSearchParams.next(searchParams);
    }

    getSearchParams(): ExtendedSearchParams {
        return this._currentSearchParams.getValue();
    }



}
