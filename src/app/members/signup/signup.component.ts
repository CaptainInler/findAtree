import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, private router: Router) {

  }
  onSubmit(formData){
    if (formData.valid) {
      this.auth.signupNewUser(formData)
        .then(
          (success) => {
            console.log(success);
            this.router.navigate(['/members']);
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
