import {OverlayContainer} from '@angular/cdk/overlay';
import {HttpClient} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RippleGlobalOptions} from '@angular/material/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from '@app/app-routing.module';

import {AppComponent} from '@app/app/app.component';
import {AppState} from '@app/app/state/app-state.service';
import {AboutComponent} from '@app/features/home/about.component';
import {QcmRestApiModule} from '@app/features/qcm-rest-api/qcm-rest-api.module';
import {QuestionListStore} from '@app/features/stores/question-list-store.service';

import {AngularModule} from '@app/shared/angular/angular.module';
import {MaterialComponentsModule} from '@app/shared/material-components/material-components.module';
import {MaterialModule} from '@app/shared/material/material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule} from '@ngxs/store';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '../environments/environment';
import {CoreModule, createTranslateLoader} from './core/core.module';

const globalRippleConfig: RippleGlobalOptions = {
  terminateOnPointerUp: true,
  disabled: false,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENTID
      },
      initOptions: {
         onLoad: 'check-sso',
         silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        // onLoad: 'login-required',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent],
  imports: [
    BrowserAnimationsModule,
    AngularModule,
    MaterialModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    QcmRestApiModule.forRoot(),
    CoreModule.forRoot(),
    FlexLayoutModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MaterialComponentsModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
    , QuestionListStore
    // ,{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('light-blue-theme');
  }

}
