import { TestBed } from '@angular/core/testing';

import { ApiTemplateService } from './api-template.service';

describe('ApiTemplateService', () => {
  let service: ApiTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
