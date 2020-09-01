import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadListValue } from '@dasch-swiss/dsp-js';

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

        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                DspSearchPanelComponent
            ],
            providers: []
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
