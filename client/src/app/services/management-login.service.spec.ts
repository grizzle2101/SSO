import { TestBed } from '@angular/core/testing';

import { ManagementLoginService } from './management-login.service';

describe('LoginService', () => {
  let service: ManagementLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
