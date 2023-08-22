import { TestBed } from '@angular/core/testing';

import { DataPreparationService } from './data-preparation.service';

describe('DataPreparationService', () => {
  let service: DataPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
