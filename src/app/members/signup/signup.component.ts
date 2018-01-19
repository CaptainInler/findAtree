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
  removeSignup(event: string) {
    console.log(event);
    this.eventData.emit(event);
  }
  onSubmit(formData){
    if (formData.valid) {
      this.auth.signupNewUser(formData)
        .then(
          (success) => {
            console.log(success);
            this.removeSignup('hide');
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
