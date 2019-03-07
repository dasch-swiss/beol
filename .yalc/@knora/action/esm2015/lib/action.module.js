/**
 * This module is part of the Knora-ui modules:
 * https://github.com/dhlab-basel/Knora-ui
 *
 * @copyright 2018
 * Digital Humanities Lab, University of Basel;
 * Data and Service Center for the Humanities DaSCH;
 * All Rights Reserved.
 *
 * @licence
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 *
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminImageDirective } from './admin-image/admin-image.directive';
import { GndDirective } from './gnd/gnd.directive';
import { JdnDatepickerDirective } from './jdn-datepicker/jdn-datepicker.directive';
import { ExistingNameDirective } from './existing-name/existing-name.directive';
import { KeyPipe } from './pipes/key.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { SortButtonComponent } from './sort-button/sort-button.component';
/**
 * export @dec class
 */
export class KuiActionModule {
}
KuiActionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BrowserAnimationsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatMenuModule
                ],
                declarations: [
                    ProgressIndicatorComponent,
                    SortButtonComponent,
                    SortByPipe,
                    AdminImageDirective,
                    ExistingNameDirective,
                    ReversePipe,
                    KeyPipe,
                    GndDirective,
                    ResourceDialogComponent,
                    JdnDatepickerDirective
                ],
                exports: [
                    ProgressIndicatorComponent,
                    SortButtonComponent,
                    SortByPipe,
                    AdminImageDirective,
                    ExistingNameDirective,
                    ReversePipe,
                    KeyPipe,
                    GndDirective,
                    JdnDatepickerDirective
                ]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUMxRTs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlOzs7WUFwQzNCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWix1QkFBdUI7b0JBQ3ZCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixhQUFhO2lCQUVoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO29CQUMxQixtQkFBbUI7b0JBQ25CLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsc0JBQXNCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsMEJBQTBCO29CQUMxQixtQkFBbUI7b0JBQ25CLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxZQUFZO29CQUNaLHNCQUFzQjtpQkFDekI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBtb2R1bGUgaXMgcGFydCBvZiB0aGUgS25vcmEtdWkgbW9kdWxlczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGxhYi1iYXNlbC9Lbm9yYS11aVxuICpcbiAqIEBjb3B5cmlnaHQgMjAxOFxuICogRGlnaXRhbCBIdW1hbml0aWVzIExhYiwgVW5pdmVyc2l0eSBvZiBCYXNlbDtcbiAqIERhdGEgYW5kIFNlcnZpY2UgQ2VudGVyIGZvciB0aGUgSHVtYW5pdGllcyBEYVNDSDtcbiAqIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogQGxpY2VuY2VcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFkbWluSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2FkbWluLWltYWdlL2FkbWluLWltYWdlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHbmREaXJlY3RpdmUgfSBmcm9tICcuL2duZC9nbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2pkbi1kYXRlcGlja2VyL2pkbi1kYXRlcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFeGlzdGluZ05hbWVEaXJlY3RpdmUgfSBmcm9tICcuL2V4aXN0aW5nLW5hbWUvZXhpc3RpbmctbmFtZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgS2V5UGlwZSB9IGZyb20gJy4vcGlwZXMva2V5LnBpcGUnO1xuaW1wb3J0IHsgUmV2ZXJzZVBpcGUgfSBmcm9tICcuL3BpcGVzL3JldmVyc2UucGlwZSc7XG5pbXBvcnQgeyBTb3J0QnlQaXBlIH0gZnJvbSAnLi9waXBlcy9zb3J0LWJ5LnBpcGUnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlLWRpYWxvZy9yZXNvdXJjZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNvcnRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3NvcnQtYnV0dG9uL3NvcnQtYnV0dG9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGVcblxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBBZG1pbkltYWdlRGlyZWN0aXZlLFxuICAgICAgICBFeGlzdGluZ05hbWVEaXJlY3RpdmUsXG4gICAgICAgIFJldmVyc2VQaXBlLFxuICAgICAgICBLZXlQaXBlLFxuICAgICAgICBHbmREaXJlY3RpdmUsXG4gICAgICAgIFJlc291cmNlRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBKZG5EYXRlcGlja2VyRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBBZG1pbkltYWdlRGlyZWN0aXZlLFxuICAgICAgICBFeGlzdGluZ05hbWVEaXJlY3RpdmUsXG4gICAgICAgIFJldmVyc2VQaXBlLFxuICAgICAgICBLZXlQaXBlLFxuICAgICAgICBHbmREaXJlY3RpdmUsXG4gICAgICAgIEpkbkRhdGVwaWNrZXJEaXJlY3RpdmVcbiAgICBdXG59KVxuLyoqXG4gKiBleHBvcnQgQGRlYyBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgS3VpQWN0aW9uTW9kdWxlIHtcbn1cbiJdfQ==