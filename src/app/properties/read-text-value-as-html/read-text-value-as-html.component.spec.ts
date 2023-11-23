import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReadTextValueAsHtmlComponent } from './read-text-value-as-html.component';

import { MathJaxDirective } from '../../directives/mathjax.directive';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';

import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReadResource, ReadTextValue, ReadTextValueAsHtml } from '@dasch-swiss/dsp-js';
import { BeolService } from '../../services/beol.service';



describe('ReadTextValueAsHtmlComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                ReadTextValueAsHtmlComponent,
                MathJaxDirective,
                TestHostComponent
            ],
            providers: [
                {
                    provide: BeolService, useValue: {} // mock BeolService because it has its own deps
                }
            ]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();

        expect(testHostComponent).toBeTruthy();
    });

    it('should create', () => {
        expect(testHostComponent.htmlValueComponent).toBeTruthy();

        expect(testHostComponent.htmlValueComponent.valueObject.id).toEqual('http://rdfh.ch/0802/V/values/Z');
        expect(testHostComponent.htmlValueComponent.valueObject.property).toEqual('http://0.0.0.0/ontology/0801/beol/v2#hasText');

        expect(testHostComponent.htmlValueComponent.bindEvents).toBeTruthy();

        const hostCompDe = testHostFixture.debugElement;

        const listVal = hostCompDe.query(By.directive(ReadTextValueAsHtmlComponent));

        const spanDebugElement: DebugElement = listVal.query(By.css('span'));

        const spanNativeElement: HTMLElement = spanDebugElement.nativeElement;

        expect(spanNativeElement.innerHTML).toEqual('<div>test</div>');

        const mathJaxDirDe: DebugElement = hostCompDe.query(By.directive(MathJaxDirective));

        expect(mathJaxDirDe).toBeTruthy();
    });
});

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `
        <read-text-value-as-html #htmlValComp
                                 [valueObject]="htmlVal"
                                 [bindEvents]="bindEvents"
                                 [resource]="res">
        </read-text-value-as-html>`
})
class TestHostComponent implements OnInit {

    @ViewChild('htmlValComp', { static: false }) htmlValueComponent: ReadTextValueAsHtmlComponent;

    htmlVal: ReadTextValueAsHtml;
    bindEvents = true;
    res: ReadResource;

    constructor() {
    }

    ngOnInit() {
        const htmlVal = new ReadTextValueAsHtml();
        htmlVal.id = 'http://rdfh.ch/0802/V/values/Z';
        htmlVal.property = 'http://0.0.0.0/ontology/0801/beol/v2#hasText';
        htmlVal.html = '<div>test</div>';
        htmlVal.strval = htmlVal.html;

        this.htmlVal = htmlVal;
        this.res = new ReadResource();

    }
}
