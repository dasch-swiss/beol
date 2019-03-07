import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvertJSONLD, IncomingService, KnoraConstants, OntologyCacheService, ResourceService } from '@knora/core';
const jsonld = require('jsonld');
export class ResourceViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUdILGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLG9CQUFvQixFQUlwQixlQUFlLEVBQ2xCLE1BQU0sYUFBYSxDQUFDO0FBR3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQWtEakMsTUFBTSxPQUFPLHFCQUFxQjtJQVU5QixZQUFvQixNQUFzQixFQUN0QixnQkFBaUMsRUFDakMsYUFBbUMsRUFDbkMsZ0JBQWlDO1FBSGpDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFYNUMsUUFBRyxHQUFZLDZCQUE2QixDQUFDO1FBTXRELG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBTzVCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFFOUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sV0FBVyxDQUFDLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7YUFDakMsU0FBUyxDQUNOLENBQUMsTUFBd0IsRUFBRSxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pDLDJEQUEyRDtZQUMzRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUV2QixNQUFNLFdBQVcsR0FBMEIsYUFBYSxDQUFDLHFDQUFxQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUUxRyxrREFBa0Q7Z0JBQ2xELElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUVwQyx3Q0FBd0M7b0JBQ3hDLE1BQU0saUJBQWlCLEdBQWEsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUUxRixrRkFBa0Y7b0JBQ2xGLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQ3ZFLENBQUMsa0JBQXVCLEVBQUUsRUFBRTt3QkFDeEIsa0NBQWtDO3dCQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLENBQUMsd0ZBQXdGO3dCQUVoSSx5REFBeUQ7d0JBQ3pELHFFQUFxRTt3QkFFckUsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6Qyw0Q0FBNEM7d0JBRTVDLG1DQUFtQztvQkFDdkMsQ0FBQyxFQUNELENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsMkVBQTJFO29CQUMzRSxJQUFJLENBQUMsWUFBWSxHQUFHLDBDQUEwQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0scUJBQXFCLENBQUM7aUJBQ25IO1lBQ0wsQ0FBQyxFQUFFLFVBQVUsR0FBRztnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsMEJBQTBCO1FBQzlCLENBQUMsRUFDRCxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLGtDQUFrQztZQUNsQywwQkFBMEI7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDZixDQUFDOzs7WUEzSEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTJDRjtnQkFDUixNQUFNLEVBQUUsQ0FBQyx3U0FBd1MsQ0FBQzthQUNyVDs7OztZQWhFUSxjQUFjO1lBV25CLGVBQWU7WUFKZixvQkFBb0I7WUFGcEIsZUFBZTs7O2tCQThEZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VFcnJvcixcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIENvbnZlcnRKU09OTEQsXG4gICAgSW5jb21pbmdTZXJ2aWNlLFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLFxuICAgIE9udG9sb2d5SW5mb3JtYXRpb24sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZXNvdXJjZVNlcnZpY2Vcbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktcmVzb3VyY2UtdmlldycsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWNhcmQ+XG5cbiAgICA8IS0tIFRPRE86IHN3aXRjaCB0aHJvdWdoIHRoZSBtZWRpYSB0eXBlIC0tPlxuICAgIDxrdWktc3RpbGwtaW1hZ2U+PC9rdWktc3RpbGwtaW1hZ2U+XG4gICAgPGt1aS1tb3ZpbmctaW1hZ2U+PC9rdWktbW92aW5nLWltYWdlPlxuICAgIDxrdWktYW5ub3RhdGlvbj48L2t1aS1hbm5vdGF0aW9uPlxuICAgIDxrdWktYXVkaW8+PC9rdWktYXVkaW8+XG4gICAgPGt1aS1jb2xsZWN0aW9uPjwva3VpLWNvbGxlY3Rpb24+XG4gICAgPGt1aS1kZGQ+PC9rdWktZGRkPlxuICAgIDxrdWktZG9jdW1lbnQ+PC9rdWktZG9jdW1lbnQ+XG4gICAgPGt1aS1saW5rLW9iaj48L2t1aS1saW5rLW9iaj5cbiAgICA8a3VpLW9iamVjdD48L2t1aS1vYmplY3Q+XG4gICAgPGt1aS1yZWdpb24+PC9rdWktcmVnaW9uPlxuICAgIDxrdWktdGV4dD48L2t1aS10ZXh0PlxuXG4gICAgPGgyPm1ldGFkYXRhIGZvciByZXNvdXJjZSB7eyByZXNvdXJjZT8ubGFiZWx9fSAoe3sgcmVzb3VyY2U/LmlkIH19KTwvaDI+XG4gICAgPGgzPnR5cGU6IHt7b250b2xvZ3lJbmZvPy5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzb3VyY2U/LnR5cGUpfX08L2gzPlxuXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiByZXNvdXJjZT8ucHJvcGVydGllcyB8IGt1aUtleVwiPlxuICAgICAgICA8bWF0LWxpc3Q+XG4gICAgICAgICAgICA8c3Bhbj57e29udG9sb2d5SW5mbz8uZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wLmtleSl9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxtYXQtbGlzdC1pdGVtICpuZ0Zvcj1cImxldCB2YWwgb2YgcHJvcC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJ2YWwuZ2V0Q2xhc3NOYW1lKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1jb2xvci12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktY29sb3ItdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktdGV4dC12YWx1ZS1hcy1odG1sICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiIFtvbnRvbG9neUluZm9dPVwib250b2xvZ3lJbmZvXCIgW2JpbmRFdmVudHNdPVwidHJ1ZVwiPjwva3VpLXRleHQtdmFsdWUtYXMtaHRtbD5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS10ZXh0LXZhbHVlLWFzLXN0cmluZyAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLXRleHQtdmFsdWUtYXMtc3RyaW5nPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLXRleHQtdmFsdWUtYXMteG1sICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWxcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktdGV4dC12YWx1ZS1hcy14bWw+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktZGF0ZS12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZVwiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIj48L2t1aS1kYXRlLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWxpbmstdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCIgW29udG9sb2d5SW5mb109XCJvbnRvbG9neUluZm9cIj48L2t1aS1saW5rLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWludGVnZXItdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktaW50ZWdlci12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1kZWNpbWFsLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLWRlY2ltYWwtdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktZ2VvbWV0cnktdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRHZW9tVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktZ2VvbWV0cnktdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktdXJpLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktdXJpLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLWJvb2xlYW4tdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktYm9vbGVhbi12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgPGt1aS1pbnRlcnZhbC12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsXCI+PC9rdWktaW50ZXJ2YWwtdmFsdWU+XG4gICAgICAgICAgICAgICAgICAgIDxrdWktbGlzdC12YWx1ZSAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZVwiIFt2YWx1ZU9iamVjdF09XCJ2YWxcIj48L2t1aS1saXN0LXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8a3VpLXRleHRmaWxlLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbFwiPjwva3VpLXRleHRmaWxlLXZhbHVlPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0PVwiXCI+Tm90IHN1cHBvcnRlZCB7e3ZhbC5nZXRDbGFzc05hbWUoKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvbWF0LWxpc3QtaXRlbT5cbiAgICAgICAgPC9tYXQtbGlzdD5cbiAgICA8L2Rpdj5cblxuPC9tYXQtY2FyZD5gLFxuICAgIHN0eWxlczogW2AubWF0LWZvcm0tZmllbGR7d2lkdGg6MzIwcHh9LmZpbGwtcmVtYWluaW5nLXNwYWNle2ZsZXg6MSAxIGF1dG99LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ubGlua3tjdXJzb3I6cG9pbnRlcn0ubHYtaHRtbC10ZXh0e21heC1oZWlnaHQ6NjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lmx2LXJlYWQtbW9yZXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MDtwYWRkaW5nOjMwcHggMDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgaXJpPzogc3RyaW5nID0gJ2h0dHA6Ly9yZGZoLmNoLzhiZTFiN2NmNzEwMyc7XG5cbiAgICBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247IC8vIG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMgcHJlc2VudCBpbiB0aGUgcmVxdWVzdGVkIHJlc291cmNlIHdpdGggSXJpIGBpcmlgXG4gICAgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZTsgLy8gdGhlIHJlc291cmNlIHRvIGJlIGRpc3BsYXllZFxuICAgIGVycm9yTWVzc2FnZTogYW55O1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9yZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2luY29taW5nU2VydmljZTogSW5jb21pbmdTZXJ2aWNlKSB7XG5cbiAgICAgICAgY29uc3Qgcm91dGVQYXJhbXMgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5wYXJhbXM7XG4gICAgICAgIHRoaXMuaXJpID0gcm91dGVQYXJhbXMuaWQ7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRSZXNvdXJjZSh0aGlzLmlyaSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZShpcmk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2UoaXJpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQ6ICcsIHJlc3VsdC5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBwcm9taXNlcy5jb21wYWN0KHJlc3VsdC5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChjb21wYWN0ZWQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChjb21wYWN0ZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCBleGFjdGx5IG9uZSByZXNvdXJjZSBpcyByZXR1cm5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlU2VxLnJlc291cmNlcy5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQoY29tcGFjdGVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3Qgb250b2xvZ3kgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3MgSXJpcyAocHJvcGVydGllcyBhcmUgaW1wbGllZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXNvdXJjZUNsYXNzSW5mb3M6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8gPSByZXNvdXJjZUNsYXNzSW5mb3M7IC8vIGNvbnNvbGUubG9nKCdpbml0aWFsaXphdGlvbiBvZiBvbnRvbG9neUluZm86ICcsIHRoaXMub250b2xvZ3lJbmZvKTsgPiBvYmplY3QgcmVjZWl2ZWRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBhIHBvc3NpYmx5IGF0dGFjaGVkIGltYWdlIGZpbGUgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UocmVzb3VyY2VTZXEucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZSA9IHJlc291cmNlU2VxLnJlc291cmNlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXNvdXJjZTogJywgdGhpcy5yZXNvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVxdWVzdEluY29taW5nUmVzb3VyY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnIpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhY2hlIHJlcXVlc3QgZmFpbGVkOiAnICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4YWN0bHkgb25lIHJlc291cmNlIHdhcyBleHBlY3RlZCwgYnV0IHJlc291cmNlU2VxLnJlc291cmNlcy5sZW5ndGggIT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gYEV4YWN0bHkgb25lIHJlc291cmNlIHdhcyBleHBlY3RlZCwgYnV0ICR7cmVzb3VyY2VTZXEucmVzb3VyY2VzLmxlbmd0aH0gcmVzb3VyY2UocykgZ2l2ZW4uYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSlNPTkxEIG9mIGZ1bGwgcmVzb3VyY2UgcmVxdWVzdCBjb3VsZCBub3QgYmUgZXhwYW5kZWQ6JyArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZXJyb3JNZXNzYWdlID0gPGFueT5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==