import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PublisherComponent } from './publisher.component';
import { KuiActionModule } from '@knora/action';
import { of } from 'rxjs';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';

describe('PublisherComponent', () => {
    let component: PublisherComponent;
    let fixture: ComponentFixture<PublisherComponent>;
    const id = 'http://rdfh.ch/0802/o2zZYlxUTnqPSx3pW0h7nQ'; // Olms Hildesheim id

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiViewerModule,
                MaterialModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                PublisherComponent,
                ReadTextValueAsHtmlComponent,
                ReadTextValueComponent,
                MathJaxDirective
            ],
            providers: [
                {provide: Location},
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({
                            get: () => {
                                return id;
                            }
                        })}
                },
                {provide: KuiCoreConfigToken, useValue: KuiCoreConfig}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublisherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
