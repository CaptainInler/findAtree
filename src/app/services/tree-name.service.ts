import {Injectable, EventEmitter, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Treename } from '../treename';
import {Utils} from '../classes/utils';

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
      for (let i = 0; i < size; i++) {
        let index = Utils.getRandomInt(1, length);
        while (index === clicked.id){
          index = Utils.getRandomInt(1, length);
        }
        set.push(treenames[index]);
      }
      if (clicked) {
        set.push(clicked);
      }
      set = Utils.shuffle(set);
      console.log(set);
    });
    return set;
  }

  public getTreenameId(nameLat: string, nameDeu: string): number{
    let id: number = 0;
    this.loadTreeNames().subscribe( (treenames) => {
      for (let i = 0; i < treenames.length; i++) {
        if ((treenames[i].baumnamelat===nameLat)&&(treenames[i].baumnamedeu===nameDeu)){
          id = treenames[i].id;
          break;
        }
      }
    });
    return id;
  }

  public loadTreeNames(): Observable<Treename[]>{
    if (this.dataLoaded){
      return  Observable.create((observer) => {
        observer.next(this.treenames);
        // console.log('treenames read');
        observer.complete();
      });
    }
    let dbs = this.db.list<Treename>('treenames').valueChanges();

      dbs.subscribe(trees => {
        this.treenames = trees;
        this.dataLoaded = true;
        // console.log(trees);
        return this.treenames;
      });
    return dbs;
  }
}

