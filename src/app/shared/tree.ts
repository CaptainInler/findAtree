import * as Geometry from 'esri/geometry/Geometry';


export enum attr {
  gattungLat = 'baumgattun',
  artLat = 'baumartlat',
  nameLat = 'baumnamela',
  nameDE = 'baumnamede',
  status = 'status',
  pflanzJahr = 'pflanzjahr',
  quartier = 'quartier',
  id = 'FID'
}


export interface Tree {
  geometry: Geometry;
  attributes: attr;
}
