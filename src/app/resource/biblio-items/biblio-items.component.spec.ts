import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';

import { BiblioItemsComponent } from './biblio-items.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { AppInitService } from '../../app-init.service';

describe('BiblioItemsComponent', () => {
    let component: BiblioItemsComponent;
    let fixture: ComponentFixture<BiblioItemsComponent>;

    let appInitService: AppInitService;

    const id = 'http://rdfh.ch/0802/eJ-JOOfoS4yvACkcTgZDfw';

    beforeEach(async(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

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
                    useValue: {
                        paramMap: of({
                            get: () => {
                                return id;
                            }
                        })
                    }
                },
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig },
                { provide: AppInitService, useValue: appInitServiceSpy }
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ ontologyIRI: 'http://0.0.0.0:3333' });

        appInitService = TestBed.inject(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BiblioItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
    });
});
