import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountyUsersComponent } from './list-county-users.component';

describe('ListCountyUsersComponent', () => {
  let component: ListCountyUsersComponent;
  let fixture: ComponentFixture<ListCountyUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountyUsersComponent]
    });
    fixture = TestBed.createComponent(ListCountyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
