import {Injectable} from '@angular/core';
import {Webhook} from '@app/features/qcm-rest-api/model/webhook.model';
import {Page} from '@app/features/qcm-rest-api/services/page';
import {WebHookService} from '@app/features/qcm-rest-api/services/web-hook.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebHookResolver {

  constructor(private webHookService: WebHookService) {
  }

  resolve(): Observable<Page<Webhook>> {
    return this.webHookService.getWebHooks(0, environment.PAGE_SIZE, 'dateModification');
  }

}
