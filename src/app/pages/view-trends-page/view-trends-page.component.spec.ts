import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrendsPage } from './view-trends-page.component';

describe('ViewTrendsPageComponent', () => {
  let component: ViewTrendsPage;
  let fixture: ComponentFixture<ViewTrendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrendsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
