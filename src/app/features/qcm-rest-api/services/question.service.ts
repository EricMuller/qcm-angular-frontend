import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {publishLast, refCount} from 'rxjs/operators';
import {Question, QuestionPatch} from '../model/question.model';
import {PagedModel} from './pagedModel';


@Injectable()
export class QuestionService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getQuestionByUuid(questionUuid: string): Observable<Question> {
    return this.http.get<Question>(this.endPoint.QUESTIONS + questionUuid, this.requestOptions);
  }


  public getQuestionsByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Question>> {
    console.log(criteria);
    let params = '';
    if (criteria) {
      for (let i = 0; i < criteria.length; i++) {
        params += '&' + criteria[i].name + '=' + criteria[i].value;
      }
    }
    const requestUrl = `${this.endPoint.QUESTIONS}?size=${size}&page=${page}&sort=${sort}` + params;
    return this.http.get<PagedModel<Question>>(requestUrl, this.requestOptions);
  }

  public deleteQuestionByUuid(uuid: string) {
    return this.http.delete<Question>(this.endPoint.QUESTIONS + uuid, this.requestOptions);
  }

  public getQuestions(page?: number, size?: number, sort?: string): Observable<PagedModel<Question>> {
    const requestUrl = `${this.endPoint.QUESTIONS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<PagedModel<Question>>(requestUrl, this.requestOptions);
  }

  public getQuestionsStatus(page?: number, size?: number, sort?: string): Observable<string[]> {
    const requestUrl = `${this.endPoint.QUESTIONS}status?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<string[]>(requestUrl, this.requestOptions);
  }

  // public getQuestionsByQuestionnaireUuid(questionnaireUuid: string): Observable<Question[]> {
  //   return this.http.get<Question[]>(this.endPoint.QUESTIONS + '?questionnaireId=' + questionnaireUuid);
  // }

  // public getPageQuestionsByQuestionnaireUuid(questionnaireUuid: string): Observable<Page> {
  //   alert('getPageQuestionsByQuestionnaireUuid');
  //   return this.http.get<Page>(this.endPoint.QUESTIONS + '?questionnaireId=' + questionnaireUuid);
  // }

  public postQuestion(q: Question) {
    return this.http.post<Question>(this.endPoint.QUESTIONS, q, this.requestOptions);
  }

  public putQuestion(uuid: string, q: Question) {
    return this.http.put<Question>(this.endPoint.QUESTIONS + uuid, q, this.requestOptions);
  }

  public patchQuestion(uuid: string, questionPatch: QuestionPatch) {
    return this.http.patch<Question>(this.endPoint.QUESTIONS + uuid, questionPatch, this.requestOptions);
  }

  public getTagsByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Tag>> {
    const search = btoa(JSON.stringify(criteria));

    const requestUrl = `${this.endPoint.QUESTIONS + 'tags'}?size=${size}&page=${page}&sort=${sort}&search=${search}`;
    return this.http.get<PagedModel<Tag>>(requestUrl, this.requestOptions)
      .pipe(publishLast(), refCount());
  }


}
