import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../members/user';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  constructor(private _us: UsersService,
    private _db: AngularFireDatabase) { }

  ngOnInit() {
    this._us.getUsers()
      .subscribe(users =>
        this.users = users);
  }

  private update() {
    // console.log(this.users);
    for ( let i = 0; i < this.users.length; i++ ) {
      this.updateUser(this.users[i]);
    }
  }


  private updateUser(user: User) {
    console.log(user);
    const ref = this._db.object(`users/${user.id}`);
    ref.valueChanges().take(1)
      .subscribe(usr => {
        ref.update(user);
      });
  }

}
