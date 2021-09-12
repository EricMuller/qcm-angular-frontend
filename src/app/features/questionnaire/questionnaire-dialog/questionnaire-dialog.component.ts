import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';



@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.scss']
})
export class QuestionnaireDialogComponent implements OnInit {

  public questionnaire;

  constructor(public dialogRef: MatDialogRef<QuestionnaireDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
    this.questionnaire = Object.assign({}, this.data.questionnaire);
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public save() {
    this.questionnaireService.postQuestionnaire(this.questionnaire).subscribe(
      (q) => {
        this.dialogRef.close(q);
      }
    );
  }

}
