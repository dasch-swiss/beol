import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
export class GridViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9ncmlkLXZpZXcvZ3JpZC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBNEM3QyxNQUFNLE9BQU8saUJBQWlCO0lBUTVCO1FBRkEsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFFaEIsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBckRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUNMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLHVwQkFBdXBCLENBQUM7YUFDbHFCOzs7OztxQkFHRSxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1ncmlkLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxrdWktcHJvZ3Jlc3MtaW5kaWNhdG9yICpuZ0lmPVwiaXNMb2FkaW5nXCIgW2NvbG9yXT1cIicjRDg4OTU4J1wiPjwva3VpLXByb2dyZXNzLWluZGljYXRvcj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dC54cz1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiZ3JpZFwiPlxuXG4gICAgPGRpdiBmeEZsZXguc209XCI1MFwiIGZ4RmxleC5tZD1cIjMzLjNcIiBmeEZsZXgubGc9XCIyMFwiIGZ4RmxleC54bD1cIjE2LjZcIiBmeEZsZXg9XCIxNi42XCIgKm5nRm9yPVwibGV0IHJlcyBvZiByZXN1bHRcIiBjbGFzcz1cImd2LXByZXZpZXdcIj5cbiAgICAgIDxtYXQtY2FyZCBjbGFzcz1cImxpbmtcIj5cblxuICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+e3tvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXMudHlwZSl9fTwvbWF0LWNhcmQtc3VidGl0bGU+XG4gICAgICAgIDxtYXQtY2FyZC10aXRsZT57e3Jlcy5sYWJlbH19PC9tYXQtY2FyZC10aXRsZT5cblxuXG4gICAgICAgIDxtYXQtY2FyZC1jb250ZW50ICpuZ0Zvcj1cImxldCBwcm9wIG9mIHJlcy5wcm9wZXJ0aWVzIHwga3VpS2V5XCI+XG4gICAgICAgICAgPCEtLSBkZXNjcmlwdGlvbiAtLT5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB2YWwgb2YgcHJvcC52YWx1ZSB8IGt1aUtleVwiPlxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwidmFsLnZhbHVlLmdldENsYXNzTmFtZSgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsdi1odG1sLXRleHRcIiAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbFwiPlxuICAgICAgICAgICAgICAgIDxrdWktdGV4dC12YWx1ZS1hcy1odG1sIFt2YWx1ZU9iamVjdF09XCJ2YWwudmFsdWVcIiBbb250b2xvZ3lJbmZvXT1cIm9udG9sb2d5SW5mb1wiIFtiaW5kRXZlbnRzXT1cImZhbHNlXCI+PC9rdWktdGV4dC12YWx1ZS1hcy1odG1sPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibHYtcmVhZC1tb3JlXCI+PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8a3VpLWRhdGUtdmFsdWUgKm5nU3dpdGNoQ2FzZT1cIktub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWVcIiBbdmFsdWVPYmplY3RdPVwidmFsLnZhbHVlXCIgW2NhbGVuZGFyXT1cInRydWVcIiBbZXJhXT1cInRydWVcIj48L2t1aS1kYXRlLXZhbHVlPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ9XCJcIj57e3ZhbC52YWx1ZS5nZXRDb250ZW50KCl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUHJvcGVydHkocHJvcC5rZXkpICE9PSAnVGV4dCdcIj5cbiAgICAgICAgICAgICAgICB7e29udG9sb2d5SW5mbz8uZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wLmtleSl9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxuXG4gICAgICA8L21hdC1jYXJkPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9Lmd2LXByZXZpZXd7bWFyZ2luOjZweCAwO3BhZGRpbmc6MjRweDt3b3JkLXdyYXA6YnJlYWstd29yZDtib3JkZXItcmFkaXVzOjVweH0uZ3YtcHJldmlldyAubWF0LWNhcmR7aGVpZ2h0OjE2MHB4O2NvbG9yOnJnYmEoMCwwLDAsLjgxKTtvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1ib3R0b206MjVweH0uZ3YtcHJldmlldyAubWF0LWNhcmQ6aG92ZXJ7YmFja2dyb3VuZDpyZ2JhKDAsMTA1LDkyLC4zOSk7Y29sb3I6IzAwMH0uZ3YtcHJldmlldyAubWF0LWNhcmQ6YWN0aXZle2JhY2tncm91bmQ6cmdiYSgwLDEwNSw5MiwuNjEpfS5ndi1wcmV2aWV3IC5tYXQtY2FyZCAubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjEycHQ7Zm9udC13ZWlnaHQ6NjAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByZXN1bHQ7XG4gIEBJbnB1dCgpIG9udG9sb2d5SW5mbztcbiAgQElucHV0KCkgaXNMb2FkaW5nO1xuXG4gIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iXX0=