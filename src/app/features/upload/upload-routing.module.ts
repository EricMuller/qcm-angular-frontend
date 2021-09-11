import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KeycloakGuard} from '@app/core/auth/keycloak.guard';

import {CategoryResolver} from '@app/features/upload/resolvers/category-resolver.service';
import {UploadResolver} from '@app/features/upload/resolvers/upload-resolver.service';
import {UploadFormComponent} from '@app/features/upload/upload-form/upload-form.component';


import {UploadListComponent} from '@app/features/upload/upload-list/upload-list.component';
import {UploadModule} from '@app/features/upload/upload.module';
import {AppGuard} from '@app/shared/auth/app-guard.service';

const routes: Routes = [
  {
    path: '', component: UploadListComponent, canActivate: [KeycloakGuard],
    data: {
      pageTitle: 'menu.upload'
    }
  },
  {
    path: ':uuid', component: UploadFormComponent, canActivate: [KeycloakGuard],
    resolve: {
      upload: UploadResolver,
      categories: CategoryResolver
    }
  }

];

@NgModule({
  imports: [UploadModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UploadResolver, CategoryResolver]
})
export class UploadRoutingModule {

}
