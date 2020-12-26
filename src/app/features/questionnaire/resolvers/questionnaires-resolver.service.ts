import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';



@Injectable()
export class QuestionnairesResolver {

  constructor(private questionnaireService: QuestionnaireService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Page<Questionnaire>> | Promise<Page<Questionnaire>> | Page<Questionnaire> {
    return this.questionnaireService.getQuestionnaires(0, environment.PAGE_SIZE, 'id');
  }
}
