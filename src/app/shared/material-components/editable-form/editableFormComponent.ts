import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {CurrentQuestionnaireModel} from '@app/app/state/navigation/navigation-model';
import {Logger} from '@app/core/loggers/logger.service';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {CrudStore} from '@app/features/stores/store-api';
import {TranslateService} from '@ngx-translate/core';

export abstract class EditableFormComponent<T, K> implements OnInit, OnDestroy {

  edition: boolean;

  addOnBlur = true;

  form: FormGroup;

  separatorKeysCodes = [ENTER, COMMA];

  @Input()
  model: T;
  copy: T;

  @Output() cancel = new EventEmitter<T>();
  @Output() save = new EventEmitter<string>();

  isActive = false;

  protected constructor(protected crudStore: CrudStore<T, K>, protected notifierService: NotifierService,
                        protected router: Router, protected translateService: TranslateService) {

  }

  ngOnInit() {
    this.isActive = true;
    Logger.info('EditableFormComponent', 'ngOnInit');
  }

  ngOnDestroy() {
    this.isActive = false;
    Logger.info('EditableFormComponent', 'ngOnDestroy');
  }

  public validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  public cancelEdition(): void {
    if (this.edition) {
      this.endEdition();
      this.cancel.emit(this.model);
      if (this.copy) {
        this.model = JSON.parse(JSON.stringify(this.copy));
        this.createForm(this.model);
      }
    }
  }

  public endEdition() {
    this.form.disable();
    this.edition = false;
    this.onEndEdition();
  }

  public startEdition() {

    if (this.model == null) {
      Logger.info('EditableFormComponent', 'startEdition', ' model should be initialized in createForm()');
    }
    this.form.enable();
    this.notifierService.notifyInfo('Mode edition', 1000);
    this.copy = JSON.parse(JSON.stringify(this.model));
    this.edition = true;
    this.onStartEdition();


  }

  protected enableForm() {
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        this.form.controls[control].enable();
      }
    }
  }


  protected beforeSaveForm(model: T): T {
    return model;
  }

  public saveForm() {

    if (this.form.valid) {
      let q = this.form.value;
      q = this.beforeSaveForm(q);
      this.crudStore.saveElement(q)
        .subscribe(value => {
          // maybe with hal call get again ?
          this.onSaveForm(value);
        }
        )
      ;
    } else {
      this.notifierService.notifyInfo(this.translateService.instant('qcm.form.messages.validation_required'), 1000);
      this.validateAllFormFields(this.form);
    }
  }

  protected onSaveForm(model) {
    this.endEdition();
    this.createForm(model);
    this.notifierService.notifySuccess(this.translateService.instant('qcm.form.messages.onSaveForm'), 2000);
    this.save.emit(model.uuid);
  }

  public deleteForm() {
    this.crudStore.deleteElement(this.form.value)
      .subscribe(this.onDeleteForm.bind(this));
  }

  protected abstract createForm(model: T): void;

  protected abstract onDeleteForm(model: T)  ;

  protected onStartEdition() {
  }

  protected onEndEdition() {
  }

  // onChanges(): void {
//   this.questionForm.valueChanges.subscribe(val => {
//     console.log(val);
//   });
// }

}


