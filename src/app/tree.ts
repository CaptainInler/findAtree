import * as Geometry from 'esri/geometry/Geometry';
import * as Point from 'esri/geometry/Point';

export const attributeNames = [{
    fieldName: "ObjectID",
    label: "ObjectID",
    visible: false,
    type: "oid"
  }, {
    fieldName: "kategorie",
    label: "Kategorie",
    visible: true,
    type: "string"
  }, {
    fieldName: "quartier",
    label: "Quartier",
    visible: true,
    type: "string"
  }, {
    fieldName: "strasse",
    label: "Strasse",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumgattunglat",
    label: "Gattung",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumartlat",
    label: "Art",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumnamelat",
    label: "Name",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumnamedeu",
    label: "Name deu.",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumnummer",
    label: "Nummer",
    visible: true,
    type: "string"
  }, {
    fieldName: "status",
    label: "Status",
    visible: true,
    type: "string"
  }, {
    fieldName: "baumtyp",
    label: "Typ",
    visible: true,
    type: "number"
  }, {
    fieldName: "bumtyptext",
    label: "Typ txt.",
    visible: true,
    type: "string"
  }, {
    fieldName: "genauigkeit",
    label: "Genauigkeit",
    visible: true,
    type: "string"
  }
];

export class MapClickEvent {
  lat: number;
  lon: number;
  attr: Attributes;
}

interface Attributes {
  ObjectID: number;
  baumartlat: string;
  baumgattunglat: string;
  baumnamedeu: string;
  baumnamelat: string;
  baumnummer: string;
  baumtyp: string;
  genauigkeit: string;
  kategorie: string;
  quartier: string;
  status: string;
  strasse: string;
}

export interface FirebaseFeature {
  geometry: {
    coordinates: [
      0,
      1
    ]
  },
  properties: Attributes
}
/*
export class Tree {
  static index: number = 0;
  geometry: Point;
  attributes: Attributes;

  constructor(feature: FirebaseFeature){
    this.geometry = new Point({
        x: feature.geometry.coordinates[0],
        y: feature.geometry.coordinates[1]
    });
    this.attributes = feature.properties;
    this.attributes.ObjectID = Tree.index++;
  }
} */

export enum attr {
  gattungLat = 'baumgattun',
  artLat = 'baumartlat',
  nameLat = 'baumnamela',
  nameDE = 'baumnamede',
  status = 'status',
  pflanzJahr = 'pflanzjahr',
  quartier = 'quartier',
  id= 'FID'
}


export interface Tree {
  geometry: Geometry;
  attributes: attr;
}
