import { Component, Input } from '@angular/core';
import { ReadDecimalValue } from '@knora/core';
var DecimalValueComponent = /** @class */ (function () {
    function DecimalValueComponent() {
    }
    Object.defineProperty(DecimalValueComponent.prototype, "valueObject", {
        get: function () {
            return this._decimalValueObj;
        },
        set: function (value) {
            this._decimalValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    DecimalValueComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-decimal-value',
                    template: "<span>{{valueObject.decimal}}</span>",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                },] },
    ];
    /** @nocollapse */
    DecimalValueComponent.ctorParameters = function () { return []; };
    DecimalValueComponent.propDecorators = {
        valueObject: [{ type: Input }]
    };
    return DecimalValueComponent;
}());
export { DecimalValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2RlY2ltYWwtdmFsdWUvZGVjaW1hbC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRS9DO0lBa0JFO0lBQWdCLENBQUM7SUFYakIsc0JBQ0ksOENBQVc7YUFJZjtZQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQy9CLENBQUM7YUFQRCxVQUNnQixLQUF1QjtZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBOztnQkFWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsTUFBTSxFQUFFLENBQUMsd1NBQXdTLENBQUM7aUJBQ25UOzs7Ozs4QkFHRSxLQUFLOztJQWFSLDRCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FmWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkRGVjaW1hbFZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZGVjaW1hbC12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC5kZWNpbWFsfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY2ltYWxWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkRGVjaW1hbFZhbHVlKSB7XG4gICAgdGhpcy5fZGVjaW1hbFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY2ltYWxWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2RlY2ltYWxWYWx1ZU9iajogUmVhZERlY2ltYWxWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=