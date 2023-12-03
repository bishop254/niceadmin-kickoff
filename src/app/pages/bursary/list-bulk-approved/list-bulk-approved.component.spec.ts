import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBulkApprovedComponent } from './list-bulk-approved.component';

describe('ListBulkApprovedComponent', () => {
  let component: ListBulkApprovedComponent;
  let fixture: ComponentFixture<ListBulkApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBulkApprovedComponent]
    });
    fixture = TestBed.createComponent(ListBulkApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
