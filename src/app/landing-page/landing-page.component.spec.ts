import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material-module';
import { LandingPageComponent } from './landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CorrespondenceComponent } from '../correspondence/correspondence.component';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';
import { AppInitService } from '../app-init.service';

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;

    let appInitService: AppInitService;

    beforeEach(async(() => {

        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                BrowserAnimationsModule],
            declarations: [LandingPageComponent, CorrespondenceComponent],
            providers: [
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig },
                { provide: AppInitService, useValue: appInitServiceSpy }
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
