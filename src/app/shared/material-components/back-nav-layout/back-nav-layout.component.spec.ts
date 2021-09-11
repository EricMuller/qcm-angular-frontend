import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavLayoutComponent } from './back-nav-layout.component';

describe('BackNavLayoutComponent', () => {
  let component: BackNavLayoutComponent;
  let fixture: ComponentFixture<BackNavLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackNavLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
