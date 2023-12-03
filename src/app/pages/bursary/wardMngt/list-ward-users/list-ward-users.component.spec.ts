import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWardUsersComponent } from './list-ward-users.component';

describe('ListWardUsersComponent', () => {
  let component: ListWardUsersComponent;
  let fixture: ComponentFixture<ListWardUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWardUsersComponent]
    });
    fixture = TestBed.createComponent(ListWardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
