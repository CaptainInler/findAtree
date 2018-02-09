export interface FirebaseTN {
  id: number;
  baumartlat: string;
  baumgattunglat: string;
  baumnamelat: string;
  baumnamedeu: string;
}


export class Treename {
  id: number;
  baumartlat: string;
  baumgattunglat: string;
  baumnamelat: string;
  baumnamedeu: string;

  constructor(treename: FirebaseTN){
    this.id = treename.id;
    this.baumartlat = treename.baumartlat;
    this.baumgattunglat = treename.baumgattunglat;
    this.baumnamelat = treename.baumnamelat;
    this.baumnamedeu = treename.baumnamedeu;
  }
}
