import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ExportService {

  readonly requestOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'blob' as 'json'
  };

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getExportById(uuid: string, type: string) {
    return this.http.get<any>(this.endPoint.EXPORT + uuid + '/' + type, this.requestOptions);
  }

}
