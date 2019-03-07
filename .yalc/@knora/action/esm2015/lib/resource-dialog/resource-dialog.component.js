import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
export class ResourceDialogComponent {
    constructor(_dialogRef, data) {
        this._dialogRef = _dialogRef;
        this.data = data;
        this.fullSize = false;
    }
    /**
     * Creates a configuration object for `MatDialog`.
     *
     * @param resourceIri the Iri of the resource to be displayed in a dialog.
     * @param widthPct width of the dialog in percentage.
     * @param heightPct height of the dialog in percentage.
     * @returns
     */
    static createConfiguration(resourceIri, widthPct = 60, heightPct = 60) {
        const config = new MatDialogConfig();
        config.height = `${widthPct}%`;
        config.width = `${heightPct}%`;
        config.data = {
            iri: resourceIri
        };
        config.panelClass = 'resizable';
        return config;
    }
    ngOnInit() {
        this.fullSize = (!this.data.fullSize);
        // start in full size
        if (this._dialogRef) {
            this.toggleFullSize();
        }
    }
    toggleFullSize() {
        this.fullSize = (!this.fullSize);
        if (this.fullSize) {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        }
        else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
    }
}
ResourceDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-resource-dialog',
                template: `<div class="object-dialog">
  <!-- header with close (on the left hand side) and resize (on the right hand side) button
      and with the title in the center -->
  <div class="dialog-header">
    <span class="dialog-action-button">
      <button mat-icon-button class="resize-button" (click)="toggleFullSize()">
        <mat-icon class="optimize-direction" [innerHtml]="fullSize ? 'call_received' :'call_made'"></mat-icon>
      </button>
    </span>
    <span class="fill-remaining-space"></span>
    <span>
      <h3 class="dialog-title" mat-dialog-title>
        Resource
        <!--'salsahLabels.frameworkForListings.add.title' | translate -->
      </h3>
    </span>
    <span class="fill-remaining-space"></span>
    <span class="dialog-action-button">
      <button mat-icon-button class="close-button" (click)="_dialogRef.close()">
        <mat-icon>close</mat-icon>
      </button>
    </span>
  </div>

  <!-- <mat-dialog-content class="dialog-content" [class.fullsize]="fullSize">

      <salsah-resource-object [iri]="data.iri"></salsah-resource-object>

  </mat-dialog-content> -->

</div>`,
                styles: [``]
            },] },
];
/** @nocollapse */
ResourceDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFxQ25GLE1BQU0sT0FBTyx1QkFBdUI7SUE0QmxDLFlBQW1CLFVBQWlELEVBQ2xDLElBQVM7UUFEeEIsZUFBVSxHQUFWLFVBQVUsQ0FBdUM7UUFDbEMsU0FBSSxHQUFKLElBQUksQ0FBSztRQTNCM0MsYUFBUSxHQUFZLEtBQUssQ0FBQztJQTRCMUIsQ0FBQztJQTFCRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxFQUFFLFlBQW9CLEVBQUU7UUFFM0YsTUFBTSxNQUFNLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7UUFFdEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsR0FBRyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxTQUFTLEdBQUcsQ0FBQztRQUUvQixNQUFNLENBQUMsSUFBSSxHQUFHO1lBQ1osR0FBRyxFQUFFLFdBQVc7U0FDakIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBRWhDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFNRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QyxxQkFBcUI7UUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNsQzthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7WUF0RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBcEMwQyxZQUFZOzRDQWtFbEQsTUFBTSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktcmVzb3VyY2UtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwib2JqZWN0LWRpYWxvZ1wiPlxuICA8IS0tIGhlYWRlciB3aXRoIGNsb3NlIChvbiB0aGUgbGVmdCBoYW5kIHNpZGUpIGFuZCByZXNpemUgKG9uIHRoZSByaWdodCBoYW5kIHNpZGUpIGJ1dHRvblxuICAgICAgYW5kIHdpdGggdGhlIHRpdGxlIGluIHRoZSBjZW50ZXIgLS0+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctaGVhZGVyXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJkaWFsb2ctYWN0aW9uLWJ1dHRvblwiPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJyZXNpemUtYnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZUZ1bGxTaXplKClcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwib3B0aW1pemUtZGlyZWN0aW9uXCIgW2lubmVySHRtbF09XCJmdWxsU2l6ZSA/ICdjYWxsX3JlY2VpdmVkJyA6J2NhbGxfbWFkZSdcIj48L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPHNwYW4+XG4gICAgICA8aDMgY2xhc3M9XCJkaWFsb2ctdGl0bGVcIiBtYXQtZGlhbG9nLXRpdGxlPlxuICAgICAgICBSZXNvdXJjZVxuICAgICAgICA8IS0tJ3NhbHNhaExhYmVscy5mcmFtZXdvcmtGb3JMaXN0aW5ncy5hZGQudGl0bGUnIHwgdHJhbnNsYXRlIC0tPlxuICAgICAgPC9oMz5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJmaWxsLXJlbWFpbmluZy1zcGFjZVwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImRpYWxvZy1hY3Rpb24tYnV0dG9uXCI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cImNsb3NlLWJ1dHRvblwiIChjbGljayk9XCJfZGlhbG9nUmVmLmNsb3NlKClcIj5cbiAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPCEtLSA8bWF0LWRpYWxvZy1jb250ZW50IGNsYXNzPVwiZGlhbG9nLWNvbnRlbnRcIiBbY2xhc3MuZnVsbHNpemVdPVwiZnVsbFNpemVcIj5cblxuICAgICAgPHNhbHNhaC1yZXNvdXJjZS1vYmplY3QgW2lyaV09XCJkYXRhLmlyaVwiPjwvc2Fsc2FoLXJlc291cmNlLW9iamVjdD5cblxuICA8L21hdC1kaWFsb2ctY29udGVudD4gLS0+XG5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnVsbFNpemU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBgTWF0RGlhbG9nYC5cbiAgICpcbiAgICogQHBhcmFtIHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHRvIGJlIGRpc3BsYXllZCBpbiBhIGRpYWxvZy5cbiAgICogQHBhcmFtIHdpZHRoUGN0IHdpZHRoIG9mIHRoZSBkaWFsb2cgaW4gcGVyY2VudGFnZS5cbiAgICogQHBhcmFtIGhlaWdodFBjdCBoZWlnaHQgb2YgdGhlIGRpYWxvZyBpbiBwZXJjZW50YWdlLlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUNvbmZpZ3VyYXRpb24ocmVzb3VyY2VJcmk6IHN0cmluZywgd2lkdGhQY3Q6IG51bWJlciA9IDYwLCBoZWlnaHRQY3Q6IG51bWJlciA9IDYwKSB7XG5cbiAgICBjb25zdCBjb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcblxuICAgIGNvbmZpZy5oZWlnaHQgPSBgJHt3aWR0aFBjdH0lYDtcbiAgICBjb25maWcud2lkdGggPSBgJHtoZWlnaHRQY3R9JWA7XG5cbiAgICBjb25maWcuZGF0YSA9IHtcbiAgICAgIGlyaTogcmVzb3VyY2VJcmlcbiAgICB9O1xuXG4gICAgY29uZmlnLnBhbmVsQ2xhc3MgPSAncmVzaXphYmxlJztcblxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFJlc291cmNlRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mdWxsU2l6ZSA9ICghdGhpcy5kYXRhLmZ1bGxTaXplKTtcblxuICAgIC8vIHN0YXJ0IGluIGZ1bGwgc2l6ZVxuICAgIGlmICh0aGlzLl9kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMudG9nZ2xlRnVsbFNpemUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVGdWxsU2l6ZSgpIHtcbiAgICB0aGlzLmZ1bGxTaXplID0gKCF0aGlzLmZ1bGxTaXplKTtcblxuICAgIGlmICh0aGlzLmZ1bGxTaXplKSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlU2l6ZSgnMTAwdncnLCAnMTAwdmgnKTtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlU2l6ZSgnODB2dycsICdhdXRvJyk7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxufVxuIl19