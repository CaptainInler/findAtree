import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';
import {moveIn} from '../../router.animations';
import {Treename} from '../../treename';
import {TreeNameService} from '../../services/tree-name.service';
import {MapClickEvent} from '../../tree';
import {AuthService} from '../../services/auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Guess, Score} from '../../classes/guess';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
  animations: [moveIn()],
  // host: {'[@moveIn]':''}
})
export class GuessComponent implements OnInit, OnChanges, OnDestroy {
  error: any;
  selection: Array<Treename>;
  clicks: Array<number>=[];
  treeNameId: number;
  points: number = 0;

  @Input() treeData: MapClickEvent;
  @Input() done: boolean;
  // @Output() eventData: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _tNS: TreeNameService,
              private _aS: AuthService,
              private _db: AngularFireDatabase) {
  }

  resetTool(event: string) {
    let d = new Date();
    alert(d.toString());
    // this.eventData.emit(event);
  }

  ngOnInit() {
    this.treeNameId = this._tNS.getTreenameId(this.treeData.attr.baumnamelat,this.treeData.attr.baumnamedeu);
    let tree: Treename = {
      id: this.treeNameId,
      baumartlat: this.treeData.attr.baumartlat,
      baumgattunglat: this.treeData.attr.baumgattunglat,
      baumnamelat: this.treeData.attr.baumnamelat,
      baumnamedeu: this.treeData.attr.baumnamedeu,
    };
    this.selection = this._tNS.getSelectionOfNames(this._aS.level-1,tree);
    // console.log(this.selection);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes);
  }

  ngOnDestroy() {
    console.log('beeing destroyed');
    if (this.points > 0 ) {
      this.updateGuess();
    }
  }

  selectTreeName(id: number) {
    if (this.clicks[id]===undefined) {
      if (id===this.treeNameId){
        this.points = this.points + this._aS.level;
        this.clicks[id]=1;
      }else{
        this.points--;
        this.clicks[id]=-1;
      }
    }
  }

  //delta: days
  getDate(delta: number = 0): string {
    var delta = delta || 0;
    var newDate = new Date(Date.now()+delta*1000*3600*24);
    var dd = ("0"+newDate.getDate()).slice(-2);
    var mm = ("0"+(newDate.getMonth()+1)).slice(-2);
    var yy = ("0"+(newDate.getFullYear())).slice(-2);
    var yyyy = newDate.getFullYear();

    return yy.toString()+mm+dd;
  }

  // delta: minutes
  getTime(delta: number = 0): string {
    var delta = delta || 0;
    var newDate = new Date(Date.now()+delta*1000*60);
    var dd = ("0"+newDate.getSeconds()).slice(-2);
    var mm = ("0"+(newDate.getMinutes())).slice(-2);
    var yy = ("0"+(newDate.getHours())).slice(-2);
    var yyyy = newDate.getFullYear();

    return yy.toString()+mm+dd;
  }

  updateGuess() {
    let guess: Guess = {
       treeId : this.treeData.attr.ObjectID,
        treeNameId: this.treeNameId,
        points: this.points
    }
    let d = this.getDate();
    let t = this.getTime();
    let s: Score = {p:this.points};
    let refLast = this._db.object(`guess/${this._aS.getUserId()}/${d}/${t}`);
    let refScore = this._db.object<Score>(`guess/${this._aS.getUserId()}/${d}/score`);
    let refTot = this._db.object<Score>(`guess/${this._aS.getUserId()}/score`);
    refLast.valueChanges().take(1)
      .subscribe(last => {
        if (!last) {
          refLast.update(guess)
            .catch( (err) =>
            console.log(err));
        }
      })
    refScore.valueChanges().take(1)
      .subscribe( score => {
        if (score) {
          console.log(score);
          s.p += score.p;
        }
        refScore.update(s)
          .catch((err) => {
            console.log(err);
            }
          );
      })
    refTot.valueChanges().take(1)
      .subscribe(tot => {
        if (tot) {
          console.log(tot);
          s.p += tot.p;
        }
        refTot.update(s)
          .catch((err) => {
              console.log(err);
            }
          );
      })
  }
}
