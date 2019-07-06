import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesPageComponent } from './manage-employees-page.component';

describe('ManageEmployeesPageComponent', () => {
  let component: ManageEmployeesPageComponent;
  let fixture: ComponentFixture<ManageEmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
