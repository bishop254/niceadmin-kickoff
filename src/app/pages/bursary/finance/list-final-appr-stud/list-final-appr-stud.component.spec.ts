import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinalApprStudComponent } from './list-final-appr-stud.component';

describe('ListFinalApprStudComponent', () => {
  let component: ListFinalApprStudComponent;
  let fixture: ComponentFixture<ListFinalApprStudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFinalApprStudComponent]
    });
    fixture = TestBed.createComponent(ListFinalApprStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
