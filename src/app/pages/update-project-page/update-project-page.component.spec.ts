import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectPage } from './update-project-page.component';

describe('UpdateProjectPage', () => {
  let component: UpdateProjectPage;
  let fixture: ComponentFixture<UpdateProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProjectPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
