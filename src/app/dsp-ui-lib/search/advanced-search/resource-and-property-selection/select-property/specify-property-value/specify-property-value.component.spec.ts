import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyPropertyValueComponent } from './specify-property-value.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Constants, MockOntology, ResourcePropertyDefinition } from '@dasch-swiss/dsp-js';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness as MatSelectHarness } from '@angular/material/select/testing';
import { IRI, Value, ValueLiteral } from './operator';

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `
        <dsp-specify-property-value #specifyProp [formGroup]="form" [property]="propertyDef" [topLevel]="topLevel"></dsp-specify-property-value>`
})
class TestHostComponent implements OnInit {

    @ViewChild('specifyProp') specifyProperty: SpecifyPropertyValueComponent;

    form: UntypedFormGroup;

    propertyDef: ResourcePropertyDefinition;

    topLevel = true;

    constructor(@Inject(UntypedFormBuilder) private _fb: UntypedFormBuilder) {
    }

    ngOnInit() {
        this.form = this._fb.group({});

        const resProps = MockOntology.mockReadOntology('http://0.0.0.0:3333/ontology/0001/anything/v2').getPropertyDefinitionsByType(ResourcePropertyDefinition);

        this.propertyDef = resProps.filter(propDef => propDef.id === 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger')[0];
    }

}

/**
 * Test component to simulate int value component.
 */
@Component({
    selector: 'dsp-search-int-value',
    template: ``
})
class TestSearchIntValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral(String(1), Constants.XsdInteger);
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate decimal value component.
 */
@Component({
    selector: 'dsp-search-decimal-value',
    template: ``
})
class TestSearchDecimalValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral(String(1.1), Constants.XsdDecimal);
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate Boolean value component.
 */
@Component({
    selector: 'dsp-search-boolean-value',
    template: ``
})
class TestSearchBooleanValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral(String(true), Constants.XsdBoolean);
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate date value component.
 */
@Component({
    selector: 'dsp-search-date-value',
    template: ``
})
class TestSearchDateValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral('GREGORIAN:2018-10-30:2018-10-30', 'http://api.knora.org/ontology/knora-api/simple/v2#Date');
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate a link value component.
 */
@Component({
    selector: 'dsp-search-link-value',
    template: ``
})
class TestSearchLinkValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    @Input() restrictResourceClass: string;

    getValue(): Value {
        return new IRI('testIri');
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate date value component.
 */
@Component({
    selector: 'dsp-search-link-value',
    template: ``
})
class TestSearchListValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    @Input() property: ResourcePropertyDefinition;

    getValue(): Value {
        return new IRI('testIri');
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate text value component.
 */
@Component({
    selector: 'dsp-search-text-value',
    template: ``
})
class TestSearchTextValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral('test', 'http://www.w3.org/2001/XMLSchema#string');
    }

    ngOnInit() {

    }

}

/**
 * Test component to simulate uri value component.
 */
@Component({
    selector: 'dsp-search-uri-value',
    template: ``
})
class TestSearchUriValueComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;

    getValue(): Value {
        return new ValueLiteral('http://www.knora.org', 'http://www.w3.org/2001/XMLSchema#anyURI');
    }

    ngOnInit() {

    }

}

describe('SpecifyPropertyValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    let loader: HarnessLoader;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatOptionModule
            ],
            declarations: [
                SpecifyPropertyValueComponent,
                TestHostComponent,
                TestSearchIntValueComponent,
                TestSearchBooleanValueComponent,
                TestSearchDateValueComponent,
                TestSearchDecimalValueComponent,
                TestSearchLinkValueComponent,
                TestSearchTextValueComponent,
                TestSearchUriValueComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(testHostFixture);

        testHostFixture.detectChanges();
    });

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
        expect(testHostComponent.specifyProperty).toBeTruthy();
    });

    it('should initialise the Inputs correctly', () => {

        expect(testHostComponent.specifyProperty.formGroup).toBeDefined();
        expect(testHostComponent.specifyProperty.property).toBeDefined();
        expect(testHostComponent.specifyProperty.property.id).toEqual('http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger');
        expect(testHostComponent.specifyProperty.topLevel).toBeTrue();
    });

    it('should initialise the Inputs correctly for a linking prop with object class constraint', () => {

        const resProps = MockOntology.mockReadOntology('http://0.0.0.0:3333/ontology/0001/anything/v2').getPropertyDefinitionsByType(ResourcePropertyDefinition);

        testHostComponent.propertyDef = resProps.filter(propDef => propDef.id === 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing')[0];

        testHostFixture.detectChanges();

        expect(testHostComponent.specifyProperty.formGroup).toBeDefined();
        expect(testHostComponent.specifyProperty.property).toBeDefined();
        expect(testHostComponent.specifyProperty.property.id).toEqual('http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing');
        expect(testHostComponent.specifyProperty.topLevel).toBeTrue();

        expect(testHostComponent.specifyProperty.objectClassConstraint).toEqual('http://0.0.0.0:3333/ontology/0001/anything/v2#Thing');

    });

    it('should initialise the Inputs correctly for a linking prop without object class constraint', () => {

        const resProps = MockOntology.mockReadOntology('http://0.0.0.0:3333/ontology/0001/anything/v2').getPropertyDefinitionsByType(ResourcePropertyDefinition);

        testHostComponent.propertyDef = resProps.filter(propDef => propDef.id === 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing')[0];
        testHostComponent.propertyDef.objectType = undefined;

        testHostFixture.detectChanges();

        expect(testHostComponent.specifyProperty.formGroup).toBeDefined();
        expect(testHostComponent.specifyProperty.property).toBeDefined();
        expect(testHostComponent.specifyProperty.property.id).toEqual('http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing');
        expect(testHostComponent.specifyProperty.topLevel).toBeTrue();

        expect(testHostComponent.specifyProperty.objectClassConstraint).toEqual('http://api.knora.org/ontology/knora-api/v2#Resource');

    });

    it('should add a new control to the parent form', waitForAsync(() => {

        // the control is added to the form as an async operation
        // https://angular.io/guide/testing#async-test-with-async
        testHostFixture.whenStable().then(
            () => {
                expect(testHostComponent.form.contains('comparisonOperator')).toBe(true);
            }
        );

    }));

    it('should set the correct comparison operators for the given property type', () => {
        expect(testHostComponent.specifyProperty.comparisonOperators.length).toEqual(7);
    });

    it('should set the correct comparison operators for a linking property type (on top level)', () => {

        const resProps = MockOntology.mockReadOntology('http://0.0.0.0:3333/ontology/0001/anything/v2').getPropertyDefinitionsByType(ResourcePropertyDefinition);

        testHostComponent.propertyDef = resProps.filter(propDef => propDef.id === 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing')[0];

        testHostFixture.detectChanges();

        expect(testHostComponent.specifyProperty.comparisonOperators.length).toEqual(4);
        expect(testHostComponent.topLevel).toBeTrue();
    });

    it('should set the correct comparison operators for a linking property type (not on top level)', () => {

        const resProps = MockOntology.mockReadOntology('http://0.0.0.0:3333/ontology/0001/anything/v2').getPropertyDefinitionsByType(ResourcePropertyDefinition);

        testHostComponent.propertyDef = resProps.filter(propDef => propDef.id === 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing')[0];

        testHostComponent.topLevel = false;

        testHostFixture.detectChanges();

        expect(testHostComponent.specifyProperty.comparisonOperators.length).toEqual(3);
        expect(testHostComponent.topLevel).toBeFalse();
    });

    it('should init the MatSelect and MatOptions correctly', async () => {

        const select = await loader.getHarness(MatSelectHarness);
        const initVal = await select.getValueText();

        // placeholder
        expect(initVal).toEqual('Comparison Operator');

        await select.open();

        const options = await select.getOptions();

        expect(options.length).toEqual(7);

    });

    it('should set the form to valid when an comparison operator has been chosen', async () => {

        expect(testHostComponent.specifyProperty.form.valid).toBe(false);

        const select = await loader.getHarness(MatSelectHarness);

        await select.open();

        const options = await select.getOptions();

        await options[0].click();

        expect(testHostComponent.specifyProperty.form.valid).toBe(true);

    });

    it('should read a value after a comparison operator has been chosen', async () => {
        const select = await loader.getHarness(MatSelectHarness);

        await select.open();

        const options = await select.getOptions();

        await options[0].click();

        expect(testHostComponent.specifyProperty.propertyValueComponent.getValue()).toEqual(new ValueLiteral('1', Constants.XsdInteger));

    });

    it('should unsubscribe from from changes on destruction', () => {

        expect(testHostComponent.specifyProperty.comparisonOperatorChangesSubscription.closed).toBe(false);

        testHostFixture.destroy();

        expect(testHostComponent.specifyProperty.comparisonOperatorChangesSubscription.closed).toBe(true);

    });
});
