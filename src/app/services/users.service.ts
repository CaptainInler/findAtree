import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private db: AngularFireDatabase) {
  }

  public getUsers(): Observable<Array<any>> {
    return this.db.list('users').valueChanges();
  }
}
