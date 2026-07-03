import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQuizzesComponent } from './check-quizzes.component';

describe('CheckQuizzesComponent', () => {
  let component: CheckQuizzesComponent;
  let fixture: ComponentFixture<CheckQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
