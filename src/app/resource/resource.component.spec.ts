import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../material-module';
import { ResourceComponent } from './resource.component';
import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';
import { ReadTextValueAsHtmlComponent } from '../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadListValueComponent } from '../properties/read-list-value/read-list-value.component';
import { MathJaxDirective } from '../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';

describe('ResourceComponent', () => {
    let component: ResourceComponent;
    let fixture: ComponentFixture<ResourceComponent>;
    const id = 'http://rdfh.ch/0801/qEy1S5u4Tsurt2wU58J6zw'; // letter nr. 001

    beforeEach(async(() => {
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
                ResourceComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadListValueComponent,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({
                            get: () => {
                                return id;
                            }
                        })}
                },
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
