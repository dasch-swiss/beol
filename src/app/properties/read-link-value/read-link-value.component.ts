/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import { Component, Input, OnInit } from '@angular/core';
import { OntologyInformation, ReadLinkValue, KnoraConstants } from '@knora/core';
import { Router } from '@angular/router';

@Component({
    selector: 'read-link-value',
    templateUrl: './read-link-value.component.html',
    styleUrls: ['./read-link-value.component.scss']
})
export class ReadLinkValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;
    @Input() ontologyInfo: OntologyInformation;

    KnoraConstants = KnoraConstants;

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    showReferredResource(referredIri, referredType) {

        console.log('valueObject', this.valueObject);

        console.log('ontologyInfo', this.ontologyInfo);

        console.log('referredType', referredType);

        if (referredType === 'http://0.0.0.0:3333/ontology/0801/beol/v2#person') {
            this._router.navigateByUrl('person/' + encodeURIComponent(referredIri));
            console.log('special route if person type');
        } else if (referredType === 'http://0.0.0.0:3333/ontology/0801/beol/v2#letter') {
            // this._router.navigateByUrl('letter/' + encodeURIComponent(referredIri));
            console.log('special route if letter type');
        } else {
            // this._router.navigateByUrl('viewer/' + referredIri);
            console.log('generic route if type other than person or letter');
        }

    }


}
