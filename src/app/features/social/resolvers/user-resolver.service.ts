import {Injectable} from '@angular/core';
import {Account} from '@app/core/auth/account.model';
import {MyAccountService} from '@app/features/qcm-rest-api/services/my-account.service';

import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';



@Injectable()
export class SocialUserResolver implements Resolve<Account> {

  constructor(private userService: MyAccountService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Account> {
    return this.userService.getAccount();
  }
}
