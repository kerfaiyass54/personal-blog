import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoundtrackComponent } from './add-soundtrack.component';

describe('AddSoundtrackComponent', () => {
  let component: AddSoundtrackComponent;
  let fixture: ComponentFixture<AddSoundtrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoundtrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoundtrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
