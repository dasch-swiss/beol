import { Component, OnInit } from '@angular/core';
import { ApiServiceResult, ConvertJSONLD, ReadResourcesSequence, SearchService } from '@knora/core';
import { BeolService } from '../services/beol.service';
import { ActivatedRoute, Params } from '@angular/router';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
