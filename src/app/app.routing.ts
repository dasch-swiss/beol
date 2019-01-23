import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { LetterComponent } from './resource/letter/letter.component';
import { PersonComponent } from './resource/person/person.component';
import { PublisherComponent } from './resource/publisher/publisher.component';
import { ResourceComponent } from './resource/resource.component';
import { CorrespondenceComponent } from './correspondence/correspondence.component';
import { ContactComponent } from './contact/contact.component';
import { EndnoteComponent } from './resource/endnote/endnote.component';
import { LeooRouteComponent } from './leoo-route/leoo-route.component';
import { FigureComponent } from './resource/figure/figure.component';
import { BiblioItemsComponent } from './resource/biblio-items/biblio-items.component';
import {NewtonLetterComponent} from './resource/newton-letter/newton-letter.component';


const appRoutes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'introduction/:project/:id',
        component: IntroductionComponent
    },
    {
        path: 'correspondence/:project',
        component: CorrespondenceComponent,
    },
    {
        path: 'resource/:id',
        component: ResourceComponent
    },
    {
        path: 'person/:id',
        component: PersonComponent
    },
    {
        path: 'publisher/:id',
        component: PublisherComponent
    },
    {
        path: 'figure/:id',
        component: FigureComponent
    },
    {
        path: 'biblio/:id',
        component: BiblioItemsComponent
    },
    {
        path: 'letter/:id',
        component: LetterComponent
    },
    {
        path: 'newtonLetter/:id',
        component: NewtonLetterComponent
    },
    {
        path: 'endnote/:id',
        component: EndnoteComponent
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
