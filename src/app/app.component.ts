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
  currentProject: Project;
  projects: Project[] = [];
  employeesList: string[] = [];
  db: any;


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
    this.db = new PouchDB('pmonkey');
    this.db.put({ // TODO should only put if does not exist -- low priority.
                  // Technically not interfering, but it does catch an error it doesn't need to catch
                  // because it doesn't need to even be putting a new doc here.
      _id: 'projects',
      projects: []
    }).catch(err => console.log(err));


    this.db.put({ // TODO should only put if does not exist
      _id: 'employees',
      employees: []
    }).catch(err => console.log(err));

    this.getEmployeeList();
    console.log('employees', this.employeesList);
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
      }).then(() => {
        this.db.get(p.id).then((document) => {
      console.log('149', document);
    }).catch(err => console.log(err));
      }).catch(err => console.log(err));
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
      const projectList = doc.projects;

      if (!projectList.includes(p.id)) {
        projectList.push(p.id);
      }

      return this.db.put({
        _id: 'projects',
        _rev: doc._rev,
        projects: projectList
      }).then(() => {
        this.snackBar.open('Project saved!', '', { // Display a success message to the user!
          duration: 3000,
          verticalPosition: 'top',
        });
          // Verify that everything worked. We can delete this .then() block when we are sure of the methods
          }).then(() => {
            this.db.get(p.id).then((document) => {
          console.log(document);
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
}
