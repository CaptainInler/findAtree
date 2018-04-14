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
    uid: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    isAnonymus: false,
    email: null
  }
  const user: any = {
    displayName: 'Hans Mueller',
    id: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    roles: {
      user: true
    },
    valueChanges() {
      return Observable.of(this);
    }
  }
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInWithPopup': Promise.reject({
        code: 'auth/operation-not-allowed'
      })
    }),
    authState: Observable.of(authState)
  };
  const mockAngularDatabase: any = {
    object(path: string) {
      return user;
    },
    list() {}
  };
  const mockDeviceDetector: any = {
    getDeviceInfo() { }
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
