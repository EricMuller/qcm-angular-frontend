import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {QuestionnaireDialogComponent} from '../../questionnaire/questionnaire-dialog/questionnaire-dialog.component';



@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  public questionnaire: Questionnaire;
  public question: Question;

  constructor(public dialogRef: MatDialogRef<QuestionnaireDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.question = Object.assign({}, this.data['question']);
    this.questionnaire = Object.assign({}, this.data['questionnaire']);
  }

  ngOnInit() {


  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public save() {
    // this.questionnaireService.postQuestionnaire(this.questionnaire).subscribe(
    //   (q) => {
    //     this.dialogRef.close(q);
    //   }
    // );
  }

}
