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
      this.selection = this.mapDataService.getRandomTreeNames(3);
      console.log(this.selection);
      this.selectedTreeName = values.selectedTree.currentValue.attributes.baumnamede;
      this.selection.push(this.selectedTreeName);
      this.selection = Utils.shuffle(this.selection);
      this.initButtonState();
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
      this.points += 3;
      this.buttonState[name] = 'correct';
    } else {
      this.correctAnswer = false;
      this.points--;
      this.buttonState[name] = 'false';
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
        let s: Score = {p:this.points};
        if (score) {
          console.log(score);
          s.p += score.p;
        }
        refScore.update(s)
          .then( res => {
            console.log(s);
            this._aS.dayScore = s.p;
          })
          .catch((err) => {
              console.log(err);
            }
          );
      });
    refTot.valueChanges().take(1)
      .subscribe(tot => {
        let t: Score = {p:this.points};
        if (tot) {
          console.log(tot);
          t.p += tot.p;
        }
        refTot.update(t)
          .then( res => {
            console.log(t);
            this._aS.totScore = t.p;
          })
          .catch((err) => {
              console.log(err);
            }
          );
      })
  }

}
