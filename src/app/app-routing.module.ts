import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'update', // TODO add /:id
    loadChildren: './pages/update-project-page/update-project-page.module#UpdateProjectPageModule'
  },

  {
    path: 'edit', // TODO add /:id
    loadChildren: './pages/edit-project-page/edit-project-page.module#EditProjectPageModule'
  },

  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#HomePageModule'
  },

  {
    path: 'employees',
    loadChildren: './pages/manage-employees-page/manage-employees-page.module#ManageEmployeesPageModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
