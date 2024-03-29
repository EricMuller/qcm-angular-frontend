import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionListComponent} from '@app/features/question/question-list/question-list.component';
import {QuestionnaireFormComponent} from '@app/features/questionnaire/questionnaire-form/questionnaire-form.component';
import {QuestionnaireListComponent} from '@app/features/questionnaire/questionnaire-list/questionnaire-list.component';
import {QuestionnaireQuestionListComponent} from '@app/features/questionnaire/questionnaire-questions-list/questionnaire-question-list.component';
import {QuestionnaireModule} from '@app/features/questionnaire/questionnaire.module';
import {QuestionnaireCategoryResolver} from '@app/features/questionnaire/resolvers/category-resolver.service';
import {QuestionnaireResolver} from '@app/features/questionnaire/resolvers/questionnaire-resolver.service';
import {QuestionnairesResolver} from '@app/features/questionnaire/resolvers/questionnaires-resolver.service';
import {QuestionsQuestionnaireResolver} from '@app/features/questionnaire/resolvers/questions-questionnaire-resolver.service';
import {AppGuard} from '@app/shared/auth/app-guard.service';

const routes: Routes = [
  {
    path: '', component: QuestionnaireListComponent, canActivate: [AppGuard],
    data: {
      pageTitle: 'menu.questionnaires',
    }
  },
  {
    path: ':uuid/questions', component: QuestionnaireQuestionListComponent, canActivate: [AppGuard],
    data: {
      pageTitle: 'menu.page.questionnaire.questions',
    },
    resolve: {
      questionnaire: QuestionnaireResolver,
      // questions: QuestionsQuestionnaireResolver
    }
  },
  {
    path: ':uuid', component: QuestionnaireFormComponent, canActivate: [AppGuard],
    data: {
      pageTitle: 'menu.page.questionnaire',
    },
    resolve: {
      questionnaire: QuestionnaireResolver,
      categories: QuestionnaireCategoryResolver
    },
    children: [
      {path: 'generalite', component: QuestionnaireFormComponent},
      {path: 'questions', component: QuestionListComponent},
    ]
  },
] ;

@NgModule({
  imports: [QuestionnaireModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuestionnairesResolver, QuestionnaireResolver, QuestionsQuestionnaireResolver, QuestionnaireCategoryResolver],
})
export class QuestionnaireRoutingModule {
}
