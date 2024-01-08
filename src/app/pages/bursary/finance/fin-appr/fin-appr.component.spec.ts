import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinApprComponent } from './fin-appr.component';

describe('FinApprComponent', () => {
  let component: FinApprComponent;
  let fixture: ComponentFixture<FinApprComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinApprComponent]
    });
    fixture = TestBed.createComponent(FinApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
