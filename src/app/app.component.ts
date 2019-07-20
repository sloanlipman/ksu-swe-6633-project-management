import { Component, OnInit, Injector, Inject } from '@angular/core';
import PouchDB from 'pouchdb';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Project } from './project-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  protected location: Location;
  public currentProject: Project;
  public projects: Project[] = [];
  public employeesList: string[] = [];
  public db: any;
  public url: any;

  constructor(
      protected injector: Injector,
      protected router: Router,
      protected snackBar: MatSnackBar,
      protected dialog: MatDialog,
    ) {
      this.router = this.injector.get(Router);
      this.location = this.injector.get(Location);
    }

  ngOnInit() {
    console.log('inside ngoninit');
    this.initializeDatabase();
    this.getEmployeeList();
  }

  getUrl(): string {
    return this.router.url;
  }

  initializeDatabase() {
    console.log('getting database info');
    this.db = new PouchDB('pmonkey');
    this.db.get('projects').catch(err => {
      if (err.name === 'not_found') {
        return this.db.put({
          _id: 'projects',
          projects: []
        }).catch(error => console.log(error));
      }
    });

    this.db.get('employees').catch(err => {
      if (err.name === 'not_found') {
        return this.db.put({
          _id: 'employees',
          employees: []
        }).catch(error => console.log(error));
      }
    });
  }
  navigateHome() {
    this.router.navigateByUrl('/home');
  }

  manageEmployees() {
    this.router.navigateByUrl('/employees');
  }

  getProjectsList() {
    this.db.get('projects').catch(err => {
      if (err.name === 'not_found') {
        return {
          _id: 'projects',
          projects: []
        };
      }
    });
  }

  getEmployeeList(): any {
    const employees = [];
    this.db.get('employees').then((doc) => {
      doc.employees.forEach(employee => {
        console.log(employee);
        employees.push(employee);
      });
    }).catch(err => console.log(err));
    this.employeesList = employees;
    return employees;
  }

  saveProject(p: Project) {

  // Step 1 save the project
    this.db.get(p.id).catch((err) => {
      if (err.name === 'not_found') {
        return new Project({
          id: p.id,
          description: null,
          projectManager: null,
          teamMembers: [],
          requirements: [],
          risks: [],
          tasks: []
        });
      } else {
        console.log(err);
      }
    }).then((doc) => {
      this.db.put({
        _id: p.id,
        _rev: doc._rev,
        description: p.description,
        projectManager: p.projectManager,
        teamMembers: p.teamMembers,
        requirements: p.requirements,
        risks: p.risks,
        tasks: p.tasks
      });
    }).catch(err => console.log(err));

  // Step 2 Add this project to a list of projects in the same manner
    this.db.get('projects').catch((err) => {
    if (err.name === 'not_found') {
      return {
        _id: 'projects',
        projects: [p.id] // Needs to be an array!
      };
    } else {
      console.log(err);
    }
  }).then((doc) => {
    console.log('doc is', doc);
    const projectList = doc.projects;

    if (!projectList.includes(p.id)) {
        projectList.push(p.id);
      }

    return this.db.put({
        _id: 'projects',
        _rev: doc._rev,
        projects: projectList
      });
    }).catch(err => console.log(err));
  }
}
