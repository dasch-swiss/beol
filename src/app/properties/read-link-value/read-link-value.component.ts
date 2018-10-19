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
import { environment } from '../../../environments/environment';

@Component({
    selector: 'read-link-value',
    templateUrl: './read-link-value.component.html',
    styleUrls: ['./read-link-value.component.scss']
})
export class ReadLinkValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;
    @Input() ontologyInfo: OntologyInformation;

    KnoraConstants = KnoraConstants;

    apiUrl = environment.api;

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    /**
     * Navigate by URL route according to the resource type
     *
     * @param referredIri
     * @param referredType
     */
    showReferredResource(referredIri, referredType) {

        if (referredType === this.apiUrl + '/ontology/0801/beol/v2#person') {
            this._router.navigateByUrl('person/' + encodeURIComponent(referredIri));
        } else if (referredType === this.apiUrl + '/ontology/0801/beol/v2#letter') {
            this._router.navigateByUrl('letter/' + encodeURIComponent(referredIri));
        } else {
            this._router.navigateByUrl('resource/' + encodeURIComponent(referredIri));
        }

    }


}


