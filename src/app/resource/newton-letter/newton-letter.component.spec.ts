import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material-module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NewtonLetterComponent } from './newton-letter.component';
import { ReadTextValueAsHtmlComponent } from '../../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadListValueComponent } from '../../properties/read-list-value/read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { ReadTextValueComponent } from '../../properties/read-text-value/read-text-value.component';
import { NewtonProjectDirective } from '../../directives/newton-project.directive';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';
import { AppInitService } from '../../app-init.service';

/*
describe('NewtonLetterComponent', () => {
    let component: NewtonLetterComponent;
    let fixture: ComponentFixture<NewtonLetterComponent>;

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
                NewtonLetterComponent,
                MathJaxDirective,
                ReadTextValueAsHtmlComponent,
                ReadListValueComponent,
                ReadTextValueComponent,
                NewtonProjectDirective,
                SanitizeHtmlPipe
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

        appInitService = TestBed.inject(AppInitService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewtonLetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(appInitService.getSettings).toHaveBeenCalled();
    });
});*/
