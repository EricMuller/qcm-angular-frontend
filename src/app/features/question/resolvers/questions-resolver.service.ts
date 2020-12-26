import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';


@Injectable()
export class QuestionsResolver {

  constructor(private questionService: QuestionService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Page<Question>> | Promise<Page<Question>> | Page<Question> {
    return this.questionService.getQuestions(0, environment.PAGE_SIZE, 'dateModification');
  }
}
