import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BasePage } from './pages/base-page/base-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ManageEmployeesPageComponent } from './pages/manage-employees-page/manage-employees-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';
import { ViewProjectPageComponent } from './pages/view-project-page/view-project-page.component';
import { CreateTasksPageComponent } from './pages/create-tasks-page/create-tasks-page.component';
import { ViewTrendsPageComponent } from './pages/view-trends-page/view-trends-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePage,
    HomePageComponent,
    ManageEmployeesPageComponent,
    EditProjectPageComponent,
    ViewProjectPageComponent,
    CreateTasksPageComponent,
    ViewTrendsPageComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
