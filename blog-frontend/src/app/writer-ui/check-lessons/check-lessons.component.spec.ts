import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLessonsComponent } from './check-lessons.component';

describe('CheckLessonsComponent', () => {
  let component: CheckLessonsComponent;
  let fixture: ComponentFixture<CheckLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
