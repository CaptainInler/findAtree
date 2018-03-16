import { Component, Input, Output } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { attr } from '../../tree';
import { trigger, state, style} from '@angular/animations';
import { showSidePanel } from '../../router.animations';
import { WindowWidthDirective } from '../../services/window-width.directive';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [showSidePanel()],
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
