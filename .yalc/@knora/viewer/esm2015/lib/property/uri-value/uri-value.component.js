import { Component, Input } from '@angular/core';
import { ReadUriValue } from '@knora/core';
export class UriValueComponent {
    constructor() { }
    set valueObject(value) {
        this.__uriValueObj = value;
    }
    get valueObject() {
        return this.__uriValueObj;
    }
}
UriValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-uri-value',
                template: `<a href="{{valueObject.uri}}" target="_blank">{{valueObject.uri}}</a>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
UriValueComponent.ctorParameters = () => [];
UriValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvcHJvcGVydHkvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8zQyxNQUFNLE9BQU8saUJBQWlCO0lBYTVCLGdCQUFnQixDQUFDO0lBWGpCLElBQ0ksV0FBVyxDQUFDLEtBQW1CO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQzs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsdUVBQXVFO2dCQUNqRixNQUFNLEVBQUUsQ0FBQyx3U0FBd1MsQ0FBQzthQUNuVDs7Ozs7MEJBR0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRVcmlWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXVyaS12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPGEgaHJlZj1cInt7dmFsdWVPYmplY3QudXJpfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57e3ZhbHVlT2JqZWN0LnVyaX19PC9hPmAsXG4gIHN0eWxlczogW2AubWF0LWZvcm0tZmllbGR7d2lkdGg6MzIwcHh9LmZpbGwtcmVtYWluaW5nLXNwYWNle2ZsZXg6MSAxIGF1dG99LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ubGlua3tjdXJzb3I6cG9pbnRlcn0ubHYtaHRtbC10ZXh0e21heC1oZWlnaHQ6NjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lmx2LXJlYWQtbW9yZXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MDtwYWRkaW5nOjMwcHggMDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBVcmlWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVXJpVmFsdWUpIHtcbiAgICB0aGlzLl9fdXJpVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3VyaVZhbHVlT2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBfX3VyaVZhbHVlT2JqOiBSZWFkVXJpVmFsdWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19