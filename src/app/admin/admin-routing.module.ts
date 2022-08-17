import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWrapperPageComponent } from './pages/admin-wrapper-page/admin-wrapper-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperPageComponent,
    children: [
      {
        path: 'users',
        component: UsersPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
