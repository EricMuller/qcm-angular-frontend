import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '@app/core/auth/account.model';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {UserStore} from '@app/features/stores/user-store.service';
import {AccountFormBuilder} from '@app/features/account/account-form/account-form-builder.service';
import {EditableFormComponent} from '@app/shared/material-components/editable-form/editableFormComponent';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'], providers: [AccountFormBuilder]
})
export class AccountFormComponent extends EditableFormComponent<Account, number> implements OnInit {

  systems: any[] = [{
    name: 'Card View',
    on: false,
  }];


  constructor(protected crudStore: UserStore,
              protected notifierService: NotifierService,
              private route: ActivatedRoute,
              private userFormBuilder: AccountFormBuilder,
              protected router: Router, protected translateService: TranslateService) {
    super(crudStore, notifierService, router, translateService);
    this.route.data.subscribe(data => {
      this.createForm(data.user);
      this.form.controls.email.disable();
    });
  }

  ngOnInit(): void {

  }

  protected createForm(model: Account): void {
    this.model = model;
    this.form = this.userFormBuilder.createForm(model);
  }

  public saveForm() {
    this.form.controls.email.enable();
    super.saveForm();
    this.form.controls.email.disable();
  }

  protected onDeleteForm(t: Account) {

  }



  public close(): void {
    this.cancel.emit(this.model);
  }

  protected onStartEdition() {
    this.form.controls.email.disable();
  }
}
