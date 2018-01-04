import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapService } from './map.service';

import SceneView = require('esri/views/SceneView');
import Point = require('esri/geometry/Point');
import SpatialReference = require('esri/geometry/SpatialReference');

@Component({
  selector: 'esri-map',
  template: '<div id="viewDiv"></div>',
  styleUrls: ['map.component.scss']
})
export class MapComponent {

  @Output()
  viewCreated = new EventEmitter();

  sceneView: SceneView;

  constructor(private mapService: MapService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.sceneView = new SceneView({
      container: this.elementRef.nativeElement.firstChild,
      map: this.mapService.webscene
    });
    this.viewCreated.next(this.sceneView);
  }
}
