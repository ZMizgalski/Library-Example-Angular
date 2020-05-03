import {TestBed} from '@angular/core/testing';

import {PageFilterServieceService} from './page-filter-serviece.service';

describe('PageFilterServieceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageFilterServieceService = TestBed.get(PageFilterServieceService);
    expect(service).toBeTruthy();
  });
});
