import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatLegacyMenu as MatMenu } from '@angular/material/legacy-menu';
import { ListNodeV2 } from '@dasch-swiss/dsp-js';

@Component({
  selector: 'dsp-sublist-value',
  templateUrl: './sublist-value.component.html',
  styleUrls: ['./sublist-value.component.scss']
})
export class SublistValueComponent {

  @Input() children: ListNodeV2[];

  @Output() selectedNode: EventEmitter<ListNodeV2> = new EventEmitter<ListNodeV2>();

  @ViewChild('childMenu', { static: true }) public childMenu: MatMenu;
  constructor() {
  }
  setValue(item: ListNodeV2) {
    this.selectedNode.emit(item);
  }

}
