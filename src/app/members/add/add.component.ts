import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {moveIn} from '../../router.animations';
import {Treename} from '../../treename';
import {TreeNameService} from '../../services/tree-name.service';
import {MapClickEvent} from '../../tree';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]':''}
})
export class AddComponent implements OnInit {

  @Input() treeData: MapClickEvent;

  constructor() { }

  ngOnInit() {
  }

}
