import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PersonRouteComponent } from './person-route.component';
import { of } from 'rxjs';
import { KuiCoreConfig, ReadResource, ReadResourcesSequence, SearchService } from '@knora/core';
import { BeolService } from '../services/beol.service';
import { AppInitService } from '../app-init.service';

describe('PersonRouteComponent', () => {
    let component: PersonRouteComponent;
    let fixture: ComponentFixture<PersonRouteComponent>;
    const gnd = '118531379';

    let beolService: BeolService;
    let searchService: SearchService;
    let appInitService: AppInitService;

    beforeEach(async(() => {

        const beolServiceSpy = jasmine.createSpyObj('BeolService', ['searchForPerson', 'routeByResourceType']); // see https://angular.io/guide/testing#angular-testbed
        const searchServiceSpy = jasmine.createSpyObj('SearchService', ['doExtendedSearchReadResourceSequence']);
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [PersonRouteComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: () => {
                                return gnd;
                            }
                        })
                    }
                },
                { provide: 'config', useValue: KuiCoreConfig },
                { provide: BeolService, useValue: beolServiceSpy },
                { provide: SearchService, useValue: searchServiceSpy },
                { provide: AppInitService, useValue: appInitServiceSpy }
            ]
        })
            .compileComponents();

        beolServiceSpy.searchForPerson.and.returnValue('gravsearchQuery');

        beolService = TestBed.get(BeolService);

        const mockRes = of(
            new ReadResourcesSequence(
                [new ReadResource('personIri', 'http://0.0.0.0:3333/ontology/0801/beol/v2#person', 'label', [], [], [], [], {})],
                1
            )
        );

        searchServiceSpy.doExtendedSearchReadResourceSequence.and.returnValue(mockRes);

        searchService = TestBed.get(SearchService);

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform a query to get the person\'s actual Iri', () => {

        expect(beolService.searchForPerson).toHaveBeenCalledWith('(DE-588)' + gnd);

        expect(searchService.doExtendedSearchReadResourceSequence).toHaveBeenCalledWith('gravsearchQuery');

        expect(beolService.routeByResourceType).toHaveBeenCalledWith('http://0.0.0.0:3333/ontology/0801/beol/v2#person', 'personIri');

        expect(appInitService.getSettings).toHaveBeenCalledTimes(1);
    });
});
