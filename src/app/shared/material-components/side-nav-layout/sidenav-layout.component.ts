import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {NavigationExtras, Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {OpenAction} from '@app/app/state/navigation/navigation-actions';
import {MenuItemModel} from '@app/app/state/navigation/navigation-model';
import {KeycloakGuard} from '@app/core/auth/keycloak.guard';
import {Logger} from '@app/core/loggers/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {Select, Store} from '@ngxs/store';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss']

})
export class SideNavLayoutComponent implements OnInit, OnDestroy, AfterContentInit {


  @ViewChild('leftsidenav', {static: false})
  public leftSidenav: MatSidenav;

  private querySubscription: Subscription;

  private breakpointSubscription: Subscription;

  private isSmallScreen = false;

  @Input()
  public appName = 'app.name';

  @Input()
  public title = '';

  @Input()
  public opened = false;

  @Input()
  public modeFormulaire = false;

  @Input()
  public style = 'width:300px;border-right: 1px solid rgba(0, 0, 0, 0.12)';

  language$: Observable<string>;

  /* main menu */
  @Select(AppState.menu) public menu$: Observable<MenuItemModel[]>;
  @Select(AppState.online) public offline$: Observable<boolean>;
  @Select(AppState.opened) public opened$: Observable<boolean>;

  isMobile: boolean;
  sideNavMode = 'side';


  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
              public translate: TranslateService,
              private keycloakGuard: KeycloakGuard,
              private store: Store) {

    this.opened$.subscribe(value => this.opened = value);

  }

  public login(event): void {
  }

  ngOnInit(): void {
    Logger.info('SideNavLayoutComponent', 'ngOnInit');

    this.breakpointSubscription = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {

      let isMobile = false;
      let sideNavMode = 'side';

      if (state.breakpoints[Breakpoints.XSmall]) {
        Logger.info('SideNavLayoutComponent', 'ngOnInit', 'Matches XSmall viewport');
        sideNavMode = 'over';
        isMobile = true;
      }
      if (state.breakpoints[Breakpoints.Small]) {
        Logger.info('SideNavLayoutComponent', 'ngOnInit', 'Matches Small viewport');
        sideNavMode = 'over';
      }

      this.isMobile = isMobile;
      this.sideNavMode = sideNavMode;

    });

  }

  ngOnDestroy(): void {
    // this._querySubscription.unsubscribe();
    Logger.info('SideNavLayoutComponent', 'ngOnDestroy');
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {

  }

  isModeFormulaire() {
    return this.modeFormulaire && this.isMobile;
  }

  checkScreen(): void {
    // this._ngZone.run(() => {
    //   this.isSmallScreen = this.media.query('sm'); // or '(min-width: 960px) and (max-width: 1279px)'
    // });
  }

  watchScreen(): void {
    // this._querySubscription = this.media.registerQuery('sm').subscribe((matches: boolean) => {
    //   this._ngZone.run(() => {
    //     this.isSmallScreen = matches;
    //   });
    // });
  }

  isGtSm(): Observable<boolean> {
    // media.registerQuery('gt-sm')
    return of(true);
  }


  onLanguageSelect($event): void {

  }

  toggleMenu(): void {

    const opened = this.opened ? false : true;
    this.store.dispatch(new OpenAction(opened));
    this.leftSidenav.toggle();
  }


  routeLink(menuItem: MenuItemModel, extras?: NavigationExtras): void {
    // this.leftSidenav.toggle();
    // if (this.isMobile) {
    this.toggleMenu();
    // }

    if (menuItem.link) {
      this.router.navigate([menuItem.link], extras);
    }
  }

  // public isLoggedIn(): Promise<boolean> {
  //   return this.keycloakGuard.isLoggedIn();
  // }

}
