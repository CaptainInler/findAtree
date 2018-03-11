import { Component, Input, Output } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { attr } from '../../tree';
import { moveIn, fallIn, moveInLeft, moveInRight } from '../../router.animations';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [moveIn(),fallIn(),moveInLeft(),moveInRight()],
  // host: {'[@moveIn]':''}
})
export class SidePanelComponent {

  @Input() selectedTree;
  @Output() inEditMode = false;
  public attr = attr;

  constructor(public appState: AppStateService) { }

  toggleEditMode(value) {
    this.inEditMode = value;
    console.log(this.inEditMode);
  }

}
