import { Component, OnInit, Inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface EmployeeDataDialog {
  name: string;
}

@Component({
  selector: 'add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeeDialog {

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddEmployeeDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'manage-employees-page',
  templateUrl: './manage-employees-page.component.html',
  styleUrls: ['./manage-employees-page.component.css']
})
export class ManageEmployeesPage extends AppComponent implements OnInit {
  employees: any;
  employeesList = [];
  constructor(
    public dialog: MatDialog
  ) {
    super();
    this.employees = new PouchDB('employees');
  }

  ngOnInit() {
  //   this.employees.bulkDocs([
  //     {
  //       _id: '1',
  //       name: 'Alfred Pennyworth',
  //     },
  //     {
  //       _id: '2',
  //       name: 'Selina Kyle',
  //     },
  //     {
  //       _id: '3',
  //       name: 'Bruce Wayne',
  //     }, {
  //       _id: '4',
  //       name: 'Jim Gordon'
  //     },
  //     {
  //       _id: '5',
  //       name: 'Tim Drake'
  //     },
  //     {
  //       _id: '6',
  //       name: 'Lucius Fox'
  //     }
  //   ]).then(() => {
  //     return this.employees.allDocs({
  //       include_docs: true
  //     });
  //   }).then((response) => {
  //     for (const row of response.rows) {
  //       this.employeesList.push(row.doc.name);
  //     }
  //     console.log(response);
  //   }).then((err) => {
  //     console.log(err);
  //   });

  //   // for (let i = 0; i < this.employees.allDocs(); ++i) {
  //   //   this.employeesList.push(this.employees[i].name);
  //   // }

  //   console.log(this.employeesList);
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: '450px',
      data: {
        name: undefined,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Push result to an array containing employee so that it will populate on the UI
    });
  }

}
