import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private treeService: TreeService) {
    this.treeService.dataLoaded.subscribe(() => {
      this.title = "Find A Tree";
    })
   }
  title = "Loading data...";
}


