// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
// @knora modules
import { KuiCoreModule } from '@knora/core';
import { KuiActionModule } from '@knora/action';
import { KuiSearchModule } from '@knora/search';
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
// Loads the application configuration file during application startup
import { AppConfig } from './app.config';

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
        LetterComponent
    ],
    imports: [
        AppRouting,
        BrowserModule,
        FlexLayoutModule,
        KuiCoreModule.forRoot({
            name: environment.name,
            api: environment.api,
            media: environment.media,
            app: environment.app,
        }),
        KuiActionModule,
        KuiSearchModule,
        MaterialModule
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
