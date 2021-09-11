import {Component, OnInit} from '@angular/core';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss']
})
export class StatusSelectComponent implements OnInit {

  public status: string[];

  public selectable = true;
  public removable = true;

  constructor(private questionService: QuestionService) {


  }

  ngOnInit() {
  }

  public selectItem(tag: Questionnaire) {

  }

}
