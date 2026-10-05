import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSocialMediaComponent } from './user-social-media.component';

describe('UserSocialMediaComponent', () => {
  let component: UserSocialMediaComponent;
  let fixture: ComponentFixture<UserSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSocialMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
