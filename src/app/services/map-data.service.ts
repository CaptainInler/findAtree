import { Injectable } from '@angular/core';

import * as WebMap from 'esri/WebMap';
import * as FeatureLayer from 'esri/layers/FeatureLayer';
import * as SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import { attr } from '../tree';

@Injectable()
export class MapDataService {

  map: WebMap;
  layer: FeatureLayer;
  uniqueTreeNames: any[];

  constructor() {
    this.map = new WebMap({
      portalItem: {
        id: '0486802a73cb4e5f9fff5f24927e5915'
      }
    });

    this.layer = new FeatureLayer({
      url: 'https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/AlteBaeumeZuerich/FeatureServer',
      outFields: [ attr.gattungLat, attr.artLat, attr.nameLat, attr.nameDE, attr.status, attr.pflanzJahr, attr.quartier],
      renderer: new SimpleRenderer({
        symbol: new PictureMarkerSymbol({
         url: "./src/assets/images/tree.png",
         width: 15,
         height: 15
       })
     })
    });

    this.map.add(this.layer);
    this.getUniqueTreeNames();
  }

  updateTree(tree) {
    return this.layer.applyEdits({
      updateFeatures: [tree]
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
    })
    .otherwise(err => console.log(err));
  }

  public getRandomTreeNames(n: number): Array<string> {
    const randomTreeNames = [];
    const length = this.uniqueTreeNames.length;
    for ( let i = 0; i < n; i++ ) {
      randomTreeNames.push(this.uniqueTreeNames[Math.floor(Math.random() * length)])
    }
    return randomTreeNames;
  }
}
