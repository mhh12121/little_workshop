import { TestBed, inject } from '@angular/core/testing';

import { GiphySqlService } from './giphy-sql.service';

describe('GiphySqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiphySqlService]
    });
  });

  it('should be created', inject([GiphySqlService], (service: GiphySqlService) => {
    expect(service).toBeTruthy();
  }));
});
