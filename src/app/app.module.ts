// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
// @knora modules
import { KuiCoreModule } from '@knora/core';
import { KuiActionModule } from '@knora/action';
import { KuiSearchModule } from '@knora/search';
import { KuiViewerModule } from '@knora/viewer';
// modules from @angular/material and @angular/flex-layout
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
// router module and app routing with all the path definitions
// import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
// app components
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ErrorComponent } from './error/error.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ResourceComponent } from './resource/resource.component';
import { PersonComponent } from './resource/person/person.component';
import { LetterComponent } from './resource/letter/letter.component';
import { ReadBooleanValueComponent } from './properties/read-boolean-value/read-boolean-value.component';
import { ReadColorValueComponent } from './properties/read-color-value/read-color-value.component';
import { ReadDateValueComponent } from './properties/read-date-value/read-date-value.component';
import { ReadDecimalValueComponent } from './properties/read-decimal-value/read-decimal-value.component';
import { ReadGeomValueComponent } from './properties/read-geom-value/read-geom-value.component';
import { ReadIntegerValueComponent } from './properties/read-integer-value/read-integer-value.component';
import { ReadIntervalValueComponent } from './properties/read-interval-value/read-interval-value.component';
import { ReadLinkValueComponent } from './properties/read-link-value/read-link-value.component';
import { ReadListValueComponent } from './properties/read-list-value/read-list-value.component';
import { ReadTextValueAsHtmlComponent } from './properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadTextValueAsStringComponent } from './properties/read-text-value-as-string/read-text-value-as-string.component';
import { ReadTextValueAsXmlComponent } from './properties/read-text-value-as-xml/read-text-value-as-xml.component';
import { ReadTextfileValueComponent } from './properties/read-textfile-value/read-textfile-value.component';
import { ReadUriValueComponent } from './properties/read-uri-value/read-uri-value.component';
import { LeooRouteComponent } from './leoo-route/leoo-route.component';
import { EndnoteComponent } from './resource/endnote/endnote.component';
import { FigureComponent } from './resource/figure/figure.component';
// directives
import { MathJaxDirective } from './directives/mathjax.directive';
// Loads the application configuration file during application startup
import { AppConfig } from './app.config';
import { CorrespondenceComponent } from './correspondence/correspondence.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
// import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { AngularFirestore } from '../../node_modules/angularfire2/firestore';
import { AngularFireModule } from '../../node_modules/@angular/fire';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.loadAppConfig();
}

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        SearchResultsComponent,
        ErrorComponent,
        IntroductionComponent,
        ResourceComponent,
        PersonComponent,
        LetterComponent,
        ReadBooleanValueComponent,
        ReadColorValueComponent,
        ReadDateValueComponent,
        ReadDecimalValueComponent,
        ReadGeomValueComponent,
        ReadIntegerValueComponent,
        ReadIntervalValueComponent,
        ReadLinkValueComponent,
        ReadListValueComponent,
        ReadTextValueAsHtmlComponent,
        ReadTextValueAsStringComponent,
        ReadTextValueAsXmlComponent,
        ReadTextfileValueComponent,
        ReadUriValueComponent,
        CorrespondenceComponent,
        ContactComponent,
        ContactFormComponent,
        MathJaxDirective,
        LeooRouteComponent,
        EndnoteComponent
        FigureComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AppRouting,
        BrowserModule,
        FlexLayoutModule,
        InfiniteScrollModule,
        KuiCoreModule.forRoot({
            name: environment.name,
            api: environment.api,
            media: environment.media,
            app: environment.app,
        }),
        KuiActionModule,
        KuiSearchModule,
        KuiViewerModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true
        },
        AngularFirestore,
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
