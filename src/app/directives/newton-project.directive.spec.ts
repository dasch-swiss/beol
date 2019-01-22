import { NewtonProjectDirective } from './newton-project.directive';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('NewtonProjectDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                TestComponent,
                NewtonProjectDirective
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

    it('should render the catalogue link', () => {

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML)
            .toEqual('<a href="http://www.newtonproject.ox.ac.uk/view/texts/normalized/NATP00120" target="_blank">NATP00120</a>');
    });

    it('should render the catalogue link', () => {

        component.npID = 'NATP00120';

        fixture.detectChanges();

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML)
            .toEqual('<a href="http://www.newtonproject.ox.ac.uk/view/texts/normalized/NATP00120" target="_blank">000059882</a>');
    });
});

@Component({
    template: `
        <span appHanCatalogue [sysnum]="letterSysnum"></span>
    `
})

class TestComponent implements OnInit {

    npID: string;

    ngOnInit() {
        this.npID = 'NATP00120';
    }
}
