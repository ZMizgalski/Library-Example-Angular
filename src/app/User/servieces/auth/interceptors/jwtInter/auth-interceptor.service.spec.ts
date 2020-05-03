import {TestBed} from '@angular/core/testing';

import {JWTInterceptorService} from './j-w-t-interceptor.service';

describe('AuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTInterceptorService = TestBed.get(JWTInterceptorService);
    expect(service).toBeTruthy();
  });
});
