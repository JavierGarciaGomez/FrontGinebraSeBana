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
import { CreatePetPageComponent } from './pages/create-pet-page/create-pet-page.component';
import { EditPetPageComponent } from './pages/edit-pet-page/edit-pet-page.component';
import { EditBathPageComponent } from './pages/edit-bath-page/edit-bath-page.component';
import { PublicPetsPageComponent } from './pages/public-pets-page/public-pets-page.component';

@NgModule({
  declarations: [
    SelectedPetPageComponent,
    UserProfilePageComponent,
    PetPageComponent,
    MainWrapperPageComponent,
    EditUserPageComponent,
    ChangePasswordPageComponent,
    CreatePetPageComponent,
    EditPetPageComponent,
    EditBathPageComponent,
    PublicPetsPageComponent,
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
