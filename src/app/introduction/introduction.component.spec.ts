import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material-module';
import { environment } from '../../environments/environment';
import { KuiActionModule } from '@knora/action';
import {
    ApiServiceResult,
    KuiCoreModule,
    OntologyCacheService, OntologyInformation,
    Properties,
    ResourceClasses,
    ResourceService,
    SearchService
} from '@knora/core';
import { KuiSearchModule } from '@knora/search';
import { IntroductionComponent } from './introduction.component';
import { ReadTextValueAsHtmlComponent } from '../properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadListValueComponent } from '../properties/read-list-value/read-list-value.component';
import { of } from 'rxjs';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../app.config';
import { MathJaxDirective } from '../directives/mathjax.directive';

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;
    const project = 'leoo';
    const id = 'goldbach_introduction_1';

    let beolServiceSpy: jasmine.SpyObj<BeolService>; // see https://angular.io/guide/testing#angular-testbed
    let searchServiceSpy: jasmine.SpyObj<SearchService>;
    let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
    let ontoCacheSpy: jasmine.SpyObj<OntologyCacheService>;

    const spyBeolService = jasmine.createSpyObj('BeolService', ['searchForIntroductionById']);
    const spySearchService = jasmine.createSpyObj('SearchService', ['doExtendedSearch']);
    const spyResourceService = jasmine.createSpyObj('ResourceService', ['getResource']);
    const spyOntoCache = jasmine.createSpyObj('OntologyCacheService', ['getResourceClassDefinitions']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                KuiCoreModule.forRoot({
                    name: environment.appName,
                    api: environment.api,
                    media: environment.media,
                    app: environment.app,
                }),
                KuiSearchModule,
                MaterialModule,
                RouterTestingModule
            ],
            declarations: [
                IntroductionComponent,
                ReadTextValueAsHtmlComponent,
                ReadListValueComponent,
                MathJaxDirective
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({
                                get: (param) => {
                                    if (param === 'project') {
                                        return project;
                                    } else {
                                        return id;
                                    }
                                }}
                        )}
                },
                { provide: BeolService, useValue: spyBeolService },
                { provide: SearchService, useValue: spySearchService },
                { provide: ResourceService, useValue: spyResourceService },
                { provide: OntologyCacheService, useValue: spyOntoCache }
            ]
        })
            .compileComponents();

        beolServiceSpy = TestBed.get(BeolService);

        beolServiceSpy.searchForIntroductionById.and.callFake((introid: string) => {

            const introTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX beol: <${this.externalApiURL}/ontology/0801/beol/simple/v2#>

    CONSTRUCT {

        ?introSection knora-api:isMainResource true .

    } WHERE {

        ?introSection a beol:section .
      	?introSection a knora-api:Resource .
        ?introSection beol:beolIDs ?sectionId .

        beol:beolIDs knora-api:objectType xsd:string .
        ?sectionId a xsd:string .

        FILTER(?sectionId = "${introid}")

    }

    OFFSET 0
        `;

            return introTemplate;
        });

        searchServiceSpy = TestBed.get(SearchService);

        searchServiceSpy.doExtendedSearch.and.callFake((gravsearch: string) => {

            const result = new ApiServiceResult();
            result.status = 200;
            result.statusText = '';
            result.url = '';
            result.body = require('../test-data/introduction/gravsearch-result-goldbach_introduction_1.json'); // mock response

            return of(
                result
            );
        });

        resourceServiceSpy = TestBed.get(ResourceService);

        resourceServiceSpy.getResource.and.callFake((resIri) => {

            const result = new ApiServiceResult();
            result.status = 200;
            result.statusText = '';
            result.url = '';
            result.body = require('../test-data/introduction/introduction_1.json'); // mock response

            return of(
                result
            );

        });

        ontoCacheSpy = TestBed.get(OntologyCacheService);

        ontoCacheSpy.getResourceClassDefinitions.and.callFake((resIris) => {
            const resClasses: ResourceClasses = require('../test-data/introduction/resource-classes.json');
            const properties: Properties = require('../test-data/introduction/properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            return of(
                ontoInfo
            );

        });

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(beolServiceSpy.searchForIntroductionById).toHaveBeenCalledTimes(1);

        expect(beolServiceSpy.searchForIntroductionById).toHaveBeenCalledWith('goldbach_introduction_1');

        expect(searchServiceSpy.doExtendedSearch).toHaveBeenCalledTimes(1);

        // TODO: once jsonld handling is done by the service directly, add more tests
    });

});
