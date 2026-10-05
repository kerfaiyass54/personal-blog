import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMusicComponent } from './dash-music.component';

describe('DashMusicComponent', () => {
  let component: DashMusicComponent;
  let fixture: ComponentFixture<DashMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashMusicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
