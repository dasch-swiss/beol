import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig } from '@knora/core';

import { BiblioItemsComponent } from './biblio-items.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';

describe('BiblioItemsComponent', () => {
  let component: BiblioItemsComponent;
  let fixture: ComponentFixture<BiblioItemsComponent>;

  const id = 'http://rdfh.ch/0802/eJ-JOOfoS4yvACkcTgZDfw';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KuiActionModule,
        KuiViewerModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        BiblioItemsComponent,
        ReadTextValueAsHtmlComponent,
        MathJaxDirective,
        ReadTextValueComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id }) }
        },
        { provide: 'config', useValue: KuiCoreConfig }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
