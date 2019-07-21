import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EditProjectPage } from './edit-project-page.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/app-material.module';
import PouchDB from 'pouchdb';
import { Project } from 'src/app/project-model';

let dbSpy;
let projectSpy;
let employeeListSpy;
let projectsListSpy;
let saveSpy;

describe('EditProjectPage', () => {
  let component: EditProjectPage;
  let fixture: ComponentFixture<EditProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProjectPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPage);
    component = fixture.componentInstance;
    dbSpy = spyOn(component, 'initializeDatabase').and.stub();
    projectSpy = spyOn(component, 'getProject').and.stub();
    employeeListSpy = spyOn(component, 'getEmployeeList').and.stub();
    projectsListSpy = spyOn(component, 'getProjectsList').and.stub();
    saveSpy = spyOn(component, 'save').and.stub();
    component.db = new PouchDB('pmonkey'); // Instantiate the DB
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should initialize', () => {
    expect(dbSpy).toHaveBeenCalled();
    expect(projectSpy).toHaveBeenCalled();
    expect(employeeListSpy).toHaveBeenCalled();
    expect(projectsListSpy).toHaveBeenCalled();
  });

  it('Should get project', () => {
    spyOn(component, 'getUrl').and.callFake(() => {
      return  '/edit/Proj123';
    });
    spyOn(component, 'loadProject').and.stub();
    projectSpy.and.callThrough();
    component.getProject();
    fixture.detectChanges();
    expect(component.currentProjectName).toEqual('Proj123');
    expect(component.loadProject).toHaveBeenCalled();
  });

  it('Should load project', async () => {
    component.currentProjectName = 'proj123';
    spyOn(component.db, 'get').and.returnValue(Promise.resolve({
      description: 'Some desc',
      teamMembers: ['Bob', 'Carol'],
      projectManager: 'Clark',
      risks: ['risk1'],
      requirements: ['req2'],
      tasks: []
    }));

    const p = new Project({
      id: 'proj123',
      description: 'Some desc',
      projectManager: 'Clark',
      teamMembers: ['Bob', 'Carol'],
      risks: ['risk1'],
      requirements: ['req2'],
      tasks: []
    });

    await component.loadProject();
    fixture.detectChanges();
    // fixture.whenStable().then(() => {})
    expect(component.currentProject).toEqual(p);
  });

  it('Should delete a risk', () => {
    component.risksArray = ['r1', 'r2', 'r3'];
    component.deleteRisk('r2');
    expect(component.risksArray).toEqual(['r1', 'r3']);
  });

  it('Should delete a requirement', () => {
    component.requirementsArray = ['rq1', 'rq2', 'rq3'];
    component.deleteRequirement('rq1');
    expect(component.requirementsArray).toEqual(['rq2', 'rq3']);
  });

  it('Should save the project', () => {
    spyOn(component, 'saveProject').and.stub();
    component.currentProject = new Project({
      id: '',
      description: '',
      projectManager: '',
      teamMembers: [],
      requirements: [],
      risks: [],
      tasks: ['task 1']
    });
    component.currentProjectName = 'testProj';
    component.generalInfo.controls.projectDescription.setValue('Description');
    component.teamMembers.setValue(['John']);
    component.projectManager.setValue('Jake');
    component.requirementsArray = ['Requirement #1'];
    component.risksArray = ['Risk #1'];
    saveSpy.and.callThrough();
    component.save();
    const expectedCall = new Project({
      id: 'testProj',
      description: 'Description',
      projectManager: 'Jake',
      teamMembers: ['John'],
      requirements: ['Requirement #1'],
      risks: ['Risk #1'],
      tasks: ['task 1']
    });
    expect(component.saveProject).toHaveBeenCalledWith(expectedCall);
  });

  it('Should trigger a save during a manual save', () => {
    component.manualSave('Description');
    expect(saveSpy).toHaveBeenCalled();
  });

});
