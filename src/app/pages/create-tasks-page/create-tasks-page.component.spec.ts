import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksPageComponent } from './create-tasks-page.component';

describe('CreateTasksPageComponent', () => {
  let component: CreateTasksPageComponent;
  let fixture: ComponentFixture<CreateTasksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTasksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
