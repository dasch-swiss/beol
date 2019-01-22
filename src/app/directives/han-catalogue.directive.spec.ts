import { HanCatalogueDirective } from './han-catalogue.directive';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('HanCatalogueDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                TestComponent,
                HanCatalogueDirective
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
            .toEqual('<a href="https://aleph.unibas.ch/F/?local_base=DSV05&amp;con_lng=GER&amp;func=find-b&amp;find_code=SYS&amp;request=000059881" target="_blank">000059881</a>');
    });

    it('should render the catalogue link', () => {

        component.letterSysnum = '000059882';

        fixture.detectChanges();

        const compDe = fixture.debugElement;

        const spanDe: DebugElement = compDe.query(By.css('span'));

        expect(spanDe.nativeElement.innerHTML)
            .toEqual('<a href="https://aleph.unibas.ch/F/?local_base=DSV05&amp;con_lng=GER&amp;func=find-b&amp;find_code=SYS&amp;request=000059882" target="_blank">000059882</a>');
    });
});

@Component({
    template: `
        <span appHanCatalogue [sysnum]="letterSysnum"></span>
    `
})

class TestComponent implements OnInit {

    letterSysnum: string;

    ngOnInit() {
        this.letterSysnum = '000059881';
    }
}
