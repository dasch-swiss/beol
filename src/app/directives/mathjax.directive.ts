import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {
    KnoraConstants,
    OntologyInformation,
    ReadGeomValue,
    ReadLinkValue,
    ReadResource,
    ReadResourcesSequence, ReadStillImageFileValue,
    ReadTextValueAsHtml
} from '@knora/core';
import {BeolService} from '../services/beol.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

declare var MathJax: {
    Hub: {
        Queue: (param: () => void) => void;
        Typeset: (param: object) => void;
    }
};

/**
 * This directive makes MathJax render the mathematical notation contained in the inserted HTML.
 */
// tslint:disable-next-line:directive-selector
@Directive({selector: '[mathJax]'})
export class MathJaxDirective implements OnChanges {

    private _renderMath = false; // indicates if mathematical notation should be rendered by MathJax

    @Input()
    set renderMath(value) {
        this._renderMath = value;
    }

    get renderMath() {
        return this._renderMath;
    }

    private _html: string; // the HTML to be inserted (received from Knora)

    @Input()
    set mathJax(value: string) {
        this._html = value;
    }

    get mathJax() {
        return this._html;
    }

    private _valueObject: ReadTextValueAsHtml; // the value object with standoff information (standoff links in HTML)

    @Input()
    set valueObject(value: ReadTextValueAsHtml) {
        this._valueObject = value;
    }

    get valueObject() {
        return this._valueObject;
    }

    private _ontologyInfo: OntologyInformation; // ontology information for the text value (HTML) and its standoff links

    @Input()
    set ontologyInfo(value) {
        this._ontologyInfo = value;
    }

    get ontologyInfo() {
        return this._ontologyInfo;
    }

    private _bindEvents: Boolean; // indicates if click and mouseover events have to be bound (HostListener)

    @Input()
    set bindEvents(value) {
        this._bindEvents = value;
    }

    get bindEvents() {
        return this._bindEvents;
    }

    constructor(private el: ElementRef,
                private _beol: BeolService,
                private _snackBar: MatSnackBar) {
    }

    /**
     * Given a region resources that links to the related file value, creates a IIIF URL for the image region.
     * @param regionRes the region resource.
     */
    private createIIIFURLFromRegion(regionRes: ReadResource) {

        const hasGeometryProp = 'http://api.knora.org/ontology/knora-api/v2#hasGeometry';

        const geomValue = regionRes.properties[hasGeometryProp][0] as ReadGeomValue;

        const hasRegionValue = 'http://api.knora.org/ontology/knora-api/v2#isRegionOfValue';

        const hasFileValue = 'http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue';

        const fileValue = (regionRes.properties[hasRegionValue][0] as ReadLinkValue).referredResource.properties[hasFileValue][0] as ReadStillImageFileValue;

        // build Sipi URL
        const x1 = Math.min(geomValue.geometry.points[0].x, geomValue.geometry.points[1].x);
        const x2 = Math.max(geomValue.geometry.points[0].x, geomValue.geometry.points[1].x);

        const y1 = Math.min(geomValue.geometry.points[0].y, geomValue.geometry.points[1].y);
        const y2 = Math.max(geomValue.geometry.points[0].y, geomValue.geometry.points[1].y);

        const regionWidth = (x2 - x1) * 100;
        const regionHeight = (y2 - y1) * 100;

        const pct = x1 * 100 + ',' + y1 * 100 + ',' + regionWidth + ',' + regionHeight;

        const sipiURL = fileValue.imageServerIIIFBaseURL + '/' + fileValue.imageFilename + '/pct:' + pct + '/pct:20/0/default.jpg';

        return sipiURL;
    }

    /**
     * Binds a click event to standoff links that showing the referred resource using the apt template (route).
     *
     * Events only fire if bindEvents is set to true.
     *
     * @param targetElement the element that received the event.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event.target'])
    onClick(targetElement) {

        if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a Knora resource

            const referredResourceIri = targetElement.href;

            // TODO: the value object should handle this and check for the existence of the given referred resource
            const referred_res = this._valueObject.referredResources[referredResourceIri];

            this._beol.routeByResourceType(referred_res.type, referredResourceIri);

            // preventDefault (propagation)
            return false;

        } else if (this._bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a BEOL resource, activated from a parent element, e.g., a footnote (salsah-link containing a <sup>)

            const referredResourceIri = targetElement.parentElement.href;

            // TODO: the value object should handle this and check for the existence of the given referred resource
            const referredResourceType = this._valueObject.referredResources[referredResourceIri].type;

            this._beol.routeByResourceType(referredResourceType, referredResourceIri);

            // preventDefault (propagation)
            return false;

        } else if (this._bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.RefMarker) >= 0) {

            // internal reference in a BEBB letter: scroll to footnote on page

            const indexOfHashtag = targetElement.parentElement.href.indexOf('#', '');

            if (indexOfHashtag !== -1) {

                const targetId = targetElement.parentElement.href.substr(indexOfHashtag + 1);

                const targetEle = document.getElementById(targetId);

                if (targetEle) {
                    targetEle.scrollIntoView();
                }

            }

            // preventDefault (propagation)
            return false;

        } else if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a') {
            // external link

            // open link in a new window
            window.open(targetElement.href, '_blank');

            // preventDefault (propagation)
            return false;
        } else if (this._bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a') {
            // external link in parent element

            // open link in a new window
            window.open(targetElement.parentElement.href, '_blank');

            // preventDefault (propagation)
            return false;
        } else {
            // preventDefault (propagation)
            return false;
        }

    }

    /**
     * Binds a mouseover event to standoff links showing information about the referred resource.
     *
     * Events only fire if bindEvents is set to true.
     *
     * @param targetElement the element that received the event.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event.target'])
    onMouseEnter(targetElement) {

        if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a Knora resource

            const referredResourceIri = targetElement.href;

            const resInfo: string = this.valueObject.getReferredResourceInfo(referredResourceIri, this.ontologyInfo);

            // TODO: the value object should handle this and check for the existence of the given referred resource
            // const referred_res = this._valueObject.referredResources[referredResourceIri];

            // check if it links to a figure region
            /*if (referred_res.type === KnoraConstants.Region && referred_res.label.trim().includes('-F') && targetElement.getAttribute('start')) {

                // it is a figure: create IIIF URL

                this._beol.getRegionDimsAndFile(referred_res.id).subscribe(
                    (reg: ReadResourcesSequence) => {
                        if (reg.resources.length === 1) {
                            const iiifUrl = this.createIIIFURLFromRegion(reg.resources[0]);
                            targetElement.innerHTML = `<img src="${iiifUrl}"/>`;
                        }
                    }
                );
            }*/

            const config = new MatSnackBarConfig();
            config.duration = 2500;

            this._snackBar.open(resInfo, undefined, config);

            // preventDefault (propagation)
            return false;
        } else if (this._bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a BEOL resource, activated from a parent element, e.g., a footnote (<sup> containing a salsah-link)

            const referredResourceIri = targetElement.parentElement.href;

            const resInfo = this.valueObject.getReferredResourceInfo(referredResourceIri, this.ontologyInfo);

            const config = new MatSnackBarConfig();
            config.duration = 2500;

            this._snackBar.open(resInfo, undefined, config);

            // preventDefault (propagation)
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    ngOnChanges() {
        // is triggered when input setter methods are called

        this.el.nativeElement.innerHTML = this._html;

        // only render the math if the flag is set to true (onChanges is triggered when status of _renderMath changes)
        if (this._renderMath) {

            // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
            MathJax.Hub.Queue(() => {
                MathJax.Hub.Typeset(this.el.nativeElement);
            });
        }

    }

}
