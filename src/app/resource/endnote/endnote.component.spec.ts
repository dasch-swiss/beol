import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig } from '@knora/core';

import { EndnoteComponent } from './endnote.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadLinkValueComponent } from '../../properties/read-link-value/read-link-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';


describe('EndnoteComponent', () => {
  let component: EndnoteComponent;
  let fixture: ComponentFixture<EndnoteComponent>;

  const locationStub = {
    back: jasmine.createSpy('back')
  };

  const id = 'http://rdfh.ch/0801/-cPynqayQI2hJZ1K7aRWMA';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KuiActionModule,
        MaterialModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        EndnoteComponent,
        ReadTextValueAsHtmlComponent,
        ReadLinkValueComponent,
        MathJaxDirective
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id }) }
        },
        { provide: 'config', useValue: KuiCoreConfig },
        { provide: Location, useValue: locationStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
