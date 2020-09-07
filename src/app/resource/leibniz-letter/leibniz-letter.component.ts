import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Constants,
    KnoraApiConnection,
    ReadDateValue,
    ReadLinkValue,
    ReadListValue,
    ReadTextValue,
    ReadTextValueAsString,
    ReadUriValue,
    ReadValue,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken, AppInitService } from '@dasch-swiss/dsp-ui';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { BeolCompoundResource, BeolResource, PropertyValues, PropIriToNameMapping } from '../beol-resource';
import { HttpClient } from '@angular/common/http';

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
    citation: ReadLinkValue[] = [];

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-leibniz-letter',
    templateUrl: './leibniz-letter.component.html',
    styleUrls: ['./leibniz-letter.component.scss']
})
export class LeibnizLetterComponent extends BeolResource {
    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    isLoadingText = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;
    letter;

    ontologyIri = this._appInitService.config['ontologyIRI'];

    propIris: PropIriToNameMapping = {
        'id': this.ontologyIri + '/ontology/0801/beol/v2#beolIDs',
        'date': this.ontologyIri + '/ontology/0801/beol/v2#creationDate',
        'author': this.ontologyIri + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this.ontologyIri + '/ontology/0801/beol/v2#hasRecipientValue',
        'subject': this.ontologyIri + '/ontology/0801/beol/v2#hasSubject',
        'text': this.ontologyIri + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this.ontologyIri + '/ontology/0801/beol/v2#mentionsPersonValue',
        'replyTo': this.ontologyIri + '/ontology/0801/leibniz/v2#isReplyToValue',
        'location': this.ontologyIri + '/ontology/0801/beol/v2#location',
        'title': this.ontologyIri + '/ontology/0801/beol/v2#title',
        'letterID': this.ontologyIri + '/ontology/0801/leibniz/v2#letterID',
        'letterURI': this.ontologyIri + '/ontology/0801/beol/v2#letterHasURI',
        'language': this.ontologyIri + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': this.ontologyIri + '/ontology/0801/beol/v2#letterHasNumber',
        'citation': this.ontologyIri + '/ontology/0801/leibniz/v2#citationValue',
    };

    props: LetterProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService,
        private _http: HttpClient
    ) {

        super(_dspApiConnection, _route, _incomingService, _beolService);

    }

    // this is for our own (knora) resources
    initProps() {

        const props = new LetterProps();

        this.mapper(props);
        this.props = props;

        // get the id from the route leibnizLetter/:id e.g. l386
        this.getLeibnizLetterText(this.props.letterID[0].strval);
    }


    private getLeibnizLetterText(filename) {
        // use a proxy url as described here:
        // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
        // const proxyurl = 'https://cors-anywhere.herokuapp.com//';
        const basePath = this._appInitService.config['leibnizApi'] + 'select?sort=type+asc&q=id%3A';
        const basePathOR = '+OR+(doc_id%3A';
        const basePathAnd = '+AND+type%3Avariante)&rows=9999&wt=json';
        const apiUrl = basePath + filename + basePathOR + filename + basePathAnd; // site that doesn’t send Access-Control-*

        this._http.get(apiUrl) // could be proxyurl + apiURL as https://cors-anywhere.herokuapp.com/https://example.com
            //.then(response => response.json())
            .subscribe(contents => {

                this.getLeibnizLetterBody(contents);
                this.isLoadingText = false;
            },
                err => console.log('Can’t access ' + apiUrl + ' response. Blocked by browser?', err)
            );
    }


    private getLeibnizImages(element) {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = this._appInitService.config['leibnizApi'] + 'select?q=id%3A';
        const basePathTail = '&rows=9999&wt=json';

        const imgs = element.getElementsByTagName('span');
        for (let imgIt = 0; imgIt < imgs.length; imgIt++) {
            const image = imgs[imgIt];
            if (image.getAttribute('class') === 'reference -image') {
                const filename = image.getAttribute('data-id');
                const apiUrl = basePath + filename + basePathTail; // get the svg element
                this._http.get(proxyurl + apiUrl) // https://cors-anywhere.herokuapp.com/https://example.com
                    //.then(response => response.json())
                    .subscribe(contents => {
                        const svgElement = this.getLeibnizImageSVG(contents);
                        image.replaceWith(svgElement);
                    });

                // console.log(this._appInitService.config['appURL']);
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
        this.letter = html.body;
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
