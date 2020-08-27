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
    ReadUriValue,
    ReadValue,
    ResourceClassAndPropertyDefinitions
} from '@dasch-swiss/dsp-js';
import { DspApiConnectionToken, AppInitService } from '@dasch-swiss/dsp-ui';
import { Subscription } from 'rxjs';
import { IncomingService } from 'src/app/services/incoming.service';
import { BeolService } from '../../services/beol.service';
import { BeolCompoundResource, PropertyValues, PropIriToNameMapping, BeolResource } from '../beol-resource';

class LetterProps implements PropertyValues {
    id: ReadTextValue[] = [];
    author: ReadLinkValue[] = [];
    recipient: ReadLinkValue[] = [];
    figure: ReadLinkValue[] = [];
    date: ReadDateValue[] = [];
    subject: ReadListValue[] = [];
    text: ReadTextValue[] = [];
    mentionedPerson: ReadLinkValue[] = [];
    language: ReadTextValue[] = [];
    number: ReadTextValue[] = [];
    original: ReadLinkValue[] = [];
    repertorium: ReadTextValue[] = [];
    translation: ReadLinkValue[] = [];
    published: ReadLinkValue[] = [];
    replyTo: ReadLinkValue[] = [];
    location: ReadTextValue[] = [];
    title: ReadTextValue[] = [];
    sysnum: ReadTextValue[] = [];
    comment: ReadTextValue[] = [];
    letterURI: ReadUriValue[] = [];

    [index: string]: ReadValue[];
}

@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.scss']
})
export class LetterComponent extends BeolResource {

    iri: string;
    resource: BeolCompoundResource;
    ontologyInfo: ResourceClassAndPropertyDefinitions;
    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`
    isLoading = true;
    errorMessage: any;
    navigationSubscription: Subscription;
    dspConstants = Constants;

    ontologyIri = this._appInitService.config['ontologyIRI'];

    propIris: PropIriToNameMapping = {
        'id': this.ontologyIri + '/ontology/0801/beol/v2#beolIDs',
        'date': this.ontologyIri + '/ontology/0801/beol/v2#creationDate',
        'author': this.ontologyIri + '/ontology/0801/beol/v2#hasAuthorValue',
        'recipient': this.ontologyIri + '/ontology/0801/beol/v2#hasRecipientValue',
        'figure': this.ontologyIri + '/ontology/0801/beol/v2#hasFigureValue',
        'subject': this.ontologyIri + '/ontology/0801/beol/v2#hasSubject',
        'text': this.ontologyIri + '/ontology/0801/beol/v2#hasText',
        'mentionedPerson': this.ontologyIri + '/ontology/0801/beol/v2#mentionsPersonValue',
        'language': this.ontologyIri + '/ontology/0801/beol/v2#letterHasLanguage',
        'number': this.ontologyIri + '/ontology/0801/beol/v2#letterHasNumber',
        'original': this.ontologyIri + '/ontology/0801/beol/v2#letterHasOriginalValue',
        'repertorium': this.ontologyIri + '/ontology/0801/beol/v2#letterHasRepertoriumNumber',
        'translation': this.ontologyIri + '/ontology/0801/beol/v2#letterHasTranslationValue',
        'published': this.ontologyIri + '/ontology/0801/beol/v2#letterIsPublishedValue',
        'replyTo': this.ontologyIri + '/ontology/0801/beol/v2#letterIsReplyToValue',
        'location': this.ontologyIri + '/ontology/0801/beol/v2#location',
        'title': this.ontologyIri + '/ontology/0801/beol/v2#title',
        'sysnum': this.ontologyIri + '/ontology/0801/beol/v2#hasSystemNumber',
        'standoff': this.ontologyIri + '/ontology/knora-api/v2#hasStandoffLinkToValue',
        'comment': this.ontologyIri + '/ontology/0801/beol/v2#comment',
        'letterURI': this.ontologyIri + '/ontology/0801/beol/v2#letterHasURI',
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

    initProps() {

        // request subject index so it is cached
        // this._dspApiConnection.v2.list.getList('http://rdfh.ch/lists/0801/subject_index').subscribe((list: ListNodeV2) => {

            const props = new LetterProps();

            this.mapper(props);

            this.props = props;
        // });

    }

    showIncomingRes(resIri, resType) {
        this._beolService.routeByResourceType(resType, resIri);
    }

}
