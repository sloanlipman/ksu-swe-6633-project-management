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
  projects: any[];
  db: any;

  @Input() refresh: boolean;
  constructor(
    protected dialog: MatDialog,
    protected router: Router,
    protected injector: Injector,
    protected snackBar: MatSnackBar
  ) {
    super(injector, router, snackBar, dialog);
  }

  ngOnInit() {
    this.currentProjectForm = new FormControl();
    this.db = new PouchDB('pmonkey');
    this.getProjects();
}

  getProjects() {
    this.db.get('projects').then((doc) => {
      this.projects = doc.projects;
      console.log(this.projects);
      this.currentProjectForm.setValue(this.projects[0]);
      // Get project details as well
    }).catch(err => console.log(err));
  }

  editProject() {
    this.navigate('edit');
  }

  updateProject() {
    this.navigate('update');
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
    const dialogRef = this.dialog.open(NewProjectDialog, {
      width: '400px',
      data: {
        name: undefined,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const projectName = result.get('projectName').value.replace(/\s+/g, '');
      let existingProject = false;
      this.db.get('projects').then((doc) => {
          console.log('got list of projects', doc);
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
          this.projects.push(this.currentProject);
          this.saveProject(this.currentProject);


          if (this.employeesList.length === 0) {
            this.router.navigateByUrl('/employees');
          } else {
            this.router.navigateByUrl('/edit/' + this.currentProject.id);
          }
        } else {
            this.snackBar.open('Project already exists!', '', { // Display error to the user
              duration: 3000,
              verticalPosition: 'top',
            });
        }
      }).catch(err => console.log(err));
    });
  }
}
