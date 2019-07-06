import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';


@Component({
  selector: 'edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.css']
})
export class EditProjectPage extends AppComponent implements OnInit {

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

  compare(c1: any, c2: any) {
    return c1 && c2 && c1 === c2;
  }

}
