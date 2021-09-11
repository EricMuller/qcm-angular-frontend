import {Injectable} from '@angular/core';
import {OnLineAction} from '@app/app/state/app-actions';
// import {SetCurrentQuestionFilterAction} from '@app/features/question/state/filters-actions';
import {
  ClearCurrentQuestionnaireAction,
  OpenAction,
  SetCurrentPageTitleAction,
  SetCurrentQuestionAction,
  SetCurrentQuestionnaireAction
} from '@app/app/state/navigation/navigation-actions';


import {NavigationModel} from '@app/app/state/navigation/navigation-model';
import {Action, Selector, State, StateContext} from '@ngxs/store';

const navigation = [
  {link: '/questionnaires/', label: 'menu.questionnaires'},
  {link: '/questions/', label: 'menu.questions'},
  {link: '/upload/', label: 'menu.upload'},
  {link: '/user/edit', label: 'menu.account'},
  {link: '/about', label: 'menu.about'},
];

const pageNavigation = [];


export class AppStateModel {
  navigation: NavigationModel;
  onLine: boolean;
  // searchQuestionFilter: SearchQuestionFilterModel;
}

@State<AppStateModel>({
  name: 'Application',
  defaults: {
    onLine: false,
    navigation: {
      currentQuestionnaire: {uuid: '', title: ''},
      currentQuestion: {uuid: '', title: ''},
      pageMenu: pageNavigation,
      currentPageTitle: '',
      opened: false,
      menu: [
        ...navigation,
      ],
      breadcrumb: []
    },
    // searchQuestionFilter: {
    //   status: [],
    //   tags: [],
    //   questionnaires: [],
    //   statusSelected: [],
    //   tagsSelected: [],
    //   questionnairesSelected: []
    // }
  }
})

@Injectable()
export class AppState {

  @Selector()
  static currentQuestionnaire(state: AppStateModel) {
    return state.navigation.currentQuestionnaire;
  }

  @Selector()
  static online(state: AppStateModel) {
    return state.onLine;
  }


  @Selector()
  static menu(state: AppStateModel) {
    return state.navigation.menu;
  }

  @Selector()
  static opened(state: AppStateModel) {
    return state.navigation.opened;
  }

  @Selector()
  static breadcrumb(state: AppStateModel) {
    return state.navigation.breadcrumb;
  }

  @Selector()
  static pageNavigation(state: AppStateModel) {
    return state.navigation.pageMenu;
  }

  @Selector()
  static currentPageTitle(state: AppStateModel) {
    return state.navigation.currentPageTitle;
  }

  // @Selector()
  // static currentQuestionFilter(state: AppStateModel) {
  //   return state.searchQuestionFilter;
  // }

  @Action(ClearCurrentQuestionnaireAction)
  clearCurrentQuestionnaireAction({getState, patchState}: StateContext<AppStateModel>) {
    const state = getState();

    patchState({
      ...state,
      navigation: {
        ...state.navigation,
        currentQuestionnaire: null,
        breadcrumb: [],
        pageMenu: [],
      }
    });
  }

  @Action(OnLineAction)
  setOfflineAction({getState, patchState}: StateContext<AppStateModel>, {payload}: OnLineAction) {
    const state = getState();
    patchState({
      ...state,
      onLine: payload
    });
  }

  @Action(OpenAction)
  setOpenedAction({getState, patchState}: StateContext<AppStateModel>, {payload}: OpenAction) {
    const state = getState();
    patchState({
      ...state,
      navigation: {
        ...state.navigation,
        opened: payload
      }
    });
  }

  @Action(SetCurrentPageTitleAction)
  setCurrentPageTitleAction({getState, patchState}: StateContext<AppStateModel>, {payload}: SetCurrentPageTitleAction) {
    const state = getState();

    patchState({
      ...state,
      navigation: {
        ...state.navigation,
        currentPageTitle: payload.title
      }
    });
  }


  @Action(SetCurrentQuestionnaireAction)
  currentQuestionnaireAction({getState, patchState}: StateContext<AppStateModel>, {payload}: SetCurrentQuestionnaireAction) {
    const state = getState();

    patchState({
      ...state,
      navigation: {
        ...state.navigation,
        currentQuestionnaire: payload,
        breadcrumb: [
          {link: '/questionnaires/', label: ' Mes Questionnaires'},
          {link: '/questionnaires/' + payload.uuid, label: payload.title}
        ],
        pageMenu: [
          {link: '/questionnaires/' + payload.uuid + '/questions', label: 'Les questions'},
        ],
        currentPageTitle: payload.title,
      }
    });

  }

  @Action(SetCurrentQuestionAction)
  currentQuestion({getState, patchState}: StateContext<AppStateModel>, {payload}: SetCurrentQuestionAction) {
    const state = getState();

    patchState({
      ...state,
      navigation: {
        ...state.navigation,
        currentQuestion: payload,
        breadcrumb: [
          {link: '/questions/', label: ' Mes Questions'},
          {link: '/questions/' + payload.uuid, label: payload.title}
        ],

      }
    });
  }

  // @Action(SetCurrentQuestionFilterAction)
  // currentQuestionFilter({getState, patchState}: StateContext<AppStateModel>, {payload}: SetCurrentQuestionFilterAction) {
  //   const state = getState();
  //
  //   patchState({
  //     ...state,
  //     searchQuestionFilter : payload
  //   });
  // }


}


