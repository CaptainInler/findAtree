import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as WebMap from 'esri/WebMap';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import * as SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import * as Point from 'esri/geometry/Point';

import * as esriConfig from 'esri/config';
import * as esriRequest from 'esri/request';

import { attr } from '../shared/tree';
import { Utils } from '../shared/utils';
import { AppStateService } from './app-state.service';

const treeServiceURL = 'https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/BaumkatasterStadtZuerich/FeatureServer/0';

@Injectable()
export class MapDataService {

  map: WebMap;
  layer: FeatureLayer;
  uniqueTreeNames: string[];
  uniqueQuartiers: string[];
  treeNamesMapping = {};
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
    return esriRequest(`${treeServiceURL}/applyEdits`, {
      method: "post",
      responseType: "json",
      query: {
          updates: [JSON.stringify(tree)],
          f: "json"
        },
      })
      .then((result) => {
        this.recreateLayer();
        return result;
      });
  }

  addTree(tree) {
    return this.layer.applyEdits({
      addFeatures: [tree]
    })
      .then((result) => {
        this.recreateLayer();
        return result;
      });
  }

  deleteTree(tree) {
    return esriRequest(`${treeServiceURL}/applyEdits`, {
      method: "post",
      responseType: "json",
      query: {
          deletes: [tree.attributes[attr.id]],
          f: "json"
        },
      })
      .then((result) => {
        this.recreateLayer();
        return result;
      });
  }

  // this function is just a hack to
  // force the layer to take the updates
  private recreateLayer() {
    this.map.remove(this.layer);
    this.layer = this.getTreeLayer();
    this.map.add(this.layer);
  }

  private getTreeLayer() {
    return new FeatureLayer({
      url: treeServiceURL,
      outFields: [attr.gattungLat, attr.artLat, attr.nameLat, attr.nameDE, attr.status, attr.pflanzJahr, attr.quartier],
      title: "Tree layer",
      renderer: new SimpleRenderer({
        symbol: new PictureMarkerSymbol({
          url: "./src/assets/images/tree.png"
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
              size: 40
            }, {
              value: 3000,
              size: 25
            }, {
              value: 20000,
              size: 8
            }]
          },
          maxSize: {
            type: "size",
            valueExpression: "$view.scale",
            stops: [{
              value: 500,
              size: 40
            }, {
              value: 3000,
              size: 25
            }, {
              value: 20000,
              size: 8
            }]
          }
        }]
      }),
    });
  }

  private getUniqueTreeNames() {
    this.layer.queryFeatures({
      outFields: [attr.nameDE, attr.nameLat, attr.gattungLat, attr.artLat],
      returnDistinctValues: true,
      where: '1=1'
    })
      .then((result) => {

        const treeNames = result.features.map(feature => {
          return feature.attributes[attr.nameDE];
        });

        this.uniqueTreeNames = treeNames.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        this.uniqueTreeNames.forEach(name => {
          for (let i = 0; i < result.features.length; i++) {
            const feature = result.features[i];
            if (feature.attributes[attr.nameDE] === name) {
              this.treeNamesMapping[feature.attributes[attr.nameDE]] = {
                nameLat: feature.attributes[attr.nameLat],
                gattungLat: feature.attributes[attr.gattungLat],
                artLat: feature.attributes[attr.artLat]
              }
              break;
            }
          }
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
    if (selected) {
      randomTreeNames.push(selected);
    }
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
