import {QuestionFilterModel} from '@app/app/state/filters/filters_models';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';


export class SetCurrentQuestionFilterAction {

  static readonly type = '[Filter Question] SetCurrentQuestionFilterAction';

  constructor(public payload: QuestionFilterModel) {
  }

}

export class GetQuestionTagAction {

  static readonly type = '[Get Question Tag] GetQuestionTagAction';

}

export class GetQuestionStatusAction {

  static readonly type = '[Get Question Status] GetQuestionStatusAction';

}

export class GetQuestionnaireAction {

  static readonly type = '[Get Questionnaire] GetQuestionnaireAction';

}

export class SelectQuestionTagAction {
  static readonly type = '[Select Question Tag]  SelectQuestionTagAction';

  constructor(public payload: Tag) {
  }
}


export class UnSelectQuestionTagAction {
  static readonly type = '[UnSelect QuestionTag]  UnSelectQuestionTagAction';

  constructor(public payload: Tag) {
  }
}


export class FilterQuestionAction {
  static readonly type = '[Filter Question]  FilterQuestionAction';

  constructor(public payload: boolean) {
  }

}

