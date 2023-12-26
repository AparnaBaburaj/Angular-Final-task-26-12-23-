import { TestBed } from '@angular/core/testing';

import { EmpProfileService } from './emp-profile.service';

describe('EmpProfileService', () => {
  let service: EmpProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
