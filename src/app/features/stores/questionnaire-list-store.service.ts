import {Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CriteriaStore, CrudStore} from '@app/features/stores/store-api';
import {TagListStore} from '@app/features/stores/tag-list-store.service';

import {Observable} from 'rxjs';

import {mergeMap} from 'rxjs/operators';


@Injectable()
export class QuestionnaireListStore extends SelectStoreAdapter<Questionnaire>
  implements CriteriaStore<Questionnaire>, CrudStore<Questionnaire, string> {

  constructor(private questionnaireService: QuestionnaireService, private tagListStore: TagListStore) {
    super();

    this.tagListStore.selected$.subscribe((tags) => {
      this.deleteCriteriabyName('tag_uuid');
      for (const tag of tags) {
        this.addCriteria(new Criteria(tag.uuid.toString(), 'tag_uuid'));
      }
    });

  }

  getElement(uuid: string): Observable<Questionnaire> {
    return this.questionnaireService.getQuestionnaireByUuid(uuid);
  }

  getPage(page?: number, size?: number, sort?: string): Observable<Page<Questionnaire>> {
    const obs = this.questionnaireService.getQuestionnaires(page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  deleteElement(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.questionnaireService
      .deleteQuestionnaireByUuid(questionnaire.uuid)
      .pipe(mergeMap((data) => {
        return this.deletePageElement(questionnaire);
      }));
  }

  deleteElements(questionnaires: Questionnaire[]) {
    for (const q of questionnaires) {
      this.questionnaireService
        .deleteQuestionnaireByUuid(q.uuid)
        .subscribe((data) => {
            this.deletePageElement(q);
          }
        );
    }
  }

  saveElement(element: Questionnaire): Observable<Questionnaire> {

    if (element.uuid) {
      return this.questionnaireService.putQuestionnaire(element);
    } else {
      return this.questionnaireService.postQuestionnaire(element);
    }
  }

  public addQuestion(q: Questionnaire, question: Question) {
    return this.questionnaireService.putQuestion(q.uuid, question);
  }


  getPageByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page<Questionnaire>> {
    console.log(criteria);
    const obs = this.questionnaireService.getQuestionnairesByCriteria(criteria, page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }


  clearCriteria() {
    // check constuctor
    this.tagListStore.unSelectAllElement();
  }

}
