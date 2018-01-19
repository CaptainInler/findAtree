import { Injectable, Component, OnInit, HostBinding } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { moveIn} from '../../router.animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]':'' }
})
@Injectable()
export class LoginComponent implements OnInit {
  error: any;
  show: boolean = false;
  _ref: any;
  constructor(private authService: AuthService, private router: Router) {
  }
  removeLogin() {
    this._ref.destroy();
  }
  logout() {
    this.authService.logout();
  }
  toggleShow() {
    this.show = !this.show;
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin();
      })
      .catch((err) => this.error = err );
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin();
      })
      .catch((err) => this.error = err );
  }
  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin();
      })
      .catch((err) => this.error = err );
  }
  signInWithGithub() {
    this.authService.signInWithGithub()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin();
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      } );
  }
  ngOnInit() {
    // if(this.authService.isLoggedIn()){
    //   this.router.navigateByUrl('/members')
    // }
  }

}
