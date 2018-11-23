import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadListValueComponent } from './read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ReadListValue } from '@knora/core';
import { By } from '@angular/platform-browser';

describe('ReadListValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatSnackBarModule
            ],
            declarations: [
                ReadListValueComponent,
                TestHostComponent,
                MathJaxDirective // idea for mock: https://stackoverflow.com/questions/44495114/is-it-possible-to-mock-an-attribute-directive-in-angular
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
        expect(testHostComponent.listValueComponent).toBeTruthy();
    });

    it('should be equal to the list node label value "ListNodeLabel1"', () => {
        expect(testHostComponent.listValueComponent.valueObject.listNodeLabel).toEqual('ListNodeLabel1');

        const hostCompDe = testHostFixture.debugElement;

        const listVal = hostCompDe.query(By.directive(ReadListValueComponent));

        const spanDebugElement: DebugElement = listVal.query(By.css('span'));

        const spanNativeElement: HTMLElement = spanDebugElement.nativeElement;

        expect(spanNativeElement.innerText).toEqual('ListNodeLabel1');

        const mathJaxDirDe: DebugElement = hostCompDe.query(By.directive(MathJaxDirective));

        expect(mathJaxDirDe).toBeTruthy();

    });

    it('should be equal to the list node label value "ListNodeLabel2"', () => {
        testHostComponent.listValue = new ReadListValue('id', 'propIri', 'http://rdfh.ch/9sdf8sfd2jf9', 'ListNodeLabel2');

        testHostFixture.detectChanges();

        const hostCompDe = testHostFixture.debugElement;

        const listVal = hostCompDe.query(By.directive(ReadListValueComponent));

        const spanDebugElement: DebugElement = listVal.query(By.css('span'));

        const spanNativeElement: HTMLElement = spanDebugElement.nativeElement;

        expect(spanNativeElement.innerText).toEqual('ListNodeLabel2');

        const mathJaxDirDe: DebugElement = hostCompDe.query(By.directive(MathJaxDirective));

        expect(mathJaxDirDe).toBeTruthy();

    });

});


/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `
        <read-list-value #listVal [valueObject]="listValue"></read-list-value>`
})
class TestHostComponent implements OnInit {

    @ViewChild('listVal') listValueComponent: ReadListValueComponent;

    listValue;

    constructor() {
    }

    ngOnInit() {
        this.listValue = new ReadListValue('id', 'propIri', 'http://rdfh.ch/8be1b7cf7103', 'ListNodeLabel1');
    }
}
