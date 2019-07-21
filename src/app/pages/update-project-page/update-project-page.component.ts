import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Project } from 'src/app/project-model';

export interface TaskData {
  name: string;
  description: string;
  requirement: string;

  estReqs: number;
  loggedReqs: number;
  estDesign: number;
  loggedDesign: number;
  estCode: number;
  loggedCode: number;
  estTest: number;
  loggedTest: number;
  estManagement: number;
  loggedManagement: number;
  assignedTo: string;
  areRequirementsCompleted: boolean;
  isDesigningCompleted: boolean;
  isCodingCompleted: boolean;
  isTestingCompleted: boolean;
  isTaskCompleted: boolean;
  isManagementCompleted: boolean;

  teamList: string[];
  requirementsList: string[];
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

  requirementsFormArray: FormArray = this.formBuilder.array([]);

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TaskData,
    private formBuilder: FormBuilder) {
      console.log('Received data', data);
      this.loadData(data);
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadData(data?: any): void {
    if (data) {
      this.taskForm.controls.name.setValue(data.name);
      this.taskForm.controls.description.setValue(data.description);
      this.taskForm.controls.requirement.setValue(data.requirement);
      this.taskForm.controls.estReqs.setValue(data.estReqs);
      this.taskForm.controls.loggedReqs.setValue(data.loggedReqs);
      this.taskForm.controls.estDesign.setValue(data.estDesign);
      this.taskForm.controls.loggedDesign.setValue(data.loggedDesign);
      this.taskForm.controls.estCode.setValue(data.estCode);
      this.taskForm.controls.loggedCode.setValue(data.loggedCode);
      this.taskForm.controls.estTest.setValue(data.estTest);
      this.taskForm.controls.loggedTest.setValue(data.loggedTest);
      this.taskForm.controls.estManagement.setValue(data.estManagement);
      this.taskForm.controls.loggedManagement.setValue(data.loggedManagement);
      this.taskForm.controls.assignedTo.setValue(data.assignedTo);
    }
  }

}

@Component({
  selector: 'update-project-page',
  templateUrl: './update-project-page.component.html',
  styleUrls: ['./update-project-page.component.css']
})
export class UpdateProjectPage extends AppComponent implements OnInit {
  db: any;
  teamList: any[] = [];
  requirementsList: any[] = [];
  currentProjectName: string;
  currentProject: Project;
  tasksList: any[] = [];
  constructor(
    public dialog: MatDialog,
    protected router: Router,
    protected injector: Injector,
    protected snackBar: MatSnackBar
  ) {
    super(injector, router, snackBar, dialog);
  }

   ngOnInit() {
    this.initializeDatabase();
    this.currentProjectName = this.getUrl().split('/')[2]; // Last part of the URL is equal to the project name
    this.loadProject();
  }

  loadProject(): void {
    this.db.get(this.currentProjectName).then((doc) => {
      console.log(doc);
      doc.tasks.forEach(task => {
        this.tasksList.push(task);
      });

      doc.teamMembers.forEach(emp => {
        this.teamList.push(emp);
      });

      doc.requirements.forEach(req => {
        this.requirementsList.push(req.name);
      });

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

  addTask() {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '600px',
      data: {
        name: undefined,
        description: undefined,
        requirement: undefined,
        estReqs: undefined,
        loggedReqs: 0,
        estDesign: undefined,
        loggedDesign: 0,
        estCode: undefined,
        loggedCode: 0,
        estTest: undefined,
        loggedTest: 0,
        estManagement: undefined,
        loggedManagement: 0,
        assignedTo: undefined,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
        isManagementCompleted: false,
        teamList: this.teamList,
        requirementsList: this.requirementsList
      }
    });


    dialogRef.afterClosed().subscribe(async (result) => {
      this.tasksList.push({
        name: result.get('name').value,
        description: result.get('description').value,
        requirement: result.get('requirement').value,
        estReqs: result.get('estReqs').value,
        loggedReqs: result.get('loggedReqs').value,
        estDesign: result.get('estDesign').value,
        loggedDesign: result.get('loggedDesign').value,
        estCode: result.get('estCode').value,
        loggedCode: result.get('loggedCode').value,
        estTest: result.get('estTest').value,
        loggedTest: result.get('loggedTest').value,
        estManagement: result.get('estManagement').value,
        loggedManagement: result.get('loggedManagement').value,
        assignedTo: result.get('assignedTo').value,
        areRequirementsCompleted: false,
        isDesigningCompleted: false,
        isCodingCompleted: false,
        isTestingCompleted: false,
        isTaskCompleted: false,
        isManagementCompleted: false,
      });
      this.currentProject.tasks = this.tasksList;
      this.saveProject(this.currentProject);
    });
  }

  editTask(task){
    const oldTask =  this.tasksList[this.tasksList.indexOf(task)];
    const dialogRef = this.dialog.open(AddTaskDialog, {
    width: '600px',
    data: {
      name: task.name,
      description: task.description,
      requirement: task.requirement,
      estReqs: task.estReqs,
      loggedReqs: task.loggedReqs,
      estDesign: task.estDesign,
      loggedDesign: task.loggedDesign,
      estCode: task.estCode,
      loggedCode: task.loggedCode,
      estTest: task.estTest,
      loggedTest: task.loggedTest,
      estManagement: task.estManagement,
      loggedManagement: task.loggedManagement,
      assignedTo: task.assignedTo,
      areRequirementsCompleted: task.areRequirementsCompleted,
      isDesigningCompleted: task.isDesigningCompleted,
      isCodingCompleted: task.isCodingCompleted,
      isTestingCompleted: task.isTestingCompleted,
      isManagementCompleted: task.isManagementCompleted,
      isTaskCompleted: task.isTaskCompleted,
      teamList: this.teamList,
      requirementsList: this.requirementsList
    }
  });
    dialogRef.afterClosed().subscribe(result => {
      oldTask.name = result.get('name').value;
      oldTask.description = result.get('description').value;
      oldTask.requirement = result.get('requirement').value;
      oldTask.estReqs = result.get('estReqs').value;
      oldTask.loggedReqs = result.get('loggedReqs').value;
      oldTask.estDesign = result.get('estDesign').value;
      oldTask.loggedDesign = result.get('loggedDesign').value;
      oldTask.estCode = result.get('estCode').value;
      oldTask.loggedCode = result.get('loggedCode').value;
      oldTask.estTest = result.get('estTest').value;
      oldTask.loggedTest = result.get('loggedTest').value;
      oldTask.estManagement = result.get('estManagement').value;
      oldTask.loggedManagement = result.get('loggedManagement').value;
      oldTask.assignedTo = result.get('assignedTo').value;
      oldTask.areRequirementsCompleted = task.areRequirementsCompleted;
      oldTask.isDesigningCompleted = task.isDesigningCompleted;
      oldTask.isCodingCompleted = task.isCodingCompleted;
      oldTask.isTestingCompleted = task.isTestingCompleted;
      oldTask.isManagementCompleted = task.isManagementCompleted;
      oldTask.isTaskCompleted = task.isTaskCompleted;
      this.currentProject.tasks = this.tasksList;
      this.saveProject(this.currentProject);
    });

  }

  deleteTask(task) {
    const index = this.tasksList.indexOf(task);
    this.tasksList.splice(index, 1);
    this.currentProject.tasks = this.tasksList;
    this.saveProject(this.currentProject);
  }

  getCompletedStatus(query: boolean) {
    if (query) {
      return 'completed';
    } else {
      return 'inProgress';
    }
  }

  getButtonText(query: boolean) {
    if (!query) {
      return 'Mark as Completed';
    } else {
      return 'Mark as In Progress';
    }
  }

  toggleCompleteRequirements(task) {
    task.areRequirementsCompleted = !task.areRequirementsCompleted;
    this.saveProject(this.currentProject);
  }

  toggleCompleteDesigning(task) {
    task.isDesigningCompleted = !task.isDesigningCompleted;
    this.saveProject(this.currentProject);
  }

  toggleCompleteCoding(task) {
    task.isCodingCompleted = !task.isCodingCompleted;
    this.saveProject(this.currentProject);
  }

  toggleCompleteTesting(task) {
    task.isTestingCompleted = !task.isTestingCompleted;
    this.saveProject(this.currentProject);
  }

  toggleCompleteManagement(task) {
    task.isManagementCompleted = !task.isManagementCompleted;
    this.saveProject(this.currentProject);
  }
}
