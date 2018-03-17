import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as WebMap from 'esri/WebMap';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import * as SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import * as Point from 'esri/geometry/Point';

import * as esriConfig from 'esri/config';
import * as esriRequest from 'esri/request';

import { attr } from '../tree';
import { Utils } from '../classes/utils';
import { AppStateService } from './app-state.service';

@Injectable()
export class MapDataService {

  map: WebMap;
  layer: FeatureLayer;
  uniqueTreeNames: string[];
  uniqueQuartiers: string[];
  mapEventSource = new Subject<Point>();
  mapEvent$ = this.mapEventSource.asObservable();

  constructor(
    public appState: AppStateService) {

    this.map = new WebMap({
      portalItem: {
        id: 'b96769f9ffbf43c3bfb0603832bf2def'
      }
    });


    this.layer = this.getTreeLayer();

    this.map.add(this.layer);
    this.getUniqueTreeNames();
    this.getUniqueQuartiers();
  }

  updateTree(tree) {
    const request = esriRequest(`https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/BaumkatasterStadtZuerich/FeatureServer/0/applyEdits`, {
      method: "post",
      responseType: "json",
      query: {
          updates: [JSON.stringify(tree)],
          f: "json"
        },
      })
      .then((tree) => {
        this.recreateLayer();
        return tree;
      });
    return request;
  }

  addTree(tree) {
    return this.layer.applyEdits({
      addFeatures: [tree]
    })
      .then((tree) => {
        this.recreateLayer();
        return tree;
      })
      .otherwise(err => console.log(err));
  }

  // this function is just a hack to
  // force the layer to take the updates
  private recreateLayer(){
    this.map.remove(this.layer);
    this.layer = this.getTreeLayer();
    this.map.add(this.layer);
  }

  private getTreeLayer() {
    return new FeatureLayer({
      url: 'https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/BaumkatasterStadtZuerich/FeatureServer',
      outFields: [attr.gattungLat, attr.artLat, attr.nameLat, attr.nameDE, attr.status, attr.pflanzJahr, attr.quartier],
      title: "Tree layer",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          style: 'circle',
          size: 10,
          color: [8, 219, 187, 0.3],
          outline: {
            color: [8, 147, 126, 0.5],
            width: 1
          }
        }),
        visualVariables: [{
          type: "size",
          field: attr.pflanzJahr,
          minDataValue: 2000,
          maxDataValue: 2000,
          minSize: {
            type: "size",
            valueExpression: "$view.scale",
            stops: [{
              value: 500,
              size: 20
            }, {
              value: 10000,
              size: 5
            }]
          },
          maxSize: {
            type: "size",
            valueExpression: "$view.scale",
            stops: [{
              value: 500,
              size: 20
            }, {
              value: 10000,
              size: 5
            }]
          }
        }]
      }),
    });
  }

  private getUniqueTreeNames() {
    this.layer.queryFeatures({
      outFields: [attr.nameDE],
      returnDistinctValues: true,
      where: '1=1'
    })
      .then((result) => {
        this.uniqueTreeNames = result.features.map(feature => {
          return feature.attributes[attr.nameDE];
        });
        this.appState.showMap = 'show';
      })
      .otherwise(err => console.log(err));
  }

  private getUniqueQuartiers() {
    this.layer.queryFeatures({
      outFields: [attr.quartier],
      returnDistinctValues: true,
      where: '1=1'
    })
      .then((result) => {
        this.uniqueQuartiers = result.features.map(feature => {
          return feature.attributes[attr.quartier];
        });
      })
      .otherwise(err => console.log(err));
  }

  public getRandomTreeNames(n: number, selected: string = null): Array<string> {
    const randomTreeNames = [];
    if (selected) randomTreeNames.push(selected);
    const length = this.uniqueTreeNames.length;
    for (let i = 0; i < n; i++) {
      let randomTreeName: string = this.uniqueTreeNames[Math.floor(Math.random() * length)];
      while (Utils.contains(randomTreeNames, randomTreeName)) {
        randomTreeName = this.uniqueTreeNames[Math.floor(Math.random() * length)];
      }
      randomTreeNames.push(randomTreeName);
    }
    return randomTreeNames;
  }
}
