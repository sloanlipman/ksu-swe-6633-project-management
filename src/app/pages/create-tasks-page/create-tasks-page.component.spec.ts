import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksPage } from './create-tasks-page.component';

describe('CreateTasksPage', () => {
  let component: CreateTasksPage;
  let fixture: ComponentFixture<CreateTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTasksPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
