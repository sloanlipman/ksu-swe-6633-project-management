import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesPage } from './manage-employees-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ManageEmployeesPageComponent', () => {
  let component: ManageEmployeesPage;
  let fixture: ComponentFixture<ManageEmployeesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
