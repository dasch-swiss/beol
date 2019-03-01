import { inject, TestBed } from '@angular/core/testing';

import { BeolService } from './beol.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppInitService } from '../app-init.service';

describe('BeolService', () => {
    let appInitService: AppInitService;

    beforeEach(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                BeolService,
                {provide: AppInitService, useValue: appInitServiceSpy}
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);
    });

    it('should be created', inject([BeolService], (service: BeolService) => {
        expect(service).toBeTruthy();
        
    }));
});
