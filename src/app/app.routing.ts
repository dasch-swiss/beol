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
import { PageComponent } from './resource/page/page.component';
import { NewtonLetterComponent } from './resource/newton-letter/newton-letter.component';
import { LeibnizLetterComponent } from './resource/leibniz-letter/leibniz-letter.component';
import { BebbRouteComponent } from './bebb-route/bebb-route.component';
import { TranscriptionComponent } from './resource/transcription/transcription.component';
import { ManuscriptEntryComponent } from './resource/manuscript-entry/manuscript-entry.component';
import { CommentComponent } from './resource/comment/comment.component';

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
        path: 'page/:id',
        component: PageComponent
    },
    {
        path: 'page/:id/:region',
        component: PageComponent
    },
    {
        path: 'newtonLetter/:id',
        component: NewtonLetterComponent
    },
    {
        path: 'leibnizLetter/:id',
        component: LeibnizLetterComponent
    },
    {
        path: 'endnote/:id',
        component: EndnoteComponent
    },
    {
        path: 'transcription/:id',
        component: TranscriptionComponent
    },
    {
        path: 'manuscriptEntry/:id',
        component: ManuscriptEntryComponent
    },
    {
        path: 'entryComment/:id',
        component: CommentComponent
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
        path: 'bebb/:lt',
        component: BebbRouteComponent
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
