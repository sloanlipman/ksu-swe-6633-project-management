import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTasksPage } from './create-tasks-page.component';

@NgModule({
  declarations: [
    CreateTasksPage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateTasksPage
      }
    ])
  ],
  exports: [
    CreateTasksPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateTasksPageModule{}
