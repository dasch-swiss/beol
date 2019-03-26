import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuscriptEntryComponent } from './manuscript-entry.component';
import { AppInitService } from '../../app-init.service';
import { KuiActionModule } from '@knora/action';
import { KuiViewerModule } from '@knora/viewer';
import { MaterialModule } from '../../material-module';
import { RouterTestingModule } from '@angular/router/testing';
import { KuiCoreConfig, KuiCoreConfigToken, OntologyCacheService } from '@knora/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';

describe('ManuscriptEntryComponent', () => {
    let component: ManuscriptEntryComponent;
    let fixture: ComponentFixture<ManuscriptEntryComponent>;

    let appInitService: AppInitService;

    const id = 'http://rdfh.ch/0801/7ZvL2A5PQ9C4eAmr-n26gw';

    beforeEach(async(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                MaterialModule,
                RouterTestingModule
            ],
            declarations: [
                ManuscriptEntryComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadTextValueComponent
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
                {provide: KuiCoreConfigToken, useValue: KuiCoreConfig},
                {provide: AppInitService, useValue: appInitServiceSpy}
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManuscriptEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
