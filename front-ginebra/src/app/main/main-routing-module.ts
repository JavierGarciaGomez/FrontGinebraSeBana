import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainWrapperPageComponent } from './pages/main-wrapper-page/main-wrapper-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainWrapperPageComponent,
    children: [
      {
        path: 'main',
        component: MainPageComponent,
      },
      {
        path: 'userProfile',
        component: UserProfilePageComponent,
      },
      {
        path: 'petProfile',
        component: PetPageComponent,
      },
      {
        path: '**',
        redirectTo: 'main',
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
