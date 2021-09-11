import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Upload} from '@app/features/qcm-rest-api/model/upload.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';

@Injectable()
export class ImportService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public importUploadByUuid(uuid: string): Observable<Upload> {
    return this.http.get<Upload>(this.endPoint.IMPORTS + uuid, this.requestOptions);
  }

}
