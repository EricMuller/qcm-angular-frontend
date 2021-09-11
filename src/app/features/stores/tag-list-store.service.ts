import {Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {TagService} from '@app/features/qcm-rest-api/services/tag.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CriteriaStore, CrudStore} from '@app/features/stores/store-api';
import {Observable, of} from 'rxjs';


@Injectable()
export class TagListStore extends SelectStoreAdapter<Tag> implements CriteriaStore<Tag>, CrudStore<Tag, number> {

  constructor(private tagService: TagService, private questionService: QuestionService) {

    super();
    console.log('TagStore:constructor');

    this.selected$.subscribe((tags) => {
      this.deleteCriteriabyName('tag_uuid');
      for (const tag of tags) {
        this.addCriteria(new Criteria(tag.uuid.toString(), 'tag_uuid'));
      }
    });

  }

  getElement(id: number): Observable<Tag> {
    return undefined;
  }

  getPage(page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const obs = this.tagService.getTags(page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  deleteElement(tag: Tag): Observable<Tag> {
    return of(tag);
  }

  deleteElements(tags: Tag[]) {
    for (const tag of tags) {
      this.deleteElement(tag);
    }
  }

  getPageByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const obs = this.tagService.getTagsByCriteria(criteria, page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  getPageQuestionTagByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const obs = this.questionService.getTagsByCriteria(criteria, page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  saveElement(element: Tag): Observable<Tag> {
    return null;
  }

  clearCriteria() {  }


}
