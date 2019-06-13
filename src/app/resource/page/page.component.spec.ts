import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { KuiCoreConfig, KuiCoreConfigToken, OntologyCacheService } from '@knora/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatIconModule, MatListModule } from '@angular/material';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { AppInitService } from '../../app-init.service';

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    let appInitService: AppInitService;

    const id = 'http://rdfh.ch/0801/gggg';

    beforeEach(async(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            declarations: [
                PageComponent,
                ReadTextValueAsHtmlComponent,
                ReadTextValueComponent,
                MathJaxDirective
            ],
            imports: [KuiViewerModule, RouterTestingModule, HttpClientModule, MatListModule, MatIconModule],
            providers: [
                OntologyCacheService,
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

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
    });
});
