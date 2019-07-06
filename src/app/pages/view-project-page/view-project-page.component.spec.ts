import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectPage } from './view-project-page.component';

describe('ViewProjectPageComponent', () => {
  let component: ViewProjectPage;
  let fixture: ComponentFixture<ViewProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
