import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
import {BeolResource, PropertyValues, PropIriToNameMapping} from '../beol-resource';
import {Subscription} from 'rxjs';
import {BeolService} from '../../services/beol.service';

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
    errorMessage: any;
    navigationSubscription: Subscription;
    KnoraConstants = KnoraConstants;

    letter: string;

    propIris: PropIriToNameMapping = {
        'id': this.apiUrl + '/ontology/0801/beol/v2#beolIDs',
        'date': this.apiUrl + '/ontology/0801/beol/v2#creationDate',
        'author': this.apiUrl + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this.apiUrl + '/ontology/0801/beol/v2#hasRecipientValue',
        'facsimiles': this.apiUrl + '/ontology/0801/newton/v2#hasFacsimiles',
        'subject': this.apiUrl + '/ontology/0801/beol/v2#hasSubject',
        'text': this.apiUrl + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this.apiUrl + '/ontology/0801/beol/v2#mentionsPersonValue',
        'replyTo': this.apiUrl + '/ontology/0801/beol/v2#letterIsReplyToValue',
        'location': this.apiUrl + '/ontology/0801/beol/v2#location',
        'title': this.apiUrl + '/ontology/0801/beol/v2#title',
        'npID': this.apiUrl + '/ontology/0801/newton/v2#newtonProjectID',
    };

    props: LetterProps;

    constructor(protected _route: ActivatedRoute,
                protected _resourceService: ResourceService,
                protected _cacheService: OntologyCacheService,
                protected _incomingService: IncomingService,
                public location: Location,
                protected _beolService: BeolService,
                private http: HttpClient) {

        super(_route, _resourceService, _cacheService, _incomingService, _beolService);

    }
    // this is for our own (knora) resources
    initProps() {

        const props = new LetterProps();

        this.mapper(props);
        this.props = props;
        // get the id from the route newtonletter/:id e.g. NATP00120
        this.navigationSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            // and get the letter from newton page by this id
            this.getNewtonLetterText(this.props.npID[0].getContent());
        });
    }


    private getNewtonLetterText(filename) {

        this.isLoading = true;
        // use a proxy url as described here:
        // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const basePath = 'http://www.newtonproject.ox.ac.uk/view/texts/normalized/';

        const url = basePath + filename; // site that doesn’t send Access-Control-*


        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
                // console.log(contents);
                this.letter = contents;
                this.isLoading = false;
            })
            .catch(() => console.log('Can’t access ' + url + ' response. Blocked by browser?'));

        console.log(this.letter);

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/html',
        //         'Authorization': 'Basic YmlibGlvQGV4YW1wbGUuY29tOnRlc3Q='
        //     })
        // };
       // return this.http.get(url, httpOptions).subscribe(data => console.log(data));
    }
}
