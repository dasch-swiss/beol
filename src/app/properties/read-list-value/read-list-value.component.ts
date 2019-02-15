import { Component, Input, OnInit } from '@angular/core';
import { ReadListValue } from '@knora/core';

@Component({
    selector: 'read-list-value',
    templateUrl: './read-list-value.component.html',
    styleUrls: ['./read-list-value.component.scss']
})
export class ReadListValueComponent implements OnInit {

    @Input() valueObject: ReadListValue;

    private _renderMath = true;

    @Input()
    set renderMath(value: boolean) {
        this._renderMath = value;
    }

    get renderMath() {
        return this._renderMath;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
