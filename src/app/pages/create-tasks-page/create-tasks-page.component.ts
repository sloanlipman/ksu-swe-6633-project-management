import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface TaskData {
  name: string;
  description: string;
  requirement: string[];
  estimatedTime: number;
  loggedTime: number;
  remainingTime: number;
  assignedTo: string;
  isCompleted: boolean;
}

@Component({
  selector: 'add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'create-tasks-page',
  templateUrl: './create-tasks-page.component.html',
  styleUrls: ['./create-tasks-page.component.css']
})
export class CreateTasksPage implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '450px',
      data: {
        name: undefined,
        description: undefined,
        requirement: undefined,
        estimatedTime: undefined,
        loggedTime: undefined,
        remainingTime: 0,
        assignedTo: undefined,
        isCompleted: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Push result to an array containing risks so that it will populate on the UI
      console.log('after closed', result);
    });
  }

  editTask() {}

}
