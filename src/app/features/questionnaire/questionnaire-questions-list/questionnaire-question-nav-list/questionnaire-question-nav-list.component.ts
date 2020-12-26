import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Router} from '@angular/router';
import {Question, QuestionnaireQuestion} from '@app/features/qcm-rest-api/model/question.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {QuestionDialogComponent} from '@app/features/question/question-dialog/question-dialog.component';
import {QuestionnaireQuestionListStore} from '@app/features/stores/questionnaire-question-list-store.service';

import {TagListStore} from '@app/features/stores/tag-list-store.service';
import {LayoutDialogModule} from '@app/shared/material-components/layout-module/layout-dialog.module';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-questionnaire-question-nav-list',
  templateUrl: './questionnaire-question-nav-list.component.html',
  styleUrls: ['./questionnaire-question-nav-list.component.scss']
})
export class QuestionnaireQuestionNavListComponent implements OnInit {

  @Input()
  public elements$: Observable<QuestionnaireQuestion[]>;

  constructor(private questionnaireQuestionListStore: QuestionnaireQuestionListStore,
              private tagListStore: TagListStore, private router: Router,
              private dialog: MatDialog, private layout: LayoutDialogModule) {
  }

  ngOnInit() {
  }

  public isSelected(question: QuestionnaireQuestion): boolean {
    return this.questionnaireQuestionListStore.isSelected(question);
  }

  public swapTag(tag: Tag) {
    this.tagListStore.swapElement(tag);
  }

  public setClickedRow(question: QuestionnaireQuestion) {
    this.questionnaireQuestionListStore.swapElement(question);
  }

  public create() {
    this.router.navigate(['/questions/0']);
  }

  public openQuestionDialog(selectedQuestion: QuestionnaireQuestion) {
    const config = new MatDialogConfig();
    //
    config.data = {question: selectedQuestion};

    this.layout.openCenterFull(this.dialog, QuestionDialogComponent, config);

  }
}
