import { TestBed } from '@angular/core/testing';

import { Base64ConvertorService } from './base64-convertor.service';

describe('Base64ConvertorService', () => {
  let service: Base64ConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
