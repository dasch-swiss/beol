import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonComponent } from './person.component';
import { GndDirective, ProgressIndicatorComponent } from '@knora/action';
import { of } from 'rxjs';
import { KuiCoreConfig } from '@knora/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  const id = 'http://rdfh.ch/0802/shubb5TjTnu84MqkM6uHlA'; // Christian Goldbach id

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        PersonComponent,
        ProgressIndicatorComponent,
        GndDirective,
        ReadTextValueAsHtmlComponent,
        MathJaxDirective
      ],
      providers: [
        { provide: Location },
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
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
