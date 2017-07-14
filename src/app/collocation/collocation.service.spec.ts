import { TestBed, inject } from '@angular/core/testing';

import { CollocationService } from './collocation.service';

describe('CollocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollocationService]
    });
  });

  it('should be created', inject([CollocationService], (service: CollocationService) => {
    expect(service).toBeTruthy();
  }));
});
