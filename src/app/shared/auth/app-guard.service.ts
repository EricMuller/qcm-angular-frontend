import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {KeycloakGuard} from '@app/core/auth/keycloak.guard';
import {UserGuard} from '@app/shared/auth/user.guard';
import {List} from 'immutable';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(private keycloakGuard: KeycloakGuard, private userGuard: UserGuard, private router: Router) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (await this.keycloakGuard.canActivate(next, state) === false) {
      return of(false).toPromise();
    }

    if (await this.userGuard.canActivate(next, state).pipe(take(1)).toPromise() === false) {
      return of(this.router.parseUrl('/user/edit')).toPromise();
    }

    return of(true).toPromise();


    // return this.keycloakGuard.canActivate(next, state);
    // .pipe(
    //   first(),
    //   switchMap((success) => {
    //     debugger;
    //     console.log('AppGuard succes = ' + success);
    //     if (!success) {
    //       return of(success);
    //     } else {
    //       return of(success);
    //       // return this.userGuard.canActivate(next, state);
    //     }
    //
    //   }),
    //   take(1),
    // );

    // if ( this.userGuard.canActivate(next, state).pipe(take(1)) === false) {
    //   return of(this.router.parseUrl('/user/edit'));
    // }
    //
    // return of(true).toPromise();

  }

}
