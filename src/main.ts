import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';

import {AppModule} from './app/app.module';
import {KeycloakService} from './app/core/auth/keycloak.service';
import {environment} from './environments/environment';


export function loadPlatform() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.production) {
  enableProdMode();
}

loadPlatform();

// KeycloakService.init()
//   .then(loadPlatform)
//   .catch(e => {
//     console.error(e);
//   });

