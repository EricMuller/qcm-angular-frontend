import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';

@Component({
  selector: 'app-questionnaire-question-dialog',
  templateUrl: './questionnaire-question-dialog.component.html',
  styleUrls: ['./questionnaire-question-dialog.component.scss']
})
export class QuestionnaireQuestionDialogComponent implements OnInit {

  public questionnaire: Questionnaire;
  public question: Question;


  constructor(public dialogRef: MatDialogRef<QuestionnaireQuestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const questionKey = 'question';
    const questionnaireKey = 'questionnaire';
    this.question = Object.assign({}, this.data[questionKey]);
    this.questionnaire = Object.assign({}, this.data[questionnaireKey]);
  }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }


}
