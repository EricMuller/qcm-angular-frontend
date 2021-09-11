import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {CategoryType} from '@app/features/qcm-rest-api/services/type.enum';
import {Observable} from 'rxjs/internal/Observable';
import {Category} from '../model/category.model';


@Injectable()
export class CategoryService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getCategories(type: CategoryType): Observable<Category[]> {
    return this.http.get<Category[]>(this.endPoint.CATEGORY + '?type=' + CategoryType[type], this.requestOptions);
  }

  public postCategory(q: Category): Observable<Category> {
    return this.http.post<Category>(this.endPoint.CATEGORY, q, this.requestOptions);
  }

}
