import { Component, OnInit, Injector, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from 'src/app/project-model';

export interface NewProjectDialogData {
  name: string;
}

@Component({
  templateUrl: 'new-project.html',
})
export class NewProjectDialog {
  newProjectDialogForm: FormGroup = this.formBuilder.group({
    projectName: new FormControl('', [Validators.required])
  });
  constructor(
    public dialogRef: MatDialogRef<NewProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewProjectDialogData,
    private formBuilder: FormBuilder
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePage extends AppComponent implements OnInit {
  currentProjectForm: FormControl;
  selectedProject: any;
  currentProjectName: string;
  projects: any[] = [];
  employeesList: string[] = [];
  requirementsList: string[] = [];
  riskList: string[] = [];
  taskList: any[] = [];
  db: any;
  dialogRef: MatDialogRef<NewProjectDialog>;

  @Input() refresh: boolean;
  constructor(
    protected dialog: MatDialog,
    protected router: Router,
    protected injector: Injector,
    protected snackBar: MatSnackBar
  ) {
    super(injector, router, snackBar, dialog);
    this.currentProject = new Project({
      id: null,
      description: null,
      projectManager: null,
      teamMembers: [],
      requirements: [],
      risks: [],
      tasks: []
    });
  }

  ngOnInit() {
    this.currentProjectForm = new FormControl();
    this.initializeDatabase();
    this.getEmployeeList();
    this.getProjects();
}

  getProjects() {
    this.db.get('projects').catch(err => {
      if (err.name === 'not_found') {
        this.createProject();
      }
    }).then((doc) => {
      if (doc.projects.length === 0) {
        this.createProject();
      } else {
      this.projects = doc.projects;
      console.log(this.projects);
      this.currentProjectForm.setValue(this.projects[0]);
      this.changeProject(this.projects[0]);
    }
    }).catch(err => console.log(err));
  }

  changeProject(selectedProject) {
    this.currentProjectName = selectedProject;
    this.requirementsList = [];
    this.riskList = [];
    this.taskList = [];

    this.db.get(this.currentProjectName).then((doc) => {
      this.currentProject = new Project({
        id: doc.id,
        description: doc.description,
        projectManager: doc.projectManager,
        teamMembers: doc.teamMembers,
        requirements: doc.requirements,
        risks: doc.risks,
        tasks: doc.tasks
      });

      doc.requirements.forEach(req => {
        this.requirementsList.push(req);
      });

      doc.risks.forEach(risk => {
        this.riskList.push(risk);
      });

      doc.tasks.forEach(task => {
        this.taskList.push(task);
      });
    }).catch(err => console.log(err));
  }

  editProject() {
    this.navigate('edit');
  }

  updateProject() {
    if (this.currentProject.requirements.length === 0 || this.currentProject.teamMembers.length === 0) {
      this.snackBar.open('Your project needs at least one requirement and one team member before you can update the project.', '', {
        duration: 10000,
        verticalPosition: 'top',
      });
      this.navigate('edit');
    } else {
      this.navigate('update');
    }
  }

  navigate(page) {
    const name = this.currentProjectForm.value;
    if (!name) {
      this.promptForCreateProject();
    } else {
      this.currentProjectName = name;
      this.router.navigateByUrl('/' + page + '/' + name);
    }
  }

  promptForCreateProject() {
    this.snackBar.open('Please create a project first!', '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  createProject() {
    this.dialogRef = this.dialog.open(NewProjectDialog, {
      width: '360px',
      data: {
        name: undefined,
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      const projectName = result.get('projectName').value.replace(/\s+/g, '');
      this.handleProjectSubmission(projectName);
    });
  }

  handleProjectSubmission(projectName: string) {
    let existingProject = false;
    this.db.get('projects').then((doc) => {
      doc.projects.forEach(project => {
        if (project === projectName) {
          existingProject = true;
        }
      });

      if (!existingProject) {
      this.currentProject = new Project({
        id: projectName,
        description: null,
        projectManager: null,
        teamMembers: [],
        requirements: [],
        risks: [],
        tasks: []
      });
      this.projects.push(this.currentProject.id);
      this.currentProjectForm.setValue(projectName);
      this.saveProject(this.currentProject);

      if (this.employeesList.length === 0) {
        this.snackBar.open('Let\'s add some employees to your database!', '', { // Display error to the user
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigateByUrl('/employees');
      }
    } else {
        this.snackBar.open('Project already exists!', '', { // Display error to the user
          duration: 3000,
          verticalPosition: 'top',
        });
    }
    }).catch(err => console.log(err));
  }

  getRequirementsTimeRemaining(task) {
    if (task.estReqs >= task.loggedReqs) {
      return (task.estReqs - task.loggedReqs);
    } else {
      return ('Overdue by ' + (task.estReqs - task.loggedReqs) * -1);
    }
  }

  getDesigningTimeRemaining(task) {
    if (task.estDesign >= task.loggedDesign) {
      return (task.estDesign - task.loggedDesign);
    } else {
      return ('Overdue by ' + (task.estDesign - task.loggedDesign) * -1);
    }
  }

  getCodingTimeRemaining(task) {
    if (task.estCode >= task.loggedCode) {
      return (task.estCode - task.loggedCode);
    } else {
      return ('Overdue by ' + (task.estCode - task.loggedCode) * -1);
    }
  }

  getTestingTimeRemaining(task) {
    if (task.estTest >= task.loggedTest) {
      return (task.estTest - task.loggedTest);
    } else {
      return ('Overdue by ' + (task.estTest - task.loggedTest) * -1);
    }
  }

  getManagementTimeRemaining(task) {
    if (task.estManagement >= task.loggedManagement) {
      return (task.estManagement - task.loggedManagement);
    } else {
      return ('Overdue by ' + (task.estManagement - task.loggedManagement) * -1);
    }
  }

}
