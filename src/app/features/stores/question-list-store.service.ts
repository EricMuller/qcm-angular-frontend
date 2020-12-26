import {Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CriteriaStore, CrudStore} from '@app/features/stores/store-api';
import {TagListStore} from '@app/features/stores/tag-list-store.service';
import {Observable} from 'rxjs';
import {mergeMap, publishLast, refCount} from 'rxjs/operators';


@Injectable()
export class QuestionListStore extends SelectStoreAdapter<Question> implements CriteriaStore<Question>, CrudStore<Question, string> {

  constructor(private questionService: QuestionService, private tagStore: TagListStore,
              private questionnaireListStore: QuestionnaireListStore) {

    super();

    this.tagStore.selected$.subscribe((tags) => {
      this.deleteCriteriabyName('tag_uuid');
      for (const tag of tags) {
        this.addCriteria(new Criteria(tag.uuid.toString(), 'tag_uuid'));
      }
    });


    this.questionnaireListStore.selected$
      .subscribe((questionnaires) => {
        this.deleteCriteriabyName('questionnaire_uuid');
        for (const tag of questionnaires) {
          this.addCriteria(new Criteria(tag.uuid.toString(), 'questionnaire_uuid'));
        }
      });
  }

  getElement(uuid: string): Observable<Question> {
    return this.questionService.getQuestionByUuid(uuid);
  }

  getPage(page ?: number, size ?: number, sort ?: string): Observable<Page<Question>> {
    const obs = this.questionService.getQuestions(page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  deleteElement(question: Question): Observable<Question> {
    return this.questionService
      .deleteQuestionByUuid(question.uuid)
      .pipe(
        mergeMap((data) => {
          return this.deletePageElement(question);
        }));
  }

  deleteElements(questions: Question[]) {
    for (const question of questions) {
      this.questionService
        .deleteQuestionByUuid(question.uuid)
        .subscribe((data) => {
            return this.deletePageElement(question);
          }
        );
    }
  }

  saveElement(element: Question): Observable<Question> {
    if (element.uuid) {
      return this.questionService.putQuestion(element);
    } else {
      return this.questionService.postQuestion(element);
    }
  }

  getPageByCriteria(criteria: Criteria[], page ?: number, size ?: number, sort ?: string): Observable<Page<Question>> {

    console.log(criteria);
    const obs = this.questionService
      .getQuestionsByCriteria(criteria, page, size, sort)
      .pipe(publishLast(), refCount());
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  clearCriteria() {
    // check constructor
    this.tagStore.unSelectAllElement();
    this.questionnaireListStore.unSelectAllElement();
  }

}
