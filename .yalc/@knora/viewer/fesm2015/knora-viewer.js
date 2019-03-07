import { Component, ElementRef, EventEmitter, Input, Output, HostListener, NgModule } from '@angular/core';
import { KnoraConstants, Point2D, DateRangeSalsah, Precision, ConvertJSONLD, IncomingService, OntologyCacheService, ResourceService, SearchParamsService, SearchService, KuiCoreModule } from '@knora/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KuiActionModule } from '@knora/action';

class AnnotationComponent {
    constructor() { }
    ngOnInit() {
    }
}
AnnotationComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-annotation',
                template: `<p>
  annotation works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
AnnotationComponent.ctorParameters = () => [];

class AudioComponent {
    constructor() { }
    ngOnInit() {
    }
}
AudioComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-audio',
                template: `<p>
  audio works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
AudioComponent.ctorParameters = () => [];

class CollectionComponent {
    constructor() { }
    ngOnInit() {
    }
}
CollectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-collection',
                template: `<p>
  collection works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
CollectionComponent.ctorParameters = () => [];

class DddComponent {
    constructor() { }
    ngOnInit() {
    }
}
DddComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-ddd',
                template: `<p>
  ddd works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DddComponent.ctorParameters = () => [];

class DocumentComponent {
    constructor() { }
    ngOnInit() {
    }
}
DocumentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-document',
                template: `<p>
  document works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DocumentComponent.ctorParameters = () => [];

class LinkObjComponent {
    constructor() { }
    ngOnInit() {
    }
}
LinkObjComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-link-obj',
                template: `<p>
  link-obj works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
LinkObjComponent.ctorParameters = () => [];

class MovingImageComponent {
    constructor() { }
    ngOnInit() {
    }
}
MovingImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-moving-image',
                template: `<p>
  moving-image works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
MovingImageComponent.ctorParameters = () => [];

class ObjectComponent {
    constructor() { }
    ngOnInit() {
    }
}
ObjectComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-object',
                template: `<p>
  object works!
</p>`,
                styles: [``]
            },] },
];
/** @nocollapse */
ObjectComponent.ctorParameters = () => [];

class RegionComponent {
    constructor() { }
    ngOnInit() {
    }
}
RegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-region',
                template: `<p>
  region works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
RegionComponent.ctorParameters = () => [];

/**
 * Represents a region.
 * Contains a reference to the resource representing the region and its geometries.
 */
class ImageRegion {
    /**
     *
     * @param regionResource a resource of type Region
     */
    constructor(regionResource) {
        this.regionResource = regionResource;
    }
    /**
     * Get all geometry information belonging to this region.
     *
     * @returns
     */
    getGeometries() {
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    }
}
/**
 * Represents an image including its regions.
 */
class StillImageRepresentation {
    /**
     *
     * @param stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param regions the regions belonging to the image.
     */
    constructor(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
}
/**
 * Represents a geometry belonging to a specific region.
 */
class GeometryForRegion {
    /**
     *
     * @param geometry the geometrical information.
     * @param region the region the geometry belongs to.
     */
    constructor(geometry, region) {
        this.geometry = geometry;
        this.region = region;
    }
}
/**
 * This component creates a OpenSeadragon viewer instance.
 * Accepts an array of ReadResource containing (among other resources) ReadStillImageFileValues to be rendered.
 * @member resources - resources containing (among other resources) the StillImageFileValues and incoming regions to be rendered. (Use as angular @Input data binding property.)
 */
class StillImageComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.regionHovered = new EventEmitter();
        this.regions = {};
    }
    /**
     * Calculates the surface of a rectangular region.
     *
     * @param geom the region's geometry.
     * @returns the surface.
     */
    static surfaceOfRectangularRegion(geom) {
        if (geom.type !== 'rectangle') {
            console.log('expected rectangular region, but ' + geom.type + ' given');
            return 0;
        }
        const w = Math.max(geom.points[0].x, geom.points[1].x) - Math.min(geom.points[0].x, geom.points[1].x);
        const h = Math.max(geom.points[0].y, geom.points[1].y) - Math.min(geom.points[0].y, geom.points[1].y);
        return w * h;
    }
    /**
     * Prepare tile sources from the given sequence of [[ReadStillImageFileValue]].
     *
     * @param imagesToDisplay the given file values to de displayed.
     * @returns the tile sources to be passed to OSD viewer.
     */
    static prepareTileSourcesFromFileValues(imagesToDisplay) {
        let imageXOffset = 0;
        const imageYOffset = 0;
        const tileSources = [];
        for (const image of imagesToDisplay) {
            const sipiBasePath = image.imageServerIIIFBaseURL + '/' + image.imageFilename;
            const width = image.dimX;
            const height = image.dimY;
            // construct OpenSeadragon tileSources according to https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#open
            tileSources.push({
                // construct IIIF tileSource configuration according to
                // http://iiif.io/api/image/2.1/#technical-properties
                // see also http://iiif.io/api/image/2.0/#a-implementation-notes
                'tileSource': {
                    '@context': 'http://iiif.io/api/image/2/context.json',
                    '@id': sipiBasePath,
                    'height': height,
                    'width': width,
                    'profile': ['http://iiif.io/api/image/2/level2.json'],
                    'protocol': 'http://iiif.io/api/image',
                    'tiles': [{
                            'scaleFactors': [1, 2, 4, 8, 16, 32],
                            'width': 1024
                        }]
                },
                'x': imageXOffset,
                'y': imageYOffset
            });
            imageXOffset++;
        }
        return tileSources;
    }
    ngOnChanges(changes) {
        if (changes['images'] && changes['images'].isFirstChange()) {
            this.setupViewer();
        }
        if (changes['images']) {
            this.openImages();
            this.renderRegions();
            this.unhighlightAllRegions();
            if (this.activateRegion !== undefined) {
                this.highlightRegion(this.activateRegion);
            }
        }
        else if (changes['activateRegion']) {
            this.unhighlightAllRegions();
            if (this.activateRegion !== undefined) {
                this.highlightRegion(this.activateRegion);
            }
        }
    }
    ngOnInit() {
        // initialisation is done on first run of ngOnChanges
    }
    ngOnDestroy() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = undefined;
        }
    }
    /**
     * Renders all ReadStillImageFileValues to be found in [[this.images]].
     * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional ReadStillImageFileValues were added to this.images after creation/assignment of the this.images array.)
     */
    updateImages() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.openImages();
    }
    /**
     * Renders all regions to be found in [[this.images]].
     * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional regions were added to the resources.images)
     */
    updateRegions() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.renderRegions();
    }
    /**
     * Highlights the polygon elements associated with the given region.
     *
     * @param regionIri the Iri of the region whose polygon elements should be highlighted..
     */
    highlightRegion(regionIri) {
        const activeRegion = this.regions[regionIri];
        if (activeRegion !== undefined) {
            for (const pol of activeRegion) {
                pol.setAttribute('class', 'roi-svgoverlay active');
            }
        }
    }
    /**
     * Unhighlights the polygon elements of all regions.
     *
     */
    unhighlightAllRegions() {
        for (const reg in this.regions) {
            if (this.regions.hasOwnProperty(reg)) {
                for (const pol of this.regions[reg]) {
                    pol.setAttribute('class', 'roi-svgoverlay');
                }
            }
        }
    }
    /**
     * Initializes the OpenSeadragon viewer
     */
    setupViewer() {
        const viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osd-container')[0];
        const osdOptions = {
            element: viewerContainer,
            sequenceMode: true,
            showReferenceStrip: true,
            showNavigator: true,
            zoomInButton: 'KUI_OSD_ZOOM_IN',
            zoomOutButton: 'KUI_OSD_ZOOM_OUT',
            previousButton: 'KUI_OSD_PREV_PAGE',
            nextButton: 'KUI_OSD_NEXT_PAGE',
            homeButton: 'KUI_OSD_HOME',
            fullPageButton: 'KUI_OSD_FULL_PAGE',
            rotateLeftButton: 'KUI_OSD_ROTATE_LEFT',
            rotateRightButton: 'KUI_OSD_ROTATE_RIGHT' // doesn't work yet
        };
        this.viewer = new OpenSeadragon.Viewer(osdOptions);
        this.viewer.addHandler('full-screen', function (args) {
            if (args.fullScreen) {
                viewerContainer.classList.add('fullscreen');
            }
            else {
                viewerContainer.classList.remove('fullscreen');
            }
        });
        this.viewer.addHandler('resize', function (args) {
            args.eventSource.svgOverlay().resize();
        });
    }
    /**
     * Adds all images in this.images to the viewer.
     * Images are positioned in a horizontal row next to each other.
     */
    openImages() {
        // imageXOffset controls the x coordinate of the left side of each image in the OpenSeadragon viewport coordinate system.
        // The first image has its left side at x = 0, and all images are scaled to have a width of 1 in viewport coordinates.
        // see also: https://openseadragon.github.io/examples/viewport-coordinates/
        const fileValues = this.images.map((img) => {
            return img.stillImageFileValue;
        });
        // display only the defined range of this.images
        const tileSources = StillImageComponent.prepareTileSourcesFromFileValues(fileValues);
        this.removeOverlays();
        this.viewer.open(tileSources);
    }
    /**
     * Removes SVG overlays from the DOM.
     */
    removeOverlays() {
        for (const reg in this.regions) {
            if (this.regions.hasOwnProperty(reg)) {
                for (const pol of this.regions[reg]) {
                    if (pol instanceof SVGPolygonElement) {
                        pol.remove();
                    }
                }
            }
        }
        this.regions = {};
        // TODO: make this work by using osdviewer's addOverlay method
        this.viewer.clearOverlays();
    }
    /**
     * Adds a ROI-overlay to the viewer for every region of every image in this.images
     */
    renderRegions() {
        this.removeOverlays();
        let imageXOffset = 0; // see documentation in this.openImages() for the usage of imageXOffset
        for (const image of this.images) {
            const aspectRatio = (image.stillImageFileValue.dimY / image.stillImageFileValue.dimX);
            // collect all geometries belonging to this page
            const geometries = [];
            image.regions.map((reg) => {
                this.regions[reg.regionResource.id] = [];
                const geoms = reg.getGeometries();
                geoms.map((geom) => {
                    const geomForReg = new GeometryForRegion(geom.geometry, reg.regionResource);
                    geometries.push(geomForReg);
                });
            });
            // sort all geometries belonging to this page
            geometries.sort((geom1, geom2) => {
                if (geom1.geometry.type === 'rectangle' && geom2.geometry.type === 'rectangle') {
                    const surf1 = StillImageComponent.surfaceOfRectangularRegion(geom1.geometry);
                    const surf2 = StillImageComponent.surfaceOfRectangularRegion(geom2.geometry);
                    // if reg1 is smaller than reg2, return 1
                    // reg1 then comes after reg2 and thus is rendered later
                    if (surf1 < surf2) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    return 0;
                }
            });
            // render all geometries for this page
            for (const geom of geometries) {
                const geometry = geom.geometry;
                this.createSVGOverlay(geom.region.id, geometry, aspectRatio, imageXOffset, geom.region.label);
            }
            imageXOffset++;
        }
    }
    /**
     * Creates and adds a ROI-overlay to the viewer
     * @param regionIri the Iri of the region.
     * @param geometry - the geometry describing the ROI
     * @param aspectRatio -  the aspectRatio (h/w) of the image on which the geometry should be placed
     * @param xOffset -  the x-offset in Openseadragon viewport coordinates of the image on which the geometry should be placed
     * @param toolTip -  the tooltip which should be displayed on mousehover of the svg element
     */
    createSVGOverlay(regionIri, geometry, aspectRatio, xOffset, toolTip) {
        const lineColor = geometry.lineColor;
        const lineWidth = geometry.lineWidth;
        let svgElement;
        switch (geometry.type) {
            case 'rectangle':
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); // yes, we render rectangles as svg polygon elements
                this.addSVGAttributesRectangle(svgElement, geometry, aspectRatio, xOffset);
                break;
            case 'polygon':
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                this.addSVGAttributesPolygon(svgElement, geometry, aspectRatio, xOffset);
                break;
            case 'circle':
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                this.addSVGAttributesCircle(svgElement, geometry, aspectRatio, xOffset);
                break;
            default:
                console.log('ERROR: StillImageOSDViewerComponent.createSVGOverlay: unknown geometryType: ' + geometry.type);
                return;
        }
        svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
        svgElement.setAttribute('class', 'roi-svgoverlay');
        svgElement.setAttribute('style', 'stroke: ' + lineColor + '; stroke-width: ' + lineWidth + 'px;');
        // event when a region is clicked (output)
        svgElement.addEventListener('click', () => {
            this.regionHovered.emit(regionIri);
        }, false);
        const svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        svgTitle.textContent = toolTip;
        const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        svgGroup.appendChild(svgTitle);
        svgGroup.appendChild(svgElement);
        const overlay = this.viewer.svgOverlay();
        overlay.node().appendChild(svgGroup); // TODO: use method osdviewer's method addOverlay
        this.regions[regionIri].push(svgElement);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'rectangle' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'polygon' (sic))
     * @param geometry - the geometry describing the rectangle
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesRectangle(svgElement, geometry, aspectRatio, xOffset) {
        const pointA = geometry.points[0];
        const pointB = geometry.points[1];
        // geometry.points contains two diagonally opposed corners of the rectangle, but the order of the corners is arbitrary.
        // We therefore construct the upperleft (UL), lowerright (LR), upperright (UR) and lowerleft (LL) positions of the corners with min and max operations.
        const positionUL = new Point2D(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        const positionLR = new Point2D(Math.max(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        const positionUR = new Point2D(Math.max(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        const positionLL = new Point2D(Math.min(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        const points = [positionUL, positionUR, positionLR, positionLL];
        const viewCoordPoints = this.image2ViewPortCoords(points, aspectRatio, xOffset);
        const pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute('points', pointsString);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'polygon' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'polygon')
     * @param geometry - the geometry describing the polygon
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesPolygon(svgElement, geometry, aspectRatio, xOffset) {
        const viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        const pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute('points', pointsString);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'circle' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'circle')
     * @param geometry - the geometry describing the circle
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesCircle(svgElement, geometry, aspectRatio, xOffset) {
        const viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        const cx = String(viewCoordPoints[0].x);
        const cy = String(viewCoordPoints[0].y);
        // geometry.radius contains not the radius itself, but the coordinates of a (arbitrary) point on the circle.
        // We therefore have to calculate the length of the vector geometry.radius to get the actual radius. -> sqrt(x^2 + y^2)
        // Since geometry.radius has its y coordinate scaled to the height of the image,
        // we need to multiply it with the aspectRatio to get to the scale used by Openseadragon, analoguous to this.image2ViewPortCoords()
        const radius = String(Math.sqrt(geometry.radius.x * geometry.radius.x + aspectRatio * aspectRatio * geometry.radius.y * geometry.radius.y));
        svgElement.setAttribute('cx', cx);
        svgElement.setAttribute('cy', cy);
        svgElement.setAttribute('r', radius);
    }
    /**
     * Maps a Point2D[] with coordinates relative to an image to a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     * see also: https://openseadragon.github.io/examples/viewport-coordinates/
     * @param points - an array of points in coordinate system relative to an image
     * @param aspectRatio - the aspectRatio (h/w) of the image
     * @param xOffset - the x-offset in viewport coordinates of the image
     * @returns - a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     */
    image2ViewPortCoords(points, aspectRatio, xOffset) {
        return points.map((point) => {
            return new Point2D(point.x + xOffset, point.y * aspectRatio);
        });
    }
    /**
     * Returns a string in the format expected by the 'points' attribute of a SVGElement
     * @param points - an array of points to be serialized to a string
     * @returns - the points serialized to a string in the format expected by the 'points' attribute of a SVGElement
     */
    createSVGPolygonPointsAttribute(points) {
        let pointsString = '';
        for (const i in points) {
            if (points.hasOwnProperty(i)) {
                pointsString += points[i].x;
                pointsString += ',';
                pointsString += points[i].y;
                pointsString += ' ';
            }
        }
        return pointsString;
    }
}
StillImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-still-image',
                template: `<div class="still-image-viewer">
    <div class="navigation left">
        <button mat-button class="full-size" id="KUI_OSD_PREV_PAGE">
            <mat-icon>keyboard_arrow_left</mat-icon>
        </button>
    </div>

    <!-- main content with navigation and osd viewer -->
    <div class="content">

        <!-- header with image tools -->
        <mat-toolbar class="header">
            <mat-toolbar-row>
                <!-- home button -->
                <span>
                <button mat-icon-button id="KUI_OSD_HOME"><mat-icon>home</mat-icon></button>
            </span>
                <!-- zoom buttons -->
                <span class="fill-remaining-space"></span>
                <span>
                <button mat-icon-button id="KUI_OSD_ZOOM_IN"><mat-icon>add</mat-icon></button>
                <button mat-icon-button id="KUI_OSD_ZOOM_OUT"><mat-icon>remove</mat-icon></button>
            </span>
                <!-- window button -->
                <span class="fill-remaining-space"></span>
                <span>
                <button mat-icon-button id="KUI_OSD_FULL_PAGE"><mat-icon>fullscreen</mat-icon></button>
            </span>
            </mat-toolbar-row>
        </mat-toolbar>

        <!-- openseadragon (osd) viewer -->
        <div class="osd-container"></div>
        <!-- /openseadragon (osd) -->
        <!-- footer for copyright info; download button etc. -->
        <div class="footer">
            <p class="mat-caption" [innerHtml]="imageCaption"></p>
        </div>

    </div>

    <div class="navigation right">
        <button mat-button class="full-size" id="KUI_OSD_NEXT_PAGE">
            <mat-icon>keyboard_arrow_right</mat-icon>
        </button>
    </div>

</div>

<!-- simple image viewer e.g. as a preview -->
<!-- TODO: handle images array -->
<!--<img *ngIf="simple && images?.length === 1; else osdViewer" [src]="simpleImageExample">-->


<!--
    <div>
        <span *ngIf="images.length > 1" (click)="gotoLeft()">&lt;&lt;</span>
        <span *ngIf="images.length > 1" (click)="gotoRight()">&gt;&gt;</span>
    </div>
-->



`,
                styles: [`.still-image-viewer{display:inline-flex;height:400px;max-width:800px;width:100%}@media (max-height:636px){.still-image-viewer{height:300px}}.still-image-viewer .navigation{height:calc(400px + 64px + 24px);width:36px}.still-image-viewer .navigation .mat-button.full-size{height:100%!important;width:36px!important;padding:0!important;min-width:36px!important}.still-image-viewer .content{height:calc(400px + 64px + 24px);max-width:calc(800px - (2 * 36px));width:calc(100% - (2 * 36px))}.still-image-viewer .content .osd-container{color:#ccc;background-color:#000;height:400px}.still-image-viewer .content .osd-container.fullscreen{max-width:100vw}.still-image-viewer .content .footer p{color:#ccc;background-color:#000;height:24px;margin:0;padding:0 16px}/deep/ .roi-svgoverlay{opacity:.4;fill:transparent;stroke:#00695c;stroke-width:2px;vector-effect:non-scaling-stroke}.roi-svgoverlay:focus,/deep/ .roi-svgoverlay:hover{opacity:1}/deep/ .roi-svgoverlay.active{opacity:1}`]
            },] },
];
/** @nocollapse */
StillImageComponent.ctorParameters = () => [
    { type: ElementRef }
];
StillImageComponent.propDecorators = {
    images: [{ type: Input }],
    imageCaption: [{ type: Input }],
    activateRegion: [{ type: Input }],
    regionHovered: [{ type: Output }]
};

class TextComponent {
    constructor() { }
    ngOnInit() {
    }
}
TextComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text',
                template: `<p>
  text works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextComponent.ctorParameters = () => [];

class BooleanValueComponent {
    constructor() { }
    set valueObject(value) {
        this._booleanValueObj = value;
    }
    get valueObject() {
        return this._booleanValueObj;
    }
}
BooleanValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-boolean-value',
                template: `<mat-checkbox [checked]="valueObject.bool" disabled="true"></mat-checkbox>
`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
BooleanValueComponent.ctorParameters = () => [];
BooleanValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class ColorValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._colorValueObj = value;
    }
    get valueObject() {
        return this._colorValueObj;
    }
}
ColorValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-color-value',
                template: `<span [style.background-color]="valueObject.colorHex">{{valueObject.colorHex}}</span>`,
                styles: [`.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-form-field{width:36px;overflow-x:visible}`]
            },] },
];
/** @nocollapse */
ColorValueComponent.ctorParameters = () => [];
ColorValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class DateValueComponent {
    constructor() { }
    set calendar(value) {
        this._calendar = value;
    }
    get calendar() {
        return this._calendar;
    }
    set era(value) {
        this._era = value;
    }
    get era() {
        return this._era;
    }
    set valueObject(value) {
        this._dateValueObj = value;
        const dateOrRange = this.valueObject.getDateSalsah();
        if (dateOrRange instanceof DateRangeSalsah) {
            // period (start and end dates)
            this.period = true;
            this.dates = [this.getJSDate(dateOrRange.start), this.getJSDate(dateOrRange.end)];
        }
        else {
            // single date
            this.period = false;
            this.dates = [this.getJSDate(dateOrRange)];
        }
    }
    get valueObject() {
        return this._dateValueObj;
    }
    /**
     * Converts a `DateSalsah` to a JS Date, providing necessary formatting information.
     * JULIAN and GREGORIAN calendar are the only available for the moment.
     *
     * @param date the date to be converted.
     * @return DateFormatter.
     */
    getJSDate(date) {
        if (date.precision === Precision.yearPrecision) {
            return {
                format: 'yyyy',
                date: new Date(date.year.toString()),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.monthPrecision) {
            return {
                format: 'MMMM ' + 'yyyy',
                date: new Date(date.year, date.month - 1, 1),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.dayPrecision) {
            return {
                format: 'longDate',
                date: new Date(date.year, date.month - 1, date.day),
                era: date.era,
                calendar: date.calendar
            };
        }
        else {
            console.error('Error: incorrect precision for date');
        }
    }
}
DateValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-date-value',
                template: `<span *ngIf="period; else preciseDate">
    {{dates[0].date | date: dates[0].format}}
    <span *ngIf="era">
        {{dates[0].era}}
    </span>
    - {{dates[1].date | date: dates[1].format}}
    <span *ngIf="era">
        {{dates[1].era}}
    </span>

    <span *ngIf="calendar">
        ({{dates[0].calendar}})
    </span>
</span>

<ng-template #preciseDate>

    <span>
        {{dates[0].date | date: dates[0].format}}
        <span *ngIf="era">
            {{dates[0].era}}
        </span>
        <span *ngIf="calendar">
            ({{dates[0].calendar}})
        </span>
    </span>

</ng-template>
`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
DateValueComponent.ctorParameters = () => [];
DateValueComponent.propDecorators = {
    calendar: [{ type: Input }],
    era: [{ type: Input }],
    valueObject: [{ type: Input }]
};

class DecimalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._decimalValueObj = value;
    }
    get valueObject() {
        return this._decimalValueObj;
    }
}
DecimalValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-decimal-value',
                template: `<span>{{valueObject.decimal}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
DecimalValueComponent.ctorParameters = () => [];
DecimalValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class ExternalResValueComponent {
    constructor() { }
    ngOnInit() {
    }
}
ExternalResValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-external-res-value',
                template: `<p>
  external-res-value works!
</p>
`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
ExternalResValueComponent.ctorParameters = () => [];

class GeometryValueComponent {
    constructor() { }
    set valueObject(value) {
        this._geomValueObj = value;
    }
    get valueObject() {
        return this._geomValueObj;
    }
}
GeometryValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-geometry-value',
                template: `<span>{{valueObject.geometryString}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
GeometryValueComponent.ctorParameters = () => [];
GeometryValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class GeonameValueComponent {
    constructor() { }
    ngOnInit() {
    }
}
GeonameValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-geoname-value',
                template: `<p>
  geoname-value works!
</p>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
GeonameValueComponent.ctorParameters = () => [];

class IntegerValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._integerValueObj = value;
    }
    get valueObject() {
        return this._integerValueObj;
    }
}
IntegerValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-integer-value',
                template: `<span>{{valueObject.integer}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
IntegerValueComponent.ctorParameters = () => [];
IntegerValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class IntervalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._intervalValueObj = value;
    }
    get valueObject() {
        return this._intervalValueObj;
    }
}
IntervalValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-interval-value',
                template: `<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
IntervalValueComponent.ctorParameters = () => [];
IntervalValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class LinkValueComponent {
    constructor() {
        this.referredResourceClicked = new EventEmitter();
    }
    set ontologyInfo(value) {
        this._ontoInfo = value;
    }
    get ontologyInfo() {
        return this._ontoInfo;
    }
    set valueObject(value) {
        this._linkValueObj = value;
        if (this.valueObject.referredResource !== undefined) {
            this.referredResource = this.valueObject.referredResource.label;
        }
        else {
            this.referredResource = this.valueObject.referredResourceIri;
        }
    }
    get valueObject() {
        return this._linkValueObj;
    }
    refResClicked() {
        this.referredResourceClicked.emit(this._linkValueObj);
    }
}
LinkValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-link-value',
                template: `<a class="salsah-link" (click)="refResClicked()">{{referredResource}}</a>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
LinkValueComponent.ctorParameters = () => [];
LinkValueComponent.propDecorators = {
    ontologyInfo: [{ type: Input }],
    valueObject: [{ type: Input }],
    referredResourceClicked: [{ type: Output }]
};

class ListValueComponent {
    constructor() { }
    set valueObject(value) {
        this._listValueObj = value;
    }
    get valueObject() {
        return this._listValueObj;
    }
}
ListValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-list-value',
                template: `<span>{{valueObject.listNodeLabel}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
ListValueComponent.ctorParameters = () => [];
ListValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class TextValueAsHtmlComponent {
    constructor(el) {
        this.el = el;
        this.referredResourceClicked = new EventEmitter();
    }
    set ontologyInfo(value) {
        this._ontoInfo = value;
    }
    get ontologyInfo() {
        return this._ontoInfo;
    }
    set bindEvents(value) {
        this._bindEvents = value;
    }
    get bindEvents() {
        return this._bindEvents;
    }
    set valueObject(value) {
        this._htmlValueObj = value;
        if (this.el.nativeElement.innerHTML) {
            this.el.nativeElement.innerHTML = this.valueObject.html;
        }
    }
    get valueObject() {
        return this._htmlValueObj;
    }
    refResClicked(refResourceIri) {
        this.referredResourceClicked.emit(refResourceIri);
    }
    /**
     * Binds a click event to standoff links that shows the referred resource.
     *
     * @param targetElement
     */
    onClick(targetElement) {
        if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0
            && targetElement.href !== undefined) {
            this.refResClicked(targetElement.href);
            // prevent propagation
            return false;
        }
        else if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a' && targetElement.href !== undefined) {
            // open link in a new window
            window.open(targetElement.href, '_blank');
            // prevent propagation
            return false;
        }
        else {
            // prevent propagation
            return false;
        }
    }
}
TextValueAsHtmlComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text-value-as-html',
                template: `<div>{{valueObject.html}}</div>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextValueAsHtmlComponent.ctorParameters = () => [
    { type: ElementRef }
];
TextValueAsHtmlComponent.propDecorators = {
    referredResourceClicked: [{ type: Output }],
    ontologyInfo: [{ type: Input }],
    bindEvents: [{ type: Input }],
    valueObject: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event.target'],] }]
};

class TextValueAsStringComponent {
    constructor() {
    }
    set valueObject(value) {
        this._textStringValueObj = value;
    }
    get valueObject() {
        return this._textStringValueObj;
    }
}
TextValueAsStringComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text-value-as-string',
                template: `<span>{{valueObject.str}}</span>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextValueAsStringComponent.ctorParameters = () => [];
TextValueAsStringComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class TextValueAsXmlComponent {
    constructor() {
    }
    set valueObject(value) {
        this._xmlValueObj = value;
    }
    get valueObject() {
        return this._xmlValueObj;
    }
}
TextValueAsXmlComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text-value-as-xml',
                template: `<span>{{valueObject.xml}}</span>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextValueAsXmlComponent.ctorParameters = () => [];
TextValueAsXmlComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class TextfileValueComponent {
    constructor() { }
    set valueObject(value) {
        this._textfileValueObj = value;
    }
    get valueObject() {
        return this._textfileValueObj;
    }
}
TextfileValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-textfile-value',
                template: `<a target="_blank" href="{{valueObject.textFileURL}}">{{valueObject.textFilename}}</a>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextfileValueComponent.ctorParameters = () => [];
TextfileValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class UriValueComponent {
    constructor() { }
    set valueObject(value) {
        this.__uriValueObj = value;
    }
    get valueObject() {
        return this.__uriValueObj;
    }
}
UriValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-uri-value',
                template: `<a href="{{valueObject.uri}}" target="_blank">{{valueObject.uri}}</a>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
UriValueComponent.ctorParameters = () => [];
UriValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};

class CompareViewComponent {
    constructor() { }
    ngOnInit() {
    }
}
CompareViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-compare-view',
                template: `<p>
  compare-view works!
</p>
`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
CompareViewComponent.ctorParameters = () => [];

class GraphViewComponent {
    constructor() { }
    ngOnInit() {
    }
}
GraphViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-graph-view',
                template: `<p>
  graph-view works!
</p>
`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
GraphViewComponent.ctorParameters = () => [];

class GridViewComponent {
    constructor() {
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
    }
}
GridViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-grid-view',
                template: `<div>
  <kui-progress-indicator *ngIf="isLoading" [color]="'#D88958'"></kui-progress-indicator>

  <div fxLayout="row wrap" fxLayout.xs="column" fxLayoutGap="grid">

    <div fxFlex.sm="50" fxFlex.md="33.3" fxFlex.lg="20" fxFlex.xl="16.6" fxFlex="16.6" *ngFor="let res of result" class="gv-preview">
      <mat-card class="link">

        <mat-card-subtitle>{{ontologyInfo?.getLabelForResourceClass(res.type)}}</mat-card-subtitle>
        <mat-card-title>{{res.label}}</mat-card-title>


        <mat-card-content *ngFor="let prop of res.properties | kuiKey">
          <!-- description -->
          <div *ngFor="let val of prop.value | kuiKey">
            <div [ngSwitch]="val.value.getClassName()">
              <div class="lv-html-text" *ngSwitchCase="KnoraConstants.ReadTextValueAsHtml">
                <kui-text-value-as-html [valueObject]="val.value" [ontologyInfo]="ontologyInfo" [bindEvents]="false"></kui-text-value-as-html>
                <p class="lv-read-more"></p>
              </div>
              <div>
                <kui-date-value *ngSwitchCase="KnoraConstants.ReadDateValue" [valueObject]="val.value" [calendar]="true" [era]="true"></kui-date-value>
                <span *ngSwitchDefault="">{{val.value.getContent()}}</span>
              </div>
              <br>
              <span *ngIf="ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'">
                {{ontologyInfo?.getLabelForProperty(prop.key)}}
              </span>
            </div>
          </div>
        </mat-card-content>

      </mat-card>
    </div>
  </div>


</div>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.gv-preview{margin:6px 0;padding:24px;word-wrap:break-word;border-radius:5px}.gv-preview .mat-card{height:160px;color:rgba(0,0,0,.81);overflow:hidden;padding-bottom:25px}.gv-preview .mat-card:hover{background:rgba(0,105,92,.39);color:#000}.gv-preview .mat-card:active{background:rgba(0,105,92,.61)}.gv-preview .mat-card .mat-card-title{font-size:12pt;font-weight:600}`]
            },] },
];
/** @nocollapse */
GridViewComponent.ctorParameters = () => [];
GridViewComponent.propDecorators = {
    result: [{ type: Input }],
    ontologyInfo: [{ type: Input }],
    isLoading: [{ type: Input }]
};

class ListViewComponent {
    constructor() {
        this.KnoraConstants = KnoraConstants;
    }
}
ListViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-list-view',
                template: `<div>
    <kui-progress-indicator *ngIf="isLoading" [color]="'#D88958'"></kui-progress-indicator>

    <mat-list class="list-view lv-items" *ngFor="let res of result; let i = index; let last = last;">
        <mat-list-item class="link">
            <mat-icon matListIcon>image_search</mat-icon>
            <h2 matLine class="lv-label">{{ontologyInfo?.getLabelForResourceClass(res.type)}} - {{res.label}}</h2>

            <div matLine *ngFor="let prop of res.properties | kuiKey">
                <div *ngFor="let val of prop.value | kuiKey">
                    <div [ngSwitch]="val.value.getClassName()">

                        <div matLine class="lv-html-text" *ngSwitchCase="KnoraConstants.ReadTextValueAsHtml">
                            <kui-text-value-as-html [valueObject]="val.value" [ontologyInfo]="ontologyInfo" [bindEvents]="false"></kui-text-value-as-html>
                            <p class="lv-read-more"></p>
                        </div>

                        <span matLine>
                            <kui-date-value *ngSwitchCase="KnoraConstants.ReadDateValue" [valueObject]="val.value" [calendar]="true" [era]="true"></kui-date-value>
                            <span *ngSwitchDefault="">{{val.value.getContent()}}</span>
                        </span>
                        <br>
                        <span matLine *ngIf="ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'">
                            {{ontologyInfo?.getLabelForProperty(prop.key)}}
                        </span>
                    </div>
                </div>
            </div>

        </mat-list-item>

        <mat-divider *ngIf="!last"></mat-divider>

    </mat-list>
</div>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-list .mat-list-item .mat-line{white-space:normal!important;max-width:95%}.list-view .mat-list-item{height:auto;min-height:40px;padding:8px 0}.lv-label{font-weight:700!important}.lv-items{max-width:600px}`]
            },] },
];
/** @nocollapse */
ListViewComponent.ctorParameters = () => [];
ListViewComponent.propDecorators = {
    result: [{ type: Input }],
    ontologyInfo: [{ type: Input }],
    isLoading: [{ type: Input }]
};

class PropertiesViewComponent {
    constructor() { }
}
PropertiesViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-properties-view',
                template: `<p>
    properties-view works!
</p>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
PropertiesViewComponent.ctorParameters = () => [];

const jsonld = require('jsonld');
class ResourceViewComponent {
    constructor(_route, _resourceService, _cacheService, _incomingService) {
        this._route = _route;
        this._resourceService = _resourceService;
        this._cacheService = _cacheService;
        this._incomingService = _incomingService;
        this.iri = 'http://rdfh.ch/8be1b7cf7103';
        this.KnoraConstants = KnoraConstants;
        const routeParams = this._route.snapshot.params;
        this.iri = routeParams.id;
    }
    ngOnInit() {
        this.getResource(this.iri);
    }
    getResource(iri) {
        this._resourceService.getResource(iri)
            .subscribe((result) => {
            console.log('result: ', result.body);
            const promises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            const promise = promises.compact(result.body, {});
            promise.then((compacted) => {
                const resourceSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);
                // make sure that exactly one resource is returned
                if (resourceSeq.resources.length === 1) {
                    // get resource class Iris from response
                    const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);
                    // request ontology information about resource class Iris (properties are implied)
                    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe((resourceClassInfos) => {
                        // initialize ontology information
                        this.ontologyInfo = resourceClassInfos; // console.log('initialization of ontologyInfo: ', this.ontologyInfo); > object received
                        // prepare a possibly attached image file to be displayed
                        // this.collectImagesAndRegionsForResource(resourceSeq.resources[0]);
                        this.resource = resourceSeq.resources[0];
                        // console.log('resource: ', this.resource);
                        // this.requestIncomingResources();
                    }, (err) => {
                        console.log('cache request failed: ' + err);
                    });
                }
                else {
                    // exactly one resource was expected, but resourceSeq.resources.length != 1
                    this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`;
                }
            }, function (err) {
                console.error('JSONLD of full resource request could not be expanded:' + err);
            });
            // this.isLoading = false;
        }, (error) => {
            console.error(error);
            // this.errorMessage = <any>error;
            // this.isLoading = false;
        });
    }
}
ResourceViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-resource-view',
                template: `<mat-card>

    <!-- TODO: switch through the media type -->
    <kui-still-image></kui-still-image>
    <kui-moving-image></kui-moving-image>
    <kui-annotation></kui-annotation>
    <kui-audio></kui-audio>
    <kui-collection></kui-collection>
    <kui-ddd></kui-ddd>
    <kui-document></kui-document>
    <kui-link-obj></kui-link-obj>
    <kui-object></kui-object>
    <kui-region></kui-region>
    <kui-text></kui-text>

    <h2>metadata for resource {{ resource?.label}} ({{ resource?.id }})</h2>
    <h3>type: {{ontologyInfo?.getLabelForResourceClass(resource?.type)}}</h3>

    <div *ngFor="let prop of resource?.properties | kuiKey">
        <mat-list>
            <span>{{ontologyInfo?.getLabelForProperty(prop.key)}}</span>
            <mat-list-item *ngFor="let val of prop.value">
                <span [ngSwitch]="val.getClassName()">
                    <kui-color-value *ngSwitchCase="KnoraConstants.ReadColorValue" [valueObject]="val"></kui-color-value>
                    <kui-text-value-as-html *ngSwitchCase="KnoraConstants.ReadTextValueAsHtml" [valueObject]="val" [ontologyInfo]="ontologyInfo" [bindEvents]="true"></kui-text-value-as-html>
                    <kui-text-value-as-string *ngSwitchCase="KnoraConstants.ReadTextValueAsString" [valueObject]="val"></kui-text-value-as-string>
                    <kui-text-value-as-xml *ngSwitchCase="KnoraConstants.ReadTextValueAsXml" [valueObject]="val"></kui-text-value-as-xml>
                    <kui-date-value *ngSwitchCase="KnoraConstants.ReadDateValue" [valueObject]="val"></kui-date-value>
                    <kui-link-value *ngSwitchCase="KnoraConstants.ReadLinkValue" [valueObject]="val" [ontologyInfo]="ontologyInfo"></kui-link-value>
                    <kui-integer-value *ngSwitchCase="KnoraConstants.ReadIntegerValue" [valueObject]="val"></kui-integer-value>
                    <kui-decimal-value *ngSwitchCase="KnoraConstants.ReadDecimalValue" [valueObject]="val"></kui-decimal-value>
                    <kui-geometry-value *ngSwitchCase="KnoraConstants.ReadGeomValue" [valueObject]="val"></kui-geometry-value>
                    <kui-uri-value *ngSwitchCase="KnoraConstants.ReadUriValue" [valueObject]="val"></kui-uri-value>
                    <kui-boolean-value *ngSwitchCase="KnoraConstants.ReadBooleanValue" [valueObject]="val"></kui-boolean-value>
                    <kui-interval-value *ngSwitchCase="KnoraConstants.ReadIntervalValue" [valueObject]="val"></kui-interval-value>
                    <kui-list-value *ngSwitchCase="KnoraConstants.ReadListValue" [valueObject]="val"></kui-list-value>
                    <kui-textfile-value *ngSwitchCase="KnoraConstants.TextFileValue" [valueObject]="val"></kui-textfile-value>
                    <span *ngSwitchDefault="">Not supported {{val.getClassName()}}</span>
                </span>
            </mat-list-item>
        </mat-list>
    </div>

</mat-card>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
ResourceViewComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: ResourceService },
    { type: OntologyCacheService },
    { type: IncomingService }
];
ResourceViewComponent.propDecorators = {
    iri: [{ type: Input }]
};

class TableViewComponent {
    constructor() {
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
    }
}
TableViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-table-view',
                template: `<p>
  table-view works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
TableViewComponent.ctorParameters = () => [];
TableViewComponent.propDecorators = {
    result: [{ type: Input }],
    ontologyInfo: [{ type: Input }],
    isLoading: [{ type: Input }]
};

class KuiView {
    constructor(_route, _searchService, _searchParamsService, _router) {
        this._route = _route;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this._router = _router;
        /**
         *
         * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
         * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
         *
         * @param {ReadResourcesSequence} searchResult the answer to a search request.
         */
        this.processSearchResults = (searchResult) => {
            // assign ontology information to a variable so it can be used in the component's template
            if (this.ontologyInfo === undefined) {
                // init ontology information
                this.ontologyInfo = searchResult.ontologyInformation;
            }
            else {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
            }
            // append results to search results
            this.result = this.result.concat(searchResult.resources);
            this.isLoading = false;
            this.rerender = false;
        };
        /**
         * Shows total number of results returned by a count query.
         *
         * @param {ApiServiceResult} countQueryResult the response to a count query.
         */
        this.showNumberOfAllResults = (countQueryResult) => {
            this.numberOfAllResults = countQueryResult.numberOfResults;
            if (this.numberOfAllResults > 0) {
                // offset is 0-based
                // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                this.maxOffset = Math.floor((this.numberOfAllResults - 1) / this.pagingLimit);
            }
            else {
                this.maxOffset = 0;
            }
        };
    }
    ngOnInit() {
        this.navigationSubscription = this._route.paramMap.subscribe((params) => {
            this.searchMode = params.get('mode');
            // init offset  and result
            this.offset = 0;
            this.result = [];
            if (this.searchMode === 'fulltext') {
                this.searchQuery = params.get('q');
            }
            else if (this.searchMode === 'extended') {
                this.gravsearchGenerator = this._searchParamsService.getSearchParams();
                this.generateGravsearchQuery();
            }
            this.rerender = true;
            this.getResult();
        });
    }
    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }
    /**
     * Generates the Gravsearch query for the current offset.
     */
    generateGravsearchQuery() {
        const gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], { relativeTo: this._route });
            return;
        }
        else {
            this.searchQuery = gravsearch;
        }
    }
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {
        this.isLoading = true;
        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            if (this.offset === 0) {
                // perform count query
                this._searchService.doFullTextSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(this.showNumberOfAllResults, (error) => {
                    this.errorMessage = error;
                });
            }
            // perform full text search
            this._searchService.doFullTextSearchReadResourceSequence(this.searchQuery, this.offset)
                .subscribe(this.processSearchResults, // function pointer
            (error) => {
                this.errorMessage = error;
            });
            // EXTENDED SEARCH
        }
        else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService.doExtendedSearchCountQueryCountQueryResult(this.searchQuery)
                    .subscribe(this.showNumberOfAllResults, (error) => {
                    this.errorMessage = error;
                });
            }
            this._searchService.doExtendedSearchReadResourceSequence(this.searchQuery)
                .subscribe(this.processSearchResults, // function pointer
            (error) => {
                this.errorMessage = error;
            });
        }
        else {
            this.errorMessage = `search mode invalid: ${this.searchMode}`;
        }
    }
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     *
     * @param {number} offset
     * @returns void
     */
    loadMore(offset) {
        // update the page offset when the end of scroll is reached to get the next page of search results
        if (this.offset < this.maxOffset) {
            this.offset++;
        }
        else {
            return;
        }
        if (this.searchMode === 'extended') {
            this.generateGravsearchQuery();
        }
        this.getResult();
    }
}

class SearchResultsComponent extends KuiView {
    constructor(_route, _searchService, _searchParamsService, _router) {
        super(_route, _searchService, _searchParamsService, _router);
        this._route = _route;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this._router = _router;
        this.KnoraConstants = KnoraConstants;
        this.offset = 0;
        this.maxOffset = 0;
        this.result = [];
        this.rerender = false;
        this.isLoading = true;
        this.errorMessage = undefined;
        this.pagingLimit = 25;
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-search-results',
                template: `<div *ngIf="!rerender">
    <div *ngIf="numberOfAllResults !== 0 && result; else noResult">
        <h4>Number of results: {{numberOfAllResults}}</h4>
        <mat-tab-group>
            <mat-tab label="List">
                <kui-list-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-list-view>
            </mat-tab>
            <mat-tab label="Grid">
                <kui-grid-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-grid-view>
            </mat-tab>
            <mat-tab label="Table">
                <kui-table-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-table-view>
            </mat-tab>
            <mat-tab label="Gravsearch">
                <kui-graph-view></kui-graph-view>
            </mat-tab>
        </mat-tab-group>

        <div class="load-panel" *ngIf="result.length > 0">
            <button mat-flat-button color="primary" class="link center" (click)="loadMore(offset)" *ngIf="offset < maxOffset">Load more
                <mat-icon>keyboard_arrow_down</mat-icon>
            </button>
        </div>

    </div>

    <!-- In case of 0 result -->
    <ng-template #noResult>
        <p>
            <strong>No result</strong>
        </p>
    </ng-template>

</div>

<!-- Error message -->
<div *ngIf="errorMessage">
    <p>There is an error: {{errorMessage}}</p>
</div>`,
                styles: [`.load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}`]
            },] },
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: SearchService },
    { type: SearchParamsService },
    { type: Router }
];

class KuiViewerModule {
}
KuiViewerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    KuiCoreModule,
                    KuiActionModule,
                    MatAutocompleteModule,
                    MatButtonModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatDatepickerModule,
                    MatExpansionModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatListModule,
                    MatNativeDateModule,
                    MatSlideToggleModule,
                    MatTabsModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    ReactiveFormsModule,
                    FlexLayoutModule
                ],
                declarations: [
                    AnnotationComponent,
                    AudioComponent,
                    CollectionComponent,
                    DddComponent,
                    DocumentComponent,
                    LinkObjComponent,
                    MovingImageComponent,
                    ObjectComponent,
                    RegionComponent,
                    StillImageComponent,
                    TextComponent,
                    TextValueAsHtmlComponent,
                    TextValueAsStringComponent,
                    TextValueAsXmlComponent,
                    TextfileValueComponent,
                    DateValueComponent,
                    IntegerValueComponent,
                    ColorValueComponent,
                    DecimalValueComponent,
                    UriValueComponent,
                    BooleanValueComponent,
                    GeometryValueComponent,
                    GeonameValueComponent,
                    IntervalValueComponent,
                    ListValueComponent,
                    LinkValueComponent,
                    ExternalResValueComponent,
                    ListViewComponent,
                    GridViewComponent,
                    TableViewComponent,
                    ResourceViewComponent,
                    CompareViewComponent,
                    GraphViewComponent,
                    PropertiesViewComponent,
                    SearchResultsComponent
                ],
                exports: [
                    AnnotationComponent,
                    AudioComponent,
                    CollectionComponent,
                    DddComponent,
                    DocumentComponent,
                    LinkObjComponent,
                    MovingImageComponent,
                    ObjectComponent,
                    RegionComponent,
                    StillImageComponent,
                    TextComponent,
                    TextValueAsHtmlComponent,
                    TextValueAsStringComponent,
                    TextValueAsXmlComponent,
                    TextfileValueComponent,
                    DateValueComponent,
                    IntegerValueComponent,
                    ColorValueComponent,
                    DecimalValueComponent,
                    UriValueComponent,
                    BooleanValueComponent,
                    GeometryValueComponent,
                    GeonameValueComponent,
                    IntervalValueComponent,
                    ListValueComponent,
                    LinkValueComponent,
                    ExternalResValueComponent,
                    ListViewComponent,
                    GridViewComponent,
                    TableViewComponent,
                    ResourceViewComponent,
                    CompareViewComponent,
                    GraphViewComponent,
                    PropertiesViewComponent,
                    SearchResultsComponent
                ]
            },] },
];

/*
 * Public API Surface of viewer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BooleanValueComponent as ɵu, ColorValueComponent as ɵr, DateValueComponent as ɵp, DecimalValueComponent as ɵs, ExternalResValueComponent as ɵba, GeometryValueComponent as ɵv, GeonameValueComponent as ɵw, IntegerValueComponent as ɵq, IntervalValueComponent as ɵx, LinkValueComponent as ɵz, ListValueComponent as ɵy, TextValueAsHtmlComponent as ɵl, TextValueAsStringComponent as ɵm, TextValueAsXmlComponent as ɵn, TextfileValueComponent as ɵo, UriValueComponent as ɵt, AnnotationComponent as ɵa, AudioComponent as ɵb, CollectionComponent as ɵc, DddComponent as ɵd, DocumentComponent as ɵe, LinkObjComponent as ɵf, MovingImageComponent as ɵg, ObjectComponent as ɵh, RegionComponent as ɵi, StillImageComponent as ɵj, TextComponent as ɵk, CompareViewComponent as ɵbf, GraphViewComponent as ɵbg, GridViewComponent as ɵbc, KuiView as ɵbj, ListViewComponent as ɵbb, PropertiesViewComponent as ɵbh, ResourceViewComponent as ɵbe, SearchResultsComponent as ɵbi, TableViewComponent as ɵbd, AnnotationComponent, AudioComponent, CollectionComponent, DddComponent, DocumentComponent, LinkObjComponent, MovingImageComponent, ObjectComponent, RegionComponent, ImageRegion, StillImageRepresentation, GeometryForRegion, StillImageComponent, TextComponent, BooleanValueComponent, ColorValueComponent, DateValueComponent, DecimalValueComponent, ExternalResValueComponent, GeometryValueComponent, GeonameValueComponent, IntegerValueComponent, IntervalValueComponent, LinkValueComponent, ListValueComponent, TextValueAsHtmlComponent, TextValueAsStringComponent, TextValueAsXmlComponent, TextfileValueComponent, UriValueComponent, CompareViewComponent, GraphViewComponent, GridViewComponent, ListViewComponent, PropertiesViewComponent, ResourceViewComponent, TableViewComponent, SearchResultsComponent, KuiViewerModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtdmlld2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9yZXNvdXJjZS9hbm5vdGF0aW9uL2Fubm90YXRpb24uY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9yZXNvdXJjZS9hdWRpby9hdWRpby5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Jlc291cmNlL2NvbGxlY3Rpb24vY29sbGVjdGlvbi5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Jlc291cmNlL2RkZC9kZGQuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9yZXNvdXJjZS9kb2N1bWVudC9kb2N1bWVudC5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Jlc291cmNlL2xpbmstb2JqL2xpbmstb2JqLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcmVzb3VyY2UvbW92aW5nLWltYWdlL21vdmluZy1pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Jlc291cmNlL29iamVjdC9vYmplY3QuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9yZXNvdXJjZS9yZWdpb24vcmVnaW9uLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcmVzb3VyY2Uvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9yZXNvdXJjZS90ZXh0L3RleHQuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9wcm9wZXJ0eS9ib29sZWFuLXZhbHVlL2Jvb2xlYW4tdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9wcm9wZXJ0eS9jb2xvci12YWx1ZS9jb2xvci12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2RhdGUtdmFsdWUvZGF0ZS12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2RlY2ltYWwtdmFsdWUvZGVjaW1hbC12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2V4dGVybmFsLXJlcy12YWx1ZS9leHRlcm5hbC1yZXMtdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9wcm9wZXJ0eS9nZW9tZXRyeS12YWx1ZS9nZW9tZXRyeS12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2dlb25hbWUtdmFsdWUvZ2VvbmFtZS12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L2ludGVydmFsLXZhbHVlL2ludGVydmFsLXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcHJvcGVydHkvbGluay12YWx1ZS9saW5rLXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcHJvcGVydHkvbGlzdC12YWx1ZS9saXN0LXZhbHVlLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLWh0bWwvdGV4dC12YWx1ZS1hcy1odG1sLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLXN0cmluZy90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L3RleHQtdmFsdWUvdGV4dC12YWx1ZS1hcy14bWwvdGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi9wcm9wZXJ0eS90ZXh0ZmlsZS12YWx1ZS90ZXh0ZmlsZS12YWx1ZS5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3Byb3BlcnR5L3VyaS12YWx1ZS91cmktdmFsdWUuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi92aWV3L2NvbXBhcmUtdmlldy9jb21wYXJlLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi92aWV3L2dyYXBoLXZpZXcvZ3JhcGgtdmlldy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3ZpZXcvZ3JpZC12aWV3L2dyaWQtdmlldy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3ZpZXcvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3ZpZXcvcHJvcGVydGllcy12aWV3L3Byb3BlcnRpZXMtdmlldy5jb21wb25lbnQudHMiLCJuZzovL0Brbm9yYS92aWV3ZXIvbGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvdmlldy90YWJsZS12aWV3L3RhYmxlLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi92aWV3L2t1aS12aWV3LnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2xpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9saWIvdmlld2VyLm1vZHVsZS50cyIsIm5nOi8vQGtub3JhL3ZpZXdlci9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvdmlld2VyL2tub3JhLXZpZXdlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktYW5ub3RhdGlvbicsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIGFubm90YXRpb24gd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ub3RhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktYXVkaW8nLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBhdWRpbyB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBBdWRpb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktY29sbGVjdGlvbicsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIGNvbGxlY3Rpb24gd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZGRkJyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgZGRkIHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERkZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZG9jdW1lbnQnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBkb2N1bWVudCB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEb2N1bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktbGluay1vYmonLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBsaW5rLW9iaiB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rT2JqQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1tb3ZpbmctaW1hZ2UnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBtb3ZpbmctaW1hZ2Ugd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTW92aW5nSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLW9iamVjdCcsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIG9iamVjdCB3b3JrcyFcbjwvcD5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1yZWdpb24nLFxuICB0ZW1wbGF0ZTogYDxwPlxuICByZWdpb24gd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIFBvaW50MkQsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVnaW9uR2VvbWV0cnlcbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5cbi8vIFRoaXMgY29tcG9uZW50IG5lZWRzIHRoZSBvcGVuc2VhZHJhZ29uIGxpYnJhcnkgaXRzZWxmLCBhcyB3ZWxsIGFzIHRoZSBvcGVuc2VhZHJhZ29uIHBsdWdpbiBvcGVuc2VhZHJhZ29uLXN2Zy1vdmVybGF5XG4vLyBCb3RoIGxpYnJhcmllcyBhcmUgaW5zdGFsbGVkIHZpYSBwYWNrYWdlLmpzb24sIGFuZCBsb2FkZWQgZ2xvYmFsbHkgdmlhIHRoZSBzY3JpcHQgdGFnIGluIC5hbmd1bGFyLWNsaS5qc29uXG5cbi8vIE9wZW5TZWFkcmFnb24gZG9lcyBub3QgZXhwb3J0IGl0c2VsZiBhcyBFUzYvRUNNQTIwMTUgbW9kdWxlLFxuLy8gaXQgaXMgbG9hZGVkIGdsb2JhbGx5IGluIHNjcmlwdHMgdGFnIG9mIGFuZ3VsYXItY2xpLmpzb24sXG4vLyB3ZSBzdGlsbCBuZWVkIHRvIGRlY2xhcmUgdGhlIG5hbWVzcGFjZSB0byBtYWtlIFR5cGVTY3JpcHQgY29tcGlsZXIgaGFwcHkuXG5kZWNsYXJlIGxldCBPcGVuU2VhZHJhZ29uOiBhbnk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlZ2lvbi5cbiAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSByZXNvdXJjZSByZXByZXNlbnRpbmcgdGhlIHJlZ2lvbiBhbmQgaXRzIGdlb21ldHJpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZVJlZ2lvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWdpb25SZXNvdXJjZSBhIHJlc291cmNlIG9mIHR5cGUgUmVnaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbWFnZSBpbmNsdWRpbmcgaXRzIHJlZ2lvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgcmVhZG9ubHkgcmVnaW9uczogSW1hZ2VSZWdpb25bXSkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IGJlbG9uZ2luZyB0byBhIHNwZWNpZmljIHJlZ2lvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEdlb21ldHJ5Rm9yUmVnaW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGdlb21ldHJ5IHRoZSBnZW9tZXRyaWNhbCBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0gcmVnaW9uIHRoZSByZWdpb24gdGhlIGdlb21ldHJ5IGJlbG9uZ3MgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5LCByZWFkb25seSByZWdpb246IFJlYWRSZXNvdXJjZSkge1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgYFNWR1BvbHlnb25FbGVtZW50YCBmb3IgaW5kaXZpZHVhbCByZWdpb25zLlxuICovXG5pbnRlcmZhY2UgUG9seWdvbnNGb3JSZWdpb24ge1xuXG4gICAgW2tleTogc3RyaW5nXTogU1ZHUG9seWdvbkVsZW1lbnRbXTtcblxufVxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGNyZWF0ZXMgYSBPcGVuU2VhZHJhZ29uIHZpZXdlciBpbnN0YW5jZS5cbiAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgUmVhZFJlc291cmNlIGNvbnRhaW5pbmcgKGFtb25nIG90aGVyIHJlc291cmNlcykgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHRvIGJlIHJlbmRlcmVkLlxuICogQG1lbWJlciByZXNvdXJjZXMgLSByZXNvdXJjZXMgY29udGFpbmluZyAoYW1vbmcgb3RoZXIgcmVzb3VyY2VzKSB0aGUgU3RpbGxJbWFnZUZpbGVWYWx1ZXMgYW5kIGluY29taW5nIHJlZ2lvbnMgdG8gYmUgcmVuZGVyZWQuIChVc2UgYXMgYW5ndWxhciBASW5wdXQgZGF0YSBiaW5kaW5nIHByb3BlcnR5LilcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc3RpbGwtaW1hZ2UnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0aWxsLWltYWdlLXZpZXdlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJuYXZpZ2F0aW9uIGxlZnRcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwiZnVsbC1zaXplXCIgaWQ9XCJLVUlfT1NEX1BSRVZfUEFHRVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X2xlZnQ8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gbWFpbiBjb250ZW50IHdpdGggbmF2aWdhdGlvbiBhbmQgb3NkIHZpZXdlciAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuXG4gICAgICAgIDwhLS0gaGVhZGVyIHdpdGggaW1hZ2UgdG9vbHMgLS0+XG4gICAgICAgIDxtYXQtdG9vbGJhciBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgPG1hdC10b29sYmFyLXJvdz5cbiAgICAgICAgICAgICAgICA8IS0tIGhvbWUgYnV0dG9uIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGlkPVwiS1VJX09TRF9IT01FXCI+PG1hdC1pY29uPmhvbWU8L21hdC1pY29uPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwhLS0gem9vbSBidXR0b25zIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gaWQ9XCJLVUlfT1NEX1pPT01fSU5cIj48bWF0LWljb24+YWRkPC9tYXQtaWNvbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBpZD1cIktVSV9PU0RfWk9PTV9PVVRcIj48bWF0LWljb24+cmVtb3ZlPC9tYXQtaWNvbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8IS0tIHdpbmRvdyBidXR0b24gLS0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWxsLXJlbWFpbmluZy1zcGFjZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBpZD1cIktVSV9PU0RfRlVMTF9QQUdFXCI+PG1hdC1pY29uPmZ1bGxzY3JlZW48L21hdC1pY29uPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9tYXQtdG9vbGJhci1yb3c+XG4gICAgICAgIDwvbWF0LXRvb2xiYXI+XG5cbiAgICAgICAgPCEtLSBvcGVuc2VhZHJhZ29uIChvc2QpIHZpZXdlciAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9zZC1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgPCEtLSAvb3BlbnNlYWRyYWdvbiAob3NkKSAtLT5cbiAgICAgICAgPCEtLSBmb290ZXIgZm9yIGNvcHlyaWdodCBpbmZvOyBkb3dubG9hZCBidXR0b24gZXRjLiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJtYXQtY2FwdGlvblwiIFtpbm5lckh0bWxdPVwiaW1hZ2VDYXB0aW9uXCI+PC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm5hdmlnYXRpb24gcmlnaHRcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwiZnVsbC1zaXplXCIgaWQ9XCJLVUlfT1NEX05FWFRfUEFHRVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48IS0tIHNpbXBsZSBpbWFnZSB2aWV3ZXIgZS5nLiBhcyBhIHByZXZpZXcgLS0+XG48IS0tIFRPRE86IGhhbmRsZSBpbWFnZXMgYXJyYXkgLS0+XG48IS0tPGltZyAqbmdJZj1cInNpbXBsZSAmJiBpbWFnZXM/Lmxlbmd0aCA9PT0gMTsgZWxzZSBvc2RWaWV3ZXJcIiBbc3JjXT1cInNpbXBsZUltYWdlRXhhbXBsZVwiPi0tPlxuXG5cbjwhLS1cbiAgICA8ZGl2PlxuICAgICAgICA8c3BhbiAqbmdJZj1cImltYWdlcy5sZW5ndGggPiAxXCIgKGNsaWNrKT1cImdvdG9MZWZ0KClcIj4mbHQ7Jmx0Ozwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpbWFnZXMubGVuZ3RoID4gMVwiIChjbGljayk9XCJnb3RvUmlnaHQoKVwiPiZndDsmZ3Q7PC9zcGFuPlxuICAgIDwvZGl2PlxuLS0+XG5cblxuXG5gLFxuICAgIHN0eWxlczogW2Auc3RpbGwtaW1hZ2Utdmlld2Vye2Rpc3BsYXk6aW5saW5lLWZsZXg7aGVpZ2h0OjQwMHB4O21heC13aWR0aDo4MDBweDt3aWR0aDoxMDAlfUBtZWRpYSAobWF4LWhlaWdodDo2MzZweCl7LnN0aWxsLWltYWdlLXZpZXdlcntoZWlnaHQ6MzAwcHh9fS5zdGlsbC1pbWFnZS12aWV3ZXIgLm5hdmlnYXRpb257aGVpZ2h0OmNhbGMoNDAwcHggKyA2NHB4ICsgMjRweCk7d2lkdGg6MzZweH0uc3RpbGwtaW1hZ2Utdmlld2VyIC5uYXZpZ2F0aW9uIC5tYXQtYnV0dG9uLmZ1bGwtc2l6ZXtoZWlnaHQ6MTAwJSFpbXBvcnRhbnQ7d2lkdGg6MzZweCFpbXBvcnRhbnQ7cGFkZGluZzowIWltcG9ydGFudDttaW4td2lkdGg6MzZweCFpbXBvcnRhbnR9LnN0aWxsLWltYWdlLXZpZXdlciAuY29udGVudHtoZWlnaHQ6Y2FsYyg0MDBweCArIDY0cHggKyAyNHB4KTttYXgtd2lkdGg6Y2FsYyg4MDBweCAtICgyICogMzZweCkpO3dpZHRoOmNhbGMoMTAwJSAtICgyICogMzZweCkpfS5zdGlsbC1pbWFnZS12aWV3ZXIgLmNvbnRlbnQgLm9zZC1jb250YWluZXJ7Y29sb3I6I2NjYztiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7aGVpZ2h0OjQwMHB4fS5zdGlsbC1pbWFnZS12aWV3ZXIgLmNvbnRlbnQgLm9zZC1jb250YWluZXIuZnVsbHNjcmVlbnttYXgtd2lkdGg6MTAwdnd9LnN0aWxsLWltYWdlLXZpZXdlciAuY29udGVudCAuZm9vdGVyIHB7Y29sb3I6I2NjYztiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7aGVpZ2h0OjI0cHg7bWFyZ2luOjA7cGFkZGluZzowIDE2cHh9L2RlZXAvIC5yb2ktc3Znb3ZlcmxheXtvcGFjaXR5Oi40O2ZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOiMwMDY5NWM7c3Ryb2tlLXdpZHRoOjJweDt2ZWN0b3ItZWZmZWN0Om5vbi1zY2FsaW5nLXN0cm9rZX0ucm9pLXN2Z292ZXJsYXk6Zm9jdXMsL2RlZXAvIC5yb2ktc3Znb3ZlcmxheTpob3ZlcntvcGFjaXR5OjF9L2RlZXAvIC5yb2ktc3Znb3ZlcmxheS5hY3RpdmV7b3BhY2l0eToxfWBdXG59KVxuZXhwb3J0IGNsYXNzIFN0aWxsSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGltYWdlczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW107XG4gICAgQElucHV0KCkgaW1hZ2VDYXB0aW9uPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFjdGl2YXRlUmVnaW9uOiBzdHJpbmc7IC8vIGhpZ2hsaWdodCBhIHJlZ2lvblxuXG4gICAgQE91dHB1dCgpIHJlZ2lvbkhvdmVyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgdmlld2VyO1xuICAgIHByaXZhdGUgcmVnaW9uczogUG9seWdvbnNGb3JSZWdpb24gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHN1cmZhY2Ugb2YgYSByZWN0YW5ndWxhciByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VvbSB0aGUgcmVnaW9uJ3MgZ2VvbWV0cnkuXG4gICAgICogQHJldHVybnMgdGhlIHN1cmZhY2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3VyZmFjZU9mUmVjdGFuZ3VsYXJSZWdpb24oZ2VvbTogUmVnaW9uR2VvbWV0cnkpOiBudW1iZXIge1xuXG4gICAgICAgIGlmIChnZW9tLnR5cGUgIT09ICdyZWN0YW5nbGUnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhwZWN0ZWQgcmVjdGFuZ3VsYXIgcmVnaW9uLCBidXQgJyArIGdlb20udHlwZSArICcgZ2l2ZW4nKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdyA9IE1hdGgubWF4KGdlb20ucG9pbnRzWzBdLngsIGdlb20ucG9pbnRzWzFdLngpIC0gTWF0aC5taW4oZ2VvbS5wb2ludHNbMF0ueCwgZ2VvbS5wb2ludHNbMV0ueCk7XG4gICAgICAgIGNvbnN0IGggPSBNYXRoLm1heChnZW9tLnBvaW50c1swXS55LCBnZW9tLnBvaW50c1sxXS55KSAtIE1hdGgubWluKGdlb20ucG9pbnRzWzBdLnksIGdlb20ucG9pbnRzWzFdLnkpO1xuXG4gICAgICAgIHJldHVybiB3ICogaDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgdGlsZSBzb3VyY2VzIGZyb20gdGhlIGdpdmVuIHNlcXVlbmNlIG9mIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbWFnZXNUb0Rpc3BsYXkgdGhlIGdpdmVuIGZpbGUgdmFsdWVzIHRvIGRlIGRpc3BsYXllZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgdGlsZSBzb3VyY2VzIHRvIGJlIHBhc3NlZCB0byBPU0Qgdmlld2VyLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHByZXBhcmVUaWxlU291cmNlc0Zyb21GaWxlVmFsdWVzKGltYWdlc1RvRGlzcGxheTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSk6IE9iamVjdFtdIHtcbiAgICAgICAgbGV0IGltYWdlWE9mZnNldCA9IDA7XG4gICAgICAgIGNvbnN0IGltYWdlWU9mZnNldCA9IDA7XG4gICAgICAgIGNvbnN0IHRpbGVTb3VyY2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpcGlCYXNlUGF0aCA9IGltYWdlLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyBpbWFnZS5pbWFnZUZpbGVuYW1lO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS5kaW1YO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuZGltWTtcblxuICAgICAgICAgICAgLy8gY29uc3RydWN0IE9wZW5TZWFkcmFnb24gdGlsZVNvdXJjZXMgYWNjb3JkaW5nIHRvIGh0dHBzOi8vb3BlbnNlYWRyYWdvbi5naXRodWIuaW8vZG9jcy9PcGVuU2VhZHJhZ29uLlZpZXdlci5odG1sI29wZW5cbiAgICAgICAgICAgIHRpbGVTb3VyY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0cnVjdCBJSUlGIHRpbGVTb3VyY2UgY29uZmlndXJhdGlvbiBhY2NvcmRpbmcgdG9cbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vaWlpZi5pby9hcGkvaW1hZ2UvMi4xLyN0ZWNobmljYWwtcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIC8vIHNlZSBhbHNvIGh0dHA6Ly9paWlmLmlvL2FwaS9pbWFnZS8yLjAvI2EtaW1wbGVtZW50YXRpb24tbm90ZXNcbiAgICAgICAgICAgICAgICAndGlsZVNvdXJjZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0Bjb250ZXh0JzogJ2h0dHA6Ly9paWlmLmlvL2FwaS9pbWFnZS8yL2NvbnRleHQuanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdAaWQnOiBzaXBpQmFzZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAncHJvZmlsZSc6IFsnaHR0cDovL2lpaWYuaW8vYXBpL2ltYWdlLzIvbGV2ZWwyLmpzb24nXSxcbiAgICAgICAgICAgICAgICAgICAgJ3Byb3RvY29sJzogJ2h0dHA6Ly9paWlmLmlvL2FwaS9pbWFnZScsXG4gICAgICAgICAgICAgICAgICAgICd0aWxlcyc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NhbGVGYWN0b3JzJzogWzEsIDIsIDQsIDgsIDE2LCAzMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAxMDI0XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAneCc6IGltYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAneSc6IGltYWdlWU9mZnNldFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGltYWdlWE9mZnNldCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbGVTb3VyY2VzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2ltYWdlcyddICYmIGNoYW5nZXNbJ2ltYWdlcyddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydpbWFnZXMnXSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuSW1hZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlZ2lvbnMoKTtcblxuICAgICAgICAgICAgdGhpcy51bmhpZ2hsaWdodEFsbFJlZ2lvbnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2YXRlUmVnaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlZ2lvbih0aGlzLmFjdGl2YXRlUmVnaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2VzWydhY3RpdmF0ZVJlZ2lvbiddKSB7XG4gICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0QWxsUmVnaW9ucygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVSZWdpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVnaW9uKHRoaXMuYWN0aXZhdGVSZWdpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGluaXRpYWxpc2F0aW9uIGlzIGRvbmUgb24gZmlyc3QgcnVuIG9mIG5nT25DaGFuZ2VzXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy52aWV3ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFsbCBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXMgdG8gYmUgZm91bmQgaW4gW1t0aGlzLmltYWdlc11dLlxuICAgICAqIChBbHRob3VnaCB0aGlzLmltYWdlcyBpcyBhIEFuZ3VsYXIgSW5wdXQgcHJvcGVydHksIHRoZSBidWlsdC1pbiBjaGFuZ2UgZGV0ZWN0aW9uIG9mIEFuZ3VsYXIgZG9lcyBub3QgZGV0ZWN0IGNoYW5nZXMgaW4gY29tcGxleCBvYmplY3RzIG9yIGFycmF5cywgb25seSByZWFzc2lnbm1lbnQgb2Ygb2JqZWN0cy9hcnJheXMuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIGlmIGFkZGl0aW9uYWwgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHdlcmUgYWRkZWQgdG8gdGhpcy5pbWFnZXMgYWZ0ZXIgY3JlYXRpb24vYXNzaWdubWVudCBvZiB0aGUgdGhpcy5pbWFnZXMgYXJyYXkuKVxuICAgICAqL1xuICAgIHVwZGF0ZUltYWdlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbkltYWdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIHJlZ2lvbnMgdG8gYmUgZm91bmQgaW4gW1t0aGlzLmltYWdlc11dLlxuICAgICAqIChBbHRob3VnaCB0aGlzLmltYWdlcyBpcyBhIEFuZ3VsYXIgSW5wdXQgcHJvcGVydHksIHRoZSBidWlsdC1pbiBjaGFuZ2UgZGV0ZWN0aW9uIG9mIEFuZ3VsYXIgZG9lcyBub3QgZGV0ZWN0IGNoYW5nZXMgaW4gY29tcGxleCBvYmplY3RzIG9yIGFycmF5cywgb25seSByZWFzc2lnbm1lbnQgb2Ygb2JqZWN0cy9hcnJheXMuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIGlmIGFkZGl0aW9uYWwgcmVnaW9ucyB3ZXJlIGFkZGVkIHRvIHRoZSByZXNvdXJjZXMuaW1hZ2VzKVxuICAgICAqL1xuICAgIHVwZGF0ZVJlZ2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclJlZ2lvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHRzIHRoZSBwb2x5Z29uIGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gcmVnaW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlZ2lvbklyaSB0aGUgSXJpIG9mIHRoZSByZWdpb24gd2hvc2UgcG9seWdvbiBlbGVtZW50cyBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0UmVnaW9uKHJlZ2lvbklyaSkge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJlZ2lvbjogU1ZHUG9seWdvbkVsZW1lbnRbXSA9IHRoaXMucmVnaW9uc1tyZWdpb25JcmldO1xuXG4gICAgICAgIGlmIChhY3RpdmVSZWdpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwb2wgb2YgYWN0aXZlUmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgcG9sLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncm9pLXN2Z292ZXJsYXkgYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmhpZ2hsaWdodHMgdGhlIHBvbHlnb24gZWxlbWVudHMgb2YgYWxsIHJlZ2lvbnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVuaGlnaGxpZ2h0QWxsUmVnaW9ucygpIHtcblxuICAgICAgICBmb3IgKGNvbnN0IHJlZyBpbiB0aGlzLnJlZ2lvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZ2lvbnMuaGFzT3duUHJvcGVydHkocmVnKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcG9sIG9mIHRoaXMucmVnaW9uc1tyZWddKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3JvaS1zdmdvdmVybGF5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIE9wZW5TZWFkcmFnb24gdmlld2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXR1cFZpZXdlcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgdmlld2VyQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3NkLWNvbnRhaW5lcicpWzBdO1xuICAgICAgICBjb25zdCBvc2RPcHRpb25zID0ge1xuICAgICAgICAgICAgZWxlbWVudDogdmlld2VyQ29udGFpbmVyLFxuICAgICAgICAgICAgc2VxdWVuY2VNb2RlOiB0cnVlLFxuICAgICAgICAgICAgc2hvd1JlZmVyZW5jZVN0cmlwOiB0cnVlLFxuICAgICAgICAgICAgc2hvd05hdmlnYXRvcjogdHJ1ZSxcbiAgICAgICAgICAgIHpvb21JbkJ1dHRvbjogJ0tVSV9PU0RfWk9PTV9JTicsXG4gICAgICAgICAgICB6b29tT3V0QnV0dG9uOiAnS1VJX09TRF9aT09NX09VVCcsXG4gICAgICAgICAgICBwcmV2aW91c0J1dHRvbjogJ0tVSV9PU0RfUFJFVl9QQUdFJyxcbiAgICAgICAgICAgIG5leHRCdXR0b246ICdLVUlfT1NEX05FWFRfUEFHRScsXG4gICAgICAgICAgICBob21lQnV0dG9uOiAnS1VJX09TRF9IT01FJyxcbiAgICAgICAgICAgIGZ1bGxQYWdlQnV0dG9uOiAnS1VJX09TRF9GVUxMX1BBR0UnLFxuICAgICAgICAgICAgcm90YXRlTGVmdEJ1dHRvbjogJ0tVSV9PU0RfUk9UQVRFX0xFRlQnLCAgICAgICAgLy8gZG9lc24ndCB3b3JrIHlldFxuICAgICAgICAgICAgcm90YXRlUmlnaHRCdXR0b246ICdLVUlfT1NEX1JPVEFURV9SSUdIVCcgICAgICAgLy8gZG9lc24ndCB3b3JrIHlldFxuXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudmlld2VyID0gbmV3IE9wZW5TZWFkcmFnb24uVmlld2VyKG9zZE9wdGlvbnMpO1xuICAgICAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdmdWxsLXNjcmVlbicsIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5mdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdmlld2VyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmlld2VyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzLmV2ZW50U291cmNlLnN2Z092ZXJsYXkoKS5yZXNpemUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBpbWFnZXMgaW4gdGhpcy5pbWFnZXMgdG8gdGhlIHZpZXdlci5cbiAgICAgKiBJbWFnZXMgYXJlIHBvc2l0aW9uZWQgaW4gYSBob3Jpem9udGFsIHJvdyBuZXh0IHRvIGVhY2ggb3RoZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuSW1hZ2VzKCk6IHZvaWQge1xuICAgICAgICAvLyBpbWFnZVhPZmZzZXQgY29udHJvbHMgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbGVmdCBzaWRlIG9mIGVhY2ggaW1hZ2UgaW4gdGhlIE9wZW5TZWFkcmFnb24gdmlld3BvcnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgIC8vIFRoZSBmaXJzdCBpbWFnZSBoYXMgaXRzIGxlZnQgc2lkZSBhdCB4ID0gMCwgYW5kIGFsbCBpbWFnZXMgYXJlIHNjYWxlZCB0byBoYXZlIGEgd2lkdGggb2YgMSBpbiB2aWV3cG9ydCBjb29yZGluYXRlcy5cbiAgICAgICAgLy8gc2VlIGFsc286IGh0dHBzOi8vb3BlbnNlYWRyYWdvbi5naXRodWIuaW8vZXhhbXBsZXMvdmlld3BvcnQtY29vcmRpbmF0ZXMvXG5cbiAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHRoaXMuaW1hZ2VzLm1hcChcbiAgICAgICAgICAgIChpbWcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1nLnN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBkaXNwbGF5IG9ubHkgdGhlIGRlZmluZWQgcmFuZ2Ugb2YgdGhpcy5pbWFnZXNcbiAgICAgICAgY29uc3QgdGlsZVNvdXJjZXM6IE9iamVjdFtdID0gU3RpbGxJbWFnZUNvbXBvbmVudC5wcmVwYXJlVGlsZVNvdXJjZXNGcm9tRmlsZVZhbHVlcyhmaWxlVmFsdWVzKTtcblxuICAgICAgICB0aGlzLnJlbW92ZU92ZXJsYXlzKCk7XG4gICAgICAgIHRoaXMudmlld2VyLm9wZW4odGlsZVNvdXJjZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgU1ZHIG92ZXJsYXlzIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZU92ZXJsYXlzKCkge1xuXG4gICAgICAgIGZvciAoY29uc3QgcmVnIGluIHRoaXMucmVnaW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVnaW9ucy5oYXNPd25Qcm9wZXJ0eShyZWcpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwb2wgb2YgdGhpcy5yZWdpb25zW3JlZ10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvbCBpbnN0YW5jZW9mIFNWR1BvbHlnb25FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2wucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lvbnMgPSB7fTtcblxuICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgd29yayBieSB1c2luZyBvc2R2aWV3ZXIncyBhZGRPdmVybGF5IG1ldGhvZFxuICAgICAgICB0aGlzLnZpZXdlci5jbGVhck92ZXJsYXlzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIFJPSS1vdmVybGF5IHRvIHRoZSB2aWV3ZXIgZm9yIGV2ZXJ5IHJlZ2lvbiBvZiBldmVyeSBpbWFnZSBpbiB0aGlzLmltYWdlc1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVuZGVyUmVnaW9ucygpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnJlbW92ZU92ZXJsYXlzKCk7XG5cbiAgICAgICAgbGV0IGltYWdlWE9mZnNldCA9IDA7IC8vIHNlZSBkb2N1bWVudGF0aW9uIGluIHRoaXMub3BlbkltYWdlcygpIGZvciB0aGUgdXNhZ2Ugb2YgaW1hZ2VYT2Zmc2V0XG5cbiAgICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiB0aGlzLmltYWdlcykge1xuICAgICAgICAgICAgY29uc3QgYXNwZWN0UmF0aW8gPSAoaW1hZ2Uuc3RpbGxJbWFnZUZpbGVWYWx1ZS5kaW1ZIC8gaW1hZ2Uuc3RpbGxJbWFnZUZpbGVWYWx1ZS5kaW1YKTtcblxuICAgICAgICAgICAgLy8gY29sbGVjdCBhbGwgZ2VvbWV0cmllcyBiZWxvbmdpbmcgdG8gdGhpcyBwYWdlXG4gICAgICAgICAgICBjb25zdCBnZW9tZXRyaWVzOiBHZW9tZXRyeUZvclJlZ2lvbltdID0gW107XG4gICAgICAgICAgICBpbWFnZS5yZWdpb25zLm1hcCgocmVnKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lvbnNbcmVnLnJlZ2lvblJlc291cmNlLmlkXSA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdlb21zID0gcmVnLmdldEdlb21ldHJpZXMoKTtcblxuICAgICAgICAgICAgICAgIGdlb21zLm1hcCgoZ2VvbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZW9tRm9yUmVnID0gbmV3IEdlb21ldHJ5Rm9yUmVnaW9uKGdlb20uZ2VvbWV0cnksIHJlZy5yZWdpb25SZXNvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cmllcy5wdXNoKGdlb21Gb3JSZWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNvcnQgYWxsIGdlb21ldHJpZXMgYmVsb25naW5nIHRvIHRoaXMgcGFnZVxuICAgICAgICAgICAgZ2VvbWV0cmllcy5zb3J0KChnZW9tMSwgZ2VvbTIpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChnZW9tMS5nZW9tZXRyeS50eXBlID09PSAncmVjdGFuZ2xlJyAmJiBnZW9tMi5nZW9tZXRyeS50eXBlID09PSAncmVjdGFuZ2xlJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cmYxID0gU3RpbGxJbWFnZUNvbXBvbmVudC5zdXJmYWNlT2ZSZWN0YW5ndWxhclJlZ2lvbihnZW9tMS5nZW9tZXRyeSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cmYyID0gU3RpbGxJbWFnZUNvbXBvbmVudC5zdXJmYWNlT2ZSZWN0YW5ndWxhclJlZ2lvbihnZW9tMi5nZW9tZXRyeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgcmVnMSBpcyBzbWFsbGVyIHRoYW4gcmVnMiwgcmV0dXJuIDFcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVnMSB0aGVuIGNvbWVzIGFmdGVyIHJlZzIgYW5kIHRodXMgaXMgcmVuZGVyZWQgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cmYxIDwgc3VyZjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJlbmRlciBhbGwgZ2VvbWV0cmllcyBmb3IgdGhpcyBwYWdlXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGdlb20gb2YgZ2VvbWV0cmllcykge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBnZW9tLmdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU1ZHT3ZlcmxheShnZW9tLnJlZ2lvbi5pZCwgZ2VvbWV0cnksIGFzcGVjdFJhdGlvLCBpbWFnZVhPZmZzZXQsIGdlb20ucmVnaW9uLmxhYmVsKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbWFnZVhPZmZzZXQrKztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgYWRkcyBhIFJPSS1vdmVybGF5IHRvIHRoZSB2aWV3ZXJcbiAgICAgKiBAcGFyYW0gcmVnaW9uSXJpIHRoZSBJcmkgb2YgdGhlIHJlZ2lvbi5cbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnkgLSB0aGUgZ2VvbWV0cnkgZGVzY3JpYmluZyB0aGUgUk9JXG4gICAgICogQHBhcmFtIGFzcGVjdFJhdGlvIC0gIHRoZSBhc3BlY3RSYXRpbyAoaC93KSBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGdlb21ldHJ5IHNob3VsZCBiZSBwbGFjZWRcbiAgICAgKiBAcGFyYW0geE9mZnNldCAtICB0aGUgeC1vZmZzZXQgaW4gT3BlbnNlYWRyYWdvbiB2aWV3cG9ydCBjb29yZGluYXRlcyBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGdlb21ldHJ5IHNob3VsZCBiZSBwbGFjZWRcbiAgICAgKiBAcGFyYW0gdG9vbFRpcCAtICB0aGUgdG9vbHRpcCB3aGljaCBzaG91bGQgYmUgZGlzcGxheWVkIG9uIG1vdXNlaG92ZXIgb2YgdGhlIHN2ZyBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVTVkdPdmVybGF5KHJlZ2lvbklyaTogc3RyaW5nLCBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnksIGFzcGVjdFJhdGlvOiBudW1iZXIsIHhPZmZzZXQ6IG51bWJlciwgdG9vbFRpcDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpbmVDb2xvciA9IGdlb21ldHJ5LmxpbmVDb2xvcjtcbiAgICAgICAgY29uc3QgbGluZVdpZHRoID0gZ2VvbWV0cnkubGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdmdFbGVtZW50O1xuICAgICAgICBzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JlY3RhbmdsZSc6XG4gICAgICAgICAgICAgICAgc3ZnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncG9seWdvbicpOyAgLy8geWVzLCB3ZSByZW5kZXIgcmVjdGFuZ2xlcyBhcyBzdmcgcG9seWdvbiBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU1ZHQXR0cmlidXRlc1JlY3RhbmdsZShzdmdFbGVtZW50LCBnZW9tZXRyeSwgYXNwZWN0UmF0aW8sIHhPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncG9seWdvbic6XG4gICAgICAgICAgICAgICAgc3ZnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncG9seWdvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU1ZHQXR0cmlidXRlc1BvbHlnb24oc3ZnRWxlbWVudCwgZ2VvbWV0cnksIGFzcGVjdFJhdGlvLCB4T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICAgICAgICAgICAgc3ZnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnY2lyY2xlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTVkdBdHRyaWJ1dGVzQ2lyY2xlKHN2Z0VsZW1lbnQsIGdlb21ldHJ5LCBhc3BlY3RSYXRpbywgeE9mZnNldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogU3RpbGxJbWFnZU9TRFZpZXdlckNvbXBvbmVudC5jcmVhdGVTVkdPdmVybGF5OiB1bmtub3duIGdlb21ldHJ5VHlwZTogJyArIGdlb21ldHJ5LnR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdmdFbGVtZW50LmlkID0gJ3JvaS1zdmdvdmVybGF5LScgKyBNYXRoLnJhbmRvbSgpICogMTAwMDA7XG4gICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdyb2ktc3Znb3ZlcmxheScpO1xuICAgICAgICBzdmdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnc3Ryb2tlOiAnICsgbGluZUNvbG9yICsgJzsgc3Ryb2tlLXdpZHRoOiAnICsgbGluZVdpZHRoICsgJ3B4OycpO1xuXG4gICAgICAgIC8vIGV2ZW50IHdoZW4gYSByZWdpb24gaXMgY2xpY2tlZCAob3V0cHV0KVxuICAgICAgICBzdmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdpb25Ib3ZlcmVkLmVtaXQocmVnaW9uSXJpKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGNvbnN0IHN2Z1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICd0aXRsZScpO1xuICAgICAgICBzdmdUaXRsZS50ZXh0Q29udGVudCA9IHRvb2xUaXA7XG5cbiAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKTtcbiAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQoc3ZnVGl0bGUpO1xuICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChzdmdFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy52aWV3ZXIuc3ZnT3ZlcmxheSgpO1xuICAgICAgICBvdmVybGF5Lm5vZGUoKS5hcHBlbmRDaGlsZChzdmdHcm91cCk7IC8vIFRPRE86IHVzZSBtZXRob2Qgb3Nkdmlld2VyJ3MgbWV0aG9kIGFkZE92ZXJsYXlcblxuICAgICAgICB0aGlzLnJlZ2lvbnNbcmVnaW9uSXJpXS5wdXNoKHN2Z0VsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzIHRvIGNyZWF0ZSBhIFJPSS1vdmVybGF5IG9mIHR5cGUgJ3JlY3RhbmdsZScgdG8gYSBTVkdFbGVtZW50XG4gICAgICogQHBhcmFtIHN2Z0VsZW1lbnQgLSBhbiBTVkdFbGVtZW50IChzaG91bGQgaGF2ZSB0eXBlICdwb2x5Z29uJyAoc2ljKSlcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnkgLSB0aGUgZ2VvbWV0cnkgZGVzY3JpYmluZyB0aGUgcmVjdGFuZ2xlXG4gICAgICogQHBhcmFtIGFzcGVjdFJhdGlvIC0gdGhlIGFzcGVjdFJhdGlvIChoL3cpIG9mIHRoZSBpbWFnZSBvbiB3aGljaCB0aGUgY2lyY2xlIHNob3VsZCBiZSBwbGFjZWRcbiAgICAgKiBAcGFyYW0geE9mZnNldCAtIHRoZSB4LW9mZnNldCBpbiBPcGVuc2VhZHJhZ29uIHZpZXdwb3J0IGNvb3JkaW5hdGVzIG9mIHRoZSBpbWFnZSBvbiB3aGljaCB0aGUgY2lyY2xlIHNob3VsZCBiZSBwbGFjZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFNWR0F0dHJpYnV0ZXNSZWN0YW5nbGUoc3ZnRWxlbWVudDogU1ZHRWxlbWVudCwgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5LCBhc3BlY3RSYXRpbzogbnVtYmVyLCB4T2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcG9pbnRBID0gZ2VvbWV0cnkucG9pbnRzWzBdO1xuICAgICAgICBjb25zdCBwb2ludEIgPSBnZW9tZXRyeS5wb2ludHNbMV07XG5cbiAgICAgICAgLy8gZ2VvbWV0cnkucG9pbnRzIGNvbnRhaW5zIHR3byBkaWFnb25hbGx5IG9wcG9zZWQgY29ybmVycyBvZiB0aGUgcmVjdGFuZ2xlLCBidXQgdGhlIG9yZGVyIG9mIHRoZSBjb3JuZXJzIGlzIGFyYml0cmFyeS5cbiAgICAgICAgLy8gV2UgdGhlcmVmb3JlIGNvbnN0cnVjdCB0aGUgdXBwZXJsZWZ0IChVTCksIGxvd2VycmlnaHQgKExSKSwgdXBwZXJyaWdodCAoVVIpIGFuZCBsb3dlcmxlZnQgKExMKSBwb3NpdGlvbnMgb2YgdGhlIGNvcm5lcnMgd2l0aCBtaW4gYW5kIG1heCBvcGVyYXRpb25zLlxuICAgICAgICBjb25zdCBwb3NpdGlvblVMID0gbmV3IFBvaW50MkQoTWF0aC5taW4ocG9pbnRBLngsIHBvaW50Qi54KSwgTWF0aC5taW4ocG9pbnRBLnksIHBvaW50Qi55KSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uTFIgPSBuZXcgUG9pbnQyRChNYXRoLm1heChwb2ludEEueCwgcG9pbnRCLngpLCBNYXRoLm1heChwb2ludEEueSwgcG9pbnRCLnkpKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25VUiA9IG5ldyBQb2ludDJEKE1hdGgubWF4KHBvaW50QS54LCBwb2ludEIueCksIE1hdGgubWluKHBvaW50QS55LCBwb2ludEIueSkpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxMID0gbmV3IFBvaW50MkQoTWF0aC5taW4ocG9pbnRBLngsIHBvaW50Qi54KSwgTWF0aC5tYXgocG9pbnRBLnksIHBvaW50Qi55KSk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzID0gW3Bvc2l0aW9uVUwsIHBvc2l0aW9uVVIsIHBvc2l0aW9uTFIsIHBvc2l0aW9uTExdO1xuICAgICAgICBjb25zdCB2aWV3Q29vcmRQb2ludHMgPSB0aGlzLmltYWdlMlZpZXdQb3J0Q29vcmRzKHBvaW50cywgYXNwZWN0UmF0aW8sIHhPZmZzZXQpO1xuICAgICAgICBjb25zdCBwb2ludHNTdHJpbmcgPSB0aGlzLmNyZWF0ZVNWR1BvbHlnb25Qb2ludHNBdHRyaWJ1dGUodmlld0Nvb3JkUG9pbnRzKTtcbiAgICAgICAgc3ZnRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHBvaW50c1N0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgbmVjZXNzYXJ5IGF0dHJpYnV0ZXMgdG8gY3JlYXRlIGEgUk9JLW92ZXJsYXkgb2YgdHlwZSAncG9seWdvbicgdG8gYSBTVkdFbGVtZW50XG4gICAgICogQHBhcmFtIHN2Z0VsZW1lbnQgLSBhbiBTVkdFbGVtZW50IChzaG91bGQgaGF2ZSB0eXBlICdwb2x5Z29uJylcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnkgLSB0aGUgZ2VvbWV0cnkgZGVzY3JpYmluZyB0aGUgcG9seWdvblxuICAgICAqIEBwYXJhbSBhc3BlY3RSYXRpbyAtIHRoZSBhc3BlY3RSYXRpbyAoaC93KSBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICogQHBhcmFtIHhPZmZzZXQgLSB0aGUgeC1vZmZzZXQgaW4gT3BlbnNlYWRyYWdvbiB2aWV3cG9ydCBjb29yZGluYXRlcyBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRTVkdBdHRyaWJ1dGVzUG9seWdvbihzdmdFbGVtZW50OiBTVkdFbGVtZW50LCBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnksIGFzcGVjdFJhdGlvOiBudW1iZXIsIHhPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB2aWV3Q29vcmRQb2ludHMgPSB0aGlzLmltYWdlMlZpZXdQb3J0Q29vcmRzKGdlb21ldHJ5LnBvaW50cywgYXNwZWN0UmF0aW8sIHhPZmZzZXQpO1xuICAgICAgICBjb25zdCBwb2ludHNTdHJpbmcgPSB0aGlzLmNyZWF0ZVNWR1BvbHlnb25Qb2ludHNBdHRyaWJ1dGUodmlld0Nvb3JkUG9pbnRzKTtcbiAgICAgICAgc3ZnRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHBvaW50c1N0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgbmVjZXNzYXJ5IGF0dHJpYnV0ZXMgdG8gY3JlYXRlIGEgUk9JLW92ZXJsYXkgb2YgdHlwZSAnY2lyY2xlJyB0byBhIFNWR0VsZW1lbnRcbiAgICAgKiBAcGFyYW0gc3ZnRWxlbWVudCAtIGFuIFNWR0VsZW1lbnQgKHNob3VsZCBoYXZlIHR5cGUgJ2NpcmNsZScpXG4gICAgICogQHBhcmFtIGdlb21ldHJ5IC0gdGhlIGdlb21ldHJ5IGRlc2NyaWJpbmcgdGhlIGNpcmNsZVxuICAgICAqIEBwYXJhbSBhc3BlY3RSYXRpbyAtIHRoZSBhc3BlY3RSYXRpbyAoaC93KSBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICogQHBhcmFtIHhPZmZzZXQgLSB0aGUgeC1vZmZzZXQgaW4gT3BlbnNlYWRyYWdvbiB2aWV3cG9ydCBjb29yZGluYXRlcyBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRTVkdBdHRyaWJ1dGVzQ2lyY2xlKHN2Z0VsZW1lbnQ6IFNWR0VsZW1lbnQsIGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeSwgYXNwZWN0UmF0aW86IG51bWJlciwgeE9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZpZXdDb29yZFBvaW50cyA9IHRoaXMuaW1hZ2UyVmlld1BvcnRDb29yZHMoZ2VvbWV0cnkucG9pbnRzLCBhc3BlY3RSYXRpbywgeE9mZnNldCk7XG4gICAgICAgIGNvbnN0IGN4ID0gU3RyaW5nKHZpZXdDb29yZFBvaW50c1swXS54KTtcbiAgICAgICAgY29uc3QgY3kgPSBTdHJpbmcodmlld0Nvb3JkUG9pbnRzWzBdLnkpO1xuICAgICAgICAvLyBnZW9tZXRyeS5yYWRpdXMgY29udGFpbnMgbm90IHRoZSByYWRpdXMgaXRzZWxmLCBidXQgdGhlIGNvb3JkaW5hdGVzIG9mIGEgKGFyYml0cmFyeSkgcG9pbnQgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgLy8gV2UgdGhlcmVmb3JlIGhhdmUgdG8gY2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBnZW9tZXRyeS5yYWRpdXMgdG8gZ2V0IHRoZSBhY3R1YWwgcmFkaXVzLiAtPiBzcXJ0KHheMiArIHleMilcbiAgICAgICAgLy8gU2luY2UgZ2VvbWV0cnkucmFkaXVzIGhhcyBpdHMgeSBjb29yZGluYXRlIHNjYWxlZCB0byB0aGUgaGVpZ2h0IG9mIHRoZSBpbWFnZSxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBtdWx0aXBseSBpdCB3aXRoIHRoZSBhc3BlY3RSYXRpbyB0byBnZXQgdG8gdGhlIHNjYWxlIHVzZWQgYnkgT3BlbnNlYWRyYWdvbiwgYW5hbG9ndW91cyB0byB0aGlzLmltYWdlMlZpZXdQb3J0Q29vcmRzKClcbiAgICAgICAgY29uc3QgcmFkaXVzID0gU3RyaW5nKE1hdGguc3FydChnZW9tZXRyeS5yYWRpdXMueCAqIGdlb21ldHJ5LnJhZGl1cy54ICsgYXNwZWN0UmF0aW8gKiBhc3BlY3RSYXRpbyAqIGdlb21ldHJ5LnJhZGl1cy55ICogZ2VvbWV0cnkucmFkaXVzLnkpKTtcbiAgICAgICAgc3ZnRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gpO1xuICAgICAgICBzdmdFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCBjeSk7XG4gICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKCdyJywgcmFkaXVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgUG9pbnQyRFtdIHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gYW4gaW1hZ2UgdG8gYSBuZXcgUG9pbnQyRFtdIHdpdGggY29vcmRpbmF0ZXMgaW4gdGhlIHZpZXdwb3J0IGNvb3JkaW5hdGUgc3lzdGVtIG9mIE9wZW5zZWFkcmFnb25cbiAgICAgKiBzZWUgYWxzbzogaHR0cHM6Ly9vcGVuc2VhZHJhZ29uLmdpdGh1Yi5pby9leGFtcGxlcy92aWV3cG9ydC1jb29yZGluYXRlcy9cbiAgICAgKiBAcGFyYW0gcG9pbnRzIC0gYW4gYXJyYXkgb2YgcG9pbnRzIGluIGNvb3JkaW5hdGUgc3lzdGVtIHJlbGF0aXZlIHRvIGFuIGltYWdlXG4gICAgICogQHBhcmFtIGFzcGVjdFJhdGlvIC0gdGhlIGFzcGVjdFJhdGlvIChoL3cpIG9mIHRoZSBpbWFnZVxuICAgICAqIEBwYXJhbSB4T2Zmc2V0IC0gdGhlIHgtb2Zmc2V0IGluIHZpZXdwb3J0IGNvb3JkaW5hdGVzIG9mIHRoZSBpbWFnZVxuICAgICAqIEByZXR1cm5zIC0gYSBuZXcgUG9pbnQyRFtdIHdpdGggY29vcmRpbmF0ZXMgaW4gdGhlIHZpZXdwb3J0IGNvb3JkaW5hdGUgc3lzdGVtIG9mIE9wZW5zZWFkcmFnb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGltYWdlMlZpZXdQb3J0Q29vcmRzKHBvaW50czogUG9pbnQyRFtdLCBhc3BlY3RSYXRpbzogbnVtYmVyLCB4T2Zmc2V0OiBudW1iZXIpOiBQb2ludDJEW10ge1xuICAgICAgICByZXR1cm4gcG9pbnRzLm1hcCgocG9pbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQyRChwb2ludC54ICsgeE9mZnNldCwgcG9pbnQueSAqIGFzcGVjdFJhdGlvKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBpbiB0aGUgZm9ybWF0IGV4cGVjdGVkIGJ5IHRoZSAncG9pbnRzJyBhdHRyaWJ1dGUgb2YgYSBTVkdFbGVtZW50XG4gICAgICogQHBhcmFtIHBvaW50cyAtIGFuIGFycmF5IG9mIHBvaW50cyB0byBiZSBzZXJpYWxpemVkIHRvIGEgc3RyaW5nXG4gICAgICogQHJldHVybnMgLSB0aGUgcG9pbnRzIHNlcmlhbGl6ZWQgdG8gYSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBleHBlY3RlZCBieSB0aGUgJ3BvaW50cycgYXR0cmlidXRlIG9mIGEgU1ZHRWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU1ZHUG9seWdvblBvaW50c0F0dHJpYnV0ZShwb2ludHM6IFBvaW50MkRbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBwb2ludHNTdHJpbmcgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHBvaW50cykge1xuICAgICAgICAgICAgaWYgKHBvaW50cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIHBvaW50c1N0cmluZyArPSBwb2ludHNbaV0ueDtcbiAgICAgICAgICAgICAgICBwb2ludHNTdHJpbmcgKz0gJywnO1xuICAgICAgICAgICAgICAgIHBvaW50c1N0cmluZyArPSBwb2ludHNbaV0ueTtcbiAgICAgICAgICAgICAgICBwb2ludHNTdHJpbmcgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb2ludHNTdHJpbmc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXRleHQnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICB0ZXh0IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEJvb2xlYW5WYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWJvb2xlYW4tdmFsdWUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtY2hlY2tib3ggW2NoZWNrZWRdPVwidmFsdWVPYmplY3QuYm9vbFwiIGRpc2FibGVkPVwidHJ1ZVwiPjwvbWF0LWNoZWNrYm94PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEJvb2xlYW5WYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkQm9vbGVhblZhbHVlKSB7XG4gICAgICB0aGlzLl9ib29sZWFuVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ib29sZWFuVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9ib29sZWFuVmFsdWVPYmo6IFJlYWRCb29sZWFuVmFsdWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZENvbG9yVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWNvbG9yLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInZhbHVlT2JqZWN0LmNvbG9ySGV4XCI+e3t2YWx1ZU9iamVjdC5jb2xvckhleH19PC9zcGFuPmAsXG4gICAgc3R5bGVzOiBbYC5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjM2cHg7b3ZlcmZsb3cteDp2aXNpYmxlfWBdXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yVmFsdWVDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRDb2xvclZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yVmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvclZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbG9yVmFsdWVPYmo6IFJlYWRDb2xvclZhbHVlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWgsIFByZWNpc2lvbiwgUmVhZERhdGVWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWRhdGUtdmFsdWUnLFxuICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwicGVyaW9kOyBlbHNlIHByZWNpc2VEYXRlXCI+XG4gICAge3tkYXRlc1swXS5kYXRlIHwgZGF0ZTogZGF0ZXNbMF0uZm9ybWF0fX1cbiAgICA8c3BhbiAqbmdJZj1cImVyYVwiPlxuICAgICAgICB7e2RhdGVzWzBdLmVyYX19XG4gICAgPC9zcGFuPlxuICAgIC0ge3tkYXRlc1sxXS5kYXRlIHwgZGF0ZTogZGF0ZXNbMV0uZm9ybWF0fX1cbiAgICA8c3BhbiAqbmdJZj1cImVyYVwiPlxuICAgICAgICB7e2RhdGVzWzFdLmVyYX19XG4gICAgPC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJjYWxlbmRhclwiPlxuICAgICAgICAoe3tkYXRlc1swXS5jYWxlbmRhcn19KVxuICAgIDwvc3Bhbj5cbjwvc3Bhbj5cblxuPG5nLXRlbXBsYXRlICNwcmVjaXNlRGF0ZT5cblxuICAgIDxzcGFuPlxuICAgICAgICB7e2RhdGVzWzBdLmRhdGUgfCBkYXRlOiBkYXRlc1swXS5mb3JtYXR9fVxuICAgICAgICA8c3BhbiAqbmdJZj1cImVyYVwiPlxuICAgICAgICAgICAge3tkYXRlc1swXS5lcmF9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICh7e2RhdGVzWzBdLmNhbGVuZGFyfX0pXG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVZhbHVlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgY2FsZW5kYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jYWxlbmRhciA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNhbGVuZGFyKCkge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhcjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBlcmEodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lcmEgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBlcmEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VyYTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZERhdGVWYWx1ZSkge1xuICAgIHRoaXMuX2RhdGVWYWx1ZU9iaiA9IHZhbHVlO1xuXG4gICAgY29uc3QgZGF0ZU9yUmFuZ2U6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWggPSB0aGlzLnZhbHVlT2JqZWN0LmdldERhdGVTYWxzYWgoKTtcbiAgICBpZiAoZGF0ZU9yUmFuZ2UgaW5zdGFuY2VvZiBEYXRlUmFuZ2VTYWxzYWgpIHtcbiAgICAgIC8vIHBlcmlvZCAoc3RhcnQgYW5kIGVuZCBkYXRlcylcbiAgICAgIHRoaXMucGVyaW9kID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGF0ZXMgPSBbdGhpcy5nZXRKU0RhdGUoZGF0ZU9yUmFuZ2Uuc3RhcnQpLCB0aGlzLmdldEpTRGF0ZShkYXRlT3JSYW5nZS5lbmQpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2luZ2xlIGRhdGVcbiAgICAgIHRoaXMucGVyaW9kID0gZmFsc2U7XG4gICAgICB0aGlzLmRhdGVzID0gW3RoaXMuZ2V0SlNEYXRlKGRhdGVPclJhbmdlKV07XG4gICAgfVxuXG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVWYWx1ZU9iajtcbiAgfVxuXG4gIGRhdGVzOiBEYXRlRm9ybWF0dGVyW107XG4gIHBlcmlvZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfY2FsZW5kYXI6IGJvb2xlYW47XG4gIHByaXZhdGUgX2VyYTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZGF0ZVZhbHVlT2JqOiBSZWFkRGF0ZVZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgYERhdGVTYWxzYWhgIHRvIGEgSlMgRGF0ZSwgcHJvdmlkaW5nIG5lY2Vzc2FyeSBmb3JtYXR0aW5nIGluZm9ybWF0aW9uLlxuICAgKiBKVUxJQU4gYW5kIEdSRUdPUklBTiBjYWxlbmRhciBhcmUgdGhlIG9ubHkgYXZhaWxhYmxlIGZvciB0aGUgbW9tZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBiZSBjb252ZXJ0ZWQuXG4gICAqIEByZXR1cm4gRGF0ZUZvcm1hdHRlci5cbiAgICovXG4gIGdldEpTRGF0ZShkYXRlOiBEYXRlU2Fsc2FoKTogRGF0ZUZvcm1hdHRlciB7XG5cbiAgICBpZiAoZGF0ZS5wcmVjaXNpb24gPT09IFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmb3JtYXQ6ICd5eXl5JyxcbiAgICAgICAgZGF0ZTogbmV3IERhdGUoZGF0ZS55ZWFyLnRvU3RyaW5nKCkpLFxuICAgICAgICBlcmE6IGRhdGUuZXJhLFxuICAgICAgICBjYWxlbmRhcjogZGF0ZS5jYWxlbmRhclxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRhdGUucHJlY2lzaW9uID09PSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1hdDogJ01NTU0gJyArICd5eXl5JyxcbiAgICAgICAgZGF0ZTogbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgMSksIC8vIDAgYmFzZSBtb250aFxuICAgICAgICBlcmE6IGRhdGUuZXJhLFxuICAgICAgICBjYWxlbmRhcjogZGF0ZS5jYWxlbmRhclxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRhdGUucHJlY2lzaW9uID09PSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmb3JtYXQ6ICdsb25nRGF0ZScsXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KSwgIC8vIDAgYmFzZSBtb250aFxuICAgICAgICBlcmE6IGRhdGUuZXJhLFxuICAgICAgICBjYWxlbmRhcjogZGF0ZS5jYWxlbmRhclxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IGluY29ycmVjdCBwcmVjaXNpb24gZm9yIGRhdGUnKTtcbiAgICB9XG5cbiAgfVxuXG59XG5cbi8qKlxuICogRGF0ZSBzdHJ1Y3R1cmUgZm9yIHRoZSB0ZW1wbGF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVGb3JtYXR0ZXIge1xuICBmb3JtYXQ6IHN0cmluZztcbiAgZGF0ZTogRGF0ZTtcbiAgZXJhOiBzdHJpbmc7XG4gIGNhbGVuZGFyOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkRGVjaW1hbFZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZGVjaW1hbC12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC5kZWNpbWFsfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY2ltYWxWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkRGVjaW1hbFZhbHVlKSB7XG4gICAgdGhpcy5fZGVjaW1hbFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY2ltYWxWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2RlY2ltYWxWYWx1ZU9iajogUmVhZERlY2ltYWxWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZXh0ZXJuYWwtcmVzLXZhbHVlJyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgZXh0ZXJuYWwtcmVzLXZhbHVlIHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEV4dGVybmFsUmVzVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEdlb21WYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWdlb21ldHJ5LXZhbHVlJyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj57e3ZhbHVlT2JqZWN0Lmdlb21ldHJ5U3RyaW5nfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5VmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZEdlb21WYWx1ZSkge1xuICAgIHRoaXMuX2dlb21WYWx1ZU9iaiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9nZW9tVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9nZW9tVmFsdWVPYmo6IFJlYWRHZW9tVmFsdWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWdlb25hbWUtdmFsdWUnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBnZW9uYW1lLXZhbHVlIHdvcmtzIVxuPC9wPmAsXG4gIHN0eWxlczogW2AubWF0LWZvcm0tZmllbGR7d2lkdGg6MzIwcHh9LmZpbGwtcmVtYWluaW5nLXNwYWNle2ZsZXg6MSAxIGF1dG99LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ubGlua3tjdXJzb3I6cG9pbnRlcn0ubHYtaHRtbC10ZXh0e21heC1oZWlnaHQ6NjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lmx2LXJlYWQtbW9yZXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MDtwYWRkaW5nOjMwcHggMDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9uYW1lVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEludGVnZXJWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktaW50ZWdlci12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8c3Bhbj57e3ZhbHVlT2JqZWN0LmludGVnZXJ9fTwvc3Bhbj5gLFxuICAgIHN0eWxlczogW2AubWF0LWZvcm0tZmllbGR7d2lkdGg6MzIwcHh9LmZpbGwtcmVtYWluaW5nLXNwYWNle2ZsZXg6MSAxIGF1dG99LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ubGlua3tjdXJzb3I6cG9pbnRlcn0ubHYtaHRtbC10ZXh0e21heC1oZWlnaHQ6NjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lmx2LXJlYWQtbW9yZXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MDtwYWRkaW5nOjMwcHggMDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBJbnRlZ2VyVmFsdWVDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRJbnRlZ2VyVmFsdWUpIHtcbiAgICAgICAgdGhpcy5faW50ZWdlclZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZWdlclZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ludGVnZXJWYWx1ZU9iajogUmVhZEludGVnZXJWYWx1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEludGVydmFsVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1pbnRlcnZhbC12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC5pbnRlcnZhbFN0YXJ0fX0gLSB7e3ZhbHVlT2JqZWN0LmludGVydmFsRW5kfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEludGVydmFsVmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZEludGVydmFsVmFsdWUpIHtcbiAgICB0aGlzLl9pbnRlcnZhbFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVydmFsVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9pbnRlcnZhbFZhbHVlT2JqOiBSZWFkSW50ZXJ2YWxWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkTGlua1ZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1saW5rLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZTogYDxhIGNsYXNzPVwic2Fsc2FoLWxpbmtcIiAoY2xpY2spPVwicmVmUmVzQ2xpY2tlZCgpXCI+e3tyZWZlcnJlZFJlc291cmNlfX08L2E+YCxcbiAgICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTGlua1ZhbHVlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG9udG9sb2d5SW5mbyh2YWx1ZTogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICB0aGlzLl9vbnRvSW5mbyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvbnRvbG9neUluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvSW5mbztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZExpbmtWYWx1ZSkge1xuICAgICAgICB0aGlzLl9saW5rVmFsdWVPYmogPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZU9iamVjdC5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVmZXJyZWRSZXNvdXJjZSA9IHRoaXMudmFsdWVPYmplY3QucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmZXJyZWRSZXNvdXJjZSA9IHRoaXMudmFsdWVPYmplY3QucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmtWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWZlcnJlZFJlc291cmNlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPFJlYWRMaW5rVmFsdWU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfbGlua1ZhbHVlT2JqOiBSZWFkTGlua1ZhbHVlO1xuICAgIHByaXZhdGUgX29udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIHJlZmVycmVkUmVzb3VyY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICByZWZSZXNDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnJlZmVycmVkUmVzb3VyY2VDbGlja2VkLmVtaXQodGhpcy5fbGlua1ZhbHVlT2JqKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkTGlzdFZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktbGlzdC12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC5saXN0Tm9kZUxhYmVsfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkTGlzdFZhbHVlKSB7XG4gICAgdGhpcy5fbGlzdFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RWYWx1ZU9iajogUmVhZExpc3RWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFRleHRWYWx1ZUFzSHRtbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktdGV4dC12YWx1ZS1hcy1odG1sJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+e3t2YWx1ZU9iamVjdC5odG1sfX08L2Rpdj5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVBc0h0bWxDb21wb25lbnQge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVmZXJyZWRSZXNvdXJjZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgb250b2xvZ3lJbmZvKHZhbHVlOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIHRoaXMuX29udG9JbmZvID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG9udG9sb2d5SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9JbmZvO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGJpbmRFdmVudHModmFsdWU6IEJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYmluZEV2ZW50cyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBiaW5kRXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZEV2ZW50cztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFRleHRWYWx1ZUFzSHRtbCkge1xuICAgICAgICB0aGlzLl9odG1sVmFsdWVPYmogPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMudmFsdWVPYmplY3QuaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0bWxWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBodG1sOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaHRtbFZhbHVlT2JqOiBSZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIHByaXZhdGUgX29udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIHByaXZhdGUgX2JpbmRFdmVudHM6IEJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgcmVmUmVzQ2xpY2tlZChyZWZSZXNvdXJjZUlyaTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVmZXJyZWRSZXNvdXJjZUNsaWNrZWQuZW1pdChyZWZSZXNvdXJjZUlyaSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYSBjbGljayBldmVudCB0byBzdGFuZG9mZiBsaW5rcyB0aGF0IHNob3dzIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0YXJnZXRFbGVtZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgICBvbkNsaWNrKHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JpbmRFdmVudHMgJiYgdGFyZ2V0RWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYSdcbiAgICAgICAgICAgICYmIHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihLbm9yYUNvbnN0YW50cy5TYWxzYWhMaW5rKSA+PSAwXG4gICAgICAgICAgICAmJiB0YXJnZXRFbGVtZW50LmhyZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZWZSZXNDbGlja2VkKHRhcmdldEVsZW1lbnQuaHJlZik7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IHByb3BhZ2F0aW9uXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaW5kRXZlbnRzICYmIHRhcmdldEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnICYmIHRhcmdldEVsZW1lbnQuaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBvcGVuIGxpbmsgaW4gYSBuZXcgd2luZG93XG4gICAgICAgICAgICB3aW5kb3cub3Blbih0YXJnZXRFbGVtZW50LmhyZWYsICdfYmxhbmsnKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcHJvcGFnYXRpb25cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcHJvcGFnYXRpb25cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLXN0cmluZycsXG4gICAgdGVtcGxhdGU6IGA8c3Bhbj57e3ZhbHVlT2JqZWN0LnN0cn19PC9zcGFuPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dFZhbHVlQXNTdHJpbmdDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRUZXh0VmFsdWVBc1N0cmluZykge1xuICAgICAgICB0aGlzLl90ZXh0U3RyaW5nVmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0U3RyaW5nVmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGV4dFN0cmluZ1ZhbHVlT2JqOiBSZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRUZXh0VmFsdWVBc1htbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktdGV4dC12YWx1ZS1hcy14bWwnLFxuICAgIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC54bWx9fTwvc3Bhbj5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVBc1htbENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFRleHRWYWx1ZUFzWG1sKSB7XG4gICAgICAgIHRoaXMuX3htbFZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feG1sVmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfeG1sVmFsdWVPYmo6IFJlYWRUZXh0VmFsdWVBc1htbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRGaWxlVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS10ZXh0ZmlsZS12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cInt7dmFsdWVPYmplY3QudGV4dEZpbGVVUkx9fVwiPnt7dmFsdWVPYmplY3QudGV4dEZpbGVuYW1lfX08L2E+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRmaWxlVmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFRleHRGaWxlVmFsdWUpIHtcbiAgICB0aGlzLl90ZXh0ZmlsZVZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHRmaWxlVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF90ZXh0ZmlsZVZhbHVlT2JqOiBSZWFkVGV4dEZpbGVWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkVXJpVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS11cmktdmFsdWUnLFxuICB0ZW1wbGF0ZTogYDxhIGhyZWY9XCJ7e3ZhbHVlT2JqZWN0LnVyaX19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3t2YWx1ZU9iamVjdC51cml9fTwvYT5gLFxuICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgVXJpVmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFVyaVZhbHVlKSB7XG4gICAgdGhpcy5fX3VyaVZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX191cmlWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX191cmlWYWx1ZU9iajogUmVhZFVyaVZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1jb21wYXJlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBjb21wYXJlLXZpZXcgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQ29tcGFyZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWdyYXBoLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBncmFwaC12aWV3IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEdyYXBoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZ3JpZC12aWV3JyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8a3VpLXByb2dyZXNzLWluZGljYXRvciAqbmdJZj1cImlzTG9hZGluZ1wiIFtjb2xvcl09XCInI0Q4ODk1OCdcIj48L2t1aS1wcm9ncmVzcy1pbmRpY2F0b3I+XG5cbiAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXQueHM9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cImdyaWRcIj5cblxuICAgIDxkaXYgZnhGbGV4LnNtPVwiNTBcIiBmeEZsZXgubWQ9XCIzMy4zXCIgZnhGbGV4LmxnPVwiMjBcIiBmeEZsZXgueGw9XCIxNi42XCIgZnhGbGV4PVwiMTYuNlwiICpuZ0Zvcj1cImxldCByZXMgb2YgcmVzdWx0XCIgY2xhc3M9XCJndi1wcmV2aWV3XCI+XG4gICAgICA8bWF0LWNhcmQgY2xhc3M9XCJsaW5rXCI+XG5cbiAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPnt7b250b2xvZ3lJbmZvPy5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzLnR5cGUpfX08L21hdC1jYXJkLXN1YnRpdGxlPlxuICAgICAgICA8bWF0LWNhcmQtdGl0bGU+e3tyZXMubGFiZWx9fTwvbWF0LWNhcmQtdGl0bGU+XG5cblxuICAgICAgICA8bWF0LWNhcmQtY29udGVudCAqbmdGb3I9XCJsZXQgcHJvcCBvZiByZXMucHJvcGVydGllcyB8IGt1aUtleVwiPlxuICAgICAgICAgIDwhLS0gZGVzY3JpcHRpb24gLS0+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgdmFsIG9mIHByb3AudmFsdWUgfCBrdWlLZXlcIj5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInZhbC52YWx1ZS5nZXRDbGFzc05hbWUoKVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibHYtaHRtbC10ZXh0XCIgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWxcIj5cbiAgICAgICAgICAgICAgICA8a3VpLXRleHQtdmFsdWUtYXMtaHRtbCBbdmFsdWVPYmplY3RdPVwidmFsLnZhbHVlXCIgW29udG9sb2d5SW5mb109XCJvbnRvbG9neUluZm9cIiBbYmluZEV2ZW50c109XCJmYWxzZVwiPjwva3VpLXRleHQtdmFsdWUtYXMtaHRtbD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImx2LXJlYWQtbW9yZVwiPjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGt1aS1kYXRlLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbC52YWx1ZVwiIFtjYWxlbmRhcl09XCJ0cnVlXCIgW2VyYV09XCJ0cnVlXCI+PC9rdWktZGF0ZS12YWx1ZT5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0PVwiXCI+e3t2YWwudmFsdWUuZ2V0Q29udGVudCgpfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwib250b2xvZ3lJbmZvPy5nZXRMYWJlbEZvclByb3BlcnR5KHByb3Aua2V5KSAhPT0gJ1RleHQnXCI+XG4gICAgICAgICAgICAgICAge3tvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUHJvcGVydHkocHJvcC5rZXkpfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cblxuICAgICAgPC9tYXQtY2FyZD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cblxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fS5ndi1wcmV2aWV3e21hcmdpbjo2cHggMDtwYWRkaW5nOjI0cHg7d29yZC13cmFwOmJyZWFrLXdvcmQ7Ym9yZGVyLXJhZGl1czo1cHh9Lmd2LXByZXZpZXcgLm1hdC1jYXJke2hlaWdodDoxNjBweDtjb2xvcjpyZ2JhKDAsMCwwLC44MSk7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmctYm90dG9tOjI1cHh9Lmd2LXByZXZpZXcgLm1hdC1jYXJkOmhvdmVye2JhY2tncm91bmQ6cmdiYSgwLDEwNSw5MiwuMzkpO2NvbG9yOiMwMDB9Lmd2LXByZXZpZXcgLm1hdC1jYXJkOmFjdGl2ZXtiYWNrZ3JvdW5kOnJnYmEoMCwxMDUsOTIsLjYxKX0uZ3YtcHJldmlldyAubWF0LWNhcmQgLm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToxMnB0O2ZvbnQtd2VpZ2h0OjYwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcmVzdWx0O1xuICBASW5wdXQoKSBvbnRvbG9neUluZm87XG4gIEBJbnB1dCgpIGlzTG9hZGluZztcblxuICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1saXN0LXZpZXcnLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8a3VpLXByb2dyZXNzLWluZGljYXRvciAqbmdJZj1cImlzTG9hZGluZ1wiIFtjb2xvcl09XCInI0Q4ODk1OCdcIj48L2t1aS1wcm9ncmVzcy1pbmRpY2F0b3I+XG5cbiAgICA8bWF0LWxpc3QgY2xhc3M9XCJsaXN0LXZpZXcgbHYtaXRlbXNcIiAqbmdGb3I9XCJsZXQgcmVzIG9mIHJlc3VsdDsgbGV0IGkgPSBpbmRleDsgbGV0IGxhc3QgPSBsYXN0O1wiPlxuICAgICAgICA8bWF0LWxpc3QtaXRlbSBjbGFzcz1cImxpbmtcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRMaXN0SWNvbj5pbWFnZV9zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPGgyIG1hdExpbmUgY2xhc3M9XCJsdi1sYWJlbFwiPnt7b250b2xvZ3lJbmZvPy5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzLnR5cGUpfX0gLSB7e3Jlcy5sYWJlbH19PC9oMj5cblxuICAgICAgICAgICAgPGRpdiBtYXRMaW5lICpuZ0Zvcj1cImxldCBwcm9wIG9mIHJlcy5wcm9wZXJ0aWVzIHwga3VpS2V5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgdmFsIG9mIHByb3AudmFsdWUgfCBrdWlLZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwidmFsLnZhbHVlLmdldENsYXNzTmFtZSgpXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbWF0TGluZSBjbGFzcz1cImx2LWh0bWwtdGV4dFwiICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGt1aS10ZXh0LXZhbHVlLWFzLWh0bWwgW3ZhbHVlT2JqZWN0XT1cInZhbC52YWx1ZVwiIFtvbnRvbG9neUluZm9dPVwib250b2xvZ3lJbmZvXCIgW2JpbmRFdmVudHNdPVwiZmFsc2VcIj48L2t1aS10ZXh0LXZhbHVlLWFzLWh0bWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJsdi1yZWFkLW1vcmVcIj48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gbWF0TGluZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8a3VpLWRhdGUtdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsLnZhbHVlXCIgW2NhbGVuZGFyXT1cInRydWVcIiBbZXJhXT1cInRydWVcIj48L2t1aS1kYXRlLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ9XCJcIj57e3ZhbC52YWx1ZS5nZXRDb250ZW50KCl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdExpbmUgKm5nSWY9XCJvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUHJvcGVydHkocHJvcC5rZXkpICE9PSAnVGV4dCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29udG9sb2d5SW5mbz8uZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wLmtleSl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvbWF0LWxpc3QtaXRlbT5cblxuICAgICAgICA8bWF0LWRpdmlkZXIgKm5nSWY9XCIhbGFzdFwiPjwvbWF0LWRpdmlkZXI+XG5cbiAgICA8L21hdC1saXN0PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3JtYWwhaW1wb3J0YW50O21heC13aWR0aDo5NSV9Lmxpc3QtdmlldyAubWF0LWxpc3QtaXRlbXtoZWlnaHQ6YXV0bzttaW4taGVpZ2h0OjQwcHg7cGFkZGluZzo4cHggMH0ubHYtbGFiZWx7Zm9udC13ZWlnaHQ6NzAwIWltcG9ydGFudH0ubHYtaXRlbXN7bWF4LXdpZHRoOjYwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWaWV3Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHJlc3VsdDtcbiAgICBASW5wdXQoKSBvbnRvbG9neUluZm87XG4gICAgQElucHV0KCkgaXNMb2FkaW5nO1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1wcm9wZXJ0aWVzLXZpZXcnLFxuICAgIHRlbXBsYXRlOiBgPHA+XG4gICAgcHJvcGVydGllcy12aWV3IHdvcmtzIVxuPC9wPmAsXG4gICAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXNWaWV3Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlRXJyb3IsXG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBDb252ZXJ0SlNPTkxELFxuICAgIEluY29taW5nU2VydmljZSxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgICBPbnRvbG9neUluZm9ybWF0aW9uLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVzb3VyY2VTZXJ2aWNlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLXZpZXcnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1jYXJkPlxuXG4gICAgPCEtLSBUT0RPOiBzd2l0Y2ggdGhyb3VnaCB0aGUgbWVkaWEgdHlwZSAtLT5cbiAgICA8a3VpLXN0aWxsLWltYWdlPjwva3VpLXN0aWxsLWltYWdlPlxuICAgIDxrdWktbW92aW5nLWltYWdlPjwva3VpLW1vdmluZy1pbWFnZT5cbiAgICA8a3VpLWFubm90YXRpb24+PC9rdWktYW5ub3RhdGlvbj5cbiAgICA8a3VpLWF1ZGlvPjwva3VpLWF1ZGlvPlxuICAgIDxrdWktY29sbGVjdGlvbj48L2t1aS1jb2xsZWN0aW9uPlxuICAgIDxrdWktZGRkPjwva3VpLWRkZD5cbiAgICA8a3VpLWRvY3VtZW50Pjwva3VpLWRvY3VtZW50PlxuICAgIDxrdWktbGluay1vYmo+PC9rdWktbGluay1vYmo+XG4gICAgPGt1aS1vYmplY3Q+PC9rdWktb2JqZWN0PlxuICAgIDxrdWktcmVnaW9uPjwva3VpLXJlZ2lvbj5cbiAgICA8a3VpLXRleHQ+PC9rdWktdGV4dD5cblxuICAgIDxoMj5tZXRhZGF0YSBmb3IgcmVzb3VyY2Uge3sgcmVzb3VyY2U/LmxhYmVsfX0gKHt7IHJlc291cmNlPy5pZCB9fSk8L2gyPlxuICAgIDxoMz50eXBlOiB7e29udG9sb2d5SW5mbz8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlc291cmNlPy50eXBlKX19PC9oMz5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgcmVzb3VyY2U/LnByb3BlcnRpZXMgfCBrdWlLZXlcIj5cbiAgICAgICAgPG1hdC1saXN0PlxuICAgICAgICAgICAgPHNwYW4+e3tvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUHJvcGVydHkocHJvcC5rZXkpfX08L3NwYW4+XG4gICAgICAgICAgICA8bWF0LWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgdmFsIG9mIHByb3AudmFsdWVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwidmFsLmdldENsYXNzTmFtZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktY29sb3ItdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWNvbG9yLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLXRleHQtdmFsdWUtYXMtaHRtbCAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbFwiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIiBbb250b2xvZ3lJbmZvXT1cIm9udG9sb2d5SW5mb1wiIFtiaW5kRXZlbnRzXT1cInRydWVcIj48L2t1aS10ZXh0LXZhbHVlLWFzLWh0bWw+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktdGV4dC12YWx1ZS1hcy1zdHJpbmcgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZ1wiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIj48L2t1aS10ZXh0LXZhbHVlLWFzLXN0cmluZz5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS10ZXh0LXZhbHVlLWFzLXhtbCAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLXRleHQtdmFsdWUtYXMteG1sPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWRhdGUtdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktZGF0ZS12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1saW5rLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiIFtvbnRvbG9neUluZm9dPVwib250b2xvZ3lJbmZvXCI+PC9rdWktbGluay12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1pbnRlZ2VyLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWludGVnZXItdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktZGVjaW1hbC12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZVwiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIj48L2t1aS1kZWNpbWFsLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWdlb21ldHJ5LXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWdlb21ldHJ5LXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLXVyaS12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLXVyaS12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1ib29sZWFuLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWJvb2xlYW4tdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktaW50ZXJ2YWwtdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRJbnRlcnZhbFZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWludGVydmFsLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWxpc3QtdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktbGlzdC12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS10ZXh0ZmlsZS12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZVwiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIj48L2t1aS10ZXh0ZmlsZS12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD1cIlwiPk5vdCBzdXBwb3J0ZWQge3t2YWwuZ2V0Q2xhc3NOYW1lKCl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XG4gICAgICAgIDwvbWF0LWxpc3Q+XG4gICAgPC9kaXY+XG5cbjwvbWF0LWNhcmQ+YCxcbiAgICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGlyaT86IHN0cmluZyA9ICdodHRwOi8vcmRmaC5jaC84YmUxYjdjZjcxMDMnO1xuXG4gICAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uOyAvLyBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzIHByZXNlbnQgaW4gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSB3aXRoIElyaSBgaXJpYFxuICAgIHJlc291cmNlOiBSZWFkUmVzb3VyY2U7IC8vIHRoZSByZXNvdXJjZSB0byBiZSBkaXNwbGF5ZWRcbiAgICBlcnJvck1lc3NhZ2U6IGFueTtcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVzb3VyY2VTZXJ2aWNlOiBSZXNvdXJjZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZSkge1xuXG4gICAgICAgIGNvbnN0IHJvdXRlUGFyYW1zID0gdGhpcy5fcm91dGUuc25hcHNob3QucGFyYW1zO1xuICAgICAgICB0aGlzLmlyaSA9IHJvdXRlUGFyYW1zLmlkO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2UoaXJpOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlKGlyaSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0OiAnLCByZXN1bHQuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gcHJvbWlzZXMuY29tcGFjdChyZXN1bHQuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigoY29tcGFjdGVkKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQoY29tcGFjdGVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgZXhhY3RseSBvbmUgcmVzb3VyY2UgaXMgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZVNlcS5yZXNvdXJjZXMubGVuZ3RoID09PSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKGNvbXBhY3RlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzIElyaXMgKHByb3BlcnRpZXMgYXJlIGltcGxpZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzb3VyY2VDbGFzc0luZm9zOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpemUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvID0gcmVzb3VyY2VDbGFzc0luZm9zOyAvLyBjb25zb2xlLmxvZygnaW5pdGlhbGl6YXRpb24gb2Ygb250b2xvZ3lJbmZvOiAnLCB0aGlzLm9udG9sb2d5SW5mbyk7ID4gb2JqZWN0IHJlY2VpdmVkXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgYSBwb3NzaWJseSBhdHRhY2hlZCBpbWFnZSBmaWxlIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHJlc291cmNlU2VxLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2UgPSByZXNvdXJjZVNlcS5yZXNvdXJjZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzb3VyY2U6ICcsIHRoaXMucmVzb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWNoZSByZXF1ZXN0IGZhaWxlZDogJyArIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGFjdGx5IG9uZSByZXNvdXJjZSB3YXMgZXhwZWN0ZWQsIGJ1dCByZXNvdXJjZVNlcS5yZXNvdXJjZXMubGVuZ3RoICE9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGBFeGFjdGx5IG9uZSByZXNvdXJjZSB3YXMgZXhwZWN0ZWQsIGJ1dCAke3Jlc291cmNlU2VxLnJlc291cmNlcy5sZW5ndGh9IHJlc291cmNlKHMpIGdpdmVuLmA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0pTT05MRCBvZiBmdWxsIHJlc291cmNlIHJlcXVlc3QgY291bGQgbm90IGJlIGV4cGFuZGVkOicgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktdGFibGUtdmlldycsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIHRhYmxlLXZpZXcgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByZXN1bHQ7XG4gIEBJbnB1dCgpIG9udG9sb2d5SW5mbztcbiAgQElucHV0KCkgaXNMb2FkaW5nO1xuXG4gIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gICAgQ291bnRRdWVyeVJlc3VsdCxcbiAgICBFeHRlbmRlZFNlYXJjaFBhcmFtcyxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgICBPbnRvbG9neUluZm9ybWF0aW9uLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgU2VhcmNoUGFyYW1zU2VydmljZSxcbiAgICBTZWFyY2hTZXJ2aWNlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgS3VpVmlldyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGFic3RyYWN0IG9mZnNldDogbnVtYmVyO1xuICAgIGFic3RyYWN0IG1heE9mZnNldDogbnVtYmVyO1xuICAgIGFic3RyYWN0IHJlc3VsdDogUmVhZFJlc291cmNlW107XG4gICAgYWJzdHJhY3Qgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIGFic3RyYWN0IG5hdmlnYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBhYnN0cmFjdCBncmF2c2VhcmNoR2VuZXJhdG9yOiBFeHRlbmRlZFNlYXJjaFBhcmFtcztcbiAgICBhYnN0cmFjdCBzZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIGFic3RyYWN0IHNlYXJjaE1vZGU6IHN0cmluZztcbiAgICBhYnN0cmFjdCBudW1iZXJPZkFsbFJlc3VsdHM6IG51bWJlcjtcbiAgICBhYnN0cmFjdCBLbm9yYUNvbnN0YW50czogS25vcmFDb25zdGFudHM7XG4gICAgYWJzdHJhY3QgcmVyZW5kZXI6IGJvb2xlYW47XG4gICAgYWJzdHJhY3QgaXNMb2FkaW5nOiBib29sZWFuO1xuICAgIGFic3RyYWN0IGVycm9yTWVzc2FnZTogYW55O1xuICAgIGFic3RyYWN0IHBhZ2luZ0xpbWl0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByb3RlY3RlZCBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuX3JvdXRlLnBhcmFtTWFwLnN1YnNjcmliZSgocGFyYW1zOiBQYXJhbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZSA9IHBhcmFtcy5nZXQoJ21vZGUnKTtcblxuICAgICAgICAgICAgLy8gaW5pdCBvZmZzZXQgIGFuZCByZXN1bHRcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcGFyYW1zLmdldCgncScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXZzZWFyY2hHZW5lcmF0b3IgPSB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmdldFNlYXJjaFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN1YnNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgR3JhdnNlYXJjaCBxdWVyeSBmb3IgdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpIHtcblxuICAgICAgICBjb25zdCBncmF2c2VhcmNoOiBzdHJpbmcgfCBib29sZWFuID0gdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yLmdlbmVyYXRlR3JhdnNlYXJjaCh0aGlzLm9mZnNldCk7XG4gICAgICAgIGlmIChncmF2c2VhcmNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gbm8gdmFsaWQgc2VhcmNoIHBhcmFtcyAoYXBwbGljYXRpb24gaGFzIGJlZW4gcmVsb2FkZWQpXG4gICAgICAgICAgICAvLyBnbyB0byByb290XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSA8c3RyaW5nPiBncmF2c2VhcmNoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHNlYXJjaCByZXN1bHQgZnJvbSBLbm9yYSAtIDIgY2FzZXM6IHNpbXBsZSBzZWFyY2ggYW5kIGV4dGVuZGVkIHNlYXJjaFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRSZXN1bHQoKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBGVUxMVEVYVCBTRUFSQ0hcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2Z1bGx0ZXh0Jykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZS5kb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQodGhpcy5zZWFyY2hRdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mQWxsUmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PiBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcGVyZm9ybSBmdWxsIHRleHQgc2VhcmNoXG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlLmRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZSh0aGlzLnNlYXJjaFF1ZXJ5LCB0aGlzLm9mZnNldClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLCAvLyBmdW5jdGlvbiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gRVhURU5ERUQgU0VBUkNIXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdCh0aGlzLnNlYXJjaFF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TnVtYmVyT2ZBbGxSZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UodGhpcy5zZWFyY2hRdWVyeSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLCAvLyBmdW5jdGlvbiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBgc2VhcmNoIG1vZGUgaW52YWxpZDogJHt0aGlzLnNlYXJjaE1vZGV9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ29udmVydHMgc2VhcmNoIHJlc3VsdHMgZnJvbSBKU09OLUxEIHRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXSBhbmQgcmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgb250b2xvZ3kgZW50aXRpZXMuXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gYHN1YnNjcmliZWAgYXMgYSBwb2ludGVyIChpbnN0ZWFkIG9mIHJlZHVuZGFudGx5IGRlZmluaW5nIHRoZSBzYW1lIGxhbWJkYSBmdW5jdGlvbikuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZXNTZXF1ZW5jZX0gc2VhcmNoUmVzdWx0IHRoZSBhbnN3ZXIgdG8gYSBzZWFyY2ggcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NTZWFyY2hSZXN1bHRzID0gKHNlYXJjaFJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgLy8gYXNzaWduIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIGEgdmFyaWFibGUgc28gaXQgY2FuIGJlIHVzZWQgaW4gdGhlIGNvbXBvbmVudCdzIHRlbXBsYXRlXG4gICAgICAgIGlmICh0aGlzLm9udG9sb2d5SW5mbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBpbml0IG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mbyA9IHNlYXJjaFJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKHNlYXJjaFJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgcmVzdWx0cyB0byBzZWFyY2ggcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMucmVzdWx0LmNvbmNhdChzZWFyY2hSZXN1bHQucmVzb3VyY2VzKTtcblxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcmVuZGVyID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyByZXR1cm5lZCBieSBhIGNvdW50IHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSBjb3VudFF1ZXJ5UmVzdWx0IHRoZSByZXNwb25zZSB0byBhIGNvdW50IHF1ZXJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd051bWJlck9mQWxsUmVzdWx0cyA9IChjb3VudFF1ZXJ5UmVzdWx0OiBDb3VudFF1ZXJ5UmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzID0gY291bnRRdWVyeVJlc3VsdC5udW1iZXJPZlJlc3VsdHM7XG5cbiAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzID4gMCkge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGlzIDAtYmFzZWRcbiAgICAgICAgICAgIC8vIGlmIG51bWJlck9mQWxsUmVzdWx0cyBlcXVhbHMgdGhlIHBhZ2luZ0xpbWl0LCB0aGUgbWF4LiBvZmZzZXQgaXMgMFxuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLm51bWJlck9mQWxsUmVzdWx0cyAtIDEpIC8gdGhpcy5wYWdpbmdMaW1pdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1heE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgbmV4dCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogVGhlIHJlc3VsdHMgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3Rpbmcgb25lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgbG9hZE1vcmUob2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwYWdlIG9mZnNldCB3aGVuIHRoZSBlbmQgb2Ygc2Nyb2xsIGlzIHJlYWNoZWQgdG8gZ2V0IHRoZSBuZXh0IHBhZ2Ugb2Ygc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0IDwgdGhpcy5tYXhPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEt1aVZpZXcgfSBmcm9tICcuLi9rdWktdmlldyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBcGlTZXJ2aWNlRXJyb3IsXG4gIEV4dGVuZGVkU2VhcmNoUGFyYW1zLFxuICBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsXG4gIEtub3JhQ29uc3RhbnRzLFxuICBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgT250b2xvZ3lJbmZvcm1hdGlvbixcbiAgUmVhZFJlc291cmNlLFxuICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gIFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gIFNlYXJjaFNlcnZpY2Vcbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktc2VhcmNoLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhcmVyZW5kZXJcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibnVtYmVyT2ZBbGxSZXN1bHRzICE9PSAwICYmIHJlc3VsdDsgZWxzZSBub1Jlc3VsdFwiPlxuICAgICAgICA8aDQ+TnVtYmVyIG9mIHJlc3VsdHM6IHt7bnVtYmVyT2ZBbGxSZXN1bHRzfX08L2g0PlxuICAgICAgICA8bWF0LXRhYi1ncm91cD5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiTGlzdFwiPlxuICAgICAgICAgICAgICAgIDxrdWktbGlzdC12aWV3IFtyZXN1bHRdPVwicmVzdWx0XCIgW29udG9sb2d5SW5mb109XCJvbnRvbG9neUluZm9cIiBbaXNMb2FkaW5nXT1cImlzTG9hZGluZ1wiPjwva3VpLWxpc3Qtdmlldz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiR3JpZFwiPlxuICAgICAgICAgICAgICAgIDxrdWktZ3JpZC12aWV3IFtyZXN1bHRdPVwicmVzdWx0XCIgW29udG9sb2d5SW5mb109XCJvbnRvbG9neUluZm9cIiBbaXNMb2FkaW5nXT1cImlzTG9hZGluZ1wiPjwva3VpLWdyaWQtdmlldz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiVGFibGVcIj5cbiAgICAgICAgICAgICAgICA8a3VpLXRhYmxlLXZpZXcgW3Jlc3VsdF09XCJyZXN1bHRcIiBbb250b2xvZ3lJbmZvXT1cIm9udG9sb2d5SW5mb1wiIFtpc0xvYWRpbmddPVwiaXNMb2FkaW5nXCI+PC9rdWktdGFibGUtdmlldz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiR3JhdnNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxrdWktZ3JhcGgtdmlldz48L2t1aS1ncmFwaC12aWV3PlxuICAgICAgICAgICAgPC9tYXQtdGFiPlxuICAgICAgICA8L21hdC10YWItZ3JvdXA+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxvYWQtcGFuZWxcIiAqbmdJZj1cInJlc3VsdC5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1mbGF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cImxpbmsgY2VudGVyXCIgKGNsaWNrKT1cImxvYWRNb3JlKG9mZnNldClcIiAqbmdJZj1cIm9mZnNldCA8IG1heE9mZnNldFwiPkxvYWQgbW9yZVxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19kb3duPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBJbiBjYXNlIG9mIDAgcmVzdWx0IC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm9SZXN1bHQ+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgPHN0cm9uZz5ObyByZXN1bHQ8L3N0cm9uZz5cbiAgICAgICAgPC9wPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbjwvZGl2PlxuXG48IS0tIEVycm9yIG1lc3NhZ2UgLS0+XG48ZGl2ICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gICAgPHA+VGhlcmUgaXMgYW4gZXJyb3I6IHt7ZXJyb3JNZXNzYWdlfX08L3A+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmxvYWQtcGFuZWx7d2lkdGg6MTAwJX0ubG9hZC1wYW5lbCAuY2VudGVye2Rpc3BsYXk6YmxvY2s7bGluZS1oZWlnaHQ6MjRweDttYXJnaW46MTJweCBhdXRvfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNDb21wb25lbnQgZXh0ZW5kcyBLdWlWaWV3IHtcblxuICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gIG1heE9mZnNldDogbnVtYmVyID0gMDtcbiAgZ3JhdnNlYXJjaEdlbmVyYXRvcjogRXh0ZW5kZWRTZWFyY2hQYXJhbXM7XG4gIHJlc3VsdDogUmVhZFJlc291cmNlW10gPSBbXTtcbiAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICBudW1iZXJPZkFsbFJlc3VsdHM6IG51bWJlcjtcbiAgcmVyZW5kZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2VhcmNoUXVlcnk6IHN0cmluZztcbiAgc2VhcmNoTW9kZTogc3RyaW5nO1xuICBpc0xvYWRpbmcgPSB0cnVlO1xuICBlcnJvck1lc3NhZ2U6IGFueSA9IHVuZGVmaW5lZDtcbiAgbmF2aWdhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwYWdpbmdMaW1pdDogbnVtYmVyID0gMjU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJvdGVjdGVkIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgX3JvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHN1cGVyKF9yb3V0ZSwgX3NlYXJjaFNlcnZpY2UsIF9zZWFyY2hQYXJhbXNTZXJ2aWNlLCBfcm91dGVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuaW1wb3J0IHtcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IEt1aUFjdGlvbk1vZHVsZSB9IGZyb20gJ0Brbm9yYS9hY3Rpb24nO1xuaW1wb3J0IHsgS3VpQ29yZU1vZHVsZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuaW1wb3J0IHsgQm9vbGVhblZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9ib29sZWFuLXZhbHVlL2Jvb2xlYW4tdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2NvbG9yLXZhbHVlL2NvbG9yLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2RhdGUtdmFsdWUvZGF0ZS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjaW1hbFZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9kZWNpbWFsLXZhbHVlL2RlY2ltYWwtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEV4dGVybmFsUmVzVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2V4dGVybmFsLXJlcy12YWx1ZS9leHRlcm5hbC1yZXMtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb21ldHJ5VmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2dlb21ldHJ5LXZhbHVlL2dlb21ldHJ5LXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9uYW1lVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2dlb25hbWUtdmFsdWUvZ2VvbmFtZS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW50ZWdlclZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9pbnRlZ2VyLXZhbHVlL2ludGVnZXItdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEludGVydmFsVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2ludGVydmFsLXZhbHVlL2ludGVydmFsLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5rVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2xpbmstdmFsdWUvbGluay12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9saXN0LXZhbHVlL2xpc3QtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRWYWx1ZUFzSHRtbENvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLWh0bWwvdGV4dC12YWx1ZS1hcy1odG1sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0VmFsdWVBc1N0cmluZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLXN0cmluZy90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dFZhbHVlQXNYbWxDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L3RleHQtdmFsdWUvdGV4dC12YWx1ZS1hcy14bWwvdGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRmaWxlVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L3RleHRmaWxlLXZhbHVlL3RleHRmaWxlLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcmlWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5ub3RhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvYW5ub3RhdGlvbi9hbm5vdGF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb0NvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvYXVkaW8vYXVkaW8uY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2NvbGxlY3Rpb24vY29sbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGRkQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9kZGQvZGRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb2N1bWVudENvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvZG9jdW1lbnQvZG9jdW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmtPYmpDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2xpbmstb2JqL2xpbmstb2JqLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb3ZpbmdJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvbW92aW5nLWltYWdlL21vdmluZy1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JqZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9vYmplY3Qvb2JqZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWdpb25Db21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL3JlZ2lvbi9yZWdpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFN0aWxsSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL3N0aWxsLWltYWdlL3N0aWxsLWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS90ZXh0L3RleHQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBhcmVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L2NvbXBhcmUtdmlldy9jb21wYXJlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEdyYXBoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9ncmFwaC12aWV3L2dyYXBoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L2dyaWQtdmlldy9ncmlkLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L2xpc3Qtdmlldy9saXN0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFByb3BlcnRpZXNWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3Byb3BlcnRpZXMtdmlldy9wcm9wZXJ0aWVzLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc291cmNlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9yZXNvdXJjZS12aWV3L3Jlc291cmNlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy90YWJsZS12aWV3L3RhYmxlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHNDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvc2VhcmNoLXJlc3VsdHMvc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50JztcblxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEt1aUNvcmVNb2R1bGUsXG4gICAgICAgIEt1aUFjdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxuICAgICAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQW5ub3RhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgQXVkaW9Db21wb25lbnQsXG4gICAgICAgIENvbGxlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIERkZENvbXBvbmVudCxcbiAgICAgICAgRG9jdW1lbnRDb21wb25lbnQsXG4gICAgICAgIExpbmtPYmpDb21wb25lbnQsXG4gICAgICAgIE1vdmluZ0ltYWdlQ29tcG9uZW50LFxuICAgICAgICBPYmplY3RDb21wb25lbnQsXG4gICAgICAgIFJlZ2lvbkNvbXBvbmVudCxcbiAgICAgICAgU3RpbGxJbWFnZUNvbXBvbmVudCxcbiAgICAgICAgVGV4dENvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNIdG1sQ29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc1N0cmluZ0NvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNYbWxDb21wb25lbnQsXG4gICAgICAgIFRleHRmaWxlVmFsdWVDb21wb25lbnQsXG4gICAgICAgIERhdGVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgSW50ZWdlclZhbHVlQ29tcG9uZW50LFxuICAgICAgICBDb2xvclZhbHVlQ29tcG9uZW50LFxuICAgICAgICBEZWNpbWFsVmFsdWVDb21wb25lbnQsXG4gICAgICAgIFVyaVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBCb29sZWFuVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEdlb21ldHJ5VmFsdWVDb21wb25lbnQsXG4gICAgICAgIEdlb25hbWVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgSW50ZXJ2YWxWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlzdFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaW5rVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEV4dGVybmFsUmVzVmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpc3RWaWV3Q29tcG9uZW50LFxuICAgICAgICBHcmlkVmlld0NvbXBvbmVudCxcbiAgICAgICAgVGFibGVWaWV3Q29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZVZpZXdDb21wb25lbnQsXG4gICAgICAgIENvbXBhcmVWaWV3Q29tcG9uZW50LFxuICAgICAgICBHcmFwaFZpZXdDb21wb25lbnQsXG4gICAgICAgIFByb3BlcnRpZXNWaWV3Q29tcG9uZW50LFxuICAgICAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG5cbiAgICAgICAgQW5ub3RhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgQXVkaW9Db21wb25lbnQsXG4gICAgICAgIENvbGxlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIERkZENvbXBvbmVudCxcbiAgICAgICAgRG9jdW1lbnRDb21wb25lbnQsXG4gICAgICAgIExpbmtPYmpDb21wb25lbnQsXG4gICAgICAgIE1vdmluZ0ltYWdlQ29tcG9uZW50LFxuICAgICAgICBPYmplY3RDb21wb25lbnQsXG4gICAgICAgIFJlZ2lvbkNvbXBvbmVudCxcbiAgICAgICAgU3RpbGxJbWFnZUNvbXBvbmVudCxcbiAgICAgICAgVGV4dENvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNIdG1sQ29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc1N0cmluZ0NvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNYbWxDb21wb25lbnQsXG4gICAgICAgIFRleHRmaWxlVmFsdWVDb21wb25lbnQsXG4gICAgICAgIERhdGVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgSW50ZWdlclZhbHVlQ29tcG9uZW50LFxuICAgICAgICBDb2xvclZhbHVlQ29tcG9uZW50LFxuICAgICAgICBEZWNpbWFsVmFsdWVDb21wb25lbnQsXG4gICAgICAgIFVyaVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBCb29sZWFuVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEdlb21ldHJ5VmFsdWVDb21wb25lbnQsXG4gICAgICAgIEdlb25hbWVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgSW50ZXJ2YWxWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlzdFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaW5rVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEV4dGVybmFsUmVzVmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpc3RWaWV3Q29tcG9uZW50LFxuICAgICAgICBHcmlkVmlld0NvbXBvbmVudCxcbiAgICAgICAgVGFibGVWaWV3Q29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZVZpZXdDb21wb25lbnQsXG4gICAgICAgIENvbXBhcmVWaWV3Q29tcG9uZW50LFxuICAgICAgICBHcmFwaFZpZXdDb21wb25lbnQsXG4gICAgICAgIFByb3BlcnRpZXNWaWV3Q29tcG9uZW50LFxuICAgICAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBLdWlWaWV3ZXJNb2R1bGUge1xufVxuIiwiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiB2aWV3ZXJcbiAqL1xuXG4vLyByZXNvdXJjZSB2aWV3ZXJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3Jlc291cmNlLyc7XG5cbi8vIHByb3BlcnR5IChndWkpIGVsZW1lbnRcbmV4cG9ydCAqIGZyb20gJy4vbGliL3Byb3BlcnR5Lyc7XG5cbi8vIGRpZmZlcmVudCBraW5kIG9mIHZpZXdzXG5leHBvcnQgKiBmcm9tICcuL2xpYi92aWV3Lyc7XG5cbi8vIHZpZXdlciBtb2R1bGVcbmV4cG9ydCAqIGZyb20gJy4vbGliL3ZpZXdlci5tb2R1bGUnO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3B1YmxpY19hcGknO1xuXG5leHBvcnQge0Jvb2xlYW5WYWx1ZUNvbXBvbmVudCBhcyDDicK1dX0gZnJvbSAnLi9saWIvcHJvcGVydHkvYm9vbGVhbi12YWx1ZS9ib29sZWFuLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0NvbG9yVmFsdWVDb21wb25lbnQgYXMgw4nCtXJ9IGZyb20gJy4vbGliL3Byb3BlcnR5L2NvbG9yLXZhbHVlL2NvbG9yLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0RhdGVWYWx1ZUNvbXBvbmVudCBhcyDDicK1cH0gZnJvbSAnLi9saWIvcHJvcGVydHkvZGF0ZS12YWx1ZS9kYXRlLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0RlY2ltYWxWYWx1ZUNvbXBvbmVudCBhcyDDicK1c30gZnJvbSAnLi9saWIvcHJvcGVydHkvZGVjaW1hbC12YWx1ZS9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0V4dGVybmFsUmVzVmFsdWVDb21wb25lbnQgYXMgw4nCtWJhfSBmcm9tICcuL2xpYi9wcm9wZXJ0eS9leHRlcm5hbC1yZXMtdmFsdWUvZXh0ZXJuYWwtcmVzLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0dlb21ldHJ5VmFsdWVDb21wb25lbnQgYXMgw4nCtXZ9IGZyb20gJy4vbGliL3Byb3BlcnR5L2dlb21ldHJ5LXZhbHVlL2dlb21ldHJ5LXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0dlb25hbWVWYWx1ZUNvbXBvbmVudCBhcyDDicK1d30gZnJvbSAnLi9saWIvcHJvcGVydHkvZ2VvbmFtZS12YWx1ZS9nZW9uYW1lLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0ludGVnZXJWYWx1ZUNvbXBvbmVudCBhcyDDicK1cX0gZnJvbSAnLi9saWIvcHJvcGVydHkvaW50ZWdlci12YWx1ZS9pbnRlZ2VyLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0ludGVydmFsVmFsdWVDb21wb25lbnQgYXMgw4nCtXh9IGZyb20gJy4vbGliL3Byb3BlcnR5L2ludGVydmFsLXZhbHVlL2ludGVydmFsLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0xpbmtWYWx1ZUNvbXBvbmVudCBhcyDDicK1en0gZnJvbSAnLi9saWIvcHJvcGVydHkvbGluay12YWx1ZS9saW5rLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0xpc3RWYWx1ZUNvbXBvbmVudCBhcyDDicK1eX0gZnJvbSAnLi9saWIvcHJvcGVydHkvbGlzdC12YWx1ZS9saXN0LXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge1RleHRWYWx1ZUFzSHRtbENvbXBvbmVudCBhcyDDicK1bH0gZnJvbSAnLi9saWIvcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLWh0bWwvdGV4dC12YWx1ZS1hcy1odG1sLmNvbXBvbmVudCc7XG5leHBvcnQge1RleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50IGFzIMOJwrVtfSBmcm9tICcuL2xpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudCc7XG5leHBvcnQge1RleHRWYWx1ZUFzWG1sQ29tcG9uZW50IGFzIMOJwrVufSBmcm9tICcuL2xpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMteG1sL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudCc7XG5leHBvcnQge1RleHRmaWxlVmFsdWVDb21wb25lbnQgYXMgw4nCtW99IGZyb20gJy4vbGliL3Byb3BlcnR5L3RleHRmaWxlLXZhbHVlL3RleHRmaWxlLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge1VyaVZhbHVlQ29tcG9uZW50IGFzIMOJwrV0fSBmcm9tICcuL2xpYi9wcm9wZXJ0eS91cmktdmFsdWUvdXJpLXZhbHVlLmNvbXBvbmVudCc7XG5leHBvcnQge0Fubm90YXRpb25Db21wb25lbnQgYXMgw4nCtWF9IGZyb20gJy4vbGliL3Jlc291cmNlL2Fubm90YXRpb24vYW5ub3RhdGlvbi5jb21wb25lbnQnO1xuZXhwb3J0IHtBdWRpb0NvbXBvbmVudCBhcyDDicK1Yn0gZnJvbSAnLi9saWIvcmVzb3VyY2UvYXVkaW8vYXVkaW8uY29tcG9uZW50JztcbmV4cG9ydCB7Q29sbGVjdGlvbkNvbXBvbmVudCBhcyDDicK1Y30gZnJvbSAnLi9saWIvcmVzb3VyY2UvY29sbGVjdGlvbi9jb2xsZWN0aW9uLmNvbXBvbmVudCc7XG5leHBvcnQge0RkZENvbXBvbmVudCBhcyDDicK1ZH0gZnJvbSAnLi9saWIvcmVzb3VyY2UvZGRkL2RkZC5jb21wb25lbnQnO1xuZXhwb3J0IHtEb2N1bWVudENvbXBvbmVudCBhcyDDicK1ZX0gZnJvbSAnLi9saWIvcmVzb3VyY2UvZG9jdW1lbnQvZG9jdW1lbnQuY29tcG9uZW50JztcbmV4cG9ydCB7TGlua09iakNvbXBvbmVudCBhcyDDicK1Zn0gZnJvbSAnLi9saWIvcmVzb3VyY2UvbGluay1vYmovbGluay1vYmouY29tcG9uZW50JztcbmV4cG9ydCB7TW92aW5nSW1hZ2VDb21wb25lbnQgYXMgw4nCtWd9IGZyb20gJy4vbGliL3Jlc291cmNlL21vdmluZy1pbWFnZS9tb3ZpbmctaW1hZ2UuY29tcG9uZW50JztcbmV4cG9ydCB7T2JqZWN0Q29tcG9uZW50IGFzIMOJwrVofSBmcm9tICcuL2xpYi9yZXNvdXJjZS9vYmplY3Qvb2JqZWN0LmNvbXBvbmVudCc7XG5leHBvcnQge1JlZ2lvbkNvbXBvbmVudCBhcyDDicK1aX0gZnJvbSAnLi9saWIvcmVzb3VyY2UvcmVnaW9uL3JlZ2lvbi5jb21wb25lbnQnO1xuZXhwb3J0IHtTdGlsbEltYWdlQ29tcG9uZW50IGFzIMOJwrVqfSBmcm9tICcuL2xpYi9yZXNvdXJjZS9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0IHtUZXh0Q29tcG9uZW50IGFzIMOJwrVrfSBmcm9tICcuL2xpYi9yZXNvdXJjZS90ZXh0L3RleHQuY29tcG9uZW50JztcbmV4cG9ydCB7Q29tcGFyZVZpZXdDb21wb25lbnQgYXMgw4nCtWJmfSBmcm9tICcuL2xpYi92aWV3L2NvbXBhcmUtdmlldy9jb21wYXJlLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7R3JhcGhWaWV3Q29tcG9uZW50IGFzIMOJwrViZ30gZnJvbSAnLi9saWIvdmlldy9ncmFwaC12aWV3L2dyYXBoLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7R3JpZFZpZXdDb21wb25lbnQgYXMgw4nCtWJjfSBmcm9tICcuL2xpYi92aWV3L2dyaWQtdmlldy9ncmlkLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7S3VpVmlldyBhcyDDicK1Ymp9IGZyb20gJy4vbGliL3ZpZXcva3VpLXZpZXcnO1xuZXhwb3J0IHtMaXN0Vmlld0NvbXBvbmVudCBhcyDDicK1YmJ9IGZyb20gJy4vbGliL3ZpZXcvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQnO1xuZXhwb3J0IHtQcm9wZXJ0aWVzVmlld0NvbXBvbmVudCBhcyDDicK1Ymh9IGZyb20gJy4vbGliL3ZpZXcvcHJvcGVydGllcy12aWV3L3Byb3BlcnRpZXMtdmlldy5jb21wb25lbnQnO1xuZXhwb3J0IHtSZXNvdXJjZVZpZXdDb21wb25lbnQgYXMgw4nCtWJlfSBmcm9tICcuL2xpYi92aWV3L3Jlc291cmNlLXZpZXcvcmVzb3VyY2Utdmlldy5jb21wb25lbnQnO1xuZXhwb3J0IHtTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGFzIMOJwrViaX0gZnJvbSAnLi9saWIvdmlldy9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQnO1xuZXhwb3J0IHtUYWJsZVZpZXdDb21wb25lbnQgYXMgw4nCtWJkfSBmcm9tICcuL2xpYi92aWV3L3RhYmxlLXZpZXcvdGFibGUtdmlldy5jb21wb25lbnQnOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O01BVWEsbUJBQW1CO0lBRTlCLGlCQUFpQjtJQUVqQixRQUFRO0tBQ1A7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7OztDQUdYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OztNQ0NZLGNBQWM7SUFFekIsaUJBQWlCO0lBRWpCLFFBQVE7S0FDUDs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7OztDQUdYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OztNQ0NZLG1CQUFtQjtJQUU5QixpQkFBaUI7SUFFakIsUUFBUTtLQUNQOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFD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