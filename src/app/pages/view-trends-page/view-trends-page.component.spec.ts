import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrendsPageComponent } from './view-trends-page.component';

describe('ViewTrendsPageComponent', () => {
  let component: ViewTrendsPageComponent;
  let fixture: ComponentFixture<ViewTrendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
