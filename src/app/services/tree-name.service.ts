import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Treename, FirebaseTN} from '../treename';

@Injectable()
export class TreeNameService {
  treenames: Array<Treename>;
  dataLoaded: boolean = false;

  constructor(private db: AngularFireDatabase) {
  }

  public getSelectionOfNames(size: number): Array<Treename>{
    let set: Array<Treename> = Array();
    if(this.dataLoaded) {
      let length = this.treenames.length;
      for (let i = 0; i < size; i++) {
        let index = this.getRandomInt(1, length);
        set.push(this.treenames[index]);
      }
    }
    return set;
  }

  public getSelectionOfNamesObs(size: number, selected: number): Observable<Treename[]>{
    if (this.dataLoaded){
      const obs =  Observable.create((observer) => {
        observer.next(this.treenames);
        console.log('treenames read');
        observer.complete();
      });
      return obs;
    }
    this.db.list('treenames').valueChanges()
      .subscribe(trees => {
        this.treenames = trees.map((tree:FirebaseTN) => {
          return new Treename(tree);
        });
        this.dataLoaded = true;
        return this.treenames;
      });
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}

