import { Component, OnInit, Inject, Injector } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export interface EmployeeDataDialog {
  name: string;
}

@Component({
  selector: 'add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeeDialog {
    name: any;
    newEmployeeForm: FormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required])
    });

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddEmployeeDialog,
    private formBuilder: FormBuilder) {}


  onCancel(): void {
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
  employeesList: any[] = [];
  constructor(
    protected dialog: MatDialog,
    protected router: Router,
    protected injector: Injector,
    protected snackBar: MatSnackBar
  ) {
    super(injector, router, snackBar, dialog);
  }

  ngOnInit() {
    this.initializeDatabase();
    this.getEmployees();
  }

  getEmployees() {
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

    dialogRef.afterClosed().subscribe(result => { // Subscribe to the name entered in the Dialog
      const newName = result.get('name').value;
      this.handleEmployee(newName);
  });
}

  handleEmployee(newEmployee: string) {
    this.db.get('employees').then((doc) => { // Get the employee document
      const empList = doc.employees; // Get the list of employees from the document
      let existingEmployee = false;

    // Check if the employee alredy exists
      doc.employees.forEach(emp => {
        if (newEmployee.toLowerCase() === emp.toLowerCase()) {
          existingEmployee = true;
        }
      });

  // If the employee is a new name, add it to the list
      if (!existingEmployee)  {
        empList.push(newEmployee); // Add the new employee name to the document
        return this.db.put({ // Update the document in the DB
          _id: 'employees', // Keep the document name the same
          _rev: doc._rev, // Update the revision
          employees: empList // Update the employees field with our new list
        }).then(() => this.employeesList.push(newEmployee));

    // Otherwise, notify the user that the employee was already there!
     } else {
      this.snackBar.open('Employee already exists!', '', { // Display error to the user
        duration: 3000,
        verticalPosition: 'top',
      });
     } // If successful, push the new employee to the class variable the UI will show it
    }).catch(err => console.log(err)); // Catch errors
  }

  removeEmployee(employee) {
    let idx;
    this.db.get('employees').then((doc) => { // Get the employee document
      console.log('got', doc);
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
        console.log('final emp list', this.employeesList);
      });
    }).catch(err => console.log(err));
  }

}
