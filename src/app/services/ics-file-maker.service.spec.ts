import { TestBed } from '@angular/core/testing';

import { IcsFileMakerService } from './ics-file-maker.service';

describe('IcsFileMakerService', () => {
  let service: IcsFileMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcsFileMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
