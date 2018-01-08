import { Injectable } from '@angular/core';

import * as WebMap from 'esri/WebMap';

@Injectable()
export class MapService {
  map: WebMap;
  constructor() {
    this.map = new WebMap({
      portalItem: {
        id: '0486802a73cb4e5f9fff5f24927e5915'
      }
    });
  }
}
