import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { KuiActionModule } from '@knora/action';

import {
    ApiServiceResult,
    ExtendedSearchParams,
    KuiCoreConfig,
    OntologyCacheService, OntologyInformation, Properties, ResourceClasses,
    SearchParamsService,
    SearchService
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
    let ontoCacheSpy: jasmine.SpyObj<OntologyCacheService>;

    beforeEach(async(() => {

        mockSearchParamService = new MockSearchParamsService();
        const spySearchService = jasmine.createSpyObj('SearchService', ['doExtendedSearchCountQuery', 'doExtendedSearch']);
        const spyOntoCache = jasmine.createSpyObj('OntologyCacheService', ['getResourceClassDefinitions']);

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
                { provide: OntologyCacheService, useValue: spyOntoCache }
            ]
        })
            .compileComponents();

        searchServiceSpy = TestBed.get(SearchService);

        searchServiceSpy.doExtendedSearchCountQuery.and.callFake((gravsearch: string) => {

                const result = new ApiServiceResult();
                result.status = 200;
                result.statusText = '';
                result.url = '';
                result.body = require('../test-data/search-results/search-response-letters-count.json'); // mock response

                return of(
                    result
                );
            }
        );

        searchServiceSpy.doExtendedSearch.and.callFake((gravsearch: string) => {

            const result = new ApiServiceResult();
            result.status = 200;
            result.statusText = '';
            result.url = '';
            result.body = require('../test-data/search-results/search-response-letters.json'); // mock response

            return of(
                result
            );
        });

        ontoCacheSpy = TestBed.get(OntologyCacheService);

        ontoCacheSpy.getResourceClassDefinitions.and.callFake(() => {
            const resClasses: ResourceClasses = require('../test-data/search-results/ontology-info-resource-classes.json');
            const properties: Properties = require('../test-data/search-results/ontology-info-properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            return of(
                ontoInfo
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

    it('should perform a count query',() => {
        expect(searchServiceSpy.doExtendedSearchCountQuery).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearchCountQuery).toHaveBeenCalledWith('testquery0');

        // TODO: check for template status once JSON-LD processing is handled by SearchService, https://github.com/dhlab-basel/Knora-ui/issues/136

    });

    it('should perform a gravsearch query', () => {
        expect(searchServiceSpy.doExtendedSearch).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearch).toHaveBeenCalledWith('testquery0');

        // TODO: check for template status once JSON-LD processing is handled by SearchService, https://github.com/dhlab-basel/Knora-ui/issues/136

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
