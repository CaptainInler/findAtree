import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Tree} from './tree';

@Injectable()
export class TreeService {
  constructor(private db: AngularFireDatabase) {
  }
  getTrees():Observable<Tree[]> {
    return this.db.list('features', ref=>ref.limitToFirst(10)).valueChanges()
  }
}
