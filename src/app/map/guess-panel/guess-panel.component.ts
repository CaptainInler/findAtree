import { Component, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { Utils } from '../../classes/utils';
import { Guess, Score } from '../../classes/guess';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { showSidePanel, showSidePanelContent} from '../../router.animations';
import { AppStateService } from '../../services/app-state.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

import {attr} from '../../tree';

type scoreType = 'day' | 'total' | 'best';

@Component({
  selector: 'guess-panel',
  templateUrl: './guess-panel.component.html',
  styleUrls: ['./guess-panel.component.scss'],
  animations: [showSidePanel()],
})
export class GuessPanelComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selectedTree;
  error: any;
  selection: Array<string> = [];
  buttonState = {};
  selectedTreeId: number;
  selectedTreeName: string;
  public points = 0;
  private dayScoreRef$: AngularFireObject<Score>;
  private totScoreRef$: AngularFireObject<Score>;
  private maxScoreRef$: AngularFireList<Score>;
  private dayScoreRef$Subscription: Subscription;
  private totScoreRef$Subscription: Subscription;
  private maxScoreRef$Subscription: Subscription;
  private today = '';
  private dayScore = 0;
  private totScore = 0;
  private maxScore = 0;


  constructor(private mapDataService: MapDataService,
              private _db: AngularFireDatabase,
              private _aS: AuthService,
              public appState: AppStateService) { }

  ngOnInit() {
    this.today = Utils.getDate();
    this.dayScoreRef$ = this._db.object<Score>(`score/day/${this._aS.getUserId()}/${this.today}`);
    this.totScoreRef$ = this._db.object<Score>(`score/total/${this._aS.getUserId()}`);
    this.maxScoreRef$ = this._db.list<Score>('score/total', ref => ref.orderByChild('p').limitToLast(1));
    this.setScoreRefs();
   }

  ngOnChanges(values) {
    console.log(values);
    this.updateGuess(this.points);
    if (values.selectedTree.currentValue) {
      this.selectedTreeId = values.selectedTree.currentValue.attributes[attr.id];
      this.selectedTreeName = values.selectedTree.currentValue.attributes[attr.nameDE];
      this.selection = this.mapDataService.getRandomTreeNames(this._aS.level, this.selectedTreeName );
      console.log(this.selection);
      this.selection = Utils.shuffle(this.selection);
      this.initButtonState();
      this.points = 0;
    }
  }

  ngOnDestroy() {
    console.log('on destroy');
      this.updateGuess(this.points);
      this.dayScoreRef$Subscription.unsubscribe();
      this.totScoreRef$Subscription.unsubscribe();
      this.maxScoreRef$Subscription.unsubscribe();
  }

  initButtonState() {
    this.selection.forEach(name => {
      this.buttonState[name] = 'not-guessed';
    });
  }

  selectTreeName(name: string, event) {
    if ( 'not-guessed' === this.buttonState[name]) {
      if (this.selectedTree.attributes[attr.nameDE] === name) {
        this.points += this._aS.level;
        this.buttonState[name] = 'correct';
      } else {
        this.points--;
        this.buttonState[name] = 'false';
      }
    }
  }

  setScoreRefs() {
    this.dayScoreRef$Subscription = this.dayScoreRef$.valueChanges().subscribe(last => {
      if (last) {
        this.dayScore = last.p;
      }
    });
    this.totScoreRef$Subscription = this.totScoreRef$.valueChanges().subscribe(last => {
      if (last) {
        this.totScore = last.p;
      }
    });
    this.maxScoreRef$Subscription = this.maxScoreRef$.valueChanges().subscribe(last => {
      // console.log(last);
      if (last.length > 0) {
        this.maxScore = last[0].p;
      }
    });
  }

  getScore(period: scoreType): number {
    let score: number;
    switch (period) {
      case 'day':
        score = this.dayScore;
        break;
      case 'total':
        score = this.totScore;
        break;
      case 'best':
        score = this.maxScore;
        break;
      default:
        score = null;
    }
    return score;
  }

  updateGuess(points: number) {
    if (points !== 0) {
      const guess: Guess = {
        treeId: this.selectedTreeId,
        treeNameId: this.selectedTreeName,
        points: this.points
      };
      this.setGuess(guess);
      this.updateScore('day', points);
      this.updateScore('total', points);
    }
  }

  setGuess ( guess: Guess) {
    const t = Utils.getTime();
    const refLast = this._db.object(`guess/${this._aS.getUserId()}/${this.today}/${t}`);
    refLast.set(guess)
            .catch( (err) =>
              console.log(err)
            );
  }

  updateScore(period: scoreType, points: number = 0) {
    let refScore: AngularFireObject<Score>;
    const pts: number = this.getScore(period) + points;
    switch (period) {
      case 'day':
        refScore = this.dayScoreRef$;
        break;
      case 'total':
        refScore = this.totScoreRef$;
        break;
      default:
        refScore = null;
    }

    if (refScore !== null) {
      refScore.set({p: pts})
        .catch(err =>
          console.log(err));
    }
  }

}
