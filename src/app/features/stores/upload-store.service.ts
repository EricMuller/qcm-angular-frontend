import {Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Upload} from '@app/features/qcm-rest-api/model/upload.model';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {UploadService} from '@app/features/qcm-rest-api/services/upload.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CriteriaStore, CrudStore} from '@app/features/stores/store-api';
import {Observable} from 'rxjs';
import {mergeMap, publishLast, refCount} from 'rxjs/operators';


@Injectable()
export class UploadStore extends SelectStoreAdapter<Upload> implements CriteriaStore<Upload>, CrudStore<Upload, string> {

  constructor(private uploadService: UploadService) {
    super();
  }

  getElement(uuid: string): Observable<Upload> {
    return this.uploadService.getUploadByUuid(uuid);
  }

  getPage(page?: number, size?: number, sort?: string): Observable<PagedModel<Upload>> {
    const obs = this.uploadService.getUploads(page, size, sort);
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  deleteElement(upload: Upload): Observable<Upload> {
    return this.uploadService
      .deleteUploadByUuid(upload.uuid)
      .pipe(
        mergeMap((data) => {
          return this.deletePageElement(upload);
        }));
  }

  deleteElements(uploads: Upload[]) {
    for (const upload of uploads) {
      this.uploadService.deleteUploadByUuid(upload.uuid)
        .subscribe((data) => {
            this.deletePageElement(upload);
          }
        );
    }
  }

  saveElement(element: Upload): Observable<Upload> {
    if (element.uuid) {
      return this.uploadService.putUpload(element);
    } else {
      return this.uploadService.postUpload(element);
    }
  }

  getPageByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Upload>> {

    console.log(criteria);
    const obs = this.uploadService
      .getUploadByCriteria(criteria, page, size, sort)
      .pipe(publishLast(), refCount());
    obs.subscribe(
      p => {
        this.publishPage(p);
      });
    return obs;
  }

  // criterias(): Criteria[] {
  //
  //   return [];
  // }

  clearCriterias() {

  }
}
