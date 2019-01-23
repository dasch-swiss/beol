import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material-module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NewtonLetterComponent } from './newton-letter.component';
import { KuiActionModule } from '@knora/action';
import { KuiCoreConfig, OntologyCacheService } from '@knora/core';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadListValueComponent } from '../../properties/read-list-value/read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { KuiViewerModule } from '@knora/viewer';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { HanCatalogueDirective } from '../../directives/han-catalogue.directive';
import { NewtonProjectDirective } from '../../directives/newton-project.directive';

describe('NewtonLetterComponent', () => {
    let component: NewtonLetterComponent;
    let fixture: ComponentFixture<NewtonLetterComponent>;
    const id = 'http://rdfh.ch/0801/7ZvL2A5PQ9C4eAmr-n26gw';

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
                NewtonLetterComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadListValueComponent,
                ReadTextValueComponent,
                HanCatalogueDirective,
                NewtonProjectDirective
            ],
            providers: [
                OntologyCacheService,
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({
                            get: () => {
                                return id;
                            }
                        })}
                },
                {provide: 'config', useValue: KuiCoreConfig}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewtonLetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
