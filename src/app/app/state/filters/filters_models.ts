import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';

export class DataQuestionModel {
  status: string[];
  tags: Tag[];
  questionnaires: Questionnaire[];
}


export class QuestionFilterModel {
  status: string[];
  tags: Tag[];
  questionnaires: Questionnaire[];
  opened: boolean;
}


