import {TestBed} from '@angular/core/testing';

import {FilterServieceService} from './filter-serviece.service';

describe('FilterServieceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterServieceService = TestBed.get(FilterServieceService);
    expect(service).toBeTruthy();
  });
});
