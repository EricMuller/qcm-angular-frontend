import {SetCurrentQuestionnaireAction} from '@app/app/state/navigation/navigation-actions';


describe('SelectQuestionnaire', () => {
  it('should create an instance', () => {
    expect(new SetCurrentQuestionnaireAction({title: null, uuid: null})).toBeTruthy();
  });
});
