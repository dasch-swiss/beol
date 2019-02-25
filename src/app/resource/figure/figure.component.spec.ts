import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { KuiActionModule } from '@knora/action';
import { FigureComponent } from './figure.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { KuiViewerModule } from '@knora/viewer';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';

describe('FigureComponent', () => {
    let component: FigureComponent;
    let fixture: ComponentFixture<FigureComponent>;
    const locationStub = {
        back: jasmine.createSpy('back')
    };

    const id = 'http://rdfh.ch/0801/mmZSMsgqQH6XwE7bI30DJw';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [KuiActionModule, KuiViewerModule, MaterialModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [FigureComponent, ReadTextValueAsHtmlComponent, MathJaxDirective, ReadTextValueComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: () => {
                                return id;
                            }
                        })
                    }
                },
                { provide: Location, useValue: locationStub },
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FigureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
