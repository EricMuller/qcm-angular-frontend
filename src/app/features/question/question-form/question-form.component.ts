import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Response} from '../../../api/model/response.model';
import {Question} from '../../../api';
import {QuestionStore} from '../stores/question-store.service';
import {NotifierService} from '../../../core/simple-notifier.service';
import {Router} from '@angular/router';
import {EditableFormComponent} from '../../../shared/emu/components/editable-form/editableFormComponent';
import {QuestionFormBuilder} from './question-form-builder';
import {MatChipInputEvent} from '@angular/material';
import {Tag} from '../../../api/model/tag.model';


enum QuestionType {
  FREE_TEXT = 'Free Text',
  MULTIPLE_CHOICE = 'Multiple Choice',
  MULTIPLE_ANSWER = 'Multiple Answer',
  TRUE_FALSE = 'True/False',
}

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'], providers: [QuestionFormBuilder]
})
export class QuestionFormComponent extends EditableFormComponent<Question> implements OnInit {

  @Input()
  public question: Question;
  public types = [];
  public good: boolean;

  constructor(protected   store: QuestionStore,
              protected   notifierService: NotifierService,
              protected   router: Router,
              private formBuilder: QuestionFormBuilder) {
    super(store, notifierService, router);
    this.types = this.getQuestionTypesEnum();
  }

  public addResponse() {
    const responses = this.form.get('responses') as FormArray;
    responses.push(this.formBuilder.createResponseControl(new Response(), false));
  }

  protected createForm(): FormGroup {
    return this.formBuilder.createForm(this.question);
  }


  public getQuestionTypesEnum(): any[] {
    const keys = Object.keys(QuestionType);
    const types = [];
    keys.map(Key => {
      console.log(`color key = ${Key}, value = ${QuestionType[Key]}`);
      const type = {'id': Key, 'name': QuestionType[Key]};
      types.push(type);
    });
    return types;
  }

  protected onDeleteForm(t: Question) {
    this.notifierService.notifySuccess(t.id + ' deleted', 2000);
    this.router.navigate(['/questions/list']);
  }

  protected onSaveForm(data) {
    this.question = data;
    this.fabMenu.opened = false;
    this.createForm();
    this.notifierService.notifySuccess(data.title, 2000);
  }

  public onSelectResponse(event) {
    if (this.form.get('type').value === 'MULTIPLE_CHOICE') {
      const responses = this.form.get('responses') as FormArray;
      for (let i = 0; 1 < responses.length; i++) {
        const response: FormGroup = responses.at(i) as FormGroup;
        response.get('good').setValue(i === event.value);
      }
    }
  }

  get responses(): FormArray {
    return this.form.get('responses') as FormArray;
  }

  public removeResponse(index) {
    const responses = this.form.get('responses') as FormArray;
    responses.removeAt(index);
  }


  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  public addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.addTag(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  public removeChip(index: number): void {
    if (index >= 0) {
      const tags = this.form.get('tags') as FormArray;
      tags.removeAt(index);
    }
  }

  public addTag(libelle: string) {
    const tags = this.form.get('tags') as FormArray;
    tags.push(this.formBuilder.createTagControl(new Tag(libelle), false));
  }

  // private getErrorMessage() {
  //   return this.questionForm.get('question').hasError('required') ? 'You must enter a value' :
  //     this.questionForm.hasError('question') ? 'Not a valid question' : '';
  // }

}
