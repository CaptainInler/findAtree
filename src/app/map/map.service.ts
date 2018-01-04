import { Injectable } from '@angular/core';

import * as WebScene from 'esri/WebScene';
import * as esriConfig from 'esri/config';

@Injectable()
export class MapService {
  webscene: WebScene;
  constructor() {
    esriConfig.request.corsEnabledServers.push("a.tile.stamen.com", "b.tile.stamen.com", "c.tile.stamen.com", "d.tile.stamen.com");
    this.webscene = new WebScene({
      portalItem: {
        id: 'c01e6ad0e45449e39354e08c1158e706'
      }
    });
  }
}