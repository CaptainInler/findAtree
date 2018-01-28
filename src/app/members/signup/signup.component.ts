import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { moveIn, moveInLeft, fallIn} from  '../../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), moveInLeft(),fallIn()],
  host: {'[@moveIn]':''}
})
export class SignupComponent implements OnInit {
  state: string = '';
  error: any;
  result: any;
  @Output() eventData:EventEmitter<string> = new EventEmitter();

  constructor(private auth: AuthService, private router: Router) {

  }
  resetTool(event: string) {
    console.log(event);
    this.eventData.emit(event);
  }
  onSubmit(formData){
    if (formData.valid) {
      this.auth.signupNewUser(formData)
        .then(
          (res) => {
            console.log(res);
            let dispName = formData.value.first.concat(' '.concat(formData.value.last));
            let user =
            res.updateProfile({
              displayName: dispName,
              photoURL: res.photoURL
          }).then(
              (nothing) => {
                console.log(nothing);
                this.auth.updateUser(res);
                this.resetTool('hide');
              }
            ).catch(
              (err) => {
                this.error=err;
              }
            );
          }
        ).catch(
        (err) => {
          this.error=err;
        }
      );
    }
  }
  ngOnInit() {
  }

}
