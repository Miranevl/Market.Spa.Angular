import { TestBed } from '@angular/core/testing';

import { AddAndUpdateService } from './add-and-update.service';

describe('AddAndUpdateService', () => {
  let service: AddAndUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAndUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
