import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { AdminWrapperPageComponent } from './pages/admin-wrapper-page/admin-wrapper-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UserViewComponent,
    AdminWrapperPageComponent,
    UsersPageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
