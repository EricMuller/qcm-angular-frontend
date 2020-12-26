import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Entity} from '@app/features/qcm-rest-api/model/entity';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {Observable} from 'rxjs';


export interface CrudStore<T extends Entity, K> {

  deleteElement(element: T): Observable<T>;

  saveElement(element: T): Observable<T>;

  getElement(id: K): Observable<T>;
}

export interface ListStore<T extends Entity> {

  deleteElements(elements: T[]): void;

  getPage(page?: number, size?: number, sort?: string): Observable<Page<T>>;

}

export interface ListSelectStore<T extends Entity> {

  readonly deleted$: Observable<any>;
  readonly page$: Observable<Page<T>>;
  readonly selected$: Observable<T[]>;
  readonly selectedSize$: Observable<number>;

  swapElement(q: T): void;

  selectElement(q: T, select: boolean): void;

  isSelected(q: T): boolean;

  selectedSize(): number;

  unSelectAllElement(): void;

  publishPage(p: Page<T>);

  addPageElement(q: T): Observable<T>;

  updateElement(q: T);

}

/**
 *
 */
export interface CriteriaStore<T> extends ListSelectStore<T>, ListStore<T> {

  readonly criteria$: Observable<Criteria[]>;
  readonly criteriaSize$: Observable<number>;

  getPageByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page<T>>;

  clearCriteria();

}

