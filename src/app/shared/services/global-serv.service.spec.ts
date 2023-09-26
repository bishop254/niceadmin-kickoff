import { TestBed } from '@angular/core/testing';

import { GlobalServService } from './global-serv.service';

describe('GlobalServService', () => {
  let service: GlobalServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
