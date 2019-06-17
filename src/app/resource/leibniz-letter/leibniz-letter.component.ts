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
    ReadTextValueAsString, ReadUriValue,
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
    number: ReadTextValue[] = [];
    title: ReadTextValue[] = [];
    letterURI: ReadUriValue[] = [];
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
    letter;

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
        'letterURI': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/leibniz/v2#letterHasURI',
        'language': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#letterHasNumber',
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
        const basePath = 'http://leibniz.sub.uni-goettingen.de/solr/leibniz/select?sort=type+asc&q=id%3A';
        const basePathOR =  '+OR+(doc_id%3A';
        const basePathAnd = '+AND+type%3Avariante)&rows=9999&wt=json';
        const apiUrl = basePath + filename + basePathOR + filename + basePathAnd; // site that doesn’t send Access-Control-*

        fetch(proxyurl + apiUrl) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.json())
            .then(contents => {

                this.getLeibnizLetterBody(contents);
                this.isLoadingText = false;
            })
            .catch(e => console.log('Can’t access ' + apiUrl + ' response. Blocked by browser?', e));
    }


    private getLeibnizImages(element) {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://leibniz.sub.uni-goettingen.de/solr/leibniz/select?q=id%3A';
        const basePathTail = '&rows=9999&wt=json';

        const imgs = element.getElementsByTagName('span');
        for (let imgIt = 0; imgIt < imgs.length; imgIt++) {
            const image = imgs[imgIt];
            if (image.getAttribute('class') === 'reference -image') {
                const filename = image.getAttribute('data-id');
                const apiUrl = basePath + filename + basePathTail; // get the svg element
                fetch(proxyurl + apiUrl) // https://cors-anywhere.herokuapp.com/https://example.com
                    .then(response => response.json())
                    .then(contents => {
                        const svgElement = this.getLeibnizImageSVG(contents);
                        image.replaceWith(svgElement);
                    });

                console.log(this._appInitService.getSettings().appURL);
            }

        }
        return element;
    }

    private getLeibnizImageSVG(contents) {
        const svg = new DOMParser().parseFromString(contents.response.docs[0].svg_code, 'text/html');
        return svg.getElementsByTagName('svg')[0];
    }

    private getLeibnizLetterBody(contents) {
      const html = new DOMParser().parseFromString(contents.response.docs[0].volltext, 'text/html');
      this.getLeibnizImages(html.body);
      console.log(html.body);
      this.letter = html.body;
      console.log('innerHTML')
      console.log(this.letter);
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
