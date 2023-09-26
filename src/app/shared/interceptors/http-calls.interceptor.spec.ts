import { TestBed } from '@angular/core/testing';

import { HttpCallsInterceptor } from './http-calls.interceptor';

describe('HttpCallsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCallsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCallsInterceptor = TestBed.inject(HttpCallsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
