import { Component } from '@angular/core';
import { UsersService} from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ UsersService ]
})
export class AdminComponent {
private selection = '';

  constructor() {
  }
  setSection(section: string) {
      this.selection = section;
  }
  getSelection(): string {
    return this.selection;
  }

}
