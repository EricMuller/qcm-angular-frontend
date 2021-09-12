import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Category} from '@app/features/qcm-rest-api/model/category.model';
import {CategoryService} from '@app/features/qcm-rest-api/services/category.service';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  public category: Category;

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService) {
    // this.category = Object.assign({}, data.category);
    this.category = data.category;
  }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public save() {

    this.categoryService.postCategory(this.category)
      .subscribe(
        (q) => {
          this.dialogRef.close(q);
        }
      );
  }

}
