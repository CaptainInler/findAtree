import { Component, OnInit } from '@angular/core';
import { UsersService} from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ UsersService ]
})
export class AdminComponent implements OnInit {
private show: string = '';
  constructor() { }
showSection(section: string){
    this.show = section;
}
  ngOnInit() {
  }

}
