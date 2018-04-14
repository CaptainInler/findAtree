import { Component, ElementRef, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';
import { AppStateService } from '../../services/app-state.service';
import { attr } from '../../shared/tree';

import * as MapView from 'esri/views/MapView';
import * as LayerView from 'esri/views/layers/FeatureLayerView';
import * as VectorTileLayer from 'esri/layers/VectorTileLayer';
import * as Graphic from 'esri/Graphic';
import * as SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import * as Locate from 'esri/widgets/Locate';
import { showMap, positionMap } from '../../shared/animations';

@Component({
  selector: 'esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
  animations: [showMap(), positionMap()]
})
export class EsriMapComponent implements OnInit {

  private mapView: MapView;
  private treeLayerView: LayerView;
  private highlight = null;
  private gameBasemap: VectorTileLayer;

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

    // this.appState.showMap = 'hide';
    const map = this.mapDataService.map;

    const mapViewProperties: any = {
      container: this.elementRef.nativeElement.firstChild,
      map,
      constraints: {
        minZoom: 13
      }
    };
    this.mapView = new MapView(mapViewProperties);
    this.appState.mapView = this.mapView;
    const view = this.mapView;

    this.gameBasemap = new VectorTileLayer({
      portalItem: {
        id: "7675d44bb1e4428aa2c30a9b68f97822"
      }
    });

    const locateWidget = new Locate({
      view: view,
      graphic: new Graphic({
        symbol: new SimpleMarkerSymbol({
          style: 'circle',
          size: 15,
          color: [63, 137, 255, 0.2],
          outline: {
            color: [63, 137, 255, 1],
            width: 1.5
          }
        })
      })
    });

    view.ui.add(locateWidget, 'top-left');

    view.on('layerview-create', (evt) => {

      if (evt.layer.title === "Tree layer") {
        this.treeLayerView = <LayerView>evt.layerView;
        if (this.selectedTree) {
          console.log('layerview was created', this.selectedTree);
          console.log(this.treeLayerView);
          this.treeLayerView.watch('updating', (value) => {
            if (!value && this.selectedTree) {
              this.highlight = this.treeLayerView.highlight(this.selectedTree.attributes[attr.id])
            }
          });
        }
      }
    });

    view.on("click", (event) => {

      view.hitTest(event).then((response) => {
        // user is in the editor mode and he clicked on a tree
        const results = response.results;
        if (results.length > 0 && results[0].graphic && results[0].graphic.layer.title === "Tree layer") {
          const graphic = results[0].graphic;
          // zoom to selected feature
          view.goTo({
            target: graphic.geometry,
            zoom: view.zoom > 17 ? view.zoom : 17
          });
          this.appState.setInteraction('view');
          this.selectedTreeChanged(graphic);
          // user is in the editor mode and he clicked next to a tree
        }else {
          // in case he is in the add mode then the coordinates should be added
          if (this.appState.getInteraction() === 'add') {
            this.mapDataService.mapEventSource.next(event.mapPoint);
          } else {
            // in case he was just viewing a tree or editing a tree the selection
            // is canceled
            this.appState.setInteraction('none');
            this.selectedTreeChanged(null);
          }
        }
      });

    });

    this.appState.interactionChanged.subscribe((interaction) => {
      this.changePosition();
    });

    this.appState.modeChanged.subscribe((mode) => {
      const isGame = (mode === 'game');
      this.mapView.map.basemap.baseLayers.forEach(layer => {
        if (layer.title === 'GameBasemap') {
          layer.visible = isGame;
        } else {
          layer.visible = !isGame;
        }
      });
    });

    this.appState.selectedTreeChanged.subscribe((tree) => {
      console.log('tree changed', tree);
      this.selectedTree = tree;

      this.selectedTreeChange.emit(tree);
    });


    // this.appState.showMap = 'show';
  }

  changePosition() {
    if (this.appState.sidePanelPosition === 'right') {
      this.appState.mapPosition = (this.appState.interaction === 'none') ? 'right-closed' : 'right-open';
    }
    if (this.appState.sidePanelPosition === 'bottom'){
      this.appState.mapPosition = (this.appState.interaction === 'none') ? 'bottom-closed' : 'bottom-open';
    }
  }

  private selectedTreeChanged(tree) {
    this.selectedTree = tree;
    if (this.highlight) {
      this.highlight.remove();
    }
    this.highlight = this.treeLayerView.highlight(tree.attributes[attr.id]);

    this.selectedTreeChange.emit(tree);
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
