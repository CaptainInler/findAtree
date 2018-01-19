import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  userChanged: EventEmitter<any> = new EventEmitter();

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

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
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    )
  }

  signInWithEmail(formData) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    )
  }

  signInWithGithub() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    )
  }


  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
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
    this._firebaseAuth.auth.signOut()
      .then((res) => {
        this.user = null;
        this.userDetails = null;
        // this.router.navigate(['/map'])
      });
  }

}
