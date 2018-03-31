import { Component, ElementRef, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';

import * as MapView from 'esri/views/MapView';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import { showMap} from '../../router.animations';

@Component({
  selector: 'esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
  animations: [showMap()],
})
export class EsriMapComponent implements OnInit {

  private mapView: MapView;
  private treeLayer: FeatureLayer;

  @Output()
  selectedTreeChange = new EventEmitter();

  private _selectedTree;
  @Input()
  set selectedTree(tree) {
    this._selectedTree = tree;
  }
  get selectedTree() {
    return this._selectedTree;
  }

  constructor(
    private mapDataService: MapDataService,
    private elementRef: ElementRef,
    public appState: AppStateService
  ) { }

  ngOnInit() {

    this.appState.showMap = 'hide';
    const map = this.mapDataService.map;

    const mapViewProperties: any = {
      container: this.elementRef.nativeElement.firstChild,
      map,
      constraints: {
        minZoom: 13
      }
    };
    this.mapView = new MapView(mapViewProperties);

    const view = this.mapView;

    view.on("click", (event) => {

      view.hitTest(event).then((response) => {

        // user is in the editor mode and he clicked on a tree
        if (response.results.length > 0) {
          const result = response.results[0];
          if (result.graphic && result.graphic.layer.title === "AlteBaeumeZuerich") {

            // zoom to selected feature
            view.goTo({
              target: result.graphic.geometry,
              zoom: 18
            });

            this.appState.setInteraction('view');

            this.selectedTree = result.graphic;
            this.selectedTreeChange.emit(result.graphic);

            // user is in the editor mode and he clicked next to a tree
          }else {
          console.log(this.appState.getInteraction(), event.mapPoint);
          // in case he is in the add mode then the coordinates should be added
          if (this.appState.getInteraction() === 'add') {
            this.mapDataService.mapEventSource.next(event.mapPoint);
          } else {
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

    // this.appState.showMap = 'show';
  }

  changePadding(padding: number) {
    this.mapView.padding = {
      right: padding
    };
  }

}

// function that calculates map view padding depending on viewport width
function getMaxPadding(fixPadding: number): number {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  let maxPadding = 30 / 100 * x;
  if (fixPadding > maxPadding) {
    maxPadding = fixPadding;
  }
  return maxPadding;
}
