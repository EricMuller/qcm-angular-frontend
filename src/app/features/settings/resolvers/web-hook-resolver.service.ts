import {Injectable} from '@angular/core';
import {Webhook} from '@app/features/qcm-rest-api/model/webhook.model';
import {PagedModel} from '@app/features/qcm-rest-api/services/pagedModel';
import {WebHookService} from '@app/features/qcm-rest-api/services/web-hook.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebHookResolver {

  constructor(private webHookService: WebHookService) {
  }

  resolve(): Observable<PagedModel<Webhook>> {
    return this.webHookService.getWebHooks(0, environment.PAGE_SIZE, 'dateModification');
  }

}
