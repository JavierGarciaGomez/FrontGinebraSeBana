import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedPetPageComponent } from './pages/selectedPet-page/selectedPet-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { MainRoutingModule } from './main-routing-module';

import { MainWrapperPageComponent } from './pages/main-wrapper-page/main-wrapper-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectedPetPageComponent,
    UserProfilePageComponent,
    PetPageComponent,
    MainWrapperPageComponent,
    EditUserPageComponent,
    ChangePasswordPageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
