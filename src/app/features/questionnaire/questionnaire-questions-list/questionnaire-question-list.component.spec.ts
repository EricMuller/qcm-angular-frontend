import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireQuestionListComponent } from './questionnaire-question-list.component';

describe('QuestionListComponent', () => {
  let component: QuestionnaireQuestionListComponent;
  let fixture: ComponentFixture<QuestionnaireQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
