import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppModule } from '../../app.module';
import { MaterialModule } from '../../material-module';
import { ReadDecimalValueComponent } from './read-decimal-value.component';

describe('ReadDecimalValueComponent', () => {
    let component: ReadDecimalValueComponent;
    let fixture: ComponentFixture<ReadDecimalValueComponent>;

    let originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                MaterialModule,
                HttpClientModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadDecimalValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));
});
