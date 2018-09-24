import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { MaterialModule } from '../../material-module';
import { ReadTextValueAsHtmlComponent } from './read-text-value-as-html.component';

describe('ReadTextValueAsHtmlComponent', () => {
    let component: ReadTextValueAsHtmlComponent;
    let fixture: ComponentFixture<ReadTextValueAsHtmlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadTextValueAsHtmlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
