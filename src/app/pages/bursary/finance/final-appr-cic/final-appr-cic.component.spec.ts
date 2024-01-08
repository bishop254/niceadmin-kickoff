import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalApprCicComponent } from './final-appr-cic.component';

describe('FinalApprCicComponent', () => {
  let component: FinalApprCicComponent;
  let fixture: ComponentFixture<FinalApprCicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalApprCicComponent]
    });
    fixture = TestBed.createComponent(FinalApprCicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
