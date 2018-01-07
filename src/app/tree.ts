export class Tree {
  geometry: {
    coordinates: {
      0: {
        0: number;
        1: number;
      }
    }
    type: string;
  }
  properties: {
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
  type: string;

constructor(
  x: number,
  y: number,
  type: string,
  id: number,
  baumartlat: string,
  baumgattunglat: string,
  baumnamedeu: string,
  baumnamelat: string,
  baumnummer: string,
  baumtyp: string,
  genauigkeit: string,
  kategorie: string,
  quartier: string,
  status: string,
  strasse: string,
){
  this.geometry.coordinates[0][0] = x;
  this.geometry.coordinates[0][1] = y;
  this.geometry.type = type;
  this.properties.ObjectID = id;
  this.properties.baumartlat=baumartlat;
  this.properties.baumgattunglat=baumgattunglat;
  this.properties.baumnamedeu=baumnamedeu;
  this.properties.baumnamelat=baumnamelat;
  this.properties.baumnummer=baumnummer;
  this.properties.baumtyp=baumtyp;
  this.properties.genauigkeit=genauigkeit;
  this.properties.kategorie=kategorie;
  this.properties.quartier=quartier;
  this.properties.status=status;
  this.properties.strasse=strasse;
}
}
