import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { MathJaxDirective } from '../directives/mathjax.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ReadListValueComponent } from '../properties/read-list-value/read-list-value.component';
import { AppInitService } from '../app-init.service';

/*
describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    let appInitService: AppInitService;

    const mode = 'extended';
    const q = 'test';

    let mockSearchParamService;
    let searchServiceSpy: jasmine.SpyObj<SearchService>; // see https://angular.io/guide/testing#angular-testbed

    beforeEach(async(() => {

        mockSearchParamService = new MockSearchParamsService();
        const spySearchService =
            jasmine.createSpyObj('SearchService', ['doExtendedSearchCountQueryCountQueryResult', 'doExtendedSearchReadResourceSequence']);

        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

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
                ReadListValueComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (param: string) => {
                                if (param === 'q') {
                                    return q;
                                } else {
                                    return mode;
                                }
                            }
                        })
                    }
                },
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig },
                { provide: SearchParamsService, useValue: mockSearchParamService },
                { provide: SearchService, useValue: spySearchService },
                { provide: AppInitService, useValue: appInitServiceSpy }
            ]
        })
            .compileComponents();

        searchServiceSpy = TestBed.inject(SearchService);

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

        appInitServiceSpy.getSettings.and.returnValue({ ontologyIRI: 'http://0.0.0.0:3333', pagingLimit: 25 });

        appInitService = TestBed.inject(AppInitService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
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



}*/
