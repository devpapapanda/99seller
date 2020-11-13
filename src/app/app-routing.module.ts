import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./user/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./user/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./user/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'property-details',
    loadChildren: () => import('./user/property-details/property-details.module').then( m => m.PropertyDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
