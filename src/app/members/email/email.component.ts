import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { moveIn, fallIn} from '../../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(),fallIn()],
  host: {'[@moveIn]':''}
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;
  @Output() eventData:EventEmitter<string> = new EventEmitter();

  constructor(private auth: AuthService, private router: Router) {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/members');
    }
  }
  removeEmail(event: string) {
    this.eventData.emit(event);
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.auth.signInWithEmail(formData)
        .then(
          (success) => {
            console.log(success);
            this.removeEmail('hide');
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
