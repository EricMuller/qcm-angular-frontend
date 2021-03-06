
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Reponse} from '@app/features/qcm-rest-api/model/response.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';



@Injectable()
export class QuestionFormBuilder {


  constructor(private fb: FormBuilder) {
  }

  public createForm(question: Question): FormGroup {
    return this.fb.group({
      uuid: new FormControl({value: question.uuid, disabled: true}),
      version: new FormControl({value: question.version, disabled: true}),
      type: new FormControl({value: question.type, disabled: true}, Validators.required),
      status: new FormControl({value: question.status, disabled: true}, Validators.required),
      category: new FormControl({value: question.category, disabled: true}),
      question: new FormControl({value: question.question, disabled: true}, Validators.required),
      responses: this.createResponsesControl(question, true),
      options: new FormControl({value: this.getOptions(question), disabled: true}),
      tags: this.createTagsControl(question, true),
      dateCreation: new FormControl({value: new Date(question.dateCreation), disabled: true}),
      dateModification: new FormControl({value: new Date(question.dateModification), disabled: true})
    });
  }

  private createResponsesControl(question: Question, disabled: boolean): FormArray {
    const responseFormArray: FormArray = this.fb.array([]);
    if (question.responses) {
      question.responses.forEach((response => {
        responseFormArray.push(this.createResponseControl(response, disabled));
      }));
    } else {
      responseFormArray.push(this.createResponseControl(new Reponse(), disabled));
    }
    return responseFormArray;
  }

  public createResponseControl(response: Reponse, disabled: boolean) {
    return this.fb.group({
      // response: 'test',
      id: new FormControl({value: response.uuid ? response.uuid : 0, disabled}),
      version: new FormControl({value: response.version, disabled: true}),
      good: new FormControl({value: response.good ? response.good : false, disabled}),
      number: new FormControl({value: response.number ? response.number : 0, disabled}),
      response: new FormControl({value: response.response, disabled}, Validators.required),
    });
  }

  private getOptions(question: Question): number {

    if (question.responses) {
      for (let i = 0; i < question.responses.length; i++) {
        if (question.responses[i].good) {
          return i;
        }
      }
    }
    return 0;
  }

  private createTagsControl(question: Question, disabled: boolean): FormArray {
    const responseFormArray: FormArray = this.fb.array([]);
    if (question.tags) {
      question.tags.forEach((tag => {
        responseFormArray.push(this.createTagControl(tag, disabled));
      }));
    }
    return responseFormArray;
  }

  public createTagControl(tag: Tag, disabled: boolean): FormGroup {
    return this.fb.group({
      // response: 'test',
      id: new FormControl({value: tag.uuid ? tag.uuid : null, disabled}),
      libelle: new FormControl({value: tag.libelle ? tag.libelle : false, disabled}),
    });
  }




}
