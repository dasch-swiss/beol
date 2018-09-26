import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { LetterComponent } from './resource/letter/letter.component';
import { PersonComponent } from './resource/person/person.component';
import { ResourceComponent } from './resource/resource.component';
import { CorrespondenceComponent } from './correspondence/correspondence.component';


const appRoutes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'introduction/:project/:id',
        component: IntroductionComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'correspondence/:project',
        component: CorrespondenceComponent,
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
        path: 'viewer/:id',
        component: ResourceComponent
    },
    {
        path: '**',
        component: ErrorComponent,
        data: { status: 404 }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})

export class AppRouting {
}
