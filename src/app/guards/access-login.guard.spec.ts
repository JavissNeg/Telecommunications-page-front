import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessLoginGuard } from './access-login.guard';

describe('accessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
