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

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-newton-letter',
    templateUrl: './newton-letter.component.html',
    styleUrls: ['./newton-letter.component.scss']
})
export class NewtonLetterComponent extends BeolResource {
    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    isLoadingText = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;

    letter: string;
    test: string;

    ontologyIri = this._appInitService.config['ontologyIRI'];

    propIris: PropIriToNameMapping = {
        'id': this.ontologyIri + '/ontology/0801/beol/v2#beolIDs',
        'date': this.ontologyIri + '/ontology/0801/beol/v2#creationDate',
        'author': this.ontologyIri + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this.ontologyIri + '/ontology/0801/beol/v2#hasRecipientValue',
        'facsimiles': this.ontologyIri + '/ontology/0801/newton/v2#hasFacsimiles',
        'subject': this.ontologyIri + '/ontology/0801/beol/v2#hasSubject',
        'text': this.ontologyIri + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this.ontologyIri + '/ontology/0801/beol/v2#mentionsPersonValue',
        'replyTo': this.ontologyIri + '/ontology/0801/newton/v2#isReplyToValue',
        'location': this.ontologyIri + '/ontology/0801/beol/v2#location',
        'title': this.ontologyIri + '/ontology/0801/beol/v2#title',
        'npID': this.ontologyIri + '/ontology/0801/newton/v2#newtonProjectID',
        'language': this.ontologyIri + '/ontology/0801/beol/v2#letterHasLanguage',
    };

    props: LetterProps;

    constructor(
        @Inject(DspApiConnectionToken) protected _dspApiConnection: KnoraApiConnection,
        protected _route: ActivatedRoute,
        protected _incomingService: IncomingService,
        public location: Location,
        protected _beolService: BeolService,
        private _appInitService: AppInitService
    ) {

        super(_dspApiConnection, _route, _incomingService, _beolService);

    }

    // this is for our own (knora) resources
    initProps() {

        const props = new LetterProps();

        this.mapper(props);
        this.props = props;
        // get the id from the route newtonletter/:id e.g. NATP00120
        this.getNewtonLetterText(this.props.npID[0].strval);
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
                image.src = image.src.replace(this._appInitService.config['appURL'], 'http://www.newtonproject.ox.ac.uk');
                // console.log(this._appInitService.config['appURL']);
            }
        }
        return element;
    }
    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }
}
