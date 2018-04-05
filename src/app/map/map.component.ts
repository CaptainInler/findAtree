import {Component, OnInit, Output, HostBinding} from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { showMap, showSidePanel } from '../shared/animations';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [showMap(), showSidePanel()],
})
export class MapComponent implements OnInit {

  // @HostBinding('[@showSidePanel]="appState.sidePanelPosition"')
  // public showSidePanel = true;
  @Output() selectedTree;
  // public sidePanelPosition: string  = 'bottom';

  constructor(
    public appState: AppStateService
  ) {  }

  ngOnInit () {
    this.setSidePanelPosition({ width: window.innerWidth, height: window.innerHeight });
  }

  selectedTreeChange(tree) {
    this.selectedTree = tree;
  }

  toggleAddInteraction() {
    if (this.appState.getInteraction() !== 'add') {
      this.appState.setInteraction('add');
      // remove the existing selection when user wants to add a tree
      this.selectedTree = null;
    } else {
      this.appState.setInteraction('none');
    }
  }

  setSidePanelPosition(winSize: any) {
    console.log(winSize.width);
    console.log(winSize.height);
    if (( winSize.height > ( 1.6 * winSize.width)) || (winSize.width < 840) ) {
      this.appState.sidePanelPosition = 'bottom';
    }else {
      this.appState.sidePanelPosition = 'right';
    }
    console.log(this.appState.sidePanelPosition);
  }

}
