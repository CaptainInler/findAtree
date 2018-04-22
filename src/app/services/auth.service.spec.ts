import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable} from "rxjs/Observable";
import { DeviceDetectorService } from "ngx-device-detector";

describe('AuthService logged in', () => {
  const authState: any = {
    displayName: 'Hans Mueller',
    uid: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    isAnonymus: false,
    email: null
  };
  const user: any = {
    displayName: 'Hans Mueller',
    id: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    roles: {
      user: true,
      admin: false
    },
    valueChanges() {
      return Observable.of(this);
    }
  };
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInWithPopup': Promise.resolve('signed in') ,
      'signInWithRedirect': Promise.resolve(authState)
    }),
    authState: Observable.of(authState)
  };
  const mockAngularDatabase: any = {
    object() {
        return user;
    },
    list() {}
  };
  const mockDeviceDetector: any = {
    getDeviceInfo() {
      return { device: "unknown"};
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

  it('should return that user is logged in', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn()).toEqual(true);
  }));

  it('should return that user details are correct', inject([AuthService], (service: AuthService) => {
    expect(service.getUser()).toEqual(user);
  }));

  it('should return that user id is correct', inject([AuthService], (service: AuthService) => {
    expect(service.getUserId()).toEqual('WDAeDeeD7oZCfLFxPNnrgj1tN7I3');
  }));

  it('should return that user has role "user"', inject([AuthService], (service: AuthService) => {
    expect(service.hasRole('user')).toEqual(true);
  }));

  it('should return that user does not have role "admin"', inject([AuthService], (service: AuthService) => {
    expect(service.hasRole('admin')).toEqual(false);
  }));
});



describe('AuthService not logged in', () => {
  const user: any = {
    valueChanges() {
      return Observable.of(this);
    }
  };
  const mockAngularFireAuth: any = {
    authState: Observable.of(null)
  };
  const mockAngularDatabase: any = {
    object() {
        return user;
    },
    list() {}
  };
  const mockDeviceDetector: any = {
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

  it('should return that user is not logged in', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn()).toEqual(false);
  }));

  it('should return that user details equal to null', inject([AuthService], (service: AuthService) => {
    expect(service.getUser()).toEqual(null);
  }));

  it('should return that user id equals to null', inject([AuthService], (service: AuthService) => {
    expect(service.getUserId()).toEqual(null);
  }));

  it('should return that user does not have role "user"', inject([AuthService], (service: AuthService) => {
    expect(service.hasRole('user')).toEqual(false);
  }));

  it('should return that user does not have role "admin"', inject([AuthService], (service: AuthService) => {
    expect(service.hasRole('admin')).toEqual(false);
  }));
});

describe('AuthService Desktop', () => {
  const authState: any = {
    displayName: 'Hans Mueller',
    uid: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    isAnonymus: false,
    email: null
  };
  const user: any = {
    displayName: 'Hans Mueller',
    id: 'WDAeDeeD7oZCfLFxPNnrgj1tN7I3',
    roles: {
      user: true,
      admin: false
    },
    valueChanges() {
      return Observable.of(this);
    }
  };
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInWithPopup': Promise.resolve('signed in') ,
      'signInWithRedirect': Promise.resolve('signed in'),
      'signInWithEmailAndPassword': Promise.resolve('signed in'),
      'createUserWithEmailAndPassword': Promise.resolve('signed in')
    }),
    authState: Observable.of(authState)
  };
  const mockAngularDatabase: any = {
    object() {
        return user;
    },
    list() {}
  };
  const mockDeviceDetector: any = {
    getDeviceInfo() {
      return { device: "unknown"};
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

  it('signupNewUser should call createUserWithEmailAndPassword with Credentials', inject([AuthService], (service: AuthService) => {
    const loginDat = {email : 'hans@mueller.ch', password: 'meinTollesPasswort'};
    const formData = {value : loginDat};
    service.signupNewUser(formData).then(() => {
      expect(mockAngularFireAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(loginDat.email, loginDat.password);
    });
  }));

  it('signInWithEmail should call signInWithEmailAndPassword with Credentials', inject([AuthService], (service: AuthService) => {
    const loginDat = {email : 'hans@mueller.ch', password: 'meinTollesPasswort'};
    const formData = {value : loginDat};
    service.signInWithEmail(formData).then(() => {
      expect(mockAngularFireAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(loginDat.email, loginDat.password);
    });
  }));

  it('signInWithGithub should call signInWithPopup with GithubAuthProvider', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGithub().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledWith(new firebase.auth.GithubAuthProvider());
    });
  }));

  it('signInWithGithub should not call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGithub().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithFacebook should call signInWithPopup with FacebookAuthProvider', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithFacebook().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledWith(new firebase.auth.FacebookAuthProvider());
    });
  }));

  it('signInWithFacebook should not call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithFacebook().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithGoogle should call signInWithPopup with GoogleAuthProvider', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGoogle().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledWith(new firebase.auth.GoogleAuthProvider());
    });
  }));

  it('signInWithGoogle should not call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGoogle().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithTwitter should call signInWithPopup with TwitterAuthProvider', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithTwitter().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledWith(new firebase.auth.TwitterAuthProvider());
    });
  }));

  it('signInWithTwitter should not call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithTwitter().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalledTimes(0);
    });
  }));
});

describe('AuthService Mobile', () => {
  const authState: any = {
  };
  const user: any = {
    valueChanges() {
      return Observable.of(this);
    }
  };
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInWithPopup': Promise.resolve('signed in') ,
      'signInWithRedirect': Promise.resolve(authState)
    }),
    authState: Observable.of(null)
  };
  const mockAngularDatabase: any = {
    object() {
      return user;
    },
    list() {}
  };
  const mockDeviceDetector: any = {
    getDeviceInfo() {
      return { device: "Samusung Galaxy S7"};
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

  it('signInWithGithub should not call signInWithPopup', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGithub().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithGithub should call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGithub().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalled();
    });
  }));

  it('signInWithFacebook should not call signInWithPopup', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithFacebook().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithFacebook should call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithFacebook().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalled();
    });
  }));

  it('signInWithGoogle should not call signInWithPopup', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGoogle().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithGoogle should call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithGoogle().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalled();
    });
  }));

  it('signInWithTwitter should not call signInWithPopup', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithTwitter().then(() => {
      expect(mockAngularFireAuth.auth.signInWithPopup).toHaveBeenCalledTimes(0);
    });
  }));

  it('signInWithTwitter should call signInWithRedirect', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'updateUser');
    service.signInWithTwitter().then(() => {
      expect(mockAngularFireAuth.auth.signInWithRedirect).toHaveBeenCalled();
    });
  }));
});
