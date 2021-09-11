
export class NavigationModel {
  currentQuestionnaire: CurrentQuestionnaireModel;
  currentQuestion: CurrentQuestionModel;
  menu: MenuItemModel[];
  pageMenu: MenuItemModel[];
  breadcrumb: MenuItemModel[];
  currentPageTitle: string;
  opened: boolean;
}

export interface CurrentQuestionModel {
  uuid: string;
  title: string;
}


export interface CurrentQuestionnaireModel {
  uuid: string;
  title: string;
}

export interface MenuItemModel {
  link: string;
  label: string;
}


export interface TitlePageModel {
  title: string;
}

