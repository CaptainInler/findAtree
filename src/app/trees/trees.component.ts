import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TreeService } from '../tree.service';
import { Tree } from '../tree';

@Component({
  //selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {
  trees: Tree[];
  constructor(private treeService: TreeService) {
  }
  ngOnInit() {
    this.getTrees();
  }
  getTrees(): void {
    this.treeService.getTrees()
      .subscribe(trees => this.trees = trees );
  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
