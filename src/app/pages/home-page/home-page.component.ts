import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import PouchDB from 'pouchdb';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePage extends AppComponent implements OnInit {
  selectedProject: any;
  db: any;
  constructor(
    protected router: Router,
    protected injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.db = new PouchDB('pmonkey');

  }

  editProject(selectedProject) {
    this.router.navigateByUrl('/edit'); // TODO make it specific to a project
  }

  updateProject(selectedProject) {
    this.router.navigateByUrl('/update'); // TODO make it specific to a project
  }

}
