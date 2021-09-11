import {async, TestBed} from '@angular/core/testing';


import {MatCheckboxModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

import {Observable, of} from 'rxjs';


import {AppComponent} from '@app/app/app.component';
import {CategoryService} from '../features/qcm-rest-api/services/category.service';
import {MyAccountService} from '../features/qcm-rest-api/services/my-account.service';
import {Account} from '../core/auth/account.model';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatListModule,
        MatSidenavModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [CookieService, CategoryService, {provide: MyAccountService, useClass: MockUserService}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.user.fileName).toEqual('eric');
  }));

});

class MockUserService {
  public getCurrentUser(): Observable<Account> {
    const user: Account = new Account();
    user.userName = 'eric';
    return of(user);
  }
};
