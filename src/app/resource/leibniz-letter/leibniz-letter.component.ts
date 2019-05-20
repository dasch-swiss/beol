import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
    IncomingService,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadDateValue,
    ReadLinkValue,
    ReadListValue,
    ReadPropertyItem,
    ReadResource,
    ReadTextValue,
    ReadTextValueAsString,
    ResourceService
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

class LetterProps implements PropertyValues {
    id: ReadTextValue[] = [];
    author: ReadLinkValue[] = [];
    recipient: ReadLinkValue[] = [];
    date: ReadDateValue[] = [];
    subject: ReadListValue[] = [];
    text: ReadTextValueAsString[] = [];
    mentionedPerson: ReadLinkValue[] = [];
    replyTo: ReadLinkValue[] = [];
    location: ReadTextValue[] = [];
    title: ReadTextValue[] = [];
    letterID: ReadTextValue[] = [];
    language: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-leibniz-letter',
    templateUrl: './leibniz-letter.component.html',
    styleUrls: ['./leibniz-letter.component.scss']
})
export class LeibnizLetterComponent extends BeolResource {
    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    isLoadingText = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    letter: string;
    test: string;

    propIris: PropIriToNameMapping = {
        'id': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#beolIDs',
        'date': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#creationDate',
        'author': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasRecipientValue',
        'subject': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasSubject',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#mentionsPersonValue',
        'replyTo': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/leibniz/v2#isReplyToValue',
        'location': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#location',
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#title',
        'letterID': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/leibniz/v2#letterID',
        'language': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasLanguage',
    };

    props: LetterProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                private _appInitService: AppInitService
    ) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }

    // this is for our own (knora) resources
    initProps() {

        const props = new LetterProps();

        this.mapper(props);
        this.props = props;
        // get the id from the route leibnizLetter/:id e.g. l386
        this.getLeibnizLetterText(this.props.letterID[0].getContent());
    }


    private getLeibnizLetterText(filename) {
        // use a proxy url as described here:
        // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://leibniz-briefportal.adw-goe.de/letter/';
        const url = basePath + filename; // site that doesn’t send Access-Control-*

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {

                this.getLeibnizLetterBody(contents);
                this.isLoadingText = false;
            })
            .catch(e => console.log('Can’t access ' + url + ' response. Blocked by browser?', e));
    }


    private scriptSrcAttribute(element) {
        if (element.src) {
           const src = element.src.replace(this._appInitService.getSettings().appURL, 'http://leibniz-briefportal.adw-goe.de');
           return src;
        } else {
            return element.src;
        }
    }

    private getLeibnizLetterBody(contents) {
        // create a DOMParser to parse the HTML content
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(contents, 'text/html');


// get a list of all <script> tags in the new page
        const tmpScripts = parsedDocument.getElementsByTagName('script');
        if (tmpScripts.length > 0) {
            // push all of the document's script tags into an array
            // (to prevent dom manipulation while iterating over dom nodes)
            const scripts = [];
            for (let i = 0; i < tmpScripts.length; i++) {
                scripts.push(tmpScripts[i]);
            }

            // iterate over all script tags and create a duplicate tags for each
            for (let i = 0; i < scripts.length; i++) {
                const s = document.createElement('script');
                s.innerHTML = scripts[i].innerHTML;
                s.src = this.scriptSrcAttribute(scripts[i]);
                console.log('innnerhtml=')
                console.log(s.innerHTML)
                // add the new node to the page
                scripts[i].parentNode.appendChild(s);

                // remove the original (non-executing) node from the page
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
        console.log(parsedDocument.getElementsByTagName('body')[0].innerHTML);
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
