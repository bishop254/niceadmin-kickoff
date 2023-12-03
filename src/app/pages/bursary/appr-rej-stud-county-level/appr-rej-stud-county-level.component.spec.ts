import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprRejStudCountyLevelComponent } from './appr-rej-stud-county-level.component';

describe('ApprRejStudCountyLevelComponent', () => {
  let component: ApprRejStudCountyLevelComponent;
  let fixture: ComponentFixture<ApprRejStudCountyLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprRejStudCountyLevelComponent]
    });
    fixture = TestBed.createComponent(ApprRejStudCountyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
