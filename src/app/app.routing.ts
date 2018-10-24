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
import { ContactComponent } from './contact/contact.component';
import { EndnoteComponent } from './resource/endnote/endnote.component';
import { LeooRouteComponent } from './leoo-route/leoo-route.component';
import { FigureComponent } from './resource/figure/figure.component';
import { BiblioItemsComponent } from './resource/biblio-items/biblio-items.component';


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
        path: 'resource/:id',
        component: ResourceComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'person/:id',
        component: PersonComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'figure/:id',
        component: FigureComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'biblio/:id',
        component: BiblioItemsComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'letter/:id',
        component: LetterComponent,
        runGuardsAndResolvers: 'paramsChange'
    },
    {
        path: 'endnote/:id',
        component: EndnoteComponent,
        runGuardsAndResolvers: 'paramsChange'
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
        path: 'leoo/:rn',
        component: LeooRouteComponent
    },
    {
        path: 'contact',
        component: ContactComponent
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
