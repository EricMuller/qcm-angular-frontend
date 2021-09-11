import {InjectionToken} from '@angular/core';

export interface QcmApiEndPoint {
  CATEGORY: string;
  TAGS: string;
  ACCOUNTS: string;
  QUESTIONNAIRES: string;
  QUESTIONS: string;
  UPLOADS: string;
  EXPORT: string;
  IMPORTS: string;
  WEBHOOKS: string;
}


export const QCM_API_ENDPOINT_TOKEN =
  new InjectionToken<QcmApiEndPoint>('qcm-api-endpoint');
