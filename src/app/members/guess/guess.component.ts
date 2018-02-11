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
  // host: {'[@moveIn]':''}
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
    let tree: Treename = {
      id: this.mapClickData.attr.ObjectID,
      baumartlat: this.mapClickData.attr.baumartlat,
      baumgattunglat: this.mapClickData.attr.baumgattunglat,
      baumnamelat: this.mapClickData.attr.baumnamelat,
      baumnamedeu: this.mapClickData.attr.baumnamedeu,
    };
    this.selection = this.tNS.getSelectionOfNames(this.authService.level-1,tree);
    this.answer = this.mapClickData.attr.ObjectID;
    // console.log(this.selection);
  }
  selectTreeName(id: number) {
    if (id===this.answer){
      this.clicks[id]=1;
    }else{
      this.clicks[id]=-1;
    }
  }
}
