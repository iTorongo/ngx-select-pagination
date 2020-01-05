import { TestBed } from '@angular/core/testing';

import { SelectPaginationService } from './select-pagination.service';

describe('SelectPaginationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectPaginationService = TestBed.get(SelectPaginationService);
    expect(service).toBeTruthy();
  });
});
