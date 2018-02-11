import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';

import * as MapView  from 'esri/views/MapView';
import * as FeatureLayer from 'esri/layers/FeatureLayer';

@Component({
  selector: 'esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent {

  private mapView: MapView;
  private treeLayer: FeatureLayer;

  @Output()
  selectedTreeChange = new EventEmitter();

  private _selectedTree;
  @Input()
  set selectedTree(tree) {
    this._selectedTree = tree;
  };
  get selectedTree() {
    return this._selectedTree;
  }

  constructor(
    private mapDataService: MapDataService,
    private elementRef: ElementRef,
    public appState: AppStateService
  ) { }

  ngOnInit() {

    var map = this.mapDataService.map;

    const mapViewProperties: any = {
      container: this.elementRef.nativeElement.firstChild,
      map
    }
    this.mapView = new MapView(mapViewProperties);

    let view = this.mapView;

    view.on("click", (event) => {

      view.hitTest(event).then((response) => {

        if (this.appState.getMode() === 'editor') {
          // user is in the editor mode and he clicked on a tree
          if (response.results.length > 0) {
            let result = response.results[0];
            if (result.graphic) {

              // zoom to selected feature
              view.goTo({
                target: result.graphic.geometry,
                zoom: 18
              });

              this.appState.setInteraction('view');

              this.selectedTree = result.graphic;
              this.selectedTreeChange.emit(result.graphic);
            }
          }
          // user is in the editor mode and he clicked next to a tree
          else {
            // in case he is in the add mode then the coordinates should be added
            if (this.appState.getInteraction() === 'add') {
              console.log(event);
            }
            else {
              // in case he was just viewing a tree or editing a tree the selection
              // is canceled
              this.appState.setInteraction('none');
              this.selectedTree = null;
              this.selectedTreeChange.emit(null);
            }
          }
        }
      });

    });

    this.appState.interactionChanged.subscribe((interaction) => {
      if (interaction === 'none') {
        this.changePadding(0);
      } else {
        this.changePadding(400);
      }
    });
  }

  changePadding(padding: number) {
    this.mapView.padding = {
      right: padding
    }
  }

}

// function that calculates map view padding depending on viewport width
function getMaxPadding(fixPadding: number): number {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  let maxPadding = 30/100*x;
  if (fixPadding > maxPadding) {
    maxPadding = fixPadding;
  }
  return maxPadding;
}
