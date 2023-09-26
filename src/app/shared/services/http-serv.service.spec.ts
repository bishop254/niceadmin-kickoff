import { TestBed } from '@angular/core/testing';

import { HttpServService } from './http-serv.service';

describe('HttpServService', () => {
  let service: HttpServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
