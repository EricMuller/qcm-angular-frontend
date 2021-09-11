import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataQuestionModel, QuestionFilterModel} from '@app/app/state/filters/filters_models';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {
  GetQuestionnaireAction,
  GetQuestionStatusAction,
  GetQuestionTagAction, SelectQuestionTagAction, UnSelectQuestionTagAction
} from '@app/features/question/state/question-actions';
import {QuestionState} from '@app/features/question/state/question-state.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-question-filter',
  templateUrl: './question-filter.component.html',
  styleUrls: ['./question-filter.component.scss']
})
export class QuestionFilterComponent implements OnInit {

  @Select(QuestionState.currentData) public data$: Observable<DataQuestionModel>;

  @Select(QuestionState.currentFilter) public filter$: Observable<QuestionFilterModel>;

  statuses: string[];
  tags: Tag[];
  questionnaires: Questionnaire[];

  statusesSelected: string[];
  tagsSelected: Tag[];
  questionnairesSelected: Questionnaire[];

  opened = false;

  public selectable = true;

  @Output()
  private updated = new EventEmitter<boolean>();

  constructor(private store: Store) {

    this.filter$.subscribe(filter => {
      this.questionnairesSelected = filter.questionnaires;
      this.tagsSelected = filter.tags;
      this.statusesSelected = filter.status;
      this.opened = filter.opened;
    });

    this.data$.subscribe(filter => {
      this.questionnaires = filter.questionnaires;
      this.tags = filter.tags;
      this.statuses = filter.status;
    });

  }

  ngOnInit() {
    this.refreshDataStatuses();
    this.refreshDataTags();
    this.refreshDataQuestionnaires();
  }

  refreshDataTags() {
    this.store.dispatch(new GetQuestionTagAction());
  }
  refreshDataQuestionnaires() {
    this.store.dispatch(new GetQuestionnaireAction());
  }

  refreshDataStatuses() {
    this.store.dispatch(new GetQuestionStatusAction());
  }

  public onUpdated(b: boolean): void {
    this.updated.emit(b);
  }

  public onSelectedTags(event: Tag[]): void {
    this.tags = event;
  }

  public onSelectedQuestionnaires(event: Questionnaire[]): void {
    this.questionnaires = event;
  }

  selectTag(tag: Tag) {
    this.store.dispatch(new SelectQuestionTagAction(tag));
  }

  unSelectTag(tag: Tag) {
    this.store.dispatch(new UnSelectQuestionTagAction(tag));
  }

}
