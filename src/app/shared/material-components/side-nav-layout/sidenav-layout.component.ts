import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {NavigationExtras, Router} from '@angular/router';
import {AppState} from '@app/app/state/app-state.service';
import {NavigationModel} from '@app/app/state/navigation-model';
import {KeycloakGuard} from '@app/core/auth/keycloak.guard';
import {TranslateService} from '@ngx-translate/core';
import {Select} from '@ngxs/store';
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

  private isSmallScreen = false;

  @Input()
  public appName = '';

  @Input()
  public title = '';

  @Input()
  public opened = false;

  @Input()
  public style = 'width:300px;border-right: 1px solid rgba(0, 0, 0, 0.12)';

  language$: Observable<string>;

  /* main menu */
  @Select(AppState.navigation) public navigation$: Observable<NavigationModel[]>;
  @Select(AppState.currentPageTitle) public currentPageTitle$: Observable<string>;

  // navigation = [
  //   {link: '/home', label: 'menu.about'},
  //   {link: '/questionnaires/list', label: 'menu.questionnaires'},
  //   {link: '/questions/list', label: 'menu.questions'},
  // ];
  //
  // navigationSideMenu = [
  //   ...this.navigation,
  //   {link: '/upload/', label: 'menu.upload'},
  // ];

  isHandset$: Observable<boolean>;
  isHandset: boolean;
  mode = 'side';


  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
              public translate: TranslateService, private keycloakGuardService: KeycloakGuard) {
  }

  public login(event): void {
  }

  ngOnInit(): void {

    console.log('SideNavLayoutComponent.ngOnInit ok');
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {

      if (state.breakpoints[Breakpoints.XSmall]) {
        console.log('Matches XSmall viewport');
        this.isHandset = true;
        this.mode = 'over';
        this.opened = false;
        // this.leftSidenav.toggle();
      }
      if (state.breakpoints[Breakpoints.Small]) {
        this.isHandset = true;
        this.mode = 'over';
        this.opened = false;
        console.log('Matches Small viewport');
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        this.isHandset = false;
        this.mode = 'side';
        this.opened = true;
        console.log('Matches Medium  viewport');
      }
      if (state.breakpoints[Breakpoints.Large]) {
        this.isHandset = false;
        this.mode = 'side';
        this.opened = true;
        console.log('Matches Large viewport');
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.isHandset = false;
        this.mode = 'side';
        this.opened = true;
        console.log('Matches XLarge viewport');
      }
    });

  }

  ngAfterContentInit(): void {
    // this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
    //   .pipe(
    //     map(
    //       result => {
    //         console.log(result);
    //         return result.matches;
    //       })
    //   );
    // console.log('SideNavLayoutComponent.ngAfterContentInit ok');
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

  ngOnDestroy(): void {
    // this._querySubscription.unsubscribe();
  }

  onLanguageSelect($event): void {

  }

  toggleMenu(): void {
    debugger
    this.opened = this.opened ? false : true;
    this.leftSidenav.toggle();
  }

  routeLink(commands: any[], extras?: NavigationExtras) {
    // this.leftSidenav.toggle();
    if (this.isHandset) {
      this.toggleMenu();
    }
    this.router.navigate(commands, extras);
  }

  public isLoggedIn(): boolean {
    return this.keycloakGuardService.isLoggedIn();
  }


}
