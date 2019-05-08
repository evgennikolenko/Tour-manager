import { TestBed } from '@angular/core/testing';

import { AuthSocketsService } from './auth-sockets.service';

describe('AuthSocketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthSocketsService = TestBed.get(AuthSocketsService);
    expect(service).toBeTruthy();
  });
});
