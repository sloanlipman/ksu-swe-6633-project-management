import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProjectPage } from './edit-project-page.component';

@NgModule({
  declarations: [
    EditProjectPage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditProjectPage
      }
    ])
  ],
  exports: [
    EditProjectPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProjectPageModule{}
