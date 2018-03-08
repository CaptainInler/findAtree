import { Component, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { Utils} from '../../classes/utils';
import {Guess, Score} from '../../classes/guess';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'guess-panel',
  templateUrl: './guess-panel.component.html',
  styleUrls: ['./guess-panel.component.scss']
})
export class GuessPanelComponent {

  @Input() selectedTree;
  error: any;
  selection: Array<string> = [];
  correctAnswer: boolean = false;
  buttonState = {};
  selectedTreeId: number;
  selectedTreeName: string;
  points: number = 0;

  constructor(private mapDataService: MapDataService,
              private _db: AngularFireDatabase,
              private _aS: AuthService) { }

  ngOnChanges(values) {
    console.log(values);
    if (!(this.points === 0) ) {
      this.updateGuess();
    }
    if (values.selectedTree.currentValue) {
      this.correctAnswer = false;
      this.selectedTreeId = values.selectedTree.currentValue.attributes.OBJECTID;
      this.selectedTreeName = values.selectedTree.currentValue.attributes.baumnamede;
      this.selection = this.mapDataService.getRandomTreeNames(this._aS.level,this.selectedTreeName );
      console.log(this.selection);
      this.selection = Utils.shuffle(this.selection);
      this.initButtonState();
      this.points = 0;
    }
  }

  initButtonState() {
    this.selection.forEach(name => {
      this.buttonState[name] = 'not-guessed';
    });
  }

  selectTreeName(name: string, event) {
    if (this.selectedTree.attributes.baumnamede === name) {
      this.correctAnswer = true;
      this.points += this._aS.level;
      this.buttonState[name] = 'correct';
    } else {
      this.correctAnswer = false;
      this.points--;
      this.buttonState[name] = 'false';
    }
  }

  getScore(period: string): number{
    if(period==='day'){
      return this._aS.dayScore;
    }else{
      return this._aS.totScore;
    }
  }

  updateGuess() {
    let guess: Guess = {
      treeId : this.selectedTreeId,
      treeNameId: this.selectedTreeName,
      points: this.points
    };
    let d = Utils.getDate();
    let t = Utils.getTime();
    console.log(d+" "+t);
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
      });
    refScore.valueChanges().take(1)
      .subscribe( score => {
        let s: Score = {p:guess.points};
        if (score) {
          s.p += score.p;
        }
        refScore.update(s)
          .then( res => {
            this._aS.dayScore = s.p;
          })
          .catch((err) => {
              console.log(err);
            }
          );
      });
    refTot.valueChanges().take(1)
      .subscribe(tot => {
        let t: Score = {p:guess.points};
        if (tot) {
          t.p += tot.p;
        }
        refTot.update(t)
          .then( res => {
            this._aS.totScore = t.p;
          })
          .catch((err) => {
              console.log(err);
            }
          );
      })
  }

}
