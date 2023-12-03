import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllStudCmComponent } from './list-all-stud-cm.component';

describe('ListAllStudCmComponent', () => {
  let component: ListAllStudCmComponent;
  let fixture: ComponentFixture<ListAllStudCmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllStudCmComponent]
    });
    fixture = TestBed.createComponent(ListAllStudCmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
