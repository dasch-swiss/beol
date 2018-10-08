import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { KnoraConstants, OntologyInformation, ReadTextValueAsHtml } from '@knora/core';

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

    @Input()
    // setter method for resource classes when being updated by parent component
    set mathJax(value: string) {
        this._html = value;
    }
    get mathJax() {
        return this._html;
    }
    private _html: string; // the HTML to be inserted

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

    constructor(private el: ElementRef) {
    }

    /**
     * Binds a click event to standoff links that shows the referred resource in a dialog box.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event.target'])
    onClick(targetElement) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (
            this.bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // const config: MatDialogConfig = ResourceDialogComponent.createConfiguration(targetElement.href);
            // this.dialog.open(ResourceDialogComponent, config);

            // preventDefault (propagation)
            return false;
        } else if (
            targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {

            // const config: MatDialogConfig = ResourceDialogComponent.createConfiguration(targetElement.parentElement.href);

            // config.panelClass = 'resizable';

            // this.dialog.open(ResourceDialogComponent, config);

            // preventDefault (propagation)
            return false;

        } else if (
            this.bindEvents && targetElement.parentElement.nodeName.toLowerCase() === 'a'
            && targetElement.parentElement.className.toLowerCase().indexOf(KnoraConstants.RefMarker) >= 0) {

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
     * @param event the event fired on an element inserted by this directive.
     * @returns a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event.target'])
    onMouseEnter(targetElement) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0) {
            // console.log("mouseenter: internal link to: " + event.target.href);

            const referredResourceIri = targetElement.href;

            const resInfo = this.valueObject.getReferredResourceInfo(referredResourceIri, this.ontologyInfo);

            /* const config = new MatSnackBarConfig();
            config.duration = 2500; */

            // this.snackBar.open(resInfo, undefined, config);

            // preventDefault (propagation)
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    ngOnInit() {
        // console.log(this.bindEvents);
    }

    ngOnChanges() {

        // console.log(this.bindEvents);

        this.el.nativeElement.innerHTML = this._html;

        // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
        MathJax.Hub.Queue(() => {
            MathJax.Hub.Typeset(this.el.nativeElement);
        });

    }

}
