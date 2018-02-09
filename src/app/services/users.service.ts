import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseTN, Treename} from '../treename';
import {FirebaseFeature} from '../tree';
import {Observable} from 'rxjs/Observable';
import {User} from '../members/user';

@Injectable()
export class UsersService {
  users: Array<User>;
  dataLoaded: boolean = false;

  constructor(private db: AngularFireDatabase) {
    // this.db.list('users').valueChanges()
    //   .subscribe(users => {
    //     this.users = users.map((user) => {
    //       return new User(user);
    //     });
    //     this.dataLoaded = true;
    //   });
  }

  public getUsers(): Observable<Array<any>>{
    return this.db.list('users').valueChanges();
  }
}
