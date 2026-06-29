import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLessonComponent } from './read-lesson.component';

describe('ReadLessonComponent', () => {
  let component: ReadLessonComponent;
  let fixture: ComponentFixture<ReadLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
