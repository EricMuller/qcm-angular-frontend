import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MyAccountService} from '@app/features/qcm-rest-api/services/my-account.service';

import {AboutComponent} from './about.component';
import {MatCardModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';



describe('HomeComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, HttpClientModule
      ],
      declarations: [AboutComponent],
      providers: [MyAccountService, CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
