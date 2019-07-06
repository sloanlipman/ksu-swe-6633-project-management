import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'project-management';
  // employeeCount = 0;

  // projects: any;
  // employees: any;

  // ngOnInit() {
  //   this.projects = new PouchDB('projects');
  //   this.employees = new PouchDB('employees');
  //   this.addEmployee();

  //   this.projects.put({
  //     _id: 'Project ABC',
  //     owner: 'Bruce Wayne',
  //     members: [
  //       {
  //         name: 'Alfred Pennyworth',
  //       },
  //       {
  //         name: 'Selena Kyle',
  //       }
  //     ],
  //     requirements: [
  //       {
  //         name: 'ease of use'
  //       },
  //       {
  //         name: 'scalable'
  //       }
  //     ],
  //     tasks: [
  //       {
  //         name: 'task 1',
  //         assignedTo: [
  //           'Alfred Pennyworth'
  //         ],
  //         requirements: [
  //           'easeOfUse'
  //         ],
  //         status: {
  //           requirementsAnalysis: {
  //             estimatedTime: 5, // units are a known value that we have listed somewhere
  //             loggedTime: 5,
  //             status: 'complete'
  //           },
  //           designing: {
  //             estimatedTime: 10,
  //             loggedTime: 2,
  //             status: 'in progress'
  //           },
  //           coding: {
  //             estimatedTime: 20,
  //             loggedTime: 0,
  //             status: 'todo'
  //           },
  //           testing: {
  //             estimatedTime: 20,
  //             loggedTime: 0,
  //             status: 'todo'
  //           },
  //           projectManagement: {
  //             estimatedTime: 40,
  //             loggedTime: 5,
  //             status: 'in progress'
  //           }
  //         }
  //       },
  //       {
  //         name: 'task 2',
  //         assignedTo: [
  //           'Alfred Pennyworth',
  //           'Selena Kyle'
  //         ],
  //         requirements: [
  //           'easeOfUse',
  //           'scalable'
  //         ],
  //         status: {
  //           requirementsAnalysis: {
  //             estimatedTime: 5, // units are a known value that we have listed somewhere
  //             loggedTime: 5,
  //             status: 'complete'
  //           },
  //           designing: {
  //             estimatedTime: 10,
  //             loggedTime: 2,
  //             status: 'in progress'
  //           },
  //           coding: {
  //             estimatedTime: 20,
  //             loggedTime: 0,
  //             status: 'todo'
  //           },
  //           testing: {
  //             estimatedTime: 20,
  //             loggedTime: 0,
  //             status: 'todo'
  //           },
  //           projectManagement: {
  //             estimatedTime: 40,
  //             loggedTime: 5,
  //             status: 'in progress'
  //           }
  //         }
  //       },
  //     ]
  //   });


    // this.employees.bulkDocs([
    //   {
    //     _id: '1',
    //     name: 'Jimmy',
    //   },
    //   {
    //     _id: '2',
    //     name: 'Elizabeth',
    //   },
    //   {
    //     _id: '3',
    //     name: 'Megan',
    //   }
    // ]).then(() => {
    //   return employees.allDocs({
    //     include_docs: true
    //   });
    // }).then((response) => {
    //   console.log(response);
    // }).then((err) => {
    //   console.log(err);
    // });


  // }

  // getEmployeeCount() {
  //   return new Promise((resolve) => {
  //     this.employees.info().then((info) => {
  //     this.employeeCount = info.doc_count;
  //     resolve();
  //     });
  //   });
  // }

  //  addEmployee() {
  //    this.getEmployeeCount().then(() => {
  //     console.log('# emps', this.employeeCount);
  //     const newEmployee = {
  //       _id: (this.employeeCount + 1).toString(),
  //       name: 'Jill',
  //       age: '21'
  //     };

  //     this.employees.put(newEmployee).then(() => {
  //       return this.employees.allDocs({
  //             include_docs: true
  //         }).then((response) => {
  //           if (response) {
  //           console.log(response);
  //         }
  //         }).then((err) => {
  //           if (err) {
  //           console.log(err);
  //         }
  //         });
  //     });
  //   });
  // }
}
