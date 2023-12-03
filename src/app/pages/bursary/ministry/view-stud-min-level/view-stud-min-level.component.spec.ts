import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudMinLevelComponent } from './view-stud-min-level.component';

describe('ViewStudMinLevelComponent', () => {
  let component: ViewStudMinLevelComponent;
  let fixture: ComponentFixture<ViewStudMinLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStudMinLevelComponent]
    });
    fixture = TestBed.createComponent(ViewStudMinLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
