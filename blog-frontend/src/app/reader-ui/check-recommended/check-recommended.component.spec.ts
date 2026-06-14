import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRecommendedComponent } from './check-recommended.component';

describe('CheckRecommendedComponent', () => {
  let component: CheckRecommendedComponent;
  let fixture: ComponentFixture<CheckRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckRecommendedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
