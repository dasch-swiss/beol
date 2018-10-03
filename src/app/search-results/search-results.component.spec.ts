import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../material-module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchResultsComponent } from './search-results.component';
import { KeyPipe, MathJaxDirective } from '@knora/action';
import { ReadDateValueComponent } from '../properties/read-date-value/read-date-value.component';
import { KuiCoreConfig } from '@knora/core';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  const mode = 'fulltext';
  const q = 'haus';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        InfiniteScrollModule,
        HttpClientModule,
        HttpClientTestingModule],
      declarations: [
        SearchResultsComponent,
        KeyPipe,
        MathJaxDirective,
        ReadDateValueComponent
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
