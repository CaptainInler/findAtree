import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';

import MapView = require('esri/views/MapView');
import * as Point from 'esri/geometry/Point';
import * as SpatialReference from 'esri/geometry/SpatialReference';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import { TreeService } from '../tree.service';
import { Tree } from '../tree';

@Component({
  selector: 'esri-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent {

  @Output()
  viewCreated = new EventEmitter();

  private mapView: MapView;
  private trees: Tree[];

  // this is needed to be able to create the MapView at the DOM element in this component
 // @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(private mapService: MapService,
              private elementRef: ElementRef,
              private treeService: TreeService) { }

  ngOnInit() {

    this.treeService.getTrees()
      .subscribe(trees => this.trees = trees );

    const mapViewProperties: any = {
     container: this.elementRef.nativeElement.firstChild,
      //     container: this.mapViewEl.nativeElement,
      map: this.mapService.map,
      center: new Point({
        x: 8.532,
        y: 47.381,
        spatialReference: new SpatialReference({ wkid: 4326 })
      }),
      zoom: 15
    }

    this.mapView = new MapView(mapViewProperties);

    this.viewCreated.next(this.mapView);
  }
}
