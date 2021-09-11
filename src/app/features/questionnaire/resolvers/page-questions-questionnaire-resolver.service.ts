import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {Observable} from 'rxjs';


@Injectable()
export class PageQuestionsByQuestionnaireResolver {

  constructor(private questionService: QuestionnaireService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PagedModel<Question>> | Promise<PagedModel<Question>> | PagedModel<Question> {

    return this.questionService.getPageQuestionsByQuestionnaireUuid(route.params.uuid);
  }
}
