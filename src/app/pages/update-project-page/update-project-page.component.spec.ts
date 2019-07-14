import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectPage } from './update-project-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UpdateProjectPage', () => {
  let component: UpdateProjectPage;
  let fixture: ComponentFixture<UpdateProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProjectPage ],
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
    fixture = TestBed.createComponent(UpdateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
