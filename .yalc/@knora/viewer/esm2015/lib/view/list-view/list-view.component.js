import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
export class ListViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9saXN0LXZpZXcvbGlzdC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXlDN0MsTUFBTSxPQUFPLGlCQUFpQjtJQVExQjtRQUZBLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBRWhCLENBQUM7OztZQS9DcEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQ1A7Z0JBQ0gsTUFBTSxFQUFFLENBQUMsd2ZBQXdmLENBQUM7YUFDcmdCOzs7OztxQkFHSSxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktbGlzdC12aWV3JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGt1aS1wcm9ncmVzcy1pbmRpY2F0b3IgKm5nSWY9XCJpc0xvYWRpbmdcIiBbY29sb3JdPVwiJyNEODg5NTgnXCI+PC9rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yPlxuXG4gICAgPG1hdC1saXN0IGNsYXNzPVwibGlzdC12aWV3IGx2LWl0ZW1zXCIgKm5nRm9yPVwibGV0IHJlcyBvZiByZXN1bHQ7IGxldCBpID0gaW5kZXg7IGxldCBsYXN0ID0gbGFzdDtcIj5cbiAgICAgICAgPG1hdC1saXN0LWl0ZW0gY2xhc3M9XCJsaW5rXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gbWF0TGlzdEljb24+aW1hZ2Vfc2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxoMiBtYXRMaW5lIGNsYXNzPVwibHYtbGFiZWxcIj57e29udG9sb2d5SW5mbz8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlcy50eXBlKX19IC0ge3tyZXMubGFiZWx9fTwvaDI+XG5cbiAgICAgICAgICAgIDxkaXYgbWF0TGluZSAqbmdGb3I9XCJsZXQgcHJvcCBvZiByZXMucHJvcGVydGllcyB8IGt1aUtleVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHZhbCBvZiBwcm9wLnZhbHVlIHwga3VpS2V5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInZhbC52YWx1ZS5nZXRDbGFzc05hbWUoKVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG1hdExpbmUgY2xhc3M9XCJsdi1odG1sLXRleHRcIiAqbmdTd2l0Y2hDYXNlPVwiS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxrdWktdGV4dC12YWx1ZS1hcy1odG1sIFt2YWx1ZU9iamVjdF09XCJ2YWwudmFsdWVcIiBbb250b2xvZ3lJbmZvXT1cIm9udG9sb2d5SW5mb1wiIFtiaW5kRXZlbnRzXT1cImZhbHNlXCI+PC9rdWktdGV4dC12YWx1ZS1hcy1odG1sPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibHYtcmVhZC1tb3JlXCI+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdExpbmU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGt1aS1kYXRlLXZhbHVlICpuZ1N3aXRjaENhc2U9XCJLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlXCIgW3ZhbHVlT2JqZWN0XT1cInZhbC52YWx1ZVwiIFtjYWxlbmRhcl09XCJ0cnVlXCIgW2VyYV09XCJ0cnVlXCI+PC9rdWktZGF0ZS12YWx1ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0PVwiXCI+e3t2YWwudmFsdWUuZ2V0Q29udGVudCgpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBtYXRMaW5lICpuZ0lmPVwib250b2xvZ3lJbmZvPy5nZXRMYWJlbEZvclByb3BlcnR5KHByb3Aua2V5KSAhPT0gJ1RleHQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tvbnRvbG9neUluZm8/LmdldExhYmVsRm9yUHJvcGVydHkocHJvcC5rZXkpfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L21hdC1saXN0LWl0ZW0+XG5cbiAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwiIWxhc3RcIj48L21hdC1kaXZpZGVyPlxuXG4gICAgPC9tYXQtbGlzdD5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm9ybWFsIWltcG9ydGFudDttYXgtd2lkdGg6OTUlfS5saXN0LXZpZXcgLm1hdC1saXN0LWl0ZW17aGVpZ2h0OmF1dG87bWluLWhlaWdodDo0MHB4O3BhZGRpbmc6OHB4IDB9Lmx2LWxhYmVse2ZvbnQtd2VpZ2h0OjcwMCFpbXBvcnRhbnR9Lmx2LWl0ZW1ze21heC13aWR0aDo2MDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Vmlld0NvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSByZXN1bHQ7XG4gICAgQElucHV0KCkgb250b2xvZ3lJbmZvO1xuICAgIEBJbnB1dCgpIGlzTG9hZGluZztcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=