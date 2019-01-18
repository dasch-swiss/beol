import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[appHanCatalogue]'
})
export class HanCatalogueDirective implements OnChanges {

    constructor(private el: ElementRef) {
    }

    private _sysnum: string;

    @Input()
    set sysnum(value: string) {
        this._sysnum = value;
    }

    get sysnum() {
        return this._sysnum;
    }

    private generateLinkToCatalogue() {

        const basePath = 'https://aleph.unibas.ch/F/?local_base=DSV05&con_lng=GER&func=find-b&find_code=SYS&request=';

        return basePath + this._sysnum;

    }

    ngOnChanges() {

        const link = this.generateLinkToCatalogue();

        this.el.nativeElement.innerHTML = `<a href="${link}" target="_blank">${this._sysnum}</a>`;

    }

}
