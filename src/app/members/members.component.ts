import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {MapClickEvent} from '../tree';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [moveIn(),fallIn(),moveInLeft()],
  host: {'[@moveIn]':''}
})
export class MembersComponent implements OnInit {
  name: any;
  state: string =  '';
  show: boolean = true;
  private done: boolean = false;
  @Input() subComponent: string;
  @Input() mapClickData: MapClickEvent;
  @Output() eventData:EventEmitter<string> = new EventEmitter();
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.name = this.auth.getUser();
    }
  }
  resetTool(event: string) {
    this.done = true;
    console.log(this.done);
    this.eventData.emit(event);
  }
  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
