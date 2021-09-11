import {Injectable} from '@angular/core';

import {DataQuestionModel, QuestionFilterModel} from '@app/app/state/filters/filters_models';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {QuestionService} from '@app/features/qcm-rest-api/services/question.service';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {
  FilterQuestionAction,
  GetQuestionnaireAction,
  GetQuestionStatusAction,
  GetQuestionTagAction,
  SelectQuestionTagAction,
  SetCurrentQuestionFilterAction,
  UnSelectQuestionTagAction
} from '@app/features/question/state/question-actions';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import produce from 'immer';
import {tap} from 'rxjs/operators';

export class QuestionStateModel {
  data: DataQuestionModel;
  filter: QuestionFilterModel;
}

@State<QuestionStateModel>({
  name: 'Question',
  defaults: {
    data: {
      status: [],
      tags: [],
      questionnaires: [],
    },
    filter: {
      status: [],
      tags: [],
      questionnaires: [],
      opened: false
    },
  }
})

@Injectable()
export class QuestionState {

  constructor(private questionService: QuestionService,
              private questionnaireService: QuestionnaireService) {
  }

  @Selector()
  static currentFilter(state: QuestionStateModel) {
    return state.filter;
  }

  @Selector()
  static currentData(state: QuestionStateModel) {
    return state.data;
  }

  @Action(SetCurrentQuestionFilterAction)
  currentQuestionFilter({getState, patchState}: StateContext<QuestionStateModel>, {payload}: SetCurrentQuestionFilterAction) {
    const state = getState();

    patchState({
      ...state,
      filter: payload
    });
  }

  @Action(GetQuestionStatusAction)
  getStatus({getState, setState}: StateContext<QuestionStateModel>) {

    return this.questionService.getQuestionsStatus(0, 100, '')
      .pipe(tap((result) => {

          if (result) {
            const orderedData = result.sort((a, b) => {
              if (a < b) {
                return -1;
              }
              if (a > b) {
                return 1;
              }
              return 0;
            });
            const state = getState();
            setState({
              ...state,
              data: {
                ...state.data,
                status: orderedData
              }
            });
          }
        }
      ));
  }

  @Action(GetQuestionTagAction)
  getTag({getState, setState}: StateContext<QuestionStateModel>) {

    const criteria = new Criteria('used', 'true');
    return this.questionService.getTagsByCriteria([criteria], 0, 100, '')
      .pipe(tap((result) => {
        const state = getState();

        const orderedData = result.content.sort((a, b) => {
          if (a.libelle < b.libelle) {
            return -1;
          }
          if (a.libelle > b.libelle) {
            return 1;
          }
          return 0;
        });

        setState({
          ...state,
          data: {
            ...state.data,
            tags: orderedData
          }
        });
      }));
  }

  @Action(GetQuestionnaireAction)
  getQuestionnaire({getState, setState}: StateContext<QuestionStateModel>) {

    return this.questionnaireService.getQuestionnaires(0, 100, '')
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          data: {
            ...state.data,
            questionnaires: result.content
          }
        });
      }));
  }


  @Action(SelectQuestionTagAction)
  selectQuestionTag({getState, setState}: StateContext<QuestionStateModel>, {payload}: SelectQuestionTagAction) {

    setState(this.addTag(payload));

  }

  @Action(UnSelectQuestionTagAction)
  unSelectQuestionTag({getState, setState}: StateContext<QuestionStateModel>, {payload}: UnSelectQuestionTagAction) {

    const state = getState();

    const filteredArray = state.filter.tags.filter(item => item.uuid !== payload.uuid);

    setState({
      ...state,
      filter: {
        ...state.filter,
        tags: filteredArray
      }
    });

  }

  @Action(FilterQuestionAction)
  filterQuestion({getState, setState}: StateContext<QuestionStateModel>, {payload}: FilterQuestionAction) {

    const state = getState();

    setState({
      ...state,
      filter: {
        ...state.filter,
        opened: payload
      }
    });
  }


  addTag(tagToAdd: Tag) {
    return produce((ctx) => {
      ctx.filter.tags.push(tagToAdd);
    });
  }

}


