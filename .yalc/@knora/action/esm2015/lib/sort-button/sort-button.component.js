import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the KuiSortBy pipe.
 */
export class SortButtonComponent {
    /**
     * @ignore
     */
    constructor() {
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
    sortKey(sortKey) {
        this.activeKey = sortKey;
    }
    ngOnInit() {
        if (this.position === 'right') {
            this.menuXPos = 'before';
        }
    }
    /**
     * @ignore
     *
     * @param {string} key
     */
    sortBy(key) {
        this.sortKeyChange.emit(key);
    }
}
SortButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-sort-button',
                template: `<span class="sort-button" [class]="position">
    <button mat-icon-button [matMenuTriggerFor]="sortSelection">
        <mat-icon class="optimize-direction">sort</mat-icon>
    </button>
    <mat-menu #sortSelection="matMenu" [xPosition]="menuXPos">
        <button mat-menu-item
                *ngFor="let item of sortProps"
                (click)="sortBy(item.key)"
                [class.active]="sortKey === item.key">
            {{item.label}}
        </button>
    </mat-menu>
</span>
`,
                styles: [`.active{background:rgba(128,128,128,.8)}.right{float:right}.right .mat-icon{-webkit-transform:scale(-1,1);transform:scale(-1,1)}`]
            },] },
];
/** @nocollapse */
SortButtonComponent.ctorParameters = () => [];
SortButtonComponent.propDecorators = {
    sortKeyChange: [{ type: Output }],
    sortProps: [{ type: Input }],
    position: [{ type: Input }],
    sortKey: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8vRTs7O0dBR0c7QUFtQkgsTUFBTSxPQUFPLG1CQUFtQjtJQXFDNUI7O09BRUc7SUFDSDtRQXRDQTs7Ozs7O1dBTUc7UUFDTyxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRzNFLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFXM0I7OztXQUdHO1FBQ00sYUFBUSxHQUFZLE1BQU0sQ0FBQztJQWNwQyxDQUFDO0lBWkQ7OztPQUdHO0lBQ00sT0FBTyxDQUFDLE9BQWU7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQVFELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzVCO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsR0FBVztRQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OztZQTNFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0NBYWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsa0lBQWtJLENBQUM7YUFDL0k7Ozs7OzRCQVVJLE1BQU07d0JBWU4sS0FBSzt1QkFNTCxLQUFLO3NCQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydFByb3Age1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgd2l0aCBhIGxpc3Qgb2YgcHJvcGVydGllcyB0byBzb3J0IGEgbGlzdCBieSBvbmUgb2YgdGhlbS5cbiAqIEl0IGNhbiBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggdGhlIEt1aVNvcnRCeSBwaXBlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zb3J0LWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cInNvcnQtYnV0dG9uXCIgW2NsYXNzXT1cInBvc2l0aW9uXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cInNvcnRTZWxlY3Rpb25cIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwib3B0aW1pemUtZGlyZWN0aW9uXCI+c29ydDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPG1hdC1tZW51ICNzb3J0U2VsZWN0aW9uPVwibWF0TWVudVwiIFt4UG9zaXRpb25dPVwibWVudVhQb3NcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc29ydFByb3BzXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic29ydEJ5KGl0ZW0ua2V5KVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzb3J0S2V5ID09PSBpdGVtLmtleVwiPlxuICAgICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbjwvc3Bhbj5cbmAsXG4gICAgc3R5bGVzOiBbYC5hY3RpdmV7YmFja2dyb3VuZDpyZ2JhKDEyOCwxMjgsMTI4LC44KX0ucmlnaHR7ZmxvYXQ6cmlnaHR9LnJpZ2h0IC5tYXQtaWNvbnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgtMSwxKTt0cmFuc2Zvcm06c2NhbGUoLTEsMSl9YF1cbn0pXG5leHBvcnQgY2xhc3MgU29ydEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlIHtzdHJpbmd9IHNvcnRLZXlDaGFuZ2VcbiAgICAgKiBAZW1pdHMgVE9ETzogdGhpcyB3b3VsZCBiZSB0aGUgY29ycmVjdCBzeW50YXggZm9yIE91dHB1dCBldmVudEVtaXR0ZXJcbiAgICAgKlxuICAgICAqIEV2ZW50RW1pdHRlciB3aGVuIGEgdXNlciBzZWxlY3RlZCBhIHNvcnQgcHJvcGVydHk7XG4gICAgICogVGhpcyBpcyB0aGUgc2VsZWN0ZWQga2V5XG4gICAgICovXG4gICAgQE91dHB1dCgpIHNvcnRLZXlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICAgIG1lbnVYUG9zOiBzdHJpbmcgPSAnYWZ0ZXInO1xuXG4gICAgYWN0aXZlS2V5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1NvcnRQcm9wW119IHNvcnRQcm9wc1xuICAgICAqIEFuIGFycmF5IG9mIFNvcnRQcm9wIG9iamVjdHMgZm9yIHRoZSBzZWxlY3Rpb24gbWVudTpcbiAgICAgKiBTb3J0UHJvcDogeyBrZXk6IHN0cmluZywgbGFiZWw6IHN0cmluZyB9XG4gICAgICovXG4gICAgQElucHV0KCkgc29ydFByb3BzOiBTb3J0UHJvcFtdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwb3NpdGlvbj0nbGVmdCddXG4gICAgICogT3B0aW9uYWwgcG9zaXRpb24gb2YgdGhlIHNvcnQgbWVudTogcmlnaHQgb3IgbGVmdFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uPzogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvcnRLZXlcbiAgICAgKiBzZXQgYW5kIGdldCAodHdvLXdheSBkYXRhIGJpbmRpbmcpIG9mIGN1cnJlbnQgc29ydCBrZXlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0S2V5KHNvcnRLZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFjdGl2ZUtleSA9IHNvcnRLZXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5tZW51WFBvcyA9ICdiZWZvcmUnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICovXG4gICAgc29ydEJ5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc29ydEtleUNoYW5nZS5lbWl0KGtleSk7XG4gICAgfVxuXG59XG4iXX0=