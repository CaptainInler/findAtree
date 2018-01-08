import { Injectable, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as Point from 'esri/geometry/Point';
import {Tree, FirebaseFeature} from './tree';

@Injectable()
export class TreeService {
  trees: Array<Tree>
  dataLoaded = new EventEmitter<Array<Tree>>();

  constructor(private db: AngularFireDatabase) {
    this.db.list('features', ref=>ref.limitToFirst(4000)).valueChanges()
      .subscribe(trees => {
        this.trees = trees.map((tree:FirebaseFeature) => {
          return new Tree(tree);
        });
        this.dataLoaded.emit(this.trees);
      });
  }


}
