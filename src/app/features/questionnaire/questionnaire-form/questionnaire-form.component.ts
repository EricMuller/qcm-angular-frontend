import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {ActivatedRoute, Router} from '@angular/router';
import {SetCurrentQuestionnaireAction} from '@app/app/state/navigation/navigation-actions';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {CategoryDialogComponent} from '@app/features/category/category-dialog/category-dialog.component';
import {Category} from '@app/features/qcm-rest-api/model/category.model';
import {ValidationStatus} from '@app/features/qcm-rest-api/model/enums/ValidationStatus';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {CategoryService} from '@app/features/qcm-rest-api/services/category.service';
import {TagService} from '@app/features/qcm-rest-api/services/tag.service';
import {CategoryType} from '@app/features/qcm-rest-api/services/type.enum';
import {QuestionnaireFormBuilder} from '@app/features/questionnaire/questionnaire-form/questionnaire-form-builder';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';

import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';
import {EditableFormComponent} from '@app/shared/material-components/editable-form/editableFormComponent';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngxs/store';
import {MdEditorOption} from 'ngx-markdown-editor';


@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'], providers: [QuestionnaireFormBuilder]
})
export class QuestionnaireFormComponent extends EditableFormComponent<Questionnaire, string> implements OnInit, AfterViewInit {

  public categories: Category[];
  public status = [];
  public description: string;

  public date: Date;

  public options: MdEditorOption = {
    showPreviewPanel: true,
    enablePreviewContentClick: true,
    resizable: true,
    customRender: {
      image: function (href: string, title: string, text: string) {
        let out = `<img style="max-width: 100%; border: 20px solid red;" src="${href}" alt="${text}"`;
        if (title) {
          out += ` title="${title}"`;
        }
        out += (<any>this.options).xhtml ? '/>' : '>';
        return out;
      }
    }
  };

  constructor(private route: ActivatedRoute, protected notifierService: NotifierService,
              protected router: Router, protected questionnaireListStore: QuestionnaireListStore,
              protected questionListStore: QuestionListStore, private dialog: MatDialog,
              private categoryService: CategoryService,
              private tagService: TagService, private formBuilder: QuestionnaireFormBuilder,
              private store: Store, protected translateService: TranslateService) {
    super(questionnaireListStore, notifierService, router, translateService);
    this.edition = route.snapshot.params.uuid <= 0;
    this.status = this.getStatusEnum();
    this.route.data.subscribe(data => {
      debugger
      this.categories = data.categories;
      this.description = data.questionnaire.description;
      this.date = new Date(data.questionnaire.dateCreation);
      this.createForm(data.questionnaire);
      if (data.questionnaire.uuid) {
        if (this.edition) {
          this.startEdition();
        }
        this.store.dispatch(new SetCurrentQuestionnaireAction({uuid: data.questionnaire.uuid, title: data.questionnaire.title}));
      }
      // this.currentQuestionnaire$ = this.store.select(state => state.currentQuestionnaire);
    });
  }

  protected createForm(model: Questionnaire): void {

    console.log('QuestionnaireFormComponent createForm');
    this.model = model;
    this.form = this.formBuilder.createForm(this.model);
  }

  ngOnInit(): void {
     console.log('QuestionnaireFormComponent ngOnInit()');

     if (!this.form &&  this.model) {
       this.createForm(this.model);
     }

  }

  ngAfterViewInit(): void {

  }

  private loadCategories() {
    this.categoryService
      .getCategories(CategoryType.QUESTIONNAIRE)
      .subscribe((categories => {
        this.categories = categories;
      }));
  }

  private getStatusEnum(): any[] {
    const keys = Object.keys(ValidationStatus);
    const status = [];
    keys.map(Key => {
      const type = {id: Key, name: ValidationStatus[Key]};
      status.push(type);
    });
    return status;
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

  public compareById(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  public compareByUuid(f1: any, f2: any) {
    return f1 && f2 && f1.uuid === f2.uuid;
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


  protected beforeSaveForm(q: Questionnaire): Questionnaire {
    q.description = this.description;
    return q;
  }

  protected onSaveForm(data) {
    super.onSaveForm(data);

    this.store.dispatch(new SetCurrentQuestionnaireAction({uuid: this.model.uuid, title: this.model.title}));
    this.router.navigate(['/questionnaires/' + this.model.uuid]);

  }

  protected onDeleteForm(t: Questionnaire) {
    this.notifierService.notifySuccess(t.title + ' deleted', 2000);
    this.router.navigate(['/questionnaires/']);
  }

  public createCategory() {
    this.openCategoryDialog();
  }

  public viewQuestionsByQuestionnaire() {
    // this.openCategoryDialog();
    // this.questionnaireStore.unSelectAllElement();
    // this.questionnaireListStore.selectElement(this.questionnaire, true);
    this.router.navigate(['/questionnaires/' + this.model.uuid + '/questions']);
  }

  public nbSelectedQuestion(): number {
    return this.questionListStore.selectedSize();
  }

  public add(): void {


  }

  public openCategoryDialog() {
    const config = new MatDialogConfig();

    config.data = {category: new Category(CategoryType[CategoryType.QUESTIONNAIRE])};
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


}
