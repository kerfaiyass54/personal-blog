import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPlaylistComponent } from './dash-playlist.component';

describe('DashPlaylistComponent', () => {
  let component: DashPlaylistComponent;
  let fixture: ComponentFixture<DashPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
