import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProjectPage, AddRiskDialog, AddRequirementDialog } from './edit-project-page.component';

@NgModule({
  declarations: [
    EditProjectPage,
    AddRiskDialog,
    AddRequirementDialog,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FormsModule,
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
  entryComponents: [
    AddRiskDialog,
    AddRequirementDialog,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProjectPageModule{}
