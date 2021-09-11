import {
  CurrentQuestionModel,
  CurrentQuestionnaireModel,
  TitlePageModel
} from '@app/app/state/navigation/navigation-model';

export class ClearCurrentQuestionnaireAction {

  static readonly type = '[Questionnaire] ClearCurrent';

  constructor() {
  }

}

export class SetCurrentQuestionAction {

  static readonly type = '[Question] SetCurrent';

  constructor(public payload: CurrentQuestionModel) {
  }

}

export class SetCurrentQuestionnaireAction {

  static readonly type = '[Questionnaire] SetCurrent';

  constructor(public payload: CurrentQuestionnaireModel) {
  }

}

export class SetCurrentPageTitleAction {

  static readonly type = '[TitlePage] SetCurrent';

  constructor(public payload: TitlePageModel) {
  }

}

export class OpenAction {

  static readonly type = '[Menu] opened';

  constructor(public payload: boolean) {
  }
}
