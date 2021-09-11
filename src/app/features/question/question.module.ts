import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CategoryDialogComponent} from '@app/features/category/category-dialog/category-dialog.component';
import {CategoryModule} from '@app/features/category/category.module';
import {QuestionnaireSelectComponent} from '@app/features/question/questionnaire-select/questionnaire-select.component';
import {QuestionState} from '@app/features/question/state/question-state.service';
import {QuestionnaireQuestionListComponent} from '@app/features/questionnaire/questionnaire-questions-list/questionnaire-question-list.component';
import {QuestionnaireQuestionNavListComponent} from '@app/features/questionnaire/questionnaire-questions-list/questionnaire-question-nav-list/questionnaire-question-nav-list.component';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';

import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';
import {TagListStore} from '@app/features/stores/tag-list-store.service';
import {SearchStore} from '@app/features/stores/tag-questionnaire-filter-store-s.service';
import {TagModule} from '@app/features/tag/tag.module';
import {AccountModule} from '@app/features/account/account.module';
import {AngularModule} from '@app/shared/angular/angular.module';
import {MaterialComponentsModule} from '@app/shared/material-components/material-components.module';
import {MaterialModule} from '@app/shared/material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxsModule} from '@ngxs/store';
import {LMarkdownEditorModule} from 'ngx-markdown-editor';
import {QuestionDialogComponent} from './question-dialog/question-dialog.component';
import {QuestionFilterComponent} from './question-filter/question-filter.component';
import {QuestionFormComponent} from './question-form/question-form.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {QuestionNavListComponent} from './question-list/question-nav-list/question-nav-list.component';
import {QuestionResponsesComponent} from './question-responses/question-responses.component';
import {StatusSelectComponent} from './status-select/status-select.component';

@NgModule({
  imports: [
    AngularModule,
    MaterialModule,
    AccountModule,
    TagModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    CategoryModule,
    TranslateModule.forChild(),
    LMarkdownEditorModule,
    NgxsModule.forFeature([QuestionState]),
  ],
  declarations: [QuestionListComponent, QuestionDialogComponent,
    QuestionNavListComponent, QuestionFormComponent, QuestionnaireSelectComponent,
    QuestionnaireQuestionListComponent, QuestionnaireQuestionNavListComponent, QuestionResponsesComponent,
    StatusSelectComponent, QuestionFilterComponent],
  entryComponents: [QuestionDialogComponent, CategoryDialogComponent],
  exports: [QuestionListComponent, QuestionnaireQuestionListComponent, QuestionFormComponent],
  providers: [SearchStore, QuestionnaireListStore, TagListStore, QuestionListStore]
})
export class QuestionModule {


}
