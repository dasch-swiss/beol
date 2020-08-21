import { Component, Inject, Input, OnChanges } from '@angular/core';
import { KnoraApiConnection, ListNodeV2, ReadListValue } from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken } from '@dasch-swiss/dsp-ui';

@Component({
    selector: 'read-list-value',
    templateUrl: './read-list-value.component.html',
    styleUrls: ['./read-list-value.component.scss']
})
export class ReadListValueComponent implements OnChanges {

    @Input() valueObject: ReadListValue;

    private _renderMath = true;

    @Input()
    set renderMath(value: boolean) {
        this._renderMath = value;
    }

    get renderMath() {
        return this._renderMath;
    }

    node: ListNodeV2;

    constructor(
        @Inject(DspApiConnectionToken) private _dspApiConnection: KnoraApiConnection
    ) { }

    ngOnChanges() {
        // given the node's Iri, ask the list cache service
        this._dspApiConnection.v2.list.getNode(this.valueObject.id).subscribe(
            (response: ListNodeV2) => {
                this.node = response;
            });

    }

}
