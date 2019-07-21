import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectPage,  } from './update-project-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import PouchDB from 'pouchdb';
import { Project } from 'src/app/project-model';

let dbSpy;
let getUrlSpy;
let loadProjectSpy;

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
    dbSpy = spyOn(component, 'initializeDatabase').and.stub();
    getUrlSpy = spyOn(component, 'getUrl').and.returnValue('/update/TestProject');
    loadProjectSpy = spyOn(component, 'loadProject').and.stub();
    spyOn(component, 'saveProject').and.stub();
    component.db = new PouchDB('pmonkey'); // Instantiate the DB
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should load project', async () => {
    spyOn(component.db, 'get').and.returnValue(Promise.resolve({
      tasks: ['t1', 't2'],
      teamMembers: ['Jim', 'Jane'],
      requirements: ['R1', 'R2'],
      description: 'Description',
      projectManager: 'Megan',
      risks: ['Risk123']
    }));

    const expectedValue = new Project({
      id: 'TestProject',
      description: 'Description',
      teamMembers: ['Jim', 'Jane'],
      projectManager: 'Megan',
      requirements: ['R1', 'R2'],
      risks: ['Risk123'],
      tasks: ['t1', 't2']
    });
    loadProjectSpy.and.callThrough();
    await component.loadProject();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentProject).toEqual(expectedValue);
    });
  });

  it('Should return "completed"', () => {
    spyOn(component, 'getCompletedStatus').and.callThrough();
    const testQuery = component.getCompletedStatus(true);
    expect(testQuery).toEqual('completed');
  });

  it('Should return "inProgress"', () => {
    spyOn(component, 'getCompletedStatus').and.callThrough();
    const testQuery = component.getCompletedStatus(false);
    expect(testQuery).toEqual('inProgress');
  });

  it('Should return "Mark as Completed"', () => {
    spyOn(component, 'getButtonText').and.callThrough();
    const testQuery = component.getButtonText(false);
    expect(testQuery).toEqual('Mark as Completed');
  });

  it('Should return "Mark as In Progress"', () => {
    spyOn(component, 'getButtonText').and.callThrough();
    const testQuery = component.getButtonText(true);
    expect(testQuery).toEqual('Mark as In Progress');
  });

  it('Should toggle complete status of project tasks', () => {
    const task = {
      areRequirementsCompleted: false,
      isDesigningCompleted: false,
      isCodingCompleted: false,
      isTestingCompleted: false,
      isManagementCompleted: false
    };
    component.toggleCompleteCoding(task);
    component.toggleCompleteDesigning(task);
    component.toggleCompleteManagement(task);
    component.toggleCompleteRequirements(task);
    component.toggleCompleteTesting(task);

    expect(task).toEqual({
      areRequirementsCompleted: true,
      isDesigningCompleted: true,
      isCodingCompleted: true,
      isTestingCompleted: true,
      isManagementCompleted: true
    });
  });

  it('Should delete a task', () => {
    component.currentProject = new Project();
    component.tasksList = ['T1', 'T2', 'T3'];
    component.deleteTask('T2');
    const expectedValue = new Project({
      tasks: ['T1', 'T3']
    });
    expect(component.tasksList).toEqual(['T1', 'T3']);
    expect(component.saveProject).toHaveBeenCalledWith(expectedValue);
  });


});
