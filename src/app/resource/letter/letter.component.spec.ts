import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material-module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LetterComponent } from './letter.component';
import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig, KuiCoreConfigToken, OntologyCacheService } from '@knora/core';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadListValueComponent } from '../../properties/read-list-value/read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { HanCatalogueDirective } from '../../directives/han-catalogue.directive';
import { AppInitService } from '../../app-init.service';
import { TeiLinkDirective } from '../../directives/tei-link.directive';

describe('LetterComponent', () => {
    let component: LetterComponent;
    let fixture: ComponentFixture<LetterComponent>;

    let appInitService: AppInitService;

    const id = 'http://rdfh.ch/0801/7ZvL2A5PQ9C4eAmr-n26gw';

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
                LetterComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadListValueComponent,
                ReadTextValueComponent,
                HanCatalogueDirective,
                TeiLinkDirective
            ],
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

        appInitServiceSpy.getSettings.and.returnValue({ ontologyIRI: 'http://0.0.0.0:3333' });

        appInitService = TestBed.get(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
    });
});
