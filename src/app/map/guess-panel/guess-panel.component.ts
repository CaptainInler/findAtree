import { Component, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { Utils} from '../../classes/utils';
import {Guess, Score} from '../../classes/guess';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {AuthService} from '../../services/auth.service';
import {OnInit, OnChanges, OnDestroy} from '@angular/core';

type scoreType = 'day' | 'total' | 'best';

@Component({
  selector: 'guess-panel',
  templateUrl: './guess-panel.component.html',
  styleUrls: ['./guess-panel.component.scss']
})
export class GuessPanelComponent implements OnInit, OnChanges, OnDestroy{

  @Input() selectedTree;
  error: any;
  selection: Array<string> = [];
  buttonState = {};
  selectedTreeId: number;
  selectedTreeName: string;
  private points: number = 0;
  private dayScoreRef$: AngularFireObject<Score>;
  private totScoreRef$: AngularFireObject<Score>;
  private maxScoreRef$: AngularFireList<Score>;
  private today: string = '';
  private dayScore: number = 0;
  private totScore: number = 0;
  private maxScore: number = 0;


  constructor(private mapDataService: MapDataService,
              private _db: AngularFireDatabase,
              private _aS: AuthService) { }

  ngOnInit(){
    // let db = this._db.list<Score>('score/total',ref=>ref.orderByChild('p').limitToLast(1)).valueChanges().subscribe(last=>{
    //   console.log(last);
    //   if(last) {
    //     this.maxScore = last[0].p;
    //   }
    // });

    this.today = Utils.getDate();
    this.dayScoreRef$ = this._db.object<Score>(`score/day/${this._aS.getUserId()}/${this.today}`);
    this.totScoreRef$ = this._db.object<Score>(`score/total/${this._aS.getUserId()}`);
    this.maxScoreRef$ = this._db.list<Score>('score/total',ref=>ref.orderByChild('p').limitToLast(1));
    this.setScoreRefs();
   }

  ngOnChanges(values) {
    console.log(values);
    this.updateGuess(this.points);
    if (values.selectedTree.currentValue) {
      this.selectedTreeId = values.selectedTree.currentValue.attributes.OBJECTID;
      this.selectedTreeName = values.selectedTree.currentValue.attributes.baumnamede;
      this.selection = this.mapDataService.getRandomTreeNames(this._aS.level,this.selectedTreeName );
      console.log(this.selection);
      this.selection = Utils.shuffle(this.selection);
      this.initButtonState();
      this.points = 0;
    }
  }

  ngOnDestroy(){
    console.log('on destroy');
      this.updateGuess(this.points);
  }

  initButtonState() {
    this.selection.forEach(name => {
      this.buttonState[name] = 'not-guessed';
    });
  }

  selectTreeName(name: string, event) {
    if (this.selectedTree.attributes.baumnamede === name) {
      this.points += this._aS.level;
      this.buttonState[name] = 'correct';
    } else {
      this.points--;
      this.buttonState[name] = 'false';
    }
  }

  setScoreRefs(){
    this.dayScoreRef$.valueChanges().subscribe(last=>{
      if(last) {
        this.dayScore = last.p;
      }
    });
    this.totScoreRef$.valueChanges().subscribe(last=>{
      if(last) {
        this.totScore = last.p;
      }
    });
    this.maxScoreRef$.valueChanges().subscribe(last=>{
      console.log(last);
      if(last.length > 0) {
        this.maxScore = last[0].p;
      }
    })
  }

  getScore(period: scoreType): number{
    let score: number;
    switch (period){
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
    if (points!==0) {
      let guess: Guess = {
        treeId: this.selectedTreeId,
        treeNameId: this.selectedTreeName,
        points: this.points
      };
      this.setGuess(guess);
      this.updateScore('day', points);
      this.updateScore('total', points);
    }
  }

  setGuess ( guess: Guess){
    let t = Utils.getTime();
    let refLast = this._db.object(`guess/${this._aS.getUserId()}/${this.today}/${t}`);
    refLast.set(guess)
            .catch( (err) =>
              console.log(err)
            );
  }

  updateScore(period: scoreType, points: number = 0){
    let refScore: AngularFireObject<Score>;
    let pts: number = this.getScore(period) + points;
    switch(period) {
      case 'day':
        refScore = this.dayScoreRef$;
        break;
      case 'total':
        refScore = this.totScoreRef$;
        break;
      default:
        refScore = null;
    }

    if(refScore !== null) {
      refScore.set({p: pts})
        .catch(err=>
          console.log(err));
    }
  }

}
