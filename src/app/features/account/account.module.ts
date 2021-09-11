import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserStore} from '@app/features/stores/user-store.service';
import {UserResolver} from '@app/features/account/resolvers/account-resolver.service';
import {AccountFormComponent} from '@app/features/account/account-form/account-form.component';
import {AngularModule} from '@app/shared/angular/angular.module';
import {MaterialComponentsModule} from '@app/shared/material-components/material-components.module';
import {MaterialModule} from '@app/shared/material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {UserMenuItemComponent} from './user-menu-item/user-menu-item.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AngularModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        TranslateModule.forChild(),
    ],
  exports: [
    UserMenuItemComponent, AccountFormComponent
  ],
  declarations: [ UserMenuItemComponent, AccountFormComponent],
  providers: [UserResolver, UserStore],
})
export class AccountModule {
}
