import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakGuard} from '@app/core/auth/keycloak.guard';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
})
export class LoginMenuComponent implements OnInit {

  constructor(private keycloakGuard: KeycloakGuard, private router: Router) {
  }

  ngOnInit() {
  }

  public isLoggedIn(): Observable<boolean> {
    return this.keycloakGuard.isLoggedIn();
  }


  public logout() {
    this.keycloakGuard.logout();

  }

  public profile() {
    this.router.navigate(['/user/edit']);
  }


}
