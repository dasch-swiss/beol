import { Component, Input } from '@angular/core';
import { DateRangeSalsah, Precision, ReadDateValue } from '@knora/core';
var DateValueComponent = /** @class */ (function () {
    function DateValueComponent() {
    }
    Object.defineProperty(DateValueComponent.prototype, "calendar", {
        get: function () {
            return this._calendar;
        },
        set: function (value) {
            this._calendar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateValueComponent.prototype, "era", {
        get: function () {
            return this._era;
        },
        set: function (value) {
            this._era = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateValueComponent.prototype, "valueObject", {
        get: function () {
            return this._dateValueObj;
        },
        set: function (value) {
            this._dateValueObj = value;
            var dateOrRange = this.valueObject.getDateSalsah();
            if (dateOrRange instanceof DateRangeSalsah) {
                // period (start and end dates)
                this.period = true;
                this.dates = [this.getJSDate(dateOrRange.start), this.getJSDate(dateOrRange.end)];
            }
            else {
                // single date
                this.period = false;
                this.dates = [this.getJSDate(dateOrRange)];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a `DateSalsah` to a JS Date, providing necessary formatting information.
     * JULIAN and GREGORIAN calendar are the only available for the moment.
     *
     * @param date the date to be converted.
     * @return DateFormatter.
     */
    DateValueComponent.prototype.getJSDate = function (date) {
        if (date.precision === Precision.yearPrecision) {
            return {
                format: 'yyyy',
                date: new Date(date.year.toString()),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.monthPrecision) {
            return {
                format: 'MMMM ' + 'yyyy',
                date: new Date(date.year, date.month - 1, 1),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.dayPrecision) {
            return {
                format: 'longDate',
                date: new Date(date.year, date.month - 1, date.day),
                era: date.era,
                calendar: date.calendar
            };
        }
        else {
            console.error('Error: incorrect precision for date');
        }
    };
    DateValueComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-date-value',
                    template: "<span *ngIf=\"period; else preciseDate\">\n    {{dates[0].date | date: dates[0].format}}\n    <span *ngIf=\"era\">\n        {{dates[0].era}}\n    </span>\n    - {{dates[1].date | date: dates[1].format}}\n    <span *ngIf=\"era\">\n        {{dates[1].era}}\n    </span>\n\n    <span *ngIf=\"calendar\">\n        ({{dates[0].calendar}})\n    </span>\n</span>\n\n<ng-template #preciseDate>\n\n    <span>\n        {{dates[0].date | date: dates[0].format}}\n        <span *ngIf=\"era\">\n            {{dates[0].era}}\n        </span>\n        <span *ngIf=\"calendar\">\n            ({{dates[0].calendar}})\n        </span>\n    </span>\n\n</ng-template>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                },] },
    ];
    /** @nocollapse */
    DateValueComponent.ctorParameters = function () { return []; };
    DateValueComponent.propDecorators = {
        calendar: [{ type: Input }],
        era: [{ type: Input }],
        valueObject: [{ type: Input }]
    };
    return DateValueComponent;
}());
export { DateValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2RhdGUtdmFsdWUvZGF0ZS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBYyxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXBGO0lBZ0ZFO0lBQWdCLENBQUM7SUE3Q2pCLHNCQUNJLHdDQUFRO2FBSVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQVBELFVBQ2EsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQU1ELHNCQUNJLG1DQUFHO2FBSVA7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzthQVBELFVBQ1EsS0FBYztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQU1ELHNCQUNJLDJDQUFXO2FBZ0JmO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7YUFuQkQsVUFDZ0IsS0FBb0I7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFFM0IsSUFBTSxXQUFXLEdBQWlDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkYsSUFBSSxXQUFXLFlBQVksZUFBZSxFQUFFO2dCQUMxQywrQkFBK0I7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRjtpQkFBTTtnQkFDTCxjQUFjO2dCQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1FBRUgsQ0FBQzs7O09BQUE7SUFjRDs7Ozs7O09BTUc7SUFDSCxzQ0FBUyxHQUFULFVBQVUsSUFBZ0I7UUFFeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDOUMsT0FBTztnQkFDTCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLGNBQWMsRUFBRTtZQUN0RCxPQUFPO2dCQUNMLE1BQU0sRUFBRSxPQUFPLEdBQUcsTUFBTTtnQkFDeEIsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3hCLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3BELE9BQU87Z0JBQ0wsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ25ELEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDdEQ7SUFFSCxDQUFDOztnQkFwSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwyb0JBNEJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHdTQUF3UyxDQUFDO2lCQUNuVDs7Ozs7MkJBR0UsS0FBSztzQkFTTCxLQUFLOzhCQVNMLEtBQUs7O0lBaUVSLHlCQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0FyRlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlU2Fsc2FoLCBEYXRlU2Fsc2FoLCBQcmVjaXNpb24sIFJlYWREYXRlVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1kYXRlLXZhbHVlJyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdJZj1cInBlcmlvZDsgZWxzZSBwcmVjaXNlRGF0ZVwiPlxuICAgIHt7ZGF0ZXNbMF0uZGF0ZSB8IGRhdGU6IGRhdGVzWzBdLmZvcm1hdH19XG4gICAgPHNwYW4gKm5nSWY9XCJlcmFcIj5cbiAgICAgICAge3tkYXRlc1swXS5lcmF9fVxuICAgIDwvc3Bhbj5cbiAgICAtIHt7ZGF0ZXNbMV0uZGF0ZSB8IGRhdGU6IGRhdGVzWzFdLmZvcm1hdH19XG4gICAgPHNwYW4gKm5nSWY9XCJlcmFcIj5cbiAgICAgICAge3tkYXRlc1sxXS5lcmF9fVxuICAgIDwvc3Bhbj5cblxuICAgIDxzcGFuICpuZ0lmPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgKHt7ZGF0ZXNbMF0uY2FsZW5kYXJ9fSlcbiAgICA8L3NwYW4+XG48L3NwYW4+XG5cbjxuZy10ZW1wbGF0ZSAjcHJlY2lzZURhdGU+XG5cbiAgICA8c3Bhbj5cbiAgICAgICAge3tkYXRlc1swXS5kYXRlIHwgZGF0ZTogZGF0ZXNbMF0uZm9ybWF0fX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJlcmFcIj5cbiAgICAgICAgICAgIHt7ZGF0ZXNbMF0uZXJhfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAoe3tkYXRlc1swXS5jYWxlbmRhcn19KVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZm9ybS1maWVsZHt3aWR0aDozMjBweH0uZmlsbC1yZW1haW5pbmctc3BhY2V7ZmxleDoxIDEgYXV0b30uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5saW5re2N1cnNvcjpwb2ludGVyfS5sdi1odG1sLXRleHR7bWF4LWhlaWdodDo2MHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ubHYtcmVhZC1tb3Jle3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO21hcmdpbjowO3BhZGRpbmc6MzBweCAwO2JvcmRlci1yYWRpdXM6M3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGNhbGVuZGFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2FsZW5kYXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjYWxlbmRhcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXI7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZXJhKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZXJhID0gdmFsdWU7XG4gIH1cblxuICBnZXQgZXJhKCkge1xuICAgIHJldHVybiB0aGlzLl9lcmE7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWREYXRlVmFsdWUpIHtcbiAgICB0aGlzLl9kYXRlVmFsdWVPYmogPSB2YWx1ZTtcblxuICAgIGNvbnN0IGRhdGVPclJhbmdlOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoID0gdGhpcy52YWx1ZU9iamVjdC5nZXREYXRlU2Fsc2FoKCk7XG4gICAgaWYgKGRhdGVPclJhbmdlIGluc3RhbmNlb2YgRGF0ZVJhbmdlU2Fsc2FoKSB7XG4gICAgICAvLyBwZXJpb2QgKHN0YXJ0IGFuZCBlbmQgZGF0ZXMpXG4gICAgICB0aGlzLnBlcmlvZCA9IHRydWU7XG4gICAgICB0aGlzLmRhdGVzID0gW3RoaXMuZ2V0SlNEYXRlKGRhdGVPclJhbmdlLnN0YXJ0KSwgdGhpcy5nZXRKU0RhdGUoZGF0ZU9yUmFuZ2UuZW5kKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNpbmdsZSBkYXRlXG4gICAgICB0aGlzLnBlcmlvZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRlcyA9IFt0aGlzLmdldEpTRGF0ZShkYXRlT3JSYW5nZSldO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRlVmFsdWVPYmo7XG4gIH1cblxuICBkYXRlczogRGF0ZUZvcm1hdHRlcltdO1xuICBwZXJpb2Q6IGJvb2xlYW47XG4gIHByaXZhdGUgX2NhbGVuZGFyOiBib29sZWFuO1xuICBwcml2YXRlIF9lcmE6IGJvb2xlYW47XG4gIHByaXZhdGUgX2RhdGVWYWx1ZU9iajogUmVhZERhdGVWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGBEYXRlU2Fsc2FoYCB0byBhIEpTIERhdGUsIHByb3ZpZGluZyBuZWNlc3NhcnkgZm9ybWF0dGluZyBpbmZvcm1hdGlvbi5cbiAgICogSlVMSUFOIGFuZCBHUkVHT1JJQU4gY2FsZW5kYXIgYXJlIHRoZSBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIG1vbWVudC5cbiAgICpcbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gYmUgY29udmVydGVkLlxuICAgKiBAcmV0dXJuIERhdGVGb3JtYXR0ZXIuXG4gICAqL1xuICBnZXRKU0RhdGUoZGF0ZTogRGF0ZVNhbHNhaCk6IERhdGVGb3JtYXR0ZXIge1xuXG4gICAgaWYgKGRhdGUucHJlY2lzaW9uID09PSBQcmVjaXNpb24ueWVhclByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybWF0OiAneXl5eScsXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUueWVhci50b1N0cmluZygpKSxcbiAgICAgICAgZXJhOiBkYXRlLmVyYSxcbiAgICAgICAgY2FsZW5kYXI6IGRhdGUuY2FsZW5kYXJcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkYXRlLnByZWNpc2lvbiA9PT0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmb3JtYXQ6ICdNTU1NICcgKyAneXl5eScsXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIDEpLCAvLyAwIGJhc2UgbW9udGhcbiAgICAgICAgZXJhOiBkYXRlLmVyYSxcbiAgICAgICAgY2FsZW5kYXI6IGRhdGUuY2FsZW5kYXJcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkYXRlLnByZWNpc2lvbiA9PT0gUHJlY2lzaW9uLmRheVByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybWF0OiAnbG9uZ0RhdGUnLFxuICAgICAgICBkYXRlOiBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSksICAvLyAwIGJhc2UgbW9udGhcbiAgICAgICAgZXJhOiBkYXRlLmVyYSxcbiAgICAgICAgY2FsZW5kYXI6IGRhdGUuY2FsZW5kYXJcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBpbmNvcnJlY3QgcHJlY2lzaW9uIGZvciBkYXRlJyk7XG4gICAgfVxuXG4gIH1cblxufVxuXG4vKipcbiAqIERhdGUgc3RydWN0dXJlIGZvciB0aGUgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEYXRlRm9ybWF0dGVyIHtcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIGRhdGU6IERhdGU7XG4gIGVyYTogc3RyaW5nO1xuICBjYWxlbmRhcjogc3RyaW5nO1xufVxuIl19