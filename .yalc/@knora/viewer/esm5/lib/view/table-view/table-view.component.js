import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
var TableViewComponent = /** @class */ (function () {
    function TableViewComponent() {
        this.KnoraConstants = KnoraConstants;
    }
    TableViewComponent.prototype.ngOnInit = function () {
    };
    TableViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-table-view',
                    template: "<p>\n  table-view works!\n</p>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    TableViewComponent.ctorParameters = function () { return []; };
    TableViewComponent.propDecorators = {
        result: [{ type: Input }],
        ontologyInfo: [{ type: Input }],
        isLoading: [{ type: Input }]
    };
    return TableViewComponent;
}());
export { TableViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvdGFibGUtdmlldy90YWJsZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTdDO0lBZ0JFO1FBRkEsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFFaEIsQ0FBQztJQUVqQixxQ0FBUSxHQUFSO0lBQ0EsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsa0NBR1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7Ozt5QkFHRSxLQUFLOytCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUFTUix5QkFBQztDQUFBLEFBckJELElBcUJDO1NBYlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXRhYmxlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICB0YWJsZS12aWV3IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcmVzdWx0O1xuICBASW5wdXQoKSBvbnRvbG9neUluZm87XG4gIEBJbnB1dCgpIGlzTG9hZGluZztcblxuICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19