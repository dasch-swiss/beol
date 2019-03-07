import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the KuiSortBy pipe.
 */
var SortButtonComponent = /** @class */ (function () {
    /**
     * @ignore
     */
    function SortButtonComponent() {
        /**
         * @ignore {string} sortKeyChange
         * @emits TODO: this would be the correct syntax for Output eventEmitter
         *
         * EventEmitter when a user selected a sort property;
         * This is the selected key
         */
        this.sortKeyChange = new EventEmitter();
        this.menuXPos = 'after';
        /**
         * @param {string} [position='left']
         * Optional position of the sort menu: right or left
         */
        this.position = 'left';
    }
    /**
     * @param {string} sortKey
     * set and get (two-way data binding) of current sort key
     */
    SortButtonComponent.prototype.sortKey = function (sortKey) {
        this.activeKey = sortKey;
    };
    SortButtonComponent.prototype.ngOnInit = function () {
        if (this.position === 'right') {
            this.menuXPos = 'before';
        }
    };
    /**
     * @ignore
     *
     * @param {string} key
     */
    SortButtonComponent.prototype.sortBy = function (key) {
        this.sortKeyChange.emit(key);
    };
    SortButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-sort-button',
                    template: "<span class=\"sort-button\" [class]=\"position\">\n    <button mat-icon-button [matMenuTriggerFor]=\"sortSelection\">\n        <mat-icon class=\"optimize-direction\">sort</mat-icon>\n    </button>\n    <mat-menu #sortSelection=\"matMenu\" [xPosition]=\"menuXPos\">\n        <button mat-menu-item\n                *ngFor=\"let item of sortProps\"\n                (click)=\"sortBy(item.key)\"\n                [class.active]=\"sortKey === item.key\">\n            {{item.label}}\n        </button>\n    </mat-menu>\n</span>\n",
                    styles: [".active{background:rgba(128,128,128,.8)}.right{float:right}.right .mat-icon{-webkit-transform:scale(-1,1);transform:scale(-1,1)}"]
                },] },
    ];
    /** @nocollapse */
    SortButtonComponent.ctorParameters = function () { return []; };
    SortButtonComponent.propDecorators = {
        sortKeyChange: [{ type: Output }],
        sortProps: [{ type: Input }],
        position: [{ type: Input }],
        sortKey: [{ type: Input }]
    };
    return SortButtonComponent;
}());
export { SortButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8vRTs7O0dBR0c7QUFDSDtJQXVESTs7T0FFRztJQUNIO1FBdENBOzs7Ozs7V0FNRztRQUNPLGtCQUFhLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHM0UsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQVczQjs7O1dBR0c7UUFDTSxhQUFRLEdBQVksTUFBTSxDQUFDO0lBY3BDLENBQUM7SUFaRDs7O09BR0c7SUFDTSxxQ0FBTyxHQUFoQixVQUFpQixPQUFlO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFRRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUM1QjtJQUVMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0NBQU0sR0FBTixVQUFPLEdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDOztnQkEzRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw4Z0JBYWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsa0lBQWtJLENBQUM7aUJBQy9JOzs7OztnQ0FVSSxNQUFNOzRCQVlOLEtBQUs7MkJBTUwsS0FBSzswQkFNTCxLQUFLOztJQTBCViwwQkFBQztDQUFBLEFBN0VELElBNkVDO1NBM0RZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3J0UHJvcCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB3aXRoIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIHRvIHNvcnQgYSBsaXN0IGJ5IG9uZSBvZiB0aGVtLlxuICogSXQgY2FuIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCB0aGUgS3VpU29ydEJ5IHBpcGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNvcnQtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwic29ydC1idXR0b25cIiBbY2xhc3NdPVwicG9zaXRpb25cIj5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwic29ydFNlbGVjdGlvblwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJvcHRpbWl6ZS1kaXJlY3Rpb25cIj5zb3J0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LW1lbnUgI3NvcnRTZWxlY3Rpb249XCJtYXRNZW51XCIgW3hQb3NpdGlvbl09XCJtZW51WFBvc1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzb3J0UHJvcHNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzb3J0QnkoaXRlbS5rZXkpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNvcnRLZXkgPT09IGl0ZW0ua2V5XCI+XG4gICAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L21hdC1tZW51PlxuPC9zcGFuPlxuYCxcbiAgICBzdHlsZXM6IFtgLmFjdGl2ZXtiYWNrZ3JvdW5kOnJnYmEoMTI4LDEyOCwxMjgsLjgpfS5yaWdodHtmbG9hdDpyaWdodH0ucmlnaHQgLm1hdC1pY29uey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC0xLDEpO3RyYW5zZm9ybTpzY2FsZSgtMSwxKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTb3J0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmUge3N0cmluZ30gc29ydEtleUNoYW5nZVxuICAgICAqIEBlbWl0cyBUT0RPOiB0aGlzIHdvdWxkIGJlIHRoZSBjb3JyZWN0IHN5bnRheCBmb3IgT3V0cHV0IGV2ZW50RW1pdHRlclxuICAgICAqXG4gICAgICogRXZlbnRFbWl0dGVyIHdoZW4gYSB1c2VyIHNlbGVjdGVkIGEgc29ydCBwcm9wZXJ0eTtcbiAgICAgKiBUaGlzIGlzIHRoZSBzZWxlY3RlZCBrZXlcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc29ydEtleUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gICAgbWVudVhQb3M6IHN0cmluZyA9ICdhZnRlcic7XG5cbiAgICBhY3RpdmVLZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U29ydFByb3BbXX0gc29ydFByb3BzXG4gICAgICogQW4gYXJyYXkgb2YgU29ydFByb3Agb2JqZWN0cyBmb3IgdGhlIHNlbGVjdGlvbiBtZW51OlxuICAgICAqIFNvcnRQcm9wOiB7IGtleTogc3RyaW5nLCBsYWJlbDogc3RyaW5nIH1cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0UHJvcHM6IFNvcnRQcm9wW107XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Bvc2l0aW9uPSdsZWZ0J11cbiAgICAgKiBPcHRpb25hbCBwb3NpdGlvbiBvZiB0aGUgc29ydCBtZW51OiByaWdodCBvciBsZWZ0XG4gICAgICovXG4gICAgQElucHV0KCkgcG9zaXRpb24/OiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydEtleVxuICAgICAqIHNldCBhbmQgZ2V0ICh0d28td2F5IGRhdGEgYmluZGluZykgb2YgY3VycmVudCBzb3J0IGtleVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRLZXkoc29ydEtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlS2V5ID0gc29ydEtleTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVYUG9zID0gJ2JlZm9yZSc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKi9cbiAgICBzb3J0Qnkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zb3J0S2V5Q2hhbmdlLmVtaXQoa2V5KTtcbiAgICB9XG5cbn1cbiJdfQ==