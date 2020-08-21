import { Component, Input, OnInit } from '@angular/core';
import { Constants, ReadTextValue, ResourceClassAndPropertyDefinitions } from '@dasch-swiss/dsp-js';

@Component({
    selector: 'read-text-value',
    templateUrl: './read-text-value.component.html',
    styleUrls: ['./read-text-value.component.scss']
})
export class ReadTextValueComponent implements OnInit {

    private _textValue: ReadTextValue; // value object representing text without markup, XML or HTML
    private _ontoInfo: ResourceClassAndPropertyDefinitions; // needed if text has standoff links
    private _bindEvents: boolean; // indicates if click and mouseover events have to be bound

    DspConstants = Constants;

    @Input()
    set valueObject(value: ReadTextValue) {
        this._textValue = value;
    }

    get valueObject() {
        return this._textValue;
    }

    @Input()
    set ontologyInfo(value: ResourceClassAndPropertyDefinitions) {
        this._ontoInfo = value;
    }

    get ontologyInfo() {
        return this._ontoInfo;
    }

    @Input()
    set bindEvents(value: boolean) {
        this._bindEvents = value;
    }

    get bindEvents() {
        return this._bindEvents;
    }

    @Input() renderFigureRegions = false;

    constructor() {
    }

    ngOnInit() {
        // TODO: refactor with ValueTypeService from dsp-ui
        // this.valueTypeOrClass = this._valueTypeService.getValueTypeOrClass(this.displayValue);
    }

}
