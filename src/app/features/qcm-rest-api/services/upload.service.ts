import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Upload} from '@app/features/qcm-rest-api/model/upload.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {Page} from './page';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }


  public postUpload(upload: Upload) {
    return this.http.post<Upload>(this.endPoint.UPLOADS, upload);
  }

  public putUpload(upload: Upload) {
    return this.http.put<Upload>(this.endPoint.UPLOADS, upload);
  }

  public getUploads(page?: number, size?: number, sort?: string): Observable<Page<Upload>> {
    const requestUrl = `${this.endPoint.UPLOADS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<Page<Upload>>(requestUrl);
  }

  public deleteUploadByUuid(uuid: string) {
    return this.http.delete<Upload>(this.endPoint.UPLOADS + uuid);
  }

  public getUploadByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page<Upload>> {
    console.log(criteria);
    let params = '';
    if (criteria) {
      for (let i = 0; i < criteria.length; i++) {
        params += '&' + criteria[i].name + '=' + criteria[i].value;
      }
    }
    const requestUrl = `${this.endPoint.UPLOADS}?size=${size}&page=${page}&sort=${sort}` + params;
    return this.http.get<Page<Upload>>(requestUrl);
  }

  public getUploadByUuid(uuid: string): Observable<Upload> {
    return this.http.get<Upload>(this.endPoint.UPLOADS + uuid);
  }
}
