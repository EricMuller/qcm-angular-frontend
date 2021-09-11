import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Router} from '@angular/router';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {QuestionDialogComponent} from '@app/features/question/question-dialog/question-dialog.component';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';

import {TagListStore} from '@app/features/stores/tag-list-store.service';
import {LayoutDialogModule} from '@app/shared/material-components/layout-module/layout-dialog.module';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-question-nav-list',
  templateUrl: './question-nav-list.component.html',
  styleUrls: ['./question-nav-list.component.scss']
})
export class QuestionNavListComponent implements OnInit {

  @Input()
  public elements$: Observable<Question[]>;

  constructor(private questionListStore: QuestionListStore,
              private tagListStore: TagListStore, private router: Router,
              private dialog: MatDialog, private layout: LayoutDialogModule,
              private questionService: QuestionService) {
  }

  ngOnInit() {
  }

  public isSelected(question: Question): boolean {
    return this.questionListStore.isSelected(question);
  }

  public swapTag(tag: Tag) {
    this.tagListStore.swapElement(tag);
  }

  public setClickedRow = function (event, question: Question) {
    this.questionListStore.swapElement(question);
    event.stopPropagation();
  };

  public create() {
    this.router.navigate(['/questions/0']);
  }


  navigate(question: Question) {
    this.router.navigate(['/questions/' + question.uuid]);
  }


  public openQuestionDialog(SelectedQuestion: Question) {

    this.questionService.getQuestionByUuid(SelectedQuestion.uuid)
      .subscribe(q => {
        const config = new MatDialogConfig();

        //
        config.data = {question: q, categories: null};

        this.layout.openCenterFull(this.dialog, QuestionDialogComponent, config);
      });


  }
}
