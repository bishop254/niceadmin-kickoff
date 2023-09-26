import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTblHeaderComponent } from './custom-tbl-header.component';

describe('CustomTblHeaderComponent', () => {
  let component: CustomTblHeaderComponent;
  let fixture: ComponentFixture<CustomTblHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTblHeaderComponent]
    });
    fixture = TestBed.createComponent(CustomTblHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
