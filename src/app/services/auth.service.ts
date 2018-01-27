import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import{ User} from '../members/user';

import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
//  private user: Observable<User>;
  private userDetails: User = null;
  userChanged: EventEmitter<any> = new EventEmitter();

  mode: string = 'play';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {

    this.afAuth.authState
      .switchMap(auth => {
        if(auth) {
          return this.db.object(`users/{auth.uid}`).valueChanges()
        }else{
          return Observable.of(null)
        }
      })
      .subscribe(user=> {
        this.user.next(user)
      });

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
        this.userChanged.emit(this.isLoggedIn());
      }
    );
  }

  signupNewUser(formData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    )
  }

  signInWithEmail(formData) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    )
  }

  signInWithGithub() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    )
  }


  signInWithFacebook() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this.authLoginPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithTwitter() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  private authLoginPopup(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential => {
        this.updateUser(credential.user);
      }))
  }


  updateUser(authData) {
    let userData = new User (authData);
    console.log(userData);
    let ref = this.db.object(`users/{authData.uid}`);
    ref.valueChanges().take(1)
      .subscribe(user => {
        if (!user) {
          ref.update(userData);
        }
      })
  }


  isLoggedIn() {
    if (this.userDetails == null ) {
      console.log('not logged in');
      return false;
    } else {
      console.log('logged in');
      //  console.log(this.userDetails.displayName);
      return true;
    }
  }

  getUser() {
    return this.userDetails;
  }

  logout() {
    this.afAuth.auth.signOut()
      .then((res) => {
        // this.user = null;
        // this.userDetails = null;
        // this.router.navigate(['/map'])
      });
  }

}
