import { TestBed, inject } from '@angular/core/testing';

import { TreeNameService } from './tree-name.service';

describe('TreeNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeNameService]
    });
  });

  it('should be created', inject([TreeNameService], (service: TreeNameService) => {
    expect(service).toBeTruthy();
  }));
});
