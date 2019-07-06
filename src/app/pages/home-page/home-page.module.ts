import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home-page.component';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  exports: [
    HomePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule{}
