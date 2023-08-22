import { TestBed } from '@angular/core/testing';

import { WorkerControlService } from './worker-control.service';

describe('MockDataService', () => {
  let service: WorkerControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
