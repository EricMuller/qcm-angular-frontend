// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  application: 'QCM ',
  production: false,
  KEYCLOAK: true,
  KEYCLOAK_URL: 'https://keycloak.webmarks.net/auth',
  // KEYCLOAK_URL: 'http://localhost:8080/auth',
  KEYCLOAK_REALM: 'qcm',
  KEYCLOAK_CLIENTID: 'qcm-web-dev',
  PAGE_SIZE: 100,

   // QCM_REST_API_HOST: 'http://localhost:8081'
  // QCM_REST_API_HOST: 'http://192.168.1.11:8080'
  QCM_REST_API_HOST: 'https://qcm-api.webmarks.net'
  // QCM_REST_API_HOST: 'http://163.172.48.36:9090'
  // QCM_REST_API_HOST: 'https://qcm-rest-api.herokuapp.com'
};
