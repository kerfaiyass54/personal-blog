import { TestBed } from '@angular/core/testing';

import { SoundtrackServicesService } from './soundtrack-services.service';

describe('SoundtrackServicesService', () => {
  let service: SoundtrackServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundtrackServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
