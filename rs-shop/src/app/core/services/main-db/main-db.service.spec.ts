import { TestBed } from '@angular/core/testing';

import { MainDbService } from './main-db.service';

describe('MainDbService', () => {
  let service: MainDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
