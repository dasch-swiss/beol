import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
export class TableViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvdGFibGUtdmlldy90YWJsZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVTdDLE1BQU0sT0FBTyxrQkFBa0I7SUFRN0I7UUFGQSxtQkFBYyxHQUFHLGNBQWMsQ0FBQztJQUVoQixDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7WUFuQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7O3FCQUdFLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXRhYmxlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICB0YWJsZS12aWV3IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcmVzdWx0O1xuICBASW5wdXQoKSBvbnRvbG9neUluZm87XG4gIEBJbnB1dCgpIGlzTG9hZGluZztcblxuICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19