import { Component, OnInit } from '@angular/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

/**
 * Represents a book of correspondences.
 */
class Book {
  constructor(
    readonly title: string,
    readonly isbn: string,
    readonly correspondences: CorrespondenceGroup[],
    public panelOpenState: boolean = false) {
  }
}

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

/**
 * Represents a group of correspondences.
 */
class CorrespondenceGroup {

  constructor(
    readonly mainCorrespondent: Correspondent,
    readonly correspondences: Correspondence[],
    readonly description: string = '',
    public panelOpenState: boolean = false) {
  }
}

/**
* Represents a correspondence between two persons.
* A correspondence consists of all the letters exchanged between two persons (they are either the author or recipient).
*/
class Correspondence {

  constructor(
    readonly correspondent1: Correspondent,
    readonly correspondent2: Correspondent,
    readonly description: string = '',
    readonly noTranslation: boolean = false) {
  }
}

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss']
})
export class CorrespondenceComponent implements OnInit {

  /* gnd1: string;
  gnd2: string; */
  Christian_Goldbach = new Correspondent('Christian Goldbach', '(DE-588)118696149');
  Leonhard_Euler = new Correspondent('Leonhard Euler', '(DE-588)118531379');
  Johann_Albrecht_Euler = new Correspondent('Johann Albrecht Euler', '(DE-588)116610832');

  leoo: Book[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _beol: BeolService) { }

  ngOnInit() {
    /*  this._route.params.subscribe((params: Params) => {
       this.gnd1 = params['gnd1'];
       // console.log('author', this.author);
       this.gnd2 = params['gnd2'];
       // console.log('recipient', this.recipient);
     }); */

    this.leoo = [
      new Book('LEOO IVA.IV', '978-3-0348-0880-4', [
        new CorrespondenceGroup(this.Leonhard_Euler, [
          new Correspondence(this.Leonhard_Euler, this.Christian_Goldbach, 'Original', true),
          new Correspondence(this.Leonhard_Euler, this.Christian_Goldbach, 'Translation')
        ], 'from Leonhard Euler to Christian Goldbach'),
        new CorrespondenceGroup(this.Johann_Albrecht_Euler, [
          new Correspondence(this.Johann_Albrecht_Euler, this.Christian_Goldbach, 'Original', true),
          new Correspondence(this.Johann_Albrecht_Euler, this.Christian_Goldbach, 'Translation')
        ], 'from Johann Albrecht Euler to Christian Goldbach')
      ])
    ];

  }

  /**
    * Generate Gravsearch query to search for the correspondence between two persons.
    *
    * @param author GND of the first correspondent.
    * @param recipient GND of the second correspondent.
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
