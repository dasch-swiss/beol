import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadTextValueAsHtmlComponent } from './read-text-value-as-html.component';

import { MathJaxDirective } from '../../directives/mathjax.directive';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import {
    KuiCoreConfig, KuiCoreConfigToken,
    OntologyInformation,
    ReadTextValue,
    ReadTextValueAsHtml,
    ResourceClass,
    ResourceClasses,
    ResourceClassIrisForOntology
} from '@knora/core';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


describe('ReadTextValueAsHtmlComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig }
            ],
            declarations: [
                ReadTextValueAsHtmlComponent,
                MathJaxDirective,
                TestHostComponent
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
        expect(testHostComponent.htmlValueComponent.valueObject.propIri).toEqual('http://0.0.0.0/ontology/0801/beol/v2#hasText');
        expect(testHostComponent.htmlValueComponent.valueObject.getClassName()).toEqual('ReadTextValueAsHtml');

        expect(testHostComponent.htmlValueComponent.bindEvents).toBeTruthy();
        expect(testHostComponent.htmlValueComponent.ontologyInfo).toEqual(ontoInfo);

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
                                 [ontologyInfo]="ontologyInfo">
        </read-text-value-as-html>`
})
class TestHostComponent implements OnInit {

    @ViewChild('htmlValComp') htmlValueComponent: ReadTextValueAsHtmlComponent;

    htmlVal: ReadTextValue;
    bindEvents = true;
    ontologyInfo;

    constructor() {
    }

    ngOnInit() {
        this.htmlVal =
            new ReadTextValueAsHtml('http://rdfh.ch/0802/V/values/Z',
                'http://0.0.0.0/ontology/0801/beol/v2#hasText',
                '<div>test</div>', {});

        this.ontologyInfo = ontoInfo;
    }
}

const resClassesForOnto: ResourceClassIrisForOntology = {
    'http://0.0.0.0:3333/ontology/0803/incunabula/v2': [
        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book'
    ]
};

const resClasses: ResourceClasses = {
    'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book':
        new ResourceClass(
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book',
            'book.png',
            'A book.',
            'book',
            []
        )
};

const ontoInfo = new OntologyInformation(resClassesForOnto, resClasses, {});
