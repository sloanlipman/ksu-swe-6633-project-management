import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export interface TaskData {
  name: string;
  description: string;
  requirement: string;

  estimatedRequirementsTime: number;
  loggedRequirementsTime: number;
  estimatedDesigningTime: number;
  loggedDesigningTime: number;
  estimatedCodingTime: number;
  loggedCodingTime: number;
  estimatedTestingTime: number;
  loggedTestingTime: number;
  estimatedManagementTime: number;
  loggedManagementTime: number;
  assignedTo: string;
  areRequirementsCompleted: boolean;
  isDesigningCompleted: boolean;
  isCodingCompleted: boolean;
  isTestingCompleted: boolean;
  isTaskCompleted: boolean;
}

@Component({
  selector: 'add-task',
  templateUrl: 'add-task.html',
  styleUrls: ['./update-project-page.component.css']
})
export class AddTaskDialog {
  taskForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    requirement: new FormControl('', [Validators.required]),
    estReqs: new FormControl('', [Validators.required]),
    loggedReqs: new FormControl('', [Validators.required]),
    estDesign: new FormControl('', [Validators.required]),
    loggedDesign: new FormControl('', [Validators.required]),
    estCode: new FormControl('', [Validators.required]),
    loggedCode: new FormControl('', [Validators.required]),
    estTest: new FormControl('', [Validators.required]),
    loggedTest: new FormControl('', [Validators.required]),
    estManagement: new FormControl('', [Validators.required]),
    loggedManagement: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskDialog,
    private formBuilder: FormBuilder) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'update-project-page',
  templateUrl: './update-project-page.component.html',
  styleUrls: ['./update-project-page.component.css']
})
export class UpdateProjectPage extends AppComponent implements OnInit {
  db: any;
  tasksList = [];
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

  addTask() {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '600px',
      data: {
        name: undefined,
        description: undefined,
        requirement: undefined,
        estimatedRequirementsTime: undefined,
        loggedRequirementsTime: undefined,
        estimatedDesigningTime: undefined,
        loggedDesigningTime: undefined,
        estimatedCodingTime: undefined,
        loggedCodingTime: undefined,
        estimatedTestingTime: undefined,
        loggedTestingTime: undefined,
        estimatedManagementTime: undefined,
        loggedManagementTime: undefined,
        assignedTo: undefined,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tasksList.push({
        name: result.name,
        description: result.description,
        requirement: result.requirement,
        estimatedRequirementsTime: result.estimatedRequirementsTime,
        loggedRequirementsTime: result.loggedRequirementsTime,
        estimatedDesigningTime: result.estimatedDesigningTime,
        loggedDesigningTime: result.loggedDesigningTime,
        estimatedCodingTime: result.estimatedCodingTime,
        loggedCodingTime: result.loggedCodingTime,
        estimatedTestingTime: result.estimatedTestingTime,
        loggedTestingTime: result.estimatedTestingTime,
        estimatedManagementTime: result.estimatedManagementTime,
        loggedManagementTime: result.loggedManagementTime,
        assignedTo: result.assignedTo,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
      });
      // TODO add to DB
    });
  }

  editTask(task){
    const dialogRef = this.dialog.open(AddTaskDialog, {
    width: '600px',
    data: {
      name: task.name,
      description: task.description,
      requirement: task.requirement,
      estimatedRequirementsTime: task.estimatedRequirementsTime,
      loggedRequirementsTime: task.loggedRequirementsTime,
      estimatedDesigningTime: task.estimatedDesigningTime,
      loggedDesigningTime: task.loggedDesigningTime,
      estimatedCodingTime: task.estimatedCodingTime,
      loggedCodingTime: task.loggedCodingTime,
      estimatedTestingTime: task.estimatedTestingTime,
      loggedTestingTime: task.loggedTestingTime,
      estimatedManagementTime: task.estimatedManagementTime,
      loggedManagementTime: task.loggedManagementTime,
      assignedTo: task.assignedTo,
      areRequirementsCompleted: false,
      isDesigningCompleted: false,
      isCodingCompleted: false,
      isTestingCompleted: false,
      isTaskCompleted: false,
    }
  });

    dialogRef.afterClosed().subscribe(result => {
      task = {
        name: result.name,
        description: result.description,
        requirement: result.requirement,
        estimatedRequirementsTime: result.estimatedRequirementsTime,
        loggedRequirementsTime: result.loggeRequirementsTime,
        estimatedDesigningTime: result.estimatedDesigningTime,
        loggedDesigningTime: result.loggedDesigningTime,
        estimatedCodingTime: result.estimatedCodingTime,
        loggedCodingTime: result.loggedCodingTime,
        estimatedTestingTime: result.estimatedTestingTime,
        loggedTestingTime: result.estimatedTestingTime,
        estimatedManagementTime: result.estimatedManagementTime,
        loggedManagementTime: result.loggedManagementTime,
        assignedTo: result.assignedTo,
        areRequirementsCompleted: result.areRequirementsCompleted,
        isDesigningCompleted: result.isDesigningCompleted,
        isCodingCompleted: result.isCodingCompleted,
        isTestingCompleted: result.isTestingCompleted,
        isresultCompleted: result.isTaskCompleted,
      };
    });
    // TODO update DB
  }

  deleteTask(task) {
    const index = this.tasksList.indexOf(task);
    this.tasksList.splice(index, 1);
    // TODO delete from DB
  }

  // TODO mark phases as complete
  // TODO mark entire tasks as complete
}
