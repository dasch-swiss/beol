import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadListValueComponent } from './read-list-value.component';
import { MathJaxDirective } from '../../directives/mathjax.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { KuiCoreConfig, KuiCoreConfigToken, ListCacheService, ListNodeV2, ReadListValue } from '@knora/core';
import { By } from '@angular/platform-browser';

import { AppInitService } from '../../app-init.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


describe('ReadListValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    let appInitService: AppInitService;
    let listCacheService: ListCacheService;

    beforeEach(async(() => {
        const appInitServiceSpy = jasmine.createSpyObj('AppInitService', ['getSettings']);

        const spyListCacheService = jasmine.createSpyObj('ListCacheService', ['getListNode']);

        TestBed.configureTestingModule({
            declarations: [
                ReadListValueComponent,
                TestHostComponent,
                TestHostComponent2,
                MathJaxDirective // idea for mock: https://stackoverflow.com/questions/44495114/is-it-possible-to-mock-an-attribute-directive-in-angular
            ],
            imports: [
                RouterTestingModule,
                MatSnackBarModule,
                HttpClientModule
            ],
            providers: [
                {provide: ListCacheService, useValue: spyListCacheService},
                {provide: KuiCoreConfigToken, useValue: KuiCoreConfig},
                {provide: AppInitService, useValue: appInitServiceSpy}
            ]
        })
            .compileComponents();

        appInitServiceSpy.getSettings.and.returnValue({ontologyIRI: 'http://0.0.0.0:3333'});

        appInitService = TestBed.get(AppInitService);

        spyListCacheService.getListNode.and.callFake((nodeIri) => {
            return of(new ListNodeV2(nodeIri, 'test' + nodeIri, 1, ''));
        });

        listCacheService = TestBed.get(ListCacheService);
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

    it('should have render math option set to "true" by default', () => {
        expect(testHostComponent.listValueComponent.renderMath).toBeTruthy();
    });

    it('should be equal to the list node label value "ListNodeLabel1"', () => {
        expect(testHostComponent.listValueComponent.valueObject.listNodeIri).toEqual('http://rdfh.ch/8be1b7cf7103');

        const hostCompDe = testHostFixture.debugElement;

        const listVal = hostCompDe.query(By.directive(ReadListValueComponent));

        const spanDebugElement: DebugElement = listVal.query(By.css('span'));

        const spanNativeElement: HTMLElement = spanDebugElement.nativeElement;

        expect(spanNativeElement.innerText).toEqual('testhttp://rdfh.ch/8be1b7cf7103');

        expect(listCacheService.getListNode).toHaveBeenCalledTimes(1);
        expect(listCacheService.getListNode).toHaveBeenCalledWith('http://rdfh.ch/8be1b7cf7103');

        const mathJaxDirDe: DebugElement = hostCompDe.query(By.directive(MathJaxDirective));

        expect(mathJaxDirDe).toBeTruthy();

    });

    it('should be equal to the list node label value "ListNodeLabel2"', () => {
        testHostComponent.listValue = new ReadListValue('id', 'propIri', 'http://rdfh.ch/9sdf8sfd2jf9');

        testHostFixture.detectChanges();

        const hostCompDe = testHostFixture.debugElement;

        const listVal = hostCompDe.query(By.directive(ReadListValueComponent));

        const spanDebugElement: DebugElement = listVal.query(By.css('span'));

        const spanNativeElement: HTMLElement = spanDebugElement.nativeElement;

        expect(spanNativeElement.innerText).toEqual('testhttp://rdfh.ch/9sdf8sfd2jf9');

        expect(listCacheService.getListNode).toHaveBeenCalledTimes(2);
        expect(listCacheService.getListNode).toHaveBeenCalledWith('http://rdfh.ch/8be1b7cf7103');
        expect(listCacheService.getListNode).toHaveBeenCalledWith('http://rdfh.ch/9sdf8sfd2jf9');

        const mathJaxDirDe: DebugElement = hostCompDe.query(By.directive(MathJaxDirective));

        expect(mathJaxDirDe).toBeTruthy();

    });

    it('should have render math option set to "false" through input by the parent component', () => {

        const testHostFixture2 = TestBed.createComponent(TestHostComponent2);
        const testHostComponent2 = testHostFixture2.componentInstance;
        testHostFixture2.detectChanges();

        expect(testHostComponent2).toBeTruthy();

        expect(testHostComponent2.listValueComponent.renderMath).toBeFalsy();

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
        this.listValue = new ReadListValue('id', 'propIri', 'http://rdfh.ch/8be1b7cf7103');
    }
}

/**
 * Test host component to simulate parent component.
 */
@Component({
    template: `
        <read-list-value #listVal [valueObject]="listValue" [renderMath]="renderMathInput"></read-list-value>`
})
class TestHostComponent2 implements OnInit {

    @ViewChild('listVal') listValueComponent: ReadListValueComponent;

    listValue;

    renderMathInput = false;

    constructor() {
    }

    ngOnInit() {
        this.listValue = new ReadListValue('id', 'propIri', 'http://rdfh.ch/8be1b7cf7103');
    }
}
