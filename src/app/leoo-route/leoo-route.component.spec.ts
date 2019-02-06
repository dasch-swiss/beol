import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LeooRouteComponent } from './leoo-route.component';
import { of } from 'rxjs';
import { KuiCoreConfig, ReadResource, ReadResourcesSequence, SearchService } from '@knora/core';
import { BeolService } from '../services/beol.service';

describe('LeooRouteComponent', () => {
    let component: LeooRouteComponent;
    let fixture: ComponentFixture<LeooRouteComponent>;
    const rn = '721';

    let beolService: BeolService;
    let searchService: SearchService;

    beforeEach(async(() => {

        const beolServiceSpy = jasmine.createSpyObj('BeolService', ['searchForLetterFromLEOO', 'routeByResourceType']); // see https://angular.io/guide/testing#angular-testbed
        const searchServiceSpy = jasmine.createSpyObj('SearchService', ['doExtendedSearchReadResourceSequence']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [LeooRouteComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: () => {
                                return rn;
                            }
                        })
                    }
                },
                { provide: 'config', useValue: KuiCoreConfig },
                { provide: BeolService, useValue: beolServiceSpy },
                { provide: SearchService, useValue: searchServiceSpy }
            ]
        })
            .compileComponents();

        beolServiceSpy.searchForLetterFromLEOO.and.returnValue('gravsearchQuery');

        beolService = TestBed.get(BeolService);

        const mockRes = of(
            new ReadResourcesSequence(
                [new ReadResource('letterIri', 'http://0.0.0.0:3333/ontology/0801/beol/v2#letter', 'label', [], [], [], [], {})],
                1
            )
        );

        searchServiceSpy.doExtendedSearchReadResourceSequence.and.returnValue(mockRes);

        searchService = TestBed.get(SearchService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeooRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform a query to get the letter\'s actual Iri', () => {

        expect(beolService.searchForLetterFromLEOO).toHaveBeenCalledWith(rn);

        expect(searchService.doExtendedSearchReadResourceSequence).toHaveBeenCalledWith('gravsearchQuery');

        expect(beolService.routeByResourceType).toHaveBeenCalledWith('http://0.0.0.0:3333/ontology/0801/beol/v2#letter', 'letterIri');
    });
});
