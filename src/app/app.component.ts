import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-management';
  employeeCount = 0;

  db: any;

  employeesList = [];

  ngOnInit() {
    this.db = new PouchDB('pmonkey');
    // this.addEmployee();

  //   this.projects.put({
  //       _id: 'Project ABC',
  //       owner: 'Bruce Wayne',
  //       members: [
  //         {
  //           name: 'Alfred Pennyworth',
  //         },
  //         {
  //           name: 'Selina Kyle',
  //         }
  //       ],
  //       requirements: [
  //         {
  //           name: 'Ease of use',
  //           description: 'Product must be easy to use',
  //           category: 'non-functional',
  //           priority: 1
  //         },
  //         {
  //           name: 'scalable',
  //           description: 'Product scale well to enterprise-level systems',
  //           category: 'Non-functional',
  //           priority: 3
  //         }
  //       ],
  //       risks: [
  //         {
  //           name: 'New technology stack',
  //           description: 'We must learn the new technology quickly, or we will fall behind!'
  //         },
  //         {
  //           name: 'Requirements might change',
  //           description: 'Some requirements could change as we learn more about this project.'
  //         }
  //       ],
  //       tasks: [
  //         {
  //           name: 'task 1',
  //           assignedTo: [
  //             'Alfred Pennyworth'
  //           ],
  //           requirements: [
  //             'Ease of use'
  //           ],
  //           status: {
  //             requirementsAnalysis: {
  //               estimatedTime: 5,
  //               loggedTime: 5,
  //               completed: true
  //             },
  //             designing: {
  //               estimatedTime: 10,
  //               loggedTime: 2,
  //               completed: false
  //             },
  //             coding: {
  //               estimatedTime: 20,
  //               loggedTime: 0,
  //               completed: false
  //             },
  //             testing: {
  //               estimatedTime: 20,
  //               loggedTime: 0,
  //               completed: false
  //             },
  //             projectManagement: {
  //               estimatedTime: 40,
  //               loggedTime: 5,
  //              completed: false
  //             }
  //           }
  //         },
  //         {
  //           name: 'task 2',
  //           assignedTo: [
  //             'Selina Kyle'
  //           ],
  //           requirements: [
  //             'easeOfUse',
  //             'scalable'
  //           ],
  //           status: {
  //             requirementsAnalysis: {
  //               estimatedTime: 5,
  //               loggedTime: 5,
  //               completed: false
  //             },
  //             designing: {
  //               estimatedTime: 10,
  //               loggedTime: 2,
  //               completed: false
  //             },
  //             coding: {
  //               estimatedTime: 20,
  //               loggedTime: 0,
  //               completed: false
  //             },
  //             testing: {
  //               estimatedTime: 20,
  //               loggedTime: 0,
  //               completed: false
  //             },
  //             projectManagement: {
  //               estimatedTime: 40,
  //               loggedTime: 5,
  //               completed: false
  //             }
  //           }
  //         },
  //       ]
  //     });
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
  }
}
