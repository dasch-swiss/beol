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
import { AppInitService } from '../../app-init.service';

describe('FigureComponent', () => {
    let component: FigureComponent;
    let fixture: ComponentFixture<FigureComponent>;
    const locationStub = {
        back: jasmine.createSpy('back')
    };

    let appInitService: AppInitService;

    const id = 'http://rdfh.ch/0801/mmZSMsgqQH6XwE7bI30DJw';

    beforeEach(async(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

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
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig },
                { provide: AppInitService, useValue: appInitServiceSpy }
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ ontologyIRI: 'http://0.0.0.0:3333' });

        appInitService = TestBed.inject(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FigureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
    });
});
