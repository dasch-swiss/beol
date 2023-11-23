import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { MatLegacyCheckbox as MatCheckbox } from '@angular/material/legacy-checkbox';
import { ReadResourceSequence } from '@dasch-swiss/dsp-js';
import { CheckboxUpdate, FilteredResources } from '../list-view.component';
import { ListViewService } from '../list-view.service';

@Component({
    selector: 'dsp-resource-list',
    templateUrl: './resource-list.component.html',
    styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

    /**
     * List of all resource checkboxes. This list is used to
     * unselect all checkboxes when single selection to view
     * resource is used
     */
    @ViewChildren("ckbox") resChecks: MatCheckbox[];

    /**
      * List of resources of type ReadResourceSequence
      *
      * @param  {ReadResourceSequence} resources
      */
    @Input() resources: ReadResourceSequence;

    /**
     * List of all selected resources indices
     */
    @Input() selectedResourceIdx: number[];

    /**
      * Set to true if multiple resources can be selected for comparison
      */
    @Input() withMultipleSelection?: boolean = false;

    /**
     * Click on checkbox will emit the resource info
     *
     * @param  {EventEmitter<FilteredResources>} resourcesSelected
     */
    @Output() resourcesSelected?: EventEmitter<FilteredResources> = new EventEmitter<FilteredResources>();

    constructor(
        private _listView: ListViewService
    ) { }

    ngOnInit() {
        // select the first item in the list
        this.selectResource({ checked: true, resIndex: 0, resId: this.resources.resources[0].id, resLabel: this.resources.resources[0].label, isCheckbox: false })
    }

    selectResource(status: CheckboxUpdate) {
        const selection: FilteredResources = this._listView.viewResource(status, this.withMultipleSelection, this.selectedResourceIdx, this.resChecks);

        this.selectedResourceIdx = selection.resListIndex;

        this.resourcesSelected.emit(selection);

    }

}
