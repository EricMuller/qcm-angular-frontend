import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireQuestionNavListComponent } from './questionnaire-question-nav-list.component';

describe('QuestionNavListComponent', () => {
  let component: QuestionnaireQuestionNavListComponent;
  let fixture: ComponentFixture<QuestionnaireQuestionNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireQuestionNavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireQuestionNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
