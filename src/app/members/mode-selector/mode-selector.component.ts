import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';


@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss'],
  animations: [moveIn(),fallIn(),moveInLeft()],
  // host: {'[@moveIn]':''}
})
export class ModeSelectorComponent implements OnInit {

  @Output() eventData:EventEmitter<string> = new EventEmitter();
  constructor(private auth: AuthService) {
  }
  resetTool(event: string) {
    this.eventData.emit(event);
  }

  ngOnInit() {
  }

}
