import {TestBed} from '@angular/core/testing';

import {EditProductService} from './edit-product.service';

describe('EditProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditProductService = TestBed.get(EditProductService);
    expect(service).toBeTruthy();
  });
});
