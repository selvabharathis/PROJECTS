import { TestBed } from '@angular/core/testing';

import { CommonProcessService } from './common-process.service';

describe('CommonProcessService', () => {
  let service: CommonProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
