import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'tasks',
    loadChildren: './pages/create-tasks-page/create-tasks-page.module#CreateTasksPageModule'
  },

  {
    path: 'edit',
    loadChildren: './pages/edit-project-page/edit-projects-page.module#EditProjectsPageModule'
  },

  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#HomePageModule'
  },

  {
    path: 'manage-employees',
    loadChildren: './pages/manage-employees-page/manage-employees-page.module#ManageEmployeesPageModule'
  },

  {
    path: 'view-project',
    loadChildren: './pages/view-project-page/view-project-page.module#ViewProjectPageModule'
  },

  {
    path: 'trends',
    loadChildren: './pages/view-trends-page/view-trends-page.module#ViewTrendsPageModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
