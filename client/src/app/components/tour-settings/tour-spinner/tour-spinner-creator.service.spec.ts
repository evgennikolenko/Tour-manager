import { TestBed } from '@angular/core/testing';

import { TourSpinnerCreatorService } from './tour-spinner-creator.service';

describe('TourSpinnerCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TourSpinnerCreatorService = TestBed.get(TourSpinnerCreatorService);
    expect(service).toBeTruthy();
  });
});
