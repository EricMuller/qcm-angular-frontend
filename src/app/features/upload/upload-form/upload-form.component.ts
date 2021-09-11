import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {CategoryDialogComponent} from '@app/features/category/category-dialog/category-dialog.component';
import {Category} from '@app/features/qcm-rest-api/model/category.model';
import {Upload} from '@app/features/qcm-rest-api/model/upload.model';
import {CategoryService} from '@app/features/qcm-rest-api/services/category.service';
import {CategoryType} from '@app/features/qcm-rest-api/services/type.enum';
import {UploadStore} from '@app/features/stores/upload-store.service';
import {UploadFormBuilder} from '@app/features/upload/upload-form/upload-form-builder';
import {EditableFormComponent} from '@app/shared/material-components/editable-form/editableFormComponent';
import {TranslateService} from '@ngx-translate/core';

enum ImportStatus {
  CREATED = 'Created',
  RUNNING = 'Running',
  REJECTED = 'Rejected',
  DONE = 'Done'
}

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
  , providers: [UploadFormBuilder]
})
export class UploadFormComponent extends EditableFormComponent<Upload, string> implements OnInit {

  public upload: Upload;
  public categories: Category[];
  public status = [];

  constructor(protected   crudStore: UploadStore,
              protected   notifierService: NotifierService,
              protected   router: Router,
              private categoryService: CategoryService, private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: UploadFormBuilder,
              protected translateService: TranslateService
  ) {
    super(crudStore, notifierService, router, translateService);

    this.status = this.getImportStatusEnum();
    this.edition = route.snapshot.params.uuid;
    this.route.data.subscribe(data => {
      this.upload = data.upload;
      this.categories = data.categories;
    });

  }

  ngOnInit() {
    this.createForm();
    this.startEdition();
  }

  protected createForm(): void {
    this.form = this.formBuilder.createForm(this.upload);
  }

  protected onDeleteForm(t: Upload) {
  }

  protected onSaveForm(t: Upload) {

  }

  // ------ status

  private getImportStatusEnum(): any[] {
    const keys = Object.keys(ImportStatus);
    const status = [];
    keys.map(Key => {
      const type = {id: Key, name: ImportStatus[Key]};
      status.push(type);
    });
    return status;
  }


  // ------
  private loadCategories() {
    this.categoryService
      .getCategories(CategoryType.UPLOAD)
      .subscribe((categories => {
        this.categories = categories;
      }));
  }

  public createCategory() {
    this.openCategoryDialog();
  }

  public openCategoryDialog() {
    const config = new MatDialogConfig();
    config.data = {category: new Category(CategoryType[CategoryType.UPLOAD])};
    config.panelClass = 'my-full-screen-dialog';
    const dialogRef = this.dialog.open(CategoryDialogComponent, config);
    dialogRef.afterClosed().subscribe(q => {
      if (q) {
        this.loadCategories();
      }
    });
  }

  public compareById(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }
}
