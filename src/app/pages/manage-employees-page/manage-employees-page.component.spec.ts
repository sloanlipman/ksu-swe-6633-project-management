import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesPage } from './manage-employees-page.component';

describe('ManageEmployeesPageComponent', () => {
  let component: ManageEmployeesPage;
  let fixture: ComponentFixture<ManageEmployeesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesPage ]
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
