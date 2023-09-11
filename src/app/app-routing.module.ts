import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAccessLoginGuard } from './guards/access-login.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:'user',
    canActivate: [
      noAccessLoginGuard
    ],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
