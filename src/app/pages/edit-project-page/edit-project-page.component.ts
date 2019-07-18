  import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, Inject, Injector } from '@angular/core';
  import { AppComponent } from 'src/app/app.component';
  import PouchDB from 'pouchdb';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
  import { Router } from '@angular/router';
  import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

  export interface RiskDialogData {
    name: string;
    description: string;
    likelihood: number;
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
    styleUrls: ['./edit-project-page.component.css']
  })
  export class AddRiskDialog {
    riskDialogForm: FormGroup = this.formBuilder.group({
      riskName: new FormControl('', [Validators.required]),
      riskDescription: new FormControl('', [Validators.required]),
      riskLikelihood: new FormControl('', [Validators.required]),
    });

    constructor(
      public dialogRef: MatDialogRef<AddRiskDialog>,
      @Inject(MAT_DIALOG_DATA) public data: RiskDialogData,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar) {}

    onCancel(): void {
      this.dialogRef.close();
    }

    validateLikelihood() {
      if (this.data.likelihood > 99.9 || this.data.likelihood < 0.1) {
        this.data.likelihood = null;
        this.snackBar.open('Likelihood must be between 0.1% and 99.9%', '', { // Display a success message to the user!
          duration: 3000,
          verticalPosition: 'top',
        });
      }

    }
  }


  @Component({
    selector: 'add-requirement',
    templateUrl: 'add-requirement.html',
    styleUrls: ['./edit-project-page.component.css']
  })
  export class AddRequirementDialog {
      reqDialogForm: FormGroup = this.formBuilder.group({
        reqName: new FormControl('', [Validators.required]),
        reqDescription: new FormControl('', [Validators.required]),
        reqCategory: new FormControl('', [Validators.required]),
        reqPriority: new FormControl('', [Validators.required])
      });

    constructor(
      public dialogRef: MatDialogRef<AddRequirementDialog>,
      @Inject(MAT_DIALOG_DATA) public data: RequirementDialogData,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar
      ) {}

    onCancel(): void {
      this.dialogRef.close();
    }

  }

  @Component({
    selector: 'edit-project-page',
    templateUrl: './edit-project-page.component.html',
    styleUrls: ['./edit-project-page.component.css']
  })
  export class EditProjectPage extends AppComponent implements OnInit {
    db: any;
    employeesList: any[];
    generalInfo: FormGroup;
    teamMembers: FormControl;
    projectManager: FormControl;
    requirementsArray: any[];
    risksArray: any[];


    constructor(
      public dialog: MatDialog,
      protected router: Router,
      protected injector: Injector,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar
    ) {
      super(injector);
    }

    ngOnInit() {
      this.getEmployeeList();
      this.getFormControls();
      this.getProjectsList();
      this.requirementsArray = [];
      this.risksArray = [];
      if (this.router.url !== '/edit/new') {
        // Load data
      }
    }

    getEmployeeList() {
      this.db = new PouchDB('pmonkey');
      this.db.get('employees').then((doc) => {
        this.employeesList = doc.employees;
      }).catch(err => console.log(err));
    }

    getFormControls() {
      this.generalInfo = this.formBuilder.group({
        projectName: new FormControl('', [Validators.required]),
        projectDescription: new FormControl('', [Validators.required]),
      });
      this.teamMembers = new FormControl();
      this.projectManager = new FormControl(); // TODO can project manager also be on the team? Should it auto select, auto-deselect?3
                                                // "On the team" means you can assign work to them, then yes.
                                                // Otherwise, can only get PM duties?
    }

    compare(c1: any, c2: any) {
      return c1 && c2 && c1 === c2;
    }

    addRisk() {
      const dialogRef = this.dialog.open(AddRiskDialog, {
        width: '450px',
        data: {
          name: undefined,
          description: undefined,
          likelihood: undefined
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.risksArray.push({
          name: result.name,
          description: result.description,
          likelihood: result.likelihood
        });
      });
    }

    addRequirement() {
      const dialogRef = this.dialog.open(AddRequirementDialog, {
        width: '450px',
        data: {
          name: undefined,
          description: undefined,
          category: undefined,
          priority: undefined,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.requirementsArray.push({
          name: result.name,
          description: result.description,
          category: result.category,
          priority: result.priority,
        });
      });
    }

    editRisk(risk) {
      const dialogRef = this.dialog.open(AddRiskDialog, {
        width: '450px',
        data: {
          name: risk.name,
          description: risk.description
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        risk = {
          name: result.name,
          description: result.description
        };
      });
    }

    deleteRisk(risk) {
      const index = this.risksArray.indexOf(risk);
      this.risksArray.splice(index, 1);
    }

    editRequirement(requirement) {
      const index = this.requirementsArray.indexOf(requirement);
      const dialogRef = this.dialog.open(AddRequirementDialog, {
        width: '450px',
        data: {
          name: requirement.name,
          description: requirement.description,
          category: requirement.category,
          priority: requirement.priority
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.requirementsArray[index] = {
          name: result.name,
          description: result.description,
          category: result.category,
          priority: result.priority
          };
        });
    }

    deleteRequirement(requirement) {
      const index = this.requirementsArray.indexOf(requirement);
      this.requirementsArray.splice(index, 1);
    }

    get f() {
      return this.generalInfo.controls;
    }

    save() {
      const id = this.f.projectName.value;
      const desc = this.f.projectDescription.value;
      const team = this.teamMembers.value;
      const manager = this.projectManager.value;
      console.log(this.f.projectName.value);
      console.log(this.f.projectDescription.value);
      // Step 1: Create a document for this project
      if (!this.generalInfo.invalid) {
        this.db.get(id).catch((err) => { // Try to get the project by ID
          if (err.name === 'not_found') { // If project is not found
            return { // Return a new document
              _id: id,
              description: desc,
              projectManager: manager,
              teamMembers: team,
              requirements: this.requirementsArray,
              risks: this.risksArray,

            };
          } else {
              console.log(err); // Catch other errors
          }
        }).then((doc) => { // Project document was found
          this.db.put({ // Update document
            _id: id,
            _rev: doc._rev,
            description: desc,
            projectManager: manager,
            teamMembers: team,
            requirements: this.requirementsArray,
            risks: this.risksArray,
            tasks: []
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));

      // Step 2 Add this project to a list of projects in the same manner
        this.db.get('projects').catch((err) => {
          if (err.name === 'not_found') {
            return {
              _id: 'projects',
              projects: [id] // Needs to be an array!
            };
          } else {
            console.log(err);
          }
        }).then((doc) => {
            const projectList = doc.projects;

            if (!projectList.includes(id)) {
              projectList.push(id);
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
            this.db.get(id).then((document) => {
              console.log(document);
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }
    }
  }
