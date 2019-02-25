import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathJaxDirective } from './mathjax.directive';
import { Component, DebugElement, OnInit } from '@angular/core';
import { KuiCoreConfig, KuiCoreConfigToken, KuiCoreModule } from '@knora/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('MathJaxDirective', () => {

    // element to be rendered by MathJax
    let mathJaxQueueCalledWith: Element;

    // mock MathJax (declared in component)
    const MathJax = {
        Hub: {
            Queue: (cb: () => {}) => {
                cb();
            },
            Typeset: (ele: Element) => {
                // queue was called with ele
                mathJaxQueueCalledWith = ele;
            }
        }
    };

    // create a global MathJax object
    // this normally happens when MathJax is loaded in index.html
    (window as any).MathJax = MathJax;

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatSnackBarModule,
                KuiCoreModule,
            ],
            declarations: [
                TestComponent,
                MathJaxDirective
            ],
            providers: [
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {

        expect(MathJax).toBeDefined();
        mathJaxQueueCalledWith = undefined;

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should not render the text with MathJax', () => {
        expect(component.bindEvents).toBeFalsy();
        expect(component.renderMath).toBeFalsy();

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML).toEqual('(\\frac{1}{2})');

        expect(mathJaxQueueCalledWith).toBeUndefined();
    });

    it('should render the text with MathJax', () => {

        component.renderMath = true;

        fixture.detectChanges();

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML).toEqual('(\\frac{1}{2})');

        expect(mathJaxQueueCalledWith.innerHTML).toEqual('(\\frac{1}{2})');
    });

    // TODO: add tests for bound events

});

@Component({
    template: `
        <span [mathJax]="text" [bindEvents]="bindEvents" [renderMath]="renderMath"></span>
    `
})

class TestComponent implements OnInit {

    text: string;
    bindEvents = false;
    renderMath = false;

    ngOnInit() {
        this.text = '(\\frac{1}{2})';
    }
}
