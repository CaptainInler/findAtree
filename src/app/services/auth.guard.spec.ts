import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService} from './auth.service';
import { Router } from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";

describe('AuthGuard', () => {
  const mockAuthService: any = {

  };
  const mockRouter: any = {

  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
