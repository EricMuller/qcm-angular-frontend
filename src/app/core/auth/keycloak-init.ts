import {environment} from '../../../environments/environment';
import {KeycloakService} from 'keycloak-angular';


export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.KEYCLOAK_URL,
            realm: environment.KEYCLOAK_REALM,
            clientId: environment.KEYCLOAK_CLIENTID
          },
          loadUserProfileAtStartUp: false,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: true,
            // checkLoginIframeInterval: false,
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
