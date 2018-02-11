import { Component, Input, Output } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { attr } from '../../tree';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  @Input() selectedTree;
  @Output() inEditMode: boolean = false;
  public attr = attr;

  constructor(public appState: AppStateService) { }

  toggleEditMode(value) {
    this.inEditMode = value;
  }

}
