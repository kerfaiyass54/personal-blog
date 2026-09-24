import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LessonResponse } from '../../models/lesson.model';
import { LessonReadingResponse } from '../../models/lesson-reading.model';
import { LessonService } from '../../writer-ui/services/lesson.service';
import { LessonReadingService } from '../services/lesson-reading.service';

type LessonItem = LessonResponse | LessonReadingResponse;

@Component({
  selector: 'app-check-lessons-to-read',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './check-lessons-to-read.component.html',
  styleUrl: './check-lessons-to-read.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckLessonsToReadComponent implements OnInit {

  private readonly lessonService = inject(LessonService);
  private readonly readingService = inject(LessonReadingService);

  selectedTab: 'all' | 'reading' | 'completed' = 'all';

  lessons: LessonResponse[] = [];
  readingLessons: LessonReadingResponse[] = [];
  completedLessons: LessonReadingResponse[] = [];

  emailUser = sessionStorage.getItem('email') ?? '';

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get currentLessons(): LessonItem[] {
    switch (this.selectedTab) {
      case 'reading':
        return this.readingLessons;

      case 'completed':
        return this.completedLessons;

      default:
        return this.lessons;
    }
  }

  /**
   * Returns the lesson ID used for:
   * - @for tracking
   * - router navigation
   *
   * For normal lessons, the ID comes directly from the lesson.
   * For reading/completed lessons, the ID is resolved
   * using the lesson name returned by the backend.
   */
  getLessonId(lesson: LessonItem): string {
    if (this.isReadingLesson(lesson)) {
      const matchingLesson = this.lessons.find(
        item => item.title === lesson.lessonName
      );

      return matchingLesson?.id ?? '';
    }

    return lesson.id;
  }

  /**
   * Returns the title displayed on the lesson card.
   */
  getLessonTitle(lesson: LessonItem): string {
    if (this.isReadingLesson(lesson)) {
      return lesson.lessonName;
    }

    return lesson.title;
  }

  /**
   * Returns the reading progress.
   */
  getProgress(lesson: LessonItem): number {
    if (!this.isReadingLesson(lesson)) {
      return 0;
    }

    const progress = Number(lesson.progress ?? 0);

    return Math.min(
      100,
      Math.max(0, progress)
    );
  }

  /**
   * Checks whether an item is a LessonReadingResponse.
   */
  private isReadingLesson(
    lesson: LessonItem
  ): lesson is LessonReadingResponse {
    return 'lessonName' in lesson;
  }

  loadData(): void {

    /*
     * Load all lessons.
     */
    this.lessonService
      .getAllLessons()
      .subscribe({
        next: data => {
          this.lessons = data;
          this.cdr.markForCheck();
        },
        error: () => {
          this.cdr.markForCheck();
        }
      });

    /*
     * There is no user-specific reading data
     * if the email is not available.
     */
    if (!this.emailUser) {
      this.cdr.markForCheck();
      return;
    }

    /*
     * Load lessons currently being read.
     */
    this.readingService
      .getReadingsByUser(this.emailUser)
      .subscribe({
        next: data => {
          this.readingLessons = data.filter(
            reading =>
              reading.progress > 0 &&
              reading.progress < 100
          );

          this.cdr.markForCheck();
        },
        error: () => {
          this.cdr.markForCheck();
        }
      });

    /*
     * Load completed lessons.
     */
    this.readingService
      .getCompletedLessons(this.emailUser)
      .subscribe({
        next: data => {
          this.completedLessons = data;

          this.cdr.markForCheck();
        },
        error: () => {
          this.cdr.markForCheck();
        }
      });
  }
}
