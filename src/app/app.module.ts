// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
// @knora modules
import { KuiCoreModule, KuiCoreConfigToken } from '@knora/core';
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
import { NewtonLetterComponent } from './resource/newton-letter/newton-letter.component';
import { LeibnizLetterComponent } from './resource/leibniz-letter/leibniz-letter.component';
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

import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
// import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReadTextValueComponent } from './properties/read-text-value/read-text-value.component';

import {SanitizeHtmlPipe} from './pipes/sanitize-html.pipe';
import {SanitizeUrlPipe} from './pipes/sanitize-url.pipe';
import { NewtonProjectDirective } from './directives/newton-project.directive';
import { LeibnizPortalDirective } from './directives/leibniz-portal.directive';

import { HanCatalogueDirective } from './directives/han-catalogue.directive';
import { BebbRouteComponent } from './bebb-route/bebb-route.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AppInitService } from './app-init.service';
import { TeiLinkDirective } from './directives/tei-link.directive';


export function initializeApp(appInitService: AppInitService) {
    return (): Promise<any> => {
        return appInitService.Init();
    };
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
        PublisherComponent,
        LetterComponent,
        NewtonLetterComponent,
        LeibnizLetterComponent,
        ReadListValueComponent,
        ReadTextValueAsHtmlComponent,
        CorrespondenceComponent,
        ContactComponent,
        MathJaxDirective,
        LeooRouteComponent,
        BiblioItemsComponent,
        EndnoteComponent,
        FigureComponent,
        ReadTextValueComponent,
        HanCatalogueDirective,
        NewtonProjectDirective,
        LeibnizPortalDirective,
        SanitizeHtmlPipe,
        SanitizeUrlPipe,
        BebbRouteComponent,
        TeiLinkDirective
    ],
    imports: [
        AppRouting,
        BrowserModule,
        FlexLayoutModule,
        InfiniteScrollModule,
        KuiCoreModule,
        KuiActionModule,
        KuiSearchModule,
        KuiViewerModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    providers: [
        AppInitService,
        {
            provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true
        },
        {
            provide: KuiCoreConfigToken, useFactory: () => AppInitService.coreConfig
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: false
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
