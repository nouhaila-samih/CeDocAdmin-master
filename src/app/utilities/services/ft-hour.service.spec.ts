import { TestBed } from '@angular/core/testing';

import { FtHourService } from './ft-hour.service';

describe('FtHourService', () => {
  let service: FtHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
