import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {moveIn} from '../../router.animations';
import {Treename} from '../../treename';
import {TreeNameService} from '../../services/tree-name.service';
import {MapClickEvent} from '../../tree';

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

  @Input() mapClickData: MapClickEvent;
  @Output() eventData: EventEmitter<string> = new EventEmitter<string>();

  constructor(private tNS: TreeNameService) { }

  resetTool(event: string) {
    this.eventData.emit(event);
  }
  ngOnInit() {
    this.selection = this.tNS.getSelectionOfNames(5);
  }
  selectTreeName(name:string) {
    alert('You have selected: '+ name);
  }
}
