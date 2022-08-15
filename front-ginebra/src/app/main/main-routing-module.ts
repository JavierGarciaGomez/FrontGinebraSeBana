import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectedPetPageComponent } from './pages/selectedPet-page/selectedPet-page.component';
import { MainWrapperPageComponent } from './pages/main-wrapper-page/main-wrapper-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';

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
        path: 'petProfile',
        component: PetPageComponent,
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
