import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBursaryComponent } from './add-edit-bursary.component';

describe('AddEditBursaryComponent', () => {
  let component: AddEditBursaryComponent;
  let fixture: ComponentFixture<AddEditBursaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBursaryComponent]
    });
    fixture = TestBed.createComponent(AddEditBursaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
