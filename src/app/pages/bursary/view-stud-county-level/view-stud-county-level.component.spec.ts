import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudCountyLevelComponent } from './view-stud-county-level.component';

describe('ViewStudCountyLevelComponent', () => {
  let component: ViewStudCountyLevelComponent;
  let fixture: ComponentFixture<ViewStudCountyLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudCountyLevelComponent]
    });
    fixture = TestBed.createComponent(ViewStudCountyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
