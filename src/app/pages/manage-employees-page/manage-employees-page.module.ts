import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageEmployeesPage } from './manage-employees-page.component';

@NgModule({
  declarations: [
    ManageEmployeesPage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageEmployeesPage
      }
    ])
  ],
  exports: [
    ManageEmployeesPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageEmployeesPageModule{}
