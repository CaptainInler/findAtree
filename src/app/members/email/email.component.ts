import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
//import { moveIn, fallIn} from '../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
//  animations: [moveIn(),fallIn()],
//  host: {'[@moveIn]':''}
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(private auth: AuthService, private router: Router) {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/members');
    }
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.auth.signInWithEmail(formData)
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
