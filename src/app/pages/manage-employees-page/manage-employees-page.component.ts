import { Component, OnInit, Inject, Injector } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
  constructor(
    public dialog: MatDialog,
    protected router: Router,
    protected injector: Injector,
    public snackBar: MatSnackBar
  ) {
    super(injector);
  }

  ngOnInit() {
    this.db = new PouchDB('pmonkey'); // Instantiate the DB

    this.db.get('employees').then((doc) => { // Retrieve the employees document
      console.log('Doc is', doc);
      doc.employees.forEach(emp => {
        this.employeesList.push(emp); // For each employee already in the DB, add to class variable array so UI will display
      });
    }).catch(err => console.log(err));
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: '450px',
      data: {
        name: undefined,
      }
    });

    dialogRef.afterClosed().subscribe(newName => { // Subscribe to the name entered in the Dialog
      this.db.get('employees').then((doc) => { // Get the employee document
        const empList = doc.employees; // Get the list of employees from the document
        let existingEmployee = false;

      // Check if the employee alredy exists
        doc.employees.forEach(emp => {
          if (newName === emp) {
            existingEmployee = true;
          }
        });

    // TODO check if newName is > 0 characters
    // If the employee is a new name, add it to the list
        if (!existingEmployee)  {
          empList.push(newName); // Add the new employee name to the document
          return this.db.put({ // Update the document in the DB
            _id: 'employees', // Keep the document name the same
            _rev: doc._rev, // Update the revision
            employees: empList // Update the employees field with our new list
          }).then(() => this.employeesList.push(newName));

      // Otherwise, notify the user that the employee was already there!
       } else {
        this.snackBar.open('Employee already exists', '', { // Display error to the user
          duration: 3000,
          verticalPosition: 'top',
        });
       } // If successful, push the new employee to the class variable the UI will show it
      }).catch(err => console.log(err)); // Catch errors
    });
  }

  removeEmployee(employee) {
    let idx;
    this.db.get('employees').then((doc) => { // Get the employee document
      const empList = doc.employees;
      idx = empList.indexOf(employee); // Find index of employee
      empList.splice(idx, 1); // Remove employee

    // Update the document
      return this.db.put({
        _id: 'employees',
        _rev: doc._rev,
        employees: empList
      }).then(() => {
        this.employeesList.splice(idx, 1); // Remove from UI
      });
    }).catch(err => console.log(err));
  }

}
