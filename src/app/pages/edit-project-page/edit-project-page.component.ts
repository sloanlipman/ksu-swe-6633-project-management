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
      private snackBar: MatSnackBar) {
        this.loadData(data);
      }

    onCancel(): void {
      this.dialogRef.close();
    }

    loadData(data?: any) {
      this.riskDialogForm.controls.riskName.setValue(data.name);
      this.riskDialogForm.controls.riskDescription.setValue(data.description);
      this.riskDialogForm.controls.riskLikelihood.setValue(data.likelihood);
    }

    validateLikelihood() {
      const chance = this.riskDialogForm.get('riskLikelihood').value;
      if (chance >= 100 || chance <= 0) {
        this.riskDialogForm.controls.riskLikelihood.setValue(null);
        this.snackBar.open('Likelihood must be between 1% and 99%', '', { // Display an error message to the user!
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
      private snackBar: MatSnackBar
      ) {
        this.loadData(data);
      }

    onCancel(): void {
      this.dialogRef.close();
    }

    loadData(data?: any) {
      this.reqDialogForm.controls.reqName.setValue(data.name);
      this.reqDialogForm.controls.reqDescription.setValue(data.description);
      this.reqDialogForm.controls.reqCategory.setValue(data.category);
      this.reqDialogForm.controls.reqPriority.setValue(data.priority);
    }

    validatePriority() {
      const priority = this.reqDialogForm.get('reqPriority').value;
      if (priority > 5 || priority < 1) {
        this.reqDialogForm.controls.reqPriority.setValue(null);
        this.snackBar.open('Priority should be between 1 and 5', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
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
      this.initializeDatabase();
      this.getEmployeeList();
      this.getFormControls();
      this.getProjectsList();
      this.getProject();
    }

    loadProject(): void {
      this.db.get(this.currentProjectName).then((doc) => {
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
      this.currentProjectName = this.getUrl().split('/')[2];
      this.loadProject();
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
          name: result.get('riskName').value,
          description: result.get('riskDescription').value,
          likelihood: result.get('riskLikelihood').value
        });
        this.save();
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
          name: result.get('reqName').value,
          description: result.get('reqDescription').value,
          category: result.get('reqCategory').value,
          priority: result.get('reqPriority').value
        });
        this.save();
      });
    }

    editRisk(risk) {
      const oldRisk = this.risksArray[this.risksArray.indexOf(risk)];
      const dialogRef = this.dialog.open(AddRiskDialog, {
        width: '450px',
        data: {
          name: risk.name,
          description: risk.description,
          likelihood: risk.likelihood
        }
      });

      dialogRef.afterClosed().subscribe(result => {
          oldRisk.name = result.get('riskName').value;
          oldRisk.description = result.get('riskDescription').value;
          oldRisk.likelihood = result.get('riskLikelihood').value;
      });
      this.save();
    }

    deleteRisk(risk) {
      const index = this.risksArray.indexOf(risk);
      this.risksArray.splice(index, 1);
      this.save();
    }

    editRequirement(requirement) {
      const oldReq = this.requirementsArray[this.requirementsArray.indexOf(requirement)];
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
        oldReq.name = result.get('reqName').value;
        oldReq.description = result.get('reqDescription').value;
        oldReq.category = result.get('reqCategory').value;
        oldReq.priority = result.get('reqPriority').value;
      });
      this.save();
    }

    deleteRequirement(requirement) {
      const index = this.requirementsArray.indexOf(requirement);
      this.requirementsArray.splice(index, 1);
      this.save();
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
        this.saveProject(p);
     }
    }
  }
