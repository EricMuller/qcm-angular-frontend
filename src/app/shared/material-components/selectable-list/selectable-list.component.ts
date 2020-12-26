import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Entity} from '@app/features/qcm-rest-api/model/entity';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {CriteriaStore} from '@app/features/stores/store-api';
import {ArrayCallback} from '@app/shared/material-components/selectable-list/arrayCallback';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

enum ViewMode {
  List = 1,
  Select,
}

@Component({
  selector: 'app-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.scss'],
})
export class SelectableListComponent<T extends Entity> implements OnInit, AfterContentInit {

  public elements: T[] = [];
  public selected: T[] = [];
  private criteria: Criteria[] = [];

  public resultsLength = 0;
  public pageIndex = 0;
  public totalElements = 0;
  public last = false;
  public numberOfElements = 0;

  @Input()
  public pageSize: number = environment.PAGE_SIZE;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // delete paginator issue
  public curentPageSize = 0;


  public selectedRow: number;

  private modeSelectionSubject: Subject<boolean> = new ReplaySubject<boolean>(1);
  readonly modeSelection$: Observable<boolean> = this.modeSelectionSubject.asObservable();

  public currentView: ViewMode = ViewMode.List;

  private loadingDataSubject: Subject<boolean> = new BehaviorSubject(false); // progress info
  readonly loadingData$: Observable<boolean> = this.loadingDataSubject.asObservable();


  @Input() store: CriteriaStore<T>;
  @Input() emptyMessage = 'Create a new one';

  @Input() name: string;

  @Input() sortBy: string;

  @Output() closed = new EventEmitter<boolean>();
  @Output() created = new EventEmitter<boolean>();
  @Output() clearFilter = new EventEmitter<boolean>();

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {

    this.store.deleted$.subscribe((element) => {
        const itemIndex = this.elements.findIndex(item => item.uuid === element.uuid);
        if (itemIndex !== -1) {
          this.elements.splice(itemIndex, 1);
          if (this.elements.length === 0) {
            this.refresh(true);
            this.modeSelectionSubject.next(false);
          } else {
            this.totalElements--;
            this.numberOfElements--;
          }
        }
      }
    );

    this.store.selected$.subscribe((selected) => {
        this.selected = selected as T[];
        if (this.selected.length > 0) {
          this.modeSelectionSubject.next(true);
        } else {
          this.modeSelectionSubject.next(false);
          this.currentView = ViewMode.List;
        }
      }
    );

    this.store.criteria$.subscribe((criteria: Criteria[]) => {
        console.log('SelectableListComponent:ngOnInit:criteria$');
        this.criteria = [];
        if (criteria) {
          console.log(criteria);
          this.criteria.push(...criteria);
        }
      }
    );

    this.store.criteriaSize$.subscribe((size: number) => {
        console.log('SelectableListComponent:ngOnInit:criteriaSize$:' + size.toString());
      }
    );

    this.store.page$.subscribe((page: Page<T>) => {
        console.log('SelectableListComponent:ngOnInit:page$:' + page.numberOfElements);
      }
    );

    console.log('SelectableListComponent:ngOnInit');
  }

  private getContentPage(page: Page<T>, cleanBefore ?: boolean) {
    this.resultsLength = page.totalElements;
    this.last = page.last;
    if (!cleanBefore) {
      this.pageIndex++;
    } else {
      this.elements.splice(0);
      this.pageIndex = 0;
      this.numberOfElements = 0;
      this.totalElements = 0;
    }
    for (const item of page.content) {
      this.elements.push(item);
    }
    this.curentPageSize = this.elements.length;
    this.numberOfElements += page.numberOfElements;
    this.totalElements = page.totalElements;
  }

  private refreshElements(pageIndex: number, pageSize: number, sort: string, cleanBefore ?: boolean): Observable<boolean> {

    this.loadingDataSubject.next(true);
    return this.store.getPageByCriteria(this.criteria, pageIndex, pageSize, sort)
      .pipe(concatMap((page) => {
          this.getContentPage(page, cleanBefore);
          if (!this.elements.length) {
            this.modeSelectionSubject.next(false);
          }
          this.loadingDataSubject.next(false);
          return of(true);
        }
      ));
  }


  onPaginateChange(event: any) {
    this.refreshElements(event.pageIndex, this.pageSize, this.sortBy, true)
      .subscribe((b) => {
        this.loadingDataSubject.next(false);
      });
  }

  onValidFilter(event) {
    this.closed.emit(true);
  }

  public deleteSelectedElements() {
    this.store.deleteElements(this.selected);
  }

  refresh(reset: boolean) {

    this.refreshElements(this.pageIndex, this.pageSize, this.sortBy, reset)
      .subscribe((b) => {
        if (reset) {
          this.currentView = ViewMode.List;
          this.paginator.firstPage();
        }
      });
  }

  public applySelected(uuid: string, callback: ArrayCallback<T>) {
    this.store.selected$.forEach(
      (s) => callback(uuid, s));
  }

  public selectAll() {
    this.elements.forEach((q) => {
      this.store.selectElement(q, true);
    });
  }

  public unSelectAll() {
        this.store.unSelectAllElement();
  }

  swapSelectedMode() {
    if (this.currentView === ViewMode.List) {
      this.currentView = ViewMode.Select;
    } else {
      this.currentView = ViewMode.List;
    }
  }

  isSelectedMode(): boolean {
    return this.currentView === ViewMode.Select;
  }


  public clearCriterias() {
    this.store.clearCriteria();
    this.refresh(true);
  }

  onCreateElement(event): void {
    this.created.emit(true);
  }

  ngAfterContentInit(): void {
    this.refresh(true);
  }

}
