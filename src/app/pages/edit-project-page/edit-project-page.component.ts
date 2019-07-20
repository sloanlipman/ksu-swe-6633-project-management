  import { Component, OnInit, Inject, Injector, EventEmitter, Output } from '@angular/core';
  import { AppComponent } from 'src/app/app.component';
  import PouchDB from 'pouchdb';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
  import { Router } from '@angular/router';
  import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
  import { Project } from '../../project-model';

  export interface RiskDialogData {
    name: string;
    description: string;
    likelihood: any;
  }

  export interface RequirementDialogData {
    name: string;
    description: string;
    category: string;
    priority: number;
  }


  @Component({
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
      const chance = this.riskDialogForm.get('riskLikelihood').value;
      if (chance >= 100 || chance <= 0) {
        this.riskDialogForm.controls.riskLikelihood.setValue(null);
        this.snackBar.open('Likelihood must be between 1% and 99%', '', { // Display a success message to the user!
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    }
  }


  @Component({
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
    requirementsArray: any[] = [];
    risksArray: any[] = [];
    currentProjectName: string;

    constructor(
      protected dialog: MatDialog,
      protected router: Router,
      protected injector: Injector,
      private formBuilder: FormBuilder,
      protected snackBar: MatSnackBar
    ) {
      super(injector, router, snackBar, dialog);
    }

  ngOnInit() {
      this.db = new PouchDB('pmonkey');
      this.getEmployeeList();
      this.getFormControls();
      this.getProjectsList();
      this.getProject();
    }

    loadProject(): void {
      this.db.get(this.currentProjectName).then((doc) => {
        console.log('project is', doc);
        this.generalInfo.controls.projectDescription.setValue(doc.description);
        this.teamMembers.setValue(doc.teamMembers);
        this.projectManager.setValue(doc.projectManager);

        for (const risk of doc.risks) {
          this.risksArray.push(risk);
        }

        for (const req of doc.requirements) {
          this.requirementsArray.push(req);
        }

        this.currentProject = new Project({
          id: this.currentProjectName,
          description: doc.description,
          projectManager: doc.projectManager,
          teamMembers: doc.teamMembers,
          requirements: doc.requirements,
          risks: doc.risks,
          tasks: doc.tasks
        });

      }).catch(err => console.log(err));
    }

    getProject() {

      console.log('getting project');
      const name = this.router.url.split('/')[2]; // Last part of the URL is equal to the project name
      if (name === 'new') {
       } else {
        this.currentProjectName = name;
        this.loadProject();
      }
    }

    getFormControls() {
      this.generalInfo = this.formBuilder.group({
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
      const id = this.currentProjectName;
      const desc = this.f.projectDescription.value;
      const team = this.teamMembers.value;
      const manager = this.projectManager.value;
      const reqs = this.requirementsArray;
      const risks = this.risksArray;
      const tasks = this.currentProject.tasks;
      if (!this.generalInfo.invalid) {
        const p = new Project({
          id,
          description: desc,
          projectManager: manager,
          teamMembers: team,
          requirements: reqs,
          risks,
          tasks
        });
        console.log('in edit, p is', p);
        this.saveProject(p);
     }
    }
  }
