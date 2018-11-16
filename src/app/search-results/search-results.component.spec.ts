import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../material-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchResultsComponent } from './search-results.component';
import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig } from '@knora/core';
import { KuiViewerModule } from '@knora/viewer';

import { MathJaxDirective } from '../directives/mathjax.directive';


describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    const mode = 'fulltext';
    const q = 'haus';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                RouterTestingModule,
                MaterialModule,
                InfiniteScrollModule,
                HttpClientModule,
                HttpClientTestingModule],
            declarations: [
                SearchResultsComponent,
                MathJaxDirective,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ mode, q }) }
                },
                { provide: 'config', useValue: KuiCoreConfig }
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
