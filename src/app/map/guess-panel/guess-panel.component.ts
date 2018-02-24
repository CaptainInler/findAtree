import { Component, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { Utils} from '../../classes/utils';

@Component({
  selector: 'guess-panel',
  templateUrl: './guess-panel.component.html',
  styleUrls: ['./guess-panel.component.scss']
})
export class GuessPanelComponent {

  @Input() selectedTree;
  error: any;
  selection: Array<string> = [];
  correctAnswer: boolean = false;
  buttonState = {};

  constructor(private mapDataService: MapDataService) { }

  ngOnChanges(values) {
    if (values.selectedTree.currentValue) {
      this.correctAnswer = false;
      this.selection = this.mapDataService.getRandomTreeNames(3);
      console.log(this.selection);
      const name = values.selectedTree.currentValue.attributes.baumnamede;
      this.selection.push(name);
      this.selection = Utils.shuffle(this.selection);
      this.initButtonState();
    }
  }

  initButtonState() {
    this.selection.forEach(name => {
      this.buttonState[name] = 'not-guessed';
    });
  }

  selectTreeName(name: string, event) {
    if (this.selectedTree.attributes.baumnamede === name) {
      this.correctAnswer = true;
      this.buttonState[name] = 'correct';
    } else {
      this.correctAnswer = false;
      this.buttonState[name] = 'false';
    }
  }

}
