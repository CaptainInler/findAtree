import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { moveIn, fallIn, moveInLeft } from '../shared/animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
})
export class MembersComponent {
  name: any;
  private done = false;
  @Input() subComponent: string;
  @Output() eventData: EventEmitter<string> = new EventEmitter();
  @HostBinding('@moveIn')
  public state = true;
  constructor(
    private auth: AuthService
  ) {
    if (this.auth.isLoggedIn()) {
      this.name = this.auth.getUser();
    }
  }
  resetTool(event: string) {
    this.done = true;
    this.eventData.emit(event);
  }
  logout() {
    this.auth.logout();
  }
}
