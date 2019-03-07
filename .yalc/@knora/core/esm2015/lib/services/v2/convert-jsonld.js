import { CountQueryResult, KnoraConstants, ReadBooleanValue, ReadColorValue, ReadDateValue, ReadDecimalValue, ReadGeomValue, ReadIntegerValue, ReadIntervalValue, ReadLinkValue, ReadListValue, ReadResource, ReadResourcesSequence, ReadStillImageFileValue, ReadTextFileValue, ReadTextValueAsHtml, ReadTextValueAsString, ReadTextValueAsXml, ReadUriValue, Utils } from '../../declarations';
/**
 * Contains methods to convert JSON-LD representing resources and properties to classes.
 * These methods works only for instances of resources and properties, not for ontologies (data model).
 */
export var ConvertJSONLD;
(function (ConvertJSONLD) {
    /**
     * Function to be passed to a filter used on an array of property names
     * sorting out all non value property names.
     *
     * Gets all property names that refer to value objects.
     *
     * @param propName the name of a property to be checked.
     * @returns boolean - indicating if the name refers to a value property.
     */
    const getPropertyNames = (propName) => {
        return propName !== '@id'
            && propName !== '@type'
            && propName !== KnoraConstants.RdfsLabel
            && propName !== KnoraConstants.attachedToProject
            && propName !== KnoraConstants.attachedToUser
            && propName !== KnoraConstants.creationDate
            && propName !== KnoraConstants.lastModificationDate
            && propName !== KnoraConstants.hasPermissions
            && propName !== KnoraConstants.ArkUrl
            && propName !== KnoraConstants.versionArkUrl;
    };
    /**
     * Constructs a [[ReadResource]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD an a resource and its properties serialized as JSON-LD.
     * @returns ReadResource
     */
    function constructReadResource(resourceJSONLD) {
        const properties = constructReadProperties(resourceJSONLD);
        return new ReadResource(resourceJSONLD['@id'], resourceJSONLD['@type'], resourceJSONLD[KnoraConstants.RdfsLabel], [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        properties);
    }
    /**
     * Constructs a [[ReadPropertyItem]] from JSON-LD,
     * taking into account the property's value type.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {Object} propValue the value serialized as JSON-LD.
     * @param {string} propIri the Iri of the property.
     * @param {ReadLinkValue[]} standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue, propIri, standoffLinkValues) {
        // convert a JSON-LD property value to a `ReadPropertyItem`
        let valueSpecificProp;
        // check for the property's value type
        switch (propValue['@type']) {
            case KnoraConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                let textValue;
                if (propValue[KnoraConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                }
                else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                    const referredResources = {};
                    // check for standoff links and include referred resources, if any
                    // when the user interacts with a standoff link, further information about the referred resource can be shown
                    for (const standoffLink of standoffLinkValues) {
                        const referredRes = standoffLink.referredResource;
                        referredResources[referredRes.id] = referredRes;
                    }
                    textValue = new ReadTextValueAsHtml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsHtml], referredResources);
                }
                else if (propValue[KnoraConstants.textValueAsXml] !== undefined && propValue[KnoraConstants.textValueHasMapping]['@id'] !== undefined) {
                    textValue = new ReadTextValueAsXml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsXml], propValue[KnoraConstants.textValueHasMapping]['@id']);
                }
                else {
                    // expected text value members not defined
                    console.error('ERROR: Invalid text value: ' + JSON.stringify(propValue));
                }
                valueSpecificProp = textValue;
                break;
            case KnoraConstants.DateValue:
                const dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                valueSpecificProp = dateValue;
                break;
            case KnoraConstants.LinkValue:
                let linkValue;
                // check if the referred resource is given as an object or just as an IRI
                if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object
                    const referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                }
                else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri
                    const referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                }
                else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object
                    const incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                }
                else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri
                    const incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }
                valueSpecificProp = linkValue;
                break;
            case KnoraConstants.IntValue:
                const intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;
                break;
            case KnoraConstants.DecimalValue:
                // a decimal value is represented as a string in order to preserve its precision
                const decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                const decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;
                break;
            // TODO: handle movingImageFileValue and the others here...
            case KnoraConstants.StillImageFileValue:
                const stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                valueSpecificProp = stillImageFileValue;
                break;
            case KnoraConstants.TextFileValue:
                const textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                valueSpecificProp = textFileValue;
                break;
            case KnoraConstants.ColorValue:
                const readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                valueSpecificProp = readColorValue;
                break;
            case KnoraConstants.GeomValue:
                const readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                valueSpecificProp = readGeomValue;
                break;
            case KnoraConstants.UriValue:
                const uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                valueSpecificProp = uriValue;
                break;
            case KnoraConstants.BooleanValue:
                const boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                valueSpecificProp = boolValue;
                break;
            case KnoraConstants.IntervalValue:
                // represented as strings to preserve precision
                const intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                const intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                const intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                valueSpecificProp = intervalValue;
                break;
            case KnoraConstants.ListValue:
                const listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
                valueSpecificProp = listValue;
                break;
            default:
                // unsupported value type
                console.error('ERROR: value type not implemented yet: ' + propValue['@type'] + '(' + propValue['@id'] + ')');
                break;
        }
        return valueSpecificProp;
    }
    /**
     * Construct a [[ReadProperties]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD an object describing the resource and its properties.
     * @returns ReadProperties
     */
    function constructReadProperties(resourceJSONLD) {
        // JSON-LD representing standoff link values
        // text values may contain standoff links
        const standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
        // to be populated with standoff link values
        const standoffLinkValues = [];
        // convert each standoff link value JSON-LD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            for (const standoffLinkJSONLD of standoffLinkValuesJSONLD) {
                const standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                standoffLinkValues.push(standoffVal);
            }
        }
        else if (standoffLinkValuesJSONLD !== undefined) {
            const standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
            standoffLinkValues.push(standoffVal);
        }
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const properties = {};
        // iterate over all the given property names
        for (const propName of propNames) {
            const propValues = [];
            // either an array of values or just one value is given
            if (Array.isArray(resourceJSONLD[propName])) {
                // array of values
                // for each property name, an array of property values is given, iterate over it
                for (const propValue of resourceJSONLD[propName]) {
                    // convert a JSON-LD property value to a `ReadPropertyItem`
                    const valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined)
                        propValues.push(valueSpecificProp);
                }
            }
            else {
                // only one value
                const valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                // if it is undefined, the value could not be constructed correctly
                // add the property value to the array of property values
                if (valueSpecificProp !== undefined)
                    propValues.push(valueSpecificProp);
            }
            // add the property to the properties object
            properties[propName] = propValues;
        }
        return properties;
    }
    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns ReadResourcesSequence - sequence of read resources
     */
    function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD) {
        const resources = [];
        let numberOfResources;
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;
            for (const resourceJSONLD of resourcesGraph) {
                const resource = constructReadResource(resourceJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        else {
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                // empty answer, no resources given
                numberOfResources = 0;
            }
            else {
                // only one resource
                numberOfResources = 1;
                const resource = constructReadResource(resourcesResponseJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        return new ReadResourcesSequence(resources, numberOfResources);
    }
    ConvertJSONLD.createReadResourcesSequenceFromJsonLD = createReadResourcesSequenceFromJsonLD;
    /**
     * Collects all the types (classes) of referred resources from a given resource (from its linking properties).
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD JSON-LD describing one resource.
     * @return string[] - an Array of resource class Iris (including duplicates).
     */
    function getReferredResourceClasses(resourceJSONLD) {
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const referredResourceClasses = [];
        for (const prop of propNames) {
            // several values given for this property
            if (Array.isArray(resourceJSONLD[prop])) {
                for (const referredRes of resourceJSONLD[prop]) {
                    // if the property is a LinkValue and it contains an embedded resource, get its type
                    if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasTarget] !== undefined) {
                        // target resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasTarget]['@type']);
                    }
                    else if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasSource] !== undefined) {
                        // source resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasSource]['@type']);
                    }
                }
            }
            else {
                // only one value given for this property
                // if the property is a LinkValue and it contains an embedded resource, get its type
                if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]
                    !== undefined) {
                    // target resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]['@type']);
                }
                else if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasSource]
                    !== undefined) {
                    // source resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasSource]['@type']);
                }
            }
        }
        return referredResourceClasses;
    }
    /**
     * Gets the resource types (classes) from a JSON-LD representing a sequence of resources.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns string[] - the resource class Iris (without duplicates).
     */
    function getResourceClassesFromJsonLD(resourcesResponseJSONLD) {
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        let resourceClasses = [];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            for (const resourceJSONLD of resourcesGraph) {
                // get class of the current resource
                resourceClasses.push(resourceJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        else {
            // only one resource
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                return [];
            }
            else {
                resourceClasses.push(resourcesResponseJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
    /**
     * Turns a JSON-LD response to a count query into a `CountQueryResult`.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param countQueryJSONLD
     * @returns {CountQueryResult}
     */
    function createCountQueryResult(countQueryJSONLD) {
        return new CountQueryResult(countQueryJSONLD[KnoraConstants.schemaNumberOfItems]);
    }
    ConvertJSONLD.createCountQueryResult = createCountQueryResult;
})(ConvertJSONLD || (ConvertJSONLD = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1qc29ubGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9jb252ZXJ0LWpzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGFBQWEsRUFHYixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsWUFBWSxFQUVaLEtBQUssRUFDUixNQUFNLG9CQUFvQixDQUFDO0FBRTVCOzs7R0FHRztBQUNILE1BQU0sS0FBUSxhQUFhLENBZ2hCMUI7QUFoaEJELFdBQWMsYUFBYTtJQUV2Qjs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNsQyxPQUFPLFFBQVEsS0FBSyxLQUFLO2VBQ2xCLFFBQVEsS0FBSyxPQUFPO2VBQ3BCLFFBQVEsS0FBSyxjQUFjLENBQUMsU0FBUztlQUNyQyxRQUFRLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtlQUM3QyxRQUFRLEtBQUssY0FBYyxDQUFDLGNBQWM7ZUFDMUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxZQUFZO2VBQ3hDLFFBQVEsS0FBSyxjQUFjLENBQUMsb0JBQW9CO2VBQ2hELFFBQVEsS0FBSyxjQUFjLENBQUMsY0FBYztlQUMxQyxRQUFRLEtBQUssY0FBYyxDQUFDLE1BQU07ZUFDbEMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDckQsQ0FBQyxDQUFDO0lBR0Y7Ozs7OztPQU1HO0lBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxjQUFzQjtRQUVqRCxNQUFN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QUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsd0NBQXdDO2dCQUN4QyxNQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBRXBGLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDckU7U0FDSjtRQUVELHdCQUF3QjtRQUN4QixPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFN0QsQ0FBQztJQXRDZSwwQ0FBNEIsK0JBc0MzQyxDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsZ0JBQXdCO1FBQzNELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFGZSxvQ0FBc0IseUJBRXJDLENBQUE7QUFDTCxDQUFDLEVBaGhCYSxhQUFhLEtBQWIsYUFBYSxRQWdoQjFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb3VudFF1ZXJ5UmVzdWx0LFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIFJlYWRCb29sZWFuVmFsdWUsXG4gICAgUmVhZENvbG9yVmFsdWUsXG4gICAgUmVhZERhdGVWYWx1ZSxcbiAgICBSZWFkRGVjaW1hbFZhbHVlLFxuICAgIFJlYWRHZW9tVmFsdWUsXG4gICAgUmVhZEludGVnZXJWYWx1ZSxcbiAgICBSZWFkSW50ZXJ2YWxWYWx1ZSxcbiAgICBSZWFkTGlua1ZhbHVlLFxuICAgIFJlYWRMaXN0VmFsdWUsXG4gICAgUmVhZFByb3BlcnRpZXMsXG4gICAgUmVhZFByb3BlcnR5SXRlbSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0RmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0VmFsdWVBc0h0bWwsXG4gICAgUmVhZFRleHRWYWx1ZUFzU3RyaW5nLFxuICAgIFJlYWRUZXh0VmFsdWVBc1htbCxcbiAgICBSZWFkVXJpVmFsdWUsXG4gICAgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayxcbiAgICBVdGlsc1xufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIENvbnRhaW5zIG1ldGhvZHMgdG8gY29udmVydCBKU09OLUxEIHJlcHJlc2VudGluZyByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMgdG8gY2xhc3Nlcy5cbiAqIFRoZXNlIG1ldGhvZHMgd29ya3Mgb25seSBmb3IgaW5zdGFuY2VzIG9mIHJlc291cmNlcyBhbmQgcHJvcGVydGllcywgbm90IGZvciBvbnRvbG9naWVzIChkYXRhIG1vZGVsKS5cbiAqL1xuZXhwb3J0IG1vZHVsZSBDb252ZXJ0SlNPTkxEIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byBhIGZpbHRlciB1c2VkIG9uIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICogc29ydGluZyBvdXQgYWxsIG5vbiB2YWx1ZSBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgKlxuICAgICAqIEdldHMgYWxsIHByb3BlcnR5IG5hbWVzIHRoYXQgcmVmZXIgdG8gdmFsdWUgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wTmFtZSB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiAtIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuQXJrVXJsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMudmVyc2lvbkFya1VybDtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIG1vdmluZ0ltYWdlRmlsZVZhbHVlIGFuZCB0aGUgb3RoZXJzIGhlcmUuLi5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10gKyAnKCcgKyBwcm9wVmFsdWVbJ0BpZCddICsgJyknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVNwZWNpZmljUHJvcDtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgW1tSZWFkUHJvcGVydGllc11dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIFJlYWRQcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRQcm9wZXJ0aWVzIHtcblxuICAgICAgICAvLyBKU09OLUxEIHJlcHJlc2VudGluZyBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICAvLyB0ZXh0IHZhbHVlcyBtYXkgY29udGFpbiBzdGFuZG9mZiBsaW5rc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQ6IE9iamVjdCA9IHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWVdO1xuXG4gICAgICAgIC8vIHRvIGJlIHBvcHVsYXRlZCB3aXRoIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdID0gW107XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0YW5kb2ZmIGxpbmsgdmFsdWUgSlNPTi1MRCBvYmplY3QgdG8gYSBSZWFkTGlua1ZhbHVlXG4gICAgICAgIC8vIGluIG9yZGVyIHBvcHVsYXRlIHRoZSBjb2xsZWN0aW9uIHdpdGggYWxsIHRoZSBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGlua0pTT05MRCBvZiBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbDogUmVhZExpbmtWYWx1ZSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbCA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIHRoZSBnaXZlbiBwcm9wZXJ0eSBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVzOiBBcnJheTxSZWFkUHJvcGVydHlJdGVtPiA9IFtdO1xuXG4gICAgICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgdmFsdWVzIG9yIGp1c3Qgb25lIHZhbHVlIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBhbiBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMgaXMgZ2l2ZW4sIGl0ZXJhdGUgb3ZlciBpdFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcFZhbHVlIG9mIHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocHJvcFZhbHVlLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgcHJvcGVydGllcyBvYmplY3RcbiAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcFZhbHVlcztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYW4gQVBJIHJlc3BvbnNlIGluIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzIGludG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgcmVzb3VyY2Ugb3IgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlc1NlcXVlbmNlIC0gc2VxdWVuY2Ugb2YgcmVhZCByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4gPSBbXTtcbiAgICAgICAgbGV0IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSByZXNvdXJjZXNHcmFwaC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBhbnN3ZXIsIG5vIHJlc291cmNlcyBnaXZlblxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UocmVzb3VyY2VzLCBudW1iZXJPZlJlc291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyBhbGwgdGhlIHR5cGVzIChjbGFzc2VzKSBvZiByZWZlcnJlZCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIHJlc291cmNlIChmcm9tIGl0cyBsaW5raW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIEpTT04tTEQgZGVzY3JpYmluZyBvbmUgcmVzb3VyY2UuXG4gICAgICogQHJldHVybiBzdHJpbmdbXSAtIGFuIEFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMgKGluY2x1ZGluZyBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgLy8gc2V2ZXJhbCB2YWx1ZXMgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZWZlcnJlZFJlcyBvZiByZXNvdXJjZUpTT05MRFtwcm9wXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZSBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzb3VyY2UgdHlwZXMgKGNsYXNzZXMpIGZyb20gYSBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzICh3aXRob3V0IGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG4gICAgICAgIGxldCByZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCBjbGFzcyBvZiB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc2VzLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGEgSlNPTi1MRCByZXNwb25zZSB0byBhIGNvdW50IHF1ZXJ5IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY291bnRRdWVyeUpTT05MRFxuICAgICAqIEByZXR1cm5zIHtDb3VudFF1ZXJ5UmVzdWx0fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTEQ6IG9iamVjdCkge1xuICAgICAgICByZXR1cm4gbmV3IENvdW50UXVlcnlSZXN1bHQoY291bnRRdWVyeUpTT05MRFtLbm9yYUNvbnN0YW50cy5zY2hlbWFOdW1iZXJPZkl0ZW1zXSk7XG4gICAgfVxufVxuIl19