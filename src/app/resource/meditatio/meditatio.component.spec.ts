import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditatioComponent } from './meditatio.component';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { KuiCoreConfig, OntologyCacheService } from '@knora/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material';

describe('MeditatioComponent', () => {
    let component: MeditatioComponent;
    let fixture: ComponentFixture<MeditatioComponent>;
    const id = 'http://rdfh.ch/0801/gggg';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MeditatioComponent,
                ReadTextValueAsHtmlComponent,
                MathJaxDirective
            ],
            imports: [KuiViewerModule, RouterTestingModule, HttpClientModule, MatListModule],
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
                {provide: 'config', useValue: KuiCoreConfig}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeditatioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
