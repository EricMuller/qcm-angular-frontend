import {Injectable} from '@angular/core';
import {Account} from '@app/core/auth/account.model';
import {Tag} from '@app/features/qcm-rest-api/model/tag.model';
import {MyAccountService} from '@app/features/qcm-rest-api/services/my-account.service';
import {SelectStoreAdapter} from '@app/features/stores/selection-store';
import {CrudStore} from '@app/features/stores/store-api';
import {Observable, of} from 'rxjs';


@Injectable()
export class UserStore extends SelectStoreAdapter<Tag> implements CrudStore<Account, number> {

  constructor(private accountService: MyAccountService) {

    super();
    console.log('UserStore:constructor');
  }

  getElement(id: number): Observable<Account> {
    return undefined;
  }

  deleteElement(user: Account): Observable<Account> {
    return of(user);
  }

  saveElement(element: Account): Observable<Account> {

    if (element.uuid) {
      return this.accountService.putAccount(element);
    } else {
      return this.accountService.postAccount(element);
    }

  }

  clearCriteria() {

  }


}
