import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionComponent } from './transcription.component';
import { KuiViewerModule } from '@knora/viewer';
import { KuiActionModule } from '@knora/action';
import { MaterialModule } from '../../material-module';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiCoreConfig, KuiCoreConfigToken, OntologyCacheService } from '@knora/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TranscriptionComponent', () => {
    let component: TranscriptionComponent;
    let fixture: ComponentFixture<TranscriptionComponent>;
    const id = 'http://rdfh.ch/0801/7ZvL2A5PQ9C4eAmr-n26gw';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                MaterialModule,
                RouterTestingModule
            ],
            declarations: [
                TranscriptionComponent,
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
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TranscriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
