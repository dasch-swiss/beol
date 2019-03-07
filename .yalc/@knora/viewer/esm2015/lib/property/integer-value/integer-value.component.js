import { Component, Input } from '@angular/core';
import { ReadIntegerValue } from '@knora/core';
export class IntegerValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._integerValueObj = value;
    }
    get valueObject() {
        return this._integerValueObj;
    }
}
IntegerValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-integer-value',
                template: `<span>{{valueObject.integer}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
IntegerValueComponent.ctorParameters = () => [];
IntegerValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTy9DLE1BQU0sT0FBTyxxQkFBcUI7SUFhOUI7SUFDQSxDQUFDO0lBWkQsSUFDSSxXQUFXLENBQUMsS0FBdUI7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQzs7O1lBZEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELE1BQU0sRUFBRSxDQUFDLHdTQUF3UyxDQUFDO2FBQ3JUOzs7OzswQkFHSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEludGVnZXJWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktaW50ZWdlci12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8c3Bhbj57e3ZhbHVlT2JqZWN0LmludGVnZXJ9fTwvc3Bhbj5gLFxuICAgIHN0eWxlczogW2AubWF0LWZvcm0tZmllbGR7d2lkdGg6MzIwcHh9LmZpbGwtcmVtYWluaW5nLXNwYWNle2ZsZXg6MSAxIGF1dG99LmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ubGlua3tjdXJzb3I6cG9pbnRlcn0ubHYtaHRtbC10ZXh0e21heC1oZWlnaHQ6NjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lmx2LXJlYWQtbW9yZXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MDtwYWRkaW5nOjMwcHggMDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBJbnRlZ2VyVmFsdWVDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRJbnRlZ2VyVmFsdWUpIHtcbiAgICAgICAgdGhpcy5faW50ZWdlclZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZWdlclZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ludGVnZXJWYWx1ZU9iajogUmVhZEludGVnZXJWYWx1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIl19