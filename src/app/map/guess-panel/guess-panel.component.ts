import { Component, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';

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
      this.selection = this.shuffle(this.selection);
      this.initButtonState();
    }
  }

  initButtonState() {
    this.selection.forEach(name => {
      this.buttonState[name] = 'not-guessed';
    });
  }

  shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
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
