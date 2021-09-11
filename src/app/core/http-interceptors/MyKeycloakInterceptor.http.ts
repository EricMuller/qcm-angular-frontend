import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {KeycloakService} from 'keycloak-angular';
import {EMPTY, Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError, flatMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyKeyCloakInterceptor implements HttpInterceptor {

  constructor(private notifierService: NotifierService, private keycloak: KeycloakService) {
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = environment.QCM_REST_API_HOST;
    const position = requestUrl.indexOf(positionIndicator);
    console.log('KeyCloakInterceptor: ' + requestUrl + 'position =' + position);
    return position === 0;
    // if (position > 0) {
    //   let destination: string = requestUrl.substr(position + positionIndicator.length);
    //   for (let address of this.urlsToNotUse) {
    //     if (new RegExp(address).test(destination)) {
    //       return false;
    //     }
    //   }
    // }
    // return true;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isValidRequestForInterceptor(req.url)) {
      return fromPromise(this.keycloak.getToken())
        .pipe(
          catchError(error => {
              // debugger
              console.log('KeyCloakInterceptor error=' + error);
              return EMPTY;
            }
          ),
          flatMap((accessToken) => {
            debugger
            console.log('KeyCloakInterceptor:' + req.url);
            console.log('KeyCloakInterceptor: accessToken= ' + accessToken);
            if (!accessToken) {
              return next.handle(req);
            }
            const request = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              }
            });

            return next.handle(request)
              .pipe(
                tap(evt => {
                  debugger
                  if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success) {
                      console.log(evt.body.success.message);
                    }
                  }
                }),
                catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  debugger
                  if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.message}`;
                  } else {
                    // server-side error
                    errorMessage = `${error.message}`;
                  }

                  console.error(errorMessage);
                  this.notifierService.notifyError(errorMessage, 'OK');
                  return throwError(errorMessage);
                })
              );
          }));
    }
    return next.handle(req);
  }

}
