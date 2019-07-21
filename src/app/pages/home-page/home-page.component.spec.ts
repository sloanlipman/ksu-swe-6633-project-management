import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage, NewProjectDialog } from './home-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import PouchDB from 'pouchdb';
import { MockDialog } from 'src/app/mock-dialog';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';

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

describe('HomePage', () => {
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

    it('Should call navigate with "update"', () => {
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
    await component.getProjects();
    expect(component.currentProjectForm.value).toEqual('a');
  });

  // it('Should create project and navigate to employees page', async () => {
  //   component.employeesList = [];
  //   spyOn(component.db, 'get').and.returnValue(Promise.resolve({
  //     projects: ['New Project']
  //   }));
  //   spyOn(component, 'handleProjectSubmission').and.stub();
  //   await component.createProject();
  //   fixture.detectChanges();
  //   // spyOn(component['dialogRef'], 'afterClosed').and.callFake(() => {
  //   //   const form: FormGroup = component['formBuilder'].group({
  //   //     projectName: new FormControl('', [Validators.required])
  //   //   });
  //   //   form.controls.projectName.setValue('Old Project');
  //   //   return of(form);
  //   // });
  //   fixture.whenStable().then(() => {
  //     expect(component.handleProjectSubmission).toHaveBeenCalled();
  //   });
  // });

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
    it('Should go to edit project page if there are employees', async () => {
      component.employeesList = ['John'];
      await component.handleProjectSubmission('d');
      expect(component.saveProject).toHaveBeenCalled();
      expect(component.currentProject.id).toEqual('d');
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/edit/d');
    });

  });
});
