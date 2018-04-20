import { TestBed, async, inject } from '@angular/core/testing';

import { MapDataService } from './map-data.service';

describe('MapDataService', () => {

  let service: MapDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MapDataService]
    });
  }));

  it('service should be created', async(
    inject([MapDataService], (service: MapDataService) => {
      expect(service).toBeTruthy();
    })
  ));

  it('service should contain a map', async(
    inject([MapDataService], (service: MapDataService) => {
      expect(service.map).toBeTruthy();
    })
  ));

  it('service should contain the tree feature layer', async(
    inject([MapDataService], (service: MapDataService) => {
      expect(service.layer.type).toEqual('feature');
    })
  ));

  it('service should have a list of 38 quartiers', async(
    inject([MapDataService], (service: MapDataService) => {
      service.getUniqueQuartiers().then((result: string[]) => {
        expect(result.length).toEqual(38);
      });
    })
  ));

  it('getRandom trees should return 3 tree names', async(
    inject([MapDataService], (service: MapDataService) => {
      service.uniqueTreeNames = ["tree 1", "tree 2", "tree 3", "tree 4"];
      const treeNames = service.getRandomTreeNames(3);
      expect(treeNames.length).toEqual(3);
    })
  ));
});
