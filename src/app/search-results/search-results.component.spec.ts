import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { KuiActionModule } from '@knora/action';

import { KuiCoreConfig, SearchParamsService } from '@knora/core';
import { KuiViewerModule } from '@knora/viewer';

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

});

class MockSearchParamsService {

    public currentSearchParams: Observable<any>;

    constructor() {
        this.currentSearchParams = new BehaviorSubject<any>(1);
    }


}
