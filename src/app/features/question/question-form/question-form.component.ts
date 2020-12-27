import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {MatChipInputEvent, MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {QuestionnaireModel} from '@app/app/state/questionnaire-model';
import {SetCurrentQuestionAction} from '@app/app/state/set-current-question-action';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {CategoryDialogComponent} from '@app/features/category/category-dialog/category-dialog.component';
import {Category} from '@app/features/qcm-rest-api/model/category.model';
import {QuestionType} from '@app/features/qcm-rest-api/model/enums/QuestionType';
import {ValidationStatus} from '@app/features/qcm-rest-api/model/enums/ValidationStatus';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {Reponse} from '@app/features/qcm-rest-api/model/response.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {CategoryService} from '@app/features/qcm-rest-api/services/category.service';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {CategoryType} from '@app/features/qcm-rest-api/services/type.enum';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';

import {EditableFormComponent} from '@app/shared/material-components/editable-form/editableFormComponent';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngxs/store';


import {QuestionFormBuilder} from './question-form-builder';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'], providers: [QuestionFormBuilder]
})
export class QuestionFormComponent extends EditableFormComponent<Question, string> implements OnInit, AfterViewInit {


  @Input()
  public question: Question;
  public categories: Category[];

  public types = [];
  public status = [];
  public good: boolean;

  @Output() cancel = new EventEmitter<string>();
  @Output() save = new EventEmitter<string>();


  constructor(protected   crudStore: QuestionListStore,
              protected   notifierService: NotifierService,
              protected   router: Router,
              private formBuilder: QuestionFormBuilder,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private dialog: MatDialog, private store: Store,
              private questionnaireService: QuestionnaireService,
              protected translateService: TranslateService) {
    super(crudStore, notifierService, router, translateService);
    this.types = this.getQuestionTypesEnum();
    this.status = this.getStatusEnum();
    this.route.data.subscribe(data => {
        this.question = data.question;
        this.categories = data.categories;
        if (route.snapshot.params.uuid) {
          this.toggleEdition(route.snapshot.params.uuid <= 0);
        }
      }
    );
    //  this.currentQuestionnaire$ = this.store.select(state => state.currentQuestionnaire);
  }

  ngOnInit(): void {
    console.log(this.question);
    this.store.dispatch(new SetCurrentQuestionAction({uuid: this.question.uuid, title: this.question.type}));
    this.createForm();
    // this.toggleEdition(this.question.uuid != null);
  }

  ngAfterViewInit()
    :
    void {
  }

  public create() {
    this.router.navigate(['/questions/0']);
  }

  private loadCategories() {
    this.categoryService.getCategories(CategoryType.QUESTION)
      .subscribe((categories => {
        this.categories = categories;
      }));
  }

  public addResponse() {
    const responses = this.form.get('responses') as FormArray;
    responses.push(this.formBuilder.createResponseControl(new Reponse(), false));
  }

  protected createForm(): void {

    this.form = this.formBuilder.createForm(this.question);
  }

  protected onDeleteForm(t: Question) {
    this.notifierService.notifySuccess(t.uuid + ' deleted', 2000);
    this.router.navigate(['/questions/list']);
  }

  protected onSaveForm(data) {
    this.toggleEdition(false);
    this.question = data;
    this.createForm();

    this.notifierService.notifySuccess(this.translateService.instant('qcm.question.form.messages.questionCreated'), 2000);

    const q: QuestionnaireModel = this.store.selectSnapshot<QuestionnaireModel>(AppState.currentQuestionnaire);

    // if (q.uuid) {
    //   this.questionnaireService.putQuestion(q.uuid, data)
    //     .subscribe(
    //       () => {
    //         this.notifierService
    //           .notifySuccess(this.translateService.instant('qcm.question.form.messages.questionAdded') + q.title, 2000);
    //         this.router.navigate(['/questions/' + this.question.uuid]);
    //       }
    //     );
    // }
    // this.router.navigate(['/questions/' + this.question.uuid]);
    this.save.emit(q.uuid);
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

  public addChip(event: MatChipInputEvent):
    void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()
    ) {
      this.addTag(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  public removeChip(index: number): void {

    if (index >= 0
    ) {
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
//     this.questionForm.hasError('question') ? 'Not a valid item' : '';
// }

  private getQuestionTypesEnum(): any[] {
    const keys = Object.keys(QuestionType);
    const types = [];
    keys.forEach(Key => {
      console.log(`type key = ${Key}, value = ${QuestionType[Key]}`);
      const type = {'id': Key, 'name': QuestionType[Key]};
      types.push(type);
    });
    return types;
  }

  private getStatusEnum(): any[] {
    const keys = Object.keys(ValidationStatus);
    const status = [];
    keys.forEach(Key => {
      const type = {'id': Key, 'name': ValidationStatus[Key]};
      status.push(type);
    });
    return status;
  }

  public createCategory() {
    this.openCategoryDialog();
  }

  public openCategoryDialog() {
    const config = new MatDialogConfig();
    config.data = {category: new Category(CategoryType[CategoryType.QUESTION])};
    config.panelClass = 'my-full-screen-dialog';
    const dialogRef = this.dialog.open(CategoryDialogComponent, config);
    dialogRef.afterClosed().subscribe(q => {
      if (q) {
        this.loadCategories();
        // const itemIndex = this._questionnaires.findIndex(item => item.id === q.id);
        // if (itemIndex === -1) {
        //   this._questionnaires.push(q);
        // } else {
        //   this._questionnaires[itemIndex] = q;
        // }
        // this.scrollIntoView('questionnaireId_' + q.id.toString());
      }
    });
  }

  public compareById(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  public compareByUuid(f1: any, f2: any) {
    return f1 && f2 && f1.uuid === f2.uuid;
  }

  public close(): void {
    this.cancel.emit(this.question.uuid ? this.question.uuid : '');
  }

}
