import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {Account} from '@app/core/auth/account.model';
import {UserGuardService} from '@app/shared/auth/user-guard.service';

import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserGuardService) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService
      .getCurrentUser()
      .pipe(
        take(1),
        map((user: Account) => {
          return user.userName !== null && user.uuid !== undefined;
        })
      );

    // return fromPromise(
    // this.keycloakService.getToken()).pipe(
    // map((token) => {
    //     return true;
    //   }
    // ), catchError(error => {
    //   return this.notifierService
    //     .notifyError(error, '', 2000)
    //     .onAction()
    //     .pipe(flatMap(() => {
    //       this.login();
    //       return of(true);
    //     }));
    // }));
  }
}
