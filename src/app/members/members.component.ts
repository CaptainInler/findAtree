import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
//import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
//  animations: [moveIn(),fallIn(),moveInLeft()],
//  host: {'[@moveIn]':''}
})
export class MembersComponent implements OnInit {
  name: any;
  state: string =  '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      this.name = this.auth.getUser();
    }
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
