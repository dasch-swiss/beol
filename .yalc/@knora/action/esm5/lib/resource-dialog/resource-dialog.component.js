import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
var ResourceDialogComponent = /** @class */ (function () {
    function ResourceDialogComponent(_dialogRef, data) {
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
    ResourceDialogComponent.createConfiguration = function (resourceIri, widthPct, heightPct) {
        if (widthPct === void 0) { widthPct = 60; }
        if (heightPct === void 0) { heightPct = 60; }
        var config = new MatDialogConfig();
        config.height = widthPct + "%";
        config.width = heightPct + "%";
        config.data = {
            iri: resourceIri
        };
        config.panelClass = 'resizable';
        return config;
    };
    ResourceDialogComponent.prototype.ngOnInit = function () {
        this.fullSize = (!this.data.fullSize);
        // start in full size
        if (this._dialogRef) {
            this.toggleFullSize();
        }
    };
    ResourceDialogComponent.prototype.toggleFullSize = function () {
        this.fullSize = (!this.fullSize);
        if (this.fullSize) {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        }
        else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
    };
    ResourceDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-resource-dialog',
                    template: "<div class=\"object-dialog\">\n  <!-- header with close (on the left hand side) and resize (on the right hand side) button\n      and with the title in the center -->\n  <div class=\"dialog-header\">\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"resize-button\" (click)=\"toggleFullSize()\">\n        <mat-icon class=\"optimize-direction\" [innerHtml]=\"fullSize ? 'call_received' :'call_made'\"></mat-icon>\n      </button>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span>\n      <h3 class=\"dialog-title\" mat-dialog-title>\n        Resource\n        <!--'salsahLabels.frameworkForListings.add.title' | translate -->\n      </h3>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"close-button\" (click)=\"_dialogRef.close()\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </span>\n  </div>\n\n  <!-- <mat-dialog-content class=\"dialog-content\" [class.fullsize]=\"fullSize\">\n\n      <salsah-resource-object [iri]=\"data.iri\"></salsah-resource-object>\n\n  </mat-dialog-content> -->\n\n</div>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    ResourceDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return ResourceDialogComponent;
}());
export { ResourceDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkY7SUErREUsaUNBQW1CLFVBQWlELEVBQ2xDLElBQVM7UUFEeEIsZUFBVSxHQUFWLFVBQVUsQ0FBdUM7UUFDbEMsU0FBSSxHQUFKLElBQUksQ0FBSztRQTNCM0MsYUFBUSxHQUFZLEtBQUssQ0FBQztJQTRCMUIsQ0FBQztJQTFCRDs7Ozs7OztPQU9HO0lBQ0ksMkNBQW1CLEdBQTFCLFVBQTJCLFdBQW1CLEVBQUUsUUFBcUIsRUFBRSxTQUFzQjtRQUE3Qyx5QkFBQSxFQUFBLGFBQXFCO1FBQUUsMEJBQUEsRUFBQSxjQUFzQjtRQUUzRixJQUFNLE1BQU0sR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUV0RCxNQUFNLENBQUMsTUFBTSxHQUFNLFFBQVEsTUFBRyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQU0sU0FBUyxNQUFHLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksR0FBRztZQUNaLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUM7UUFFRixNQUFNLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztRQUVoQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBTUQsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEMscUJBQXFCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsZ0RBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbEM7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Z0JBdEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsZ3BDQThCTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBcEMwQyxZQUFZO2dEQWtFbEQsTUFBTSxTQUFDLGVBQWU7O0lBd0IzQiw4QkFBQztDQUFBLEFBeEZELElBd0ZDO1NBckRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1yZXNvdXJjZS1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJvYmplY3QtZGlhbG9nXCI+XG4gIDwhLS0gaGVhZGVyIHdpdGggY2xvc2UgKG9uIHRoZSBsZWZ0IGhhbmQgc2lkZSkgYW5kIHJlc2l6ZSAob24gdGhlIHJpZ2h0IGhhbmQgc2lkZSkgYnV0dG9uXG4gICAgICBhbmQgd2l0aCB0aGUgdGl0bGUgaW4gdGhlIGNlbnRlciAtLT5cbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cImRpYWxvZy1hY3Rpb24tYnV0dG9uXCI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInJlc2l6ZS1idXR0b25cIiAoY2xpY2spPVwidG9nZ2xlRnVsbFNpemUoKVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJvcHRpbWl6ZS1kaXJlY3Rpb25cIiBbaW5uZXJIdG1sXT1cImZ1bGxTaXplID8gJ2NhbGxfcmVjZWl2ZWQnIDonY2FsbF9tYWRlJ1wiPjwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJmaWxsLXJlbWFpbmluZy1zcGFjZVwiPjwvc3Bhbj5cbiAgICA8c3Bhbj5cbiAgICAgIDxoMyBjbGFzcz1cImRpYWxvZy10aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGU+XG4gICAgICAgIFJlc291cmNlXG4gICAgICAgIDwhLS0nc2Fsc2FoTGFiZWxzLmZyYW1ld29ya0Zvckxpc3RpbmdzLmFkZC50aXRsZScgfCB0cmFuc2xhdGUgLS0+XG4gICAgICA8L2gzPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nLWFjdGlvbi1idXR0b25cIj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCIgKGNsaWNrKT1cIl9kaWFsb2dSZWYuY2xvc2UoKVwiPlxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cblxuICA8IS0tIDxtYXQtZGlhbG9nLWNvbnRlbnQgY2xhc3M9XCJkaWFsb2ctY29udGVudFwiIFtjbGFzcy5mdWxsc2l6ZV09XCJmdWxsU2l6ZVwiPlxuXG4gICAgICA8c2Fsc2FoLXJlc291cmNlLW9iamVjdCBbaXJpXT1cImRhdGEuaXJpXCI+PC9zYWxzYWgtcmVzb3VyY2Utb2JqZWN0PlxuXG4gIDwvbWF0LWRpYWxvZy1jb250ZW50PiAtLT5cblxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmdWxsU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIGBNYXREaWFsb2dgLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2UgdG8gYmUgZGlzcGxheWVkIGluIGEgZGlhbG9nLlxuICAgKiBAcGFyYW0gd2lkdGhQY3Qgd2lkdGggb2YgdGhlIGRpYWxvZyBpbiBwZXJjZW50YWdlLlxuICAgKiBAcGFyYW0gaGVpZ2h0UGN0IGhlaWdodCBvZiB0aGUgZGlhbG9nIGluIHBlcmNlbnRhZ2UuXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQ29uZmlndXJhdGlvbihyZXNvdXJjZUlyaTogc3RyaW5nLCB3aWR0aFBjdDogbnVtYmVyID0gNjAsIGhlaWdodFBjdDogbnVtYmVyID0gNjApIHtcblxuICAgIGNvbnN0IGNvbmZpZzogTWF0RGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuXG4gICAgY29uZmlnLmhlaWdodCA9IGAke3dpZHRoUGN0fSVgO1xuICAgIGNvbmZpZy53aWR0aCA9IGAke2hlaWdodFBjdH0lYDtcblxuICAgIGNvbmZpZy5kYXRhID0ge1xuICAgICAgaXJpOiByZXNvdXJjZUlyaVxuICAgIH07XG5cbiAgICBjb25maWcucGFuZWxDbGFzcyA9ICdyZXNpemFibGUnO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8UmVzb3VyY2VEaWFsb2dDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZ1bGxTaXplID0gKCF0aGlzLmRhdGEuZnVsbFNpemUpO1xuXG4gICAgLy8gc3RhcnQgaW4gZnVsbCBzaXplXG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgdGhpcy50b2dnbGVGdWxsU2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUZ1bGxTaXplKCkge1xuICAgIHRoaXMuZnVsbFNpemUgPSAoIXRoaXMuZnVsbFNpemUpO1xuXG4gICAgaWYgKHRoaXMuZnVsbFNpemUpIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi51cGRhdGVTaXplKCcxMDB2dycsICcxMDB2aCcpO1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi51cGRhdGVTaXplKCc4MHZ3JywgJ2F1dG8nKTtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=