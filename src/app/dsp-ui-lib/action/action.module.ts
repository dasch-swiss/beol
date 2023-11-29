import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationMessageComponent } from './components/confirmation-dialog/confirmation-message/confirmation-message.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MessageComponent } from './components/message/message.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { SelectProjectComponent } from './components/select-project/select-project.component';
import { SelectedResourcesComponent } from './components/selected-resources/selected-resources.component';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { StringLiteralInputComponent } from './components/string-literal-input/string-literal-input.component';
import { AdminImageDirective } from './directives/admin-image/admin-image.directive';
import { ExistingNameDirective } from './directives/existing-names/existing-name.directive';
import { GndDirective } from './directives/gnd/gnd.directive';
import { ReversePipe } from './pipes/array-transformation/reverse.pipe';
import { SortByPipe } from './pipes/array-transformation/sort-by.pipe';
import { FormattedBooleanPipe } from './pipes/formatting/formatted-boolean.pipe';
import { KnoraDatePipe } from './pipes/formatting/knoradate.pipe';
import { LinkifyPipe } from './pipes/string-transformation/linkify.pipe';
import { StringifyStringLiteralPipe } from './pipes/string-transformation/stringify-string-literal.pipe';
import { TruncatePipe } from './pipes/string-transformation/truncate.pipe';

@NgModule({
    declarations: [
        AdminImageDirective,
        ConfirmationDialogComponent,
        ConfirmationMessageComponent,
        ExistingNameDirective,
        FormattedBooleanPipe,
        GndDirective,
        KnoraDatePipe,
        LoginFormComponent,
        MessageComponent,
        ProgressIndicatorComponent,
        ReversePipe,
        SortButtonComponent,
        SortByPipe,
        StringifyStringLiteralPipe,
        StringLiteralInputComponent,
        SelectProjectComponent,
        LinkifyPipe,
        TruncatePipe,
        SelectedResourcesComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSnackBarModule
    ],
    exports: [
        AdminImageDirective,
        ConfirmationDialogComponent,
        ConfirmationMessageComponent,
        ExistingNameDirective,
        FormattedBooleanPipe,
        GndDirective,
        KnoraDatePipe,
        LoginFormComponent,
        MessageComponent,
        ProgressIndicatorComponent,
        ReversePipe,
        SortButtonComponent,
        SortByPipe,
        StringifyStringLiteralPipe,
        StringLiteralInputComponent,
        SelectProjectComponent,
        LinkifyPipe,
        TruncatePipe,
        SelectedResourcesComponent
    ]
})

export class DspActionModule { }
