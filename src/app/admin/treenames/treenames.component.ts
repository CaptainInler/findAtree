import { Component, OnInit } from '@angular/core';
import { TREENAMES } from './treenames';
import { User } from '../../members/user';
import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-treenames',
  templateUrl: './treenames.component.html',
  styleUrls: ['./treenames.component.scss']
})
export class TreenamesComponent implements OnInit {

  treenames: any = TREENAMES;

  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {
  }

  import() {
    for ( let i = 0; i < this.treenames.length; i++ ) {
      this.updateTreename(this.treenames[i]);
      // console.log(this.treenames[i].baumnamedeu);
    }
  }

  updateTreename(treename) {
    // let newName = new User (treename);
    // console.log(newName);
    let ref = this.db.object(`treenames/${treename.id}`);
    ref.valueChanges().take(1)
      .subscribe(tname => {
        if (!tname) {
          ref.update(treename)
            .then(tr=>{
              console.log(tr);
            });

        }
      })
  }

}
