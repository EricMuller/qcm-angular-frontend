import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Page} from './page';
import {Observable} from 'rxjs';

import {Tag} from '../model/tag.model';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable()
export class TagService {

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public posTag(tag: Tag) {
    return this.http.post<Tag>(this.endPoint.TAGS, tag);
  }

  public getTags(page?: number, size?: number, sort?: string): Observable<Page<Tag>> {
    const requestUrl = `${this.endPoint.TAGS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<Page<Tag>>(requestUrl);
  }

  public getTagsByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page<Tag>> {
    const search = btoa(JSON.stringify(criteria));

    const requestUrl = `${this.endPoint.TAGS}?size=${size}&page=${page}&sort=${sort}&search=${search}`;
    return this.http.get<Page<Tag>>(requestUrl).pipe(publishLast(), refCount());
  }


}
