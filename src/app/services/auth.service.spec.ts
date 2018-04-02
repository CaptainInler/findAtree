import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable} from "rxjs/Observable";
import { DeviceDetectorService } from "ngx-device-detector";

describe('AuthService', () => {
  const authState: any = {
    displayName: 'Hans Mueller',
    id: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    email: null
  }
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInWithPopup': Promise.reject({
        code: 'auth/operation-not-allowed'
      }),
      authState: Observable.of(authState)
    })
  };
  const mockAngularDatabase: any = {

  };
  const mockDeviceDetector: any = {
    getDeviceInfo() {
      return 'unknown';
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        {provide: AngularFireAuth, useValue: mockAngularFireAuth},
        {provide: AngularFireDatabase, useValue: mockAngularDatabase},
        {provide: DeviceDetectorService, useValue: mockDeviceDetector}]
    });
  });



  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
