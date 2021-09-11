import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {QuestionFilterModel} from '@app/app/state/filters/filters_models';
import {CurrentQuestionnaireModel} from '@app/app/state/navigation/navigation-model';

import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {Filters} from '@app/features/question/question-list/Filters';
import {FilterQuestionAction} from '@app/features/question/state/question-actions';
import {QuestionState} from '@app/features/question/state/question-state.service';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {

  public filter = false;

  filters = new Filters();

  @Select(AppState.currentQuestionnaire) public currentQuestionnaire$: Observable<CurrentQuestionnaireModel>;

  @Select(QuestionState.currentFilter) public filter$: Observable<QuestionFilterModel>;

  public uuid: string;
  public selected: Question[];

  constructor(public questionListStore: QuestionListStore,
              private router: Router,
              private questionnaireService: QuestionnaireService,
              private store: Store) {

    this.currentQuestionnaire$.subscribe(value => {
      this.uuid = value.uuid;
    });

    questionListStore.selected$.subscribe(value => this.selected = value);

    this.filter$.subscribe(value => {
      this.filter = value.opened;
    });
  }

  ngOnInit() {

  }

  public create() {
    this.router.navigate(['/questions/0']);
  }

  public addToQuestionnaire(uuid: string, questions: Question[]) {

    if (uuid) {
      for (const q of questions) {
        this.questionnaireService.putQuestion(uuid, q)
          .subscribe(value => console.log(value));
      }
    }
  }

  public onSelectedTags(event: Tag[]): void {

    this.filters.tags = event;

  }

  public onSelectedQuestionnaires(event: Questionnaire[]): void {

    this.filters.questionnaires = event;

  }

  public toggleFilter() {
    this.store.dispatch(new FilterQuestionAction(!this.filter));
  }


}
