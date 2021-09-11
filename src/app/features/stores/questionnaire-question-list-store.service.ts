import {Injectable} from '@angular/core';
import {AppState} from '@app/app/state/app-state.service';
import {CurrentQuestionnaireModel} from '@app/app/state/navigation/navigation-model';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Question, QuestionnaireQuestion} from '@app/features/qcm-rest-api/model/question.model';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CriteriaStore, CrudStore} from '@app/features/stores/store-api';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';


@Injectable()
export class QuestionnaireQuestionListStore extends SelectStoreAdapter<QuestionnaireQuestion>
  implements CriteriaStore<QuestionnaireQuestion>, CrudStore<QuestionnaireQuestion, string> {

  @Select(AppState.currentQuestionnaire) public currentQuestionnaire$: Observable<CurrentQuestionnaireModel>;

  constructor(private questionnaireService: QuestionnaireService, private store: Store) {
    super();

    this
      .currentQuestionnaire$
      .subscribe((q) => {
          this.deleteCriteriabyName('questionnaire_uuid');
          if (q) {
            this.addCriteria(new Criteria(q.uuid, 'questionnaire_uuid'));
          }
        }
      )
    ;
  }

  getElement(uuid: string): Observable<QuestionnaireQuestion> {
    // return this.questionService.getQuestionByUuid(uuid);
    throw new Error('Not Implemented');
  }

  getPage(page ?: number, size ?: number, sort ?: string): Observable<PagedModel<QuestionnaireQuestion>> {
    // const obs = this.questionService.getQuestions(page, size, sort);
    throw new Error(' getPage Not Implemented');
    // const q: QuestionnaireModel = this.store.selectSnapshot<QuestionnaireModel>(AppState.currentQuestionnaire);
    // const obs = this.questionService.getPageQuestionsByQuestionnaireUuid(q.uuid);
    // obs.subscribe(
    //   p => {
    //     this.publishPage(p);
    //   });
    // return obs;
  }

  deleteElement(question: QuestionnaireQuestion): Observable<QuestionnaireQuestion> {

    const q = this.store.selectSnapshot<CurrentQuestionnaireModel>(AppState.currentQuestionnaire);

    return this.questionnaireService
      .deleteQuestionByUuid(q.uuid, question.uuid)
      .pipe(
        mergeMap((data) => {
          return this.deletePageElement(question);
        }));
  }

  deleteElements(questions: QuestionnaireQuestion[]) {

    const q = this.store.selectSnapshot<CurrentQuestionnaireModel>(AppState.currentQuestionnaire);

    for (const question of questions) {
      this.questionnaireService.deleteQuestionByUuid(q.uuid, question.uuid)
        .subscribe((data) => {
            return this.deletePageElement(question);
          }
        );
    }
  }

  saveElement(element: QuestionnaireQuestion): Observable<Question> {
    throw new Error('Not Implemented');
    // if (element.uuid) {
    //   return this.questionService.putQuestion(element);
    // } else {
    //   return this.questionService.postQuestion(element);
    // }
  }

  getPageByCriteria(criteria: Criteria[], page ?: number, size ?: number, sort ?: string): Observable<PagedModel<QuestionnaireQuestion>> {

    const q: CurrentQuestionnaireModel = this.store.selectSnapshot<CurrentQuestionnaireModel>(AppState.currentQuestionnaire);
    const obs = this.questionnaireService.getPageQuestionsByQuestionnaireUuid(q.uuid, page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;

  }

  clearCriteria() {
    // check constructor
  }

}
