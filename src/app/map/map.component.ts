import {Component, OnInit, Output} from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { showMap } from '../router.animations';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [showMap()],
})
export class MapComponent implements OnInit{

  @Output() selectedTree;
  public sidePanelPosition: string  = 'bottom';

  constructor(
    private appState: AppStateService
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

  setSidePanelPosition(winWidth: number){
    if (winWidth < 600){
      this.appState.sidePanelPosition = 'bottom';
    }else{
      this.appState.sidePanelPosition = 'right';
    }
  }

}
