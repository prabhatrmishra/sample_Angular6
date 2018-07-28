import { TestBed, inject } from '@angular/core/testing';

import { ExtractService } from './extract.service';

describe('ExtractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractService]
    });
  });

  it('should be created', inject([ExtractService], (service: ExtractService) => {
    expect(service).toBeTruthy();
  }));
});
