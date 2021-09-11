import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserResolver} from '@app/features/account/resolvers/account-resolver.service';
import {AccountFormComponent} from '@app/features/account/account-form/account-form.component';

import {AccountModule} from '@app/features/account/account.module';
import {AppGuard} from '@app/shared/auth/app-guard.service';

const routes: Routes = [
 {
    path: 'edit', component: AccountFormComponent, canActivate: [AppGuard],
   data: {
     pageTitle: 'menu.page.account',
    },
    resolve: {
      user: UserResolver,
    }
  },
];

@NgModule({
  imports: [AccountModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
