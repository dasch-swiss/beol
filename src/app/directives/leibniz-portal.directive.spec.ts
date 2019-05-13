import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {LeibnizPortalDirective} from './leibniz-portal.directive';

describe('LeibnizPortalDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                TestComponent,
                LeibnizPortalDirective
            ],
            providers: []
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should render the leibniz link', () => {

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML)
            .toEqual('<a href="http://leibniz-briefportal.adw-goe.de/letter/l3644" target="_blank">l3644</a>');
    });

    it('should render the leibniz link', () => {

        component.letterID = 'l3644';

        fixture.detectChanges();

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML)
            .toEqual('<a href="http://leibniz-briefportal.adw-goe.de/letter/l3644" target="_blank">l3644</a>');
    });
});

@Component({
    template: `
        <span appLeibnizPortal [letterID]="letterID"></span>
    `
})

class TestComponent implements OnInit {

    letterID: string;

    ngOnInit() {
        this.letterID = 'l3644';
    }
}
