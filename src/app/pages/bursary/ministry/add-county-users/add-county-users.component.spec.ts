import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountyUsersComponent } from './add-county-users.component';

describe('AddCountyUsersComponent', () => {
  let component: AddCountyUsersComponent;
  let fixture: ComponentFixture<AddCountyUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountyUsersComponent]
    });
    fixture = TestBed.createComponent(AddCountyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
