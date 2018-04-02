import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

import { UsersService } from './users.service';

describe('UsersService', () => {

  const mockAngularDatabase: any = {
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService,
        {provide: AngularFireDatabase, useValue: mockAngularDatabase}]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
