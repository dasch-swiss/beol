import { KnoraConstants } from '../../knora-constants';
import { DateRangeSalsah, DateSalsah } from '../../shared/date';
/**
 * Abstract class representing a text value object with or without markup.
 */
export class ReadTextValue {
    constructor() {
        this.type = KnoraConstants.TextValue;
    }
}
/**
 * Represents a text value object without markup (mere character string).
 */
export class ReadTextValueAsString extends ReadTextValue {
    constructor(id, propIri, str) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.str = str;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsString;
    }
    getContent() {
        return this.str;
    }
}
/**
 * Represents resources referred to by standoff links.
 */
export class ReferredResourcesByStandoffLink {
}
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
export class ReadTextValueAsHtml extends ReadTextValue {
    constructor(id, propIri, html, referredResources) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.html = html;
        this.referredResources = referredResources;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    getReferredResourceInfo(resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + ` (${resClassLabel})`;
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsHtml;
    }
    getContent() {
        return this.html;
    }
}
/**
 * Represents a text value object with markup as XML.
 */
export class ReadTextValueAsXml extends ReadTextValue {
    constructor(id, propIri, xml, mappingIri) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.xml = xml;
        this.mappingIri = mappingIri;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsXml;
    }
    getContent() {
        return this.xml;
    }
}
/**
 * Represents a date value object.
 */
export class ReadDateValue {
    constructor(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
        this.id = id;
        this.propIri = propIri;
        this.calendar = calendar;
        this.startYear = startYear;
        this.endYear = endYear;
        this.startEra = startEra;
        this.endEra = endEra;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
        this.startDay = startDay;
        this.endDay = endDay;
        this.type = KnoraConstants.DateValue;
        this.separator = '/';
    }
    getDateSalsah() {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    }
    getClassName() {
        return KnoraConstants.ReadDateValue;
    }
    getContent() {
        return this.getDateSalsah().getDateAsString();
    }
}
/**
 * Represents a link value object (reification).
 */
export class ReadLinkValue {
    constructor(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    getReferredResourceInfo(ontologyInfo) {
        if (this.referredResource !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + ` (${resClassLabel})`;
        }
        else {
            return this.referredResourceIri;
        }
    }
    getClassName() {
        return KnoraConstants.ReadLinkValue;
    }
    getContent() {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    }
}
/**
 * Represents an integer value object.
 */
export class ReadIntegerValue {
    constructor(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntegerValue;
    }
    getContent() {
        return this.integer.toString();
    }
}
/**
 * Represents a decimal value object.
 */
export class ReadDecimalValue {
    constructor(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    getClassName() {
        return KnoraConstants.ReadDecimalValue;
    }
    getContent() {
        return this.decimal.toString();
    }
}
/**
 * Represents a still image value object.
 */
export class ReadStillImageFileValue {
    constructor(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
        this.id = id;
        this.propIri = propIri;
        this.imageFilename = imageFilename;
        this.imageServerIIIFBaseURL = imageServerIIIFBaseURL;
        this.imagePath = imagePath;
        this.dimX = dimX;
        this.dimY = dimY;
        this.type = KnoraConstants.StillImageFileValue;
        // if the image is a jpeg, it is a preview image
        this.isPreview = imageFilename.endsWith('.jpg');
    }
    makeIIIFUrl(reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            let percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    }
    getClassName() {
        return KnoraConstants.ReadStillImageFileValue;
    }
    getContent() {
        return this.imagePath;
    }
}
/**
 * Represents a text representation value object
 */
export class ReadTextFileValue {
    constructor(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadTextFileValue;
    }
    getContent() {
        return this.textFileURL;
    }
}
/**
 * Represents a color value object.
 */
export class ReadColorValue {
    constructor(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    getClassName() {
        return KnoraConstants.ReadColorValue;
    }
    getContent() {
        return this.colorHex;
    }
}
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
export class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Represents a geometry value parsed from JSON.
 */
export class RegionGeometry {
    constructor(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
}
/**
 * Represents a geometry value object.
 */
export class ReadGeomValue {
    constructor(id, propIri, geometryString) {
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        const geometryJSON = JSON.parse(geometryString);
        const points = [];
        for (const point of geometryJSON.points) {
            points.push(new Point2D(point.x, point.y));
        }
        let radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    getClassName() {
        return KnoraConstants.ReadGeomValue;
    }
    getContent() {
        return this.geometryString;
    }
}
/**
 * Represents a URI value object.
 */
export class ReadUriValue {
    constructor(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    getClassName() {
        return KnoraConstants.ReadUriValue;
    }
    getContent() {
        return this.uri;
    }
}
/**
 * Represents a Boolean value object.
 */
export class ReadBooleanValue {
    constructor(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    getClassName() {
        return KnoraConstants.ReadBooleanValue;
    }
    getContent() {
        return this.bool.toString();
    }
}
/**
 * Represents an interval value object.
 */
export class ReadIntervalValue {
    constructor(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntervalValue;
    }
    getContent() {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    }
}
/**
 * Represents an interval value object.
 */
export class ReadListValue {
    constructor(id, propIri, listNodeIri, listNodeLabel) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.listNodeLabel = listNodeLabel;
        this.type = KnoraConstants.ListValue;
    }
    getClassName() {
        return KnoraConstants.ReadListValue;
    }
    getContent() {
        return this.listNodeLabel;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQXFDaEU7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFJYSxTQUFJLEdBQVcsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQU9yRCxDQUFDO0NBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBRXBELFlBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsR0FBVztRQUNuRSxLQUFLLEVBQUUsQ0FBQztRQURTLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUV2RSxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtDQUUzQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFFbEQsWUFBcUIsRUFBVSxFQUFXLE9BQU8sRUFBVyxJQUFZLEVBQVcsaUJBQWtEO1FBQ2pJLEtBQUssRUFBRSxDQUFDO1FBRFMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFBVyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVcsc0JBQWlCLEdBQWpCLGlC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RyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDbEUsQ0FBQztDQUVKO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUV0QixZQUFxQixFQUFVLEVBQVcsT0FBZSxFQUFXLFdBQW1CLEVBQVcsYUFBcUI7UUFBbEcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFXLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBSTlHLFNBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0lBRnpDLENBQUM7SUFJRCxZQUFZO1FBQ1IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlU2Fsc2FoLCBEYXRlU2Fsc2FoIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RhdGUnO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYW55IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyBJcmkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyB0eXBlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBwb2ludGluZyB0byB0aGUgdmFsdWUgb2JqZWN0LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGlzIGludGVyZmFjZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGFzIGEgc3RyaW5nIChjb21wbGV4aXR5IG9mIHRoZSB2YWx1ZSBwb3NzaWJseSByZWR1Y2VkKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBvciB3aXRob3V0IG1hcmt1cC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlYWRUZXh0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGhvdXQgbWFya3VwIChtZXJlIGNoYXJhY3RlciBzdHJpbmcpLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBzdHI6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyByZXNvdXJjZXMgcmVmZXJyZWQgdG8gYnkgc3RhbmRvZmYgbGlua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlYWRSZXNvdXJjZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgdGhhdCBoYXMgYmVlbiB0dXJuZWQgaW50byBIVE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzSHRtbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaHRtbDogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluaykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgYSByZXNvdXJjZSByZWZlcnJlZCB0byBieSBhIHN0YW5kb2ZmIGxpbmsgZnJvbSBhIHRleHQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UuXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gb250b2xvZ3kgaW5mb3JtYXRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlJ3MgY2xhc3MgYW5kIGl0cyBsYWJlbC5cbiAgICAgKi9cblxuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ocmVzb3VyY2VJcmk6IHN0cmluZywgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2VzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdubyBpbmZvcm1hdGlvbiBmb3VuZCBhYm91dCByZWZlcnJlZCByZXNvdXJjZSAodGFyZ2V0IG9mIHN0YW5kb2ZmIGxpbmspJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIGFzIFhNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1htbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgeG1sOiBzdHJpbmcsIHJlYWRvbmx5IG1hcHBpbmdJcmk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhtbDtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREYXRlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kWWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlbmRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kTW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RGF5PzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmREYXk/OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICBnZXREYXRlU2Fsc2FoKCk6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWgge1xuICAgICAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHRoaXMuZW5kWWVhciAmJiB0aGlzLnN0YXJ0TW9udGggPT09IHRoaXMuZW5kTW9udGggJiYgdGhpcy5zdGFydERheSA9PT0gdGhpcy5lbmREYXkgJiYgdGhpcy5zdGFydEVyYSA9PT0gdGhpcy5lbmRFcmEpIHtcbiAgICAgICAgICAgIC8vIHByZWNpc2UgZGF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF0ZSBwZXJpb2RcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlU2Fsc2FoKG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpLCBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLmVuZEVyYSwgdGhpcy5lbmRZZWFyLCB0aGlzLmVuZE1vbnRoLCB0aGlzLmVuZERheSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVNhbHNhaCgpLmdldERhdGVBc1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluayB2YWx1ZSBvYmplY3QgKHJlaWZpY2F0aW9uKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaW5rVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZT86IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTtcblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpbmtWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZWdlclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBpbnRlZ2VyOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVnZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRlY2ltYWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERlY2ltYWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgZGVjaW1hbDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0aWxsIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHJlcHJlc2VudGF0aW9uIHZhbHVlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHRleHRGaWxlbmFtZTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZVVSTDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEZpbGVVUkw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbG9yIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRDb2xvclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjb2xvckhleDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ySGV4O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gYSAyRC1jb29yZGluYXRlIHN5c3RlbSAoZm9yIGdlb21ldHJ5IHZhbHVlcykuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludDJEIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0dXM6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVDb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50MkRbXSxcbiAgICAgICAgcHVibGljIHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJhZGl1cz86IFBvaW50MkRcbiAgICApIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEdlb21WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9tZXRyeVN0cmluZztcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVSSSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVXJpVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGJvb2w6IGJvb2xlYW4pIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbC50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVydmFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZXJ2YWxTdGFydDogbnVtYmVyLCByZWFkb25seSBpbnRlcnZhbEVuZDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxTdGFydC50b1N0cmluZygpICsgJy0nICsgdGhpcy5pbnRlcnZhbEVuZDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVMYWJlbDogc3RyaW5nLCApIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVMYWJlbDtcbiAgICB9XG5cbn1cbiJdfQ==