import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWardUsersComponent } from './add-ward-users.component';

describe('AddWardUsersComponent', () => {
  let component: AddWardUsersComponent;
  let fixture: ComponentFixture<AddWardUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWardUsersComponent]
    });
    fixture = TestBed.createComponent(AddWardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
