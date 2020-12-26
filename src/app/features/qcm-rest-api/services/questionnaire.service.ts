import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';


import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Question, QuestionnaireQuestion} from '@app/features/qcm-rest-api/model/question.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {Observable} from 'rxjs';
import {publishLast, refCount} from 'rxjs/operators';
import {Questionnaire} from '../model/questionnaire.model';
import {Page} from './page';

@Injectable()
export class QuestionnaireService {

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }

  public getQuestionnaires(page?: number, size?: number, sort?: string): Observable<Page<Questionnaire>> {
    const requestUrl = `${this.endPoint.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}`;

    return this.http
      .get<Page<Questionnaire>>(requestUrl)
      .pipe(publishLast(), refCount());
  }

  public getQuestionnairesByCriteria(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page<Questionnaire>> {


    let params = '';
    if (criteria) {
      criteria.forEach(item => {
        params += '&' + item.name + '=' + item.value;
      });
    }
    const requestUrl = `${this.endPoint.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}` + params;

    return this.http
      .get<Page<Questionnaire>>(requestUrl)
      .pipe(publishLast(), refCount());
  }

  public deleteQuestionnaireByUuid(uuid: string) {
    return this.http.delete<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid);
  }

  public getQuestionnaireByUuid(uuid: string) {

    return this.http.get<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid);
  }

  public postQuestionnaire(q: Questionnaire) {
    return this.http.post<Questionnaire>(this.endPoint.QUESTIONNAIRES, q);
  }

  public putQuestionnaire(q: Questionnaire) {
    return this.http.put<Questionnaire>(this.endPoint.QUESTIONNAIRES, q);
  }

  // public getPageQuestionsProjectionByQuestionnaireUuid(uuid: string): Observable<Questionnaire[]> {
  //   debugger
  //   return this.http
  //     .get<Questionnaire[]>(this.endPoint.QUESTIONNAIRES + uuid + '/questions')
  //     .pipe(publishLast(), refCount());
  // }

  public putQuestion(uuid: string, question: Question) {
    return this.http.put<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid + '/questions', question);
  }

  public deleteQuestionByUuid(uuid: string, uuidQuestion: string) {
    return this.http.delete<Questionnaire>(this.endPoint.QUESTIONNAIRES + uuid + '/questions/' + uuidQuestion);
  }

  public getQuestionnaireQuestionByUuid(uuid: string, uuidQuestion: string): Observable<Question> {
    return this.http.get<QuestionnaireQuestion>(this.endPoint.QUESTIONNAIRES + uuid + '/questions/' + uuidQuestion);
  }

  public getPageQuestionsByQuestionnaireUuid(uuid: string, page?: number, size?: number, sort?: string):
    Observable<Page<QuestionnaireQuestion>> {

    return this.http.get<Page<QuestionnaireQuestion>>(`${this.endPoint.QUESTIONNAIRES}${uuid}/questions?size=${size}&page=${page}&sort=${sort}`)
      .pipe(publishLast(), refCount());
  }

}
