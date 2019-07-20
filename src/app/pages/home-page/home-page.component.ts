import { Component, OnInit, Injector, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';



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
}
