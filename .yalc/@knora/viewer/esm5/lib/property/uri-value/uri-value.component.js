import { Component, Input } from '@angular/core';
import { ReadUriValue } from '@knora/core';
var UriValueComponent = /** @class */ (function () {
    function UriValueComponent() {
    }
    Object.defineProperty(UriValueComponent.prototype, "valueObject", {
        get: function () {
            return this.__uriValueObj;
        },
        set: function (value) {
            this.__uriValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    UriValueComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-uri-value',
                    template: "<a href=\"{{valueObject.uri}}\" target=\"_blank\">{{valueObject.uri}}</a>",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                },] },
    ];
    /** @nocollapse */
    UriValueComponent.ctorParameters = function () { return []; };
    UriValueComponent.propDecorators = {
        valueObject: [{ type: Input }]
    };
    return UriValueComponent;
}());
export { UriValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvcHJvcGVydHkvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUzQztJQWtCRTtJQUFnQixDQUFDO0lBWGpCLHNCQUNJLDBDQUFXO2FBSWY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzthQVBELFVBQ2dCLEtBQW1CO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUFBOztnQkFWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSwyRUFBdUU7b0JBQ2pGLE1BQU0sRUFBRSxDQUFDLHdTQUF3UyxDQUFDO2lCQUNuVDs7Ozs7OEJBR0UsS0FBSzs7SUFhUix3QkFBQztDQUFBLEFBcEJELElBb0JDO1NBZlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFVyaVZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktdXJpLXZhbHVlJyxcbiAgdGVtcGxhdGU6IGA8YSBocmVmPVwie3t2YWx1ZU9iamVjdC51cml9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7dmFsdWVPYmplY3QudXJpfX08L2E+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFVyaVZhbHVlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRVcmlWYWx1ZSkge1xuICAgIHRoaXMuX191cmlWYWx1ZU9iaiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9fdXJpVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9fdXJpVmFsdWVPYmo6IFJlYWRVcmlWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=