import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import { moveIn, fallIn} from '../../shared/animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
})
export class EmailComponent implements OnInit {
  error: any;
  @Output() eventData: EventEmitter<string> = new EventEmitter();
  @HostBinding('@moveIn')
  public state = true;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/members');
    }
  }
  resetTool(event: string) {
    this.eventData.emit(event);
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.auth.signInWithEmail(formData)
        .then(
          (success) => {
            console.log(success);
            this.resetTool('hide');
          }
        ).catch(
        (err) => {
          this.error = err;
        }
      );
    }
  }
  ngOnInit() {
  }

}
