import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Entity} from '@app/features/qcm-rest-api/model/entity';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {ListSelectStore} from './store-api';


export class SelectStoreAdapter<T extends Entity> implements ListSelectStore<T> {

  private criteria: Criteria[] = [];

  private criteriaSubject: BehaviorSubject<Criteria[]> = new BehaviorSubject([]) as BehaviorSubject<Criteria[]>;

  protected page: Page<T> = new Page<T>();

  private pageSubject: Subject<Page<T>> = new ReplaySubject<Page<T>>(1);

  readonly page$: Observable<Page<T>> = this.pageSubject.asObservable();

  private selectedSubject: BehaviorSubject<any[]> = new BehaviorSubject([]) as BehaviorSubject<T[]>;

  private elementsSubject: BehaviorSubject<any[]> = new BehaviorSubject([]) as BehaviorSubject<T[]>;

  private deletedSubject = new ReplaySubject<T>();

  private selectedSizeSubject = new ReplaySubject<number>(0);

  private criteriaSizeSubject = new BehaviorSubject<number>(0);


  selected$: Observable<T[]> = this.selectedSubject.asObservable() as Observable<T[]>;

  deleted$: Observable<T> = this.deletedSubject.asObservable();

  elements$: Observable<T[]> = this.elementsSubject.asObservable() as Observable<T[]>;

  selectedSize$: Observable<number> = this.selectedSizeSubject.asObservable() as Observable<number>;

  criteriaSize$: Observable<number> = this.criteriaSizeSubject.asObservable() as Observable<number>;

  selected: T[] = [];

  criteria$: Observable<Criteria[]> = this.criteriaSubject.asObservable() as Observable<Criteria[]>;

  constructor() {
  }

  deleteCriteriabyName(name: string) {
    this.criteria = this.criteria.filter((obj: Criteria) => {
      return obj.name !== name;
    });
    this.criteriaSubject.next(this.criteria);
    this.criteriaSizeSubject.next(this.criteria.length);
  }

  addCriteria(criteria: Criteria) {
    this.criteria.push(criteria);
    this.criteriaSubject.next(this.criteria);
    this.criteriaSizeSubject.next(this.criteria.length);

  }

  clearCriteria() {
    this.criteria = [];
    this.criteriaSubject.next(this.criteria);
    this.criteriaSizeSubject.next(this.criteria.length);
  }

  publishPage(p: Page<T>) {
    this.page = p;
    this.pageSubject.next(this.page);
    this.elementsSubject.next(this.page.content);
  }

  swapElement(q: T) {
    const itemIndex = this.selected.findIndex(item => item.uuid === q.uuid);
    if (itemIndex === -1) {
      this.selected.push(q);
    } else {
      this.selected.splice(itemIndex, 1);
    }
    this.selectedSubject.next(this.selected);
    this.selectedSizeSubject.next(this.selected.length);
  }

  deletePageElement(q: T): Observable<T> {
    this.selectElement(q, false);
    this.deletedSubject.next(q);
    const itemIndex = this.page.content.findIndex(item => item.uuid === q.uuid);
    if (itemIndex !== -1) {
      this.page.content.splice(itemIndex, 1);
      this.pageSubject.next(this.page);
    }
    return of(q);
  }

  addPageElement(q: T): Observable<T> {
    this.page.content.push(q);
    this.pageSubject.next(this.page);
    return of(q);
  }

  selectElement(q: T, select: boolean) {

    const itemIndex = this.selected.findIndex(item => item.uuid === q.uuid);
    if (select && itemIndex === -1) {
      this.selected.push(q);
      this.selectedSubject.next(this.selected);
      this.selectedSizeSubject.next(this.selected.length);
    } else {
      if (!select && itemIndex !== -1) {
        this.selected.splice(itemIndex, 1);
        this.selectedSubject.next(this.selected);
        this.selectedSizeSubject.next(this.selected.length);
      } else {
        console.error('not found ' + q.uuid);
      }
    }

  }

  updateElement(q: T) {
    let itemIndex = this.selected.findIndex(item => item.uuid === q.uuid);
    if (itemIndex !== -1) {
      this.selected[itemIndex] = q;
      this.selectedSubject.next(this.selected);
      this.selectedSizeSubject.next(this.selected.length);

      itemIndex = this.page.content.findIndex(item => item.uuid === q.uuid);
      if (itemIndex !== -1) {
        this.page.content[itemIndex] = q;
        this.pageSubject.next(this.page);
      }

    }
  }


  isSelected(q: T): boolean {
    return q ? this.selected.findIndex(item => item.uuid === q.uuid) !== -1 : false;
  }

  selectedSize(): number {
    return this.selected ? this.selected.length : 0;
  }

  unSelectAllElement() {
    this.selected = [];
    this.selectedSubject.next(this.selected);
    this.selectedSizeSubject.next(this.selected.length);
  }

}
