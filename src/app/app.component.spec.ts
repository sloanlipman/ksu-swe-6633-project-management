import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import PouchDB from 'pouchdb';
import { Project } from './project-model';

let ngOnInitSpy;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ngOnInitSpy = spyOn(component, 'ngOnInit').and.stub();
    fixture.detectChanges();

  });

  afterEach(() => {
    fixture.destroy();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('App component functions', () => {
    beforeEach(() => {
      component.db = new PouchDB('pmonkey'); // Instantiate the DB
    });

    it('Should call ngOnInit', () => {
      ngOnInitSpy.and.callThrough();
      const initializeDbSpy = spyOn(component, 'initializeDatabase').and.stub();
      const employeeSpy = spyOn(component, 'getEmployeeList').and.stub();
      component.ngOnInit();
      expect(initializeDbSpy).toHaveBeenCalled();
      expect(employeeSpy).toHaveBeenCalled();
    });
    it('Should navigate home', () => {
      spyOn(component['router'], 'navigateByUrl');
      component.navigateHome();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('Should navigate to employees page', () => {
      spyOn(component['router'], 'navigateByUrl');
      component.manageEmployees();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/employees');
    });

    it('Should look for a list of projects', () => {
      spyOn(component.db, 'get').and.callThrough();
      component.getProjectsList();
      expect(component.db.get).toHaveBeenCalled();
    });

    it('Should return a list of employees', async () => {
      const empList = ['Bruce Wayne', 'Lucius Fox'];
      component.db.put({
        _id: 'employees',
        employees: empList
      }).catch(err => console.log(err));

      spyOn(component.db, 'get').and.callFake(() => {
        const doc = {
          _id: 'employees',
          employees: empList
        };
        return Promise.resolve(doc);
      });
      await component.getEmployeeList();
      fixture.detectChanges();
      expect(component.employeesList).toEqual(empList);
    });

    it('Should save the project', async () => {
      const p: Project = new Project({
        id: 'Project',
        description: 'desc',
        projectManager: 'Oliver Queen',
        teamMembers: ['Speedy', 'Arsenal'],
        requirements: [],
        risks: [],
        tasks: []
      });

      component.db.put({
        _id: 'projects',
        projects: []
      }).catch(err => console.log(err));
      const projects = [];
      const getSpy = spyOn(component.db, 'get').and.returnValues(Promise.resolve(p), Promise.resolve({
        projects: ['a', 'b', 'c']
      }));
      await component.saveProject(p);
      expect(getSpy).toHaveBeenCalledTimes(2);
    });
  });
});
