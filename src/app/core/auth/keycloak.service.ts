import {Injectable} from '@angular/core';
import {Account} from '@app/core/auth/account.model';

import {environment} from '../../../environments/environment';

// declare var Keycloak: any;


export class KeycloakService {

  static auth: any = {};

  private account: Account;

  // static init(): Promise<any> {
  //   const keycloakAuth: any = Keycloak({
  //     url: environment.KEYCLOAK_URL,
  //     realm: environment.KEYCLOAK_REALM,
  //     clientId: environment.KEYCLOAK_CLIENTID
  //   });
  //
  //   KeycloakService.auth.loggedIn = false;
  //
  //   console.info('KeycloakService.init()');
  //   return new Promise( async (resolve, reject) => {
  //      await keycloakAuth.init({onLoad: 'login-required', checkLoginIframe: true})
  //       .success(() => {
  //         KeycloakService.auth.authz = keycloakAuth;
  //         KeycloakService.auth.logoutUrl =
  //           keycloakAuth.authServerUrl + '/realms/' + environment.KEYCLOAK_REALM
  //           + '/protocol/openid-connect/logout?redirect_uri=' + document.baseURI
  //           + '&client_id=' + environment.KEYCLOAK_CLIENTID
  //           + '&refresh_token=' + KeycloakService.auth.authz.refreshToken;
  //         console.info('KeycloakService.init() success token=' +  KeycloakService.auth.authz.token);
  //         KeycloakService.auth.loggedIn = true;
  //         resolve();
  //       })
  //       .error((e) => {
  //         alert(e);
  //         console.error('KeycloakService:init()');
  //         console.error(e);
  //         reject();
  //       });
  //   });
  // }


  constructor() {
  }

  public login(): void {
    KeycloakService.auth.authz.login()
      .success(
        () => {
          KeycloakService.auth.authz.loadUserProfile()
            .success(data => {
              this.account = new Account();
              this.account.userName = data.username;
              this.account.firstName = data.first_name;
              this.account.lastName = data.last_name;
              this.account.email = data.email;
            });
        }
      );
  }

  // isLoggedIn(): boolean {
  //   return  KeycloakService.auth.authz ? KeycloakService.auth.authz.authenticated : false;
  // }

  hasAnyRole(roles: string[]): boolean {
    for(let i = 0; i < roles.length; i++) {
      if (this.hasRole(roles[i])) {
        return true;
      }
    }

    return false;
  }

  hasRole(role: string): boolean {
    return KeycloakService.auth.authz.hasRealmRole(role);
  }

  hasManageUsersRole(): boolean {
    return KeycloakService.auth.authz.hasResourceRole('manage-users', 'realm-management');
  }

  // getToken(): Promise<string> {
  //
  //   return new Promise<string>((resolve, reject) => {
  //
  //     if (KeycloakService.auth.loggedIn === true && KeycloakService.auth.authz && KeycloakService.auth.authz.token
  //       && typeof KeycloakService.auth.authz.token !== 'undefined') {
  //
  //       // resolve(KeycloakService.auth.authz.token);
  //       KeycloakService.auth.authz
  //         .updateToken(90) // refresh token if it will expire in 90 seconds or less
  //         .success(() => {
  //           resolve(KeycloakService.auth.authz.token);
  //         })
  //         .error((m) => {
  //           console.error('Failed to refresh token :' + KeycloakService.auth.authz.token);
  //           // reject(new Error('Failed to refresh token' +  KeycloakService.auth.authz.token));
  //           // resolve('login');
  //           reject('Failed to refresh token');
  //         });
  //     } else {
  //       console.error('Please logged in.');
  //       // resolve('login');
  //       reject('Please logged in');
  //     }
  //   });
  // }

  logout(): void {
    window.location.href = KeycloakService.auth.logoutUrl;   // window.location.href = KeycloakService.auth.logoutUrl;
  }

  getAccount(): Account {
    return this.account;
  }

}
