import { Injectable } from '@angular/core';

import * as Map from 'esri/Map';

@Injectable()
export class MapService {
  map: Map;
  constructor() {
    this.map = new Map({
      basemap: <any>'topo'
    });
  }
}
