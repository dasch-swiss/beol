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
import { KnoraConstants, OntologyInformation, ReadLinkValue } from '@knora/core';
import { Router } from '@angular/router';
import { BeolService } from '../../services/beol.service';
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


    constructor(private _router: Router, private _beol: BeolService) {
    }

    ngOnInit() {
    }

    /**
     * Navigate to the referred resource, choosing the apt template for the given resource type.
     *
     * @param referredResourceType the type of the referred resource.
     * @param referredResourceIri the Iri of the referred resource.
     */
    showReferredResource(referredResourceIri: string, referredResourceType: string) {

        this._beol.routeByResourceType(referredResourceType, referredResourceIri);

    }


}


