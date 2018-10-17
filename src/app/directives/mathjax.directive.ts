import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {KnoraConstants, OntologyInformation, ReadTextValueAsHtml} from '@knora/core';
import {BeolService} from '../services/beol.service';

declare var MathJax: {
    Hub: {
        Queue: (param: () => void) => void;
        Typeset: (param: object) => void;
    }
};

/**
 * This directive makes MathJax re-render the inserted HTML in case it is a TextValue (mathematical notation may have been inserted).
 */
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[mathJax]' })
export class MathJaxDirective implements OnChanges, OnInit {

    private _html: string; // the HTML to be inserted

    private _renderMath = false; // indicates if the math should be rendered by MathJax

    @Input()
    set renderMath(value) {
        // triggers ngOnChanges (state can be changed from outside, e.g., from a list of search results)
        this._renderMath = value;
    }

    get renderMath() {
        return this._renderMath;
    }

    @Input()
    // setter method for resource classes when being updated by parent component
    set mathJax(value: string) {
        this._html = value;
    }
    get mathJax() {
        return this._html;
    }

    @Input()
    // setter method for resource classes when being updated by parent component
    set valueObject(value: ReadTextValueAsHtml) {
        this._valueObject = value;
    }
    // getter method for resource classes (used in template)
    get valueObject() {
        return this._valueObject;
    }
    private _valueObject: ReadTextValueAsHtml;

    @Input('ontologyInfo') private ontologyInfo: OntologyInformation;
    @Input('bindEvents') private bindEvents: Boolean; // indicates if click and mouseover events have to be bound

    constructor(private el: ElementRef, private _beol: BeolService) {
    }

    /**
     * Binds a click event to standoff links that shows the referred resource in a dialog box.
     * @param targetElement the element that received the event.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event.target'])
    onClick(targetElement) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (
            this.bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a BEOL resource

            const referredResourceIri = targetElement.href;

            // TODO: the value object should handle this and check for the existence of the given referred resource
            const referredResourceType = this._valueObject.referredResources[referredResourceIri].type;

            this._beol.routeByResourceType(referredResourceType, referredResourceIri);

            // preventDefault (propagation)
            return false;
        } else if (
            targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a BEOL resource, activated from a parent element, e.g., a footnote (salsah-link containing a <sup>)

            const referredResourceIri = targetElement.parentElement.href;

            const referredResourceType = this._valueObject.referredResources[referredResourceIri].type;

            this._beol.routeByResourceType(referredResourceType, referredResourceIri);

            // preventDefault (propagation)
            return false;

        } else if (
            this.bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.RefMarker) >= 0) {

            // internal reference in a BEBB letter: scroll to note on page

            const indexOfHashtag = targetElement.parentElement.href.indexOf('#', '');

            if (indexOfHashtag !== -1) {

                const targetId = targetElement.parentElement.href.substr(indexOfHashtag + 1);

                const targetEle = document.getElementById(targetId);

                if (targetEle) {
                    targetEle.scrollIntoView();
                }

            }

            return false;

        } else if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a') {
            // open link in a new window
            window.open(targetElement.href, '_blank');
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    /**
     * Binds a mouseover event to the inserted elements.
     *
     * @param targetElement the element that received the event.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event.target'])
    onMouseEnter(targetElement) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {
            // console.log("mouseenter: internal link to: " + event.target.href);

            const referredResourceIri = targetElement.href;

            // TODO: the value object should handle this and check for the existence of the given referred resource
            const referredResourceType = this._valueObject.referredResources[referredResourceIri].type;

            // preventDefault (propagation)
            return false;
        } else if ( targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // salsah-link to a BEOL resource, activated from a parent element, e.g., a footnote (<sup> containing a salsah-link)

            const referredResourceIri = targetElement.parentElement.href;

            // TODO: the value object should handle this and check for the existence of the given referred resource
            const referredResourceType = this._valueObject.referredResources[referredResourceIri].type;

            // preventDefault (propagation)
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    ngOnInit() {

    }

    ngOnChanges() {

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
