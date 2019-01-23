// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { PublisherComponent } from './resource/publisher/publisher.component';
import { LetterComponent } from './resource/letter/letter.component';
import { ReadListValueComponent } from './properties/read-list-value/read-list-value.component';
import { ReadTextValueAsHtmlComponent } from './properties/read-text-value-as-html/read-text-value-as-html.component';
import { LeooRouteComponent } from './leoo-route/leoo-route.component';
import { EndnoteComponent } from './resource/endnote/endnote.component';
import { FigureComponent } from './resource/figure/figure.component';
import { BiblioItemsComponent } from './resource/biblio-items/biblio-items.component';
// directives
import { MathJaxDirective } from './directives/mathjax.directive';
// Loads the application configuration file during application startup
import { CorrespondenceComponent } from './correspondence/correspondence.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
// import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MeditatioComponent } from './resource/meditatio/meditatio.component';

import { ReadTextValueComponent } from './properties/read-text-value/read-text-value.component';
import { HanCatalogueDirective } from './directives/han-catalogue.directive';


/*
export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.loadAppConfig();
}
*/

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        SearchResultsComponent,
        ErrorComponent,
        IntroductionComponent,
        ResourceComponent,
        PersonComponent,
        PublisherComponent,
        LetterComponent,
        ReadListValueComponent,
        ReadTextValueAsHtmlComponent,
        CorrespondenceComponent,
        ContactComponent,
        ContactFormComponent,
        MathJaxDirective,
        LeooRouteComponent,
        BiblioItemsComponent,
        EndnoteComponent,
        FigureComponent,
        MeditatioComponent,
        ReadTextValueComponent,
        HanCatalogueDirective,
    ],
    imports: [
        //        AngularFireModule.initializeApp(environment.firebase),
        AppRouting,
        BrowserModule,
        FlexLayoutModule,
        InfiniteScrollModule,
        KuiCoreModule.forRoot({
            name: environment.appName,
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
        /*        AppConfig,
                {
                    provide: APP_INITIALIZER,
                    useFactory: initializeApp,
                    deps: [AppConfig],
                    multi: true
                },*/
        //        AngularFirestore,
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
