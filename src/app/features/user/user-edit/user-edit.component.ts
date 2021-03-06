import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@app/core/auth/user.model';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {UserStore} from '@app/features/stores/user-store.service';
import {UserFormBuilder} from '@app/features/user/user-edit/user-form-builder';
import {EditableFormComponent} from '@app/shared/material-components/editable-form/editableFormComponent';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'], providers: [UserFormBuilder]
})
export class UserEditComponent extends EditableFormComponent<User, number> implements OnInit {

  systems: any[] = [{
    name: 'Card View',
    on: false,
  }];

  private user: User;

  constructor(protected crudStore: UserStore,
              protected notifierService: NotifierService,
              private route: ActivatedRoute,
              private userFormBuilder: UserFormBuilder,
              protected router: Router, protected translateService: TranslateService) {
    super(crudStore, notifierService, router, translateService);
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.createForm();
      this.toggleEdition(true);
      this.form.controls.email.disable();
    });
  }

  ngOnInit(): void {

  }

  protected createForm(): void {
    this.form = this.userFormBuilder.createForm(this.user);
  }

  public saveForm() {
    this.form.controls.email.enable();
    super.saveForm();
    this.form.controls.email.disable();
  }

  protected onDeleteForm(t: User) {

  }

  protected onSaveForm(t: User) {
    this.notifierService.notifySuccess(t.email, 2000);
  }


}
