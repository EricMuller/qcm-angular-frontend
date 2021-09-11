import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './features/home/about.component';
import {QuestionResolver} from './features/question/resolvers/question-resolver.service';
import {QuestionsResolver} from './features/question/resolvers/questions-resolver.service';
import {PageQuestionsByQuestionnaireResolver} from './features/questionnaire/resolvers/page-questions-questionnaire-resolver.service';
import {QuestionsQuestionnaireResolver} from './features/questionnaire/resolvers/questions-questionnaire-resolver.service';

const routes: Routes = [

  {
    path: 'about', component: AboutComponent,
    data: {
      pageTitle: 'menu.about'
    }
  },
  {
    path: 'upload', loadChildren: () => import('./features/upload/upload-routing.module').then(m => m.UploadRoutingModule),
    data: {
      pageTitle: null
    }
  },
  {
    path: 'user', loadChildren: () => import('./features/account/account-routing.module').then(m => m.AccountRoutingModule),
    data: {
      pageTitle: null
    }
  },
  {
    path: 'social', loadChildren: () => import('./features/social/social-routing.module').then(m => m.SocialRoutingModule),
    data: {
      pageTitle: null
    }
  },
  {
    path: 'questions',
    loadChildren: () => import('./features/question/question-routing.module').then(m => m.QuestionRoutingModule),
    data: {preload: true, pageTitle: null}
  },
  {
    path: 'questionnaires',
    loadChildren: () => import('./features/questionnaire/questionnaire-routing.module').then(m => m.QuestionnaireRoutingModule),
    data: {preload: true, pageTitle: 'Mes questionnaires'},
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings-routing.module').then(m => m.SettingsRoutingModule),
    data: {preload: true, pageTitle: null},
  },
  {
    path: '', redirectTo: 'about', pathMatch: 'full'
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: [PageQuestionsByQuestionnaireResolver, QuestionsResolver, QuestionResolver, QuestionsQuestionnaireResolver]
})
export class AppRoutingModule {
}


