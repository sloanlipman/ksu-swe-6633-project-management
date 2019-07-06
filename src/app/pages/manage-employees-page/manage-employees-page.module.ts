import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageEmployeesPage, AddEmployeeDialog } from './manage-employees-page.component';

@NgModule({
  declarations: [
    ManageEmployeesPage,
    AddEmployeeDialog
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
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
  entryComponents: [AddEmployeeDialog],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageEmployeesPageModule{}
