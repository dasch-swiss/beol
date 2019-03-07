import { Component, Input } from '@angular/core';
import { ReadIntervalValue } from '@knora/core';
var IntervalValueComponent = /** @class */ (function () {
    function IntervalValueComponent() {
    }
    Object.defineProperty(IntervalValueComponent.prototype, "valueObject", {
        get: function () {
            return this._intervalValueObj;
        },
        set: function (value) {
            this._intervalValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    IntervalValueComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-interval-value',
                    template: "<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                },] },
    ];
    /** @nocollapse */
    IntervalValueComponent.ctorParameters = function () { return []; };
    IntervalValueComponent.propDecorators = {
        valueObject: [{ type: Input }]
    };
    return IntervalValueComponent;
}());
export { IntervalValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWwtdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9pbnRlcnZhbC12YWx1ZS9pbnRlcnZhbC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWhEO0lBa0JFO0lBQWdCLENBQUM7SUFYakIsc0JBQ0ksK0NBQVc7YUFJZjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7YUFQRCxVQUNnQixLQUF3QjtZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBOztnQkFWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLDBFQUEwRTtvQkFDcEYsTUFBTSxFQUFFLENBQUMsd1NBQXdTLENBQUM7aUJBQ25UOzs7Ozs4QkFHRSxLQUFLOztJQWFSLDZCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FmWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkSW50ZXJ2YWxWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWludGVydmFsLXZhbHVlJyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj57e3ZhbHVlT2JqZWN0LmludGVydmFsU3RhcnR9fSAtIHt7dmFsdWVPYmplY3QuaW50ZXJ2YWxFbmR9fTwvc3Bhbj5gLFxuICBzdHlsZXM6IFtgLm1hdC1mb3JtLWZpZWxke3dpZHRoOjMyMHB4fS5maWxsLXJlbWFpbmluZy1zcGFjZXtmbGV4OjEgMSBhdXRvfS5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpbmt7Y3Vyc29yOnBvaW50ZXJ9Lmx2LWh0bWwtdGV4dHttYXgtaGVpZ2h0OjYwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5sdi1yZWFkLW1vcmV7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjA7cGFkZGluZzozMHB4IDA7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJ2YWxWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSkge1xuICAgIHRoaXMuX2ludGVydmFsVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWxWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2ludGVydmFsVmFsdWVPYmo6IFJlYWRJbnRlcnZhbFZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiJdfQ==