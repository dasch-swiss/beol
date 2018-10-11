import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathJaxDirective } from './mathjax.directive';
import { OnInit, Component } from '@angular/core';

describe('MathJaxDirective', () => {

    /* let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
 */
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [MathJaxDirective],
            providers: [
            ]
        });
    });

    xit('should create an instance', () => {
    });

});

/* @Component({
    selector: 'kui-test',
    template: `
    <span [valueObject]="valueObject" [mathJax]="valueObject?.getContent()" [ontologyInfo]="ontologyInfo" [bindEvents]="bindEvents"></span>
    `
})

class TestComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
} */
