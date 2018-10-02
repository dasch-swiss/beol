import { Component, Input, OnInit } from '@angular/core';
import { ReadDateValue, DateSalsah } from '@knora/core';

@Component({
    selector: 'read-date-value',
    templateUrl: './read-date-value.component.html',
    styleUrls: ['./read-date-value.component.scss']
})
export class ReadDateValueComponent implements OnInit {

    @Input() valueObject: ReadDateValue;
    @Input() calendar?: boolean;
    @Input() era?: boolean;

    date: DateSalsah;

    constructor() {
    }

    ngOnInit() {
        this.date = this.valueObject.getDate();
    }

}
