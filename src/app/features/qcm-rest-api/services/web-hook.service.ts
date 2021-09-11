import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Webhook} from '@app/features/qcm-rest-api/model/webhook.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class WebHookService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getWebHooks(page?: number, size?: number, sort?: string): Observable<PagedModel<Webhook>> {
    const requestUrl = `${this.endPoint.WEBHOOKS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<PagedModel<Webhook>>(requestUrl, this.requestOptions);
  }

}
