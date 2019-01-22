import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[appNewtonProject]'
})
export class NewtonProjectDirective implements OnChanges {

    constructor(private el: ElementRef) {
    }

    private _npID: string;

    @Input()
    set npID(value: string) {
        this._npID = value;
    }

    get npID() {
        return this._npID;
    }

    private generateLinkToNewtonProject() {

        const basePath = 'http://www.newtonproject.ox.ac.uk/view/texts/normalized/';

        return basePath + this._npID;

    }

    ngOnChanges() {

        const link = this.generateLinkToNewtonProject();

        this.el.nativeElement.innerHTML = `<a href="${link}" target="_blank">${this._npID}</a>`;

    }

}
