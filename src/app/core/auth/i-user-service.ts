import {Account} from '@app/core/auth/account.model';
import {Observable} from 'rxjs/internal/Observable';

export interface IUserService {
   getCurrentUser(): Observable<Account> ;
}
