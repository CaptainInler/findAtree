import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthService} from "./auth.service";

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, AuthService]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
