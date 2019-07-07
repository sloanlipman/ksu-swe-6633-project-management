import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, Inject } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface RiskDialogData {
  name: string;
  description: string;
}

export interface RequirementDialogData {
  name: string;
  description: string;
  category: string;
  priority: number;
}


@Component({
  selector: 'add-risk',
  templateUrl: 'add-risk.html',
})
export class AddRiskDialog {

  constructor(
    public dialogRef: MatDialogRef<AddRiskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RiskDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'add-requirement',
  templateUrl: 'add-requirement.html',
})
export class AddRequirementDialog {

  constructor(
    public dialogRef: MatDialogRef<AddRequirementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RequirementDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.css']
})
export class EditProjectPage extends AppComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {
    super();
    // this.db = new PouchDB('employees');
  }

  ngOnInit() {

    this.db.put({
      _id: 'employees',
      employees: [
        'Alfred Pennyworth',
        'Selina Kyle',
        'Bruce Wayne',
        'Jim Gordon',
        'Tim Drake',
        'Lucius Fox'
      ]
    });
  //   this.db.bulkDocs([
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
  //     return this.db.allDocs({
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

  compare(c1: any, c2: any) {
    return c1 && c2 && c1 === c2;
  }

  addRisk() {
    const dialogRef = this.dialog.open(AddRiskDialog, {
      width: '450px',
      data: {
        name: undefined,
        description: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Push result to an array containing risks so that it will populate on the UI
      console.log('after closed', result);
    });
  }

  addRequirement() {
    const dialogRef = this.dialog.open(AddRequirementDialog, {
      width: '450px',
      data: {
        name: undefined,
        description: undefined,
        category: undefined,
        priority: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Push result to an array containing requirements so that it will populate on the UI
    });
  }

  editRisk() {

  }

  editRequirements() {

  }
}
