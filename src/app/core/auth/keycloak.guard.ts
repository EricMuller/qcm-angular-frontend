import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

import {Subscription} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard implements CanActivate {

  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
   return this.canActivate(childRoute, state);
 }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + '/#' + state.url,
      });

    }

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }

 /*canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   return this.canActivate(childRoute, state);
 }*/
//
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//   return of(true);
//   // return fromPromise(this.keycloakService.getToken())
//   //   .pipe(
//   //     map((token) => {
//   //       // if (token === 'login') {
//   //         // this.router.navigateByUrl('/about');
//   //       //  return false;
//   //       // }
//   //       return true;
//   //       }
//   //     ), catchError(error => {
//   //
//   //       console.error('KeycloakGuard catchError' + error);
//   //
//   //       return this.notifierService
//   //         .notifyError(error, '', 2000)
//   //         .onAction()
//   //         .pipe(flatMap(() => {
//   //           // this.router.navigateByUrl('/about');
//   //           this.login();
//   //           return of(false);
//   //         }));
//   //
//   //       // return of(false);
//   //     }));
// }
//
  logout() {

     this.keycloak.logout(window.location.origin + '/#' + '/about');

  }


  isLoggedIn(): Observable<boolean> {
    return of(this.authenticated);
  }

}
