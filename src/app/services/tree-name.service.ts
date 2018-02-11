import {Injectable, EventEmitter, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Treename, FirebaseTN} from '../treename';

@Injectable()
export class TreeNameService {
  treenames: Array<Treename>;
  dataLoaded: boolean = false;

  constructor(private db: AngularFireDatabase) {
  }


  public getSelectionOfNames (size: number, clicked: Treename = null): Array<Treename>{
    let set: Array<Treename> = Array();
    let clickedNameId: number = 0;
    this.loadTreeNames().subscribe( (treenames) => {
      // console.log(treenames);
      let length = treenames.length;
      if (clicked) {
        clickedNameId = this.getTreenameId(clicked.baumnamelat, clicked.baumnamedeu);
      }
      for (let i = 0; i < size; i++) {
        let index = this.getRandomInt(1, length);
        while (index === clickedNameId){
          index = this.getRandomInt(1, length);
        }
        set.push(treenames[index]);
      }
      set.push(clicked);
      set = this.shuffle(set);
      console.log(set);
    })
    return set;
  }
  public getTreenameId(nameLat: string, nameDeu: string): number{
    if (this.dataLoaded) {
      let id: number = 0;
      for (let i = 0; i < this.treenames.length; i++) {
        if ((this.treenames[i].baumnamelat===nameLat)&&(this.treenames[i].baumnamedeu===nameDeu)){
          id = this.treenames[i].id;
          break;
        }
      }
      return id;
    }
    return null;
  }

  public loadTreeNames(): Observable<Treename[]>{
    if (this.dataLoaded){
      const obs =  Observable.create((observer) => {
        observer.next(this.treenames);
        // console.log('treenames read');
        observer.complete();
      });
      return obs;
    }
    let dbs = this.db.list<Treename>('treenames').valueChanges();

      dbs.subscribe(trees => {
        this.treenames = trees
        this.dataLoaded = true;
        // console.log(trees);
        return this.treenames;
      });
    return dbs;
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }


}

