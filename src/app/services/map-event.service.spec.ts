import { TestBed, inject } from '@angular/core/testing';

import { MapEventService } from './map-event.service';

describe('MapEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapEventService]
    });
  });

  it('should be created', inject([MapEventService], (service: MapEventService) => {
    expect(service).toBeTruthy();
  }));
});
