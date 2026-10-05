import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddingComponent } from './profile-adding.component';

describe('ProfileAddingComponent', () => {
  let component: ProfileAddingComponent;
  let fixture: ComponentFixture<ProfileAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
