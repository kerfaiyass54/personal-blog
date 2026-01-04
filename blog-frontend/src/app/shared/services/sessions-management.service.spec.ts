import { TestBed } from '@angular/core/testing';

import { SessionsManagementService } from './sessions-management.service';

describe('SessionsManagementService', () => {
  let service: SessionsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
