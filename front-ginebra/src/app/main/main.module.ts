import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { MainRoutingModule } from './main-routing-module';

import { MainWrapperPageComponent } from './pages/main-wrapper-page/main-wrapper-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainPageComponent,
    UserProfilePageComponent,
    PetPageComponent,
    MainWrapperPageComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule, MaterialModule],
})
export class MainModule {}
