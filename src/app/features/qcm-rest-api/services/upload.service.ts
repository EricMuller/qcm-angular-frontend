import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Upload} from '@app/features/qcm-rest-api/model/upload.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {PagedModel} from './pagedModel';

@Injectable()
export class UploadService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }


  public postUpload(upload: Upload) {
    return this.http.post<Upload>(this.endPoint.UPLOADS, upload, this.requestOptions);
  }

  public putUpload(upload: Upload) {
    return this.http.put<Upload>(this.endPoint.UPLOADS, upload, this.requestOptions);
  }

  public getUploads(page?: number, size?: number, sort?: string): Observable<PagedModel<Upload>> {
    const requestUrl = `${this.endPoint.UPLOADS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<PagedModel<Upload>>(requestUrl, this.requestOptions);
  }

  public deleteUploadByUuid(uuid: string) {
    return this.http.delete<Upload>(this.endPoint.UPLOADS + uuid, this.requestOptions);
  }

  public getUploadByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Upload>> {
    console.log(criteria);
    let params = '';
    if (criteria) {
      for (let i = 0; i < criteria.length; i++) {
        params += '&' + criteria[i].name + '=' + criteria[i].value;
      }
    }
    const requestUrl = `${this.endPoint.UPLOADS}?size=${size}&page=${page}&sort=${sort}` + params;
    return this.http.get<PagedModel<Upload>>(requestUrl, this.requestOptions);
  }

  public getUploadByUuid(uuid: string): Observable<Upload> {
    return this.http.get<Upload>(this.endPoint.UPLOADS + uuid, this.requestOptions);
  }
}
