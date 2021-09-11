import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Account} from '@app/core/auth/account.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';


import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class MyAccountService {

  readonly requestOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private user: Account;

  constructor(private http: HttpClient, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint) {
  }


  public getAccount(): Observable<Account> {
    return this.http
      .get(`${this.endPoint.ACCOUNTS}me`)
      .pipe(
        map(
          (user: Account) => {
            this.user = user;
            return user;
          }));
  }

  public postAccount(q: Account): Observable<Account> {
    return this.http.post<Account>(`${this.endPoint.ACCOUNTS}me`, q);
  }

  public putAccount(q: Account): Observable<Account> {
    return this.http.put<Account>(`${this.endPoint.ACCOUNTS}me`, q);
  }

  // public clearUser(): void {
  //   this.user = null;
  //   this.coockieService.delete('Authorization', '/');
  // }
  //
  // public getUser(): User {
  //   return this.user;
  // }
  //
  // public logout() {
  //   this.http.get('/logout')
  //
  // }

  // public handleError(error: Reponse | any): Observable<any> {
  //   // In a real world app, we might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Reponse) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   if (errMsg) {
  //     console.error(errMsg);
  //   }
  //
  //
  //   return Observable.throw(error);
  // }

}
