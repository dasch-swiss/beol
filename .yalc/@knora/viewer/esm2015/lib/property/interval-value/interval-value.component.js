import { Component, Input } from '@angular/core';
import { ReadIntervalValue } from '@knora/core';
export class IntervalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._intervalValueObj = value;
    }
    get valueObject() {
        return this._intervalValueObj;
    }
}
IntervalValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-interval-value',
                template: `<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>`,
                styles: [`.mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}`]
            },] },
];
/** @nocollapse */
IntervalValueComponent.ctorParameters = () => [];
IntervalValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWwtdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9pbnRlcnZhbC12YWx1ZS9pbnRlcnZhbC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT2hELE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsZ0JBQWdCLENBQUM7SUFYakIsSUFDSSxXQUFXLENBQUMsS0FBd0I7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQzs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSwwRUFBMEU7Z0JBQ3BGLE1BQU0sRUFBRSxDQUFDLHdTQUF3UyxDQUFDO2FBQ25UOzs7OzswQkFHRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEludGVydmFsVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1pbnRlcnZhbC12YWx1ZScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC5pbnRlcnZhbFN0YXJ0fX0gLSB7e3ZhbHVlT2JqZWN0LmludGVydmFsRW5kfX08L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEludGVydmFsVmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZEludGVydmFsVmFsdWUpIHtcbiAgICB0aGlzLl9pbnRlcnZhbFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVydmFsVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9pbnRlcnZhbFZhbHVlT2JqOiBSZWFkSW50ZXJ2YWxWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=