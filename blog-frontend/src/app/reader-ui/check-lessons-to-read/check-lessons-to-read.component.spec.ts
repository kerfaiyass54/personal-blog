import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLessonsToReadComponent } from './check-lessons-to-read.component';

describe('CheckLessonsToReadComponent', () => {
  let component: CheckLessonsToReadComponent;
  let fixture: ComponentFixture<CheckLessonsToReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckLessonsToReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLessonsToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
