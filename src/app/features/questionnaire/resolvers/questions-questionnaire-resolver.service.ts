import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {QuestionnaireQuestion} from '@app/features/qcm-rest-api/model/question.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable()
export class QuestionsQuestionnaireResolver {

  constructor(private questionnaireService: QuestionnaireService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Page<QuestionnaireQuestion>> | Promise<Page<QuestionnaireQuestion>> | Page<QuestionnaireQuestion> {

    return this.questionnaireService.getPageQuestionsByQuestionnaireUuid(route.params.uuid, 0, environment.PAGE_SIZE, 'id');
  }

}
