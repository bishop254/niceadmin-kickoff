import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBursariesComponent } from './list-bursaries.component';

describe('ListBursariesComponent', () => {
  let component: ListBursariesComponent;
  let fixture: ComponentFixture<ListBursariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBursariesComponent]
    });
    fixture = TestBed.createComponent(ListBursariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
