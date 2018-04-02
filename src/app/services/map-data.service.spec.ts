import { TestBed, async, inject } from '@angular/core/testing';

import { MapDataService } from './map-data.service';

describe('MapDataService', () => {

  let service: MapDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MapDataService]
    });
  }));

  it('service should be created', async(inject([MapDataService], (service: MapDataService) => {
    expect(service).toBeTruthy();
  })));
});
