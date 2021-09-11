import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';


import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Question, QuestionnaireQuestion} from '@app/features/qcm-rest-api/model/question.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {publishLast, refCount} from 'rxjs/operators';
import {Questionnaire} from '../model/questionnaire.model';
import {PagedModel} from './pagedModel';

@Injectable()
export class QuestionnaireService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getQuestionnaires(page?: number, size?: number, sort?: string): Observable<PagedModel<Questionnaire>> {
    const requestUrl = `${this.endPoint.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}`;

    return this.http
      .get<PagedModel<Questionnaire>>(requestUrl, this.requestOptions)
      .pipe(publishLast(), refCount());
  }

  public getQuestionnairesByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<PagedModel<Questionnaire>> {

    let params = '';
    if (criteria) {
      criteria.forEach(item => {
        params += '&' + item.name + '=' + item.value;
      });
    }
    const requestUrl = `${this.endPoint.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}` + params;

    return this.http
      .get<PagedModel<Questionnaire>>(requestUrl, this.requestOptions)
      .pipe(publishLast(), refCount());
  }

  public deleteQuestionnaireByUuid(uuid: string) {
    return this.http.delete<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid, this.requestOptions);
  }

  public getQuestionnaireByUuid(uuid: string) {

    return this.http.get<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid, this.requestOptions);
  }

  public postQuestionnaire(q: Questionnaire) {
    return this.http.post<Questionnaire>(this.endPoint.QUESTIONNAIRES, q, this.requestOptions);
  }

  public putQuestionnaire(uuid: string, q: Questionnaire) {
    return this.http.put<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid, q, this.requestOptions);
  }

  // public getPageQuestionsProjectionByQuestionnaireUuid(uuid: string): Observable<Questionnaire[]> {
  //   debugger
  //   return this.http
  //     .get<Questionnaire[]>(this.endPoint.QUESTIONNAIRES + uuid + '/questions')
  //     .pipe(publishLast(), refCount());
  // }

  public putQuestion(uuid: string, question: Question) {
    return this.http.put<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid + '/questions', question, this.requestOptions);
  }

  public deleteQuestionByUuid(uuid: string, uuidQuestion: string) {
    return this.http.delete<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid + '/questions/' + uuidQuestion, this.requestOptions);
  }

  public getQuestionnaireQuestionByUuid(uuid: string, uuidQuestion: string): Observable<Question> {
    return this.http.get<QuestionnaireQuestion>(this.endPoint.QUESTIONNAIRES + uuid + '/questions/' + uuidQuestion, this.requestOptions);
  }

  public getPageQuestionsByQuestionnaireUuid(uuid: string, page?: number, size?: number, sort?: string):
    Observable<PagedModel<QuestionnaireQuestion>> {

    return this.http.get<PagedModel<QuestionnaireQuestion>>(`${this.endPoint.QUESTIONNAIRES}${uuid}/questions?size=${size}&page=${page}&sort=${sort}`, this.requestOptions)
      .pipe(publishLast(), refCount());
  }

}
