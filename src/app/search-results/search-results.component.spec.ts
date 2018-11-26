import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MaterialModule } from '../material-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchResultsComponent } from './search-results.component';
import { KuiActionModule } from '@knora/action';
import { ReadDateValueComponent } from '../properties/read-date-value/read-date-value.component';
import { ExtendedSearchParams, KuiCoreConfig, SearchParamsService } from '@knora/core';

import { MathJaxDirective } from '../directives/mathjax.directive';
import { MatExpansionModule, MatIconModule } from '@angular/material';


describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    const mode = 'extended';
    const q = 'test';

    let mockSearchParamService;

    beforeEach(async(() => {

        mockSearchParamService = new MockSearchParamsService();

        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                MatIconModule,
                MatExpansionModule
            ],
            declarations: [
                SearchResultsComponent,
                MathJaxDirective,
                ReadDateValueComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ mode, q }) }
                },
                { provide: 'config', useValue: KuiCoreConfig },
                { provide: SearchParamsService, useValue: mockSearchParamService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have subscribed to SearchParamService', () => {
        expect(component.extendedSearchParamsSubscription.closed).toBeFalsy();
    });

    it('should have unsubscribed from SearchParamService after component destruction', () => {
        component.ngOnDestroy();

        fixture.detectChanges();

        expect(component.extendedSearchParamsSubscription.closed).toBeTruthy();
    });
});

class MockSearchParamsService {

    public currentSearchParams: Observable<any>;

    constructor() {
        this.currentSearchParams = new BehaviorSubject<any>(1).asObservable();
    }


}
