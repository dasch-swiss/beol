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
    ReadUriValue,
    ResourceService
} from '@knora/core';
import { BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { Subscription } from 'rxjs';
import { BeolService } from '../../services/beol.service';
import { AppInitService } from '../../app-init.service';

class LetterProps implements PropertyValues {
    id: ReadTextValue[] = [];
    author: ReadLinkValue[] = [];
    recipient: ReadLinkValue[] = [];
    facsimiles: ReadUriValue[] = [];
    date: ReadDateValue[] = [];
    subject: ReadListValue[] = [];
    text: ReadTextValueAsString[] = [];
    mentionedPerson: ReadLinkValue[] = [];
    replyTo: ReadLinkValue[] = [];
    location: ReadTextValue[] = [];
    title: ReadTextValue[] = [];
    npID: ReadTextValue[] = [];
    language: ReadTextValue[] = [];

    [index: string]: ReadPropertyItem[];
}

@Component({
    selector: 'app-newton-letter',
    templateUrl: './newton-letter.component.html',
    styleUrls: ['./newton-letter.component.scss']
})
export class NewtonLetterComponent extends BeolResource {
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
        'facsimiles': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/newton/v2#hasFacsimiles',
        'subject': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasSubject',
        'text': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#mentionsPersonValue',
        'replyTo': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/newton/v2#isReplyToValue',
        'location': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#location',
        'title': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/beol/v2#title',
        'npID': this._appInitService.getSettings().ontologyIRI + '/ontology/0801/newton/v2#newtonProjectID',
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
        // get the id from the route newtonletter/:id e.g. NATP00120
        this.getNewtonLetterText(this.props.npID[0].getContent());
    }


    private getNewtonLetterText(filename) {
        // use a proxy url as described here:
        // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://www.newtonproject.ox.ac.uk/view/texts/normalized/';

        const url = basePath + filename; // site that doesn’t send Access-Control-*

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
                this.getNewtonLetterBody(contents);
                this.isLoadingText = false;
            })
            .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'));
    }

    private getNewtonLetterBody(contents) {
        let text = '';
        const html = new DOMParser().parseFromString(contents, 'text/html');
        const divs = html.getElementsByTagName('div');
        for (let divIt = 0; divIt < divs.length; divIt++) {
            const divEl = divs[divIt];
            if (divEl.id === 'tei') {
                for (let child = 0; child < divEl.children.length; child++) {
                    const divelement = this.imageSrcAttribute(divEl.children[child]);
                    text = text.concat(divelement.innerHTML);
                }
                this.letter = text;
            }
        }
    }
    private imageSrcAttribute(element) {
        const imgs = element.getElementsByTagName('img');
        for (let imgIt = 0; imgIt < imgs.length; imgIt++) {
            const image = imgs[imgIt];
            if (image.src) {
                image.src = image.src.replace(this._appInitService.getSettings().appURL, 'http://www.newtonproject.ox.ac.uk');
                console.log(this._appInitService.getSettings().appURL);
            }
        }
        return element;
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
