import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { Component } from '@angular/core';
import {AppInitService} from '@dasch-swiss/dsp-ui';

/**
 * Test host component to simulate dsp-search-panel component.
 */
@Component({
    selector: 'dsp-search-panel',
    template: ''
})
class DspSearchPanelComponent {

}

describe('AppComponent', () => {

    beforeEach(async(() => {
        const appInitServiceMock = {
            config: {
                ontologyIRI: 'http://0.0.0.0:3333'
            }
        };

        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                DspSearchPanelComponent
            ],
            providers: [
                { provide: AppInitService, useValue: appInitServiceMock },
            ]
        }).compileComponents();


    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
});
