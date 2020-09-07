import { Component, Input, OnInit } from '@angular/core';
import { ReadResource, ReadTextValueAsHtml } from '@dasch-swiss/dsp-js';

@Component({
    selector: 'read-text-value-as-html',
    templateUrl: './read-text-value-as-html.component.html',
    styleUrls: ['./read-text-value-as-html.component.scss']
})
export class ReadTextValueAsHtmlComponent implements OnInit {

    private _valueObject: ReadTextValueAsHtml;
    private _resource: ReadResource;
    private _bindEvents: boolean; // indicates if click and mouseover events have to be bound

    @Input()
    set valueObject(value: ReadTextValueAsHtml) {
        this._valueObject = value;
    }

    get valueObject() {
        return this._valueObject;
    }

    @Input()
    set resource(value: ReadResource) {
        this._resource = value;
    }

    get resource() {
        return this._resource;
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
    }

}
