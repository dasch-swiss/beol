import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { IntroductionComponent } from './introduction/introduction.component';


const appRoutes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'introduction/:project/:id',
        component: IntroductionComponent,
    },
    {
        path: 'search',
        children: [
            {
                path: ':mode/:q',
                component: SearchResultsComponent
            }
        ]
    },
        {
            path: '**',
            component: ErrorComponent,
            data: {status: 404}
        }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting {
}
