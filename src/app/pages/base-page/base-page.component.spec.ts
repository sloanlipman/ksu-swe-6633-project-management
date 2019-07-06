import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePage } from './base-page.component';

describe('BasePageComponent', () => {
  let component: BasePage;
  let fixture: ComponentFixture<BasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
