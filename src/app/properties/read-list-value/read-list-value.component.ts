import { Component, Input, OnChanges } from '@angular/core';
import { ListCacheService, ListNodeV2, ReadListValue } from '@knora/core';
import { Observable } from 'rxjs';

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

    node: Observable<ListNodeV2>;

    constructor(private _listCacheService: ListCacheService) {
    }

    ngOnChanges() {
        // given the node's Iri, ask the list cache service
        this.node = this._listCacheService.getListNode(this.valueObject.listNodeIri);

    }

}
