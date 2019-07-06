import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'tasks', // TODO add /:id
    loadChildren: './pages/create-tasks-page/create-tasks-page.module#CreateTasksPageModule'
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

  {
    path: 'view-project', // TODO add /:id
    loadChildren: './pages/view-project-page/view-project-page.module#ViewProjectPageModule'
  },

  {
    path: 'trends', // TODO add /:id
    loadChildren: './pages/view-trends-page/view-trends-page.module#ViewTrendsPageModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
