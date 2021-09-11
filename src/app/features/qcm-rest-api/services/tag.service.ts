import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {publishLast, refCount} from 'rxjs/operators';

import {Tag} from '../model/tag.model';
import {PagedModel} from './pagedModel';

@Injectable()
export class TagService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public posTag(tag: Tag) {
    return this.http.post<Tag>(this.endPoint.TAGS, tag, this.requestOptions);
  }

  public getTags(page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const requestUrl = `${this.endPoint.TAGS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<PagedModel<Tag>>(requestUrl, this.requestOptions);
  }

  public getTagsByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const search = btoa(JSON.stringify(criteria));

    const requestUrl = `${this.endPoint.TAGS}?size=${size}&page=${page}&sort=${sort}&search=${search}`;
    return this.http.get<PagedModel<Tag>>(requestUrl, this.requestOptions)
      .pipe(publishLast(), refCount());
  }


}
