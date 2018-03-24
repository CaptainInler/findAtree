import {Component, OnInit, Output, HostBinding} from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { showMap, showSidePanel } from '../router.animations';

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
    this.setSidePanelPosition(window.innerWidth);
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
    if (( winSize.height > ( 1.8 * winSize.width)) || (winSize.width < 600) ) {
      this.appState.sidePanelPosition = 'bottom';
    }else {
      this.appState.sidePanelPosition = 'right';
    }
    console.log(this.appState.sidePanelPosition);
  }

}
