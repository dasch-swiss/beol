import { Component, OnInit } from '@angular/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss']
})
export class CorrespondenceComponent implements OnInit {

  gnd1: string;
  gnd2: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _beol: BeolService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.gnd1 = params['gnd1'];
      console.log(this.gnd1);
      this.gnd2 = params['gnd2'];
      console.log(this.gnd2);
    });
  }

  /**
    * Generate Gravsearch query to search for the correspondence between two persons.
    *
    * @param {string} gnd1 GND of the first correspondent.
    * @param {string} gnd2 GND of the second correspondent.
    * @param {boolean} noTranslations indicates if translations should be excluded.
    */
  searchForCorrespondence(gnd1: string, gnd2: string, noTranslations: boolean = false) {

    const gravsearch: string = this._beol.searchForCorrespondence(gnd1, gnd2, noTranslations, 0);

    this.submitQuery(gravsearch);
  }

  /**
   * Show a correspondence between two persons.
   *
   * @param {string} gravsearch the Gravsearch query to be executed.
   */
  private submitQuery(gravsearch: string) {

    this._router.navigate(['/search/extended/', gravsearch], { relativeTo: this._route });
  }


}
