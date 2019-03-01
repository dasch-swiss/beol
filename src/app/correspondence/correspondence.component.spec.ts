import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaterialModule } from '../material-module';
import { CorrespondenceComponent } from './correspondence.component';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';
import { AppInitService } from '../app-init.service';

describe('CorrespondenceComponent', () => {
    let component: CorrespondenceComponent;
    let fixture: ComponentFixture<CorrespondenceComponent>;

    let appInitService: AppInitService;

    beforeEach(async(() => {

        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientModule,
                HttpClientTestingModule
            ],
            declarations: [CorrespondenceComponent],
            providers: [
                {provide: KuiCoreConfigToken, useValue: KuiCoreConfig},
                {provide: AppInitService, useValue: appInitServiceSpy}
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CorrespondenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
