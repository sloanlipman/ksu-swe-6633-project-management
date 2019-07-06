import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';


@Component({
  selector: 'manage-employees-page',
  templateUrl: './manage-employees-page.component.html',
  styleUrls: ['./manage-employees-page.component.css']
})
export class ManageEmployeesPage extends AppComponent implements OnInit {
  employees: any;
  employeesList = [];
  constructor() {
    super();
    this.employees = new PouchDB('employees');
  }

  ngOnInit() {
    this.employees.bulkDocs([
      {
        _id: '1',
        name: 'Alfred Pennyworth',
      },
      {
        _id: '2',
        name: 'Selina Kyle',
      },
      {
        _id: '3',
        name: 'Bruce Wayne',
      }, {
        _id: '4',
        name: 'Jim Gordon'
      },
      {
        _id: '5',
        name: 'Tim Drake'
      },
      {
        _id: '6',
        name: 'Lucius Fox'
      }
    ]).then(() => {
      return this.employees.allDocs({
        include_docs: true
      });
    }).then((response) => {
      for (const row of response.rows) {
        this.employeesList.push(row.doc.name);
      }
      console.log(response);
    }).then((err) => {
      console.log(err);
    });

    // for (let i = 0; i < this.employees.allDocs(); ++i) {
    //   this.employeesList.push(this.employees[i].name);
    // }

    console.log(this.employeesList);
  }

}
