import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthService} from "./auth.service";
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  const mockAuthService: any = {

  };
  const mockRouter: any = {

  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
