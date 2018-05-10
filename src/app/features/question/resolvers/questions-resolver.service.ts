import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Page} from '../../../api/model/page.models';

import {environment} from '../../../../environments/environment';
import {QuestionService} from '../../../api/services/question.service';

@Injectable()
export class QuestionsResolver {

  constructor(private questionService: QuestionService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Page> | Promise<Page> | Page {
    return this.questionService.getPageQuestions(0, environment.PAGE_SIZE, 'dateModification');
  }
}
