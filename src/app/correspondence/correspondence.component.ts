import { Component, OnInit } from '@angular/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

/**
 * Represents a correspondent.
 */
class Correspondent {

  /**
   * Represents a person that took part in a correspondence.
   *
   * @param {string} name the name of the person.
   * @param {string} gnd the GND/IAF identifier of the person.
   */
  constructor(readonly name: string, readonly gnd: string) {
  }
}

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss']
})
export class CorrespondenceComponent implements OnInit {

  author: string;
  recipient: string;
  Christian_Goldbach = new Correspondent('Christian Goldbach', '(DE-588)118696149');
  Leonhard_Euler = new Correspondent('Leonhard Euler', '(DE-588)118531379');
  Johann_Albrecht_Euler = new Correspondent('Johann Albrecht Euler', '(DE-588)116610832');

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _beol: BeolService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.author = params['author'];
      console.log('author', this.author);
      this.recipient = params['recipient'];
      console.log('recipient', this.recipient);
    });
  }

  /**
    * Generate Gravsearch query to search for the correspondence between two persons.
    *
    * @param gnd1 GND of the first correspondent.
    * @param gnd2 GND of the second correspondent.
    * @param noTranslations indicates if translations should be excluded.
    */
  searchForCorrespondence(gnd1: string, gnd2: string, noTranslations: boolean = false) {

    const gravsearch: string = this._beol.searchForCorrespondence(gnd1, gnd2, noTranslations, 0);

    this.submitQuery(gravsearch);
  }

  /**
   * Show a correspondence between two persons.
   *
   * @param gravsearch the Gravsearch query to be executed.
   */
  private submitQuery(gravsearch: string) {

    this._router.navigate(['/search/extended/', gravsearch], { relativeTo: this._route });
  }


}
