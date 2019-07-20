import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage, NewProjectDialog } from './home-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import PouchDB from 'pouchdb';
import { MockDialog } from 'src/app/mock-dialog';
import { MatDialog, MatDialogModule } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Project } from 'src/app/project-model';

let dbSpy;
let getProjectsSpy;
let changeProjectSpy;
let mockTask;
const TEST_DIRECTIVES = [
  NewProjectDialog
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    NewProjectDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class DialogTestModule { }

xdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DialogTestModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialog, useClass: MockDialog },
        { provide: OverlayContainer, useFactory: () => {
          const overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.db = new PouchDB('pmonkey'); // Instantiate the DB
    spyOn(component['dialog'], 'open').and.callThrough();
    dbSpy = spyOn(component, 'initializeDatabase').and.stub();
    getProjectsSpy = spyOn(component, 'getProjects').and.stub();
    changeProjectSpy = spyOn(component, 'changeProject').and.stub();
    component.currentProject = new Project({
      id: null,
      description: null,
      projectManager: null,
      teamMembers: [],
      requirements: [],
      risks: [],
      tasks: []
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Navigation', () => {
    beforeEach(() => {
      spyOn(component['router'], 'navigateByUrl').and.stub();
    });
    it('Should call navigate with "edit"', () => {
      const navSpy = spyOn(component, 'navigate').and.stub();
      component.editProject();
      expect(navSpy).toHaveBeenCalledWith('edit');
    });

    it('Should call navigate with "edit" if no requirements or team members are added to the project', () => {
      const navSpy = spyOn(component, 'navigate').and.stub();
      component.updateProject();
      expect(navSpy).toHaveBeenCalledWith('edit');
    });

    it('Should call navigate with "update" if there are requirements and team members', () => {
      component.currentProject.requirements = ['R1'];
      component.currentProject.teamMembers = ['Jim'];
      const navSpy = spyOn(component, 'navigate').and.stub();
      component.updateProject();
      expect(navSpy).toHaveBeenCalledWith('update');
    });

    it('Should prompt to create a project instead of navigating', () => {
      component.currentProjectForm.setValue(null);
      spyOn(component, 'promptForCreateProject').and.stub();
      component.navigate('edit');
      expect(component.promptForCreateProject).toHaveBeenCalled();
    });

    it('Should perform navigate()', () => {
      component.currentProjectForm.setValue('Project');
      component.navigate('edit');

      expect(component.currentProjectName).toEqual('Project');
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/edit/Project');
    });
  });

  it('Should get projects', async () => {
      spyOn(component.db, 'get').and.returnValue(Promise.resolve({
        projects: ['a', 'b', 'c']
      }));
      getProjectsSpy.and.callThrough();
      await component.getProjects();
      fixture.whenStable().then(() => {
        expect(component.currentProjectForm.value).toEqual('a');
        expect(changeProjectSpy).toHaveBeenCalled();
      });
    });

  it('Should create a project when there are none', async () => {
    spyOn(component.db, 'get').and.returnValue(Promise.resolve({
      projects: []
    }));
    spyOn(component, 'createProject').and.stub();
    getProjectsSpy.and.callThrough();
    await component.getProjects();
    fixture.whenStable().then(() => {
      expect(component.createProject).toHaveBeenCalled();
    });
  });

  it('Should change projects', async () => {
    component.requirementsList = [];
    component.riskList = [];
    component.taskList = [];
    spyOn(component.db, 'get').and.returnValue(Promise.resolve({
      id: 'abc',
      description: 'Description',
      teamMembers: ['Jim', 'Jane'],
      projectManager: 'Megan',
      requirements: ['R1', 'R2'],
      risks: ['Risk123'],
      tasks: ['t1', 't2']
    }));
    changeProjectSpy.and.callThrough();
    const expectedProject = new Project({
      id: 'abc',
      description: 'Description',
      teamMembers: ['Jim', 'Jane'],
      projectManager: 'Megan',
      requirements: ['R1', 'R2'],
      risks: ['Risk123'],
      tasks: ['t1', 't2']
    });
    await component.changeProject('abc');
    expect(component.currentProject).toEqual(expectedProject);
  });

  describe('Should handle submitting the dialog', async () => {
    beforeEach(async () => {
      spyOn(component.db, 'get').and.returnValue(Promise.resolve({
        projects: ['a', 'b', 'c']
      }));
      spyOn(component, 'saveProject').and.stub();
      spyOn(component['router'], 'navigateByUrl').and.stub();
    });

    it('Should not navigate for an existing project', async () => {
      await component.handleProjectSubmission('a');
      expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
    });

    it('Should go to employees list if there aren\'t any', async () => {
      component.employeesList = [];
      await component.handleProjectSubmission('d');
      expect(component.saveProject).toHaveBeenCalled();
      expect(component.currentProject.id).toEqual('d');
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/employees');
    });
  });

  describe('Tasks time remaining', () => {
    beforeEach(() => {
      mockTask = {
        name: 'T1',
        description: 'Task Description',
        requirement: 'R1',
        estReqs: 10,
        loggedReqs: 0,
        estDesign: 10,
        loggedDesign: 0,
        estCode: 10,
        loggedCode: 0,
        estTest: 10,
        loggedTest: 0,
        estManagement: 10,
        loggedManagement: 0,
        assignedTo: 'Sloan',
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isManagementCompleted: false,
        teamList: ['Sloan'],
        requirementsList: ['R1', 'R2']
      };
    });
    it('Should get reqs time remaining', () => {
      const value = component.getRequirementsTimeRemaining(mockTask);
      expect(value).toEqual(10);
    });

    it('Should get designing time remaining', () => {
      const value = component.getDesigningTimeRemaining(mockTask);
      expect(value).toEqual(10);
    });

    it('Should get coding time remaining', () => {
      const value = component.getCodingTimeRemaining(mockTask);
      expect(value).toEqual(10);
    });

    it('Should get testing time remaining', () => {
      const value = component.getTestingTimeRemaining(mockTask);
      expect(value).toEqual(10);
    });

    it('Should get management time remaining', () => {
      const value = component.getManagementTimeRemaining(mockTask);
      expect(value).toEqual(10);
    });
  });

  describe('Overdue tasks', () => {
    beforeEach(() => {
      mockTask = {
        name: 'T1',
        description: 'Task Description',
        requirement: 'R1',
        estReqs: 10,
        loggedReqs: 11,
        estDesign: 10,
        loggedDesign: 11,
        estCode: 10,
        loggedCode: 11,
        estTest: 10,
        loggedTest: 11,
        estManagement: 10,
        loggedManagement: 11,
        assignedTo: 'Sloan',
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isManagementCompleted: false,
        teamList: ['Sloan'],
        requirementsList: ['R1', 'R2']
      };
    });

    it('Should get reqs overdue time', () => {
      const value = component.getRequirementsTimeRemaining(mockTask);
      expect(value).toEqual('Overdue by 1');
    });

    it('Should get designing overdue time', () => {
      const value = component.getDesigningTimeRemaining(mockTask);
      expect(value).toEqual('Overdue by 1');
    });

    it('Should get coding overdue time', () => {
      const value = component.getCodingTimeRemaining(mockTask);
      expect(value).toEqual('Overdue by 1');
    });

    it('Should get testing overdue time', () => {
      const value = component.getTestingTimeRemaining(mockTask);
      expect(value).toEqual('Overdue by 1');
    });

    it('Should get management overdue time', () => {
      const value = component.getManagementTimeRemaining(mockTask);
      expect(value).toEqual('Overdue by 1');
    });
  });
});
