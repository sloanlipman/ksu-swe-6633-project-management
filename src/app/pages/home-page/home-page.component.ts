import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePage extends AppComponent implements OnInit {
  currentProject: FormControl;
  selectedProject: any;
  projects: any[];
  db: any;
  constructor(
    protected router: Router,
    protected injector: Injector,
    private snackBar: MatSnackBar
  ) {
    super(injector);
  }

  ngOnInit() {
    this.currentProject = new FormControl();
    this.db = new PouchDB('pmonkey');
    this.getProjects();
  }

  getProjects() {
    this.db.get('projects').then((doc) => {
      this.projects = doc.projects;
      console.log(this.projects);
      this.currentProject.setValue(this.projects[0]);
    }).catch(err => console.log(err));
  }

  onSelectProject() {}

  editProject() {
    this.navigate('edit');
  }

  updateProject() {
    this.navigate('update');
  }

  navigate(page) {
    const name = this.currentProject.value;
    if (!name) {
      this.promptForCreateProject();
    } else {
      this.currentProjectName = name;
      console.log(this.currentProjectName);
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
