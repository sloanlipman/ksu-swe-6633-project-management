import { Component, OnInit, Inject, Injector } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

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
  db: any;
  employeesList = [];
  constructor(
    public dialog: MatDialog,
    protected router: Router,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.db = new PouchDB('pmonkey');
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
