import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTextValueComponent } from './read-text-value.component';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import {
    OntologyInformation,
    ReadTextValue,
    ReadTextValueAsHtml,
    ReadTextValueAsString,
    ReadTextValueAsXml, ResourceClass,
    ResourceClasses,
    ResourceClassIrisForOntology
} from '@knora/core';
import { KuiViewerModule, TextValueAsStringComponent, TextValueAsXmlComponent } from '@knora/viewer';
import { ReadTextValueAsHtmlComponent } from '../read-text-value-as-html/read-text-value-as-html.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

describe('ReadTextValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                KuiViewerModule,
                RouterTestingModule,
                MatSnackBarModule
            ],
            declarations: [
                ReadTextValueComponent,
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
        expect(testHostComponent.textValueComponent).toBeTruthy();
    });

    it('should have created a TextValueAsStringComponent with the correct value', () => {

        const hostCompDe = testHostFixture.debugElement;

        const stringValComp: DebugElement = hostCompDe.query(By.directive(TextValueAsStringComponent));

        expect(stringValComp).toBeTruthy();

        expect(stringValComp.componentInstance).toBeTruthy();

        const textValComp: TextValueAsStringComponent = stringValComp.componentInstance as TextValueAsStringComponent;

        expect(textValComp.valueObject.id).toEqual('http://rdfh.ch/0802/V/values/Q');

        expect(textValComp.valueObject.propIri).toEqual('http://0.0.0.0/ontology/0801/beol/v2#hasName');

        expect(textValComp.valueObject.str).toEqual('test string');

    });

    it('should have created a TextValueAsXmlComponent with the correct value', () => {

        testHostComponent.textVal =
            new ReadTextValueAsXml('http://rdfh.ch/0802/V/values/Y',
                'http://0.0.0.0/ontology/0801/beol/v2#hasXml',
                '<div>test</div>', 'http://rdfh.ch/0802/mappings/test');

        testHostFixture.detectChanges();

        const hostCompDe = testHostFixture.debugElement;

        const stringValComp: DebugElement = hostCompDe.query(By.directive(TextValueAsXmlComponent));

        expect(stringValComp).toBeTruthy();

        expect(stringValComp.componentInstance).toBeTruthy();

        const textValComp: TextValueAsXmlComponent = stringValComp.componentInstance as TextValueAsXmlComponent;

        expect(textValComp.valueObject.id).toEqual('http://rdfh.ch/0802/V/values/Y');

        expect(textValComp.valueObject.propIri).toEqual('http://0.0.0.0/ontology/0801/beol/v2#hasXml');

        expect(textValComp.valueObject.xml).toEqual('<div>test</div>');

    });

    it('should have created a ReadTextAsHtmlComponent with the correct value', () => {

        testHostComponent.textVal =
            new ReadTextValueAsHtml('http://rdfh.ch/0802/V/values/Z',
                'http://0.0.0.0/ontology/0801/beol/v2#hasText',
                '<span>test</span>', {});

        testHostComponent.bindEvents = true;

        testHostFixture.detectChanges();

        const hostCompDe = testHostFixture.debugElement;

        const stringValComp: DebugElement = hostCompDe.query(By.directive(ReadTextValueAsHtmlComponent));

        expect(stringValComp).toBeTruthy();

        expect(stringValComp.componentInstance).toBeTruthy();

        const textValComp: ReadTextValueAsHtmlComponent = stringValComp.componentInstance as ReadTextValueAsHtmlComponent;

        expect(textValComp.valueObject.id).toEqual('http://rdfh.ch/0802/V/values/Z');

        expect(textValComp.valueObject.propIri).toEqual('http://0.0.0.0/ontology/0801/beol/v2#hasText');

        expect(textValComp.valueObject.html).toEqual('<span>test</span>');

        expect(textValComp.bindEvents).toBeTruthy();

        expect(textValComp.ontologyInfo).toEqual(ontoInfo);
    });
});

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `
        <read-text-value #textValComp
                         [valueObject]="textVal"
                         [bindEvents]="bindEvents"
                         [ontologyInfo]="ontologyInfo">
        </read-text-value>`
})
class TestHostComponent implements OnInit {

    @ViewChild('textValComp') textValueComponent: ReadTextValueComponent;

    textVal: ReadTextValue;
    bindEvents = false;
    ontologyInfo;

    constructor() {
    }

    ngOnInit() {
        this.textVal =
            new ReadTextValueAsString(
                'http://rdfh.ch/0802/V/values/Q',
                'http://0.0.0.0/ontology/0801/beol/v2#hasName',
                'test string');

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


