import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lece-leoo',
    templateUrl: './lece-leoo.component.html',
    styleUrls: ['./lece-leoo.component.scss']
})
export class LeceLeooComponent implements OnInit {
    isLoading = true;
    project: string;
    navigationSubscription: Subscription;

    constructor(public location: Location, private _route: ActivatedRoute) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.navigationSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            this.project = params.get('project');
        });
    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
