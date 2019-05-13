import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[appLeibnizPortal]'
})
export class LeibnizPortalDirective implements OnChanges {

    constructor(private el: ElementRef) {
    }

    private _letterID: string;

    @Input()
    set letterID(value: string) {
        this._letterID = value;
    }

    get letterID() {
        return this._letterID;
    }

    private generateLinkToLeibnizPortal() {

        const basePath = 'http://leibniz-briefportal.adw-goe.de/letter/';

        return basePath + this._letterID;

    }

    ngOnChanges() {

        const link = this.generateLinkToLeibnizPortal();

        this.el.nativeElement.innerHTML = `<a href="${link}" target="_blank">${this._letterID}</a>`;

    }

}
