import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { moveIn, moveInLeft, fallIn } from '../../shared/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), moveInLeft(), fallIn()],
})
export class SignupComponent {
  error: any;
  result: any;
  @Output() eventData: EventEmitter<string> = new EventEmitter();
  @HostBinding('@moveIn')
  public state = true;
  constructor(private auth: AuthService, private router: Router) {

  }
  resetTool(event: string) {
    this.eventData.emit(event);
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.auth.signupNewUser(formData)
        .then(
          (res) => {
            const dispName = formData.value.first.concat(' '.concat(formData.value.last));
            const user =
            res.updateProfile({
              displayName: dispName,
              photoURL: res.photoURL
          }).then(
              (nothing) => {
                this.auth.updateUser(res);
                this.resetTool('hide');
              }
            ).catch(
              (err) => {
                this.error = err;
              }
            );
          }
        ).catch(
        (err) => {
          this.error = err;
        }
      );
    }
  }
}
