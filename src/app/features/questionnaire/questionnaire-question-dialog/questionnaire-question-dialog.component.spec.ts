import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireQuestionDialogComponent } from './questionnaire-question-dialog.component';

describe('QuestionnaireQuestionDialogComponent', () => {
  let component: QuestionnaireQuestionDialogComponent;
  let fixture: ComponentFixture<QuestionnaireQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
