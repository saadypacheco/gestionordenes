import { TestBed } from '@angular/core/testing';

import { UIserviceService } from './uiservice.service';

describe('UIserviceService', () => {
  let service: UIserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
