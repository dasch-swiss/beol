import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { AppInitService } from '../app-init.service';

@Directive({
    selector: '[appTeiLink]'
})
export class TeiLinkDirective implements OnChanges {

    private _resourceType: string; // the type of the resource to be converted to TEI

    @Input()
    set resourceType(value: string) {
        this._resourceType = value;
    }

    get resourceType(): string {
        return this._resourceType;
    }

    private _resourceIri: string; // the Iri of the resource to be converted to TEI

    @Input()
    set resourceIri(value: string) {
        this._resourceIri = value;
    }

    get resourceIri(): string {
        return this._resourceIri;
    }

    constructor(private el: ElementRef,
                private _appInitService: AppInitService) {
    }

    private generateTeiLink() {

        const settings = this._appInitService.getSettings();

        const teiConfig = settings.tei[this._resourceType];

        if (teiConfig !== undefined) {

            const teiLink = settings.externalApiURL + '/v2/tei/' + encodeURIComponent(this._resourceIri)
                + '?textProperty=' + encodeURIComponent(teiConfig.textProperty)
                + '&mappingIri=' + encodeURIComponent(teiConfig.mappingIRI)
                + '&gravsearchTemplateIri=' + encodeURIComponent(teiConfig.gravsearchTemplateIri)
                + '&teiHeaderXSLTIri=' + encodeURIComponent(teiConfig.teiHeaderXSLTIri);

            return teiLink;
        } else {
            return false;
        }
    }

    ngOnChanges() {

        // create link to the TEI representation of the given resource
        const teiLink = this.generateTeiLink();

        if (teiLink !== false) {
            this.el.nativeElement.innerHTML = `<a href="${teiLink}" target="_blank">TEI/XML</a>`;
        }

    }
}
