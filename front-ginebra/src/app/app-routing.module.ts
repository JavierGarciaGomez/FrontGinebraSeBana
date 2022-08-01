import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  // {
  //   path: 'heros',
  //   loadChildren: () =>
  //     import('./heros/heros.module').then((m) => m.HerosModule),
  //   canLoad: [AuthGuard],
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: '404',
  //   component: ErrorPageComponent,
  // },
  // {
  //   path: '**',
  //   // component: ErrorPageComponent
  //   redirectTo: '404',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
