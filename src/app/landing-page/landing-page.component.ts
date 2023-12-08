import { Component, OnInit } from '@angular/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _beol: BeolService
    ) {
    }

    ngOnInit() {
    }

    openBiography(name: string) {
        this._router.navigate(['/biography/', name], { relativeTo: this._route })
    }

}
