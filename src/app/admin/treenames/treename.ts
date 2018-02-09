
export class Treename {
  id: number;
  baumartlat:    string;
  baumgattunglat: string;
  baumnamelat: string;
  baumnamedeu: string;
  constructor(tree) {
    this.id = tree.id;
    this.baumartlat    = tree.baumartlat;
    this.baumgattunglat = tree.baumgattunglat;
    this.baumnamelat = tree.baumnamelat;
    this.baumnamedeu = tree.baumnamedeu;
  }
}
