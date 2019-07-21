import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesPage } from './manage-employees-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import PouchDB from 'pouchdb';

let ngOnInitSpy;
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
    component.db = new PouchDB('pmonkey'); // Instantiate the DB
    component.db.put({
      _id: 'employees',
      employees: ['a']
    });
    ngOnInitSpy = spyOn(component, 'ngOnInit').and.stub();
    spyOn(component['dialog'], 'open').and.callThrough();
    spyOn(component, 'getEmployeeList').and.stub();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should delete an employee', async () => {
    const empList = ['Jon', 'Bran', 'Tyrion'];
    component.employeesList = empList;
    const finalList = ['Bran', 'Tyrion'];
    spyOn(component.db, 'get').and.returnValue(Promise.resolve({
      employees: ['Jon', 'Bran', 'Tyrion']
    }));
    spyOn(component.db, 'put').and.returnValue(Promise.resolve(true));
    await component.removeEmployee('Jon');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.employeesList).toEqual(finalList);
      expect(component.db.get).toHaveBeenCalledTimes(1);
      expect(component.db.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trying to add a new employee', () => {
    beforeEach(async () => {
      component.employeesList = ['Jon', 'Bran', 'Tyrion'];
      spyOn(component.db, 'get').and.returnValue(Promise.resolve({
        employees: ['Jon', 'Bran', 'Tyrion']
      }));
    });

    it('Should add new employees', async () => {
      spyOn(component.db, 'put').and.returnValue(Promise.resolve(true));
      await component.handleEmployee('Ned');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.employeesList).toEqual(['Jon', 'Bran', 'Tyrion', 'Ned']);
      });
    });
    it('Should add new employees', async () => {
      spyOn(component.db, 'put').and.returnValue(Promise.resolve(true));
      await component.handleEmployee('Jon');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.employeesList).toEqual(['Jon', 'Bran', 'Tyrion']);
      });
    });
  });
});
