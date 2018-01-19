import {Injectable, Component, OnInit, HostBinding, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { moveIn} from '../../router.animations';
import { AppComponent} from '../../app.component';

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
  @Output() eventData:EventEmitter<string> = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {
  }
  removeLogin(event: string) {
    this.eventData.emit(event);
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
        this.removeLogin('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithEmail() {
    this.removeLogin('email');
  }
  signUpNewAccount() {
    this.removeLogin('signup');
  }
  signInWithGithub() {
    this.authService.signInWithGithub()
      .then((res) => {
        // this.router.navigate(['/members']);
        this.removeLogin('hide');
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
