import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProjectPage } from './view-project-page.component';

@NgModule({
  declarations: [
    ViewProjectPage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewProjectPage
      }
    ])
  ],
  exports: [
    ViewProjectPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewProjectPageModule{}
