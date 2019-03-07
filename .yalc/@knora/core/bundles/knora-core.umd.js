(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('json2typescript'), require('rxjs/internal/observable/throwError'), require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@knora/core', ['exports', '@angular/core', '@angular/common', '@angular/common/http', 'json2typescript', 'rxjs/internal/observable/throwError', 'rxjs/operators', 'rxjs'], factory) :
    (factory((global.knora = global.knora || {}, global.knora.core = {}),global.ng.core,global.ng.common,global.ng.common.http,null,global.rxjs['internal/observable/throwError'],global.rxjs.operators,global.rxjs));
}(this, (function (exports,i0,common,i1,json2typescript,throwError,operators,rxjs) { 'use strict';

    var KuiCoreConfigToken = new i0.InjectionToken('KuiCoreConfigToken (knora.core.config)');
    var KuiCoreModule = /** @class */ (function () {
        function KuiCoreModule() {
        }
        /**
         *
         * @param {KuiCoreConfig} config
         * @returns {ModuleWithProviders}
         */
        KuiCoreModule.forRoot = function (config) {
            // get the app environment configuration here
            console.log('KuiCoreModule - forRoot - config: ', config);
            return {
                ngModule: KuiCoreModule,
                providers: [
                    { provide: KuiCoreConfigToken, useValue: config }
                ]
            };
        };
        KuiCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.HttpClientModule
                        ],
                        declarations: [],
                        exports: [
                            i1.HttpClientModule
                        ]
                    },] },
        ];
        return KuiCoreModule;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * Knora-ui core configuration with the server definitions of:
     *  - api: URL of data service e.g. knora: http://localhost:3333
     *  - media: URL of media server service e.g. sipi: http://localhost:1024
     *  - app: URL of the app e.g. salsah: http://localhost:4200
     */
    var KuiCoreConfig = /** @class */ (function () {
        function KuiCoreConfig() {
            /**
             * name of the app e.g. 'SALSAH'
             * @type {string}
             */
            this.name = undefined;
            /**
             * url of the app e.g. 'https://salsah.org'
             * @type {undefined}
             */
            this.app = undefined;
            /**
             * url of the api e.g. 'https://api.knora.org'
             * @type {string}
             */
            this.api = undefined;
            /**
             * url of media/file server e.g. 'https://iiif.sipi.io'
             * @type {string}
             */
            this.media = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('app', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "app", void 0);
        __decorate([
            json2typescript.JsonProperty('api', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "api", void 0);
        __decorate([
            json2typescript.JsonProperty('media', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "media", void 0);
        KuiCoreConfig = __decorate([
            json2typescript.JsonObject('KuiCoreConfig')
        ], KuiCoreConfig);
        return KuiCoreConfig;
    }());

    /**
     * Result class used as API url response in ApiService
     */
    var ApiServiceResult = /** @class */ (function () {
        function ApiServiceResult() {
            /**
             * Status number
             */
            this.status = 0;
            /**
             * Status text
             */
            this.statusText = '';
            /**
             * API url
             */
            this.url = '';
        }
        /**
         * Gets the result body as instance of classObject.
         * @param classObject
         * @returns {any}
         * @throws
         */
        ApiServiceResult.prototype.getBody = function (classObject) {
            // console.log(this.body);
            return ApiServiceResult.jsonConvert.deserialize(this.body, classObject);
        };
        ApiServiceResult.jsonConvert = new json2typescript.JsonConvert(json2typescript.OperationMode.ENABLE, json2typescript.ValueCheckingMode.ALLOW_NULL);
        return ApiServiceResult;
    }());

    /**
     * Error class used as API response in ApiService
     */
    var ApiServiceError = /** @class */ (function () {
        function ApiServiceError() {
            /**
             * Status number
             */
            this.status = 0;
            /**
             * Status text
             */
            this.statusText = '';
            /**
             * API url
             */
            this.url = '';
            /**
             * Additional error info
             */
            this.errorInfo = '';
        }
        return ApiServiceError;
    }());

    var KnoraConstants = /** @class */ (function () {
        function KnoraConstants() {
        }
        KnoraConstants.KnoraApi = 'http://api.knora.org/ontology/knora-api';
        KnoraConstants.PathSeparator = '#';
        KnoraConstants.KnoraOntologyPath = 'http://www.knora.org/ontology';
        KnoraConstants.KnoraBase = KnoraConstants.KnoraOntologyPath + '/knora-base';
        KnoraConstants.SystemProjectIRI = KnoraConstants.KnoraBase + '#SystemProject';
        KnoraConstants.SystemAdminGroupIRI = KnoraConstants.KnoraBase + '#SystemAdmin';
        KnoraConstants.ProjectAdminGroupIRI = KnoraConstants.KnoraBase + '#ProjectAdmin';
        KnoraConstants.ProjectMemberGroupIRI = KnoraConstants.KnoraBase + '#ProjectMember';
        KnoraConstants.KnoraApiV2WithValueObjectPath = KnoraConstants.KnoraApi + '/v2' + KnoraConstants.PathSeparator;
        KnoraConstants.KnoraApiV2SimplePath = KnoraConstants.KnoraApi + '/simple/v2' + KnoraConstants.PathSeparator;
        KnoraConstants.SalsahGuiOntology = 'http://api.knora.org/ontology/salsah-gui/v2';
        KnoraConstants.SalsahGuiOrder = KnoraConstants.SalsahGuiOntology + '#guiOrder';
        KnoraConstants.StandoffOntology = 'http://api.knora.org/ontology/standoff/v2';
        KnoraConstants.Resource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Resource';
        KnoraConstants.TextValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextValue';
        KnoraConstants.IntValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntValue';
        KnoraConstants.BooleanValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'BooleanValue';
        KnoraConstants.UriValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'UriValue';
        KnoraConstants.DecimalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DecimalValue';
        KnoraConstants.DateValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DateValue';
        KnoraConstants.ColorValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ColorValue';
        KnoraConstants.GeomValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeomValue';
        KnoraConstants.ListValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListValue';
        KnoraConstants.IntervalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntervalValue';
        KnoraConstants.LinkValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'LinkValue';
        KnoraConstants.GeonameValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeonameValue';
        KnoraConstants.FileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'FileValue';
        KnoraConstants.AudioFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'AudioFileValue';
        KnoraConstants.DDDFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DDDFileValue';
        KnoraConstants.DocumentFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DocumentFileValue';
        KnoraConstants.StillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'StillImageFileValue';
        KnoraConstants.MovingImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'MovingImageFileValue';
        KnoraConstants.TextFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextFileValue';
        KnoraConstants.IsResourceClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isResourceClass';
        KnoraConstants.IsValueClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isValueClass';
        KnoraConstants.ForbiddenResource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ForbiddenResource';
        KnoraConstants.XMLToStandoffMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'XMLToStandoffMapping';
        KnoraConstants.ListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListNode';
        KnoraConstants.ArkUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'arkUrl';
        KnoraConstants.versionArkUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'versionArkUrl';
        KnoraConstants.ObjectType = KnoraConstants.KnoraApiV2WithValueObjectPath + 'objectType';
        KnoraConstants.ResourceIcon = KnoraConstants.KnoraApiV2WithValueObjectPath + 'resourceIcon';
        KnoraConstants.isEditable = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isEditable';
        KnoraConstants.isLinkProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkProperty';
        KnoraConstants.isLinkValueProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkValueProperty';
        KnoraConstants.hasGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasGeometry';
        KnoraConstants.schemaName = 'http://schema.org/name';
        KnoraConstants.schemaNumberOfItems = 'http://schema.org/numberOfItems';
        KnoraConstants.schemaItemListElement = 'http://schema.org/itemListElement';
        KnoraConstants.RdfProperty = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property';
        KnoraConstants.RdfsSchema = 'http://www.w3.org/2000/01/rdf-schema' + KnoraConstants.PathSeparator;
        KnoraConstants.RdfsLabel = KnoraConstants.RdfsSchema + 'label';
        KnoraConstants.RdfsComment = KnoraConstants.RdfsSchema + 'comment';
        KnoraConstants.RdfsSubclassOf = KnoraConstants.RdfsSchema + 'subClassOf';
        KnoraConstants.subPropertyOf = KnoraConstants.RdfsSchema + 'subPropertyOf';
        KnoraConstants.owl = 'http://www.w3.org/2002/07/owl';
        KnoraConstants.OwlClass = KnoraConstants.owl + '#Class';
        KnoraConstants.OwlObjectProperty = KnoraConstants.owl + '#ObjectProperty';
        KnoraConstants.OwlDatatypeProperty = KnoraConstants.owl + '#DatatypeProperty';
        KnoraConstants.OwlAnnotationProperty = KnoraConstants.owl + '#AnnotationProperty';
        KnoraConstants.OwlOnProperty = KnoraConstants.owl + '#onProperty';
        KnoraConstants.OwlMaxCardinality = KnoraConstants.owl + '#maxCardinality';
        KnoraConstants.OwlMinCardinality = KnoraConstants.owl + '#minCardinality';
        KnoraConstants.OwlCardinality = KnoraConstants.owl + '#cardinality';
        KnoraConstants.OwlRestriction = KnoraConstants.owl + '#Restriction';
        KnoraConstants.creationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'creationDate';
        KnoraConstants.lastModificationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'lastModificationDate';
        KnoraConstants.hasPermissions = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasPermissions';
        KnoraConstants.attachedToProject = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToProject';
        KnoraConstants.attachedToUser = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToUser';
        KnoraConstants.Region = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Region';
        KnoraConstants.ReadTextValueAsHtml = 'ReadTextValueAsHtml';
        KnoraConstants.ReadTextValueAsString = 'ReadTextValueAsString';
        KnoraConstants.ReadTextValueAsXml = 'ReadTextValueAsXml';
        KnoraConstants.ReadDateValue = 'ReadDateValue';
        KnoraConstants.ReadLinkValue = 'ReadLinkValue';
        KnoraConstants.ReadIntegerValue = 'ReadIntegerValue';
        KnoraConstants.ReadDecimalValue = 'ReadDecimalValue';
        KnoraConstants.ReadStillImageFileValue = 'ReadStillImageFileValue';
        KnoraConstants.ReadTextFileValue = 'ReadTextFileValue';
        KnoraConstants.ReadGeomValue = 'ReadGeomValue';
        KnoraConstants.ReadColorValue = 'ReadColorValue';
        KnoraConstants.ReadUriValue = 'ReadUriValue';
        KnoraConstants.ReadBooleanValue = 'ReadBooleanValue';
        KnoraConstants.ReadIntervalValue = 'ReadIntervalValue';
        KnoraConstants.ReadListValue = 'ReadListValue';
        KnoraConstants.valueAsString = KnoraConstants.KnoraApiV2WithValueObjectPath + 'valueAsString';
        KnoraConstants.textValueAsHtml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsHtml';
        KnoraConstants.textValueAsXml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsXml';
        KnoraConstants.textValueHasMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueHasMapping';
        KnoraConstants.hasStandoffLinkToValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStandoffLinkToValue';
        KnoraConstants.dateValueHasStartYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartYear';
        KnoraConstants.dateValueHasEndYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndYear';
        KnoraConstants.dateValueHasStartEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartEra';
        KnoraConstants.dateValueHasEndEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndEra';
        KnoraConstants.dateValueHasStartMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartMonth';
        KnoraConstants.dateValueHasEndMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndMonth';
        KnoraConstants.dateValueHasStartDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartDay';
        KnoraConstants.dateValueHasEndDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndDay';
        KnoraConstants.dateValueHasCalendar = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasCalendar';
        KnoraConstants.linkValueHasTarget = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTarget';
        KnoraConstants.linkValueHasSource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSource';
        KnoraConstants.linkValueHasSourceIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSourceIri';
        KnoraConstants.linkValueHasTargetIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTargetIri';
        KnoraConstants.integerValueAsInteger = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intValueAsInt';
        KnoraConstants.decimalValueAsDecimal = KnoraConstants.KnoraApiV2WithValueObjectPath + 'decimalValueAsDecimal';
        KnoraConstants.fileValueAsUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueAsUrl';
        KnoraConstants.fileValueIsPreview = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueIsPreview';
        KnoraConstants.fileValueHasFilename = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueHasFilename';
        KnoraConstants.hasStillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStillImageFileValue';
        KnoraConstants.stillImageFileValueHasDimX = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimX';
        KnoraConstants.stillImageFileValueHasDimY = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimY';
        KnoraConstants.stillImageFileValueHasIIIFBaseUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasIIIFBaseUrl';
        KnoraConstants.colorValueAsColor = KnoraConstants.KnoraApiV2WithValueObjectPath + 'colorValueAsColor';
        KnoraConstants.geometryValueAsGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'geometryValueAsGeometry';
        KnoraConstants.uriValueAsUri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'uriValueAsUri';
        KnoraConstants.booleanValueAsBoolean = KnoraConstants.KnoraApiV2WithValueObjectPath + 'booleanValueAsBoolean';
        KnoraConstants.intervalValueHasStart = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasStart';
        KnoraConstants.intervalValueHasEnd = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasEnd';
        KnoraConstants.listValueAsListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNode';
        KnoraConstants.listValueAsListNodeLabel = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNodeLabel';
        KnoraConstants.Xsd = 'http://www.w3.org/2001/XMLSchema#';
        KnoraConstants.xsdString = KnoraConstants.Xsd + 'string';
        KnoraConstants.xsdBoolean = KnoraConstants.Xsd + 'boolean';
        KnoraConstants.xsdInteger = KnoraConstants.Xsd + 'integer';
        KnoraConstants.xsdDecimal = KnoraConstants.Xsd + 'decimal';
        KnoraConstants.xsdUri = KnoraConstants.Xsd + 'anyURI';
        KnoraConstants.resourceSimple = KnoraConstants.KnoraApiV2SimplePath + 'Resource';
        KnoraConstants.dateSimple = KnoraConstants.KnoraApiV2SimplePath + 'Date';
        KnoraConstants.intervalSimple = KnoraConstants.KnoraApiV2SimplePath + 'Interval';
        KnoraConstants.geomSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geom';
        KnoraConstants.colorSimple = KnoraConstants.KnoraApiV2SimplePath + 'Color';
        KnoraConstants.geonameSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geoname';
        KnoraConstants.fileSimple = KnoraConstants.KnoraApiV2SimplePath + 'File';
        KnoraConstants.matchFunction = KnoraConstants.KnoraApiV2SimplePath + 'match';
        KnoraConstants.EqualsComparisonOperator = '=';
        KnoraConstants.EqualsComparisonLabel = 'is equal to';
        KnoraConstants.NotEqualsComparisonOperator = '!=';
        KnoraConstants.NotEqualsComparisonLabel = 'is not equal to';
        KnoraConstants.GreaterThanComparisonOperator = '>';
        KnoraConstants.GreaterThanComparisonLabel = 'is greater than';
        KnoraConstants.GreaterThanEqualsComparisonOperator = '>=';
        KnoraConstants.GreaterThanEqualsComparisonLabel = 'is greater than equals to';
        KnoraConstants.LessThanComparisonOperator = '<';
        KnoraConstants.LessThanComparisonLabel = 'is less than';
        KnoraConstants.LessThanEqualsComparisonOperator = '<=';
        KnoraConstants.LessThanQualsComparisonLabel = 'is less than equals to';
        KnoraConstants.ExistsComparisonOperator = 'E';
        KnoraConstants.ExistsComparisonLabel = 'exists';
        KnoraConstants.LikeComparisonOperator = 'regex';
        KnoraConstants.LikeComparisonLabel = 'is like';
        KnoraConstants.MatchComparisonOperator = 'contains';
        KnoraConstants.MatchComparisonLabel = 'matches';
        KnoraConstants.SalsahLink = 'salsah-link'; // class on an HTML <a> element that indicates a link to a Knora resource
        KnoraConstants.RefMarker = 'ref-marker'; // class on an HTML element that refers to another element in the same document
        KnoraConstants.GNDPrefix = '(DE-588)';
        KnoraConstants.GNDResolver = 'http://d-nb.info/gnd/';
        KnoraConstants.VIAFPrefix = '(VIAF)';
        KnoraConstants.VIAFResolver = 'https://viaf.org/viaf/';
        return KnoraConstants;
    }());
    (function (KnoraSchema) {
        KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
        KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
    })(exports.KnoraSchema || (exports.KnoraSchema = {}));

    /**
     * Collection of useful utility functions.
     */
    // @dynamic
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**
         * Given a Knora entity IRI, gets the ontology Iri.
         *
         * @param {string} entityIri an entity Iri.
         * @return {string} the ontology IRI
         */
        Utils.getOntologyIriFromEntityIri = function (entityIri) {
            // split class Iri on "#"
            var segments = entityIri.split(KnoraConstants.PathSeparator);
            if (segments.length !== 2)
                console.error("Error: " + entityIri + " is not a valid entity IRI.");
            return segments[0];
        };
        /**
         * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
         *
         * @param {string} complexEntityIri
         * @returns {string}
         */
        Utils.convertComplexKnoraApiEntityIritoSimple = function (complexEntityIri) {
            // split entity Iri on "#"
            var segments = complexEntityIri.split('v2' + KnoraConstants.PathSeparator);
            if (segments.length !== 2)
                console.error("Error: " + complexEntityIri + " is not a valid entity IRI.");
            // add 'simple' to base path
            return segments[0] + 'simple/v2' + KnoraConstants.PathSeparator + segments[1];
        };
        /**
         * A regex to validate Email address.
         *
         * @type {RegExp}
         */
        Utils.RegexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        /**
         * A regex to validate Username.
         *
         * @type {RegExp}
         */
        Utils.RegexUsername = /^[a-zA-Z0-9]+$/;
        /**
         * A regex to validate URLs.
         *
         * @type {RegExp}
         */
        Utils.RegexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/i;
        /**
         * A regex to validate Passwords
         *
         * @type {RegExp}
         */
        Utils.RegexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i;
        /**
         * A regex to validate Hexadecimal values
         *
         * @type {RegExp}
         */
        Utils.RegexHex = /^[0-9A-Fa-f]+$/;
        /**
         * A regex to validate shortname in projects
         *
         * @type {RegExp}
         */
        Utils.RegexShortname = /^[a-zA-Z]+\S*$/;
        /**
         * Lambda function eliminating duplicates in a collection to be passed to [[filter]].
         *
         * @param elem element of an Array that is currently being looked at.
         * @param index current elements index.
         * @param self reference to the whole Array.
         * @returns {boolean} true if the same element does not already exist in the Array.
         */
        Utils.filterOutDuplicates = function (elem, index, self) {
            // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example
            // returns true if the element's index equals the index of the leftmost element
            // -> this means that there is no identical element before this index, hence it is not a duplicate
            // for all other elements, false is returned
            return index === self.indexOf(elem);
        };
        return Utils;
    }());

    var StringLiteral = /** @class */ (function () {
        function StringLiteral() {
            this.value = undefined;
            this.language = '';
        }
        __decorate([
            json2typescript.JsonProperty('value', String, false),
            __metadata("design:type", String)
        ], StringLiteral.prototype, "value", void 0);
        __decorate([
            json2typescript.JsonProperty('language', String, true),
            __metadata("design:type", String)
        ], StringLiteral.prototype, "language", void 0);
        StringLiteral = __decorate([
            json2typescript.JsonObject('StringLiteral')
        ], StringLiteral);
        return StringLiteral;
    }());

    /**
     * Precision for DateSalsah.
     */
    (function (Precision) {
        Precision[Precision["yearPrecision"] = 0] = "yearPrecision";
        Precision[Precision["monthPrecision"] = 1] = "monthPrecision";
        Precision[Precision["dayPrecision"] = 2] = "dayPrecision";
    })(exports.Precision || (exports.Precision = {}));
    /**
     * Represents a Salsah date object with a precision information.
     */
    var DateSalsah = /** @class */ (function () {
        function DateSalsah(calendar, era, year, month, day) {
            this.calendar = calendar;
            this.era = era;
            this.year = year;
            this.month = month;
            this.day = day;
            if (this.month === undefined) {
                // year precision
                this.precision = exports.Precision.yearPrecision;
            }
            else if (this.day === undefined) {
                // month precision
                this.precision = exports.Precision.monthPrecision;
            }
            else {
                // day precision
                this.precision = exports.Precision.dayPrecision;
            }
        }
        /**
         * Returns a string representation of the date without the calendar.
         *
         * @returns {string}
         */
        DateSalsah.prototype.getDateAsStringWithoutCalendar = function () {
            var dateString = '(' + this.era + ') ';
            switch (this.precision) {
                case exports.Precision.yearPrecision: {
                    dateString += this.year.toString();
                    break;
                }
                case exports.Precision.monthPrecision: {
                    dateString += this.year + DateSalsah.separator + this.month;
                    break;
                }
                case exports.Precision.dayPrecision: {
                    dateString += this.year + DateSalsah.separator + this.month + DateSalsah.separator + this.day;
                    break;
                }
                default: {
                    break;
                }
            }
            return dateString;
        };
        /**
         * Returns a string representation of the date (with calendar).
         *
         * @returns {string}
         */
        DateSalsah.prototype.getDateAsString = function () {
            return this.calendar + ':' + this.getDateAsStringWithoutCalendar();
        };
        DateSalsah.separator = '-';
        return DateSalsah;
    }());
    /**
     * Represents a period (with start date and end date).
     */
    var DateRangeSalsah = /** @class */ (function () {
        function DateRangeSalsah(start, end) {
            this.start = start;
            this.end = end;
        }
        /**
         * Returns a string representation of the date range (with preceding calendar).
         *
         * @returns {string}
         */
        DateRangeSalsah.prototype.getDateAsString = function () {
            return this.start.getDateAsString() + ':' + this.end.getDateAsStringWithoutCalendar();
        };
        return DateRangeSalsah;
    }());

    var AuthenticationResponse = /** @class */ (function () {
        function AuthenticationResponse() {
            this.token = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('token', String),
            __metadata("design:type", String)
        ], AuthenticationResponse.prototype, "token", void 0);
        AuthenticationResponse = __decorate([
            json2typescript.JsonObject('AuthenticationResponse')
        ], AuthenticationResponse);
        return AuthenticationResponse;
    }());

    var Project = /** @class */ (function () {
        function Project() {
            this.id = undefined;
            this.shortname = undefined;
            this.shortcode = undefined;
            this.longname = undefined;
            this.description = [new StringLiteral()];
            this.keywords = undefined;
            this.logo = undefined;
            this.institution = undefined;
            this.ontologies = undefined;
            this.status = undefined;
            this.selfjoin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], Project.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('shortname', String),
            __metadata("design:type", String)
        ], Project.prototype, "shortname", void 0);
        __decorate([
            json2typescript.JsonProperty('shortcode', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "shortcode", void 0);
        __decorate([
            json2typescript.JsonProperty('longname', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "longname", void 0);
        __decorate([
            json2typescript.JsonProperty('description', [StringLiteral], true),
            __metadata("design:type", Array)
        ], Project.prototype, "description", void 0);
        __decorate([
            json2typescript.JsonProperty('keywords', [String], true),
            __metadata("design:type", Array)
        ], Project.prototype, "keywords", void 0);
        __decorate([
            json2typescript.JsonProperty('logo', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "logo", void 0);
        __decorate([
            json2typescript.JsonProperty('institution', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "institution", void 0);
        __decorate([
            json2typescript.JsonProperty('ontologies', [String]),
            __metadata("design:type", Array)
        ], Project.prototype, "ontologies", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], Project.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('selfjoin', Boolean),
            __metadata("design:type", Boolean)
        ], Project.prototype, "selfjoin", void 0);
        Project = __decorate([
            json2typescript.JsonObject('Project')
        ], Project);
        return Project;
    }());

    var Group = /** @class */ (function () {
        function Group() {
            this.id = undefined;
            this.name = undefined;
            this.description = undefined;
            this.project = undefined;
            this.status = undefined;
            this.selfjoin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], Group.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], Group.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('description', String),
            __metadata("design:type", String)
        ], Group.prototype, "description", void 0);
        __decorate([
            json2typescript.JsonProperty('project', Project, false),
            __metadata("design:type", Project)
        ], Group.prototype, "project", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], Group.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('selfjoin', Boolean),
            __metadata("design:type", Boolean)
        ], Group.prototype, "selfjoin", void 0);
        Group = __decorate([
            json2typescript.JsonObject('Group')
        ], Group);
        return Group;
    }());

    var GroupResponse = /** @class */ (function () {
        function GroupResponse() {
            this.group = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('group', Group),
            __metadata("design:type", Group)
        ], GroupResponse.prototype, "group", void 0);
        GroupResponse = __decorate([
            json2typescript.JsonObject('GroupResponse')
        ], GroupResponse);
        return GroupResponse;
    }());

    var GroupsResponse = /** @class */ (function () {
        function GroupsResponse() {
            this.groups = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('groups', [Group]),
            __metadata("design:type", Array)
        ], GroupsResponse.prototype, "groups", void 0);
        GroupsResponse = __decorate([
            json2typescript.JsonObject('GroupsResponse')
        ], GroupsResponse);
        return GroupsResponse;
    }());

    var ListInfo = /** @class */ (function () {
        function ListInfo() {
            this.id = undefined;
            this.projectIri = undefined;
            this.labels = undefined;
            this.comments = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String, false),
            __metadata("design:type", String)
        ], ListInfo.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('projectIri', String, false),
            __metadata("design:type", String)
        ], ListInfo.prototype, "projectIri", void 0);
        __decorate([
            json2typescript.JsonProperty('labels', [StringLiteral], true),
            __metadata("design:type", Array)
        ], ListInfo.prototype, "labels", void 0);
        __decorate([
            json2typescript.JsonProperty('comments', [StringLiteral], true),
            __metadata("design:type", Array)
        ], ListInfo.prototype, "comments", void 0);
        ListInfo = __decorate([
            json2typescript.JsonObject('ListInfo')
        ], ListInfo);
        return ListInfo;
    }());

    var ListNode = /** @class */ (function () {
        function ListNode() {
            this.id = undefined;
            this.name = undefined;
            this.label = undefined;
            this.children = undefined;
            this.level = undefined;
            this.position = undefined;
        }
        ListNode_1 = ListNode;
        var ListNode_1;
        __decorate([
            json2typescript.JsonProperty('id', String, false),
            __metadata("design:type", String)
        ], ListNode.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String, true),
            __metadata("design:type", String)
        ], ListNode.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('label', String, true),
            __metadata("design:type", String)
        ], ListNode.prototype, "label", void 0);
        __decorate([
            json2typescript.JsonProperty('children', [ListNode_1], true),
            __metadata("design:type", Array)
        ], ListNode.prototype, "children", void 0);
        __decorate([
            json2typescript.JsonProperty('level', Number, true),
            __metadata("design:type", Number)
        ], ListNode.prototype, "level", void 0);
        __decorate([
            json2typescript.JsonProperty('position', Number, true),
            __metadata("design:type", Number)
        ], ListNode.prototype, "position", void 0);
        ListNode = ListNode_1 = __decorate([
            json2typescript.JsonObject('ListNode')
        ], ListNode);
        return ListNode;
    }());

    var List = /** @class */ (function () {
        function List() {
            this.listinfo = undefined;
            this.children = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('listinfo', ListInfo, false),
            __metadata("design:type", ListInfo)
        ], List.prototype, "listinfo", void 0);
        __decorate([
            json2typescript.JsonProperty('children', [ListNode], false),
            __metadata("design:type", Array)
        ], List.prototype, "children", void 0);
        List = __decorate([
            json2typescript.JsonObject('List')
        ], List);
        return List;
    }());

    var ListInfoResponse = /** @class */ (function () {
        function ListInfoResponse() {
            this.listinfo = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('listinfo', ListInfo, false),
            __metadata("design:type", ListInfo)
        ], ListInfoResponse.prototype, "listinfo", void 0);
        ListInfoResponse = __decorate([
            json2typescript.JsonObject('ListInfoResponse')
        ], ListInfoResponse);
        return ListInfoResponse;
    }());

    var ListNodeInfo = /** @class */ (function () {
        function ListNodeInfo() {
            this.id = undefined;
            this.name = undefined;
            this.projectIri = undefined;
            this.isRootNode = undefined;
            this.labels = undefined;
            this.comments = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String, true),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('projectIri', String, true),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "projectIri", void 0);
        __decorate([
            json2typescript.JsonProperty('isRootNode', Boolean, true),
            __metadata("design:type", Boolean)
        ], ListNodeInfo.prototype, "isRootNode", void 0);
        __decorate([
            json2typescript.JsonProperty('labels', [StringLiteral]),
            __metadata("design:type", Array)
        ], ListNodeInfo.prototype, "labels", void 0);
        __decorate([
            json2typescript.JsonProperty('comments', [StringLiteral]),
            __metadata("design:type", Array)
        ], ListNodeInfo.prototype, "comments", void 0);
        ListNodeInfo = __decorate([
            json2typescript.JsonObject('ListNodeInfo')
        ], ListNodeInfo);
        return ListNodeInfo;
    }());

    var ListNodeInfoResponse = /** @class */ (function () {
        function ListNodeInfoResponse() {
            this.nodeinfo = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('nodeinfo', ListNodeInfo, false),
            __metadata("design:type", ListNodeInfo)
        ], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
        ListNodeInfoResponse = __decorate([
            json2typescript.JsonObject('ListNodeInfoResponse')
        ], ListNodeInfoResponse);
        return ListNodeInfoResponse;
    }());

    var ListResponse = /** @class */ (function () {
        function ListResponse() {
            this.list = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('list', List, false),
            __metadata("design:type", List)
        ], ListResponse.prototype, "list", void 0);
        ListResponse = __decorate([
            json2typescript.JsonObject('ListResponse')
        ], ListResponse);
        return ListResponse;
    }());

    var ListsResponse = /** @class */ (function () {
        function ListsResponse() {
            this.lists = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('lists', [ListNodeInfo], false),
            __metadata("design:type", Array)
        ], ListsResponse.prototype, "lists", void 0);
        ListsResponse = __decorate([
            json2typescript.JsonObject('ListsResponse')
        ], ListsResponse);
        return ListsResponse;
    }());

    var OntologyInfoShort = /** @class */ (function () {
        function OntologyInfoShort() {
            this.ontologyIri = undefined;
            this.ontologyName = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('ontologyIri', String),
            __metadata("design:type", String)
        ], OntologyInfoShort.prototype, "ontologyIri", void 0);
        __decorate([
            json2typescript.JsonProperty('ontologyName', String),
            __metadata("design:type", String)
        ], OntologyInfoShort.prototype, "ontologyName", void 0);
        OntologyInfoShort = __decorate([
            json2typescript.JsonObject('OntologyInfoShort')
        ], OntologyInfoShort);
        return OntologyInfoShort;
    }());

    var PermissionData = /** @class */ (function () {
        function PermissionData() {
            this.groupsPerProject = undefined;
            this.administrativePermissionsPerProject = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('groupsPerProject', Object),
            __metadata("design:type", Object)
        ], PermissionData.prototype, "groupsPerProject", void 0);
        __decorate([
            json2typescript.JsonProperty('administrativePermissionsPerProject', Object),
            __metadata("design:type", Object)
        ], PermissionData.prototype, "administrativePermissionsPerProject", void 0);
        PermissionData = __decorate([
            json2typescript.JsonObject('PermissionData')
        ], PermissionData);
        return PermissionData;
    }());

    var User = /** @class */ (function () {
        function User() {
            this.id = undefined;
            this.email = undefined;
            this.username = undefined;
            this.password = undefined;
            this.token = undefined;
            this.givenName = undefined;
            this.familyName = undefined;
            this.status = undefined;
            this.lang = undefined;
            this.groups = undefined;
            this.projects = undefined;
            this.sessionId = undefined;
            this.permissions = undefined;
            this.systemAdmin = false;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], User.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('email', String),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            json2typescript.JsonProperty('username', String),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
        __decorate([
            json2typescript.JsonProperty('password', String, true),
            __metadata("design:type", String)
        ], User.prototype, "password", void 0);
        __decorate([
            json2typescript.JsonProperty('token', String, true),
            __metadata("design:type", String)
        ], User.prototype, "token", void 0);
        __decorate([
            json2typescript.JsonProperty('givenName', String),
            __metadata("design:type", String)
        ], User.prototype, "givenName", void 0);
        __decorate([
            json2typescript.JsonProperty('familyName', String),
            __metadata("design:type", String)
        ], User.prototype, "familyName", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], User.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('lang', String),
            __metadata("design:type", String)
        ], User.prototype, "lang", void 0);
        __decorate([
            json2typescript.JsonProperty('groups', [Group]),
            __metadata("design:type", Array)
        ], User.prototype, "groups", void 0);
        __decorate([
            json2typescript.JsonProperty('projects', [Project]),
            __metadata("design:type", Array)
        ], User.prototype, "projects", void 0);
        __decorate([
            json2typescript.JsonProperty('sessionId', String, true),
            __metadata("design:type", String)
        ], User.prototype, "sessionId", void 0);
        __decorate([
            json2typescript.JsonProperty('permissions', PermissionData),
            __metadata("design:type", PermissionData)
        ], User.prototype, "permissions", void 0);
        __decorate([
            json2typescript.JsonProperty('systemAdmin', Boolean, true),
            __metadata("design:type", Boolean)
        ], User.prototype, "systemAdmin", void 0);
        User = __decorate([
            json2typescript.JsonObject('User')
        ], User);
        return User;
    }());

    var ProjectMembersResponse = /** @class */ (function () {
        function ProjectMembersResponse() {
            this.members = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('members', [User]),
            __metadata("design:type", Array)
        ], ProjectMembersResponse.prototype, "members", void 0);
        ProjectMembersResponse = __decorate([
            json2typescript.JsonObject('ProjectMembersResponse')
        ], ProjectMembersResponse);
        return ProjectMembersResponse;
    }());

    var ProjectResponse = /** @class */ (function () {
        function ProjectResponse() {
            this.project = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('project', Project),
            __metadata("design:type", Project)
        ], ProjectResponse.prototype, "project", void 0);
        ProjectResponse = __decorate([
            json2typescript.JsonObject('ProjectResponse')
        ], ProjectResponse);
        return ProjectResponse;
    }());

    var ProjectsResponse = /** @class */ (function () {
        function ProjectsResponse() {
            this.projects = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('projects', [Project]),
            __metadata("design:type", Array)
        ], ProjectsResponse.prototype, "projects", void 0);
        ProjectsResponse = __decorate([
            json2typescript.JsonObject('ProjectsResponse')
        ], ProjectsResponse);
        return ProjectsResponse;
    }());

    var CurrentUser = /** @class */ (function () {
        function CurrentUser() {
            this.name = undefined;
            this.jwt = undefined;
            this.lang = undefined;
            this.sysAdmin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('jwt', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "jwt", void 0);
        __decorate([
            json2typescript.JsonProperty('lang', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "lang", void 0);
        __decorate([
            json2typescript.JsonProperty('sysAdmin', Boolean),
            __metadata("design:type", Boolean)
        ], CurrentUser.prototype, "sysAdmin", void 0);
        CurrentUser = __decorate([
            json2typescript.JsonObject
        ], CurrentUser);
        return CurrentUser;
    }());

    var UsersResponse = /** @class */ (function () {
        function UsersResponse() {
            this.users = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('users', [User]),
            __metadata("design:type", Array)
        ], UsersResponse.prototype, "users", void 0);
        UsersResponse = __decorate([
            json2typescript.JsonObject('UsersResponse')
        ], UsersResponse);
        return UsersResponse;
    }());

    var UserResponse = /** @class */ (function () {
        function UserResponse() {
            this.user = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('user', User),
            __metadata("design:type", User)
        ], UserResponse.prototype, "user", void 0);
        UserResponse = __decorate([
            json2typescript.JsonObject('UserResponse')
        ], UserResponse);
        return UserResponse;
    }());

    /**
     * Abstract class representing a text value object with or without markup.
     */
    var ReadTextValue = /** @class */ (function () {
        function ReadTextValue() {
            this.type = KnoraConstants.TextValue;
        }
        return ReadTextValue;
    }());
    /**
     * Represents a text value object without markup (mere character string).
     */
    var ReadTextValueAsString = /** @class */ (function (_super) {
        __extends(ReadTextValueAsString, _super);
        function ReadTextValueAsString(id, propIri, str) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.propIri = propIri;
            _this.str = str;
            return _this;
        }
        ReadTextValueAsString.prototype.getClassName = function () {
            return KnoraConstants.ReadTextValueAsString;
        };
        ReadTextValueAsString.prototype.getContent = function () {
            return this.str;
        };
        return ReadTextValueAsString;
    }(ReadTextValue));
    /**
     * Represents resources referred to by standoff links.
     */
    var ReferredResourcesByStandoffLink = /** @class */ (function () {
        function ReferredResourcesByStandoffLink() {
        }
        return ReferredResourcesByStandoffLink;
    }());
    /**
     * Represents a text value object with markup that has been turned into HTML.
     */
    var ReadTextValueAsHtml = /** @class */ (function (_super) {
        __extends(ReadTextValueAsHtml, _super);
        function ReadTextValueAsHtml(id, propIri, html, referredResources) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.propIri = propIri;
            _this.html = html;
            _this.referredResources = referredResources;
            return _this;
        }
        /**
         * Gets information about a resource referred to by a standoff link from a text value.
         *
         * @param {string} resourceIri the Iri of the referred resource.
         * @param {OntologyInformation} ontologyInfo ontology information.
         * @returns {string} information about the referred resource's class and its label.
         */
        ReadTextValueAsHtml.prototype.getReferredResourceInfo = function (resourceIri, ontologyInfo) {
            if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
                var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
                return this.referredResources[resourceIri].label + (" (" + resClassLabel + ")");
            }
            else {
                return 'no information found about referred resource (target of standoff link)';
            }
        };
        ReadTextValueAsHtml.prototype.getClassName = function () {
            return KnoraConstants.ReadTextValueAsHtml;
        };
        ReadTextValueAsHtml.prototype.getContent = function () {
            return this.html;
        };
        return ReadTextValueAsHtml;
    }(ReadTextValue));
    /**
     * Represents a text value object with markup as XML.
     */
    var ReadTextValueAsXml = /** @class */ (function (_super) {
        __extends(ReadTextValueAsXml, _super);
        function ReadTextValueAsXml(id, propIri, xml, mappingIri) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.propIri = propIri;
            _this.xml = xml;
            _this.mappingIri = mappingIri;
            return _this;
        }
        ReadTextValueAsXml.prototype.getClassName = function () {
            return KnoraConstants.ReadTextValueAsXml;
        };
        ReadTextValueAsXml.prototype.getContent = function () {
            return this.xml;
        };
        return ReadTextValueAsXml;
    }(ReadTextValue));
    /**
     * Represents a date value object.
     */
    var ReadDateValue = /** @class */ (function () {
        function ReadDateValue(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
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
        ReadDateValue.prototype.getDateSalsah = function () {
            if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
                // precise date
                return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
            }
            else {
                // date period
                return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
            }
        };
        ReadDateValue.prototype.getClassName = function () {
            return KnoraConstants.ReadDateValue;
        };
        ReadDateValue.prototype.getContent = function () {
            return this.getDateSalsah().getDateAsString();
        };
        return ReadDateValue;
    }());
    /**
     * Represents a link value object (reification).
     */
    var ReadLinkValue = /** @class */ (function () {
        function ReadLinkValue(id, propIri, referredResourceIri, referredResource) {
            this.id = id;
            this.propIri = propIri;
            this.referredResourceIri = referredResourceIri;
            this.referredResource = referredResource;
            this.type = KnoraConstants.LinkValue;
        }
        ReadLinkValue.prototype.getReferredResourceInfo = function (ontologyInfo) {
            if (this.referredResource !== undefined) {
                var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
                return this.referredResource.label + (" (" + resClassLabel + ")");
            }
            else {
                return this.referredResourceIri;
            }
        };
        ReadLinkValue.prototype.getClassName = function () {
            return KnoraConstants.ReadLinkValue;
        };
        ReadLinkValue.prototype.getContent = function () {
            if (this.referredResource !== undefined) {
                return this.referredResource.label;
            }
            else {
                return this.referredResourceIri;
            }
        };
        return ReadLinkValue;
    }());
    /**
     * Represents an integer value object.
     */
    var ReadIntegerValue = /** @class */ (function () {
        function ReadIntegerValue(id, propIri, integer) {
            this.id = id;
            this.propIri = propIri;
            this.integer = integer;
            this.type = KnoraConstants.IntValue;
        }
        ReadIntegerValue.prototype.getClassName = function () {
            return KnoraConstants.ReadIntegerValue;
        };
        ReadIntegerValue.prototype.getContent = function () {
            return this.integer.toString();
        };
        return ReadIntegerValue;
    }());
    /**
     * Represents a decimal value object.
     */
    var ReadDecimalValue = /** @class */ (function () {
        function ReadDecimalValue(id, propIri, decimal) {
            this.id = id;
            this.propIri = propIri;
            this.decimal = decimal;
            this.type = KnoraConstants.DecimalValue;
        }
        ReadDecimalValue.prototype.getClassName = function () {
            return KnoraConstants.ReadDecimalValue;
        };
        ReadDecimalValue.prototype.getContent = function () {
            return this.decimal.toString();
        };
        return ReadDecimalValue;
    }());
    /**
     * Represents a still image value object.
     */
    var ReadStillImageFileValue = /** @class */ (function () {
        function ReadStillImageFileValue(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
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
        ReadStillImageFileValue.prototype.makeIIIFUrl = function (reduceFactor) {
            if (this.isPreview) {
                return this.imagePath;
            }
            else {
                var percentage = Math.floor(100 / reduceFactor);
                percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
                return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
            }
        };
        ReadStillImageFileValue.prototype.getClassName = function () {
            return KnoraConstants.ReadStillImageFileValue;
        };
        ReadStillImageFileValue.prototype.getContent = function () {
            return this.imagePath;
        };
        return ReadStillImageFileValue;
    }());
    /**
     * Represents a text representation value object
     */
    var ReadTextFileValue = /** @class */ (function () {
        function ReadTextFileValue(id, propIri, textFilename, textFileURL) {
            this.id = id;
            this.propIri = propIri;
            this.textFilename = textFilename;
            this.textFileURL = textFileURL;
            this.type = KnoraConstants.TextFileValue;
        }
        ReadTextFileValue.prototype.getClassName = function () {
            return KnoraConstants.ReadTextFileValue;
        };
        ReadTextFileValue.prototype.getContent = function () {
            return this.textFileURL;
        };
        return ReadTextFileValue;
    }());
    /**
     * Represents a color value object.
     */
    var ReadColorValue = /** @class */ (function () {
        function ReadColorValue(id, propIri, colorHex) {
            this.id = id;
            this.propIri = propIri;
            this.colorHex = colorHex;
            this.type = KnoraConstants.ColorValue;
        }
        ReadColorValue.prototype.getClassName = function () {
            return KnoraConstants.ReadColorValue;
        };
        ReadColorValue.prototype.getContent = function () {
            return this.colorHex;
        };
        return ReadColorValue;
    }());
    /**
     * Represents a point in a 2D-coordinate system (for geometry values).
     */
    var Point2D = /** @class */ (function () {
        function Point2D(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point2D;
    }());
    /**
     * Represents a geometry value parsed from JSON.
     */
    var RegionGeometry = /** @class */ (function () {
        function RegionGeometry(status, lineColor, lineWidth, points, type, radius) {
            this.status = status;
            this.lineColor = lineColor;
            this.lineWidth = lineWidth;
            this.points = points;
            this.type = type;
            this.radius = radius;
        }
        return RegionGeometry;
    }());
    /**
     * Represents a geometry value object.
     */
    var ReadGeomValue = /** @class */ (function () {
        function ReadGeomValue(id, propIri, geometryString) {
            var e_1, _a;
            this.id = id;
            this.propIri = propIri;
            this.geometryString = geometryString;
            this.type = KnoraConstants.GeomValue;
            var geometryJSON = JSON.parse(geometryString);
            var points = [];
            try {
                for (var _b = __values(geometryJSON.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var point = _c.value;
                    points.push(new Point2D(point.x, point.y));
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            var radius;
            if (geometryJSON.radius) {
                radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
            }
            this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
        }
        ReadGeomValue.prototype.getClassName = function () {
            return KnoraConstants.ReadGeomValue;
        };
        ReadGeomValue.prototype.getContent = function () {
            return this.geometryString;
        };
        return ReadGeomValue;
    }());
    /**
     * Represents a URI value object.
     */
    var ReadUriValue = /** @class */ (function () {
        function ReadUriValue(id, propIri, uri) {
            this.id = id;
            this.propIri = propIri;
            this.uri = uri;
            this.type = KnoraConstants.UriValue;
        }
        ReadUriValue.prototype.getClassName = function () {
            return KnoraConstants.ReadUriValue;
        };
        ReadUriValue.prototype.getContent = function () {
            return this.uri;
        };
        return ReadUriValue;
    }());
    /**
     * Represents a Boolean value object.
     */
    var ReadBooleanValue = /** @class */ (function () {
        function ReadBooleanValue(id, propIri, bool) {
            this.id = id;
            this.propIri = propIri;
            this.bool = bool;
            this.type = KnoraConstants.BooleanValue;
        }
        ReadBooleanValue.prototype.getClassName = function () {
            return KnoraConstants.ReadBooleanValue;
        };
        ReadBooleanValue.prototype.getContent = function () {
            return this.bool.toString();
        };
        return ReadBooleanValue;
    }());
    /**
     * Represents an interval value object.
     */
    var ReadIntervalValue = /** @class */ (function () {
        function ReadIntervalValue(id, propIri, intervalStart, intervalEnd) {
            this.id = id;
            this.propIri = propIri;
            this.intervalStart = intervalStart;
            this.intervalEnd = intervalEnd;
            this.type = KnoraConstants.IntervalValue;
        }
        ReadIntervalValue.prototype.getClassName = function () {
            return KnoraConstants.ReadIntervalValue;
        };
        ReadIntervalValue.prototype.getContent = function () {
            return this.intervalStart.toString() + '-' + this.intervalEnd;
        };
        return ReadIntervalValue;
    }());
    /**
     * Represents an interval value object.
     */
    var ReadListValue = /** @class */ (function () {
        function ReadListValue(id, propIri, listNodeIri, listNodeLabel) {
            this.id = id;
            this.propIri = propIri;
            this.listNodeIri = listNodeIri;
            this.listNodeLabel = listNodeLabel;
            this.type = KnoraConstants.ListValue;
        }
        ReadListValue.prototype.getClassName = function () {
            return KnoraConstants.ReadListValue;
        };
        ReadListValue.prototype.getContent = function () {
            return this.listNodeLabel;
        };
        return ReadListValue;
    }());

    /**
     * Represents a resource and its properties.
     */
    var ReadResource = /** @class */ (function () {
        /**
         *
         * @param {string} id the resource's Iri.
         * @param {string} type the resource's type (class).
         * @param {string} label the resource's rdfs:label.
         * @param {Array<ReadResource>} incomingRegions regions pointing to this resource, if any (possibly to be queried by additional requests).
         * @param {Array<ReadResource>} incomingStillImageRepresentations still image representations pointing to this resource, if any (possibly to be queried by additional requests).
         * @param {Array<ReadResource>} incomingLinks resources pointing to this resource, if any (possibly to be queried by additional requests).
         * @param {StillImageRepresentation[]} stillImageRepresentationsToDisplay  still image representations to be displayed for this resource, if any (possibly to be queried by additional requests).
         * @param {ReadProperties} properties the resources's properties.
         */
        function ReadResource(id, type, label, incomingRegions, incomingStillImageRepresentations, incomingLinks, stillImageRepresentationsToDisplay, properties) {
            this.id = id;
            this.type = type;
            this.label = label;
            this.incomingRegions = incomingRegions;
            this.incomingStillImageRepresentations = incomingStillImageRepresentations;
            this.incomingLinks = incomingLinks;
            this.stillImageRepresentationsToDisplay = stillImageRepresentationsToDisplay;
            this.properties = properties;
        }
        return ReadResource;
    }());

    var jsonld = require('jsonld');
    var ApiService = /** @class */ (function () {
        function ApiService(http, config) {
            this.http = http;
            this.config = config;
            // if is loading, set it true;
            // it can be used in components
            // for progress loader element
            this.loading = false;
            // console.log('ApiService constructor: config', config);
        }
        /**
         * GET
         *
         * @param {string} path the URL for the GET request.
         * @param {HttpParams} params the parameters for the GET request.
         * @returns Observable of any
         */
        ApiService.prototype.httpGet = function (path, params) {
            var _this = this;
            this.loading = true;
            return this.http.get(this.config.api + path, { observe: 'response', params: params }).pipe(operators.map(function (response) {
                _this.loading = false;
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
                _this.loading = false;
                return _this.handleRequestError(error);
            }));
        };
        /**
         * Processes JSON-LD returned by Knora.
         * Expands Iris and creates an empty context object.
         *
         * @param {ApiServiceResult} resourceResponse
         */
        ApiService.prototype.processJSONLD = function (resourceResponse) {
            var resPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var resPromise = resPromises.compact(resourceResponse.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return rxjs.from(resPromise);
        };
        /**
         * POST
         *
         * @param {string} path
         * @param {any} body
         * @returns Observable of any
         */
        ApiService.prototype.httpPost = function (path, body) {
            var _this = this;
            this.loading = true;
            // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
            return this.http.post(this.config.api + path, body, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
                _this.loading = false;
                // console.error(error);
                return _this.handleRequestError(error);
            }));
        };
        /**
         * PUT
         *
         * @param {string} path
         * @param {any} body
         * @returns Observable of any
         */
        ApiService.prototype.httpPut = function (path, body) {
            var _this = this;
            this.loading = true;
            // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
            return this.http.put(this.config.api + path, body, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                // console.log(response);
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
                _this.loading = false;
                // console.error(error);
                return _this.handleRequestError(error);
            }));
        };
        /**
         * DELETE
         *
         * @param {string} path
         * @returns Observable of any
         */
        ApiService.prototype.httpDelete = function (path) {
            var _this = this;
            this.loading = true;
            // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
            return this.http.delete(this.config.api + path, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                // console.log(response);
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
                _this.loading = false;
                // console.error(error);
                return _this.handleRequestError(error);
            }));
        };
        /**
         * handle request error in case of server error
         *
         * @param {HttpErrorResponse} error
         * @returns Observable of ApiServiceError
         */
        ApiService.prototype.handleRequestError = function (error) {
            // console.error(error);
            var serviceError = new ApiServiceError();
            serviceError.status = error.status;
            serviceError.statusText = error.statusText;
            serviceError.errorInfo = error.message;
            serviceError.url = error.url;
            return throwError.throwError(serviceError);
        };
        /**
         * handle json error in case of type error in json response (json2typescript)
         *
         * @param {any} error
         * @returns Observable of ApiServiceError
         */
        ApiService.prototype.handleJsonError = function (error) {
            if (error instanceof ApiServiceError)
                return throwError.throwError(error);
            var serviceError = new ApiServiceError();
            serviceError.status = -1;
            serviceError.statusText = 'Invalid JSON';
            serviceError.errorInfo = error;
            serviceError.url = '';
            return throwError.throwError(serviceError);
        };
        ApiService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */
        ApiService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [KuiCoreConfigToken,] }] }
            ];
        };
        ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: ApiService, providedIn: "root" });
        return ApiService;
    }());

    /**
     * Requests ontology information from Knora.
     */
    var OntologyService = /** @class */ (function (_super) {
        __extends(OntologyService, _super);
        function OntologyService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // ------------------------------------------------------------------------
        // GET list of ontologies
        // ------------------------------------------------------------------------
        /**
         * DEPRECATED: You should use getAllOntologies()
         * Requests the metadata about all existing ontologies from Knora's ontologies route.
         *
         * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
         */
        OntologyService.prototype.getOntologiesMetadata = function () {
            return this.httpGet('/v2/ontologies/metadata');
        };
        /**
         * Requests the metadata about all existing ontologies from Knora's ontologies route.
         *
         * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
         */
        OntologyService.prototype.getAllOntologies = function () {
            return this.httpGet('/v2/ontologies/metadata');
        };
        /**
         * Requests the ontologies of a specific project
         *
         * @param projectIri
         * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
         */
        OntologyService.prototype.getProjectOntologies = function (projectIri) {
            return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
        };
        // ------------------------------------------------------------------------
        // GET ontology
        // ------------------------------------------------------------------------
        /**
         * Requests all entity definitions for the given ontologies from Knora's ontologies route.
         *
         * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
         * @returns Observable<ApiServiceResult> - the requested ontology.
         */
        OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
            return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
        };
        /**
         * Requests information about the given resource classes from Knora's ontologies route.
         *
         * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
         * @returns Observable<ApiServiceResult> - the requested resource class definitions.
         */
        OntologyService.prototype.getResourceClasses = function (resourceClassIris) {
            if (resourceClassIris.length === 0) {
                // no resource class Iris are given to query for, return a failed Observer
                return rxjs.Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
            }
            var resClassUriEnc = '';
            resourceClassIris.forEach(function (resClassIri) {
                resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
            });
            return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
        };
        /**
         * Requests properties from Knora's ontologies route.
         *
         * @param {string[]} propertyIris the Iris of the properties to be queried.
         * @returns Observable<ApiServiceResult> - the requested properties.
         */
        OntologyService.prototype.getProperties = function (propertyIris) {
            if (propertyIris.length === 0) {
                // no resource class Iris are given to query for, return a failed Observer
                return rxjs.Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
            }
            var propertiesUriEnc = '';
            propertyIris.forEach(function (resClassIri) {
                propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
            });
            return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
        };
        // ------------------------------------------------------------------------
        // POST
        // ------------------------------------------------------------------------
        /**
         * Create new ontology.
         *
         * @param {NewOntology} data Data contains: projectIri, name, label
         * @returns Observable<ApiServiceResult>
         */
        OntologyService.prototype.createOntology = function (data) {
            var path = '/v2/ontologies';
            var ontology = {
                'knora-api:ontologyName': data.name,
                'knora-api:attachedToProject': {
                    '@id': data.projectIri,
                },
                'rdfs:label': data.label,
                '@context': {
                    'rdfs': KnoraConstants.RdfsSchema,
                    'knora-api': KnoraConstants.KnoraApiV2WithValueObjectPath
                }
            };
            return this.httpPost(path, ontology).pipe(operators.map(function (result) { return result.body; }), operators.catchError(this.handleJsonError));
        };
        OntologyService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: OntologyService, providedIn: "root" });
        return OntologyService;
    }(ApiService));

    var jsonld$1 = require('jsonld');
    /**
     * Represents an error occurred in OntologyCacheService.
     */
    var OntologyCacheError = /** @class */ (function (_super) {
        __extends(OntologyCacheError, _super);
        function OntologyCacheError(message) {
            var _this = _super.call(this, message) || this;
            _this.message = message;
            return _this;
        }
        return OntologyCacheError;
    }(Error));
    /**
     * Represents an ontology's metadata.
     */
    var OntologyMetadata = /** @class */ (function () {
        /**
         * @hideconstructor
         *
         * @param {string} id Iri identifying the ontology.
         * @param {string} label a label describing the ontology.
         */
        function OntologyMetadata(id, label) {
            this.id = id;
            this.label = label;
        }
        return OntologyMetadata;
    }());
    (function (CardinalityOccurrence) {
        CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
        CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
        CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
    })(exports.CardinalityOccurrence || (exports.CardinalityOccurrence = {}));
    /**
     * Cardinality of a property for the given resource class.
     */
    var Cardinality = /** @class */ (function () {
        /**
         * @param {CardinalityOccurrence} occurrence type of given occurrence.
         * @param {number} value numerical value of given occurrence.
         * @param {string} property the property the given occurrence applies to.
         */
        function Cardinality(occurrence, value, property) {
            this.occurrence = occurrence;
            this.value = value;
            this.property = property;
        }
        return Cardinality;
    }());
    /**
     * A resource class definition.
     */
    var ResourceClass = /** @class */ (function () {
        /**
         * @param {string} id Iri identifying the resource class.
         * @param {string} icon path to an icon representing the resource class.
         * @param {string} comment comment on the resource class.
         * @param {string} label label describing the resource class.
         * @param {Cardinality[]} cardinalities the resource class's properties.
         */
        function ResourceClass(id, icon, comment, label, cardinalities) {
            this.id = id;
            this.icon = icon;
            this.comment = comment;
            this.label = label;
            this.cardinalities = cardinalities;
        }
        return ResourceClass;
    }());
    /**
     * A map of resource class Iris to resource class definitions.
     */
    var ResourceClasses = /** @class */ (function () {
        function ResourceClasses() {
        }
        return ResourceClasses;
    }());
    /**
     * A property definition.
     */
    var Property = /** @class */ (function () {
        /**
         * @param {string} id Iri identifying the property definition.
         * @param {string} objectType the property's object constraint.
         * @param {string} comment comment on the property definition.
         * @param {string} label label describing the property definition.
         * @param {string[]} subPropertyOf Iris of properties the given property is a subproperty of.
         * @param {boolean} isEditable indicates whether the given property can be edited by the client.
         * @param {boolean} isLinkProperty indicates whether the given property is a linking property.
         * @param {boolean} isLinkValueProperty indicates whether the given property refers to a link value.
         */
        function Property(id, objectType, comment, label, subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty) {
            this.id = id;
            this.objectType = objectType;
            this.comment = comment;
            this.label = label;
            this.subPropertyOf = subPropertyOf;
            this.isEditable = isEditable;
            this.isLinkProperty = isLinkProperty;
            this.isLinkValueProperty = isLinkValueProperty;
        }
        return Property;
    }());
    /**
     * A map of property Iris to property definitions.
     */
    var Properties = /** @class */ (function () {
        function Properties() {
        }
        return Properties;
    }());
    /**
     * Groups resource classes by the ontology they are defined in.
     *
     * A map of ontology Iris to an array of resource class Iris.
     */
    var ResourceClassIrisForOntology = /** @class */ (function () {
        function ResourceClassIrisForOntology() {
        }
        return ResourceClassIrisForOntology;
    }());
    /**
     * Represents cached ontology information (only used by this service internally).
     * This cache is updated whenever new definitions are requested from Knora.
     *
     * Requested ontology information by a service is represented by [[OntologyInformation]].
     */
    var OntologyCache = /** @class */ (function () {
        function OntologyCache() {
            this.ontologies = [];
            this.resourceClassIrisForOntology = new ResourceClassIrisForOntology();
            this.resourceClasses = new ResourceClasses();
            this.properties = new Properties();
        }
        return OntologyCache;
    }());
    /**
     * Represents ontology information requested from this service.
     *
     * For every request, an instance of this class is returned containing the requested information.
     */
    var OntologyInformation = /** @class */ (function () {
        /**
         * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
         * @param {ResourceClasses} resourceClasses resource class definitions.
         * @param {Properties} properties property definitions.
         */
        function OntologyInformation(resourceClassesForOntology, resourceClasses, properties) {
            this.resourceClassesForOntology = resourceClassesForOntology;
            this.resourceClasses = resourceClasses;
            this.properties = properties;
        }
        /**
         * Sorts an array of `ResourceClass` or `Property` by label.
         *
         * @param a first element
         * @param b second element
         * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
         */
        OntologyInformation.sortFunc = function (a, b) {
            // dealing with 'undefined' labels
            if (a.label === undefined) {
                return 1;
            }
            else if (b.label === undefined) {
                return -1;
            }
            var labelA = a.label.toLowerCase();
            var labelB = b.label.toLowerCase();
            if (labelA < labelB) {
                return -1;
            }
            else if (labelA > labelB) {
                return 1;
            }
            else {
                return 0;
            }
        };
        /**
         * Merge the given [[OntologyInformation]] into the current instance,
         * updating the existing information.
         * This is necessary when a service like the search fetches new results
         * that have to be added to an existing collection.
         * The existing ontology information must not be lost.
         *
         * @param {OntologyInformation} ontologyInfo the given definitions that have to be integrated.
         * @returns void
         */
        OntologyInformation.prototype.updateOntologyInformation = function (ontologyInfo) {
            // get new resourceClassIrisForOntology
            var newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();
            // update new resourceClassIrisForOntology
            // tslint:disable-next-line:forin
            for (var newResClassForOntology in newResourceClassesForOntology) {
                this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology];
            }
            // get new resource class definitions
            var newResourceClasses = ontologyInfo.getResourceClasses();
            // update resourceClasses
            // tslint:disable-next-line:forin
            for (var newResClass in newResourceClasses) {
                this.resourceClasses[newResClass] = newResourceClasses[newResClass];
            }
            // get new property definitions
            var newProperties = ontologyInfo.getProperties();
            // update properties
            // tslint:disable-next-line:forin
            for (var newProp in newProperties) {
                this.properties[newProp] = newProperties[newProp];
            }
        };
        /**
         * Returns resource class definitions for ontologies.
         *
         * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
         */
        OntologyInformation.prototype.getResourceClassForOntology = function () {
            return this.resourceClassesForOntology;
        };
        /**
         * Returns all resource classes as an object.
         *
         * @returns ResourceClasses - all resource class definitions as an object.
         */
        OntologyInformation.prototype.getResourceClasses = function () {
            return this.resourceClasses;
        };
        /**
         * Returns all resource classes as an array.
         *
         * @param {boolean} sortAsc sort resource classes by label in ascending order by default
         * @returns ResourceClass[]
         */
        OntologyInformation.prototype.getResourceClassesAsArray = function (sortAsc) {
            if (sortAsc === void 0) {
                sortAsc = true;
            }
            var resClasses = [];
            // tslint:disable-next-line:forin
            for (var resClassIri in this.resourceClasses) {
                var resClass = this.resourceClasses[resClassIri];
                resClasses.push(resClass);
            }
            // resourceClasses order by label in ascending order
            resClasses.sort(OntologyInformation.sortFunc);
            // resourceClasses order by label in descending order
            if (!sortAsc) {
                resClasses.reverse();
            }
            return resClasses;
        };
        /**
         * Returns a resource class's label.
         *
         * @param {string} resClass resource class to query for.
         * @returns string - the resource class's label.
         */
        OntologyInformation.prototype.getLabelForResourceClass = function (resClass) {
            if (resClass !== undefined) {
                var resClassDef = this.resourceClasses[resClass];
                if (resClassDef !== undefined && resClassDef.label !== undefined) {
                    return resClassDef.label;
                }
                else {
                    console.log("cannot get label for " + resClass);
                }
            }
            else {
                console.log('call of OntologyInformation.getLabelForResourceClass without argument resClass');
            }
        };
        /**
         * Returns all properties as an object.
         *
         * @returns Properties - all properties as an object.
         */
        OntologyInformation.prototype.getProperties = function () {
            return this.properties;
        };
        /**
         * Returns all properties as an array.
         *
         * @param {boolean} sortAsc sort properties by label in ascending order by default
         * @returns Property[] - all properties as an array.
         */
        OntologyInformation.prototype.getPropertiesAsArray = function (sortAsc) {
            if (sortAsc === void 0) {
                sortAsc = true;
            }
            var properties = [];
            // tslint:disable-next-line:forin
            for (var propIri in this.properties) {
                var prop = this.properties[propIri];
                properties.push(prop);
            }
            // properties order by label in ascending order
            properties.sort(OntologyInformation.sortFunc);
            // properties order by label in descending order
            if (!sortAsc) {
                properties.reverse();
            }
            return properties;
        };
        /**
         * Returns a property's label.
         *
         * @param {string} property to query for.
         * @returns string - the property's label.
         */
        OntologyInformation.prototype.getLabelForProperty = function (property) {
            if (property !== undefined) {
                var propDef = this.properties[property];
                if (propDef !== undefined && propDef.label !== undefined) {
                    return propDef.label;
                }
                else {
                    console.log("cannot get label for " + property);
                }
            }
            else {
                console.log('call of OntologyInformation.getLabelForProperty without argument property');
            }
        };
        return OntologyInformation;
    }());
    /**
     * Requests ontology information from Knora and caches it.
     * Other components or services obtain ontology information through this service.
     */
    var OntologyCacheService = /** @class */ (function () {
        function OntologyCacheService(_ontologyService) {
            this._ontologyService = _ontologyService;
            /**
             * Ontologies ingored by this service.
             * @param {string[]} excludedOntologies
             */
            this.excludedOntologies = [KnoraConstants.SalsahGuiOntology, KnoraConstants.StandoffOntology];
            /**
             * @param {string[]} excludedProperties properties that Knora is not responsible for and that have to be ignored because they cannot be resolved at the moment.
             */
            this.excludedProperties = [KnoraConstants.RdfsLabel];
            /**
             * @param {string[]} nonResourceClasses class definitions that are not be treated as Knora resource classes
             */
            this.nonResourceClasses = [KnoraConstants.ForbiddenResource, KnoraConstants.XMLToStandoffMapping, KnoraConstants.ListNode];
            /**
             * @param {OntologyCache} cacheOntology central instance that caches all definitions
             */
            this.cacheOntology = new OntologyCache();
        }
        /**
         * Requests the metadata of all ontologies from Knora.
         *
         * @returns Observable<object> - metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
         */
        OntologyCacheService.prototype.getOntologiesMetadataFromKnora = function () {
            return this._ontologyService.getOntologiesMetadata().pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld$1.promises;
                // compact JSON-LD using an empty context: expands all Iris
                var ontPromise = ontPromises.compact(ontRes.body, {});
                // convert promise to Observable and return it
                // https://www.learnrxjs.io/operators/creation/frompromise.html
                return rxjs.from(ontPromise);
            }));
        };
        /**
         * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
         *
         * @param {string} ontologyIri the Iri of the requested ontology.
         * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
         */
        OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
            return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld$1.promises;
                // compact JSON-LD using an empty context: expands all Iris
                var ontPromise = ontPromises.compact(ontRes.body, {});
                // convert promise to Observable and return it
                // https://www.learnrxjs.io/operators/creation/frompromise.html
                return rxjs.from(ontPromise);
            }));
        };
        /**
         * Writes all the ontologies' metadata returned by Knora to the cache.
         *
         * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
         * @returns a new OntologyMetadata object
         */
        OntologyCacheService.prototype.convertAndWriteOntologiesMetadataToCache = function (ontologies) {
            this.cacheOntology.ontologies = ontologies.map(function (ontology) {
                return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
            });
        };
        /**
         * Returns all ontologies' metadata from the cache and returns them.
         *
         * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
         */
        OntologyCacheService.prototype.getAllOntologiesMetadataFromCache = function () {
            return this.cacheOntology.ontologies;
        };
        /**
         * Returns resource class Iris from the ontology response.
         * `knora-api:Resource` will be excluded.
         *
         * @param {Array<object>} classDefinitions the class definitions in an ontology response.
         * @returns string[] - resource class Iris from the given class definitions.
         */
        OntologyCacheService.prototype.getResourceClassIrisFromOntologyResponse = function (classDefinitions) {
            var e_1, _a;
            var resourceClassIris = [];
            try {
                for (var classDefinitions_1 = __values(classDefinitions), classDefinitions_1_1 = classDefinitions_1.next(); !classDefinitions_1_1.done; classDefinitions_1_1 = classDefinitions_1.next()) {
                    var classDef = classDefinitions_1_1.value;
                    var classIri = classDef['@id'];
                    // check that class name is not listed as a non resource class and that the isResourceClass flag is present and set to true
                    if (classIri !== KnoraConstants.Resource && this.nonResourceClasses.indexOf(classIri)
                        === -1 && (classDef[KnoraConstants.IsResourceClass] !== undefined && classDef[KnoraConstants.IsResourceClass] === true)) {
                        // it is not a value class, but a resource class definition
                        resourceClassIris.push(classIri);
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (classDefinitions_1_1 && !classDefinitions_1_1.done && (_a = classDefinitions_1.return))
                        _a.call(classDefinitions_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return resourceClassIris;
        };
        /**
         * Converts a Knora response for all entity definitions for the requested ontology
         * into an internal representation and caches it.
         *
         * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
         * If they are defined in another ontology, that ontology is requested from Knora too.
         *
         * @param {Object} ontology the ontology to be cached.
         * @returns void
         */
        OntologyCacheService.prototype.convertAndWriteAllEntityDefinitionsForOntologyToCache = function (ontology) {
            var graph = ontology['@graph'];
            // get all class definitions
            var classDefs = graph.filter(function (entity) {
                var entityType = entity['@type'];
                return entityType === KnoraConstants.OwlClass;
            });
            // get all property definitions
            var propertyDefs = graph.filter(function (entity) {
                var entityType = entity['@type'];
                return entityType === KnoraConstants.OwlObjectProperty ||
                    entityType === KnoraConstants.OwlDatatypeProperty ||
                    entityType === KnoraConstants.OwlAnnotationProperty ||
                    entityType === KnoraConstants.RdfProperty;
            });
            // cache all resource class Iris belonging to the current ontology
            this.cacheOntology.resourceClassIrisForOntology[ontology['@id']] = this.getResourceClassIrisFromOntologyResponse(classDefs);
            // write class and property defintions to cache
            this.convertAndWriteEntityDefinitionsToCache(classDefs, propertyDefs);
        };
        /**
         * Returns definitions for the requested ontologies from the cache.
         *
         * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
         * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
         */
        OntologyCacheService.prototype.getOntologyInformationFromCache = function (ontologyIris) {
            var e_2, _a;
            var resourceClassesForOntology = new ResourceClassIrisForOntology();
            // collect resource class Iris for all requested named graphs
            var allResourceClassIris = [];
            try {
                for (var ontologyIris_1 = __values(ontologyIris), ontologyIris_1_1 = ontologyIris_1.next(); !ontologyIris_1_1.done; ontologyIris_1_1 = ontologyIris_1.next()) {
                    var ontologyIri = ontologyIris_1_1.value;
                    if (this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined) {
                        throw new OntologyCacheError("getResourceClassesForOntologiesFromCache: ontology not found in cache: " + ontologyIri);
                    }
                    // add information for the given ontology
                    resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassIrisForOntology[ontologyIri];
                    // add all resource class Iris of this ontology
                    allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassIrisForOntology[ontologyIri]);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (ontologyIris_1_1 && !ontologyIris_1_1.done && (_a = ontologyIris_1.return))
                        _a.call(ontologyIris_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            // get resource class definitions for all requested ontologies
            return this.getResourceClassDefinitions(allResourceClassIris).pipe(operators.map(function (resClassDefs) {
                return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties());
            }));
        };
        /**
         * Converts a Knora ontology response into an internal representation and caches it.
         *
         * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
         * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
         * @returns void
         */
        OntologyCacheService.prototype.convertAndWriteEntityDefinitionsToCache = function (resourceClassDefinitions, propertyClassDefinitions) {
            var e_3, _a, e_4, _b;
            try {
                // convert and cache each given resource class definition
                for (var resourceClassDefinitions_1 = __values(resourceClassDefinitions), resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next(); !resourceClassDefinitions_1_1.done; resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next()) {
                    var resClass = resourceClassDefinitions_1_1.value;
                    var resClassIri = resClass['@id'];
                    // represents all cardinalities of this resource class
                    var cardinalities = [];
                    if (resClass[KnoraConstants.RdfsSubclassOf] !== undefined) {
                        var subclassOfCollection = void 0;
                        // check if it is a single object or a collection
                        if (!Array.isArray(resClass[KnoraConstants.RdfsSubclassOf])) {
                            subclassOfCollection = [resClass[KnoraConstants.RdfsSubclassOf]];
                        }
                        else {
                            subclassOfCollection = resClass[KnoraConstants.RdfsSubclassOf];
                        }
                        try {
                            // get cardinalities for the properties of a resource class
                            for (var subclassOfCollection_1 = __values(subclassOfCollection), subclassOfCollection_1_1 = subclassOfCollection_1.next(); !subclassOfCollection_1_1.done; subclassOfCollection_1_1 = subclassOfCollection_1.next()) {
                                var curCard = subclassOfCollection_1_1.value;
                                // make sure it is a cardinality (it could also be an Iri of a superclass)
                                if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] === KnoraConstants.OwlRestriction) {
                                    var newCard = void 0;
                                    // get occurrence
                                    if (curCard[KnoraConstants.OwlMinCardinality] !== undefined) {
                                        newCard = new Cardinality(exports.CardinalityOccurrence.minCard, curCard[KnoraConstants.OwlMinCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    }
                                    else if (curCard[KnoraConstants.OwlCardinality] !== undefined) {
                                        newCard = new Cardinality(exports.CardinalityOccurrence.card, curCard[KnoraConstants.OwlCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    }
                                    else if (curCard[KnoraConstants.OwlMaxCardinality] !== undefined) {
                                        newCard = new Cardinality(exports.CardinalityOccurrence.maxCard, curCard[KnoraConstants.OwlMaxCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    }
                                    else {
                                        // no known occurrence found
                                        throw new TypeError("cardinality type invalid for " + resClass['@id'] + " " + curCard[KnoraConstants.OwlOnProperty]);
                                    }
                                    // TODO: get gui order
                                    // add cardinality
                                    cardinalities.push(newCard);
                                }
                            }
                        }
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_b = subclassOfCollection_1.return))
                                    _b.call(subclassOfCollection_1);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
                        }
                    }
                    var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                    // write this resource class definition to the cache object
                    this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_a = resourceClassDefinitions_1.return))
                        _a.call(resourceClassDefinitions_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            // cache the property definitions
            this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
        };
        /**
         * Gets information about resource classes from the cache.
         * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
         *
         * @param {string[]} resClassIris the given resource class Iris
         * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
         */
        OntologyCacheService.prototype.getResourceClassDefinitionsFromCache = function (resClassIris) {
            // collect the definitions for each resource class from the cache
            var _this = this;
            var resClassDefs = new ResourceClasses();
            // collect the properties from the cardinalities of the given resource classes
            var propertyIris = [];
            resClassIris.forEach(function (resClassIri) {
                resClassDefs[resClassIri] = _this.cacheOntology.resourceClasses[resClassIri];
                _this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(function (card) {
                    // get property definition for each cardinality
                    propertyIris.push(card.property);
                });
            });
            return this.getPropertyDefinitions(propertyIris).pipe(operators.map(function (propDefs) {
                return new OntologyInformation(new ResourceClassIrisForOntology(), resClassDefs, propDefs.getProperties());
            }));
        };
        /**
         * Converts a Knora response for ontology information about properties
         * into an internal representation and cache it.
         *
         * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
         * @returns void
         */
        OntologyCacheService.prototype.convertAndWriteKnoraPropertyDefinitionsToOntologyCache = function (propertyDefinitionsFromKnora) {
            var e_5, _a;
            try {
                // convert and cache each given property definition
                for (var propertyDefinitionsFromKnora_1 = __values(propertyDefinitionsFromKnora), propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next(); !propertyDefinitionsFromKnora_1_1.done; propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next()) {
                    var propDef = propertyDefinitionsFromKnora_1_1.value;
                    var propIri = propDef['@id'];
                    var isEditable = false;
                    if (propDef[KnoraConstants.isEditable] !== undefined && propDef[KnoraConstants.isEditable] === true) {
                        isEditable = true;
                    }
                    var isLinkProperty = false;
                    if (propDef[KnoraConstants.isLinkProperty] !== undefined && propDef[KnoraConstants.isLinkProperty] === true) {
                        isLinkProperty = true;
                    }
                    var isLinkValueProperty = false;
                    if (propDef[KnoraConstants.isLinkValueProperty] !== undefined && propDef[KnoraConstants.isLinkValueProperty] === true) {
                        isLinkValueProperty = true;
                    }
                    var subPropertyOf = [];
                    if (propDef[KnoraConstants.subPropertyOf] !== undefined && Array.isArray(propDef[KnoraConstants.subPropertyOf])) {
                        subPropertyOf = propDef[KnoraConstants.subPropertyOf].map(function (superProp) { return superProp['@id']; });
                    }
                    else if (propDef[KnoraConstants.subPropertyOf] !== undefined) {
                        subPropertyOf.push(propDef[KnoraConstants.subPropertyOf]['@id']);
                    }
                    var objectType = void 0;
                    if (propDef[KnoraConstants.ObjectType] !== undefined) {
                        objectType = propDef[KnoraConstants.ObjectType]['@id'];
                    }
                    // cache property definition
                    this.cacheOntology.properties[propIri] = new Property(propIri, objectType, propDef[KnoraConstants.RdfsComment], propDef[KnoraConstants.RdfsLabel], subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty);
                }
            }
            catch (e_5_1) {
                e_5 = { error: e_5_1 };
            }
            finally {
                try {
                    if (propertyDefinitionsFromKnora_1_1 && !propertyDefinitionsFromKnora_1_1.done && (_a = propertyDefinitionsFromKnora_1.return))
                        _a.call(propertyDefinitionsFromKnora_1);
                }
                finally {
                    if (e_5)
                        throw e_5.error;
                }
            }
        };
        /**
         * Returns property definitions from the cache.
         *
         * @param {string[]} propertyIris the property definitions to be returned.
         * @returns OntologyInformation - requested property defintions.
         */
        OntologyCacheService.prototype.getPropertyDefinitionsFromCache = function (propertyIris) {
            var _this = this;
            var propertyDefs = new Properties();
            propertyIris.forEach(function (propIri) {
                // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
                if (_this.excludedProperties.indexOf(propIri) > -1) {
                    return;
                }
                if (_this.cacheOntology.properties[propIri] === undefined) {
                    throw new OntologyCacheError("getPropertyDefinitionsFromCache: property not found in cache: " + propIri);
                }
                propertyDefs[propIri] = _this.cacheOntology.properties[propIri];
            });
            return new OntologyInformation(new ResourceClassIrisForOntology(), new ResourceClasses(), propertyDefs);
        };
        /**
         * Returns metadata about all ontologies.
         *
         * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
         */
        OntologyCacheService.prototype.getOntologiesMetadata = function () {
            var _this = this;
            if (this.cacheOntology.ontologies.length === 0) {
                // nothing in cache yet, get metadata from Knora
                return this.getOntologiesMetadataFromKnora().pipe(operators.map(function (metadata) {
                    _this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter(function (onto) {
                        // ignore excluded ontologies
                        return _this.excludedOntologies.indexOf(onto['@id']) === -1;
                    }));
                    return _this.getAllOntologiesMetadataFromCache();
                }));
            }
            else {
                // return metadata from cache
                return rxjs.of(this.getAllOntologiesMetadataFromCache());
            }
        };
        /**
         * Requests the requested ontologies from Knora, adding them to the cache.
         *
         * @param {string[]} ontologyIris Iris of the ontologies to be requested.
         * @returns Observable<any[]>
         */
        OntologyCacheService.prototype.getAndCacheOntologies = function (ontologyIris) {
            var _this = this;
            // array to be populated with Observables
            var observables = [];
            // do a request for each ontology
            ontologyIris.forEach(function (ontologyIri) {
                // push an Observable onto `observables`
                observables.push(_this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(operators.map(function (ontology) {
                    // write response to cache
                    _this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
                })));
            });
            // forkJoin returns an Observable of an array of results
            // returned by each Observable contained in `observables`
            // a subscription to the Observable returned by forkJoin is executed
            // once all Observables have been completed
            return rxjs.forkJoin(observables);
        };
        /**
         * Returns the entity definitions for the requested ontologies.
         *
         * @param {string[]} ontologyIris Iris of the ontologies to be queried.
         * @returns Observable<OntologyInformation> - all ontology metadata from the cache
         */
        OntologyCacheService.prototype.getEntityDefinitionsForOntologies = function (ontologyIris) {
            var _this = this;
            var ontologyIrisToQuery = ontologyIris.filter(function (ontologyIri) {
                // return the ontology Iris that are not cached yet
                return _this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined;
            });
            // get ontologies that are mot cached yet
            if (ontologyIrisToQuery.length > 0) {
                return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(operators.mergeMap(function (results) {
                    // executed once all ontologies have been cached
                    return _this.getOntologyInformationFromCache(ontologyIris);
                }));
            }
            else {
                return this.getOntologyInformationFromCache(ontologyIris);
            }
        };
        /**
         * Returns the definitions for the given resource class Iris.
         * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
         *
         * Properties contained in the cardinalities will be returned too.
         *
         * @param {string[]} resourceClassIris the given resource class Iris
         * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
         */
        OntologyCacheService.prototype.getResourceClassDefinitions = function (resourceClassIris) {
            var _this = this;
            var resClassIrisToQueryFor = resourceClassIris.filter(function (resClassIri) {
                // return the resource class Iris that are not cached yet
                return _this.cacheOntology.resourceClasses[resClassIri] === undefined;
            });
            if (resClassIrisToQueryFor.length > 0) {
                // get a set of ontology Iris that have to be queried to obtain the missing resource classes
                var ontologyIris = resClassIrisToQueryFor.map(function (resClassIri) {
                    return Utils.getOntologyIriFromEntityIri(resClassIri);
                }).filter(Utils.filterOutDuplicates);
                // obtain missing resource class information
                return this.getAndCacheOntologies(ontologyIris).pipe(operators.mergeMap(function (results) {
                    return _this.getResourceClassDefinitionsFromCache(resourceClassIris);
                }));
            }
            else {
                return this.getResourceClassDefinitionsFromCache(resourceClassIris);
            }
        };
        /**
         * Get definitions for the given property Iris.
         * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
         *
         * @param {string[]} propertyIris the Iris of the properties to be returned .
         * @returns Observable<OntologyInformation> - the requested property definitions.
         */
        OntologyCacheService.prototype.getPropertyDefinitions = function (propertyIris) {
            var _this = this;
            var propertiesToQuery = propertyIris.filter(function (propIri) {
                // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
                if (_this.excludedProperties.indexOf(propIri) > -1) {
                    return false;
                }
                // return the property Iris that are not cached yet
                return _this.cacheOntology.properties[propIri] === undefined;
            });
            if (propertiesToQuery.length > 0) {
                // get a set of ontology Iris that have to be queried to obtain the missing properties
                var ontologyIris = propertiesToQuery.map(function (propIri) {
                    return Utils.getOntologyIriFromEntityIri(propIri);
                }).filter(Utils.filterOutDuplicates);
                // obtain missing resource class information
                return this.getAndCacheOntologies(ontologyIris).pipe(operators.map(function (results) {
                    if (results) {
                        return _this.getPropertyDefinitionsFromCache(propertyIris);
                    }
                    else {
                        throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                    }
                }));
            }
            else {
                return rxjs.of(this.getPropertyDefinitionsFromCache(propertyIris));
            }
        };
        OntologyCacheService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        OntologyCacheService.ctorParameters = function () {
            return [
                { type: OntologyService }
            ];
        };
        OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
        return OntologyCacheService;
    }());

    /**
     * Represents a sequence of resources.
     */
    var ReadResourcesSequence = /** @class */ (function () {
        /**
         *
         * @param {Array<ReadResource>} resources given sequence of resources.
         * @param {number} numberOfResources number of given resources.
         */
        function ReadResourcesSequence(resources, numberOfResources) {
            this.resources = resources;
            this.numberOfResources = numberOfResources;
            /**
             * Information about the entities used in the given collection of `ReadResource`.
             */
            this.ontologyInformation = new OntologyInformation({}, {}, {});
        }
        return ReadResourcesSequence;
    }());

    /**
     * Represents the result of a count query.
     */
    var CountQueryResult = /** @class */ (function () {
        /**
         *
         * @param numberOfResults total number of results for a query.
         */
        function CountQueryResult(numberOfResults) {
            this.numberOfResults = numberOfResults;
        }
        return CountQueryResult;
    }());

    /**
     * Represents an image including its regions.
     */
    var StillImageRepresentation = /** @class */ (function () {
        /**
         *
         * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
         * @param {ImageRegion[]} regions the regions belonging to the image.
         */
        function StillImageRepresentation(stillImageFileValue, regions) {
            this.stillImageFileValue = stillImageFileValue;
            this.regions = regions;
        }
        return StillImageRepresentation;
    }());

    /**
     * Represents a region.
     * Contains a reference to the resource representing the region and its geometries.
     */
    var ImageRegion = /** @class */ (function () {
        /**
         *
         * @param {ReadResource} regionResource a resource of type Region
         */
        function ImageRegion(regionResource) {
            this.regionResource = regionResource;
        }
        /**
         * Get all geometry information belonging to this region.
         *
         * @returns {ReadGeomValue[]}
         */
        ImageRegion.prototype.getGeometries = function () {
            return this.regionResource.properties[KnoraConstants.hasGeometry];
        };
        return ImageRegion;
    }());

    /**
     * Request information about group from Knora.
     */
    var GroupsService = /** @class */ (function (_super) {
        __extends(GroupsService, _super);
        function GroupsService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.path = '/admin/groups';
            return _this;
        }
        /**
         * Return a list of all groups.
         *
         * @returns Observable<Group[]>
         */
        GroupsService.prototype.getAllGroups = function () {
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(GroupsResponse).groups; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a group object (filter by IRI).
         *
         * @param {string} iri
         * @returns Observable<Group>
         */
        GroupsService.prototype.getGroupByIri = function (iri) {
            this.path += '/' + encodeURIComponent(iri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(GroupResponse).group; }), operators.catchError(this.handleJsonError));
        };
        GroupsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        GroupsService.ngInjectableDef = i0.defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: GroupsService, providedIn: "root" });
        return GroupsService;
    }(ApiService));

    /**
     * Request information about lists from Knora.
     */
    var ListsService = /** @class */ (function (_super) {
        __extends(ListsService, _super);
        function ListsService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.path = '/admin/lists';
            return _this;
        }
        // ------------------------------------------------------------------------
        // GET
        // ------------------------------------------------------------------------
        /**
         * Returns a list of all lists.
         *
         * @param {string} [projectIri]
         * @returns Observable<ListNodeInfo[]>
         */
        ListsService.prototype.getLists = function (projectIri) {
            if (projectIri) {
                this.path += '?projectIri=' + encodeURIComponent(projectIri);
            }
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListsResponse).lists; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list object.
         *
         * @param {string} listIri
         * @returns Observable<List>
         */
        ListsService.prototype.getList = function (listIri) {
            return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list info object.
         *
         * @param {string} listIri
         * @returns Observable<ListInfo>
         */
        ListsService.prototype.getListInfo = function (listIri) {
            this.path += '/infos/' + encodeURIComponent(listIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list node info object.
         *
         * @param {string} nodeIri
         * @returns Observable<ListNodeInfo>
         */
        ListsService.prototype.getListNodeInfo = function (nodeIri) {
            this.path += '/nodes/' + encodeURIComponent(nodeIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // POST
        // ------------------------------------------------------------------------
        /**
         * Create new list.
         *
         * @param {ListCreatePayload} payload
         * @returns Observable<List>
         */
        ListsService.prototype.createList = function (payload) {
            return this.httpPost(this.path, payload).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // PUT
        // ------------------------------------------------------------------------
        /**
         * Edit list data.
         *
         * @param {ListInfoUpdatePayload} payload
         * @returns Observable<ListInfo>
         */
        ListsService.prototype.updateListInfo = function (payload) {
            this.path += '/infos/' + encodeURIComponent(payload.listIri);
            return this.httpPut(this.path, payload).pipe(operators.map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), operators.catchError(this.handleJsonError));
        };
        ListsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ListsService.ngInjectableDef = i0.defineInjectable({ factory: function ListsService_Factory() { return new ListsService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: ListsService, providedIn: "root" });
        return ListsService;
    }(ApiService));

    /**
     * Request information about projects from Knora.
     */
    var ProjectsService = /** @class */ (function (_super) {
        __extends(ProjectsService, _super);
        function ProjectsService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // ------------------------------------------------------------------------
        // GET
        // ------------------------------------------------------------------------
        /**
         * Returns a list of all projects.
         *
         * @returns Observable<Project[]>
         */
        ProjectsService.prototype.getAllProjects = function () {
            return this.httpGet('/admin/projects').pipe(operators.map(function (result) { return result.getBody(ProjectsResponse).projects; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Returns a project object.
         *
         * @param {string} iri identifier of the project
         * @returns Observable<Project>
         */
        ProjectsService.prototype.getProjectByIri = function (iri) {
            var url = '/admin/projects/iri/' + encodeURIComponent(iri);
            return this.getProject(url);
        };
        /**
         * Returns a project object.
         *
         * @param {string} shortname short name that is used to identify the project
         * @returns Observable<Project>
         */
        ProjectsService.prototype.getProjectByShortname = function (shortname) {
            var url = '/admin/projects/shortname/' + shortname;
            return this.getProject(url);
        };
        /**
         * Returns a project object.
         *
         * @param {string} shortcode hexadecimal code that uniquely identifies the project
         * @returns Observable<Project>
         */
        ProjectsService.prototype.getProjectByShortcode = function (shortcode) {
            var url = '/admin/projects/shortcode/' + shortcode;
            return this.getProject(url);
        };
        /**
         * @private
         * Helper method combining project retrieval.
         *
         * @param {string} url
         * @returns Observable<Project>
         */
        ProjectsService.prototype.getProject = function (url) {
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Returns all project members.
         * Project identifier is project id (iri).
         *
         * @param {string} iri identifier of the project
         * @returns Observable<User[]>
         */
        ProjectsService.prototype.getProjectMembersByIri = function (iri) {
            var url = '/admin/projects/iri/' + encodeURIComponent(iri) + '/members';
            return this.getProjectMembers(url);
        };
        /**
         * Returns all project members.
         * Project identifier is shortname.
         *
         * @param {string} shortname short name that is used to identify the project
         * @returns Observable<User[]>
         */
        ProjectsService.prototype.getProjectMembersByShortname = function (shortname) {
            var url = '/admin/projects/shortname/' + shortname + '/members';
            return this.getProjectMembers(url);
        };
        /**
         * Returns all project members.
         * Project identifier is shortcode.
         *
         * @param {string} shortcode hexadecimal code that uniquely identifies the project
         * @returns Observable<User[]>
         */
        ProjectsService.prototype.getProjectMembersByShortcode = function (shortcode) {
            var url = '/admin/projects/shortcode/' + shortcode + '/members';
            return this.getProjectMembers(url);
        };
        /**
         * @private
         * Helper method combining project member retrieval.
         *
         * @param {string} url
         * @returns Observable<User[]>
         */
        ProjectsService.prototype.getProjectMembers = function (url) {
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectMembersResponse).members; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // POST
        // ------------------------------------------------------------------------
        /**
         * Create new project.
         *
         * @param {any} data
         * @returns Observable<Project>
         */
        ProjectsService.prototype.createProject = function (data) {
            var url = '/admin/projects';
            return this.httpPost(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // PUT
        // ------------------------------------------------------------------------
        /**
         * Edit project data.
         *
         * @param {string} iri identifier of the project
         * @param {any} data
         * @returns Observable<Project>
         */
        ProjectsService.prototype.updateProject = function (iri, data) {
            var url = '/admin/projects/iri/' + encodeURIComponent(iri);
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Activate project (if it was deleted).
         *
         * @param {string} iri identifier of the project
         * @returns Observable<Project>
         */
        ProjectsService.prototype.activateProject = function (iri) {
            var data = {
                status: true
            };
            var url = '/admin/projects/iri/' + encodeURIComponent(iri);
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // DELETE
        // ------------------------------------------------------------------------
        /**
         * Delete (set inactive) project.
         *
         * @param {string} iri identifier of the project
         * @returns Observable<Project>
         */
        ProjectsService.prototype.deleteProject = function (iri) {
            var url = '/admin/projects/iri/' + encodeURIComponent(iri);
            return this.httpDelete(url).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        ProjectsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ProjectsService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: ProjectsService, providedIn: "root" });
        return ProjectsService;
    }(ApiService));

    /**
     * This service uses the Knora admin API and handles all user data.
     */
    var UsersService = /** @class */ (function (_super) {
        __extends(UsersService, _super);
        function UsersService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // ------------------------------------------------------------------------
        // GET
        // ------------------------------------------------------------------------
        /**
         * Returns a list of all users.
         *
         * @returns Observable<User[]>
         */
        UsersService.prototype.getAllUsers = function () {
            return this.httpGet('/admin/users').pipe(operators.map(function (result) { return result.getBody(UsersResponse).users; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Get user by username, email or by iri.
         *
         * @ignore
         *
         * @param {string} identifier - Get user by username, email or by iri
         * @returns Observable<User>
         */
        UsersService.prototype.getUser = function (identifier, identifierType) {
            var path = '/admin/users/' + identifierType + '/' + encodeURIComponent(identifier);
            return this.httpGet(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Get user by IRI
         *
         * @param {string} iri
         * @returns {Observable<User>}
         */
        UsersService.prototype.getUserByIri = function (iri) {
            return this.getUser(iri, 'iri');
        };
        /**
         * Get user by email
         *
         * @param {string} email
         * @returns {Observable<User>}
         */
        UsersService.prototype.getUserByEmail = function (email) {
            return this.getUser(email, 'email');
        };
        /**
         * Get user by username.
         *
         * @param {string} username
         * @returns {Observable<User>}
         */
        UsersService.prototype.getUserByUsername = function (username) {
            return this.getUser(username, 'username');
        };
        /**
         * Get all groups, where the user is member of
         *
         * @param userIri
         */
        UsersService.prototype.getUsersGroupMemberships = function (userIri) {
            var path = '/admin/users/iri/' + userIri + '/group-memberships';
            return this.httpGet(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).groups; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // POST
        // ------------------------------------------------------------------------
        /**
         * Create new user.
         *
         * @param {any} data
         * @returns Observable<User>
         */
        UsersService.prototype.createUser = function (data) {
            var path = '/admin/users';
            return this.httpPost(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Add user to a project.
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns Observable<User>
         */
        UsersService.prototype.addUserToProject = function (userIri, projectIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Remove user from project.
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns Observable<User>
         */
        UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Add user to an admin project.
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns Observable<User>
         */
        UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Delete user of an admin project.
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns Observable<User>
         */
        UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * add user to project specific group
         *
         * @param userIri
         * @param groupIri
         */
        UsersService.prototype.addUserToGroup = function (userIri, groupIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * remove user from project specific group
         *
         * @param userIri
         * @param groupIri
         */
        UsersService.prototype.removeUserFromGroup = function (userIri, groupIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // PUT
        // ------------------------------------------------------------------------
        /**
         * Add user to the admin system.
         *
         * @param {string} userIri
         * @returns Observable<User>
         */
        UsersService.prototype.addUserToSystemAdmin = function (userIri) {
            var data = {
                'newSystemAdminMembershipStatus': true
            };
            return this.updateUserSystemAdmin(userIri, data);
        };
        /**
         * Remove user from the admin system.
         * @param userIri
         * @returns Observable<User>
         */
        UsersService.prototype.removeUserFromSystemAdmin = function (userIri) {
            var data = {
                'newSystemAdminMembershipStatus': false
            };
            return this.updateUserSystemAdmin(userIri, data);
        };
        /**
         * Update user system admin membership
         * @ignore
         *
         *
         * @param userIri
         * @param data
         *
         * @returns Observable<User>
         */
        UsersService.prototype.updateUserSystemAdmin = function (userIri, data) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/SystemAdmin';
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Activate user.
         *
         * @param {string} userIri
         * @returns Observable<User>
         */
        UsersService.prototype.activateUser = function (userIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Status';
            var data = {
                status: true
            };
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Update own password.
         *
         * @param {string} userIri
         * @param {string} oldPassword
         * @param {string} newPassword
         * @returns Observable<User>
         */
        UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
            var data = {
                newPassword: newPassword,
                requesterPassword: oldPassword
            };
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Update password of another user (not own).
         *
         * @param {string} userIri
         * @param {string} requesterPassword
         * @param {string} newPassword
         * @returns Observable<User>
         */
        UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
            var data = {
                newPassword: newPassword,
                requesterPassword: requesterPassword
            };
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Update basic user information: given name, family name
         * @param userIri
         * @param data
         */
        UsersService.prototype.updateBasicUserInformation = function (userIri, data) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/BasicUserInformation';
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        // ------------------------------------------------------------------------
        // DELETE
        // ------------------------------------------------------------------------
        /**
         * Delete / deactivate user.
         *
         * @param {string} userIri
         * @returns Observable<User>
         */
        UsersService.prototype.deleteUser = function (userIri) {
            var path = '/admin/users/iri/' + encodeURIComponent(userIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        UsersService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        UsersService.ngInjectableDef = i0.defineInjectable({ factory: function UsersService_Factory() { return new UsersService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: UsersService, providedIn: "root" });
        return UsersService;
    }(ApiService));

    var LanguageService = /** @class */ (function () {
        function LanguageService() {
            this.subject = new rxjs.Subject();
        }
        LanguageService.prototype.setLanguage = function (lang) {
            this.subject.next({ var: lang });
        };
        LanguageService.prototype.getLanguage = function () {
            return this.subject.asObservable();
        };
        LanguageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(); }, token: LanguageService, providedIn: "root" });
        return LanguageService;
    }());

    var StatusMsgService = /** @class */ (function () {
        function StatusMsgService(_http, config) {
            this._http = _http;
            this.config = config;
        }
        /**
        * this method get the status messages from the statusMsg.json file
        * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
        *
        */
        StatusMsgService.prototype.getStatusMsg = function () {
            return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
                .pipe(operators.map(function (res) {
                return res;
            }, function (err) {
                console.error(err);
            }));
        };
        StatusMsgService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        StatusMsgService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [KuiCoreConfigToken,] }] }
            ];
        };
        StatusMsgService.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: StatusMsgService, providedIn: "root" });
        return StatusMsgService;
    }());

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
        var getPropertyNames = function (propName) {
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
            var properties = constructReadProperties(resourceJSONLD);
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
            var e_1, _a;
            var valueSpecificProp;
            // check for the property's value type
            switch (propValue['@type']) {
                case KnoraConstants.TextValue:
                    // a text value might be given as plain string, html or xml.
                    var textValue = void 0;
                    if (propValue[KnoraConstants.valueAsString] !== undefined) {
                        textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                    }
                    else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                        var referredResources = {};
                        try {
                            // check for standoff links and include referred resources, if any
                            // when the user interacts with a standoff link, further information about the referred resource can be shown
                            for (var standoffLinkValues_1 = __values(standoffLinkValues), standoffLinkValues_1_1 = standoffLinkValues_1.next(); !standoffLinkValues_1_1.done; standoffLinkValues_1_1 = standoffLinkValues_1.next()) {
                                var standoffLink = standoffLinkValues_1_1.value;
                                var referredRes = standoffLink.referredResource;
                                referredResources[referredRes.id] = referredRes;
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (standoffLinkValues_1_1 && !standoffLinkValues_1_1.done && (_a = standoffLinkValues_1.return))
                                    _a.call(standoffLinkValues_1);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
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
                    var dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                    valueSpecificProp = dateValue;
                    break;
                case KnoraConstants.LinkValue:
                    var linkValue = void 0;
                    // check if the referred resource is given as an object or just as an IRI
                    if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                        // linkValueHasTarget contains the object
                        var referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                        linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                    }
                    else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                        // linkValueHasTargetIri contains the resource's Iri
                        var referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                        linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                    }
                    else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                        // linkValueHasSource contains the object
                        var incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                        linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                    }
                    else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                        // linkValueHasSourceIri contains the resource's Iri
                        var incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                        linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                    }
                    valueSpecificProp = linkValue;
                    break;
                case KnoraConstants.IntValue:
                    var intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                    valueSpecificProp = intValue;
                    break;
                case KnoraConstants.DecimalValue:
                    // a decimal value is represented as a string in order to preserve its precision
                    var decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                    var decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                    valueSpecificProp = decimalValue;
                    break;
                // TODO: handle movingImageFileValue and the others here...
                case KnoraConstants.StillImageFileValue:
                    var stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                    valueSpecificProp = stillImageFileValue;
                    break;
                case KnoraConstants.TextFileValue:
                    var textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                    valueSpecificProp = textFileValue;
                    break;
                case KnoraConstants.ColorValue:
                    var readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                    valueSpecificProp = readColorValue;
                    break;
                case KnoraConstants.GeomValue:
                    var readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                    valueSpecificProp = readGeomValue;
                    break;
                case KnoraConstants.UriValue:
                    var uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                    valueSpecificProp = uriValue;
                    break;
                case KnoraConstants.BooleanValue:
                    var boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                    valueSpecificProp = boolValue;
                    break;
                case KnoraConstants.IntervalValue:
                    // represented as strings to preserve precision
                    var intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                    var intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                    var intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                    valueSpecificProp = intervalValue;
                    break;
                case KnoraConstants.ListValue:
                    var listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
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
            var e_2, _a, e_3, _b, e_4, _c;
            // JSON-LD representing standoff link values
            // text values may contain standoff links
            var standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
            // to be populated with standoff link values
            var standoffLinkValues = [];
            // convert each standoff link value JSON-LD object to a ReadLinkValue
            // in order populate the collection with all the standoff link values
            if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
                try {
                    for (var standoffLinkValuesJSONLD_1 = __values(standoffLinkValuesJSONLD), standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next(); !standoffLinkValuesJSONLD_1_1.done; standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next()) {
                        var standoffLinkJSONLD = standoffLinkValuesJSONLD_1_1.value;
                        var standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                        standoffLinkValues.push(standoffVal);
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (standoffLinkValuesJSONLD_1_1 && !standoffLinkValuesJSONLD_1_1.done && (_a = standoffLinkValuesJSONLD_1.return))
                            _a.call(standoffLinkValuesJSONLD_1);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
            }
            else if (standoffLinkValuesJSONLD !== undefined) {
                var standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                standoffLinkValues.push(standoffVal);
            }
            var propNames = Object.keys(resourceJSONLD);
            // filter out everything that is not a Knora property name
            propNames = propNames.filter(getPropertyNames);
            var properties = {};
            try {
                // iterate over all the given property names
                for (var propNames_1 = __values(propNames), propNames_1_1 = propNames_1.next(); !propNames_1_1.done; propNames_1_1 = propNames_1.next()) {
                    var propName = propNames_1_1.value;
                    var propValues = [];
                    // either an array of values or just one value is given
                    if (Array.isArray(resourceJSONLD[propName])) {
                        try {
                            // array of values
                            // for each property name, an array of property values is given, iterate over it
                            for (var _d = __values(resourceJSONLD[propName]), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var propValue = _e.value;
                                // convert a JSON-LD property value to a `ReadPropertyItem`
                                var valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                                // if it is undefined, the value could not be constructed correctly
                                // add the property value to the array of property values
                                if (valueSpecificProp !== undefined)
                                    propValues.push(valueSpecificProp);
                            }
                        }
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (_e && !_e.done && (_c = _d.return))
                                    _c.call(_d);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
                        }
                    }
                    else {
                        // only one value
                        var valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                        // if it is undefined, the value could not be constructed correctly
                        // add the property value to the array of property values
                        if (valueSpecificProp !== undefined)
                            propValues.push(valueSpecificProp);
                    }
                    // add the property to the properties object
                    properties[propName] = propValues;
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (propNames_1_1 && !propNames_1_1.done && (_b = propNames_1.return))
                        _b.call(propNames_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
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
            var e_5, _a;
            var resources = [];
            var numberOfResources;
            var resourcesGraph = resourcesResponseJSONLD['@graph'];
            // either an array of resources or just one resource is given
            if (resourcesGraph !== undefined) {
                // an array of resources
                numberOfResources = resourcesGraph.length;
                try {
                    for (var resourcesGraph_1 = __values(resourcesGraph), resourcesGraph_1_1 = resourcesGraph_1.next(); !resourcesGraph_1_1.done; resourcesGraph_1_1 = resourcesGraph_1.next()) {
                        var resourceJSONLD = resourcesGraph_1_1.value;
                        var resource = constructReadResource(resourceJSONLD);
                        // add the resource to the resources array
                        resources.push(resource);
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (resourcesGraph_1_1 && !resourcesGraph_1_1.done && (_a = resourcesGraph_1.return))
                            _a.call(resourcesGraph_1);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
                    var resource = constructReadResource(resourcesResponseJSONLD);
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
            var e_6, _a, e_7, _b;
            var propNames = Object.keys(resourceJSONLD);
            // filter out everything that is not a Knora property name
            propNames = propNames.filter(getPropertyNames);
            var referredResourceClasses = [];
            try {
                for (var propNames_2 = __values(propNames), propNames_2_1 = propNames_2.next(); !propNames_2_1.done; propNames_2_1 = propNames_2.next()) {
                    var prop = propNames_2_1.value;
                    // several values given for this property
                    if (Array.isArray(resourceJSONLD[prop])) {
                        try {
                            for (var _c = __values(resourceJSONLD[prop]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var referredRes = _d.value;
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
                        catch (e_7_1) {
                            e_7 = { error: e_7_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return))
                                    _b.call(_c);
                            }
                            finally {
                                if (e_7)
                                    throw e_7.error;
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
            }
            catch (e_6_1) {
                e_6 = { error: e_6_1 };
            }
            finally {
                try {
                    if (propNames_2_1 && !propNames_2_1.done && (_a = propNames_2.return))
                        _a.call(propNames_2);
                }
                finally {
                    if (e_6)
                        throw e_6.error;
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
            var e_8, _a;
            var resourcesGraph = resourcesResponseJSONLD['@graph'];
            var resourceClasses = [];
            // either an array of resources or just one resource is given
            if (resourcesGraph !== undefined) {
                try {
                    // an array of resources
                    for (var resourcesGraph_2 = __values(resourcesGraph), resourcesGraph_2_1 = resourcesGraph_2.next(); !resourcesGraph_2_1.done; resourcesGraph_2_1 = resourcesGraph_2.next()) {
                        var resourceJSONLD = resourcesGraph_2_1.value;
                        // get class of the current resource
                        resourceClasses.push(resourceJSONLD['@type']);
                        // get the classes of referred resources
                        var referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                        resourceClasses = resourceClasses.concat(referredResourceClasses);
                    }
                }
                catch (e_8_1) {
                    e_8 = { error: e_8_1 };
                }
                finally {
                    try {
                        if (resourcesGraph_2_1 && !resourcesGraph_2_1.done && (_a = resourcesGraph_2.return))
                            _a.call(resourcesGraph_2);
                    }
                    finally {
                        if (e_8)
                            throw e_8.error;
                    }
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
                    var referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
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
    })(exports.ConvertJSONLD || (exports.ConvertJSONLD = {}));

    /**
     * Requests representation of resources from Knora.
     */
    var ResourceService = /** @class */ (function (_super) {
        __extends(ResourceService, _super);
        function ResourceService(http, config, _ontologyCacheService) {
            var _this = _super.call(this, http, config) || this;
            _this.http = http;
            _this.config = config;
            _this._ontologyCacheService = _ontologyCacheService;
            return _this;
        }
        /**
         * Given the Iri, requests the representation of a resource.
         *
         * @param {string} iri Iri of the resource (not yet URL encoded).
         * @returns Observable<ApiServiceResult>
         */
        ResourceService.prototype.getResource = function (iri) {
            return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        };
        /**
         * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
         *
         * @param {string} iri Iri of the resource (not yet URL encoded).
         * @returns {Observable<ReadResourcesSequence>}
         */
        ResourceService.prototype.getReadResource = function (iri) {
            var _this = this;
            var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
            // TODO: handle case of an ApiServiceError
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.mergeMap(
            // return Observable of ReadResourcesSequence
            function (resourceResponse) {
                // convert JSON-LD into a ReadResourceSequence
                var resSeq = exports.ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
                // collect resource class Iris
                var resourceClassIris = exports.ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
                // request information about resource classes
                return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(operators.map(function (ontoInfo) {
                    // add ontology information to ReadResourceSequence
                    resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                    return resSeq;
                }));
            }));
        };
        ResourceService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ResourceService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [KuiCoreConfigToken,] }] },
                { type: OntologyCacheService }
            ];
        };
        ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken), i0.inject(OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
        return ResourceService;
    }(ApiService));

    /**
     * Performs searches (fulltext or extended) and search count queries into Knora.
     */
    var SearchService = /** @class */ (function (_super) {
        __extends(SearchService, _super);
        function SearchService(http, config, _ontologyCacheService) {
            var _this = _super.call(this, http, config) || this;
            _this.http = http;
            _this.config = config;
            _this._ontologyCacheService = _ontologyCacheService;
            /**
             * Converts a JSON-LD object to a `ReadResorceSequence`.
             * To be passed as a function pointer (arrow notation required).
             *
             * @param {Object} resourceResponse
             * @returns {Observable<ReadResourcesSequence>}
             */
            _this.convertJSONLDToReadResourceSequence = function (resourceResponse) {
                // convert JSON-LD into a ReadResourceSequence
                var resSeq = exports.ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
                // collect resource class Iris
                var resourceClassIris = exports.ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
                // request information about resource classes
                return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(operators.map(function (ontoInfo) {
                    // add ontology information to ReadResourceSequence
                    resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                    return resSeq;
                }));
            };
            return _this;
        }
        /**
         * Performs a fulltext search.
         * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
         *
         * @param {string} searchTerm the term to search for.
         * @param {number} offset the offset to be used (for paging, first offset is 0).
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doFulltextSearch = function (searchTerm, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            httpParams = httpParams.set('offset', offset.toString());
            return this.httpGet('/v2/search/' + searchTerm, httpParams);
        };
        /**
         * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
         *
         * @param {string} searchTerm the term to search for.
         * @param {number} offset the offset to be used (for paging, first offset is 0).
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doFullTextSearchReadResourceSequence = function (searchTerm, offset) {
            if (offset === void 0) {
                offset = 0;
            }
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            httpParams = httpParams.set('offset', offset.toString());
            var res = this.httpGet('/v2/search/' + searchTerm, httpParams);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.mergeMap(
            // return Observable of ReadResourcesSequence
            this.convertJSONLDToReadResourceSequence));
        };
        /**
         * Performs a fulltext search count query.
         * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
         *
         * @param searchTerm the term to search for.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doFulltextSearchCountQuery = function (searchTerm) {
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
            }
            return this.httpGet('/v2/search/count/' + searchTerm);
        };
        /**
         * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
         *
         * @param {string} searchTerm the term to search for.
         * @returns Observable<CountQueryResult>
         */
        SearchService.prototype.doFullTextSearchCountQueryCountQueryResult = function (searchTerm) {
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
            }
            var res = this.httpGet('/v2/search/count/' + searchTerm);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.map(
            // convert to a `CountQueryResult`
            exports.ConvertJSONLD.createCountQueryResult));
        };
        /**
         * Performs an extended search.
         * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
         *
         * @param gravsearchQuery the Sparql query string to be sent to Knora.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doExtendedSearch = function (gravsearchQuery) {
            if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
            }
            return this.httpPost('/v2/searchextended', gravsearchQuery);
        };
        /**
         * Performs an extended search and turns the result into a `ReadResourceSequence`.
         *
         * @param gravsearchQuery the Sparql query string to be sent to Knora.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doExtendedSearchReadResourceSequence = function (gravsearchQuery) {
            if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
            }
            var res = this.httpPost('/v2/searchextended', gravsearchQuery);
            return res.pipe(operators.mergeMap(this.processJSONLD), operators.mergeMap(this.convertJSONLDToReadResourceSequence));
        };
        /**
         * Performs an extended search count query.
         * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
         *
         * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doExtendedSearchCountQuery = function (gravsearchQuery) {
            if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
            }
            return this.httpPost('/v2/searchextended/count', gravsearchQuery);
        };
        /**
         * Performs an extended search count query and turns the result into a `CountQueryResult`.
         *
         * @param gravsearchQuery the Sparql query string to be sent to Knora.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.doExtendedSearchCountQueryCountQueryResult = function (gravsearchQuery) {
            if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
            }
            var res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.map(
            // convert to a `CountQueryResult`
            exports.ConvertJSONLD.createCountQueryResult));
        };
        /**
         * Perform a search by a resource's rdfs:label.
         * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
         *
         * @param {string} searchTerm the term to search for.
         * @param {string} [resourceClassIRI] restrict search to given resource class.
         * @param {string} [projectIri] restrict search to given project.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.searchByLabel = function (searchTerm, resourceClassIRI, projectIri) {
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            if (resourceClassIRI !== undefined) {
                httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
            }
            if (projectIri !== undefined) {
                httpParams = httpParams.set('limitToProject', projectIri);
            }
            // httpGet() expects only one argument, not 2
            return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
        };
        /**
         * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
         *
         * @param {string} searchTerm the term to search for.
         * @param {string} [resourceClassIRI] restrict search to given resource class.
         * @param {string} [projectIri] restrict search to given project.
         * @returns Observable<ApiServiceResult>
         */
        SearchService.prototype.searchByLabelReadResourceSequence = function (searchTerm, resourceClassIRI, projectIri) {
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            if (resourceClassIRI !== undefined) {
                httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
            }
            if (projectIri !== undefined) {
                httpParams = httpParams.set('limitToProject', projectIri);
            }
            var res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
            return res.pipe(operators.mergeMap(this.processJSONLD), operators.mergeMap(this.convertJSONLDToReadResourceSequence));
        };
        SearchService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */
        SearchService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [KuiCoreConfigToken,] }] },
                { type: OntologyCacheService }
            ];
        };
        SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken), i0.inject(OntologyCacheService)); }, token: SearchService, providedIn: "root" });
        return SearchService;
    }(ApiService));

    /**
     * Requests incoming information (regions, links, stillImageRepresentations) from Knora.
     */
    var IncomingService = /** @class */ (function (_super) {
        __extends(IncomingService, _super);
        function IncomingService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Returns all incoming regions for a particular resource.
        *
        * @param {string} resourceIRI the Iri of the resource whose Incoming regions should be returned.
        * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
        * @returns {Observable<any>}
        */
        IncomingService.prototype.getIncomingRegions = function (resourceIRI, offset) {
            var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?region knora-api:isMainResource true .\n\n?region knora-api:hasGeometry ?geom .\n\n?region knora-api:hasComment ?comment .\n\n?region knora-api:hasColor ?color .\n} WHERE {\n?region a knora-api:Region .\n?region a knora-api:Resource .\n\n?region knora-api:isRegionOf <" + resourceIRI + "> .\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIRI + "> a knora-api:Resource .\n\n?region knora-api:hasGeometry ?geom .\nknora-api:hasGeometry knora-api:objectType knora-api:Geom .\n\n?geom a knora-api:Geom .\n\n?region knora-api:hasComment ?comment .\nknora-api:hasComment knora-api:objectType xsd:string .\n\n?comment a xsd:string .\n\n?region knora-api:hasColor ?color .\nknora-api:hasColor knora-api:objectType knora-api:Color .\n\n?color a knora-api:Color .\n} OFFSET " + offset + "\n";
            // console.log('sparqlQueryStr ', sparqlQueryStr);
            return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
        };
        /**
         * Returns all the StillImageRepresentations for the given resource, if any.
         * StillImageRepresentations link to the given resource via knora-base:isPartOf.
         *
         * @param {string} resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
         * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
         * @returns {Observable<any>}
         */
        IncomingService.prototype.getStillImageRepresentationsForCompoundResource = function (resourceIri, offset) {
            var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?page knora-api:isMainResource true .\n\n?page knora-api:seqnum ?seqnum .\n\n?page knora-api:hasStillImageFile ?file .\n} WHERE {\n\n?page a knora-api:StillImageRepresentation .\n?page a knora-api:Resource .\n\n?page knora-api:isPartOf <" + resourceIri + "> .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?page knora-api:seqnum ?seqnum .\nknora-api:seqnum knora-api:objectType xsd:integer .\n\n?seqnum a xsd:integer .\n\n?page knora-api:hasStillImageFile ?file .\nknora-api:hasStillImageFile knora-api:objectType knora-api:File .\n\n?file a knora-api:File .\n\n} ORDER BY ?seqnum\nOFFSET " + offset + "\n";
            return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
        };
        /**
         * Returns all incoming links for the given resource Iri but incoming regions and still image representations.
         *
         * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
         * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
         * @returns {Observable<any>}
         */
        IncomingService.prototype.getIncomingLinksForResource = function (resourceIri, offset) {
            var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?incomingRes knora-api:isMainResource true .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n} WHERE {\n\n?incomingRes a knora-api:Resource .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?incomingProp knora-api:objectType knora-api:Resource .\n\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isRegionOf <" + resourceIri + "> .\n}\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isPartOf <" + resourceIri + "> .\n}\n\n} OFFSET " + offset + "\n";
            return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
        };
        IncomingService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        IncomingService.ngInjectableDef = i0.defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken), i0.inject(OntologyCacheService)); }, token: IncomingService, providedIn: "root" });
        return IncomingService;
    }(SearchService));

    /**
     * Represents the parameters of an extended search.
     */
    var ExtendedSearchParams = /** @class */ (function () {
        /**
         *
         * @param generateGravsearch a function that generates a Gravsearch query.
         *
         *                           The function takes the offset
         *                           as a parameter and returns a Gravsearch query string.
         *                           Returns false if not set correctly (init state).
         */
        function ExtendedSearchParams(generateGravsearch) {
            this.generateGravsearch = generateGravsearch;
        }
        return ExtendedSearchParams;
    }());
    var SearchParamsService = /** @class */ (function () {
        function SearchParamsService() {
            // init with a dummy function that returns false
            // if the application is reloaded, this will be returned
            this._currentSearchParams = new rxjs.BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
        }
        /**
         * Updates the parameters of an extended search.
         *
         * @param {ExtendedSearchParams} searchParams
         * @returns void
         */
        SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
            this._currentSearchParams.next(searchParams);
        };
        /**
         * Gets the search params of an extended search.
         *
         * @returns ExtendedSearchParams - search parameters
         */
        SearchParamsService.prototype.getSearchParams = function () {
            return this._currentSearchParams.getValue();
        };
        SearchParamsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        SearchParamsService.ctorParameters = function () { return []; };
        SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
        return SearchParamsService;
    }());

    /**
     * @ignore
     * Represents an error that occurred when generating KnarQL.
     */
    var GravsearchGenerationError = /** @class */ (function (_super) {
        __extends(GravsearchGenerationError, _super);
        function GravsearchGenerationError(msg) {
            return _super.call(this, msg) || this;
        }
        return GravsearchGenerationError;
    }(Error));
    /**
     * Create GravSearch queries from provided parameters.
     */
    var GravsearchGenerationService = /** @class */ (function () {
        function GravsearchGenerationService(_searchParamsService) {
            this._searchParamsService = _searchParamsService;
        }
        /**
           * @private
           * Converts a complex type Iri to a simple type Iri.
           *
           * @param {string} complexType the Iri of a value type (knora-api complex).
           * @returns string - the corresponding Iri of the simple type (knora-api simple).
           */
        GravsearchGenerationService.prototype.convertComplexTypeToSimpleType = function (complexType) {
            var simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
            if (simpleType !== undefined) {
                return simpleType;
            }
            else {
                throw new GravsearchGenerationError("complex type " + complexType + " could not be converted to simple type.");
            }
        };
        /**
         * Generates a Gravsearch query from the provided arguments.
         *
         * @param {PropertyWithValue[]} properties the properties specified by the user.
         * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
         * @param {number} offset the offset to be used (nth page of results).
         * @returns string - a KnarQL query string.
         */
        GravsearchGenerationService.prototype.createGravsearchQuery = function (properties, mainResourceClassOption, offset) {
            var _this = this;
            if (offset === void 0) {
                offset = 0;
            }
            // class restriction for the resource searched for
            var mainResourceClass = '';
            // if given, create the class restriction for the main resource
            if (mainResourceClassOption !== undefined) {
                mainResourceClass = "?mainRes a <" + Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption) + "> .";
            }
            // criteria for the order by statement
            var orderByCriteria = [];
            // statements to be returned in query results
            var returnStatements = [];
            // loop over given properties and create statements and Filters and type annotations from them
            var props = properties.map(function (propWithVal, index) {
                var propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
                var simpleType;
                if (!propWithVal.property.isLinkProperty) {
                    simpleType = _this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
                }
                else {
                    simpleType = KnoraConstants.resourceSimple;
                }
                // represents the object of a statement
                var propValue;
                if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                    // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                    // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                    propValue = "?propVal" + index;
                }
                else {
                    // it is a linking property and the comparison operator is not Exists, use its IRI
                    propValue = propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple);
                }
                // generate statement
                var statement = "?mainRes <" + propIriSimple + "> " + propValue + " .";
                // type annotations
                var propTypeAnnotation = "<" + propIriSimple + "> knora-api:objectType <" + simpleType + "> .";
                var propValueAnnotation = propValue + " a <" + simpleType + "> .";
                // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
                if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                    // do not include statement in results, because the query checks for the absence of this statement
                    statement = "FILTER NOT EXISTS {\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n}";
                }
                else {
                    // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                    returnStatements.push(statement);
                    statement = "\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n";
                }
                // generate filter if comparison operator is not Exists
                var filter = '';
                // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
                if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                    if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                        // use regex function for LIKE
                        filter = "FILTER regex(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ", \"i\")";
                    }
                    else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                        // use contains function for MATCH
                        filter = "FILTER <" + KnoraConstants.matchFunction + ">(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ")";
                    }
                    else {
                        filter = "FILTER(" + propValue + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ")";
                    }
                }
                // check if current value is a sort criterion
                if (propWithVal.isSortCriterion)
                    orderByCriteria.push(propValue);
                return statement + "\n" + filter + "\n";
            });
            var orderByStatement = '';
            if (orderByCriteria.length > 0) {
                orderByStatement = "\nORDER BY " + orderByCriteria.join(' ') + "\n";
            }
            // template of the KnarQL query with dynamic components
            var gravsearchTemplate = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\nCONSTRUCT {\n\n?mainRes knora-api:isMainResource true .\n\n" + returnStatements.join('\n') + "\n\n} WHERE {\n\n?mainRes a knora-api:Resource .\n\n" + mainResourceClass + "\n\n" + props.join('') + "\n\n}\n" + orderByStatement;
            // offset component of the KnarQL query
            var offsetTemplate = "\nOFFSET " + offset + "\n";
            // function that generates the same KnarQL query with the given offset
            var generateGravsearchQueryWithCustomOffset = function (localOffset) {
                var offsetCustomTemplate = "\nOFFSET " + localOffset + "\n";
                return gravsearchTemplate + offsetCustomTemplate;
            };
            if (offset === 0) {
                // store the function so another KnarQL query can be created with an increased offset
                this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
            }
            // console.log(knarqlTemplate + offsetTemplate);
            return gravsearchTemplate + offsetTemplate;
        };
        /**
         * @ignore
         *
         * Map of complex knora-api value types to simple ones.
         * Use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer.
         */
        GravsearchGenerationService.typeConversionComplexToSimple = {
            'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.xsdInteger,
            'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.xsdDecimal,
            'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.xsdBoolean,
            'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.xsdString,
            'http://api.knora.org/ontology/knora-api/v2#DateValue': KnoraConstants.dateSimple,
            'http://api.knora.org/ontology/knora-api/v2#IntervalValue': KnoraConstants.intervalSimple,
            'http://api.knora.org/ontology/knora-api/v2#GeomValue': KnoraConstants.geomSimple,
            'http://api.knora.org/ontology/knora-api/v2#ColorValue': KnoraConstants.colorSimple,
            'http://api.knora.org/ontology/knora-api/v2#GeonameValue': KnoraConstants.geonameSimple,
            'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.xsdUri,
            'http://api.knora.org/ontology/knora-api/v2#StillImageFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#FileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#DDDFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#AudioFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#DocumentFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#TextFileValue': KnoraConstants.fileSimple,
            'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.xsdString
        };
        GravsearchGenerationService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        GravsearchGenerationService.ctorParameters = function () {
            return [
                { type: SearchParamsService }
            ];
        };
        GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
        return GravsearchGenerationService;
    }());

    var StoreService = /** @class */ (function () {
        function StoreService(http, config) {
            this.http = http;
            this.config = config;
        }
        /**
           * Resets the content of the triplestore.
           *
           * @param rdfDataObjects
           * @returns Observable<string>
           */
        StoreService.prototype.resetTriplestoreContent = function (rdfDataObjects) {
            return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
                .pipe(operators.map(function (data) {
                var result = data;
                // console.log('StoreService - resetTriplestoreContent: ', result);
                return result.message;
            }, function (error) {
                if (error.error instanceof Error) {
                    console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
                }
                else {
                    console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
                }
                throw error;
            }));
        };
        StoreService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        StoreService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [KuiCoreConfigToken,] }] }
            ];
        };
        StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: StoreService, providedIn: "root" });
        return StoreService;
    }());

    var BasicOntologyService = /** @class */ (function (_super) {
        __extends(BasicOntologyService, _super);
        function BasicOntologyService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
           * returns our list of a basic ontology
           *
           * @returns {Observable<any>}
           */
        // getBasicOntology(): Observable<any> {
        //     let url = environment.url;
        //     return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
        // }
        BasicOntologyService.prototype.getBasicOntology = function () {
            var url = this.config.app;
            return this.httpGet(url + '/data/base-data/basic-ontology.json');
            // return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
        };
        BasicOntologyService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        BasicOntologyService.ngInjectableDef = i0.defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: BasicOntologyService, providedIn: "root" });
        return BasicOntologyService;
    }(ApiService));

    var ResourceTypesService = /** @class */ (function (_super) {
        __extends(ResourceTypesService, _super);
        function ResourceTypesService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
           * Get all resource types defined by the vocabulary.
           *
           * @param {string} iri Vocabulary iri
           * @returns Observable<any>
           */
        ResourceTypesService.prototype.getResourceTypesByVoc = function (iri) {
            return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
        };
        /**
         * Get a specific resource type.
         *
         * @param {string} iri resource type iri
         * @returns Observable<any>
         */
        ResourceTypesService.prototype.getResourceType = function (iri) {
            return this.httpGet('/v1/resourcetypes/' + encodeURIComponent(iri));
        };
        ResourceTypesService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ResourceTypesService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(i0.inject(i1.HttpClient), i0.inject(KuiCoreConfigToken)); }, token: ResourceTypesService, providedIn: "root" });
        return ResourceTypesService;
    }(ApiService));

    /**
     * main api services
     */

    var Equals = /** @class */ (function () {
        function Equals() {
            this.type = KnoraConstants.EqualsComparisonOperator;
            this.label = KnoraConstants.EqualsComparisonLabel;
        }
        Equals.prototype.getClassName = function () {
            return 'Equals';
        };
        return Equals;
    }());
    var NotEquals = /** @class */ (function () {
        function NotEquals() {
            this.type = KnoraConstants.NotEqualsComparisonOperator;
            this.label = KnoraConstants.NotEqualsComparisonLabel;
        }
        NotEquals.prototype.getClassName = function () {
            return 'NotEquals';
        };
        return NotEquals;
    }());
    var GreaterThanEquals = /** @class */ (function () {
        function GreaterThanEquals() {
            this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
            this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
        }
        GreaterThanEquals.prototype.getClassName = function () {
            return 'GreaterThanEquals';
        };
        return GreaterThanEquals;
    }());
    var GreaterThan = /** @class */ (function () {
        function GreaterThan() {
            this.type = KnoraConstants.GreaterThanComparisonOperator;
            this.label = KnoraConstants.GreaterThanComparisonLabel;
        }
        GreaterThan.prototype.getClassName = function () {
            return 'GreaterThan';
        };
        return GreaterThan;
    }());
    var LessThan = /** @class */ (function () {
        function LessThan() {
            this.type = KnoraConstants.LessThanComparisonOperator;
            this.label = KnoraConstants.LessThanComparisonLabel;
        }
        LessThan.prototype.getClassName = function () {
            return 'LessThan';
        };
        return LessThan;
    }());
    var LessThanEquals = /** @class */ (function () {
        function LessThanEquals() {
            this.type = KnoraConstants.LessThanEqualsComparisonOperator;
            this.label = KnoraConstants.LessThanQualsComparisonLabel;
        }
        LessThanEquals.prototype.getClassName = function () {
            return 'LessThanEquals';
        };
        return LessThanEquals;
    }());
    var Exists = /** @class */ (function () {
        function Exists() {
            this.type = KnoraConstants.ExistsComparisonOperator;
            this.label = KnoraConstants.ExistsComparisonLabel;
        }
        Exists.prototype.getClassName = function () {
            return 'Exists';
        };
        return Exists;
    }());
    var Like = /** @class */ (function () {
        function Like() {
            this.type = KnoraConstants.LikeComparisonOperator;
            this.label = KnoraConstants.LikeComparisonLabel;
        }
        Like.prototype.getClassName = function () {
            return 'Like';
        };
        return Like;
    }());
    var Match = /** @class */ (function () {
        function Match() {
            this.type = KnoraConstants.MatchComparisonOperator;
            this.label = KnoraConstants.MatchComparisonLabel;
        }
        Match.prototype.getClassName = function () {
            return 'Match';
        };
        return Match;
    }());
    /**
     * Combination of a comparison operator and a value literal or an IRI.
     * In case the comparison operator is 'Exists', no value is given.
     */
    var ComparisonOperatorAndValue = /** @class */ (function () {
        function ComparisonOperatorAndValue(comparisonOperator, value) {
            this.comparisonOperator = comparisonOperator;
            this.value = value;
        }
        return ComparisonOperatorAndValue;
    }());
    /**
     * Represents a property's value as a literal with the indication of its type.
     */
    var ValueLiteral = /** @class */ (function () {
        /**
         * Constructs a [ValueLiteral].
         *
         * @param {string} value the literal representation of the value.
         * @param {string} type the type of the value (making use of xsd).
         */
        function ValueLiteral(value, type) {
            this.value = value;
            this.type = type;
        }
        /**
         * Creates a type annotated value literal to be used in a SPARQL query.
         *
         * @param schema indicates the Knora schema to be used.
         * @returns {string}
         */
        ValueLiteral.prototype.toSparql = function (schema) {
            var literalType;
            // check if a Knora schema conversion is necessary, e.g., knora-api:dateValue (complex) to knora-api:date (simple).
            // xsd types will remain unchanged
            if (schema === exports.KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
                // convert to simple schema
                literalType = GravsearchGenerationService.typeConversionComplexToSimple[this.type];
            }
            else {
                // do not convert
                literalType = this.type;
            }
            return "\"" + this.value + "\"^^<" + literalType + ">";
        };
        return ValueLiteral;
    }());
    /**
     * Represents an IRI.
     */
    var IRI = /** @class */ (function () {
        /**
         * Constructs an [IRI].
         *
         * @param {string} iri the IRI of a resource instance.
         */
        function IRI(iri) {
            this.iri = iri;
        }
        /**
         * Creates a SPARQL representation of the IRI.
         *
         * @param schema indicates the Knora schema to be used.
         * @returns {string}
         */
        IRI.prototype.toSparql = function (schema) {
            // this is an instance Iri and does not have to be converted.
            return "<" + this.iri + ">";
        };
        return IRI;
    }());
    /**
     * Represents a property, the specified comparison operator, and value.
     */
    var PropertyWithValue = /** @class */ (function () {
        /**
         * Constructs a [PropertyWithValue].
         *
         * @param {Property} property the specified property.
         * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
         * @param isSortCriterion indicates if the property is used as a sort criterion.
         */
        function PropertyWithValue(property, valueLiteral, isSortCriterion) {
            this.property = property;
            this.valueLiteral = valueLiteral;
            this.isSortCriterion = isSortCriterion;
        }
        return PropertyWithValue;
    }());

    /*
     * Public API Surface of core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵa = Property;
    exports.KuiCoreConfigToken = KuiCoreConfigToken;
    exports.KuiCoreModule = KuiCoreModule;
    exports.KuiCoreConfig = KuiCoreConfig;
    exports.ApiServiceResult = ApiServiceResult;
    exports.ApiServiceError = ApiServiceError;
    exports.Utils = Utils;
    exports.KnoraConstants = KnoraConstants;
    exports.StringLiteral = StringLiteral;
    exports.DateSalsah = DateSalsah;
    exports.DateRangeSalsah = DateRangeSalsah;
    exports.AuthenticationResponse = AuthenticationResponse;
    exports.Group = Group;
    exports.GroupResponse = GroupResponse;
    exports.GroupsResponse = GroupsResponse;
    exports.List = List;
    exports.ListInfo = ListInfo;
    exports.ListInfoResponse = ListInfoResponse;
    exports.ListNode = ListNode;
    exports.ListNodeInfo = ListNodeInfo;
    exports.ListNodeInfoResponse = ListNodeInfoResponse;
    exports.ListResponse = ListResponse;
    exports.ListsResponse = ListsResponse;
    exports.OntologyInfoShort = OntologyInfoShort;
    exports.PermissionData = PermissionData;
    exports.Project = Project;
    exports.ProjectMembersResponse = ProjectMembersResponse;
    exports.ProjectResponse = ProjectResponse;
    exports.ProjectsResponse = ProjectsResponse;
    exports.CurrentUser = CurrentUser;
    exports.UsersResponse = UsersResponse;
    exports.UserResponse = UserResponse;
    exports.User = User;
    exports.ReadTextValue = ReadTextValue;
    exports.ReadTextValueAsString = ReadTextValueAsString;
    exports.ReferredResourcesByStandoffLink = ReferredResourcesByStandoffLink;
    exports.ReadTextValueAsHtml = ReadTextValueAsHtml;
    exports.ReadTextValueAsXml = ReadTextValueAsXml;
    exports.ReadDateValue = ReadDateValue;
    exports.ReadLinkValue = ReadLinkValue;
    exports.ReadIntegerValue = ReadIntegerValue;
    exports.ReadDecimalValue = ReadDecimalValue;
    exports.ReadStillImageFileValue = ReadStillImageFileValue;
    exports.ReadTextFileValue = ReadTextFileValue;
    exports.ReadColorValue = ReadColorValue;
    exports.Point2D = Point2D;
    exports.RegionGeometry = RegionGeometry;
    exports.ReadGeomValue = ReadGeomValue;
    exports.ReadUriValue = ReadUriValue;
    exports.ReadBooleanValue = ReadBooleanValue;
    exports.ReadIntervalValue = ReadIntervalValue;
    exports.ReadListValue = ReadListValue;
    exports.ReadResource = ReadResource;
    exports.ReadResourcesSequence = ReadResourcesSequence;
    exports.CountQueryResult = CountQueryResult;
    exports.StillImageRepresentation = StillImageRepresentation;
    exports.ImageRegion = ImageRegion;
    exports.Equals = Equals;
    exports.NotEquals = NotEquals;
    exports.GreaterThanEquals = GreaterThanEquals;
    exports.GreaterThan = GreaterThan;
    exports.LessThan = LessThan;
    exports.LessThanEquals = LessThanEquals;
    exports.Exists = Exists;
    exports.Like = Like;
    exports.Match = Match;
    exports.ComparisonOperatorAndValue = ComparisonOperatorAndValue;
    exports.ValueLiteral = ValueLiteral;
    exports.IRI = IRI;
    exports.PropertyWithValue = PropertyWithValue;
    exports.ApiService = ApiService;
    exports.GroupsService = GroupsService;
    exports.ListsService = ListsService;
    exports.ProjectsService = ProjectsService;
    exports.UsersService = UsersService;
    exports.LanguageService = LanguageService;
    exports.StatusMsgService = StatusMsgService;
    exports.OntologyService = OntologyService;
    exports.OntologyMetadata = OntologyMetadata;
    exports.Cardinality = Cardinality;
    exports.ResourceClass = ResourceClass;
    exports.ResourceClasses = ResourceClasses;
    exports.Property = Property;
    exports.Properties = Properties;
    exports.ResourceClassIrisForOntology = ResourceClassIrisForOntology;
    exports.OntologyInformation = OntologyInformation;
    exports.OntologyCacheService = OntologyCacheService;
    exports.ResourceService = ResourceService;
    exports.SearchService = SearchService;
    exports.IncomingService = IncomingService;
    exports.ExtendedSearchParams = ExtendedSearchParams;
    exports.SearchParamsService = SearchParamsService;
    exports.GravsearchGenerationService = GravsearchGenerationService;
    exports.StoreService = StoreService;
    exports.BasicOntologyService = BasicOntologyService;
    exports.ResourceTypesService = ResourceTypesService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Brbm9yYS9jb3JlL2xpYi9jb3JlLm1vZHVsZS50cyIsbnVsbCwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2NvcmUuY29uZmlnLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1lcnJvci50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkva25vcmEtY29uc3RhbnRzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL3V0aWxzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9zaGFyZWQvc3RyaW5ncy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL2RhdGUudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3Vwcy1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLWluZm8udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0cy1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vb250b2xvZ2llcy9vbnRvbG9neS1pbmZvLXNob3J0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLWRhdGEudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtbWVtYmVycy1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL2N1cnJlbnQtdXNlci50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vdXNlcnMvdXNlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXItcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Byb3BlcnRpZXMvcmVhZC1wcm9wZXJ0eS1pdGVtLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9yZXNvdXJjZXMvcmVhZC1yZXNvdXJjZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvY291bnQtcXVlcnkvY291bnQtcXVlcnktcmVzdWx0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS1yZXByZXNlbnRhdGlvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2UvaW1hZ2UtcmVnaW9uLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vZ3JvdXBzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9saXN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vcHJvamVjdHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvY29udmVydC1qc29ubGQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9pbmNvbWluZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvZ3Jhdi1zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2luZGV4LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiLCJuZzovL0Brbm9yYS9jb3JlL3B1YmxpY19hcGkudHMiLCJuZzovL0Brbm9yYS9jb3JlL2tub3JhLWNvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmV4cG9ydCBjb25zdCBLdWlDb3JlQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48S3VpQ29yZUNvbmZpZz4oJ0t1aUNvcmVDb25maWdUb2tlbiAoa25vcmEuY29yZS5jb25maWcpJyk7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBLdWlDb3JlTW9kdWxlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7S3VpQ29yZUNvbmZpZ30gY29uZmlnXG4gICAgICogQHJldHVybnMge01vZHVsZVdpdGhQcm92aWRlcnN9XG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBLdWlDb3JlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIC8vIGdldCB0aGUgYXBwIGVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gaGVyZVxuICAgICAgICBjb25zb2xlLmxvZygnS3VpQ29yZU1vZHVsZSAtIGZvclJvb3QgLSBjb25maWc6ICcsIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogS3VpQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBLdWlDb3JlQ29uZmlnVG9rZW4sIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIEtub3JhLXVpIGNvcmUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgZGVmaW5pdGlvbnMgb2Y6XG4gKiAgLSBhcGk6IFVSTCBvZiBkYXRhIHNlcnZpY2UgZS5nLiBrbm9yYTogaHR0cDovL2xvY2FsaG9zdDozMzMzXG4gKiAgLSBtZWRpYTogVVJMIG9mIG1lZGlhIHNlcnZlciBzZXJ2aWNlIGUuZy4gc2lwaTogaHR0cDovL2xvY2FsaG9zdDoxMDI0XG4gKiAgLSBhcHA6IFVSTCBvZiB0aGUgYXBwIGUuZy4gc2Fsc2FoOiBodHRwOi8vbG9jYWxob3N0OjQyMDBcbiAqL1xuQEpzb25PYmplY3QoJ0t1aUNvcmVDb25maWcnKVxuZXhwb3J0IGNsYXNzIEt1aUNvcmVDb25maWcge1xuXG4gICAgLyoqXG4gICAgICogbmFtZSBvZiB0aGUgYXBwIGUuZy4gJ1NBTFNBSCdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiB0aGUgYXBwIGUuZy4gJ2h0dHBzOi8vc2Fsc2FoLm9yZydcbiAgICAgKiBAdHlwZSB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwcCcsIFN0cmluZylcbiAgICBwdWJsaWMgYXBwOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwaSBlLmcuICdodHRwczovL2FwaS5rbm9yYS5vcmcnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcGknLCBTdHJpbmcpXG4gICAgcHVibGljIGFwaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIG1lZGlhL2ZpbGUgc2VydmVyIGUuZy4gJ2h0dHBzOi8vaWlpZi5zaXBpLmlvJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVkaWEnLCBTdHJpbmcpXG4gICAgcHVibGljIG1lZGlhOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbn1cbiIsIlxuaW1wb3J0IHsgSnNvbkNvbnZlcnQsIE9wZXJhdGlvbk1vZGUsIFZhbHVlQ2hlY2tpbmdNb2RlIH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBSZXN1bHQgY2xhc3MgdXNlZCBhcyBBUEkgdXJsIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VSZXN1bHQge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMganNvbkNvbnZlcnQ6IEpzb25Db252ZXJ0ID0gbmV3IEpzb25Db252ZXJ0KE9wZXJhdGlvbk1vZGUuRU5BQkxFLCBWYWx1ZUNoZWNraW5nTW9kZS5BTExPV19OVUxMKTtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IGFzIEpTT05cbiAgICAgKi9cbiAgICBib2R5OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXN1bHQgYm9keSBhcyBpbnN0YW5jZSBvZiBjbGFzc09iamVjdC5cbiAgICAgKiBAcGFyYW0gY2xhc3NPYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqIEB0aHJvd3NcbiAgICAgKi9cblxuICAgIGdldEJvZHkoY2xhc3NPYmplY3Q/OiB7IG5ldygpOiBhbnkgfSk6IGFueSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYm9keSk7XG4gICAgICAgIHJldHVybiBBcGlTZXJ2aWNlUmVzdWx0Lmpzb25Db252ZXJ0LmRlc2VyaWFsaXplKHRoaXMuYm9keSwgY2xhc3NPYmplY3QpO1xuICAgIH1cblxuXG59XG4iLCJcbi8qKlxuICogRXJyb3IgY2xhc3MgdXNlZCBhcyBBUEkgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZUVycm9yIHtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGVycm9yIGluZm9cbiAgICAgKi9cbiAgICBlcnJvckluZm8gPSAnJztcblxufVxuIiwiZXhwb3J0IGNsYXNzIEtub3JhQ29uc3RhbnRzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGk6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGknO1xuICAgIHB1YmxpYyBzdGF0aWMgUGF0aFNlcGFyYXRvcjogc3RyaW5nID0gJyMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYU9udG9sb2d5UGF0aDogc3RyaW5nID0gJ2h0dHA6Ly93d3cua25vcmEub3JnL29udG9sb2d5JztcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQmFzZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFPbnRvbG9neVBhdGggKyAnL2tub3JhLWJhc2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1Qcm9qZWN0SVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbVByb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtQWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1BZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0QWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0QWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdE1lbWJlckdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RNZW1iZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyU2ltcGxlUGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPbnRvbG9neTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3NhbHNhaC1ndWkvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPcmRlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3kgKyAnI2d1aU9yZGVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3RhbmRvZmZPbnRvbG9neTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3N0YW5kb2ZmL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBCb29sZWFuVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0Jvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBVcmlWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQ29sb3JWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9tVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3RWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpbmtWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb25hbWVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbmFtZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEF1ZGlvRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdBdWRpb0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBERERGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0REREZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEb2N1bWVudEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRG9jdW1lbnRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBNb3ZpbmdJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTW92aW5nSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJc1Jlc291cmNlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzUmVzb3VyY2VDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbHVlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzVmFsdWVDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBGb3JiaWRkZW5SZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRm9yYmlkZGVuUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgWE1MVG9TdGFuZG9mZk1hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1hNTFRvU3RhbmRvZmZNYXBwaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0Tm9kZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEFya1VybDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXJrVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIHZlcnNpb25BcmtVcmw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3ZlcnNpb25BcmtVcmwnO1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0VHlwZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ29iamVjdFR5cGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZXNvdXJjZUljb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3Jlc291cmNlSWNvbic7XG4gICAgcHVibGljIHN0YXRpYyBpc0VkaXRhYmxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0VkaXRhYmxlJztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1Byb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0xpbmtQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBpc0xpbmtWYWx1ZVByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0xpbmtWYWx1ZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGhhc0dlb21ldHJ5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNHZW9tZXRyeSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU5hbWU6IHN0cmluZyA9ICdodHRwOi8vc2NoZW1hLm9yZy9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU51bWJlck9mSXRlbXM6IHN0cmluZyA9ICdodHRwOi8vc2NoZW1hLm9yZy9udW1iZXJPZkl0ZW1zJztcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYUl0ZW1MaXN0RWxlbWVudDogc3RyaW5nID0gJ2h0dHA6Ly9zY2hlbWEub3JnL2l0ZW1MaXN0RWxlbWVudCc7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgUmRmUHJvcGVydHk6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc1NjaGVtYTogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYScgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0xhYmVsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hICsgJ2xhYmVsJztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNDb21tZW50OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hICsgJ2NvbW1lbnQnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc1N1YmNsYXNzT2Y6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnc3ViQ2xhc3NPZic7XG4gICAgcHVibGljIHN0YXRpYyBzdWJQcm9wZXJ0eU9mOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hICsgJ3N1YlByb3BlcnR5T2YnO1xuXG4gICAgcHVibGljIHN0YXRpYyBvd2w6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE93bENsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0NsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9iamVjdFByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI09iamVjdFByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bERhdGF0eXBlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjRGF0YXR5cGVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xBbm5vdGF0aW9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQW5ub3RhdGlvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNYXhDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtYXhDYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNaW5DYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtaW5DYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNjYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xSZXN0cmljdGlvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNSZXN0cmljdGlvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0aW9uRGF0ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnY3JlYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RNb2RpZmljYXRpb25EYXRlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsYXN0TW9kaWZpY2F0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNQZXJtaXNzaW9uczogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzUGVybWlzc2lvbnMnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1Byb2plY3Q6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Qcm9qZWN0JztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Vc2VyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvVXNlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnUmVnaW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzU3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1htbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGF0ZVZhbHVlOiBzdHJpbmcgPSAnUmVhZERhdGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlua1ZhbHVlOiBzdHJpbmcgPSAnUmVhZExpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZWdlclZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVnZXJWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSAnUmVhZERlY2ltYWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0RmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFRleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEdlb21WYWx1ZTogc3RyaW5nID0gJ1JlYWRHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZENvbG9yVmFsdWU6IHN0cmluZyA9ICdSZWFkQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVXJpVmFsdWU6IHN0cmluZyA9ICdSZWFkVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEJvb2xlYW5WYWx1ZTogc3RyaW5nID0gJ1JlYWRCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVydmFsVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlzdFZhbHVlOiBzdHJpbmcgPSAnUmVhZExpc3RWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlQXNTdHJpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3ZhbHVlQXNTdHJpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc1htbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlSGFzTWFwcGluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlSGFzTWFwcGluZyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1N0YW5kb2ZmTGlua1RvVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0YW5kb2ZmTGlua1RvVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0WWVhcic7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRZZWFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0RXJhOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydEVyYSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZEVyYSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydE1vbnRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZE1vbnRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRNb250aCc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydERheTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kRGF5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzQ2FsZW5kYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0NhbGVuZGFyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNUYXJnZXQnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlSXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2VJcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0SXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNUYXJnZXRJcmknO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnRlZ2VyVmFsdWVBc0ludGVnZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludFZhbHVlQXNJbnQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWNpbWFsVmFsdWVBc0RlY2ltYWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RlY2ltYWxWYWx1ZUFzRGVjaW1hbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUFzVXJsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVBc1VybCc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVJc1ByZXZpZXc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUlzUHJldmlldyc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVIYXNGaWxlbmFtZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSGFzRmlsZW5hbWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNTdGlsbEltYWdlRmlsZVZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWSc7XG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbG9yVmFsdWVBc0NvbG9yOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjb2xvclZhbHVlQXNDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnknO1xuICAgIHB1YmxpYyBzdGF0aWMgdXJpVmFsdWVBc1VyaTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndXJpVmFsdWVBc1VyaSc7XG4gICAgcHVibGljIHN0YXRpYyBib29sZWFuVmFsdWVBc0Jvb2xlYW46IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2Jvb2xlYW5WYWx1ZUFzQm9vbGVhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNTdGFydDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0JztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNFbmQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNFbmQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBsaXN0VmFsdWVBc0xpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgWHNkOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJztcblxuICAgIHB1YmxpYyBzdGF0aWMgeHNkU3RyaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnc3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEJvb2xlYW46IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdib29sZWFuJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEludGVnZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdpbnRlZ2VyJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZERlY2ltYWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdkZWNpbWFsJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZFVyaTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2FueVVSSSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlc291cmNlU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdSZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdEYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdJbnRlcnZhbCc7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdHZW9tJztcbiAgICBwdWJsaWMgc3RhdGljIGNvbG9yU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9uYW1lU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdHZW9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0ZpbGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBtYXRjaEZ1bmN0aW9uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdtYXRjaCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJz0nO1xuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgZXF1YWwgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICchPSc7XG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBub3QgZXF1YWwgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJz4nO1xuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBncmVhdGVyIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJz49JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgZ3JlYXRlciB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPCc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGxlc3MgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPD0nO1xuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGxlc3MgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICdFJztcbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2V4aXN0cyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICdyZWdleCc7XG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbGlrZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnY29udGFpbnMnO1xuICAgIHB1YmxpYyBzdGF0aWMgTWF0Y2hDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdtYXRjaGVzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoTGluazogc3RyaW5nID0gJ3NhbHNhaC1saW5rJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCA8YT4gZWxlbWVudCB0aGF0IGluZGljYXRlcyBhIGxpbmsgdG8gYSBLbm9yYSByZXNvdXJjZVxuICAgIHB1YmxpYyBzdGF0aWMgUmVmTWFya2VyOiBzdHJpbmcgPSAncmVmLW1hcmtlcic7IC8vIGNsYXNzIG9uIGFuIEhUTUwgZWxlbWVudCB0aGF0IHJlZmVycyB0byBhbm90aGVyIGVsZW1lbnQgaW4gdGhlIHNhbWUgZG9jdW1lbnRcblxuICAgIHB1YmxpYyBzdGF0aWMgR05EUHJlZml4OiBzdHJpbmcgPSAnKERFLTU4OCknO1xuICAgIHB1YmxpYyBzdGF0aWMgR05EUmVzb2x2ZXI6IHN0cmluZyA9ICdodHRwOi8vZC1uYi5pbmZvL2duZC8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBWSUFGUHJlZml4OiBzdHJpbmcgPSAnKFZJQUYpJztcbiAgICBwdWJsaWMgc3RhdGljIFZJQUZSZXNvbHZlcjogc3RyaW5nID0gJ2h0dHBzOi8vdmlhZi5vcmcvdmlhZi8nO1xuXG59XG5cblxuZXhwb3J0IGVudW0gS25vcmFTY2hlbWEge1xuICAgIGNvbXBsZXggPSAwLFxuICAgIHNpbXBsZSA9IDFcbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgdXRpbGl0eSBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi9hcGkva25vcmEtY29uc3RhbnRzJztcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBFbWFpbCBhZGRyZXNzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4RW1haWwgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVc2VybmFtZS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFVzZXJuYW1lID0gL15bYS16QS1aMC05XSskLztcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgVVJMcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFVybCA9IC9eKGh0dHA6XFwvXFwvd3d3XFwufGh0dHBzOlxcL1xcL3d3d1xcLnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC8pP1thLXowLTldKyhbXFwtXFwuXXsxfVthLXowLTldKykqXFwuW2Etel17Miw2fSg6WzAtOV17MSw1fSk/KFxcLy4qKT8kL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFBhc3N3b3Jkc1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4UGFzc3dvcmQgPSAvXig/PS4qXFxkKSg/PS4qW2EtekEtWl0pLns4LH0kL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIEhleGFkZWNpbWFsIHZhbHVlc1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4SGV4ID0gL15bMC05QS1GYS1mXSskLztcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgc2hvcnRuYW1lIGluIHByb2plY3RzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhTaG9ydG5hbWUgPSAvXlthLXpBLVpdK1xcUyokLztcblxuXG4gICAgLyoqXG4gICAgICogTGFtYmRhIGZ1bmN0aW9uIGVsaW1pbmF0aW5nIGR1cGxpY2F0ZXMgaW4gYSBjb2xsZWN0aW9uIHRvIGJlIHBhc3NlZCB0byBbW2ZpbHRlcl1dLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW0gZWxlbWVudCBvZiBhbiBBcnJheSB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyBsb29rZWQgYXQuXG4gICAgICogQHBhcmFtIGluZGV4IGN1cnJlbnQgZWxlbWVudHMgaW5kZXguXG4gICAgICogQHBhcmFtIHNlbGYgcmVmZXJlbmNlIHRvIHRoZSB3aG9sZSBBcnJheS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc2FtZSBlbGVtZW50IGRvZXMgbm90IGFscmVhZHkgZXhpc3QgaW4gdGhlIEFycmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsdGVyT3V0RHVwbGljYXRlcyA9IChlbGVtLCBpbmRleDogbnVtYmVyLCBzZWxmKSA9PiB7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY3NDc3OTgvZGVsZXRlLWR1cGxpY2F0ZS1lbGVtZW50cy1mcm9tLWFuLWFycmF5XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlcj92PWV4YW1wbGVcblxuICAgICAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQncyBpbmRleCBlcXVhbHMgdGhlIGluZGV4IG9mIHRoZSBsZWZ0bW9zdCBlbGVtZW50XG4gICAgICAgIC8vIC0+IHRoaXMgbWVhbnMgdGhhdCB0aGVyZSBpcyBubyBpZGVudGljYWwgZWxlbWVudCBiZWZvcmUgdGhpcyBpbmRleCwgaGVuY2UgaXQgaXMgbm90IGEgZHVwbGljYXRlXG4gICAgICAgIC8vIGZvciBhbGwgb3RoZXIgZWxlbWVudHMsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gc2VsZi5pbmRleE9mKGVsZW0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBLbm9yYSBlbnRpdHkgSVJJLCBnZXRzIHRoZSBvbnRvbG9neSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50aXR5SXJpIGFuIGVudGl0eSBJcmkuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgb250b2xvZ3kgSVJJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkoZW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBjbGFzcyBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gZW50aXR5SXJpLnNwbGl0KEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2VudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXgga25vcmEtYXBpIGVudGl0eSBJcmkgdG8gYSBrbm9yYS1hcGkgc2ltcGxlIGVudGl0eSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleEVudGl0eUlyaVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUoY29tcGxleEVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgZW50aXR5IElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBjb21wbGV4RW50aXR5SXJpLnNwbGl0KCd2MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtjb21wbGV4RW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIC8vIGFkZCAnc2ltcGxlJyB0byBiYXNlIHBhdGhcbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdICsgJ3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yICsgc2VnbWVudHNbMV07XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1N0cmluZ0xpdGVyYWwnKVxuZXhwb3J0IGNsYXNzIFN0cmluZ0xpdGVyYWwge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndmFsdWUnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZ3VhZ2UnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmd1YWdlOiBzdHJpbmcgPSAnJztcbn1cbiIsIi8qKlxuICogUHJlY2lzaW9uIGZvciBEYXRlU2Fsc2FoLlxuICovXG5leHBvcnQgZW51bSBQcmVjaXNpb24ge1xuICAgIHllYXJQcmVjaXNpb24sXG4gICAgbW9udGhQcmVjaXNpb24sXG4gICAgZGF5UHJlY2lzaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFNhbHNhaCBkYXRlIG9iamVjdCB3aXRoIGEgcHJlY2lzaW9uIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVNhbHNhaCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXBhcmF0b3IgPSAnLSc7XG5cbiAgICByZWFkb25seSBwcmVjaXNpb246IFByZWNpc2lvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgeWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBtb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGF5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHllYXIgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG1vbnRoIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXkgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5kYXlQcmVjaXNpb247XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgd2l0aG91dCB0aGUgY2FsZW5kYXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpIHtcblxuICAgICAgICBsZXQgZGF0ZVN0cmluZyA9ICcoJyArIHRoaXMuZXJhICsgJykgJztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlY2lzaW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLnllYXJQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5tb250aFByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5kYXlQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aCArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5kYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSAod2l0aCBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyICsgJzonICsgdGhpcy5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGVyaW9kICh3aXRoIHN0YXJ0IGRhdGUgYW5kIGVuZCBkYXRlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVSYW5nZVNhbHNhaCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgc3RhcnQ6IERhdGVTYWxzYWgsXG4gICAgICAgIHJlYWRvbmx5IGVuZDogRGF0ZVNhbHNhaFxuICAgICkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgcmFuZ2UgKHdpdGggcHJlY2VkaW5nIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydC5nZXREYXRlQXNTdHJpbmcoKSArICc6JyArIHRoaXMuZW5kLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdBdXRoZW50aWNhdGlvblJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3QnKVxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydG5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHNob3J0bmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRjb2RlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzaG9ydGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvbmduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb25nbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBTdHJpbmdMaXRlcmFsW10gPSBbbmV3IFN0cmluZ0xpdGVyYWwoKV07XG5cbiAgICBASnNvblByb3BlcnR5KCdrZXl3b3JkcycsIFtTdHJpbmddLCB0cnVlKVxuICAgIHB1YmxpYyBrZXl3b3Jkczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb2dvJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpbnN0aXR1dGlvbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgaW5zdGl0dXRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2dpZXMnLCBbU3RyaW5nXSlcbiAgICBwdWJsaWMgb250b2xvZ2llczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXAnKVxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBTdHJpbmcpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdCwgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3VwUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3VwUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXAnLCBHcm91cClcbiAgICBwdWJsaWMgZ3JvdXA6IEdyb3VwID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3Vwc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsZXZlbCcsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuaW1wb3J0IHsgTGlzdE5vZGUgfSBmcm9tICcuL2xpc3Qtbm9kZSc7XG5cbkBKc29uT2JqZWN0KCdMaXN0JylcbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIGZhbHNlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25vZGVpbmZvJywgTGlzdE5vZGVJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbm9kZWluZm86IExpc3ROb2RlSW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0JywgTGlzdCwgZmFsc2UpXG4gICAgcHVibGljIGxpc3Q6IExpc3QgPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0cycsIFtMaXN0Tm9kZUluZm9dLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdHM6IExpc3ROb2RlSW5mb1tdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdPbnRvbG9neUluZm9TaG9ydCcpXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvU2hvcnQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lJcmknLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnUGVybWlzc2lvbkRhdGEnKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EYXRhIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3Vwc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGdyb3Vwc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2FkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vZ3JvdXBzL2dyb3VwJztcbmltcG9ydCB7IFBlcm1pc3Npb25EYXRhIH0gZnJvbSAnLi4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1VzZXInKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdlbWFpbCcsIFN0cmluZylcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGFzc3dvcmQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dpdmVuTmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZ2l2ZW5OYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdmYW1pbHlOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBmYW1pbHlOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nlc3Npb25JZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2Vzc2lvbklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwZXJtaXNzaW9ucycsIFBlcm1pc3Npb25EYXRhKVxuICAgIHB1YmxpYyBwZXJtaXNzaW9uczogUGVybWlzc2lvbkRhdGEgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXN0ZW1BZG1pbicsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIHN5c3RlbUFkbWluPzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcnMvdXNlcic7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlIHtcbiAgICBASnNvblByb3BlcnR5KCdtZW1iZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyBtZW1iZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3RSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3QnLCBQcm9qZWN0KVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0c1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdFxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2p3dCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgand0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXNBZG1pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHN5c0FkbWluOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2Vyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2Vyc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyB1c2VyczogVXNlcltdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2VyUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VyJywgVXNlcilcbiAgICBwdWJsaWMgdXNlcjogVXNlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlU2Fsc2FoLCBEYXRlU2Fsc2FoIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RhdGUnO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYW55IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyBJcmkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyB0eXBlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBwb2ludGluZyB0byB0aGUgdmFsdWUgb2JqZWN0LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGlzIGludGVyZmFjZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGFzIGEgc3RyaW5nIChjb21wbGV4aXR5IG9mIHRoZSB2YWx1ZSBwb3NzaWJseSByZWR1Y2VkKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBvciB3aXRob3V0IG1hcmt1cC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlYWRUZXh0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGhvdXQgbWFya3VwIChtZXJlIGNoYXJhY3RlciBzdHJpbmcpLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBzdHI6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyByZXNvdXJjZXMgcmVmZXJyZWQgdG8gYnkgc3RhbmRvZmYgbGlua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlYWRSZXNvdXJjZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgdGhhdCBoYXMgYmVlbiB0dXJuZWQgaW50byBIVE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzSHRtbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaHRtbDogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluaykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgYSByZXNvdXJjZSByZWZlcnJlZCB0byBieSBhIHN0YW5kb2ZmIGxpbmsgZnJvbSBhIHRleHQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UuXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gb250b2xvZ3kgaW5mb3JtYXRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlJ3MgY2xhc3MgYW5kIGl0cyBsYWJlbC5cbiAgICAgKi9cblxuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ocmVzb3VyY2VJcmk6IHN0cmluZywgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2VzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdubyBpbmZvcm1hdGlvbiBmb3VuZCBhYm91dCByZWZlcnJlZCByZXNvdXJjZSAodGFyZ2V0IG9mIHN0YW5kb2ZmIGxpbmspJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIGFzIFhNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1htbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgeG1sOiBzdHJpbmcsIHJlYWRvbmx5IG1hcHBpbmdJcmk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhtbDtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREYXRlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kWWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlbmRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kTW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RGF5PzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmREYXk/OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICBnZXREYXRlU2Fsc2FoKCk6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWgge1xuICAgICAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHRoaXMuZW5kWWVhciAmJiB0aGlzLnN0YXJ0TW9udGggPT09IHRoaXMuZW5kTW9udGggJiYgdGhpcy5zdGFydERheSA9PT0gdGhpcy5lbmREYXkgJiYgdGhpcy5zdGFydEVyYSA9PT0gdGhpcy5lbmRFcmEpIHtcbiAgICAgICAgICAgIC8vIHByZWNpc2UgZGF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF0ZSBwZXJpb2RcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlU2Fsc2FoKG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpLCBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLmVuZEVyYSwgdGhpcy5lbmRZZWFyLCB0aGlzLmVuZE1vbnRoLCB0aGlzLmVuZERheSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVNhbHNhaCgpLmdldERhdGVBc1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluayB2YWx1ZSBvYmplY3QgKHJlaWZpY2F0aW9uKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaW5rVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZT86IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTtcblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpbmtWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZWdlclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBpbnRlZ2VyOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVnZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRlY2ltYWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERlY2ltYWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgZGVjaW1hbDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0aWxsIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHJlcHJlc2VudGF0aW9uIHZhbHVlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHRleHRGaWxlbmFtZTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZVVSTDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEZpbGVVUkw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbG9yIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRDb2xvclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjb2xvckhleDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ySGV4O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gYSAyRC1jb29yZGluYXRlIHN5c3RlbSAoZm9yIGdlb21ldHJ5IHZhbHVlcykuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludDJEIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0dXM6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVDb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50MkRbXSxcbiAgICAgICAgcHVibGljIHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJhZGl1cz86IFBvaW50MkRcbiAgICApIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEdlb21WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9tZXRyeVN0cmluZztcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVSSSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVXJpVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGJvb2w6IGJvb2xlYW4pIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbC50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVydmFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZXJ2YWxTdGFydDogbnVtYmVyLCByZWFkb25seSBpbnRlcnZhbEVuZDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxTdGFydC50b1N0cmluZygpICsgJy0nICsgdGhpcy5pbnRlcnZhbEVuZDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVMYWJlbDogc3RyaW5nLCApIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVMYWJlbDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRQcm9wZXJ0aWVzLCBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gfSBmcm9tICcuLi8uLi8uLi8nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2Uge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgdGhlIHJlc291cmNlJ3MgSXJpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSByZXNvdXJjZSdzIHR5cGUgKGNsYXNzKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgdGhlIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nUmVnaW9ucyByZWdpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdMaW5rcyByZXNvdXJjZXMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW119IHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyB0byBiZSBkaXNwbGF5ZWQgZm9yIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1JlYWRQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHRoZSByZXNvdXJjZXMncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1JlZ2lvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ0xpbmtzOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheTogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBwcm9wZXJ0aWVzPzogUmVhZFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1lcnJvcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdCc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi9jb3JlLm1vZHVsZSc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvLyBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAvLyBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgLy8gZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBcGlTZXJ2aWNlIGNvbnN0cnVjdG9yOiBjb25maWcnLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggdGhlIFVSTCBmb3IgdGhlIEdFVCByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7SHR0cFBhcmFtc30gcGFyYW1zIHRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgR0VUIHJlcXVlc3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogSHR0cFBhcmFtcyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJywgcGFyYW1zOiBwYXJhbXN9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBKU09OLUxEIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEV4cGFuZHMgSXJpcyBhbmQgY3JlYXRlcyBhbiBlbXB0eSBjb250ZXh0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXBpU2VydmljZVJlc3VsdH0gcmVzb3VyY2VSZXNwb25zZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwcm9jZXNzSlNPTkxEKHJlc291cmNlUmVzcG9uc2U6IEFwaVNlcnZpY2VSZXN1bHQpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIGNvbnN0IHJlc1Byb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICBjb25zdCByZXNQcm9taXNlID0gcmVzUHJvbWlzZXMuY29tcGFjdChyZXNvdXJjZVJlc3BvbnNlLmJvZHksIHt9KTtcblxuICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICByZXR1cm4gZnJvbShyZXNQcm9taXNlKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBQb3N0KHBhdGg6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCBib2R5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUFVUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7YW55fSBib2R5XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwUHV0KHBhdGg6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERUxFVEVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwRGVsZXRlKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSByZXF1ZXN0IGVycm9yIGluIGNhc2Ugb2Ygc2VydmVyIGVycm9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0h0dHBFcnJvclJlc3BvbnNlfSBlcnJvclxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgQXBpU2VydmljZUVycm9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgICAgIHNlcnZpY2VFcnJvci5lcnJvckluZm8gPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gZXJyb3IudXJsO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzZXJ2aWNlRXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSBqc29uIGVycm9yIGluIGNhc2Ugb2YgdHlwZSBlcnJvciBpbiBqc29uIHJlc3BvbnNlIChqc29uMnR5cGVzY3JpcHQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gZXJyb3JcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIEFwaVNlcnZpY2VFcnJvclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVKc29uRXJyb3IoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG5cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpU2VydmljZUVycm9yKSByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG5cbiAgICAgICAgY29uc3Qgc2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzID0gLTE7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gJ0ludmFsaWQgSlNPTic7XG4gICAgICAgIHNlcnZpY2VFcnJvci5lcnJvckluZm8gPSBlcnJvcjtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9ICcnO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzZXJ2aWNlRXJyb3IpO1xuXG4gICAgfVxuXG4gICAgLy8gdGhlIGZvbGxvd2luZyBtZXRob2QgaXMgcmVwbGFjZWQgYnkgdGhlIEp3dEludGVyY2VwdG9yXG4gICAgLypcbiAgICBwcm90ZWN0ZWQgc2V0SGVhZGVycygpOiBIdHRwSGVhZGVycyB7XG4gICAgICAgIGxldCBjdXJyZW50VXNlcjogQ3VycmVudFVzZXI7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgICAgICAvLyBnZXQga2V5IGZyb20gbG9jYWwgc3RvcmFnZVxuICAgICAgICBjb25zdCBrZXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbl9pZCcpO1xuXG4gICAgICAgIGlmIChrZXkgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLl9hY3MuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwaSBzZXJ2aWNlIC0tIHNldEhlYWRlcnMgLS0gY3VycmVudFVzZXIgZnJvbSBhY3MnLCBjdXJyZW50VXNlcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtjdXJyZW50VXNlci50b2tlbn1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAqL1xuICAgIC8qXG4gICAgLyEqKlxuICAgICAqIEFwcGVuZHMgdG8gZXhpc3Rpbmcgb3B0aW9ucyBpZiB0aGV5IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7SHR0cEhlYWRlcnN9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7SHR0cEhlYWRlcnN9XG4gICAgICohL1xuICAgIHByb3RlY3RlZCBhcHBlbmRUb09wdGlvbnMob3B0aW9uczogYW55KTogYW55IHtcblxuICAgICAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnM7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gdGhpcy5hcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmEpICcsIGhlYWRlcnMpO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzJiKSAnLCBvcHRpb25zKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaGF2ZSBvcHRpb25zXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNbJ2hlYWRlcnMnXSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGhlYWRlcnMgc2V0XG4gICAgICAgICAgICAgICAgb3B0aW9uc1snaGVhZGVycyddID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzM6ICcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGhlYWRlcnMsIG5lZWQgdG8gYXBwZW5kIHRvIHRob3NlXG4gICAgICAgICAgICAgICAgb3B0aW9uc1snaGVhZGVycyddID0gdGhpcy5hcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKG9wdGlvbnNbJ2hlYWRlcnMnXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzQ6ICcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBoZWFkZXJzIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIZWFkZXJzfSBoZWFkZXJzXG4gICAgICogQHJldHVybnMge0hlYWRlcnN9XG4gICAgICohL1xuICAgIHByb3RlY3RlZCBhcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IEh0dHBIZWFkZXJzIHtcblxuXG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnRva2VuO1xuXG4vLyAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuXG4gICAgICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW59YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG4qL1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdCc7XG5pbXBvcnQgeyBOZXdPbnRvbG9neSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvdjIvb250b2xvZ3kvbmV3LW9udG9sb2d5JztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVCBsaXN0IG9mIG9udG9sb2dpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERFUFJFQ0FURUQ6IFlvdSBzaG91bGQgdXNlIGdldEFsbE9udG9sb2dpZXMoKVxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0QWxsT250b2xvZ2llcygpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgb250b2xvZ2llcyBvZiBhIHNwZWNpZmljIHByb2plY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBwcm9qZWN0IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvamVjdE9udG9sb2dpZXMocHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUIG9udG9sb2d5XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2FsbGVudGl0aWVzLycgKyBlbmNvZGVVUklDb21wb25lbnQob250b2xvZ3lJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3NlcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKHJlc291cmNlQ2xhc3NJcmlzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc2VzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzVXJpRW5jID0gcmVzQ2xhc3NVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnICsgcmVzQ2xhc3NVcmlFbmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHByb3BlcnRpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBwcm9wZXJ0eSBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRQcm9wZXJ0aWVzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnRpZXNVcmlFbmMgPSAnJztcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNVcmlFbmMgPSBwcm9wZXJ0aWVzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJyArIHByb3BlcnRpZXNVcmlFbmMpO1xuXG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBvbnRvbG9neS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmV3T250b2xvZ3l9IGRhdGEgRGF0YSBjb250YWluczogcHJvamVjdElyaSwgbmFtZSwgbGFiZWxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgY3JlYXRlT250b2xvZ3koZGF0YTogTmV3T250b2xvZ3kpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvdjIvb250b2xvZ2llcyc7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3kgPSB7XG4gICAgICAgICAgICAna25vcmEtYXBpOm9udG9sb2d5TmFtZSc6IGRhdGEubmFtZSxcbiAgICAgICAgICAgICdrbm9yYS1hcGk6YXR0YWNoZWRUb1Byb2plY3QnOiB7XG4gICAgICAgICAgICAgICAgJ0BpZCc6IGRhdGEucHJvamVjdElyaSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncmRmczpsYWJlbCc6IGRhdGEubGFiZWwsXG4gICAgICAgICAgICAnQGNvbnRleHQnOiB7XG4gICAgICAgICAgICAgICAgJ3JkZnMnOiBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hLFxuICAgICAgICAgICAgICAgICdrbm9yYS1hcGknOiBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIG9udG9sb2d5KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdCc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkva25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL3V0aWxzJztcbmltcG9ydCB7IE9udG9sb2d5U2VydmljZSB9IGZyb20gJy4vb250b2xvZ3kuc2VydmljZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIG9jY3VycmVkIGluIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBvbnRvbG9neSdzIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lNZXRhZGF0YSB7XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZWNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgYSBsYWJlbCBkZXNjcmliaW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICogT2NjdXJyZW5jZSBvZiBhIHByb3BlcnR5IGZvciBhIHJlc291cmNlIGNsYXNzIChpdHMgY2FyZGluYWxpdHkpLlxuICovXG5leHBvcnQgZW51bSBDYXJkaW5hbGl0eU9jY3VycmVuY2Uge1xuICAgIG1pbkNhcmQgPSAwLFxuICAgIGNhcmQgPSAxLFxuICAgIG1heENhcmQgPSAyXG59XG5cblxuLyoqXG4gKiBDYXJkaW5hbGl0eSBvZiBhIHByb3BlcnR5IGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJkaW5hbGl0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5T2NjdXJyZW5jZX0gb2NjdXJyZW5jZSB0eXBlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIG51bWVyaWNhbCB2YWx1ZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdGhlIGdpdmVuIG9jY3VycmVuY2UgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvY2N1cnJlbmNlOiBDYXJkaW5hbGl0eU9jY3VycmVuY2UsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgdmFsdWU6IG51bWJlcixcbiAgICAgICAgICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiBwYXRoIHRvIGFuIGljb24gcmVwcmVzZW50aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eVtdfSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBpY29uOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgY2FyZGluYWxpdGllczogQXJyYXk8Q2FyZGluYWxpdHk+KSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIHRvIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc2VzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlc291cmNlQ2xhc3M7XG59XG5cblxuLyoqXG4gKiBBIHByb3BlcnR5IGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3ViUHJvcGVydHlPZiBJcmlzIG9mIHByb3BlcnRpZXMgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgc3VicHJvcGVydHkgb2YuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rVmFsdWVQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgcmVmZXJzIHRvIGEgbGluayB2YWx1ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IG9iamVjdFR5cGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBzdWJQcm9wZXJ0eU9mOiBBcnJheTxzdHJpbmc+LFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNMaW5rUHJvcGVydHk6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNMaW5rVmFsdWVQcm9wZXJ0eTogQm9vbGVhbikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcHJvcGVydHkgSXJpcyB0byBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUHJvcGVydHk7XG59XG5cblxuLyoqXG4gKiBHcm91cHMgcmVzb3VyY2UgY2xhc3NlcyBieSB0aGUgb250b2xvZ3kgdGhleSBhcmUgZGVmaW5lZCBpbi5cbiAqXG4gKiBBIG1hcCBvZiBvbnRvbG9neSBJcmlzIHRvIGFuIGFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IEFycmF5PHN0cmluZz47XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGNhY2hlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiAob25seSB1c2VkIGJ5IHRoaXMgc2VydmljZSBpbnRlcm5hbGx5KS5cbiAqIFRoaXMgY2FjaGUgaXMgdXBkYXRlZCB3aGVuZXZlciBuZXcgZGVmaW5pdGlvbnMgYXJlIHJlcXVlc3RlZCBmcm9tIEtub3JhLlxuICpcbiAqIFJlcXVlc3RlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiBieSBhIHNlcnZpY2UgaXMgcmVwcmVzZW50ZWQgYnkgW1tPbnRvbG9neUluZm9ybWF0aW9uXV0uXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neU1ldGFkYXRhW119IG9udG9sb2dpZXMgQW4gYXJyYXkgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgb250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT47XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3l9IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgbGlzdCBvZiBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBuYW1lZCBncmFwaC5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub250b2xvZ2llcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IFByb3BlcnRpZXMoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbnRvbG9neSBpbmZvcm1hdGlvbiByZXF1ZXN0ZWQgZnJvbSB0aGlzIHNlcnZpY2UuXG4gKlxuICogRm9yIGV2ZXJ5IHJlcXVlc3QsIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcmV0dXJuZWQgY29udGFpbmluZyB0aGUgcmVxdWVzdGVkIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3l9IHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5IGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIGdpdmVuIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5LFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzLFxuICAgICAgICBwcml2YXRlIHByb3BlcnRpZXM6IFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyBhbiBhcnJheSBvZiBgUmVzb3VyY2VDbGFzc2Agb3IgYFByb3BlcnR5YCBieSBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIGZpcnN0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gYiBzZWNvbmQgZWxlbWVudFxuICAgICAqIEByZXR1cm4gbmVnYXRpdmUgLTEgaWYgdGhlIGZpcnN0IGVsZW1lbnQgaXMgY29uc2lkZXJlZCBsb3dlciB0aGFuIHRoZSBzZWNvbmQsIDEgaWYgdGhlIHNlY29uZCBlbGVtZW50IGlzIGNvbnNpZGVyZWQgYmlnZ2VyLCAwIGlmIHRoZXkgYXJlIGVxdWFsXG4gICAgICovXG4gICAgc3RhdGljIHNvcnRGdW5jKGE6IFJlc291cmNlQ2xhc3MgfCBQcm9wZXJ0eSwgYjogUmVzb3VyY2VDbGFzcyB8IFByb3BlcnR5KSB7XG4gICAgICAgIC8vIGRlYWxpbmcgd2l0aCAndW5kZWZpbmVkJyBsYWJlbHNcbiAgICAgICAgaWYgKGEubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYi5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYWJlbEEgPSBhLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxhYmVsQiA9IGIubGFiZWwudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAobGFiZWxBIDwgbGFiZWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWxBID4gbGFiZWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGdpdmVuIFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dIGludG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UsXG4gICAgICogdXBkYXRpbmcgdGhlIGV4aXN0aW5nIGluZm9ybWF0aW9uLlxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gYSBzZXJ2aWNlIGxpa2UgdGhlIHNlYXJjaCBmZXRjaGVzIG5ldyByZXN1bHRzXG4gICAgICogdGhhdCBoYXZlIHRvIGJlIGFkZGVkIHRvIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGV4aXN0aW5nIG9udG9sb2d5IGluZm9ybWF0aW9uIG11c3Qgbm90IGJlIGxvc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgdGhhdCBoYXZlIHRvIGJlIGludGVncmF0ZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzc0Zvck9udG9sb2d5IGluIG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldID0gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3NlcyA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcmVzb3VyY2VDbGFzc2VzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzIGluIG5ld1Jlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdID0gbmV3UmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UHJvcGVydGllcyA9IG9udG9sb2d5SW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UHJvcCBpbiBuZXdQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmV3UHJvcF0gPSBuZXdQcm9wZXJ0aWVzW25ld1Byb3BdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBncm91cGVkIGJ5IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NlcyAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKCk6IFJlc291cmNlQ2xhc3NlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzb3J0QXNjIHNvcnQgcmVzb3VyY2UgY2xhc3NlcyBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NbXVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoc29ydEFzYzogYm9vbGVhbiA9IHRydWUpOiBBcnJheTxSZXNvdXJjZUNsYXNzPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NlczogQXJyYXk8UmVzb3VyY2VDbGFzcz4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzc0lyaSBpbiB0aGlzLnJlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3M6IFJlc291cmNlQ2xhc3MgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG4gICAgICAgICAgICByZXNDbGFzc2VzLnB1c2gocmVzQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzb3VyY2VDbGFzc2VzIG9yZGVyIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgICByZXNDbGFzc2VzLnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgLy8gcmVzb3VyY2VDbGFzc2VzIG9yZGVyIGJ5IGxhYmVsIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgaWYgKCFzb3J0QXNjKSB7XG4gICAgICAgICAgICByZXNDbGFzc2VzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZjogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNhbm5vdCBnZXQgbGFiZWwgZm9yICR7cmVzQ2xhc3N9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyB3aXRob3V0IGFyZ3VtZW50IHJlc0NsYXNzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFByb3BlcnRpZXMgLSBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcygpOiBQcm9wZXJ0aWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzb3J0QXNjIHNvcnQgcHJvcGVydGllcyBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIFByb3BlcnR5W10gLSBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzQXNBcnJheShzb3J0QXNjOiBib29sZWFuID0gdHJ1ZSk6IEFycmF5PFByb3BlcnR5PiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3A6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvcGVydGllcyBvcmRlciBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgcHJvcGVydGllcy5zb3J0KE9udG9sb2d5SW5mb3JtYXRpb24uc29ydEZ1bmMpO1xuXG4gICAgICAgIC8vIHByb3BlcnRpZXMgb3JkZXIgYnkgbGFiZWwgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBpZiAoIXNvcnRBc2MpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChwcm9wRGVmICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjYW5ub3QgZ2V0IGxhYmVsIGZvciAke3Byb3BlcnR5fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclByb3BlcnR5IHdpdGhvdXQgYXJndW1lbnQgcHJvcGVydHknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICogT3RoZXIgY29tcG9uZW50cyBvciBzZXJ2aWNlcyBvYnRhaW4gb250b2xvZ3kgaW5mb3JtYXRpb24gdGhyb3VnaCB0aGlzIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lDYWNoZVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogT250b2xvZ2llcyBpbmdvcmVkIGJ5IHRoaXMgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZE9udG9sb2dpZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZFByb3BlcnRpZXMgcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kIHRoYXQgaGF2ZSB0byBiZSBpZ25vcmVkIGJlY2F1c2UgdGhleSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm9uUmVzb3VyY2VDbGFzc2VzIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lDYWNoZX0gY2FjaGVPbnRvbG9neSBjZW50cmFsIGluc3RhbmNlIHRoYXQgY2FjaGVzIGFsbCBkZWZpbml0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2FjaGVPbnRvbG9neTogT250b2xvZ3lDYWNoZSA9IG5ldyBPbnRvbG9neUNhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vbnRvbG9neVNlcnZpY2U6IE9udG9sb2d5U2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcyBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBvbnRvbG9naWVzIGFzIEpTT04tTEQgKG5vIHByZWZpeGVzLCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyAocmVzb3VyY2UgY2xhc3NlcyBhbmQgcHJvcGVydGllcykgZm9yIHRoZSBnaXZlbiBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmkgb2YgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3Igb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGFsbCB0aGUgb250b2xvZ2llcycgbWV0YWRhdGEgcmV0dXJuZWQgYnkgS25vcmEgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gb250b2xvZ2llcyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIGEgbmV3IE9udG9sb2d5TWV0YWRhdGEgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4gLSBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PG9iamVjdD59IGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3ViY2xhc3NPZkNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIHNpbmdsZSBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSBbcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY2FyZGluYWxpdGllcyBmb3IgdGhlIHByb3BlcnRpZXMgb2YgYSByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VyQ2FyZCBvZiBzdWJjbGFzc09mQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgZ3VpIG9yZGVyXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZSBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9IG5ldyBQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSxcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcHJvcGVydHkgZGVmaW5pdGlvbnMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9udG9sb2d5SW5mb3JtYXRpb24gLSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW50aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZTogcHJvcGVydHkgbm90IGZvdW5kIGluIGNhY2hlOiAke3Byb3BJcml9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvcGVydHlEZWZzW3Byb3BJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIG5ldyBSZXNvdXJjZUNsYXNzZXMoKSwgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiAtIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgaW4gY2FjaGUgeWV0LCBnZXQgbWV0YWRhdGEgZnJvbSBLbm9yYVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShtZXRhZGF0YVsnQGdyYXBoJ10uZmlsdGVyKChvbnRvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIGV4Y2x1ZGVkIG9udG9sb2dpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlZE9udG9sb2dpZXMuaW5kZXhPZihvbnRvWydAaWQnXSkgPT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmV0dXJuIG1ldGFkYXRhIGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSBLbm9yYSwgYWRkaW5nIHRoZW0gdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcmVxdWVzdGVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55W10+XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgICAgICAvLyBhcnJheSB0byBiZSBwb3B1bGF0ZWQgd2l0aCBPYnNlcnZhYmxlc1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgICAgIC8vIGRvIGEgcmVxdWVzdCBmb3IgZWFjaCBvbnRvbG9neVxuICAgICAgICBvbnRvbG9neUlyaXMuZm9yRWFjaChvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAvLyBwdXNoIGFuIE9ic2VydmFibGUgb250byBgb2JzZXJ2YWJsZXNgXG4gICAgICAgICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChvbnRvbG9neTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9ya0pvaW4gcmV0dXJucyBhbiBPYnNlcnZhYmxlIG9mIGFuIGFycmF5IG9mIHJlc3VsdHNcbiAgICAgICAgLy8gcmV0dXJuZWQgYnkgZWFjaCBPYnNlcnZhYmxlIGNvbnRhaW5lZCBpbiBgb2JzZXJ2YWJsZXNgXG4gICAgICAgIC8vIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGZvcmtKb2luIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIG9uY2UgYWxsIE9ic2VydmFibGVzIGhhdmUgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYWxsIG9udG9sb2d5IG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlXG4gICAgICovXG4gICAgcHVibGljIGdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzVG9RdWVyeSA9IG9udG9sb2d5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbnRvbG9neSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IG9udG9sb2dpZXMgdGhhdCBhcmUgbW90IGNhY2hlZCB5ZXRcbiAgICAgICAgaWYgKG9udG9sb2d5SXJpc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzVG9RdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkIC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllc1RvUXVlcnk6IHN0cmluZ1tdID0gcHJvcGVydHlJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcHJvcGVydGllc1RvUXVlcnkubWFwKFxuICAgICAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHByb3BJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSB3aXRoOiByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgZW50aXRpZXMgdXNlZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvbiBvZiBgUmVhZFJlc291cmNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgb250b2xvZ3lJbmZvcm1hdGlvbjogT250b2xvZ3lJbmZvcm1hdGlvbiA9IG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKHt9LCB7fSwge30pO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyB0aGUgcmVzdWx0IG9mIGEgY291bnQgcXVlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudFF1ZXJ5UmVzdWx0IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG51bWJlck9mUmVzdWx0cyB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyBmb3IgYSBxdWVyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXN1bHRzOiBudW1iZXIpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEltYWdlUmVnaW9uIH0gZnJvbSAnLi9pbWFnZS1yZWdpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW1hZ2UgaW5jbHVkaW5nIGl0cyByZWdpb25zLlxuICovXG5cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlfSBzdGlsbEltYWdlRmlsZVZhbHVlIGEgW1tSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZV1dIHJlcHJlc2VudGluZyBhbiBpbWFnZS5cbiAgICAgKiBAcGFyYW0ge0ltYWdlUmVnaW9uW119IHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgcmVhZG9ubHkgcmVnaW9uczogSW1hZ2VSZWdpb25bXSkge1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkR2VvbVZhbHVlLCBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWdpb24uXG4gKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgcmVzb3VyY2UgcmVwcmVzZW50aW5nIHRoZSByZWdpb24gYW5kIGl0cyBnZW9tZXRyaWVzLlxuICovXG5cbmV4cG9ydCBjbGFzcyBJbWFnZVJlZ2lvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFJlc291cmNlfSByZWdpb25SZXNvdXJjZSBhIHJlc291cmNlIG9mIHR5cGUgUmVnaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UmVhZEdlb21WYWx1ZVtdfVxuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBncm91cCBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9ncm91cHMnO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBhbGwgZ3JvdXBzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cFtdPlxuICAgICAqL1xuICAgIGdldEFsbEdyb3VwcygpOiBPYnNlcnZhYmxlPEdyb3VwW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGdyb3VwIG9iamVjdCAoZmlsdGVyIGJ5IElSSSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cD5cbiAgICAgKi9cbiAgICBnZXRHcm91cEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cD4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBSZXNwb25zZSkuZ3JvdXApLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IGxpc3RzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vbGlzdHMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV1cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPlxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGdldExpc3QobGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3QgaW5mbyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdEluZm8obGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgbm9kZSBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0Q3JlYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdD5cbiAgICAgKi9cbiAgICBjcmVhdGVMaXN0KHBheWxvYWQ6IExpc3RDcmVhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRWRpdCBsaXN0IGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RJbmZvVXBkYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgdXBkYXRlTGlzdEluZm8ocGF5bG9hZDogTGlzdEluZm9VcGRhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWQubGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFByb2plY3QsIFByb2plY3RNZW1iZXJzUmVzcG9uc2UsIFByb2plY3RSZXNwb25zZSwgUHJvamVjdHNSZXNwb25zZSwgVXNlciB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcHJvamVjdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHByb2plY3RzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0W10+XG4gICAgICovXG4gICAgZ2V0QWxsUHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3Byb2plY3RzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0c1Jlc3BvbnNlKS5wcm9qZWN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lIHNob3J0IG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL3Nob3J0bmFtZS8nICsgc2hvcnRuYW1lO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9zaG9ydGNvZGUvJyArIHNob3J0Y29kZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCByZXRyaWV2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgcHJvamVjdCBpZCAoaXJpKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkgKyAnL21lbWJlcnMnIDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0bmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWUgc2hvcnQgbmFtZSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9zaG9ydG5hbWUvJyArIHNob3J0bmFtZSArICcvbWVtYmVycycgO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRjb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL3Nob3J0Y29kZS8nICsgc2hvcnRjb2RlICsgJy9tZW1iZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgbWVtYmVyIHJldHJpZXZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICAgcHJpdmF0ZSBnZXRQcm9qZWN0TWVtYmVycyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RNZW1iZXJzUmVzcG9uc2UpLm1lbWJlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGNyZWF0ZVByb2plY3QoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVkaXQgcHJvamVjdCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgdXBkYXRlUHJvamVjdChpcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgcHJvamVjdCAoaWYgaXQgd2FzIGRlbGV0ZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGFjdGl2YXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIChzZXQgaW5hY3RpdmUpIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZGVsZXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsIEdyb3VwLFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHVzZXMgdGhlIEtub3JhIGFkbWluIEFQSSBhbmQgaGFuZGxlcyBhbGwgdXNlciBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0QWxsVXNlcnMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3VzZXJzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2Vyc1Jlc3BvbnNlKS51c2VycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmkuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZywgaWRlbnRpZmllclR5cGU6IFN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgaWRlbnRpZmllclR5cGUgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSBJUklcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihpcmksICdpcmknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSBlbWFpbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKGVtYWlsLCAnZW1haWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcih1c2VybmFtZSwgJ3VzZXJuYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBncm91cHMsIHdoZXJlIHRoZSB1c2VyIGlzIG1lbWJlciBvZlxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJJcmlcbiAgICAgKi9cbiAgICBnZXRVc2Vyc0dyb3VwTWVtYmVyc2hpcHModXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cFtdPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgdXNlcklyaSArICcvZ3JvdXAtbWVtYmVyc2hpcHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL3Byb2plY3QtbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvcHJvamVjdC1tZW1iZXJzaGlwcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9wcm9qZWN0LWFkbWluLW1lbWJlcnNoaXBzLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHVzZXIgb2YgYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL3Byb2plY3QtYWRtaW4tbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB1c2VyIHRvIHByb2plY3Qgc3BlY2lmaWMgZ3JvdXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHBhcmFtIGdyb3VwSXJpXG4gICAgICovXG4gICAgYWRkVXNlclRvR3JvdXAodXNlcklyaTogc3RyaW5nLCBncm91cElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9ncm91cC1tZW1iZXJzaGlwcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdyb3VwSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB1c2VyIGZyb20gcHJvamVjdCBzcGVjaWZpYyBncm91cFxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJJcmlcbiAgICAgKiBAcGFyYW0gZ3JvdXBJcmlcbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbUdyb3VwKHVzZXJJcmk6IHN0cmluZywgZ3JvdXBJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvZ3JvdXAtbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChncm91cElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICduZXdTeXN0ZW1BZG1pbk1lbWJlcnNoaXBTdGF0dXMnOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlclN5c3RlbUFkbWluKHVzZXJJcmksIGRhdGEpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHVzZXIgZnJvbSB0aGUgYWRtaW4gc3lzdGVtLlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAnbmV3U3lzdGVtQWRtaW5NZW1iZXJzaGlwU3RhdHVzJzogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyU3lzdGVtQWRtaW4odXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHVzZXIgc3lzdGVtIGFkbWluIG1lbWJlcnNoaXBcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZVVzZXJTeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvU3lzdGVtQWRtaW4nO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWN0aXZhdGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvU3RhdHVzJztcblxuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgb3duIHBhc3N3b3JkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlT3duUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9QYXNzd29yZCc7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiBvbGRQYXNzd29yZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgcGFzc3dvcmQgb2YgYW5vdGhlciB1c2VyIChub3Qgb3duKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXJzUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCByZXF1ZXN0ZXJQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9QYXNzd29yZCc7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYmFzaWMgdXNlciBpbmZvcm1hdGlvbjogZ2l2ZW4gbmFtZSwgZmFtaWx5IG5hbWVcbiAgICAgKiBAcGFyYW0gdXNlcklyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlQmFzaWNVc2VySW5mb3JtYXRpb24odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL0Jhc2ljVXNlckluZm9ybWF0aW9uJztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAvIGRlYWN0aXZhdGUgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBzZXRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh7IHZhcjogbGFuZyB9KTtcbiAgfVxuICBnZXRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWdUb2tlbiB9IGZyb20gJy4uLy4uL2NvcmUubW9kdWxlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTXNnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuICB9XG5cbiAgLyoqXG4gICogdGhpcyBtZXRob2QgZ2V0IHRoZSBzdGF0dXMgbWVzc2FnZXMgZnJvbSB0aGUgc3RhdHVzTXNnLmpzb24gZmlsZVxuICAqIHdoaWNoIGFyZSBkZWZpbmVkIGhlcmU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfSFRUUF9zdGF0dXNfY29kZXNcbiAgKiBhbmQgaGVyZTogaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvcmVmX2h0dHBtZXNzYWdlcy5hc3BcbiAgKlxuICAqL1xuICBnZXRTdGF0dXNNc2coKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcHAgKyAnL2Fzc2V0cy9pMThuL3N0YXR1c01zZy5qc29uJylcbiAgICAgIC5waXBlKG1hcChcbiAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBDb3VudFF1ZXJ5UmVzdWx0LFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIFJlYWRCb29sZWFuVmFsdWUsXG4gICAgUmVhZENvbG9yVmFsdWUsXG4gICAgUmVhZERhdGVWYWx1ZSxcbiAgICBSZWFkRGVjaW1hbFZhbHVlLFxuICAgIFJlYWRHZW9tVmFsdWUsXG4gICAgUmVhZEludGVnZXJWYWx1ZSxcbiAgICBSZWFkSW50ZXJ2YWxWYWx1ZSxcbiAgICBSZWFkTGlua1ZhbHVlLFxuICAgIFJlYWRMaXN0VmFsdWUsXG4gICAgUmVhZFByb3BlcnRpZXMsXG4gICAgUmVhZFByb3BlcnR5SXRlbSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0RmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0VmFsdWVBc0h0bWwsXG4gICAgUmVhZFRleHRWYWx1ZUFzU3RyaW5nLFxuICAgIFJlYWRUZXh0VmFsdWVBc1htbCxcbiAgICBSZWFkVXJpVmFsdWUsXG4gICAgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayxcbiAgICBVdGlsc1xufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIENvbnRhaW5zIG1ldGhvZHMgdG8gY29udmVydCBKU09OLUxEIHJlcHJlc2VudGluZyByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMgdG8gY2xhc3Nlcy5cbiAqIFRoZXNlIG1ldGhvZHMgd29ya3Mgb25seSBmb3IgaW5zdGFuY2VzIG9mIHJlc291cmNlcyBhbmQgcHJvcGVydGllcywgbm90IGZvciBvbnRvbG9naWVzIChkYXRhIG1vZGVsKS5cbiAqL1xuZXhwb3J0IG1vZHVsZSBDb252ZXJ0SlNPTkxEIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byBhIGZpbHRlciB1c2VkIG9uIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICogc29ydGluZyBvdXQgYWxsIG5vbiB2YWx1ZSBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgKlxuICAgICAqIEdldHMgYWxsIHByb3BlcnR5IG5hbWVzIHRoYXQgcmVmZXIgdG8gdmFsdWUgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wTmFtZSB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiAtIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuQXJrVXJsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMudmVyc2lvbkFya1VybDtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIG1vdmluZ0ltYWdlRmlsZVZhbHVlIGFuZCB0aGUgb3RoZXJzIGhlcmUuLi5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10gKyAnKCcgKyBwcm9wVmFsdWVbJ0BpZCddICsgJyknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVNwZWNpZmljUHJvcDtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgW1tSZWFkUHJvcGVydGllc11dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIFJlYWRQcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRQcm9wZXJ0aWVzIHtcblxuICAgICAgICAvLyBKU09OLUxEIHJlcHJlc2VudGluZyBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICAvLyB0ZXh0IHZhbHVlcyBtYXkgY29udGFpbiBzdGFuZG9mZiBsaW5rc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQ6IE9iamVjdCA9IHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWVdO1xuXG4gICAgICAgIC8vIHRvIGJlIHBvcHVsYXRlZCB3aXRoIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdID0gW107XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0YW5kb2ZmIGxpbmsgdmFsdWUgSlNPTi1MRCBvYmplY3QgdG8gYSBSZWFkTGlua1ZhbHVlXG4gICAgICAgIC8vIGluIG9yZGVyIHBvcHVsYXRlIHRoZSBjb2xsZWN0aW9uIHdpdGggYWxsIHRoZSBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGlua0pTT05MRCBvZiBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbDogUmVhZExpbmtWYWx1ZSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbCA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIHRoZSBnaXZlbiBwcm9wZXJ0eSBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVzOiBBcnJheTxSZWFkUHJvcGVydHlJdGVtPiA9IFtdO1xuXG4gICAgICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgdmFsdWVzIG9yIGp1c3Qgb25lIHZhbHVlIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBhbiBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMgaXMgZ2l2ZW4sIGl0ZXJhdGUgb3ZlciBpdFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcFZhbHVlIG9mIHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocHJvcFZhbHVlLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgcHJvcGVydGllcyBvYmplY3RcbiAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcFZhbHVlcztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYW4gQVBJIHJlc3BvbnNlIGluIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzIGludG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgcmVzb3VyY2Ugb3IgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlc1NlcXVlbmNlIC0gc2VxdWVuY2Ugb2YgcmVhZCByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4gPSBbXTtcbiAgICAgICAgbGV0IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSByZXNvdXJjZXNHcmFwaC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBhbnN3ZXIsIG5vIHJlc291cmNlcyBnaXZlblxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UocmVzb3VyY2VzLCBudW1iZXJPZlJlc291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyBhbGwgdGhlIHR5cGVzIChjbGFzc2VzKSBvZiByZWZlcnJlZCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIHJlc291cmNlIChmcm9tIGl0cyBsaW5raW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIEpTT04tTEQgZGVzY3JpYmluZyBvbmUgcmVzb3VyY2UuXG4gICAgICogQHJldHVybiBzdHJpbmdbXSAtIGFuIEFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMgKGluY2x1ZGluZyBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgLy8gc2V2ZXJhbCB2YWx1ZXMgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZWZlcnJlZFJlcyBvZiByZXNvdXJjZUpTT05MRFtwcm9wXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZSBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzb3VyY2UgdHlwZXMgKGNsYXNzZXMpIGZyb20gYSBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzICh3aXRob3V0IGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG4gICAgICAgIGxldCByZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCBjbGFzcyBvZiB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc2VzLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGEgSlNPTi1MRCByZXNwb25zZSB0byBhIGNvdW50IHF1ZXJ5IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY291bnRRdWVyeUpTT05MRFxuICAgICAqIEByZXR1cm5zIHtDb3VudFF1ZXJ5UmVzdWx0fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTEQ6IG9iamVjdCkge1xuICAgICAgICByZXR1cm4gbmV3IENvdW50UXVlcnlSZXN1bHQoY291bnRRdWVyeUpTT05MRFtLbm9yYUNvbnN0YW50cy5zY2hlbWFOdW1iZXJPZkl0ZW1zXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCwgS3VpQ29yZUNvbmZpZywgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDb252ZXJ0SlNPTkxEIH0gZnJvbSAnLi9jb252ZXJ0LWpzb25sZCc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi8uLi9jb3JlLm1vZHVsZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UgYXMgYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIGdldFJlYWRSZXNvdXJjZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIG9mIGFuIEFwaVNlcnZpY2VFcnJvclxuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBwb3N0LCBwdXQsIGRlbGV0ZVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWdUb2tlbiB9IGZyb20gJy4uLy4uL2NvcmUubW9kdWxlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIENvdW50UXVlcnlSZXN1bHQsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFBlcmZvcm1zIHNlYXJjaGVzIChmdWxsdGV4dCBvciBleHRlbmRlZCkgYW5kIHNlYXJjaCBjb3VudCBxdWVyaWVzIGludG8gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX29udG9sb2d5Q2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgSlNPTi1MRCBvYmplY3QgdG8gYSBgUmVhZFJlc29yY2VTZXF1ZW5jZWAuXG4gICAgICogVG8gYmUgcGFzc2VkIGFzIGEgZnVuY3Rpb24gcG9pbnRlciAoYXJyb3cgbm90YXRpb24gcmVxdWlyZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlUmVzcG9uc2VcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2U6IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiA9IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IHtcbiAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2goc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ29mZnNldCcsIG9mZnNldC50b1N0cmluZygpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtLCBodHRwUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgcmVzOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIHNlYXJjaFRlcm0sIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0YCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnkoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkgYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2goZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIGdyYXZzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeShncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeSBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgc2VhcmNoQnlMYWJlbFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc291cmNlQ2xhc3NJUkldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb2plY3RJcmldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSVJJICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Jlc291cmNlQ2xhc3MnLCByZXNvdXJjZUNsYXNzSVJJKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Byb2plY3QnLCBwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBHZXQoKSBleHBlY3RzIG9ubHkgb25lIGFyZ3VtZW50LCBub3QgMlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBodHRwUGFyYW1zKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwgYW5kIHR1cm5zIHRoZSByZXN1bHRzIGluIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNvdXJjZUNsYXNzSVJJXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgc2VhcmNoQnlMYWJlbFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUmVzb3VyY2VDbGFzcycsIHJlc291cmNlQ2xhc3NJUkkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHByb2plY3RJcmkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBodHRwUGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBpbmNvbWluZyBpbmZvcm1hdGlvbiAocmVnaW9ucywgbGlua3MsIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMpIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEluY29taW5nU2VydmljZSBleHRlbmRzIFNlYXJjaFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyByZWdpb25zIGZvciBhIHBhcnRpY3VsYXIgcmVzb3VyY2UuXG4gICAgKlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSVJJIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIEluY29taW5nIHJlZ2lvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgKi9cbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMocmVzb3VyY2VJUkk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9yZWdpb24ga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxufSBXSEVSRSB7XG4/cmVnaW9uIGEga25vcmEtYXBpOlJlZ2lvbiAuXG4/cmVnaW9uIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlSSX0+IC5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSVJJfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5rbm9yYS1hcGk6aGFzR2VvbWV0cnkga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkdlb20gLlxuXG4/Z2VvbSBhIGtub3JhLWFwaTpHZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5rbm9yYS1hcGk6aGFzQ29tbWVudCBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6c3RyaW5nIC5cblxuP2NvbW1lbnQgYSB4c2Q6c3RyaW5nIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbmtub3JhLWFwaTpoYXNDb2xvciBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6Q29sb3IgLlxuXG4/Y29sb3IgYSBrbm9yYS1hcGk6Q29sb3IgLlxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3BhcnFsUXVlcnlTdHIgJywgc3BhcnFsUXVlcnlTdHIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UsIGlmIGFueS5cbiAgICAgKiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGxpbmsgdG8gdGhlIGdpdmVuIHJlc291cmNlIHZpYSBrbm9yYS1iYXNlOmlzUGFydE9mLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zRm9yQ29tcG91bmRSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3BhZ2Uga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxufSBXSEVSRSB7XG5cbj9wYWdlIGEga25vcmEtYXBpOlN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiAuXG4/cGFnZSBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cbmtub3JhLWFwaTpzZXFudW0ga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOmludGVnZXIgLlxuXG4/c2VxbnVtIGEgeHNkOmludGVnZXIgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxua25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpGaWxlIC5cblxuP2ZpbGUgYSBrbm9yYS1hcGk6RmlsZSAuXG5cbn0gT1JERVIgQlkgP3NlcW51bVxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIElyaSBidXQgaW5jb21pbmcgcmVnaW9ucyBhbmQgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIGluY29taW5nIGxpbmtzIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rc0ZvclJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/aW5jb21pbmdSZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxufSBXSEVSRSB7XG5cbj9pbmNvbWluZ1JlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUHJvcCBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGdlbmVyYXRlR3JhdnNlYXJjaCBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeS5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSBvZmZzZXRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGEgR3JhdnNlYXJjaCBxdWVyeSBzdHJpbmcuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5zIGZhbHNlIGlmIG5vdCBzZXQgY29ycmVjdGx5IChpbml0IHN0YXRlKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2VuZXJhdGVHcmF2c2VhcmNoOiAob2Zmc2V0OiBudW1iZXIpID0+IHN0cmluZyB8IGJvb2xlYW4pIHtcblxuICAgIH1cblxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUZW1wb3JhcmlseSBzdG9yZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFyYW1zU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50U2VhcmNoUGFyYW1zO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGluaXQgd2l0aCBhIGR1bW15IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBmYWxzZVxuICAgICAgICAvLyBpZiB0aGUgYXBwbGljYXRpb24gaXMgcmVsb2FkZWQsIHRoaXMgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFeHRlbmRlZFNlYXJjaFBhcmFtcz4obmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKChvZmZzZXQ6IG51bWJlcikgPT4gZmFsc2UpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kZWRTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBjaGFuZ2VTZWFyY2hQYXJhbXNNc2coc2VhcmNoUGFyYW1zOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLm5leHQoc2VhcmNoUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWFyY2ggcGFyYW1zIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEV4dGVuZGVkU2VhcmNoUGFyYW1zIC0gc2VhcmNoIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBnZXRTZWFyY2hQYXJhbXMoKTogRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5nZXRWYWx1ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIEdyYXZTZWFyY2ggcXVlcmllcyBmcm9tIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIE1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lcy5cbiAgICAgKiBVc2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlcixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIENvbnZlcnRzIGEgY29tcGxleCB0eXBlIElyaSB0byBhIHNpbXBsZSB0eXBlIElyaS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleFR5cGUgdGhlIElyaSBvZiBhIHZhbHVlIHR5cGUgKGtub3JhLWFwaSBjb21wbGV4KS5cbiAgICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSBjb3JyZXNwb25kaW5nIElyaSBvZiB0aGUgc2ltcGxlIHR5cGUgKGtub3JhLWFwaSBzaW1wbGUpLlxuICAgICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUoY29tcGxleFR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgY29uc3Qgc2ltcGxlVHlwZTogc3RyaW5nID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW2NvbXBsZXhUeXBlXTtcblxuICAgICAgICBpZiAoc2ltcGxlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yKGBjb21wbGV4IHR5cGUgJHtjb21wbGV4VHlwZX0gY291bGQgbm90IGJlIGNvbnZlcnRlZCB0byBzaW1wbGUgdHlwZS5gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5V2l0aFZhbHVlW119IHByb3BlcnRpZXMgdGhlIHByb3BlcnRpZXMgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWFpblJlc291cmNlQ2xhc3NPcHRpb25dIHRoZSBjbGFzcyBvZiB0aGUgbWFpbiByZXNvdXJjZSwgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICovXG4gICAgY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXM6IFByb3BlcnR5V2l0aFZhbHVlW10sIG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uPzogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgcmVzb3VyY2Ugc2VhcmNoZWQgZm9yXG4gICAgICAgIGxldCBtYWluUmVzb3VyY2VDbGFzcyA9ICcnO1xuXG4gICAgICAgIC8vIGlmIGdpdmVuLCBjcmVhdGUgdGhlIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgbWFpbiByZXNvdXJjZVxuICAgICAgICBpZiAobWFpblJlc291cmNlQ2xhc3NPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFpblJlc291cmNlQ2xhc3MgPSBgP21haW5SZXMgYSA8JHtVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUobWFpblJlc291cmNlQ2xhc3NPcHRpb24pfT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgRmlsdGVycyBhbmQgdHlwZSBhbm5vdGF0aW9ucyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wSXJpU2ltcGxlID0gVXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKHByb3BXaXRoVmFsLnByb3BlcnR5LmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaW1wbGVUeXBlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IHRoaXMuY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKHByb3BXaXRoVmFsLnByb3BlcnR5Lm9iamVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5yZXNvdXJjZVNpbXBsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50OiBzdHJpbmcgPSBgP21haW5SZXMgPCR7cHJvcElyaVNpbXBsZX0+ICR7cHJvcFZhbHVlfSAuYDtcblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVHlwZUFubm90YXRpb24gPSBgPCR7cHJvcElyaVNpbXBsZX0+IGtub3JhLWFwaTpvYmplY3RUeXBlIDwke3NpbXBsZVR5cGV9PiAuYDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVBbm5vdGF0aW9uID0gYCR7cHJvcFZhbHVlfSBhIDwke3NpbXBsZVR5cGV9PiAuYDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSB0aGF0IGhhcyB0byBiZSB3cmFwcGVkIGluIGEgRklMVEVSIE5PVCBFWElTVFMgKGNvbXBhcmlzb24gb3BlcmF0b3IgTk9UX0VRVUFMUykgdG8gbmVnYXRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNsdWRlIHN0YXRlbWVudCBpbiByZXN1bHRzLCBiZWNhdXNlIHRoZSBxdWVyeSBjaGVja3MgZm9yIHRoZSBhYnNlbmNlIG9mIHRoaXMgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBGSUxURVIgTk9UIEVYSVNUUyB7XG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxufWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgc3RhdGVtZW50IHNob3VsZCBiZSByZXR1cm5lZCByZXR1cm5lZCBpbiByZXN1bHRzIChCb29sZWFuIGZsYWcgZnJvbSBjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RhdGVtZW50cy5wdXNoKHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGZpbHRlciBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSBhIEZJTFRFUiBpZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRVhJU1RTIGFuZCBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTGlrZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSByZWdleCBmdW5jdGlvbiBmb3IgTElLRVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiByZWdleCgke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9LCBcImlcIilgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdNYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjb250YWlucyBmdW5jdGlvbiBmb3IgTUFUQ0hcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgPCR7S25vcmFDb25zdGFudHMubWF0Y2hGdW5jdGlvbn0+KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIoJHtwcm9wVmFsdWV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCB2YWx1ZSBpcyBhIHNvcnQgY3JpdGVyaW9uXG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLmlzU29ydENyaXRlcmlvbikgb3JkZXJCeUNyaXRlcmlhLnB1c2gocHJvcFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnR9XG4ke2ZpbHRlcn1cbmA7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5U3RhdGVtZW50ID0gJyc7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlDcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckJ5U3RhdGVtZW50ID0gYFxuT1JERVIgQlkgJHtvcmRlckJ5Q3JpdGVyaWEuam9pbignICcpfVxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRlbXBsYXRlIG9mIHRoZSBLbmFyUUwgcXVlcnkgd2l0aCBkeW5hbWljIGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaFRlbXBsYXRlID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuQ09OU1RSVUNUIHtcblxuP21haW5SZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4ke3JldHVyblN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbn0gV0hFUkUge1xuXG4/bWFpblJlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbiR7bWFpblJlc291cmNlQ2xhc3N9XG5cbiR7cHJvcHMuam9pbignJyl9XG5cbn1cbiR7b3JkZXJCeVN0YXRlbWVudH1gO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEtuYXJRTCBxdWVyeVxuICAgICAgICBjb25zdCBvZmZzZXRUZW1wbGF0ZSA9IGBcbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIHNhbWUgS25hclFMIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQgPSAobG9jYWxPZmZzZXQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbk9GRlNFVCAke2xvY2FsT2Zmc2V0fVxuYDtcblxuICAgICAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEtuYXJRTCBxdWVyeSBjYW4gYmUgY3JlYXRlZCB3aXRoIGFuIGluY3JlYXNlZCBvZmZzZXRcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuY2hhbmdlU2VhcmNoUGFyYW1zTXNnKG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcyhnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGtuYXJxbFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcsIFJkZkRhdGFPYmplY3QsIFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vLi4vY29yZS5tb2R1bGUnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBjb250ZW50IG9mIHRoZSB0cmlwbGVzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZGZEYXRhT2JqZWN0c1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8c3RyaW5nPlxuICAgICAqL1xuICByZXNldFRyaXBsZXN0b3JlQ29udGVudChyZGZEYXRhT2JqZWN0czogUmRmRGF0YU9iamVjdFtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlPih0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3N0b3JlL1Jlc2V0VHJpcGxlc3RvcmVDb250ZW50JywgcmRmRGF0YU9iamVjdHMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gQ2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gU2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApKTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2ljT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogcmV0dXJucyBvdXIgbGlzdCBvZiBhIGJhc2ljIG9udG9sb2d5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAvLyBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgICBsZXQgdXJsID0gZW52aXJvbm1lbnQudXJsO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICAvLyB9XG4gIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcHA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nKTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VUeXBlc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiBHZXQgYWxsIHJlc291cmNlIHR5cGVzIGRlZmluZWQgYnkgdGhlIHZvY2FidWxhcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIFZvY2FidWxhcnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAgICovXG4gIGdldFJlc291cmNlVHlwZXNCeVZvYyhpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXM/dm9jYWJ1bGFyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHJlc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgcmVzb3VyY2UgdHlwZSBpcmlcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAqL1xuICBnZXRSZXNvdXJjZVR5cGUoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuXG4gIC8vIHB1dFJlc291cmNlVHlwZShpcmkpXG5cbn1cbiIsIi8qKlxuICogbWFpbiBhcGkgc2VydmljZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIGFkbWluIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2dyb3Vwcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGlzdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3Byb2plY3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi91c2Vycy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGFuZ3VhZ2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3N0YXR1cy1tc2cuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIHYyIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvY29udmVydC1qc29ubGQnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9pbmNvbWluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvZ3Jhdi1zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3N0b3JlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZSc7XG4iLCJpbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEgfSBmcm9tICcuL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsIFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIGNvbXBhcmlzb24gb3BlcmF0b3IuXG4gKiBUaGlzIGludGVyZmFjZSBpcyBpbXBsZW1lbnRlZCBmb3IgdGhlIHN1cHBvcnRlZCBjb21wYXJpc29uIG9wZXJhdG9ycy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgLy8gdHlwZSBvZiBjb21wYXJpc29uIG9wZXJhdG9yXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLy8gdGhlIGxhYmVsIG9mIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIHRvIGJlIHByZXNlbnRlZCB0byB0aGUgdXNlci5cbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLy8gcmV0dXJucyB0aGUgY2xhc3MgbmFtZSB3aGVuIGNhbGxlZCBvbiBhbiBpbnN0YW5jZVxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTm90RXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTm90RXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4aXN0cyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0V4aXN0cyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlrZSBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGlrZSc7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNYXRjaCBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdNYXRjaCc7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgYSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCBhIHZhbHVlIGxpdGVyYWwgb3IgYW4gSVJJLlxuICogSW4gY2FzZSB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyAnRXhpc3RzJywgbm8gdmFsdWUgaXMgZ2l2ZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb21wYXJpc29uT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvciwgcmVhZG9ubHkgdmFsdWU/OiBWYWx1ZSkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgdmFsdWU6IGFuIElSSSBvciBhIGxpdGVyYWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHZhbHVlIGludG8gYSBTUEFSUUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZztcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSdzIHZhbHVlIGFzIGEgbGl0ZXJhbCB3aXRoIHRoZSBpbmRpY2F0aW9uIG9mIGl0cyB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgVmFsdWVMaXRlcmFsIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtWYWx1ZUxpdGVyYWxdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIHRoZSBsaXRlcmFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgKG1ha2luZyB1c2Ugb2YgeHNkKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcpIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0eXBlIGFubm90YXRlZCB2YWx1ZSBsaXRlcmFsIHRvIGJlIHVzZWQgaW4gYSBTUEFSUUwgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IGxpdGVyYWxUeXBlOiBzdHJpbmc7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBLbm9yYSBzY2hlbWEgY29udmVyc2lvbiBpcyBuZWNlc3NhcnksIGUuZy4sIGtub3JhLWFwaTpkYXRlVmFsdWUgKGNvbXBsZXgpIHRvIGtub3JhLWFwaTpkYXRlIChzaW1wbGUpLlxuICAgICAgICAvLyB4c2QgdHlwZXMgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gICAgICAgIGlmIChzY2hlbWEgPT09IEtub3JhU2NoZW1hLnNpbXBsZSAmJiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIHNpbXBsZSBzY2hlbWFcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkbyBub3QgY29udmVydFxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiXl48JHtsaXRlcmFsVHlwZX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIElSSS5cbiAqL1xuZXhwb3J0IGNsYXNzIElSSSBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYW4gW0lSSV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHRoZSBJUkkgb2YgYSByZXNvdXJjZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpcmk6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIElSSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBpbnN0YW5jZSBJcmkgYW5kIGRvZXMgbm90IGhhdmUgdG8gYmUgY29udmVydGVkLlxuICAgICAgICByZXR1cm4gYDwke3RoaXMuaXJpfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSB2YWx1ZS5cbiAqIFRoaXMgaW50ZXJmYWNlIGhhcyB0byBiZSBpbXBsZW1lbnRlZCBmb3IgYWxsIHZhbHVlIHR5cGVzICh2YWx1ZSBjb21wb25lbnQgY2xhc3NlcykuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZX0uXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogVmFsdWU7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHksIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciwgYW5kIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXaXRoVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtQcm9wZXJ0eVdpdGhWYWx1ZV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eSB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWV9IHZhbHVlTGl0ZXJhbCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpc1NvcnRDcml0ZXJpb24gaW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBpcyB1c2VkIGFzIGEgc29ydCBjcml0ZXJpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBQcm9wZXJ0eSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWVMaXRlcmFsOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICAgICAgcmVhZG9ubHkgaXNTb3J0Q3JpdGVyaW9uOiBCb29sZWFuKSB7XG4gICAgfVxuXG59XG5cbi8qKlxuICogYSBsaXN0LCB3aGljaCBpcyB1c2VkIGluIHRoZSBtYXQtYXV0b2NvbXBsZXRlIGZvcm0gZmllbGRcbiAqIGNvbnRhaW5zIG9iamVjdHMgd2l0aCBpZCBhbmQgbmFtZS4gdGhlIGlkIGlzIHVzdWFsIHRoZSBpcmlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRvY29tcGxldGVJdGVtIHtcbiAgICBpcmk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy8nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtQcm9wZXJ0eSBhcyDDicK1YX0gZnJvbSAnLi9saWIvc2VydmljZXMnOyJdLCJuYW1lcyI6WyJJbmplY3Rpb25Ub2tlbiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsInRzbGliXzEuX19kZWNvcmF0ZSIsIkpzb25Qcm9wZXJ0eSIsIkpzb25PYmplY3QiLCJKc29uQ29udmVydCIsIk9wZXJhdGlvbk1vZGUiLCJWYWx1ZUNoZWNraW5nTW9kZSIsIktub3JhU2NoZW1hIiwiUHJlY2lzaW9uIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwibWFwIiwiY2F0Y2hFcnJvciIsImZyb20iLCJ0aHJvd0Vycm9yIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJJbmplY3QiLCJPYnNlcnZhYmxlIiwianNvbmxkIiwiQ2FyZGluYWxpdHlPY2N1cnJlbmNlIiwibWVyZ2VNYXAiLCJvZiIsImZvcmtKb2luIiwiU3ViamVjdCIsIkNvbnZlcnRKU09OTEQiLCJIdHRwUGFyYW1zIiwiQmVoYXZpb3JTdWJqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFLYSxrQkFBa0IsR0FBRyxJQUFJQSxpQkFBYyxDQUFnQix3Q0FBd0MsQ0FBQyxDQUFDO0FBRTlHO1FBQUE7U0EwQkM7Ozs7OztRQVZVLHFCQUFPLEdBQWQsVUFBZSxNQUFxQjs7WUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRCxPQUFPO2dCQUNILFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUU7b0JBQ1AsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztpQkFDbEQ7YUFDSixDQUFDO1NBQ0w7O29CQXpCSkMsV0FBUSxTQUFDO3dCQUNOLE9BQU8sRUFBRTs0QkFDTEMsbUJBQVk7NEJBQ1pDLG1CQUFnQjt5QkFDbkI7d0JBQ0QsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDTEEsbUJBQWdCO3lCQUNuQjtxQkFDSjs7UUFpQkQsb0JBQUM7S0FBQTs7SUNqQ0Q7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLGFBQWdCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFNBQVMsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBRUQsYUFxQmdCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ3BELElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3SCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVTtZQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztBQUVELGFBSWdCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsYUFBYTtRQUNqRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVTtZQUFFLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbkksQ0FBQztBQUVELGFBeUNnQixRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNDO1NBQ0osQ0FBQztJQUNOLENBQUM7O0lDakhEOzs7Ozs7O1FBTUE7Ozs7O1lBUVcsU0FBSSxHQUFXLFNBQVMsQ0FBQzs7Ozs7WUFPekIsUUFBRyxHQUFXLFNBQVMsQ0FBQzs7Ozs7WUFPeEIsUUFBRyxHQUFXLFNBQVMsQ0FBQzs7Ozs7WUFPeEIsVUFBSyxHQUFXLFNBQVMsQ0FBQztTQUVwQztRQXZCR0M7WUFEQ0MsNEJBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzttREFDRztRQU9oQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztrREFDRztRQU8vQkQ7WUFEQ0MsNEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztrREFDRztRQU8vQkQ7WUFEQ0MsNEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztvREFDRztRQTVCeEIsYUFBYTtZQUR6QkMsMEJBQVUsQ0FBQyxlQUFlLENBQUM7V0FDZixhQUFhLENBOEJ6QjtRQUFELG9CQUFDO0tBQUE7O0lDcENEOzs7QUFHQTtRQUFBOzs7O1lBT0ksV0FBTSxHQUFHLENBQUMsQ0FBQzs7OztZQUtYLGVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7WUFLaEIsUUFBRyxHQUFHLEVBQUUsQ0FBQztTQW9CWjs7Ozs7OztRQU5HLGtDQUFPLEdBQVAsVUFBUSxXQUE0Qjs7WUFFaEMsT0FBTyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDM0U7UUFoQ2MsNEJBQVcsR0FBZ0IsSUFBSUMsMkJBQVcsQ0FBQ0MsNkJBQWEsQ0FBQyxNQUFNLEVBQUVDLGlDQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBbUNsSCx1QkFBQztLQUFBOztJQzFDRDs7O0FBR0E7UUFBQTs7OztZQUtJLFdBQU0sR0FBRyxDQUFDLENBQUM7Ozs7WUFLWCxlQUFVLEdBQUcsRUFBRSxDQUFDOzs7O1lBS2hCLFFBQUcsR0FBRyxFQUFFLENBQUM7Ozs7WUFLVCxjQUFTLEdBQUcsRUFBRSxDQUFDO1NBRWxCO1FBQUQsc0JBQUM7SUFBRCxDQUFDOzs7UUMxQkQ7U0FnTkM7UUE5TWlCLHVCQUFRLEdBQVcseUNBQXlDLENBQUM7UUFDN0QsNEJBQWEsR0FBVyxHQUFHLENBQUM7UUFFNUIsZ0NBQWlCLEdBQVcsK0JBQStCLENBQUM7UUFDNUQsd0JBQVMsR0FBVyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDO1FBRXJFLCtCQUFnQixHQUFXLGNBQWMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkUsa0NBQW1CLEdBQVcsY0FBYyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDeEUsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7UUFDMUUsb0NBQXFCLEdBQVcsY0FBYyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUU1RSw0Q0FBNkIsR0FBVyxjQUFjLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3ZHLG1DQUFvQixHQUFXLGNBQWMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFFckcsZ0NBQWlCLEdBQVcsNkNBQTZDLENBQUM7UUFFMUUsNkJBQWMsR0FBVyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO1FBRXhFLCtCQUFnQixHQUFXLDJDQUEyQyxDQUFDO1FBRXZFLHVCQUFRLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLFVBQVUsQ0FBQztRQUM3RSx3QkFBUyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxXQUFXLENBQUM7UUFDL0UsdUJBQVEsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsVUFBVSxDQUFDO1FBQzdFLDJCQUFZLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztRQUNyRix1QkFBUSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxVQUFVLENBQUM7UUFDN0UsMkJBQVksR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsY0FBYyxDQUFDO1FBQ3JGLHdCQUFTLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLFdBQVcsQ0FBQztRQUMvRSx5QkFBVSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxZQUFZLENBQUM7UUFDakYsd0JBQVMsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsV0FBVyxDQUFDO1FBQy9FLHdCQUFTLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLFdBQVcsQ0FBQztRQUMvRSw0QkFBYSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxlQUFlLENBQUM7UUFDdkYsd0JBQVMsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsV0FBVyxDQUFDO1FBQy9FLDJCQUFZLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztRQUNyRix3QkFBUyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxXQUFXLENBQUM7UUFDL0UsNkJBQWMsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekYsMkJBQVksR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsY0FBYyxDQUFDO1FBQ3JGLGdDQUFpQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvRixrQ0FBbUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcscUJBQXFCLENBQUM7UUFDbkcsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO1FBQ3JHLDRCQUFhLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGVBQWUsQ0FBQztRQUN2Riw4QkFBZSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzRiwyQkFBWSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxjQUFjLENBQUM7UUFDckYsZ0NBQWlCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLG1CQUFtQixDQUFDO1FBQy9GLG1DQUFvQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRyx1QkFBUSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxVQUFVLENBQUM7UUFFN0UscUJBQU0sR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsUUFBUSxDQUFDO1FBQ3pFLDRCQUFhLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGVBQWUsQ0FBQztRQUN2Rix5QkFBVSxHQUFHLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxZQUFZLENBQUM7UUFFekUsMkJBQVksR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsY0FBYyxDQUFDO1FBQ3JGLHlCQUFVLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLFlBQVksQ0FBQztRQUNqRiw2QkFBYyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6RixrQ0FBbUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcscUJBQXFCLENBQUM7UUFDbkcsMEJBQVcsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsYUFBYSxDQUFDO1FBRW5GLHlCQUFVLEdBQVcsd0JBQXdCLENBQUM7UUFDOUMsa0NBQW1CLEdBQVcsaUNBQWlDLENBQUM7UUFDaEUsb0NBQXFCLEdBQVcsbUNBQW1DLENBQUM7UUFHcEUsMEJBQVcsR0FBVyxxREFBcUQsQ0FBQztRQUM1RSx5QkFBVSxHQUFXLHNDQUFzQyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDM0Ysd0JBQVMsR0FBVyxjQUFjLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUN4RCwwQkFBVyxHQUFXLGNBQWMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVELDZCQUFjLEdBQVcsY0FBYyxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7UUFDbEUsNEJBQWEsR0FBVyxjQUFjLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQztRQUVwRSxrQkFBRyxHQUFXLCtCQUErQixDQUFDO1FBRTlDLHVCQUFRLEdBQVcsY0FBYyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDakQsZ0NBQWlCLEdBQVcsY0FBYyxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUNuRSxrQ0FBbUIsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLG1CQUFtQixDQUFDO1FBQ3ZFLG9DQUFxQixHQUFXLGNBQWMsQ0FBQyxHQUFHLEdBQUcscUJBQXFCLENBQUM7UUFDM0UsNEJBQWEsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQztRQUMzRCxnQ0FBaUIsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLGlCQUFpQixDQUFDO1FBQ25FLGdDQUFpQixHQUFXLGNBQWMsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7UUFDbkUsNkJBQWMsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQztRQUM3RCw2QkFBYyxHQUFXLGNBQWMsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDO1FBRTdELDJCQUFZLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztRQUNyRixtQ0FBb0IsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsc0JBQXNCLENBQUM7UUFDckcsNkJBQWMsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekYsZ0NBQWlCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLG1CQUFtQixDQUFDO1FBQy9GLDZCQUFjLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGdCQUFnQixDQUFDO1FBRXpGLHFCQUFNLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLFFBQVEsQ0FBQztRQUV6RSxrQ0FBbUIsR0FBVyxxQkFBcUIsQ0FBQztRQUNwRCxvQ0FBcUIsR0FBVyx1QkFBdUIsQ0FBQztRQUN4RCxpQ0FBa0IsR0FBVyxvQkFBb0IsQ0FBQztRQUNsRCw0QkFBYSxHQUFXLGVBQWUsQ0FBQztRQUN4Qyw0QkFBYSxHQUFXLGVBQWUsQ0FBQztRQUN4QywrQkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztRQUM5QywrQkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztRQUM5QyxzQ0FBdUIsR0FBVyx5QkFBeUIsQ0FBQztRQUM1RCxnQ0FBaUIsR0FBVyxtQkFBbUIsQ0FBQztRQUNoRCw0QkFBYSxHQUFXLGVBQWUsQ0FBQztRQUN4Qyw2QkFBYyxHQUFXLGdCQUFnQixDQUFDO1FBQzFDLDJCQUFZLEdBQVcsY0FBYyxDQUFDO1FBQ3RDLCtCQUFnQixHQUFXLGtCQUFrQixDQUFDO1FBQzlDLGdDQUFpQixHQUFXLG1CQUFtQixDQUFDO1FBQ2hELDRCQUFhLEdBQVcsZUFBZSxDQUFDO1FBRXhDLDRCQUFhLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGVBQWUsQ0FBQztRQUV2Riw4QkFBZSxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzRiw2QkFBYyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6RixrQ0FBbUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcscUJBQXFCLENBQUM7UUFFbkcscUNBQXNCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHdCQUF3QixDQUFDO1FBRXpHLG9DQUFxQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RyxrQ0FBbUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcscUJBQXFCLENBQUM7UUFDbkcsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO1FBQ3JHLGlDQUFrQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRyxxQ0FBc0IsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsd0JBQXdCLENBQUM7UUFDekcsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO1FBQ3JHLG1DQUFvQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRyxpQ0FBa0IsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7UUFDakcsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO1FBRXJHLGlDQUFrQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRyxpQ0FBa0IsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7UUFDakcsb0NBQXFCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHVCQUF1QixDQUFDO1FBQ3ZHLG9DQUFxQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyx1QkFBdUIsQ0FBQztRQUV2RyxvQ0FBcUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsZUFBZSxDQUFDO1FBRS9GLG9DQUFxQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyx1QkFBdUIsQ0FBQztRQUV2Ryw2QkFBYyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6RixpQ0FBa0IsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7UUFDakcsbUNBQW9CLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDO1FBRXJHLHFDQUFzQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyx3QkFBd0IsQ0FBQztRQUV6Ryx5Q0FBMEIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsNEJBQTRCLENBQUM7UUFDakgseUNBQTBCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLDRCQUE0QixDQUFDO1FBQ2pILGdEQUFpQyxHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxtQ0FBbUMsQ0FBQztRQUUvSCxnQ0FBaUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsbUJBQW1CLENBQUM7UUFDL0Ysc0NBQXVCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHlCQUF5QixDQUFDO1FBQzNHLDRCQUFhLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLGVBQWUsQ0FBQztRQUN2RixvQ0FBcUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcsdUJBQXVCLENBQUM7UUFFdkcsb0NBQXFCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLHVCQUF1QixDQUFDO1FBQ3ZHLGtDQUFtQixHQUFXLGNBQWMsQ0FBQyw2QkFBNkIsR0FBRyxxQkFBcUIsQ0FBQztRQUVuRyxrQ0FBbUIsR0FBVyxjQUFjLENBQUMsNkJBQTZCLEdBQUcscUJBQXFCLENBQUM7UUFDbkcsdUNBQXdCLEdBQVcsY0FBYyxDQUFDLDZCQUE2QixHQUFHLDBCQUEwQixDQUFDO1FBRTdHLGtCQUFHLEdBQVcsbUNBQW1DLENBQUM7UUFFbEQsd0JBQVMsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNsRCx5QkFBVSxHQUFXLGNBQWMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3BELHlCQUFVLEdBQVcsY0FBYyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDcEQseUJBQVUsR0FBVyxjQUFjLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNwRCxxQkFBTSxHQUFXLGNBQWMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBRS9DLDZCQUFjLEdBQVcsY0FBYyxDQUFDLG9CQUFvQixHQUFHLFVBQVUsQ0FBQztRQUMxRSx5QkFBVSxHQUFXLGNBQWMsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7UUFDbEUsNkJBQWMsR0FBVyxjQUFjLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDO1FBQzFFLHlCQUFVLEdBQVcsY0FBYyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztRQUNsRSwwQkFBVyxHQUFXLGNBQWMsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7UUFDcEUsNEJBQWEsR0FBVyxjQUFjLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDO1FBQ3hFLHlCQUFVLEdBQVcsY0FBYyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztRQUVsRSw0QkFBYSxHQUFXLGNBQWMsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7UUFFdEUsdUNBQXdCLEdBQVcsR0FBRyxDQUFDO1FBQ3ZDLG9DQUFxQixHQUFXLGFBQWEsQ0FBQztRQUU5QywwQ0FBMkIsR0FBVyxJQUFJLENBQUM7UUFDM0MsdUNBQXdCLEdBQVcsaUJBQWlCLENBQUM7UUFFckQsNENBQTZCLEdBQVcsR0FBRyxDQUFDO1FBQzVDLHlDQUEwQixHQUFXLGlCQUFpQixDQUFDO1FBRXZELGtEQUFtQyxHQUFXLElBQUksQ0FBQztRQUNuRCwrQ0FBZ0MsR0FBVywyQkFBMkIsQ0FBQztRQUV2RSx5Q0FBMEIsR0FBVyxHQUFHLENBQUM7UUFDekMsc0NBQXVCLEdBQVcsY0FBYyxDQUFDO1FBRWpELCtDQUFnQyxHQUFXLElBQUksQ0FBQztRQUNoRCwyQ0FBNEIsR0FBVyx3QkFBd0IsQ0FBQztRQUVoRSx1Q0FBd0IsR0FBVyxHQUFHLENBQUM7UUFDdkMsb0NBQXFCLEdBQVcsUUFBUSxDQUFDO1FBRXpDLHFDQUFzQixHQUFXLE9BQU8sQ0FBQztRQUN6QyxrQ0FBbUIsR0FBVyxTQUFTLENBQUM7UUFFeEMsc0NBQXVCLEdBQVcsVUFBVSxDQUFDO1FBQzdDLG1DQUFvQixHQUFXLFNBQVMsQ0FBQztRQUV6Qyx5QkFBVSxHQUFXLGFBQWEsQ0FBQztRQUNuQyx3QkFBUyxHQUFXLFlBQVksQ0FBQztRQUVqQyx3QkFBUyxHQUFXLFVBQVUsQ0FBQztRQUMvQiwwQkFBVyxHQUFXLHVCQUF1QixDQUFDO1FBRTlDLHlCQUFVLEdBQVcsUUFBUSxDQUFDO1FBQzlCLDJCQUFZLEdBQVcsd0JBQXdCLENBQUM7UUFFbEUscUJBQUM7S0FBQSxJQUFBO0lBR0QsV0FBWSxXQUFXO1FBQ25CLG1EQUFXLENBQUE7UUFDWCxpREFBVSxDQUFBO0lBQ2QsQ0FBQyxFQUhXQyxtQkFBVyxLQUFYQSxtQkFBVyxRQUd0Qjs7SUN0TkQ7OztBQUdBLElBRUE7QUFDQTtRQUFBO1NBb0dDOzs7Ozs7O1FBOUJpQixpQ0FBMkIsR0FBekMsVUFBMEMsU0FBaUI7O1lBR3ZELElBQU0sUUFBUSxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXpFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBVSxTQUFTLGdDQUE2QixDQUFDLENBQUM7WUFFM0YsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFdEI7Ozs7Ozs7UUFRYSw2Q0FBdUMsR0FBckQsVUFBc0QsZ0JBQXdCOztZQUcxRSxJQUFNLFFBQVEsR0FBYSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV2RixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVUsZ0JBQWdCLGdDQUE2QixDQUFDLENBQUM7O1lBR2xHLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxjQUFjLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVqRjs7Ozs7O1FBM0ZzQixnQkFBVSxHQUFHLHdIQUF3SCxDQUFDOzs7Ozs7UUFPdEksbUJBQWEsR0FBRyxnQkFBZ0IsQ0FBQzs7Ozs7O1FBT2pDLGNBQVEsR0FBRywwSEFBMEgsQ0FBQzs7Ozs7O1FBT3RJLG1CQUFhLEdBQUcsZ0NBQWdDLENBQUM7Ozs7OztRQU9qRCxjQUFRLEdBQUcsZ0JBQWdCLENBQUM7Ozs7OztRQU81QixvQkFBYyxHQUFHLGdCQUFnQixDQUFDOzs7Ozs7Ozs7UUFXM0MseUJBQW1CLEdBQUcsVUFBQyxJQUFJLEVBQUUsS0FBYSxFQUFFLElBQUk7Ozs7OztZQVExRCxPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBRXZDLENBQUE7UUFzQ0wsWUFBQztLQUFBOzs7UUN4R0Q7WUFJVyxVQUFLLEdBQVcsU0FBUyxDQUFDO1lBRzFCLGFBQVEsR0FBVyxFQUFFLENBQUM7U0FDaEM7UUFKR047WUFEQ0MsNEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7b0RBQ0o7UUFHakNEO1lBRENDLDRCQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3VEQUNWO1FBTnBCLGFBQWE7WUFEekJDLDBCQUFVLENBQUMsZUFBZSxDQUFDO1dBQ2YsYUFBYSxDQU96QjtRQUFELG9CQUFDO0tBQUE7O0lDVkQ7OztBQUdBLElBQUEsV0FBWSxTQUFTO1FBQ2pCLDJEQUFhLENBQUE7UUFDYiw2REFBYyxDQUFBO1FBQ2QseURBQVksQ0FBQTtJQUNoQixDQUFDLEVBSldLLGlCQUFTLEtBQVRBLGlCQUFTLFFBSXBCO0lBRUQ7OztBQUdBO1FBTUksb0JBQ2EsUUFBZ0IsRUFDaEIsR0FBVyxFQUNYLElBQVksRUFDWixLQUFjLEVBQ2QsR0FBWTtZQUpaLGFBQVEsR0FBUixRQUFRLENBQVE7WUFDaEIsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixVQUFLLEdBQUwsS0FBSyxDQUFTO1lBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBUztZQUVyQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOztnQkFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBR0EsaUJBQVMsQ0FBQyxhQUFhLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTs7Z0JBRS9CLElBQUksQ0FBQyxTQUFTLEdBQUdBLGlCQUFTLENBQUMsY0FBYyxDQUFDO2FBQzdDO2lCQUFNOztnQkFFSCxJQUFJLENBQUMsU0FBUyxHQUFHQSxpQkFBUyxDQUFDLFlBQVksQ0FBQzthQUMzQztTQUVKOzs7Ozs7UUFPRCxtREFBOEIsR0FBOUI7WUFFSSxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFFdkMsUUFBUSxJQUFJLENBQUMsU0FBUztnQkFFbEIsS0FBS0EsaUJBQVMsQ0FBQyxhQUFhLEVBQUU7b0JBQzFCLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNuQyxNQUFNO2lCQUNUO2dCQUVELEtBQUtBLGlCQUFTLENBQUMsY0FBYyxFQUFFO29CQUMzQixVQUFVLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQzVELE1BQU07aUJBQ1Q7Z0JBRUQsS0FBS0EsaUJBQVMsQ0FBQyxZQUFZLEVBQUU7b0JBQ3pCLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQzlGLE1BQU07aUJBQ1Q7Z0JBRUQsU0FBUztvQkFDTCxNQUFNO2lCQUNUO2FBRUo7WUFFRCxPQUFPLFVBQVUsQ0FBQztTQUNyQjs7Ozs7O1FBT0Qsb0NBQWUsR0FBZjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7U0FDdEU7UUFuRWMsb0JBQVMsR0FBRyxHQUFHLENBQUM7UUFxRW5DLGlCQUFDO0tBQUEsSUFBQTtJQUVEOzs7QUFHQTtRQUVJLHlCQUNhLEtBQWlCLEVBQ2pCLEdBQWU7WUFEZixVQUFLLEdBQUwsS0FBSyxDQUFZO1lBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQVk7U0FFM0I7Ozs7OztRQU9ELHlDQUFlLEdBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsQ0FBQztTQUN6RjtRQUNMLHNCQUFDO0lBQUQsQ0FBQzs7O1FDdEdEO1lBSVcsVUFBSyxHQUFXLFNBQVMsQ0FBQztTQUNwQztRQURHUDtZQURDQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7OzZEQUNHO1FBSHhCLHNCQUFzQjtZQURsQ0MsMEJBQVUsQ0FBQyx3QkFBd0IsQ0FBQztXQUN4QixzQkFBc0IsQ0FJbEM7UUFBRCw2QkFBQztLQUFBOzs7UUNIRDtZQUlXLE9BQUUsR0FBVyxTQUFTLENBQUM7WUFHdkIsY0FBUyxHQUFXLFNBQVMsQ0FBQztZQUc5QixjQUFTLEdBQVcsU0FBUyxDQUFDO1lBRzlCLGFBQVEsR0FBVyxTQUFTLENBQUM7WUFHN0IsZ0JBQVcsR0FBb0IsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFHckQsYUFBUSxHQUFhLFNBQVMsQ0FBQztZQUcvQixTQUFJLEdBQVcsU0FBUyxDQUFDO1lBR3pCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1lBR2hDLGVBQVUsR0FBYSxTQUFTLENBQUM7WUFHakMsV0FBTSxHQUFZLFNBQVMsQ0FBQztZQUc1QixhQUFRLEdBQVksU0FBUyxDQUFDO1NBRXhDO1FBaENHRjtZQURDQyw0QkFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7OzJDQUNHO1FBRzlCRDtZQURDQyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7O2tEQUNHO1FBR3JDRDtZQURDQyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztrREFDSDtRQUdyQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7aURBQ0g7UUFHcENEO1lBRENDLDRCQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDOztvREFDUztRQUc1REQ7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUM7O2lEQUNIO1FBR3RDRDtZQURDQyw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs2Q0FDSDtRQUdoQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7b0RBQ0g7UUFHdkNEO1lBRENDLDRCQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7O21EQUNHO1FBR3hDRDtZQURDQyw0QkFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7OytDQUNHO1FBR25DRDtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7O2lEQUNHO1FBakM1QixPQUFPO1lBRG5CQywwQkFBVSxDQUFDLFNBQVMsQ0FBQztXQUNULE9BQU8sQ0FtQ25CO1FBQUQsY0FBQztLQUFBOzs7UUNyQ0Q7WUFJVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1lBR3ZCLFNBQUksR0FBVyxTQUFTLENBQUM7WUFHekIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7WUFHaEMsWUFBTyxHQUFZLFNBQVMsQ0FBQztZQUc3QixXQUFNLEdBQVksU0FBUyxDQUFDO1lBRzVCLGFBQVEsR0FBWSxTQUFTLENBQUM7U0FFeEM7UUFqQkdGO1lBRENDLDRCQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7eUNBQ0c7UUFHOUJEO1lBRENDLDRCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7MkNBQ0c7UUFHaENEO1lBRENDLDRCQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzs7a0RBQ0c7UUFHdkNEO1lBRENDLDRCQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUM7c0NBQ3hCLE9BQU87OENBQWE7UUFHcENEO1lBRENDLDRCQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQzs7NkNBQ0c7UUFHbkNEO1lBRENDLDRCQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzs7K0NBQ0c7UUFsQjVCLEtBQUs7WUFEakJDLDBCQUFVLENBQUMsT0FBTyxDQUFDO1dBQ1AsS0FBSyxDQW9CakI7UUFBRCxZQUFDO0tBQUE7OztRQ3JCRDtZQUlXLFVBQUssR0FBVSxTQUFTLENBQUM7U0FFbkM7UUFGR0Y7WUFEQ0MsNEJBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO3NDQUNmLEtBQUs7b0RBQWE7UUFIdkIsYUFBYTtZQUR6QkMsMEJBQVUsQ0FBQyxlQUFlLENBQUM7V0FDZixhQUFhLENBS3pCO1FBQUQsb0JBQUM7S0FBQTs7O1FDTkQ7WUFJVyxXQUFNLEdBQVksU0FBUyxDQUFDO1NBRXRDO1FBRkdGO1lBRENDLDRCQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O3NEQUNHO1FBSDFCLGNBQWM7WUFEMUJDLDBCQUFVLENBQUMsZ0JBQWdCLENBQUM7V0FDaEIsY0FBYyxDQUsxQjtRQUFELHFCQUFDO0tBQUE7OztRQ05EO1lBSVcsT0FBRSxHQUFXLFNBQVMsQ0FBQztZQUd2QixlQUFVLEdBQVcsU0FBUyxDQUFDO1lBRy9CLFdBQU0sR0FBb0IsU0FBUyxDQUFDO1lBR3BDLGFBQVEsR0FBb0IsU0FBUyxDQUFDO1NBQ2hEO1FBVkdGO1lBRENDLDRCQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7OzRDQUNKO1FBRzlCRDtZQURDQyw0QkFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDOztvREFDSjtRQUd0Q0Q7WUFEQ0MsNEJBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLENBQUM7O2dEQUNIO1FBRzNDRDtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7a0RBQ0g7UUFacEMsUUFBUTtZQURwQkMsMEJBQVUsQ0FBQyxVQUFVLENBQUM7V0FDVixRQUFRLENBYXBCO1FBQUQsZUFBQztLQUFBOzs7UUNmRDtZQUdXLE9BQUUsR0FBVyxTQUFTLENBQUM7WUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztZQUd6QixVQUFLLEdBQVcsU0FBUyxDQUFDO1lBRzFCLGFBQVEsR0FBZSxTQUFTLENBQUM7WUFHakMsVUFBSyxHQUFXLFNBQVMsQ0FBQztZQUcxQixhQUFRLEdBQVcsU0FBUyxDQUFDO1NBQ3ZDO3FCQWxCWSxRQUFROztRQUVqQkY7WUFEQ0MsNEJBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7NENBQ0o7UUFHOUJEO1lBRENDLDRCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzhDQUNIO1FBR2hDRDtZQURDQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzsrQ0FDSDtRQUdqQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7O2tEQUNIO1FBR3hDRDtZQURDQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzsrQ0FDSDtRQUdqQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7a0RBQ0g7UUFqQjNCLFFBQVE7WUFEcEJDLDBCQUFVLENBQUMsVUFBVSxDQUFDO1dBQ1YsUUFBUSxDQWtCcEI7UUFBRCxlQUFDO0tBQUE7OztRQ2pCRDtZQUlXLGFBQVEsR0FBYSxTQUFTLENBQUM7WUFHL0IsYUFBUSxHQUFlLFNBQVMsQ0FBQztTQUMzQztRQUpHRjtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO3NDQUN6QixRQUFROzhDQUFhO1FBR3RDRDtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7OENBQ0o7UUFOL0IsSUFBSTtZQURoQkMsMEJBQVUsQ0FBQyxNQUFNLENBQUM7V0FDTixJQUFJLENBT2hCO1FBQUQsV0FBQztLQUFBOzs7UUNURDtZQUlXLGFBQVEsR0FBYSxTQUFTLENBQUM7U0FDekM7UUFER0Y7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztzQ0FDekIsUUFBUTswREFBYTtRQUg3QixnQkFBZ0I7WUFENUJDLDBCQUFVLENBQUMsa0JBQWtCLENBQUM7V0FDbEIsZ0JBQWdCLENBSTVCO1FBQUQsdUJBQUM7S0FBQTs7O1FDTEQ7WUFJVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1lBR3ZCLFNBQUksR0FBVyxTQUFTLENBQUM7WUFHekIsZUFBVSxHQUFXLFNBQVMsQ0FBQztZQUcvQixlQUFVLEdBQVksU0FBUyxDQUFDO1lBR2hDLFdBQU0sR0FBb0IsU0FBUyxDQUFDO1lBR3BDLGFBQVEsR0FBb0IsU0FBUyxDQUFDO1NBQ2hEO1FBaEJHRjtZQURDQyw0QkFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7O2dEQUNHO1FBRzlCRDtZQURDQyw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztrREFDSDtRQUdoQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7d0RBQ0g7UUFHdENEO1lBRENDLDRCQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7O3dEQUNIO1FBR3ZDRDtZQURDQyw0QkFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztvREFDRztRQUczQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7c0RBQ0c7UUFsQnBDLFlBQVk7WUFEeEJDLDBCQUFVLENBQUMsY0FBYyxDQUFDO1dBQ2QsWUFBWSxDQW1CeEI7UUFBRCxtQkFBQztLQUFBOzs7UUNwQkQ7WUFJVyxhQUFRLEdBQWlCLFNBQVMsQ0FBQztTQUM3QztRQURHRjtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDO3NDQUM3QixZQUFZOzhEQUFhO1FBSGpDLG9CQUFvQjtZQURoQ0MsMEJBQVUsQ0FBQyxzQkFBc0IsQ0FBQztXQUN0QixvQkFBb0IsQ0FJaEM7UUFBRCwyQkFBQztLQUFBOzs7UUNMRDtZQUlXLFNBQUksR0FBUyxTQUFTLENBQUM7U0FDakM7UUFER0Y7WUFEQ0MsNEJBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztzQ0FDckIsSUFBSTtrREFBYTtRQUhyQixZQUFZO1lBRHhCQywwQkFBVSxDQUFDLGNBQWMsQ0FBQztXQUNkLFlBQVksQ0FJeEI7UUFBRCxtQkFBQztLQUFBOzs7UUNMRDtZQUlXLFVBQUssR0FBbUIsU0FBUyxDQUFDO1NBQzVDO1FBREdGO1lBRENDLDRCQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxDQUFDOztvREFDSjtRQUhoQyxhQUFhO1lBRHpCQywwQkFBVSxDQUFDLGVBQWUsQ0FBQztXQUNmLGFBQWEsQ0FJekI7UUFBRCxvQkFBQztLQUFBOzs7UUNORDtZQUlXLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1lBR2hDLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1NBRTNDO1FBTEdGO1lBRENDLDRCQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzs7OERBQ0c7UUFHdkNEO1lBRENDLDRCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs7K0RBQ0c7UUFOL0IsaUJBQWlCO1lBRDdCQywwQkFBVSxDQUFDLG1CQUFtQixDQUFDO1dBQ25CLGlCQUFpQixDQVE3QjtRQUFELHdCQUFDO0tBQUE7OztRQ1REO1lBSVcscUJBQWdCLEdBQVEsU0FBUyxDQUFDO1lBR2xDLHdDQUFtQyxHQUFRLFNBQVMsQ0FBQztTQUMvRDtRQUpHRjtZQURDQyw0QkFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQzs7Z0VBQ0E7UUFHekNEO1lBRENDLDRCQUFZLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDOzttRkFDQTtRQU5uRCxjQUFjO1lBRDFCQywwQkFBVSxDQUFDLGdCQUFnQixDQUFDO1dBQ2hCLGNBQWMsQ0FPMUI7UUFBRCxxQkFBQztLQUFBOzs7UUNMRDtZQUlXLE9BQUUsR0FBVyxTQUFTLENBQUM7WUFHdkIsVUFBSyxHQUFXLFNBQVMsQ0FBQztZQUcxQixhQUFRLEdBQVcsU0FBUyxDQUFDO1lBRzdCLGFBQVEsR0FBVyxTQUFTLENBQUM7WUFHN0IsVUFBSyxHQUFXLFNBQVMsQ0FBQztZQUcxQixjQUFTLEdBQVcsU0FBUyxDQUFDO1lBRzlCLGVBQVUsR0FBVyxTQUFTLENBQUM7WUFHL0IsV0FBTSxHQUFZLFNBQVMsQ0FBQztZQUc1QixTQUFJLEdBQVcsU0FBUyxDQUFDO1lBR3pCLFdBQU0sR0FBWSxTQUFTLENBQUM7WUFHNUIsYUFBUSxHQUFjLFNBQVMsQ0FBQztZQUdoQyxjQUFTLEdBQVcsU0FBUyxDQUFDO1lBRzlCLGdCQUFXLEdBQW1CLFNBQVMsQ0FBQztZQUd4QyxnQkFBVyxHQUFhLEtBQUssQ0FBQztTQUd4QztRQTFDR0Y7WUFEQ0MsNEJBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOzt3Q0FDRztRQUc5QkQ7WUFEQ0MsNEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOzsyQ0FDRztRQUdqQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDOzs4Q0FDRztRQUdwQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7OENBQ0g7UUFHcENEO1lBRENDLDRCQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzJDQUNIO1FBR2pDRDtZQURDQyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7OytDQUNHO1FBR3JDRDtZQURDQyw0QkFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7O2dEQUNHO1FBR3RDRDtZQURDQyw0QkFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7OzRDQUNHO1FBR25DRDtZQURDQyw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7OzBDQUNHO1FBR2hDRDtZQURDQyw0QkFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs0Q0FDRztRQUduQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OENBQ0c7UUFHdkNEO1lBRENDLDRCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OytDQUNIO1FBR3JDRDtZQURDQyw0QkFBWSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7c0NBQ3hCLGNBQWM7aURBQWE7UUFHL0NEO1lBRENDLDRCQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7O2lEQUNOO1FBMUM1QixJQUFJO1lBRGhCQywwQkFBVSxDQUFDLE1BQU0sQ0FBQztXQUNOLElBQUksQ0E2Q2hCO1FBQUQsV0FBQztLQUFBOzs7UUNoREQ7WUFHVyxZQUFPLEdBQVcsU0FBUyxDQUFDO1NBQ3RDO1FBREdGO1lBRENDLDRCQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7OytEQUNHO1FBRjFCLHNCQUFzQjtZQURsQ0MsMEJBQVUsQ0FBQyx3QkFBd0IsQ0FBQztXQUN4QixzQkFBc0IsQ0FHbEM7UUFBRCw2QkFBQztLQUFBOzs7UUNIRDtZQUlXLFlBQU8sR0FBWSxTQUFTLENBQUM7U0FFdkM7UUFGR0Y7WUFEQ0MsNEJBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO3NDQUNqQixPQUFPO3dEQUFhO1FBSDNCLGVBQWU7WUFEM0JDLDBCQUFVLENBQUMsaUJBQWlCLENBQUM7V0FDakIsZUFBZSxDQUszQjtRQUFELHNCQUFDO0tBQUE7OztRQ1BEO1lBSVcsYUFBUSxHQUFjLFNBQVMsQ0FBQztTQUUxQztRQUZHRjtZQURDQyw0QkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzswREFDRztRQUg5QixnQkFBZ0I7WUFENUJDLDBCQUFVLENBQUMsa0JBQWtCLENBQUM7V0FDbEIsZ0JBQWdCLENBSzVCO1FBQUQsdUJBQUM7S0FBQTs7O1FDUEQ7WUFJVyxTQUFJLEdBQVcsU0FBUyxDQUFDO1lBR3pCLFFBQUcsR0FBVyxTQUFTLENBQUM7WUFHeEIsU0FBSSxHQUFXLFNBQVMsQ0FBQztZQUd6QixhQUFRLEdBQVksU0FBUyxDQUFDO1NBRXhDO1FBWEdGO1lBRENDLDRCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7aURBQ0c7UUFHaENEO1lBRENDLDRCQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O2dEQUNIO1FBRy9CRDtZQURDQyw0QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztpREFDSDtRQUdoQ0Q7WUFEQ0MsNEJBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDOztxREFDRztRQVo1QixXQUFXO1lBRHZCQywwQkFBVTtXQUNFLFdBQVcsQ0FjdkI7UUFBRCxrQkFBQztLQUFBOzs7UUNkRDtZQUlXLFVBQUssR0FBVyxTQUFTLENBQUM7U0FFcEM7UUFGR0Y7WUFEQ0MsNEJBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7b0RBQ0c7UUFIeEIsYUFBYTtZQUR6QkMsMEJBQVUsQ0FBQyxlQUFlLENBQUM7V0FDZixhQUFhLENBS3pCO1FBQUQsb0JBQUM7S0FBQTs7O1FDTkQ7WUFJVyxTQUFJLEdBQVMsU0FBUyxDQUFDO1NBQ2pDO1FBREdGO1lBRENDLDRCQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztzQ0FDZCxJQUFJO2tEQUFhO1FBSHJCLFlBQVk7WUFEeEJDLDBCQUFVLENBQUMsY0FBYyxDQUFDO1dBQ2QsWUFBWSxDQUl4QjtRQUFELG1CQUFDO0tBQUE7O0lDZ0NEOzs7QUFHQTtRQUFBO1lBSWEsU0FBSSxHQUFXLGNBQWMsQ0FBQyxTQUFTLENBQUM7U0FPcEQ7UUFBRCxvQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUEyQ00seUNBQWE7UUFFcEQsK0JBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsR0FBVztZQUF2RSxZQUNJLGlCQUFPLFNBQ1Y7WUFGb0IsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLGFBQU8sR0FBUCxPQUFPLENBQUE7WUFBVyxTQUFHLEdBQUgsR0FBRyxDQUFROztTQUV0RTtRQUVELDRDQUFZLEdBQVo7WUFDSSxPQUFPLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztTQUMvQztRQUVELDBDQUFVLEdBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFDTCw0QkFBQztJQUFELENBQUMsQ0FiMEMsYUFBYSxHQWF2RDtJQUVEOzs7QUFHQTtRQUFBO1NBRUM7UUFBRCxzQ0FBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUF5Q0EsdUNBQWE7UUFFbEQsNkJBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsSUFBWSxFQUFXLGlCQUFrRDtZQUFySSxZQUNJLGlCQUFPLFNBQ1Y7WUFGb0IsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLGFBQU8sR0FBUCxPQUFPLENBQUE7WUFBVyxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQVcsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFpQzs7U0FFcEk7Ozs7Ozs7O1FBV0QscURBQXVCLEdBQXZCLFVBQXdCLFdBQW1CLEVBQUUsWUFBaUM7WUFDMUUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBRTNGLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXRHLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssSUFBRyxPQUFLLGFBQWEsTUFBRyxDQUFBLENBQUM7YUFDNUU7aUJBQU07Z0JBQ0gsT0FBTyx3RUFBd0UsQ0FBQzthQUNuRjtTQUNKO1FBR0QsMENBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLG1CQUFtQixDQUFDO1NBQzdDO1FBRUQsd0NBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjtRQUVMLDBCQUFDO0lBQUQsQ0FBQyxDQW5Dd0MsYUFBYSxHQW1DckQ7SUFFRDs7O0FBR0E7UUFBd0NBLHNDQUFhO1FBRWpELDRCQUFxQixFQUFVLEVBQVcsT0FBTyxFQUFXLEdBQVcsRUFBVyxVQUFrQjtZQUFwRyxZQUNJLGlCQUFPLFNBQ1Y7WUFGb0IsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLGFBQU8sR0FBUCxPQUFPLENBQUE7WUFBVyxTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQVcsZ0JBQVUsR0FBVixVQUFVLENBQVE7O1NBRW5HO1FBRUQseUNBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLGtCQUFrQixDQUFDO1NBQzVDO1FBRUQsdUNBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtRQUVMLHlCQUFDO0lBQUQsQ0FBQyxDQWR1QyxhQUFhLEdBY3BEO0lBR0Q7OztBQUdBO1FBRUksdUJBQ2EsRUFBVSxFQUNWLE9BQU8sRUFDUCxRQUFnQixFQUNoQixTQUFpQixFQUNqQixPQUFlLEVBQ2YsUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLFVBQW1CLEVBQ25CLFFBQWlCLEVBQ2pCLFFBQWlCLEVBQ2pCLE1BQWU7WUFWZixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBQTtZQUNQLGFBQVEsR0FBUixRQUFRLENBQVE7WUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtZQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBUztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFTO1lBQ2pCLGFBQVEsR0FBUixRQUFRLENBQVM7WUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBUztZQUduQixTQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUVqQyxjQUFTLEdBQUcsR0FBRyxDQUFDO1NBSnZCO1FBTUQscUNBQWEsR0FBYjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFOztnQkFFeEksT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2RztpQkFBTTs7Z0JBRUgsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ2xOO1NBRUo7UUFFRCxvQ0FBWSxHQUFaO1lBQ0ksT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQ3ZDO1FBRUQsa0NBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2pEO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFFSSx1QkFBcUIsRUFBVSxFQUFXLE9BQU8sRUFBVyxtQkFBMkIsRUFBVyxnQkFBK0I7WUFBNUcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQUE7WUFBVyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7WUFBVyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWU7WUFJeEgsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7U0FGeEM7UUFJRCwrQ0FBdUIsR0FBdkIsVUFBd0IsWUFBaUM7WUFDckQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO2dCQUVyQyxJQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV4RixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUcsT0FBSyxhQUFhLE1BQUcsQ0FBQSxDQUFDO2FBQzlEO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DO1NBQ0o7UUFFRCxvQ0FBWSxHQUFaO1lBQ0ksT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQ3ZDO1FBRUQsa0NBQVUsR0FBVjtZQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtnQkFDckMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DO1NBQ0o7UUFDTCxvQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUVJLDBCQUFxQixFQUFVLEVBQVcsT0FBTyxFQUFXLE9BQWU7WUFBdEQsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQUE7WUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBSWxFLFNBQUksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1NBRnZDO1FBSUQsdUNBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLGdCQUFnQixDQUFDO1NBQzFDO1FBRUQscUNBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNsQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxJQUFBO0lBRUQ7OztBQUdBO1FBRUksMEJBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsT0FBZTtZQUF0RCxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBQTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFJbEUsU0FBSSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7U0FGM0M7UUFJRCx1Q0FBWSxHQUFaO1lBQ0ksT0FBTyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7U0FDMUM7UUFFRCxxQ0FBVSxHQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFFSSxpQ0FDYSxFQUFVLEVBQ1YsT0FBTyxFQUNQLGFBQXFCLEVBQ3JCLHNCQUE4QixFQUM5QixTQUFpQixFQUNqQixJQUFZLEVBQ1osSUFBWTtZQU5aLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixZQUFPLEdBQVAsT0FBTyxDQUFBO1lBQ1Asa0JBQWEsR0FBYixhQUFhLENBQVE7WUFDckIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFRO1lBQzlCLGNBQVMsR0FBVCxTQUFTLENBQVE7WUFDakIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFNBQUksR0FBSixJQUFJLENBQVE7WUFPaEIsU0FBSSxHQUFHLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQzs7WUFKL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBRW5EO1FBTUQsNkNBQVcsR0FBWCxVQUFZLFlBQW9CO1lBRTVCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDO2dCQUVoRCxVQUFVLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLFVBQVUsSUFBSSxHQUFHLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFFckUsT0FBTyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQzthQUMzSDtTQUVKO1FBRUQsOENBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLHVCQUF1QixDQUFDO1NBQ2pEO1FBRUQsNENBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN6QjtRQUNMLDhCQUFDO0lBQUQsQ0FBQyxJQUFBO0lBRUQ7OztBQUdBO1FBRUksMkJBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsWUFBb0IsRUFBVyxXQUFtQjtZQUF6RixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBQTtZQUFXLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFJckcsU0FBSSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7U0FGNUM7UUFJRCx3Q0FBWSxHQUFaO1lBQ0ksT0FBTyxjQUFjLENBQUMsaUJBQWlCLENBQUM7U0FDM0M7UUFFRCxzQ0FBVSxHQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO1FBRUwsd0JBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFFSSx3QkFBcUIsRUFBVSxFQUNsQixPQUFPLEVBQ1AsUUFBZ0I7WUFGUixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQUE7WUFDUCxhQUFRLEdBQVIsUUFBUSxDQUFRO1lBR3BCLFNBQUksR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO1NBRnpDO1FBSUQscUNBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLGNBQWMsQ0FBQztTQUN4QztRQUVELG1DQUFVLEdBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7UUFDTCxxQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUNJLGlCQUFtQixDQUFTLEVBQVMsQ0FBUztZQUEzQixNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtTQUM3QztRQUNMLGNBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFDSSx3QkFBbUIsTUFBYyxFQUN0QixTQUFpQixFQUNqQixTQUFpQixFQUNqQixNQUFpQixFQUNqQixJQUFZLEVBQ1osTUFBZ0I7WUFMUixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVE7WUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtZQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1lBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixXQUFNLEdBQU4sTUFBTSxDQUFVO1NBRTFCO1FBQ0wscUJBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFFSSx1QkFBcUIsRUFBVSxFQUFXLE9BQWUsRUFBVyxjQUFzQjs7WUFBckUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFBVyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtZQTJCakYsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUF6QnJDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFaEQsSUFBTSxNQUFNLEdBQWMsRUFBRSxDQUFDOztnQkFDN0IsS0FBb0IsSUFBQSxLQUFBQyxTQUFBLFlBQVksQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7b0JBQXBDLElBQU0sS0FBSyxXQUFBO29CQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Ozs7Ozs7Ozs7Ozs7OztZQUVELElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNyQixNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQzlCLFlBQVksQ0FBQyxNQUFNLEVBQ25CLFlBQVksQ0FBQyxTQUFTLEVBQ3RCLFlBQVksQ0FBQyxTQUFTLEVBQ3RCLE1BQU0sRUFDTixZQUFZLENBQUMsSUFBSSxFQUNqQixNQUFNLENBQ1QsQ0FBQztTQUVMO1FBTUQsb0NBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQztTQUN2QztRQUVELGtDQUFVLEdBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDOUI7UUFDTCxvQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUVJLHNCQUFxQixFQUFVLEVBQVcsT0FBZSxFQUFXLEdBQVc7WUFBMUQsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFBVyxRQUFHLEdBQUgsR0FBRyxDQUFRO1lBSXRFLFNBQUksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1NBRnZDO1FBSUQsbUNBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQztTQUN0QztRQUVELGlDQUFVLEdBQVY7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFFTCxtQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTtRQUVJLDBCQUFxQixFQUFVLEVBQVcsT0FBZSxFQUFXLElBQWE7WUFBNUQsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFBVyxTQUFJLEdBQUosSUFBSSxDQUFTO1lBSXhFLFNBQUksR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1NBRjNDO1FBSUQsdUNBQVksR0FBWjtZQUNJLE9BQU8sY0FBYyxDQUFDLGdCQUFnQixDQUFDO1NBQzFDO1FBRUQscUNBQVUsR0FBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMvQjtRQUVMLHVCQUFDO0lBQUQsQ0FBQyxJQUFBO0lBRUQ7OztBQUdBO1FBRUksMkJBQXFCLEVBQVUsRUFBVyxPQUFlLEVBQVcsYUFBcUIsRUFBVyxXQUFtQjtZQUFsRyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUFXLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1lBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFJOUcsU0FBSSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7U0FGNUM7UUFJRCx3Q0FBWSxHQUFaO1lBQ0ksT0FBTyxjQUFjLENBQUMsaUJBQWlCLENBQUM7U0FDM0M7UUFFRCxzQ0FBVSxHQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ2pFO1FBRUwsd0JBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7O0FBR0E7UUFFSSx1QkFBcUIsRUFBVSxFQUFXLE9BQWUsRUFBVyxXQUFtQixFQUFXLGFBQXFCO1lBQWxHLE9BQUUsR0FBRixFQUFFLENBQVE7WUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFBVyxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtZQUk5RyxTQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztTQUZ4QztRQUlELG9DQUFZLEdBQVo7WUFDSSxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUM7U0FDdkM7UUFFRCxrQ0FBVSxHQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCO1FBRUwsb0JBQUM7SUFBRCxDQUFDOztJQzdlRDs7O0FBR0E7Ozs7Ozs7Ozs7OztRQWFJLHNCQUNvQixFQUFVLEVBQ1YsSUFBWSxFQUNaLEtBQWEsRUFDdEIsZUFBb0MsRUFDcEMsaUNBQXNELEVBQ3RELGFBQWtDLEVBQ2xDLGtDQUE4RCxFQUNyRCxVQUEyQjtZQVAzQixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFVBQUssR0FBTCxLQUFLLENBQVE7WUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQXFCO1lBQ3BDLHNDQUFpQyxHQUFqQyxpQ0FBaUMsQ0FBcUI7WUFDdEQsa0JBQWEsR0FBYixhQUFhLENBQXFCO1lBQ2xDLHVDQUFrQyxHQUFsQyxrQ0FBa0MsQ0FBNEI7WUFDckQsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7U0FDOUM7UUFFTCxtQkFBQztJQUFELENBQUM7O0lDbEJELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQztRQVVJLG9CQUE2QixJQUFnQixFQUNZLE1BQU07WUFEbEMsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUNZLFdBQU0sR0FBTixNQUFNLENBQUE7Ozs7WUFIL0QsWUFBTyxHQUFHLEtBQUssQ0FBQzs7U0FNZjs7Ozs7Ozs7UUFTRCw0QkFBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLE1BQW1CO1lBQXpDLGlCQXVCQztZQXJCRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUVwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUNwRkMsYUFBRyxDQUFDLFVBQUMsUUFBMkI7Z0JBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVyQixJQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUU1QixPQUFPLE1BQU0sQ0FBQzthQUNqQixDQUFDLEVBQ0ZDLG9CQUFVLENBQUMsVUFBQyxLQUF3QjtnQkFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBRXJCLE9BQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDLENBQUMsQ0FDTCxDQUFDO1NBRUw7Ozs7Ozs7UUFRUyxrQ0FBYSxHQUF2QixVQUF3QixnQkFBa0M7WUFFdEQsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7WUFFcEMsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7OztZQUlsRSxPQUFPQyxTQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FFM0I7Ozs7Ozs7O1FBU0QsNkJBQVEsR0FBUixVQUFTLElBQVksRUFBRSxJQUFVO1lBQWpDLGlCQTBCQztZQXhCRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7WUFJcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUMzRUYsYUFBRyxDQUFDLFVBQUMsUUFBMkI7Z0JBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVyQixJQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUM1QixPQUFPLE1BQU0sQ0FBQzthQUNqQixDQUFDLEVBQ0ZDLG9CQUFVLENBQUMsVUFBQyxLQUF3QjtnQkFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O2dCQUlyQixPQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QyxDQUFDLENBQ0wsQ0FBQztTQUVMOzs7Ozs7OztRQVNELDRCQUFPLEdBQVAsVUFBUSxJQUFZLEVBQUUsSUFBVTtZQUFoQyxpQkE0QkM7WUExQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1lBSXBCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUVELGFBQUcsQ0FBQyxVQUFDLFFBQTJCO2dCQUM1QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Z0JBSXJCLElBQU0sTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLE9BQU8sTUFBTSxDQUFDO2FBRWpCLENBQUMsRUFDRkMsb0JBQVUsQ0FBQyxVQUFDLEtBQXdCO2dCQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Z0JBSXJCLE9BQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDLENBQUMsQ0FDTCxDQUFDO1NBQ0w7Ozs7Ozs7UUFRRCwrQkFBVSxHQUFWLFVBQVcsSUFBWTtZQUF2QixpQkE0QkM7WUExQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1lBSXBCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUN2RUQsYUFBRyxDQUFDLFVBQUMsUUFBMkI7Z0JBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztnQkFJckIsSUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDNUIsT0FBTyxNQUFNLENBQUM7YUFFakIsQ0FBQyxFQUNGQyxvQkFBVSxDQUFDLFVBQUMsS0FBd0I7Z0JBQ2hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztnQkFJckIsT0FBTyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekMsQ0FBQyxDQUNMLENBQUM7U0FDTDs7Ozs7OztRQVNTLHVDQUFrQixHQUE1QixVQUE2QixLQUF3Qjs7WUFFakQsSUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUMzQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDbkMsWUFBWSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN2QyxZQUFZLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDN0IsT0FBT0UscUJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQzs7Ozs7OztRQVFTLG9DQUFlLEdBQXpCLFVBQTBCLEtBQVU7WUFFaEMsSUFBSSxLQUFLLFlBQVksZUFBZTtnQkFBRSxPQUFPQSxxQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9ELElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixZQUFZLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztZQUN6QyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUMvQixZQUFZLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUN0QixPQUFPQSxxQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBRW5DOztvQkFoTkpDLGFBQVUsU0FBQzt3QkFDUixVQUFVLEVBQUUsTUFBTTtxQkFDckI7Ozs7O3dCQWRRQyxhQUFVO3dEQXVCUUMsU0FBTSxTQUFDLGtCQUFrQjs7Ozt5QkF4QnBEO0tBd1RDOztJQ2hURDs7O0FBR0E7UUFHcUNSLG1DQUFVO1FBSC9DOztTQWtJQzs7Ozs7Ozs7OztRQWxIRywrQ0FBcUIsR0FBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUNsRDs7Ozs7O1FBT0QsMENBQWdCLEdBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDbEQ7Ozs7Ozs7UUFRRCw4Q0FBb0IsR0FBcEIsVUFBcUIsVUFBa0I7WUFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDcEY7Ozs7Ozs7Ozs7UUFhRCw4REFBb0MsR0FBcEMsVUFBcUMsV0FBbUI7WUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDeEY7Ozs7Ozs7UUFRRCw0Q0FBa0IsR0FBbEIsVUFBbUIsaUJBQWdDO1lBRS9DLElBQUksaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7Z0JBRWhDLE9BQU9TLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLDZFQUE2RSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2FBQ3ZJO1lBRUQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBRXhCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7Z0JBQzNDLGNBQWMsR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxjQUFjLENBQUMsQ0FBQztTQUNsRTs7Ozs7OztRQVFELHVDQUFhLEdBQWIsVUFBYyxZQUFzQjtZQUVoQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztnQkFFM0IsT0FBT0EsZUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsR0FBQSxDQUFDLENBQUM7YUFDNUg7WUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUUxQixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztnQkFDdEMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzFGLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1NBRXZFOzs7Ozs7Ozs7O1FBWUQsd0NBQWMsR0FBZCxVQUFlLElBQWlCO1lBQzVCLElBQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDO1lBRTlCLElBQU0sUUFBUSxHQUFHO2dCQUNiLHdCQUF3QixFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNuQyw2QkFBNkIsRUFBRTtvQkFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QjtnQkFDRCxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ3hCLFVBQVUsRUFBRTtvQkFDUixNQUFNLEVBQUUsY0FBYyxDQUFDLFVBQVU7b0JBQ2pDLFdBQVcsRUFBRSxjQUFjLENBQUMsNkJBQTZCO2lCQUM1RDthQUNKLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDckNQLGFBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxHQUFBLENBQUMsRUFDOUNDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7O29CQWhJSkcsYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7OzhCQWJEO0tBNklDLENBL0hvQyxVQUFVOztJQ0wvQyxJQUFNSSxRQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWpDOzs7SUFHQTtRQUFpQ1Ysc0NBQUs7UUFFbEMsNEJBQXFCLE9BQWU7WUFBcEMsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FDakI7WUFGb0IsYUFBTyxHQUFQLE9BQU8sQ0FBUTs7U0FFbkM7UUFDTCx5QkFBQztJQUFELENBQUMsQ0FMZ0MsS0FBSyxHQUtyQztJQUdEOzs7QUFHQTs7Ozs7OztRQVFJLDBCQUFxQixFQUFVLEVBQ1YsS0FBYTtZQURiLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1NBRWpDO1FBRUwsdUJBQUM7SUFBRCxDQUFDLElBQUE7SUFNRCxXQUFZLHFCQUFxQjtRQUM3Qix1RUFBVyxDQUFBO1FBQ1gsaUVBQVEsQ0FBQTtRQUNSLHVFQUFXLENBQUE7SUFDZixDQUFDLEVBSldXLDZCQUFxQixLQUFyQkEsNkJBQXFCLFFBSWhDO0lBR0Q7OztBQUdBOzs7Ozs7UUFPSSxxQkFBcUIsVUFBaUMsRUFDakMsS0FBYSxFQUNiLFFBQWdCO1lBRmhCLGVBQVUsR0FBVixVQUFVLENBQXVCO1lBQ2pDLFVBQUssR0FBTCxLQUFLLENBQVE7WUFDYixhQUFRLEdBQVIsUUFBUSxDQUFRO1NBQ3BDO1FBQ0wsa0JBQUM7SUFBRCxDQUFDLElBQUE7SUFHRDs7O0FBR0E7Ozs7Ozs7O1FBU0ksdUJBQXFCLEVBQVUsRUFDVixJQUFZLEVBQ1osT0FBZSxFQUNmLEtBQWEsRUFDYixhQUFpQztZQUpqQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2Isa0JBQWEsR0FBYixhQUFhLENBQW9CO1NBRXJEO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLElBQUE7SUFHRDs7O0FBR0E7UUFBQTtTQUVDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLElBQUE7SUFHRDs7O0FBR0E7Ozs7Ozs7Ozs7O1FBWUksa0JBQXFCLEVBQVUsRUFDVixVQUFrQixFQUNsQixPQUFlLEVBQ2YsS0FBYSxFQUNiLGFBQTRCLEVBQzVCLFVBQW1CLEVBQ25CLGNBQXVCLEVBQ3ZCLG1CQUE0QjtZQVA1QixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBQzVCLGVBQVUsR0FBVixVQUFVLENBQVM7WUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQVM7WUFDdkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFTO1NBRWhEO1FBQ0wsZUFBQztJQUFELENBQUMsSUFBQTtJQUdEOzs7QUFHQTtRQUFBO1NBRUM7UUFBRCxpQkFBQztJQUFELENBQUMsSUFBQTtJQUdEOzs7OztBQUtBO1FBQUE7U0FFQztRQUFELG1DQUFDO0lBQUQsQ0FBQyxJQUFBO0lBR0Q7Ozs7OztJQU1BO1FBc0JJO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFckIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksNEJBQTRCLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFFN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLElBQUE7SUFFRDs7Ozs7QUFLQTs7Ozs7O1FBT0ksNkJBQ1ksMEJBQXdELEVBQ3hELGVBQWdDLEVBQ2hDLFVBQXNCO1lBRnRCLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBOEI7WUFDeEQsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBQ2hDLGVBQVUsR0FBVixVQUFVLENBQVk7U0FDakM7Ozs7Ozs7O1FBU00sNEJBQVEsR0FBZixVQUFnQixDQUEyQixFQUFFLENBQTJCOztZQUVwRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN2QixPQUFPLENBQUMsQ0FBQzthQUNaO2lCQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUVELElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVyQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtpQkFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLENBQUM7YUFDWjtTQUNKOzs7Ozs7Ozs7OztRQVlELHVEQUF5QixHQUF6QixVQUEwQixZQUFpQzs7WUFHdkQsSUFBTSw2QkFBNkIsR0FBaUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLENBQUM7OztZQUkvRyxLQUFLLElBQU0sc0JBQXNCLElBQUksNkJBQTZCLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLDZCQUE2QixDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDbkg7O1lBR0QsSUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7O1lBSTdELEtBQUssSUFBTSxXQUFXLElBQUksa0JBQWtCLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdkU7O1lBR0QsSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7WUFJbkQsS0FBSyxJQUFNLE9BQU8sSUFBSSxhQUFhLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JEO1NBRUo7Ozs7OztRQU9ELHlEQUEyQixHQUEzQjtZQUNJLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDOzs7Ozs7UUFPRCxnREFBa0IsR0FBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7Ozs7Ozs7UUFRRCx1REFBeUIsR0FBekIsVUFBMEIsT0FBdUI7WUFBdkIsd0JBQUE7Z0JBQUEsY0FBdUI7O1lBRTdDLElBQU0sVUFBVSxHQUF5QixFQUFFLENBQUM7O1lBRzVDLEtBQUssSUFBTSxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDNUMsSUFBTSxRQUFRLEdBQWtCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0I7O1lBR0QsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFHOUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEI7WUFFRCxPQUFPLFVBQVUsQ0FBQztTQUVyQjs7Ozs7OztRQVFELHNEQUF3QixHQUF4QixVQUF5QixRQUFnQjtZQUVyQyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBRXhCLElBQU0sV0FBVyxHQUFrQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLFdBQVcsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQzlELE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDNUI7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsUUFBVSxDQUFDLENBQUM7aUJBQ25EO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO2FBQ2pHO1NBQ0o7Ozs7OztRQU9ELDJDQUFhLEdBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7Ozs7Ozs7UUFRRCxrREFBb0IsR0FBcEIsVUFBcUIsT0FBdUI7WUFBdkIsd0JBQUE7Z0JBQUEsY0FBdUI7O1lBRXhDLElBQU0sVUFBVSxHQUFvQixFQUFFLENBQUM7O1lBR3ZDLEtBQUssSUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkMsSUFBTSxJQUFJLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6Qjs7WUFHRCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUc5QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN4QjtZQUVELE9BQU8sVUFBVSxDQUFDO1NBRXJCOzs7Ozs7O1FBUUQsaURBQW1CLEdBQW5CLFVBQW9CLFFBQWdCO1lBRWhDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFFeEIsSUFBTSxPQUFPLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFcEQsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN0RCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLFFBQVUsQ0FBQyxDQUFDO2lCQUNuRDthQUNKO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQzthQUM1RjtTQUNKO1FBRUwsMEJBQUM7SUFBRCxDQUFDLElBQUE7SUFHRDs7OztBQUlBO1FBMEJJLDhCQUFvQixnQkFBaUM7WUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjs7Ozs7WUFqQjdDLHVCQUFrQixHQUFrQixDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7OztZQUt4Ryx1QkFBa0IsR0FBa0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7WUFLL0QsdUJBQWtCLEdBQWtCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7WUFLckksa0JBQWEsR0FBa0IsSUFBSSxhQUFhLEVBQUUsQ0FBQztTQUcxRDs7Ozs7O1FBT08sNkRBQThCLEdBQXRDO1lBRUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQ3JEQyxrQkFBUTs7OztZQUlKLFVBQUMsTUFBd0I7Z0JBQ3JCLElBQU0sV0FBVyxHQUFHRixRQUFNLENBQUMsUUFBUSxDQUFDOztnQkFFcEMsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Z0JBSXhELE9BQU9OLFNBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQixDQUNKLENBQ0osQ0FBQztTQUNMOzs7Ozs7O1FBUU8sMEVBQTJDLEdBQW5ELFVBQW9ELFdBQW1CO1lBRW5FLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9DQUFvQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDL0VRLGtCQUFROzs7O1lBSUosVUFBQyxNQUF3QjtnQkFDckIsSUFBTSxXQUFXLEdBQUdGLFFBQU0sQ0FBQyxRQUFRLENBQUM7O2dCQUVwQyxJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7OztnQkFJeEQsT0FBT04sU0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzNCLENBQ0osQ0FDSixDQUFDO1NBQ0w7Ozs7Ozs7UUFRTyx1RUFBd0MsR0FBaEQsVUFBaUQsVUFBb0I7WUFFakUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FDMUMsVUFBQSxRQUFRO2dCQUNKLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3BGLENBQ0osQ0FBQztTQUNMOzs7Ozs7UUFPTyxnRUFBaUMsR0FBekM7WUFFSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1NBRXhDOzs7Ozs7OztRQVNPLHVFQUF3QyxHQUFoRCxVQUFpRCxnQkFBK0I7O1lBQzVFLElBQU0saUJBQWlCLEdBQWEsRUFBRSxDQUFDOztnQkFFdkMsS0FBdUIsSUFBQSxxQkFBQUgsU0FBQSxnQkFBZ0IsQ0FBQSxrREFBQSxnRkFBRTtvQkFBcEMsSUFBTSxRQUFRLDZCQUFBO29CQUNmLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7b0JBR2pDLElBQ0ksUUFBUSxLQUFLLGNBQWMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQzdFLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7O3dCQUV6SCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3BDO2lCQUNKOzs7Ozs7Ozs7Ozs7Ozs7WUFFRCxPQUFPLGlCQUFpQixDQUFDO1NBQzVCOzs7Ozs7Ozs7OztRQVlPLG9GQUFxRCxHQUE3RCxVQUE4RCxRQUFnQjtZQUUxRSxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBR2pDLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQzFCLFVBQUMsTUFBYztnQkFDWCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sVUFBVSxLQUFLLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDakQsQ0FBQyxDQUFDOztZQUdQLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQzdCLFVBQUMsTUFBYztnQkFDWCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sVUFBVSxLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7b0JBQ2xELFVBQVUsS0FBSyxjQUFjLENBQUMsbUJBQW1CO29CQUNqRCxVQUFVLEtBQUssY0FBYyxDQUFDLHFCQUFxQjtvQkFDbkQsVUFBVSxLQUFLLGNBQWMsQ0FBQyxXQUFXLENBQUM7YUFDakQsQ0FBQyxDQUFDOztZQUlQLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUc1SCxJQUFJLENBQUMsdUNBQXVDLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBRXpFOzs7Ozs7O1FBUU8sOERBQStCLEdBQXZDLFVBQXdDLFlBQXNCOztZQUUxRCxJQUFNLDBCQUEwQixHQUFHLElBQUksNEJBQTRCLEVBQUUsQ0FBQzs7WUFHdEUsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7O2dCQUU5QixLQUEwQixJQUFBLGlCQUFBQSxTQUFBLFlBQVksQ0FBQSwwQ0FBQSxvRUFBRTtvQkFBbkMsSUFBTSxXQUFXLHlCQUFBO29CQUVsQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUM1RSxNQUFNLElBQUksa0JBQWtCLENBQUMsNEVBQTBFLFdBQWEsQ0FBQyxDQUFDO3FCQUN6SDs7b0JBR0QsMEJBQTBCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7b0JBR3ZHLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBQ3BIOzs7Ozs7Ozs7Ozs7Ozs7O1lBR0QsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQzlEQyxhQUFHLENBQ0MsVUFBQSxZQUFZO2dCQUNSLE9BQU8sSUFBSSxtQkFBbUIsQ0FDMUIsMEJBQTBCLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUM5RixDQUFDO2FBQ0wsQ0FDSixDQUNKLENBQUM7U0FFTDs7Ozs7Ozs7UUFTTyxzRUFBdUMsR0FBL0MsVUFBZ0Qsd0JBQXVDLEVBQUUsd0JBQXVDOzs7O2dCQUc1SCxLQUF1QixJQUFBLDZCQUFBRCxTQUFBLHdCQUF3QixDQUFBLGtFQUFBLHdHQUFFO29CQUE1QyxJQUFNLFFBQVEscUNBQUE7b0JBRWYsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztvQkFHcEMsSUFBTSxhQUFhLEdBQWtCLEVBQUUsQ0FBQztvQkFFeEMsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFFdkQsSUFBSSxvQkFBb0IsU0FBQSxDQUFDOzt3QkFHekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFOzRCQUN6RCxvQkFBb0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt5QkFDcEU7NkJBQU07NEJBQ0gsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDbEU7Ozs0QkFHRCxLQUFzQixJQUFBLHlCQUFBQSxTQUFBLG9CQUFvQixDQUFBLDBEQUFBLDRGQUFFO2dDQUF2QyxJQUFNLE9BQU8saUNBQUE7O2dDQUdkLElBQUksT0FBTyxZQUFZLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxjQUFjLENBQUMsY0FBYyxFQUFFO29DQUVuSCxJQUFJLE9BQU8sU0FBQSxDQUFDOztvQ0FHWixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxTQUFTLEVBQUU7d0NBQ3pELE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQ1UsNkJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7cUNBQ3JKO3lDQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLEVBQUU7d0NBQzdELE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQ0EsNkJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3FDQUMvSTt5Q0FBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxTQUFTLEVBQUU7d0NBQ2hFLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQ0EsNkJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7cUNBQ3JKO3lDQUFNOzt3Q0FFSCxNQUFNLElBQUksU0FBUyxDQUFDLGtDQUFnQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUcsQ0FBQyxDQUFDO3FDQUNuSDs7O29DQU1ELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUNBRS9COzZCQUVKOzs7Ozs7Ozs7Ozs7Ozs7cUJBQ0o7b0JBRUQsSUFBTSxXQUFXLEdBQUcsSUFBSSxhQUFhLENBQ2pDLFdBQVcsRUFDWCxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUNyQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUNwQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNsQyxhQUFhLENBQ2hCLENBQUM7O29CQUdGLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDakU7Ozs7Ozs7Ozs7Ozs7Ozs7WUFHRCxJQUFJLENBQUMsc0RBQXNELENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUN6Rjs7Ozs7Ozs7UUFTTyxtRUFBb0MsR0FBNUMsVUFBNkMsWUFBc0I7O1lBQW5FLGlCQTRCQztZQXpCRyxJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDOztZQUczQyxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7WUFFeEIsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsVUFBQSxXQUFXO2dCQUNQLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFNUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDakUsVUFBQSxJQUFJOztvQkFFQSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDcEMsQ0FDSixDQUFDO2FBQ0wsQ0FBQyxDQUFDO1lBRVAsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNqRFQsYUFBRyxDQUNDLFVBQUEsUUFBUTtnQkFDSixPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSw0QkFBNEIsRUFBRSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzthQUM5RyxDQUNKLENBQ0osQ0FBQztTQUVMOzs7Ozs7OztRQVNPLHFGQUFzRCxHQUE5RCxVQUErRCw0QkFBMkM7Ozs7Z0JBR3RHLEtBQXNCLElBQUEsaUNBQUFELFNBQUEsNEJBQTRCLENBQUEsMEVBQUEsb0hBQUU7b0JBQS9DLElBQU0sT0FBTyx5Q0FBQTtvQkFFZCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRS9CLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDakcsVUFBVSxHQUFHLElBQUksQ0FBQztxQkFDckI7b0JBRUQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUMzQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUN6RyxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN6QjtvQkFFRCxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ25ILG1CQUFtQixHQUFHLElBQUksQ0FBQztxQkFDOUI7b0JBRUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO29CQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFO3dCQUM3RyxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFpQixJQUFLLE9BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFBLENBQUMsQ0FBQztxQkFDdEc7eUJBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDNUQsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7cUJBQ3BFO29CQUVELElBQUksVUFBVSxTQUFBLENBQUM7b0JBQ2YsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDbEQsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzFEOztvQkFHRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FDakQsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNqQyxhQUFhLEVBQ2IsVUFBVSxFQUNWLGNBQWMsRUFDZCxtQkFBbUIsQ0FDdEIsQ0FBQztpQkFFTDs7Ozs7Ozs7Ozs7Ozs7O1NBRUo7Ozs7Ozs7UUFRTyw4REFBK0IsR0FBdkMsVUFBd0MsWUFBc0I7WUFBOUQsaUJBcUJDO1lBbkJHLElBQU0sWUFBWSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFFdEMsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsVUFBQSxPQUFPOztnQkFFSCxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQy9DLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3RELE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxtRUFBaUUsT0FBUyxDQUFDLENBQUM7aUJBQzVHO2dCQUVELFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRSxDQUNKLENBQUM7WUFFRixPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSw0QkFBNEIsRUFBRSxFQUFFLElBQUksZUFBZSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FFM0c7Ozs7OztRQU9NLG9EQUFxQixHQUE1QjtZQUFBLGlCQW9CQztZQWxCRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O2dCQUU1QyxPQUFPLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLElBQUksQ0FDN0NDLGFBQUcsQ0FDQyxVQUFBLFFBQVE7b0JBQ0osS0FBSSxDQUFDLHdDQUF3QyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJOzt3QkFFekUsT0FBTyxLQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUM5RCxDQUFDLENBQUMsQ0FBQztvQkFDSixPQUFPLEtBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO2lCQUNuRCxDQUNKLENBQ0osQ0FBQzthQUNMO2lCQUFNOztnQkFFSCxPQUFPVyxPQUFFLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsQ0FBQzthQUN2RDtTQUVKOzs7Ozs7O1FBU08sb0RBQXFCLEdBQTdCLFVBQThCLFlBQXNCO1lBQXBELGlCQXVCQzs7WUFwQkcsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDOztZQUd2QixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVzs7Z0JBRTVCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLDJDQUEyQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDL0VYLGFBQUcsQ0FDQyxVQUFDLFFBQWdCOztvQkFFYixLQUFJLENBQUMscURBQXFELENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3hFLENBQ0osQ0FDSixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7Ozs7O1lBTUgsT0FBT1ksYUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hDOzs7Ozs7O1FBU00sZ0VBQWlDLEdBQXhDLFVBQXlDLFlBQXNCO1lBQS9ELGlCQXdCQztZQXRCRyxJQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQzNDLFVBQUEsV0FBVzs7Z0JBRVAsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsQ0FBQzthQUNyRixDQUFDLENBQUM7O1lBR1AsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUVoQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDdkRGLGtCQUFRLENBQ0osVUFBQSxPQUFPOztvQkFFSCxPQUFPLEtBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDN0QsQ0FDSixDQUNKLENBQUM7YUFDTDtpQkFBTTtnQkFFSCxPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3RDtTQUVKOzs7Ozs7Ozs7O1FBV00sMERBQTJCLEdBQWxDLFVBQW1DLGlCQUEyQjtZQUE5RCxpQkFpQ0M7WUEvQkcsSUFBTSxzQkFBc0IsR0FBYSxpQkFBaUIsQ0FBQyxNQUFNLENBQzdELFVBQUEsV0FBVzs7Z0JBR1AsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLENBQUM7YUFFeEUsQ0FBQyxDQUFDO1lBRVAsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFHbkMsSUFBTSxZQUFZLEdBQWEsc0JBQXNCLENBQUMsR0FBRyxDQUNyRCxVQUFBLFdBQVc7b0JBQ1AsT0FBTyxLQUFLLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3pELENBQ0osQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O2dCQUdwQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2hEQSxrQkFBUSxDQUNKLFVBQUEsT0FBTztvQkFFSCxPQUFPLEtBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN2RSxDQUNKLENBQ0osQ0FBQzthQUNMO2lCQUFNO2dCQUVILE9BQU8sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFFdkU7U0FDSjs7Ozs7Ozs7UUFTTSxxREFBc0IsR0FBN0IsVUFBOEIsWUFBc0I7WUFBcEQsaUJBdUNDO1lBckNHLElBQU0saUJBQWlCLEdBQWEsWUFBWSxDQUFDLE1BQU0sQ0FDbkQsVUFBQSxPQUFPOztnQkFHSCxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQy9DLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjs7Z0JBR0QsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLENBQUM7YUFDL0QsQ0FDSixDQUFDO1lBRUYsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFHOUIsSUFBTSxZQUFZLEdBQWEsaUJBQWlCLENBQUMsR0FBRyxDQUNoRCxVQUFBLE9BQU87b0JBQ0gsT0FBTyxLQUFLLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JELENBQ0osQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O2dCQUdwQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2hEVixhQUFHLENBQ0MsVUFBQSxPQUFPO29CQUNILElBQUksT0FBTyxFQUFFO3dCQUNULE9BQU8sS0FBSSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUM3RDt5QkFBTTt3QkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7cUJBQy9GO2lCQUNKLENBQ0osQ0FDSixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsT0FBT1csT0FBRSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7O29CQTlrQkpQLGFBQVUsU0FBQzt3QkFDUixVQUFVLEVBQUUsTUFBTTtxQkFDckI7Ozs7O3dCQWpaUSxlQUFlOzs7O21DQUp4QjtLQWsrQkM7O0lDLzlCRDs7O0FBR0E7Ozs7OztRQVlJLCtCQUE0QixTQUE4QixFQUFrQixpQkFBeUI7WUFBekUsY0FBUyxHQUFULFNBQVMsQ0FBcUI7WUFBa0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFROzs7O1lBUHJGLHdCQUFtQixHQUF3QixJQUFJLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FROUY7UUFFTCw0QkFBQztJQUFELENBQUM7O0lDckJEOzs7QUFHQTs7Ozs7UUFNSSwwQkFBNEIsZUFBdUI7WUFBdkIsb0JBQWUsR0FBZixlQUFlLENBQVE7U0FFbEQ7UUFDTCx1QkFBQztJQUFELENBQUM7O0lDVEQ7OztBQUlBOzs7Ozs7UUFPSSxrQ0FBcUIsbUJBQTRDLEVBQVcsT0FBc0I7WUFBN0Usd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF5QjtZQUFXLFlBQU8sR0FBUCxPQUFPLENBQWU7U0FFakc7UUFFTCwrQkFBQztJQUFELENBQUM7O0lDZkQ7Ozs7QUFLQTs7Ozs7UUFNSSxxQkFBcUIsY0FBNEI7WUFBNUIsbUJBQWMsR0FBZCxjQUFjLENBQWM7U0FFaEQ7Ozs7OztRQU9ELG1DQUFhLEdBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQW9CLENBQUM7U0FDeEY7UUFDTCxrQkFBQztJQUFELENBQUM7O0lDcEJEOzs7QUFHQTtRQUdtQ04saUNBQVU7UUFIN0M7WUFBQSxxRUFrQ0M7WUE3QlcsVUFBSSxHQUFXLGVBQWUsQ0FBQzs7U0E2QjFDOzs7Ozs7UUF0Qkcsb0NBQVksR0FBWjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQkUsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxHQUFBLENBQUMsRUFDeEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7Ozs7Ozs7UUFRRCxxQ0FBYSxHQUFiLFVBQWMsR0FBVztZQUNyQixJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0JELGFBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBQSxDQUFDLEVBQ3RFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztTQUNMOztvQkFoQ0pHLGFBQVUsU0FBQzt3QkFDUixVQUFVLEVBQUUsTUFBTTtxQkFDckI7Ozs0QkFYRDtLQTJDQyxDQS9Ca0MsVUFBVTs7SUNRN0M7OztBQUdBO1FBR2tDTixnQ0FBVTtRQUg1QztZQUFBLHFFQTBHQztZQXJHVyxVQUFJLEdBQVcsY0FBYyxDQUFDOztTQXFHekM7Ozs7Ozs7Ozs7UUF4RkcsK0JBQVEsR0FBUixVQUFTLFVBQW1CO1lBQ3hCLElBQUksVUFBVSxFQUFFO2dCQUNaLElBQUksQ0FBQyxJQUFJLElBQUksY0FBYyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hFO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CRSxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEdBQUEsQ0FBQyxFQUN0RUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7OztRQVFELDhCQUFPLEdBQVAsVUFBUSxPQUFlO1lBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbkVELGFBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksR0FBQSxDQUFDLEVBQ3BFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztTQUNMOzs7Ozs7O1FBUUQsa0NBQVcsR0FBWCxVQUFZLE9BQWU7WUFDdkIsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsR0FBQSxDQUFDLEVBQzVFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztTQUNMOzs7Ozs7O1FBUUQsc0NBQWUsR0FBZixVQUFnQixPQUFlO1lBQzNCLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxRQUFRLEdBQUEsQ0FBQyxFQUNoRkMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7OztRQWFELGlDQUFVLEdBQVYsVUFBVyxPQUEwQjtZQUNqQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3pDRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7OztRQWFELHFDQUFjLEdBQWQsVUFBZSxPQUE4QjtZQUN6QyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4Q0QsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEdBQUEsQ0FBQyxFQUM1RUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FFTDs7b0JBekdKRyxhQUFVLFNBQUM7d0JBQ1IsVUFBVSxFQUFFLE1BQU07cUJBQ3JCOzs7MkJBekJEO0tBaUlDLENBdkdpQyxVQUFVOztJQ2xCNUM7OztBQUdBO1FBR3FDTixtQ0FBVTtRQUgvQzs7U0FxTUM7Ozs7Ozs7OztRQXZMRyx3Q0FBYyxHQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUN2Q0UsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEdBQUEsQ0FBQyxFQUM1RUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7OztRQVFELHlDQUFlLEdBQWYsVUFBZ0IsR0FBVztZQUN2QixJQUFNLEdBQUcsR0FBVyxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7Ozs7Ozs7UUFRRCwrQ0FBcUIsR0FBckIsVUFBc0IsU0FBaUI7WUFDbkMsSUFBTSxHQUFHLEdBQUcsNEJBQTRCLEdBQUcsU0FBUyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjs7Ozs7OztRQVFELCtDQUFxQixHQUFyQixVQUFzQixTQUFpQjtZQUNuQyxJQUFNLEdBQUcsR0FBRyw0QkFBNEIsR0FBRyxTQUFTLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9COzs7Ozs7OztRQVNTLG9DQUFVLEdBQXBCLFVBQXFCLEdBQVc7WUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDekJELGFBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sR0FBQSxDQUFDLEVBQzFFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztTQUNMOzs7Ozs7OztRQVNELGdEQUFzQixHQUF0QixVQUF1QixHQUFXO1lBQzlCLElBQU0sR0FBRyxHQUFHLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBRTtZQUMzRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qzs7Ozs7Ozs7UUFTRCxzREFBNEIsR0FBNUIsVUFBNkIsU0FBaUI7WUFDMUMsSUFBTSxHQUFHLEdBQUcsNEJBQTRCLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBRTtZQUNuRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qzs7Ozs7Ozs7UUFTRCxzREFBNEIsR0FBNUIsVUFBNkIsU0FBaUI7WUFDMUMsSUFBTSxHQUFHLEdBQUcsNEJBQTRCLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUNsRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qzs7Ozs7Ozs7UUFTUSwyQ0FBaUIsR0FBekIsVUFBMEIsR0FBVztZQUNsQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUN6QkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLEdBQUEsQ0FBQyxFQUNqRkMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7OztRQWFELHVDQUFhLEdBQWIsVUFBYyxJQUFTO1lBQ25CLElBQU0sR0FBRyxHQUFXLGlCQUFpQixDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQ0QsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxHQUFBLENBQUMsRUFDMUVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7Ozs7Ozs7Ozs7O1FBYUQsdUNBQWEsR0FBYixVQUFjLEdBQVcsRUFBRSxJQUFTO1lBQ2hDLElBQU0sR0FBRyxHQUFXLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxHQUFBLENBQUMsRUFDMUVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7Ozs7Ozs7UUFTRCx5Q0FBZSxHQUFmLFVBQWdCLEdBQVc7WUFDdkIsSUFBTSxJQUFJLEdBQVE7Z0JBQ2QsTUFBTSxFQUFFLElBQUk7YUFDZixDQUFDO1lBRUYsSUFBTSxHQUFHLEdBQVcsc0JBQXNCLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFckUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLEdBQUEsQ0FBQyxFQUMxRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7OztRQWFELHVDQUFhLEdBQWIsVUFBYyxHQUFXO1lBQ3JCLElBQU0sR0FBRyxHQUFXLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLEdBQUEsQ0FBQyxFQUMxRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7b0JBbk1KRyxhQUFVLFNBQUM7d0JBQ1IsVUFBVSxFQUFFLE1BQU07cUJBQ3JCOzs7OEJBYkQ7S0FnTkMsQ0FsTW9DLFVBQVU7O0lDSC9DOzs7QUFHQTtRQUdrQ04sZ0NBQVU7UUFINUM7O1NBb1ZDOzs7Ozs7Ozs7UUF2VUcsa0NBQVcsR0FBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQ3BDRSxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEdBQUEsQ0FBQyxFQUN0RUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7O1FBVU8sOEJBQU8sR0FBZixVQUFnQixVQUFrQixFQUFFLGNBQXNCO1lBQ3RELElBQU0sSUFBSSxHQUFHLGVBQWUsR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzFCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7OztRQVFELG1DQUFZLEdBQVosVUFBYSxHQUFXO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkM7Ozs7Ozs7UUFRRCxxQ0FBYyxHQUFkLFVBQWUsS0FBYTtZQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDOzs7Ozs7O1FBUUQsd0NBQWlCLEdBQWpCLFVBQWtCLFFBQWdCO1lBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDN0M7Ozs7OztRQU9ELCtDQUF3QixHQUF4QixVQUF5QixPQUFlO1lBQ3BDLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUNsRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMxQkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFBLENBQUMsRUFDdEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBRUw7Ozs7Ozs7Ozs7UUFZRCxpQ0FBVSxHQUFWLFVBQVcsSUFBUztZQUNoQixJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2pDRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7UUFTRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBZSxFQUFFLFVBQWtCO1lBQ2hELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzNCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7UUFTRCw0Q0FBcUIsR0FBckIsVUFBc0IsT0FBZSxFQUFFLFVBQWtCO1lBQ3JELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFILE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzdCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7UUFTRCw0Q0FBcUIsR0FBckIsVUFBc0IsT0FBZSxFQUFFLFVBQWtCO1lBQ3JELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzNCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7UUFTRCxpREFBMEIsR0FBMUIsVUFBMkIsT0FBZSxFQUFFLFVBQWtCO1lBQzFELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzdCRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7OztRQVFELHFDQUFjLEdBQWQsVUFBZSxPQUFlLEVBQUUsUUFBZ0I7WUFDNUMsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcscUJBQXFCLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEgsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDM0JELGFBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksR0FBQSxDQUFDLEVBQ3BFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztTQUVMOzs7Ozs7O1FBUUQsMENBQW1CLEdBQW5CLFVBQW9CLE9BQWUsRUFBRSxRQUFnQjtZQUNqRCxJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0SCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM3QkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxHQUFBLENBQUMsRUFDcEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBRUw7Ozs7Ozs7Ozs7UUFjRCwyQ0FBb0IsR0FBcEIsVUFBcUIsT0FBZTtZQUNoQyxJQUFNLElBQUksR0FBRztnQkFDVCxnQ0FBZ0MsRUFBRSxJQUFJO2FBQ3pDLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFcEQ7Ozs7OztRQU9ELGdEQUF5QixHQUF6QixVQUEwQixPQUFlO1lBQ3JDLElBQU0sSUFBSSxHQUFHO2dCQUNULGdDQUFnQyxFQUFFLEtBQUs7YUFDMUMsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwRDs7Ozs7Ozs7Ozs7UUFZTyw0Q0FBcUIsR0FBN0IsVUFBOEIsT0FBZSxFQUFFLElBQVM7WUFDcEQsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQ2hGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQ0QsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxHQUFBLENBQUMsRUFDcEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7Ozs7Ozs7UUFTRCxtQ0FBWSxHQUFaLFVBQWEsT0FBZTtZQUN4QixJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7WUFFM0UsSUFBTSxJQUFJLEdBQVE7Z0JBQ2QsTUFBTSxFQUFFLElBQUk7YUFDZixDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2hDRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7O1FBV0Qsd0NBQWlCLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxXQUFtQixFQUFFLFdBQW1CO1lBQ3ZFLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUU3RSxJQUFNLElBQUksR0FBRztnQkFDVCxXQUFXLEVBQUUsV0FBVztnQkFDeEIsaUJBQWlCLEVBQUUsV0FBVzthQUNqQyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2hDRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7Ozs7O1FBVUQsMENBQW1CLEdBQW5CLFVBQW9CLE9BQWUsRUFBRSxpQkFBeUIsRUFBRSxXQUFtQjtZQUMvRSxJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUM7WUFFN0UsSUFBTSxJQUFJLEdBQUc7Z0JBQ1QsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLGlCQUFpQixFQUFFLGlCQUFpQjthQUN2QyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2hDRCxhQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxFQUNwRUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7U0FDTDs7Ozs7O1FBT0QsaURBQTBCLEdBQTFCLFVBQTJCLE9BQWUsRUFBRSxJQUFTO1lBQ2pELElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLHVCQUF1QixDQUFDO1lBRXpGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoQ0QsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxHQUFBLENBQUMsRUFDcEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7Ozs7Ozs7Ozs7UUFhRCxpQ0FBVSxHQUFWLFVBQVcsT0FBZTtZQUN0QixJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM3QkQsYUFBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxHQUFBLENBQUMsRUFDcEVDLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO1NBRUw7O29CQWpWSkcsYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7OzJCQWhCRDtLQWtXQyxDQWpWaUMsVUFBVTs7O1FDZDVDO1lBS1UsWUFBTyxHQUFHLElBQUlTLFlBQU8sRUFBTyxDQUFDO1NBU3RDO1FBUEMscUNBQVcsR0FBWCxVQUFZLElBQVk7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNsQztRQUNELHFDQUFXLEdBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDcEM7O29CQVpGVCxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7OEJBTEQ7S0FpQkM7OztRQ0pDLDBCQUFvQixLQUFpQixFQUNBLE1BQU07WUFEdkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtZQUNBLFdBQU0sR0FBTixNQUFNLENBQUE7U0FDMUM7Ozs7Ozs7UUFRRCx1Q0FBWSxHQUFaO1lBRUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQztpQkFDbkUsSUFBSSxDQUFDSixhQUFHLENBQ1AsVUFBQyxHQUFRO2dCQUNQLE9BQU8sR0FBRyxDQUFDO2FBQ1osRUFDRCxVQUFBLEdBQUc7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQixDQUNGLENBQ0EsQ0FBQztTQUVMOztvQkE1QkZJLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3dCQVRRQyxhQUFVO3dEQWFkQyxTQUFNLFNBQUMsa0JBQWtCOzs7OytCQWQ5QjtLQXFDQzs7SUNQRCxXQUFjLGFBQWE7Ozs7Ozs7Ozs7UUFXdkIsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLFFBQVE7WUFDOUIsT0FBTyxRQUFRLEtBQUssS0FBSzttQkFDbEIsUUFBUSxLQUFLLE9BQU87bUJBQ3BCLFFBQVEsS0FBSyxjQUFjLENBQUMsU0FBUzttQkFDckMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7bUJBQzdDLFFBQVEsS0FBSyxjQUFjLENBQUMsY0FBYzttQkFDMUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxZQUFZO21CQUN4QyxRQUFRLEtBQUssY0FBYyxDQUFDLG9CQUFvQjttQkFDaEQsUUFBUSxLQUFLLGNBQWMsQ0FBQyxjQUFjO21CQUMxQyxRQUFRLEtBQUssY0FBYyxDQUFDLE1BQU07bUJBQ2xDLFFBQVEsS0FBSyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQ3BELENBQUM7Ozs7Ozs7O1FBVUYsU0FBUyxxQkFBcUIsQ0FBQyxjQUFzQjtZQUVqRCxJQUFNLFVBQVUsR0FBbUIsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFM0UsT0FBTyxJQUFJLFlBQVksQ0FDbkIsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUNyQixjQUFjLENBQUMsT0FBTyxDQUFDLEVBQ3ZCLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQ3hDLEVBQUU7WUFDRixFQUFFO1lBQ0YsRUFBRTtZQUNGLEVBQUU7WUFDRixVQUFVLENBQ2IsQ0FBQztTQUNMOzs7Ozs7Ozs7OztRQVlELFNBQVMsdUJBQXVCLENBQzVCLFNBQWlCLEVBQUUsT0FBZSxFQUFFLGtCQUFtQzs7O1lBSXZFLElBQUksaUJBQW1DLENBQUM7O1lBR3hDLFFBQVEsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsS0FBSyxjQUFjLENBQUMsU0FBUzs7b0JBRXpCLElBQUksU0FBUyxTQUFrQixDQUFDO29CQUVoQyxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUN2RCxTQUFTLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFDN0c7eUJBQU0sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFFaEUsSUFBTSxpQkFBaUIsR0FBb0MsRUFBRSxDQUFDOzs7OzRCQUk5RCxLQUEyQixJQUFBLHVCQUFBUCxTQUFBLGtCQUFrQixDQUFBLHNEQUFBLHNGQUFFO2dDQUExQyxJQUFNLFlBQVksK0JBQUE7Z0NBQ25CLElBQU0sV0FBVyxHQUFpQixZQUFZLENBQUMsZ0JBQWdCLENBQUM7Z0NBQ2hFLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUM7NkJBQ25EOzs7Ozs7Ozs7Ozs7Ozs7d0JBRUQsU0FBUyxHQUFHLElBQUksbUJBQW1CLENBQy9CLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsRUFBRSxpQkFBaUIsQ0FDMUYsQ0FBQztxQkFDTDt5QkFBTSxJQUNILFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQzlILFNBQVMsR0FBRyxJQUFJLGtCQUFrQixDQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUM1SCxDQUFDO3FCQUNMO3lCQUFNOzt3QkFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztxQkFDNUU7b0JBRUQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO29CQUM5QixNQUFNO2dCQUVWLEtBQUssY0FBYyxDQUFDLFNBQVM7b0JBQ3pCLElBQU0sU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEQsT0FBTyxFQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUMvQyxTQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQzdDLFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUM1QyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQ2hELFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM5QyxTQUFTLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFFbEQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO29CQUM5QixNQUFNO2dCQUVWLEtBQUssY0FBYyxDQUFDLFNBQVM7b0JBRXpCLElBQUksU0FBUyxTQUFlLENBQUM7O29CQUc3QixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLEVBQUU7O3dCQUc1RCxJQUFNLGdCQUFnQixHQUFpQixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFFM0csU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7cUJBQ25HO3lCQUFNLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFNBQVMsRUFBRTs7d0JBR3RFLElBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUVuRixTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3FCQUNqRjt5QkFBTSxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLEVBQUU7O3dCQUduRSxJQUFNLGdCQUFnQixHQUFpQixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFFM0csU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7cUJBQ25HO3lCQUFNLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFNBQVMsRUFBRTs7d0JBR3RFLElBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUVuRixTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3FCQUNqRjtvQkFFRCxpQkFBaUIsR0FBRyxTQUFTLENBQUM7b0JBQzlCLE1BQU07Z0JBRVYsS0FBSyxjQUFjLENBQUMsUUFBUTtvQkFFeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO29CQUNsSCxpQkFBaUIsR0FBRyxRQUFRLENBQUM7b0JBRTdCLE1BQU07Z0JBRVYsS0FBSyxjQUFjLENBQUMsWUFBWTs7b0JBRzVCLElBQU0sTUFBTSxHQUFXLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFN0YsSUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM3RSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7b0JBRWpDLE1BQU07O2dCQUdWLEtBQUssY0FBYyxDQUFDLG1CQUFtQjtvQkFFbkMsSUFBTSxtQkFBbUIsR0FBNEIsSUFBSSx1QkFBdUIsQ0FDNUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixPQUFPLEVBQ1AsU0FBUyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM5QyxTQUFTLENBQUMsY0FBYyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQ3JFLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQ2xELFNBQVMsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsRUFDcEQsU0FBUyxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUN2RCxDQUFDO29CQUVGLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO29CQUV4QyxNQUFNO2dCQUVWLEtBQUssY0FBYyxDQUFDLGFBQWE7b0JBRTdCLElBQU0sYUFBYSxHQUFHLElBQUksaUJBQWlCLENBQ3ZDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsT0FBTyxFQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FDckQsQ0FBQztvQkFFRixpQkFBaUIsR0FBRyxhQUFhLENBQUM7b0JBRWxDLE1BQU07Z0JBRVYsS0FBSyxjQUFjLENBQUMsVUFBVTtvQkFFMUIsSUFBTSxjQUFjLEdBQW1CLElBQUksY0FBYyxDQUNyRCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQzlDLENBQUM7b0JBRUYsaUJBQWlCLEdBQUcsY0FBYyxDQUFDO29CQUVuQyxNQUFNO2dCQUVWLEtBQUssY0FBYyxDQUFDLFNBQVM7b0JBRXpCLElBQU0sYUFBYSxHQUFrQixJQUFJLGFBQWEsQ0FDbEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixPQUFPLEVBQ1AsU0FBUyxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNwRCxDQUFDO29CQUVGLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztvQkFFbEMsTUFBTTtnQkFFVixLQUFLLGNBQWMsQ0FBQyxRQUFRO29CQUV4QixJQUFNLFFBQVEsR0FBaUIsSUFBSSxZQUFZLENBQzNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsT0FBTyxFQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQ3BELENBQUM7b0JBRUYsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO29CQUU3QixNQUFNO2dCQUVWLEtBQUssY0FBYyxDQUFDLFlBQVk7b0JBRTVCLElBQU0sU0FBUyxHQUFxQixJQUFJLGdCQUFnQixDQUNwRCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQ2xELENBQUM7b0JBRUYsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO29CQUU5QixNQUFNO2dCQUdWLEtBQUssY0FBYyxDQUFDLGFBQWE7O29CQUc3QixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZGLElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFbkYsSUFBTSxhQUFhLEdBQXNCLElBQUksaUJBQWlCLENBQzFELFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsT0FBTyxFQUNQLFFBQVEsRUFDUixNQUFNLENBQ1QsQ0FBQztvQkFFRixpQkFBaUIsR0FBRyxhQUFhLENBQUM7b0JBRWxDLE1BQU07Z0JBRVYsS0FBSyxjQUFjLENBQUMsU0FBUztvQkFFekIsSUFBTSxTQUFTLEdBQWtCLElBQUksYUFBYSxDQUM5QyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ3BELFNBQVMsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FDckQsQ0FBQztvQkFFRixpQkFBaUIsR0FBRyxTQUFTLENBQUM7b0JBRTlCLE1BQU07Z0JBRVY7O29CQUVJLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQzdHLE1BQU07YUFDYjtZQUVELE9BQU8saUJBQWlCLENBQUM7U0FFNUI7Ozs7Ozs7O1FBVUQsU0FBUyx1QkFBdUIsQ0FBQyxjQUFzQjs7OztZQUluRCxJQUFNLHdCQUF3QixHQUFXLGNBQWMsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7WUFHL0YsSUFBTSxrQkFBa0IsR0FBb0IsRUFBRSxDQUFDOzs7WUFJL0MsSUFBSSx3QkFBd0IsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFOztvQkFDbkYsS0FBaUMsSUFBQSw2QkFBQUEsU0FBQSx3QkFBd0IsQ0FBQSxrRUFBQSx3R0FBRTt3QkFBdEQsSUFBTSxrQkFBa0IscUNBQUE7d0JBQ3pCLElBQU0sV0FBVyxHQUFrQix1QkFBdUIsQ0FDdEQsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FDL0MsQ0FBQzt3QkFFbkIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUN4Qzs7Ozs7Ozs7Ozs7Ozs7O2FBQ0o7aUJBQU0sSUFBSSx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7Z0JBQy9DLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUN2Qyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUNyRCxDQUFDO2dCQUVuQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDeEM7WUFFRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztZQUc1QyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRS9DLElBQU0sVUFBVSxHQUFtQixFQUFFLENBQUM7OztnQkFHdEMsS0FBdUIsSUFBQSxjQUFBQSxTQUFBLFNBQVMsQ0FBQSxvQ0FBQSwyREFBRTtvQkFBN0IsSUFBTSxRQUFRLHNCQUFBO29CQUVmLElBQU0sVUFBVSxHQUE0QixFQUFFLENBQUM7O29CQUcvQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7Ozs7NEJBSXpDLEtBQXdCLElBQUEsS0FBQUEsU0FBQSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQTdDLElBQU0sU0FBUyxXQUFBOztnQ0FHaEIsSUFBTSxpQkFBaUIsR0FBcUIsdUJBQXVCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzs7Z0NBSTdHLElBQUksaUJBQWlCLEtBQUssU0FBUztvQ0FBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBRTNFOzs7Ozs7Ozs7Ozs7Ozs7cUJBQ0o7eUJBQU07O3dCQUdILElBQU0saUJBQWlCLEdBQXFCLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7O3dCQUk1SCxJQUFJLGlCQUFpQixLQUFLLFNBQVM7NEJBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUMzRTs7b0JBR0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztpQkFFckM7Ozs7Ozs7Ozs7Ozs7OztZQUVELE9BQU8sVUFBVSxDQUFDO1NBQ3JCOzs7Ozs7OztRQVNELFNBQWdCLHFDQUFxQyxDQUFDLHVCQUErQjs7WUFFakYsSUFBTSxTQUFTLEdBQXdCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLGlCQUF5QixDQUFDO1lBQzlCLElBQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUd6RCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7O2dCQUU5QixpQkFBaUIsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDOztvQkFFMUMsS0FBNkIsSUFBQSxtQkFBQUEsU0FBQSxjQUFjLENBQUEsOENBQUEsMEVBQUU7d0JBQXhDLElBQU0sY0FBYywyQkFBQTt3QkFFckIsSUFBTSxRQUFRLEdBQWlCLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDOzt3QkFHckUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDNUI7Ozs7Ozs7Ozs7Ozs7OzthQUNKO2lCQUFNO2dCQUNILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O29CQUVuRCxpQkFBaUIsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO3FCQUFNOztvQkFHSCxpQkFBaUIsR0FBRyxDQUFDLENBQUM7b0JBRXRCLElBQU0sUUFBUSxHQUFpQixxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztvQkFHOUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUI7YUFDSjtZQUVELE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUVsRTtRQXBDZSxtREFBcUMsd0NBb0NwRCxDQUFBOzs7Ozs7OztRQVNELFNBQVMsMEJBQTBCLENBQUMsY0FBc0I7O1lBRXRELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7O1lBRTVDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFL0MsSUFBTSx1QkFBdUIsR0FBRyxFQUFFLENBQUM7O2dCQUVuQyxLQUFtQixJQUFBLGNBQUFBLFNBQUEsU0FBUyxDQUFBLG9DQUFBLDJEQUFFO29CQUF6QixJQUFNLElBQUksc0JBQUE7O29CQUdYLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7NEJBRXJDLEtBQTBCLElBQUEsS0FBQUEsU0FBQSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQTNDLElBQU0sV0FBVyxXQUFBOztnQ0FHbEIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssY0FBYyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEtBQUssU0FBUyxFQUFFOztvQ0FHbkgsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lDQUN6RjtxQ0FBTSxJQUNILFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxjQUFjLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLEVBQUU7O29DQUVuSCx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUNBQ3pGOzZCQUVKOzs7Ozs7Ozs7Ozs7Ozs7cUJBQ0o7eUJBQU07Ozt3QkFJSCxJQUNJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0NBQ3pCLGNBQWMsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztnQ0FDbkYsU0FBUyxFQUFFOzs0QkFHZix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7eUJBQ2xHOzZCQUFNLElBQ0gsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQ0FDekIsY0FBYyxDQUFDLFNBQVMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDO2dDQUNuRixTQUFTLEVBQUU7OzRCQUVmLHVCQUF1QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDbEc7cUJBQ0o7aUJBRUo7Ozs7Ozs7Ozs7Ozs7OztZQUVELE9BQU8sdUJBQXVCLENBQUM7U0FFbEM7Ozs7Ozs7O1FBU0QsU0FBZ0IsNEJBQTRCLENBQUMsdUJBQStCOztZQUV4RSxJQUFNLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLGVBQWUsR0FBa0IsRUFBRSxDQUFDOztZQUd4QyxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7OztvQkFHOUIsS0FBNkIsSUFBQSxtQkFBQUEsU0FBQSxjQUFjLENBQUEsOENBQUEsMEVBQUU7d0JBQXhDLElBQU0sY0FBYywyQkFBQTs7d0JBRXJCLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O3dCQUc5QyxJQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUUzRSxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3FCQUVyRTs7Ozs7Ozs7Ozs7Ozs7O2FBRUo7aUJBQU07O2dCQUdILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ25ELE9BQU8sRUFBRSxDQUFDO2lCQUNiO3FCQUFNO29CQUNILGVBQWUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7b0JBR3ZELElBQU0sdUJBQXVCLEdBQUcsMEJBQTBCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFFcEYsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDckU7YUFDSjs7WUFHRCxPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FFNUQ7UUF0Q2UsMENBQTRCLCtCQXNDM0MsQ0FBQTs7Ozs7Ozs7UUFTRCxTQUFnQixzQkFBc0IsQ0FBQyxnQkFBd0I7WUFDM0QsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDckY7UUFGZSxvQ0FBc0IseUJBRXJDLENBQUE7SUFDTCxDQUFDLEVBaGhCYWUscUJBQWEsS0FBYkEscUJBQWEsUUFnaEIxQjs7SUNwaUJEOzs7QUFHQTtRQUdxQ2hCLG1DQUFVO1FBRTNDLHlCQUFtQixJQUFnQixFQUNZLE1BQU0sRUFDakMscUJBQTJDO1lBRi9ELFlBR0ksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtZQUprQixVQUFJLEdBQUosSUFBSSxDQUFZO1lBQ1ksWUFBTSxHQUFOLE1BQU0sQ0FBQTtZQUNqQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXNCOztTQUU5RDs7Ozs7OztRQVFELHFDQUFXLEdBQVgsVUFBWSxHQUFHO1lBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkU7Ozs7Ozs7UUFRRCx5Q0FBZSxHQUFmLFVBQWdCLEdBQVc7WUFBM0IsaUJBZ0NDO1lBL0JHLElBQU0sR0FBRyxHQUFtRCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1lBSXJILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWFksa0JBQVE7O1lBRUosSUFBSSxDQUFDLGFBQWEsQ0FDckIsRUFDREEsa0JBQVE7O1lBRUosVUFBQyxnQkFBd0I7O2dCQUVyQixJQUFNLE1BQU0sR0FBMEJJLHFCQUFhLENBQUMscUNBQXFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Z0JBRzVHLElBQU0saUJBQWlCLEdBQWFBLHFCQUFhLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Z0JBR2pHLE9BQU8sS0FBSSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUNqRmQsYUFBRyxDQUNDLFVBQUMsUUFBNkI7O29CQUUxQixNQUFNLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQy9ELE9BQU8sTUFBTSxDQUFDO2lCQUNqQixDQUNKLENBQ0osQ0FBQzthQUNMLENBQ0osQ0FDSixDQUFDO1NBQ0w7O29CQTNESkksYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7Ozs7d0JBZlFDLGFBQVU7d0RBbUJGQyxTQUFNLFNBQUMsa0JBQWtCO3dCQVpqQyxvQkFBb0I7Ozs7OEJBUDdCO0tBMkVDLENBM0RvQyxVQUFVOztJQ04vQzs7O0FBR0E7UUFHbUNSLGlDQUFVO1FBRXpDLHVCQUFtQixJQUFnQixFQUNZLE1BQU0sRUFDakMscUJBQTJDO1lBRi9ELFlBR0ksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtZQUprQixVQUFJLEdBQUosSUFBSSxDQUFZO1lBQ1ksWUFBTSxHQUFOLE1BQU0sQ0FBQTtZQUNqQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXNCOzs7Ozs7OztZQVd2RCx5Q0FBbUMsR0FBb0UsVUFBQyxnQkFBd0I7O2dCQUVwSSxJQUFNLE1BQU0sR0FBMEJnQixxQkFBYSxDQUFDLHFDQUFxQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O2dCQUc1RyxJQUFNLGlCQUFpQixHQUFhQSxxQkFBYSxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLENBQUM7O2dCQUdqRyxPQUFPLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FDakZkLGFBQUcsQ0FDQyxVQUFDLFFBQTZCOztvQkFFMUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvRCxPQUFPLE1BQU0sQ0FBQztpQkFDakIsQ0FDSixDQUNKLENBQUM7YUFDTCxDQUFBOztTQTFCQTs7Ozs7Ozs7O1FBb0NELHdDQUFnQixHQUFoQixVQUFpQixVQUFrQixFQUFFLE1BQWtCO1lBQWxCLHVCQUFBO2dCQUFBLFVBQWtCOztZQUVuRCxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JELE9BQU9PLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2FBQzNIO1lBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSVEsYUFBVSxFQUFFLENBQUM7WUFFbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXpELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQy9EOzs7Ozs7OztRQVNELDREQUFvQyxHQUFwQyxVQUFxQyxVQUFrQixFQUFFLE1BQWtCO1lBQWxCLHVCQUFBO2dCQUFBLFVBQWtCOztZQUN2RSxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JELE9BQU9SLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2FBQzNIO1lBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSVEsYUFBVSxFQUFFLENBQUM7WUFFbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXpELElBQU0sR0FBRyxHQUFvQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFbEYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYTCxrQkFBUTs7WUFFSixJQUFJLENBQUMsYUFBYSxDQUNyQixFQUNEQSxrQkFBUTs7WUFFSixJQUFJLENBQUMsbUNBQW1DLENBQzNDLENBQ0osQ0FBQztTQUNMOzs7Ozs7OztRQVNELGtEQUEwQixHQUExQixVQUEyQixVQUFrQjtZQUV6QyxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JELE9BQU9ILGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLDJFQUEyRSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2FBQ3JJO1lBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQ3pEOzs7Ozs7O1FBUUQsa0VBQTBDLEdBQTFDLFVBQTJDLFVBQWtCO1lBRXpELElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckQsT0FBT0EsZUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkVBQTJFLENBQUMsR0FBQSxDQUFDLENBQUM7YUFDckk7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBRTNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWEcsa0JBQVE7O1lBRUosSUFBSSxDQUFDLGFBQWEsQ0FDckIsRUFDRFYsYUFBRzs7WUFFQ2MscUJBQWEsQ0FBQyxzQkFBc0IsQ0FDdkMsQ0FDSixDQUFDO1NBQ0w7Ozs7Ozs7O1FBU0Qsd0NBQWdCLEdBQWhCLFVBQWlCLGVBQXVCO1lBRXBDLElBQUksZUFBZSxLQUFLLFNBQVMsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDL0QsT0FBT1AsZUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUVBQW1FLENBQUMsR0FBQSxDQUFDLENBQUM7YUFDN0g7WUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDL0Q7Ozs7Ozs7UUFRRCw0REFBb0MsR0FBcEMsVUFBcUMsZUFBdUI7WUFFeEQsSUFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMvRCxPQUFPQSxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUM3SDtZQUVELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFakUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYRyxrQkFBUSxDQUNKLElBQUksQ0FBQyxhQUFhLENBQ3JCLEVBQ0RBLGtCQUFRLENBQ0osSUFBSSxDQUFDLG1DQUFtQyxDQUMzQyxDQUNKLENBQUM7U0FDTDs7Ozs7Ozs7UUFTRCxrREFBMEIsR0FBMUIsVUFBMkIsZUFBdUI7WUFFOUMsSUFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMvRCxPQUFPSCxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUN2STtZQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUNyRTs7Ozs7OztRQVFELGtFQUEwQyxHQUExQyxVQUEyQyxlQUF1QjtZQUU5RCxJQUFJLGVBQWUsS0FBSyxTQUFTLElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQy9ELE9BQU9BLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLDZFQUE2RSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2FBQ3ZJO1lBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUV2RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ1hHLGtCQUFROztZQUVKLElBQUksQ0FBQyxhQUFhLENBQ3JCLEVBQ0RWLGFBQUc7O1lBRUNjLHFCQUFhLENBQUMsc0JBQXNCLENBQ3ZDLENBQ0osQ0FBQztTQUNMOzs7Ozs7Ozs7O1FBV0QscUNBQWEsR0FBYixVQUFjLFVBQWtCLEVBQUUsZ0JBQXlCLEVBQUUsVUFBbUI7WUFFNUUsSUFBSSxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNyRCxPQUFPUCxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUMzSDtZQUVELElBQUksVUFBVSxHQUFlLElBQUlRLGFBQVUsRUFBRSxDQUFDO1lBRTlDLElBQUksZ0JBQWdCLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3RDs7WUFHRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FFMUY7Ozs7Ozs7OztRQVVELHlEQUFpQyxHQUFqQyxVQUFrQyxVQUFrQixFQUFFLGdCQUF5QixFQUFFLFVBQW1CO1lBRWhHLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckQsT0FBT1IsZUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUVBQWlFLENBQUMsR0FBQSxDQUFDLENBQUM7YUFDM0g7WUFFRCxJQUFJLFVBQVUsR0FBZSxJQUFJUSxhQUFVLEVBQUUsQ0FBQztZQUU5QyxJQUFJLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtnQkFDaEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUN6RTtZQUVELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDN0Q7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTVGLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWEwsa0JBQVEsQ0FDSixJQUFJLENBQUMsYUFBYSxDQUNyQixFQUNEQSxrQkFBUSxDQUNKLElBQUksQ0FBQyxtQ0FBbUMsQ0FDM0MsQ0FDSixDQUFDO1NBQ0w7O29CQXBSSk4sYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7Ozs7d0JBZlFDLGFBQVU7d0RBbUJGQyxTQUFNLFNBQUMsa0JBQWtCO3dCQVhqQyxvQkFBb0I7Ozs7NEJBUjdCO0tBa1NDLENBbFJrQyxVQUFVOztJQ1g3Qzs7O0FBR0E7UUFHcUNSLG1DQUFhO1FBSGxEOztTQStJQzs7Ozs7Ozs7UUFuSUcsNENBQWtCLEdBQWxCLFVBQW1CLFdBQW1CLEVBQUUsTUFBYztZQUNsRCxJQUFNLGNBQWMsR0FBRywyV0FlQyxXQUFXLGdGQUd4QyxXQUFXLDJhQWdCSCxNQUFNLE9BQ2hCLENBQUM7O1lBRU0sT0FBTyxJQUFJLENBQUMsb0NBQW9DLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDcEU7Ozs7Ozs7OztRQVVELHlFQUErQyxHQUEvQyxVQUFnRCxXQUFtQixFQUFFLE1BQWM7WUFDL0UsSUFBTSxjQUFjLEdBQUcsMlVBY0gsV0FBVyw4RUFHcEMsV0FBVywrVEFhTCxNQUFNLE9BQ2QsQ0FBQztZQUVNLE9BQU8sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBRXBFOzs7Ozs7OztRQVVELHFEQUEyQixHQUEzQixVQUE0QixXQUFtQixFQUFFLE1BQWM7WUFDM0QsSUFBTSxjQUFjLEdBQUcsMEtBTUQsV0FBVywrRkFNWCxXQUFXLGdCQUV0QyxXQUFXLHlSQVF5QixXQUFXLDBFQUliLFdBQVcsMkJBR3JDLE1BQU0sT0FDaEIsQ0FBQztZQUVNLE9BQU8sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3BFOztvQkE3SUpNLGFBQVUsU0FBQzt3QkFDUixVQUFVLEVBQUUsTUFBTTtxQkFDckI7Ozs4QkFWRDtLQXVKQyxDQTVJb0MsYUFBYTs7SUNQbEQ7OztBQUdBOzs7Ozs7Ozs7UUFVSSw4QkFBbUIsa0JBQXdEO1lBQXhELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBc0M7U0FFMUU7UUFFTCwyQkFBQztJQUFELENBQUMsSUFBQTs7UUFZRzs7O1lBR0ksSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUlZLG9CQUFlLENBQXVCLElBQUksb0JBQW9CLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFLLEdBQUEsQ0FBQyxDQUFDLENBQUM7U0FDOUg7Ozs7Ozs7UUFRRCxtREFBcUIsR0FBckIsVUFBc0IsWUFBa0M7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDs7Ozs7O1FBT0QsNkNBQWUsR0FBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQy9DOztvQkFqQ0paLGFBQVUsU0FBQzt3QkFDUixVQUFVLEVBQUUsTUFBTTtxQkFDckI7Ozs7O2tDQXpCRDtLQTBEQzs7SUNyREQ7Ozs7SUFJQTtRQUF3Q04sNkNBQUs7UUFFekMsbUNBQVksR0FBVzttQkFDbkIsa0JBQU0sR0FBRyxDQUFDO1NBQ2I7UUFDTCxnQ0FBQztJQUFELENBQUMsQ0FMdUMsS0FBSyxHQUs1QztJQUVEOzs7QUFHQTtRQWdDSSxxQ0FBb0Isb0JBQXlDO1lBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7U0FBSzs7Ozs7Ozs7UUFTMUQsb0VBQThCLEdBQXRDLFVBQXVDLFdBQW1CO1lBRXRELElBQU0sVUFBVSxHQUFXLDJCQUEyQixDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxHLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsT0FBTyxVQUFVLENBQUM7YUFDckI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLHlCQUF5QixDQUFDLGtCQUFnQixXQUFXLDRDQUF5QyxDQUFDLENBQUM7YUFDN0c7U0FFSjs7Ozs7Ozs7O1FBVUQsMkRBQXFCLEdBQXJCLFVBQXNCLFVBQStCLEVBQUUsdUJBQWdDLEVBQUUsTUFBa0I7WUFBM0csaUJBNklDO1lBN0l3Rix1QkFBQTtnQkFBQSxVQUFrQjs7O1lBR3ZHLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOztZQUczQixJQUFJLHVCQUF1QixLQUFLLFNBQVMsRUFBRTtnQkFDdkMsaUJBQWlCLEdBQUcsaUJBQWUsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLHVCQUF1QixDQUFDLFFBQUssQ0FBQzthQUNsSDs7WUFHRCxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7O1lBRzNCLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDOztZQUc1QixJQUFNLEtBQUssR0FBYSxVQUFVLENBQUMsR0FBRyxDQUNsQyxVQUFDLFdBQThCLEVBQUUsS0FBYTtnQkFFMUMsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRTdGLElBQUksVUFBVSxDQUFDO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtvQkFDdEMsVUFBVSxHQUFHLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNyRjtxQkFBTTtvQkFDSCxVQUFVLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztpQkFDOUM7O2dCQUdELElBQUksU0FBUyxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxLQUFLLFFBQVEsRUFBRTs7O29CQUdqSCxTQUFTLEdBQUcsYUFBVyxLQUFPLENBQUM7aUJBQ2xDO3FCQUFNOztvQkFFSCxTQUFTLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDRixtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzRTs7Z0JBR0QsSUFBSSxTQUFTLEdBQVcsZUFBYSxhQUFhLFVBQUssU0FBUyxPQUFJLENBQUM7O2dCQUdyRSxJQUFNLGtCQUFrQixHQUFHLE1BQUksYUFBYSxnQ0FBMkIsVUFBVSxRQUFLLENBQUM7Z0JBQ3ZGLElBQU0sbUJBQW1CLEdBQU0sU0FBUyxZQUFPLFVBQVUsUUFBSyxDQUFDOztnQkFHL0QsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxLQUFLLFdBQVcsRUFBRTs7b0JBRW5ILFNBQVMsR0FBRywwQkFDOUIsU0FBUyxVQUNULGtCQUFrQixVQUNsQixtQkFBbUIsUUFDbkIsQ0FBQztpQkFDYztxQkFBTTs7b0JBRUgsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqQyxTQUFTLEdBQUcsT0FDOUIsU0FBUyxVQUNULGtCQUFrQixVQUNsQixtQkFBbUIsT0FDcEIsQ0FBQztpQkFDZTs7Z0JBR0QsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDOztnQkFFeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUVqSCxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEtBQUssTUFBTSxFQUFFOzt3QkFFdkUsTUFBTSxHQUFHLGtCQUFnQixTQUFTLFVBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDQSxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxhQUFRLENBQUM7cUJBQzlHO3lCQUFNLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxPQUFPLEVBQUU7O3dCQUUvRSxNQUFNLEdBQUcsYUFBVyxjQUFjLENBQUMsYUFBYSxVQUFLLFNBQVMsVUFBSyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUNBLG1CQUFXLENBQUMsTUFBTSxDQUFDLE1BQUcsQ0FBQztxQkFDckk7eUJBQU07d0JBQ0gsTUFBTSxHQUFHLFlBQVUsU0FBUyxTQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxTQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQ0EsbUJBQVcsQ0FBQyxNQUFNLENBQUMsTUFBRyxDQUFDO3FCQUN0SjtpQkFDSjs7Z0JBR0QsSUFBSSxXQUFXLENBQUMsZUFBZTtvQkFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVqRSxPQUFVLFNBQVMsVUFDakMsTUFBTSxPQUNQLENBQUM7YUFFVyxDQUFDLENBQUM7WUFFUCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUUxQixJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixnQkFBZ0IsR0FBRyxnQkFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FDbkMsQ0FBQzthQUNPOztZQUdELElBQU0sa0JBQWtCLEdBQUcsMElBTWpDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNERBTTNCLGlCQUFpQixZQUVqQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUdkLGdCQUFrQixDQUFDOztZQUdiLElBQU0sY0FBYyxHQUFHLGNBQ3RCLE1BQU0sT0FDZCxDQUFDOztZQUdNLElBQU0sdUNBQXVDLEdBQUcsVUFBQyxXQUFtQjtnQkFDaEUsSUFBTSxvQkFBb0IsR0FBRyxjQUNoQyxXQUFXLE9BQ25CLENBQUM7Z0JBRVUsT0FBTyxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQzthQUNwRCxDQUFDO1lBRUYsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFOztnQkFFZCxJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7YUFDdEg7O1lBSUQsT0FBTyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7U0FFOUM7Ozs7Ozs7UUEvTGEseURBQTZCLEdBQUc7WUFDMUMscURBQXFELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDaEYseURBQXlELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDcEYseURBQXlELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDcEYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLFNBQVM7WUFDaEYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDakYsMERBQTBELEVBQUUsY0FBYyxDQUFDLGNBQWM7WUFDekYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDakYsdURBQXVELEVBQUUsY0FBYyxDQUFDLFdBQVc7WUFDbkYseURBQXlELEVBQUUsY0FBYyxDQUFDLGFBQWE7WUFDdkYscURBQXFELEVBQUUsY0FBYyxDQUFDLE1BQU07WUFDNUUsZ0VBQWdFLEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDM0Ysc0RBQXNELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDakYsaUVBQWlFLEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDNUYseURBQXlELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDcEYsMkRBQTJELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDdEYsOERBQThELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDekYsMERBQTBELEVBQUUsY0FBYyxDQUFDLFVBQVU7WUFDckYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLFNBQVM7U0FDbkYsQ0FBQzs7b0JBOUJMUSxhQUFVLFNBQUM7d0JBQ1IsVUFBVSxFQUFFLE1BQU07cUJBQ3JCOzs7Ozt3QkFwQjhCLG1CQUFtQjs7OzswQ0FEbEQ7S0ErTkM7OztRQ2xOQyxzQkFBb0IsSUFBZ0IsRUFBcUMsTUFBTTtZQUEzRCxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQXFDLFdBQU0sR0FBTixNQUFNLENBQUE7U0FBSzs7Ozs7OztRQVFwRiw4Q0FBdUIsR0FBdkIsVUFBd0IsY0FBK0I7WUFFckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBa0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsc0NBQXNDLEVBQUUsY0FBYyxDQUFDO2lCQUM3SCxJQUFJLENBQ0hKLGFBQUcsQ0FDRCxVQUFDLElBQUk7Z0JBQ0gsSUFBTSxNQUFNLEdBQW9DLElBQUksQ0FBQzs7Z0JBRXJELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN2QixFQUNELFVBQUMsS0FBd0I7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzVGO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzVGO2dCQUNELE1BQU0sS0FBSyxDQUFDO2FBQ2IsQ0FDRixDQUFDLENBQUM7U0FFUjs7b0JBakNGSSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozt3QkFUUUMsYUFBVTt3REFZc0JDLFNBQU0sU0FBQyxrQkFBa0I7Ozs7MkJBYmxFO0tBMENDOzs7UUNuQ3lDUix3Q0FBVTtRQUhwRDs7U0FvQkM7Ozs7Ozs7Ozs7UUFOQywrQ0FBZ0IsR0FBaEI7WUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLHFDQUFxQyxDQUFDLENBQUM7O1NBRWxFOztvQkFsQkZNLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7OzttQ0FORDtLQXdCQyxDQWpCeUMsVUFBVTs7O1FDQVZOLHdDQUFVO1FBSHBEOztTQTRCQzs7Ozs7OztRQWpCQyxvREFBcUIsR0FBckIsVUFBc0IsR0FBVztZQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsK0JBQStCLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRjs7Ozs7OztRQVFELDhDQUFlLEdBQWYsVUFBZ0IsR0FBVztZQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyRTs7b0JBdkJGTSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7bUNBTkQ7S0FnQ0MsQ0F6QnlDLFVBQVU7O0lDUHBEOztPQUVHOzs7UUN1QkM7WUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixDQUFDO1lBQy9DLFVBQUssR0FBRyxjQUFjLENBQUMscUJBQXFCLENBQUM7U0FHNUM7UUFFRCw2QkFBWSxHQUFaO1lBQ0ksT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFDTCxhQUFDO0lBQUQsQ0FBQyxJQUFBOztRQVFHO1lBSEEsU0FBSSxHQUFHLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQztZQUNsRCxVQUFLLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixDQUFDO1NBRy9DO1FBRUQsZ0NBQVksR0FBWjtZQUNJLE9BQU8sV0FBVyxDQUFDO1NBQ3RCO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLElBQUE7O1FBT0c7WUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLG1DQUFtQyxDQUFDO1lBQzFELFVBQUssR0FBRyxjQUFjLENBQUMsZ0NBQWdDLENBQUM7U0FHdkQ7UUFFRCx3Q0FBWSxHQUFaO1lBQ0ksT0FBTyxtQkFBbUIsQ0FBQztTQUM5QjtRQUNMLHdCQUFDO0lBQUQsQ0FBQyxJQUFBOztRQU9HO1lBSEEsU0FBSSxHQUFHLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBQztZQUNwRCxVQUFLLEdBQUcsY0FBYyxDQUFDLDBCQUEwQixDQUFDO1NBR2pEO1FBRUQsa0NBQVksR0FBWjtZQUNJLE9BQU8sYUFBYSxDQUFDO1NBQ3hCO1FBQ0wsa0JBQUM7SUFBRCxDQUFDLElBQUE7O1FBT0c7WUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLDBCQUEwQixDQUFDO1lBQ2pELFVBQUssR0FBRyxjQUFjLENBQUMsdUJBQXVCLENBQUM7U0FHOUM7UUFFRCwrQkFBWSxHQUFaO1lBQ0ksT0FBTyxVQUFVLENBQUM7U0FDckI7UUFDTCxlQUFDO0lBQUQsQ0FBQyxJQUFBOztRQU9HO1lBSEEsU0FBSSxHQUFHLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUN2RCxVQUFLLEdBQUcsY0FBYyxDQUFDLDRCQUE0QixDQUFDO1NBR25EO1FBRUQscUNBQVksR0FBWjtZQUNJLE9BQU8sZ0JBQWdCLENBQUM7U0FDM0I7UUFDTCxxQkFBQztJQUFELENBQUMsSUFBQTs7UUFRRztZQUhBLFNBQUksR0FBRyxjQUFjLENBQUMsd0JBQXdCLENBQUM7WUFDL0MsVUFBSyxHQUFHLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztTQUc1QztRQUVELDZCQUFZLEdBQVo7WUFDSSxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNMLGFBQUM7SUFBRCxDQUFDLElBQUE7O1FBT0c7WUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLHNCQUFzQixDQUFDO1lBQzdDLFVBQUssR0FBRyxjQUFjLENBQUMsbUJBQW1CLENBQUM7U0FHMUM7UUFFRCwyQkFBWSxHQUFaO1lBQ0ksT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFTCxXQUFDO0lBQUQsQ0FBQyxJQUFBOztRQU9HO1lBSEEsU0FBSSxHQUFHLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQztZQUM5QyxVQUFLLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDO1NBRzNDO1FBRUQsNEJBQVksR0FBWjtZQUNJLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO1FBRUwsWUFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7O0FBSUE7UUFFSSxvQ0FBcUIsa0JBQXNDLEVBQVcsS0FBYTtZQUE5RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1lBQVcsVUFBSyxHQUFMLEtBQUssQ0FBUTtTQUNsRjtRQUNMLGlDQUFDO0lBQUQsQ0FBQyxJQUFBO0lBaUJEOzs7QUFHQTs7Ozs7OztRQVFJLHNCQUNvQixLQUFhLEVBQ2IsSUFBWTtZQURaLFVBQUssR0FBTCxLQUFLLENBQVE7WUFDYixTQUFJLEdBQUosSUFBSSxDQUFRO1NBQy9COzs7Ozs7O1FBU00sK0JBQVEsR0FBZixVQUFnQixNQUFtQjtZQUUvQixJQUFJLFdBQW1CLENBQUM7OztZQUl4QixJQUFJLE1BQU0sS0FBS1IsbUJBQVcsQ0FBQyxNQUFNLElBQUksMkJBQTJCLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTs7Z0JBRXJILFdBQVcsR0FBRywyQkFBMkIsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEY7aUJBQU07O2dCQUVILFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzNCO1lBRUQsT0FBTyxPQUFJLElBQUksQ0FBQyxLQUFLLGFBQU8sV0FBVyxNQUFHLENBQUM7U0FDOUM7UUFFTCxtQkFBQztJQUFELENBQUMsSUFBQTtJQUVEOzs7QUFHQTs7Ozs7O1FBT0ksYUFBcUIsR0FBVztZQUFYLFFBQUcsR0FBSCxHQUFHLENBQVE7U0FDL0I7Ozs7Ozs7UUFRTSxzQkFBUSxHQUFmLFVBQWdCLE1BQW1COztZQUUvQixPQUFPLE1BQUksSUFBSSxDQUFDLEdBQUcsTUFBRyxDQUFDO1NBQzFCO1FBRUwsVUFBQztJQUFELENBQUMsSUFBQTtJQXNCRDs7O0FBR0E7Ozs7Ozs7O1FBU0ksMkJBQ2EsUUFBa0IsRUFDbEIsWUFBd0MsRUFDeEMsZUFBd0I7WUFGeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBNEI7WUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQVM7U0FDcEM7UUFFTCx3QkFBQztJQUFELENBQUM7O0lDaFJEOztPQUVHOztJQ0ZIOztPQUVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==