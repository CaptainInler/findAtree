import { Injectable, Component, OnInit, HostBinding } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';
//import { moveIn} from '../router.animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: [moveIn()],
  // host: {'[@moveIn]':'' }
})
@Injectable()
export class LoginComponent implements OnInit {
  error: any;
  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/members')
    }
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        this.router.navigate(['/members']);
      })
      .catch((err) => this.error = err );
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['/members']);
      })
      .catch((err) => this.error = err );
  }
  signInWithGithub() {
    this.authService.signInWithGithub()
      .then((res) => {
        this.router.navigate(['/members']);
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      } );
  }
  ngOnInit() {
  }

}
