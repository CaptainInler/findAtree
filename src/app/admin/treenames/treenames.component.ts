import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { User } from '../../members/user';
import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-treenames',
  templateUrl: './treenames.component.html',
  styleUrls: ['./treenames.component.scss']
})
export class TreenamesComponent {

  tn = {};
  columnsToDisplay = ['nameDeu', 'nameLat', 'gattungLat', 'artLat'];

  constructor(private db: AngularFireDatabase,
              private mapDataService: MapDataService) {

  }
  getTreenames() {
    this.tn = this.mapDataService.treeNamesMapping;
    return this.mapDataService.uniqueTreeNames;
  }

}
