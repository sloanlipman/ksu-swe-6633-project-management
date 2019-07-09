import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateProjectPage, AddTaskDialog } from './update-project-page.component';

@NgModule({
  declarations: [
    AddTaskDialog,
    UpdateProjectPage,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateProjectPage
      }
    ])
  ],
  exports: [
    UpdateProjectPage
  ],
  entryComponents: [
    AddTaskDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateProjectPageModule{}
