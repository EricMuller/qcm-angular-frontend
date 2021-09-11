import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Account} from '@app/core/auth/account.model';


@Injectable()
export class AccountFormBuilder {

  constructor(private fb: FormBuilder) {
  }

  public createForm(user: Account): FormGroup {
    return this.fb.group({
      uuid: new FormControl({value: user.uuid, disabled: true}),
      version: new FormControl({value: user.version ? user.version : '' , disabled: true}),
      userName: new FormControl({value: user.userName  ? user.userName : '', disabled: true}),
      firstName: new FormControl({value: user.firstName ? user.firstName : '', disabled: true}),
      lastName: new FormControl({value: user.lastName ? user.lastName : '', disabled: true}),
      email: new FormControl({value: user.email, disabled: true}),
      company: new FormControl({value: user.company ? user.company : '', disabled: true}),
    });
  }

}
