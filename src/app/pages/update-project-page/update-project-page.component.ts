import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';


export interface TaskData {
  name: string;
  description: string;
  requirement: string[];
  estimatedTime: number;
  loggedTime: number;
  remainingTime: number;
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
  name: any;
  requirement: any;
  team: any;
  description: any;
  estimatedTime: any;
  loggedTime: any;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskDialog) {}

  onNoClick(): void {
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
  tasksArray: any;
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
        estimatedTime: undefined,
        loggedTime: undefined,
        remainingTime: 0,
        assignedTo: undefined,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tasksArray.push({
        name: result.name,
        description: result.description,
        requirement: result.requirement,
        estimatedTime:  result.estimatedTime,
        loggedTime: result.loggedTime,
        remainingTime: 0,
        assignedTo: result.assignedTo,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
      });
      // Push result to an array containing risks so that it will populate on the UI
      console.log('after closed', result);
    });
  }

  editTask(task){
    const dialogRef = this.dialog.open(AddTaskDialog, {
    width: '600px',
    data: {
      name: task.name,
      description: task.description,
      requirement: task.requirement,
      estimatedTime: task.estimatedTime,
      loggedTime: task.loggedTime,
      remainingTime: 0,
      assignedTo: task.assignedTo,
      areRequirementsCompleted: false,
      isDesigningCompleted: false,
      isCodingCompleted: false,
      isTestingCompleted: false,
      isTaskCompleted: false,
    }
  });
  }
}
