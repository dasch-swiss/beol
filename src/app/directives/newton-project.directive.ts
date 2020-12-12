import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import * as BeolConstants from '../beol-constants';

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

        const basePath = BeolConstants.newtonDirectivePath;

        return basePath + this._npID;

    }

    ngOnChanges() {

        const link = this.generateLinkToNewtonProject();

        this.el.nativeElement.innerHTML = `<a href="${link}" target="_blank">${this._npID}</a>`;

    }

}
