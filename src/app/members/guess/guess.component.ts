import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {moveIn} from '../../router.animations';
import {FirebaseTN, Treename} from '../../treename';
import {TreeNameService} from '../../services/tree-name.service';
import {MapClickEvent} from '../../tree';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]':''}
})
export class GuessComponent implements OnInit {
  error: any;
  selection: Array<Treename>;
  clicks: Array<number>=[];
  answer: number;

  @Input() mapClickData: MapClickEvent;
  @Output() eventData: EventEmitter<string> = new EventEmitter<string>();

  constructor(private tNS: TreeNameService, private authService: AuthService) { }

  resetTool(event: string) {
    this.eventData.emit(event);
  }
  ngOnInit() {
    this.selection = this.tNS.getSelectionOfNames(this.authService.level-1);
    let tree: FirebaseTN = {
      id: this.mapClickData.attr.ObjectID,
      baumartlat: this.mapClickData.attr.baumartlat,
      baumgattunglat: this.mapClickData.attr.baumgattunglat,
      baumnamelat: this.mapClickData.attr.baumnamelat,
      baumnamedeu: this.mapClickData.attr.baumnamedeu,
    };
    this.answer = this.mapClickData.attr.ObjectID;
    this.selection.push(tree);
    // console.log(this.selection);
    this.selection = this.shuffle(this.selection);
    // console.log(this.selection);
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
  selectTreeName(id: number) {
    if (id===this.answer){
      this.clicks[id]=1;
    }else{
      this.clicks[id]=-1;
    }
  }
}
