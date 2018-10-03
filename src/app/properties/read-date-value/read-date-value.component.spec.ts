import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { ReadDateValueComponent } from './read-date-value.component';
import { ReadDateValue, DateSalsah } from '@knora/core';

describe('ReadDateValueComponent', () => {
    let component: ReadDateValueComponent;
    let fixture: ComponentFixture<ReadDateValueComponent>;

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
                MaterialModule
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadDateValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should create', () => {
        expect(component).toBeTruthy();
    });
});
