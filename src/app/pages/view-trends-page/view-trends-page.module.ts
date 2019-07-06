import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewTrendsPage } from './view-trends-page.component';

@NgModule({
  declarations: [
    ViewTrendsPage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewTrendsPage

      }
    ])
  ],
  exports: [
    ViewTrendsPage

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewTrendsPageModule{}
