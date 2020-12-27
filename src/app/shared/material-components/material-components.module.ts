import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {FabButtonComponent} from '@app/shared/material-components/fab/fab-button/fab-button.component';
import {FabMenuComponent} from '@app/shared/material-components/fab/fab-menu/fab-menu.component';
import {FabToggleComponent} from '@app/shared/material-components/fab/fab-toggle/fab-toggle.component';
import {FabModule} from '@app/shared/material-components/fab/fab.module';
import {LayoutDialogModule} from '@app/shared/material-components/layout-module/layout-dialog.module';
import {LoginMenuComponent} from '@app/shared/material-components/login-menu/login-menu.component';
import {SelectableListComponent} from '@app/shared/material-components/selectable-list/selectable-list.component';
import {SideNavLayoutComponent} from '@app/shared/material-components/side-nav-layout/sidenav-layout.component';
import {MaterialModule} from '@app/shared/material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {PageLayoutComponent} from './page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FabModule,
    FlexLayoutModule,
    FormsModule,
    LayoutDialogModule,
    TranslateModule.forChild()
  ],
  declarations: [SelectableListComponent, SideNavLayoutComponent, LoginMenuComponent, BreadcrumbComponent, PageLayoutComponent]
  , exports: [SelectableListComponent, SideNavLayoutComponent, LoginMenuComponent,
    FabMenuComponent, FabToggleComponent, FabButtonComponent, PageLayoutComponent]
})
export class MaterialComponentsModule {
}
