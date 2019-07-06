import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateTasksPage, AddTaskDialog } from './create-tasks-page.component';

@NgModule({
  declarations: [
    AddTaskDialog,
    CreateTasksPage,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
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
  entryComponents: [
    AddTaskDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateTasksPageModule{}
