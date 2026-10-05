import { TestBed } from '@angular/core/testing';

import { PlaylistServicesService } from './playlist-services.service';

describe('PlaylistServicesService', () => {
  let service: PlaylistServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
