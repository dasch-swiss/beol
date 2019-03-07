import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KnoraConstants, ValueLiteral } from '@knora/core';
import { HeaderComponent } from './header-calendar/header-calendar.component';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
export class DateValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.DateValue;
        // custom header for the datepicker
        this.headerComponent = HeaderComponent;
    }
    ngOnInit() {
        // init datepicker
        this.form = this.fb.group({
            dateValue: [null, Validators.compose([Validators.required])]
        });
        this.form.valueChanges.subscribe((data) => {
            // console.log(data.dateValue);
        });
        resolvedPromise.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        const dateObj = this.form.value.dateValue;
        // get calendar format
        const calendarFormat = dateObj.calendarName;
        // get calendar period
        const calendarPeriod = dateObj.toCalendarPeriod();
        // get the date
        const dateString = `${calendarFormat.toUpperCase()}:${calendarPeriod.periodStart.year}-${calendarPeriod.periodStart.month}-${calendarPeriod.periodStart.day}:${calendarPeriod.periodEnd.year}-${calendarPeriod.periodEnd.month}-${calendarPeriod.periodEnd.day}`;
        return new ValueLiteral(String(dateString), KnoraConstants.DateValue);
    }
}
DateValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-value',
                template: `<mat-form-field>
    <kuiJdnDatepicker>
        <input matInput [matDatepicker]="picker" placeholder="Choose a date" [formControl]="form.controls['dateValue']">
        <mat-datepicker #picker [calendarHeaderComponent]="headerComponent"></mat-datepicker>
    </kuiJdnDatepicker>
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
</mat-form-field>`,
                styles: [``]
            },] },
];
/** @nocollapse */
DateValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
DateValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9kYXRlLXZhbHVlL2RhdGUtdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVEsTUFBTSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUFFLGNBQWMsRUFBd0IsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUU5RSx3SEFBd0g7QUFDeEgsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQWE5QyxNQUFNLE9BQU8sa0JBQWtCO0lBWTNCLFlBQXlDLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBUHhELFNBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBSWhDLG1DQUFtQztRQUNuQyxvQkFBZSxHQUFHLGVBQWUsQ0FBQztJQUdsQyxDQUFDO0lBRUQsUUFBUTtRQUVKLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDL0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsK0JBQStCO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEIsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsV0FBVztRQUVQLHlDQUF5QztRQUN6QyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxRQUFRO1FBRUosTUFBTSxPQUFPLEdBQTJCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUVsRSxzQkFBc0I7UUFDdEIsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUM1QyxzQkFBc0I7UUFDdEIsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbEQsZUFBZTtRQUNmLE1BQU0sVUFBVSxHQUFHLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFalEsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQWpFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7O2tCQU1JO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNmOzs7O1lBbkJRLFdBQVcsdUJBZ0NILE1BQU0sU0FBQyxXQUFXOzs7d0JBVDlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3QsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVmFsdWUsIFZhbHVlTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IEdyZWdvcmlhbkNhbGVuZGFyRGF0ZSwgSkROQ29udmVydGlibGVDYWxlbmRhciwgSkROUGVyaW9kIH0gZnJvbSAnamRuY29udmVydGlibGVjYWxlbmRhcic7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci1jYWxlbmRhci9oZWFkZXItY2FsZW5kYXIuY29tcG9uZW50JztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGF0ZS12YWx1ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGt1aUpkbkRhdGVwaWNrZXI+XG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIiBwbGFjZWhvbGRlcj1cIkNob29zZSBhIGRhdGVcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybS5jb250cm9sc1snZGF0ZVZhbHVlJ11cIj5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgW2NhbGVuZGFySGVhZGVyQ29tcG9uZW50XT1cImhlYWRlckNvbXBvbmVudFwiPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgPC9rdWlKZG5EYXRlcGlja2VyPlxuICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG48L21hdC1mb3JtLWZpZWxkPmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8vIHBhcmVudCBGb3JtR3JvdXBcbiAgICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBjdXN0b20gaGVhZGVyIGZvciB0aGUgZGF0ZXBpY2tlclxuICAgIGhlYWRlckNvbXBvbmVudCA9IEhlYWRlckNvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gaW5pdCBkYXRlcGlja2VyXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgZGF0ZVZhbHVlOiBbbnVsbCwgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkXSldXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLmRhdGVWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncHJvcFZhbHVlJywgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgY29uc3QgZGF0ZU9iajogSkROQ29udmVydGlibGVDYWxlbmRhciA9IHRoaXMuZm9ybS52YWx1ZS5kYXRlVmFsdWU7XG5cbiAgICAgICAgLy8gZ2V0IGNhbGVuZGFyIGZvcm1hdFxuICAgICAgICBjb25zdCBjYWxlbmRhckZvcm1hdCA9IGRhdGVPYmouY2FsZW5kYXJOYW1lO1xuICAgICAgICAvLyBnZXQgY2FsZW5kYXIgcGVyaW9kXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyUGVyaW9kID0gZGF0ZU9iai50b0NhbGVuZGFyUGVyaW9kKCk7XG4gICAgICAgIC8vIGdldCB0aGUgZGF0ZVxuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYCR7Y2FsZW5kYXJGb3JtYXQudG9VcHBlckNhc2UoKX06JHtjYWxlbmRhclBlcmlvZC5wZXJpb2RTdGFydC55ZWFyfS0ke2NhbGVuZGFyUGVyaW9kLnBlcmlvZFN0YXJ0Lm1vbnRofS0ke2NhbGVuZGFyUGVyaW9kLnBlcmlvZFN0YXJ0LmRheX06JHtjYWxlbmRhclBlcmlvZC5wZXJpb2RFbmQueWVhcn0tJHtjYWxlbmRhclBlcmlvZC5wZXJpb2RFbmQubW9udGh9LSR7Y2FsZW5kYXJQZXJpb2QucGVyaW9kRW5kLmRheX1gO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmFsdWVMaXRlcmFsKFN0cmluZyhkYXRlU3RyaW5nKSwgS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlKTtcbiAgICB9XG59XG4iXX0=