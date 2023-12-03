import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprCountyStudComponent } from './list-appr-county-stud.component';

describe('ListApprCountyStudComponent', () => {
  let component: ListApprCountyStudComponent;
  let fixture: ComponentFixture<ListApprCountyStudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListApprCountyStudComponent]
    });
    fixture = TestBed.createComponent(ListApprCountyStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
