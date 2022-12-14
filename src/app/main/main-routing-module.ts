import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectedPetPageComponent } from './pages/selectedPet-page/selectedPet-page.component';
import { MainWrapperPageComponent } from './pages/main-wrapper-page/main-wrapper-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { CreatePetPageComponent } from './pages/create-pet-page/create-pet-page.component';
import { EditPetPageComponent } from './pages/edit-pet-page/edit-pet-page.component';
import { EditBathPageComponent } from './pages/edit-bath-page/edit-bath-page.component';
import { PublicPetsPageComponent } from './pages/public-pets-page/public-pets-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainWrapperPageComponent,
    children: [
      {
        path: 'selectedPet',
        component: SelectedPetPageComponent,
      },
      {
        path: 'createPet',
        component: CreatePetPageComponent,
      },
      {
        path: 'userProfile',
        component: UserProfilePageComponent,
      },
      {
        path: 'changePass',
        component: ChangePasswordPageComponent,
      },
      {
        path: 'editUser',
        component: EditUserPageComponent,
      },
      {
        path: 'editPet',
        component: EditPetPageComponent,
      },
      {
        path: 'petProfile',
        component: PetPageComponent,
      },
      {
        path: 'editBath',
        component: EditBathPageComponent,
      },
      {
        path: 'publicPets',
        component: PublicPetsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'selectedPet',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
