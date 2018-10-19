import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../material-module';
import { ReadTextValueAsHtmlComponent } from './read-text-value-as-html.component';
import {MathJaxDirective} from '../../directives/mathjax.directive';

describe('ReadTextValueAsHtmlComponent', () => {
    let component: ReadTextValueAsHtmlComponent;
    let fixture: ComponentFixture<ReadTextValueAsHtmlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                ReadTextValueAsHtmlComponent,
                MathJaxDirective
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
