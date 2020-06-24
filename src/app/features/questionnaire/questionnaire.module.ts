import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CategoryDialogComponent} from '@app/features/category/category-dialog/category-dialog.component';
import {CategoryModule} from '@app/features/category/category.module';
import {QuestionModule} from '@app/features/question/question.module';
import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';
import {TagListStore} from '@app/features/stores/tag-list-store.service';
import {TagModule} from '@app/features/tag/tag.module';
import {UploadModule} from '@app/features/upload/upload.module';
import {UserModule} from '@app/features/user/user.module';
import {AngularModule} from '@app/shared/angular/angular.module';
import {MaterialComponentsModule} from '@app/shared/material-components/material-components.module';
import {MaterialModule} from '@app/shared/material/material.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {LMarkdownEditorModule} from 'ngx-markdown-editor';
import {QuestionnaireQuestionListComponent} from './question-list/question-list.component';
import {QuestionnaireDialogComponent} from './questionnaire-dialog/questionnaire-dialog.component';
import {QuestionnaireFormComponent} from './questionnaire-form/questionnaire-form.component';
import {QuestionnaireListComponent} from './questionnaire-list/questionnaire-list.component';
import {QuestionnaireNavListComponent} from './questionnaire-list/questionnaire-nav-list/questionnaire-nav-list.component';
import {QuestionnaireQuestionsComponent} from './questionnaire-questions/questionnaire-questions.component';
import {SearchStore} from './services/questionnaire-search-store.service';

@NgModule({
  imports: [
    CommonModule,
    AngularModule,
    MaterialModule,
    QuestionModule,
    UserModule,
    CategoryModule,
    TagModule,
    UploadModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    LMarkdownEditorModule,
  ],
  declarations: [
    QuestionnaireListComponent,
    QuestionnaireDialogComponent,
    QuestionnaireQuestionListComponent,
    QuestionnaireNavListComponent,
    QuestionnaireFormComponent,
    QuestionnaireQuestionsComponent,
  ],
  entryComponents: [QuestionnaireDialogComponent, CategoryDialogComponent],
  providers: [SearchStore, QuestionnaireListStore, TagListStore
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // }
  ]
})
export class QuestionnaireModule {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }
}
