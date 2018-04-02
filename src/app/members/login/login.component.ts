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
})
@Injectable()
export class LoginComponent implements OnInit {
  error: any;
  show = false;
  @Output() eventData: EventEmitter<string> = new EventEmitter();
  @HostBinding('@moveIn')
  public state = true;
  constructor(private authService: AuthService, private router: Router) {
  }
  resetTool(event: string) {
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
        this.resetTool('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.resetTool('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then((res) => {
        this.resetTool('hide');
      })
      .catch((err) => this.error = err );
  }
  signInWithEmail() {
    this.resetTool('email');
  }
  signUpNewAccount() {
    this.resetTool('signup');
  }
  signInWithGithub() {
    this.authService.signInWithGithub()
      .then((res) => {
        this.resetTool('hide');
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
