import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {QuestionnaireModel} from '@app/app/state/questionnaire-model';
import {SetCurrentQuestionnaireAction} from '@app/app/state/set-current-questionnaire-action';
import {ValidationStatusValidated} from '@app/features/qcm-rest-api/model/enums/ValidationStatus';
import {Question, QuestionPatch} from '@app/features/qcm-rest-api/model/question.model';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {QuestionnaireQuestionListStore} from '@app/features/stores/questionnaire-question-list-store.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-questionnaire-question-list',
  templateUrl: './questionnaire-question-list.component.html',
  styleUrls: ['./questionnaire-question-list.component.scss'],
})
export class QuestionnaireQuestionListComponent implements OnInit {

  public filter = false;

  private selected: Question[];

  @Select(AppState.currentQuestionnaire) public currentQuestionnaire$: Observable<QuestionnaireModel>;

  constructor(public questionnaireQuestionListStore: QuestionnaireQuestionListStore,
              private router: Router, private route: ActivatedRoute, private store: Store,
              private questionService: QuestionService) {
    this.route.data.subscribe(data => {
      const questionnaire = data.questionnaire;
      this.store.dispatch(new SetCurrentQuestionnaireAction({uuid: questionnaire.uuid, title: questionnaire.title}));
    });

    questionnaireQuestionListStore.selected$.subscribe(value => this.selected = value);
  }

  ngOnInit() {

  }

  public create() {
    this.router.navigate(['/questions/0']);
  }

  validateAll() {
    this.selected.forEach(value => {
      const patch = new QuestionPatch();
      patch.status = ValidationStatusValidated;
      this.questionService.patchQuestion(value.uuid, patch)
        .subscribe(q => {
          this.questionnaireQuestionListStore.updateElement(q);
        });
    });
  }

}
