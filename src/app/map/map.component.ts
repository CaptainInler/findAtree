import { Component, Output } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import {moveInRight, showMap} from '../router.animations';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [showMap(), moveInRight()],
})
export class MapComponent {

  @Output() selectedTree;

  constructor(
    private appState: AppStateService
  ) { }

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

}
