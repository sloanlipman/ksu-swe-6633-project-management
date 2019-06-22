import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // These are here from my old project. I have them as an example for quick reference on how to set up routing.

  // {
  //   path: 'edit-profile',
  //   loadChildren: './pages/edit-profile-page/edit-profile-page.module#EditProfilePageModule'
  // },
  // {
  //   path: 'home',
  //   loadChildren: './pages/home-page/home-page.module#HomePageModule'
  // },
  // {
  //   path: 'landing-page',
  //   loadChildren: './pages/landing-page/landing-page.module#LandingPageModule'
  // },
  // {
  //   path: 'login',
  //   loadChildren: './pages/login-page/login-page.module#LoginPageModule'
  // },
  // {
  //   path: 'matchmaking',
  //   loadChildren: './pages/matchmake-view-page/matchmake-view-page.module#MatchmakeViewPageModule'
  // },
  // {
  //   path: 'register',
  //   loadChildren: './pages/register-page/register-page.module#RegisterPageModule'
  // },
  // {
  //   path: 'view-profile/:id',
  //   loadChildren: './pages/view-profile-page/view-profile-page.module#ViewProfilePageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
