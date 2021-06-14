import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { Component } from '@angular/core';

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

    beforeEach(waitForAsync(() => {

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

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
});
