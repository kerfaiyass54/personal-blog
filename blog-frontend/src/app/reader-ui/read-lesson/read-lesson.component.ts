import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  LessonResponse
} from '../../models/lesson.model';

import {
  LessonService
} from '../../writer-ui/services/lesson.service';

import {
  LessonReadingService
} from '../services/lesson-reading.service';

import {
  QuizService
} from '../services/quiz.service';

import {
  QuizGenerationResponse
} from '../../models/quiz-generation-response.model';

import {
  QuizResult
} from '../../models/quiz-result.model';

declare const bootstrap: any;

@Component({
  selector: 'app-read-lesson',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './read-lesson.component.html',
  styleUrl: './read-lesson.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadLessonComponent implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly lessonService =
    inject(LessonService);

  private readonly lessonReadingService =
    inject(LessonReadingService);

  private readonly quizService =
    inject(QuizService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  lesson?: LessonResponse;

  loading = true;

  progress = 0;

  maxProgress = 0;

  emailUser = '';

  generatingQuiz = false;

  submittingQuiz = false;

  quizGenerated?: QuizGenerationResponse;

  quizResult?: QuizResult;

  answers: Record<number, string> = {};

  ngOnInit(): void {

    this.emailUser =
      sessionStorage.getItem('email') ?? '';

    const lessonId =
      this.route.snapshot.paramMap.get('id');

    if (!lessonId) {

      this.loading = false;

      this.cdr.markForCheck();

      return;
    }

    this.lessonService
      .getLessonById(lessonId)
      .subscribe({

        next: lesson => {

          console.log(
            'Lesson received:',
            lesson
          );

          this.lesson = lesson;

          this.loading = false;

          this.cdr.markForCheck();

          this.initializeReading();
        },

        error: err => {

          console.error(
            'Error loading lesson:',
            err
          );

          this.loading = false;

          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Navigate directly to the lessons page.
   */
  goToLessons(): void {

    this.router.navigate([
      '/reader/check-lessons'
    ]);
  }

  /**
   * Checks whether a reading record already exists.
   */
  initializeReading(): void {

    if (
      !this.lesson ||
      !this.emailUser
    ) {
      return;
    }

    this.lessonReadingService
      .hasUserReadLesson(
        this.lesson.id,
        this.emailUser
      )
      .subscribe({

        next: exists => {

          console.log(
            'Reading exists:',
            exists
          );

          if (!exists) {

            this.createReading();
          }

          this.cdr.markForCheck();
        },

        error: err => {

          console.error(
            'Error checking reading:',
            err
          );

          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Creates the reading record if it
   * does not already exist.
   */
  createReading(): void {

    if (
      !this.lesson ||
      !this.emailUser
    ) {
      return;
    }

    this.lessonReadingService
      .createReading({

        lessonId:
        this.lesson.id,

        emailUser:
        this.emailUser

      })
      .subscribe({

        next: response => {

          this.progress =
            response.progress ?? 0;

          this.maxProgress =
            this.progress;

          this.cdr.markForCheck();
        },

        error: err => {

          console.error(
            'Error creating reading:',
            err
          );

          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Updates progress.
   *
   * Progress can only increase.
   */
  updateProgress(): void {

    if (
      !this.lesson ||
      !this.emailUser
    ) {
      return;
    }

    const currentProgress =
      Math.min(
        100,
        Math.max(
          0,
          Number(this.progress)
        )
      );

    this.maxProgress =
      Math.max(
        this.maxProgress,
        currentProgress
      );

    this.progress =
      this.maxProgress;

    this.lessonReadingService
      .updateProgress(

        this.lesson.id,

        this.emailUser,

        {
          progress:
          this.progress
        }

      )
      .subscribe({

        next: response => {

          this.progress =
            Math.max(
              this.progress,
              response.progress ?? 0
            );

          this.maxProgress =
            this.progress;

          this.cdr.markForCheck();
        },

        error: err => {

          console.error(
            'Error updating progress:',
            err
          );

          this.cdr.markForCheck();
        }
      });
  }

  markCompleted(): void {

    this.progress = 100;

    this.updateProgress();
  }

  generateQuiz(): void {

    if (!this.lesson) {
      return;
    }

    this.generatingQuiz = true;

    this.cdr.markForCheck();

    this.quizService
      .generateQuiz({

        lessonId:
        this.lesson.id,

        title:
        this.lesson.title,

        content:
        this.lesson.content,

        numberOfQuestions:
          5

      })
      .subscribe({

        next: quiz => {

          this.quizGenerated =
            quiz;

          this.answers = {};

          this.generatingQuiz =
            false;

          this.cdr.markForCheck();

          const modalElement =
            document.getElementById(
              'quizModal'
            );

          if (!modalElement) {
            return;
          }

          const modal =
            new bootstrap.Modal(
              modalElement
            );

          modal.show();
        },

        error: err => {

          console.error(
            'Error generating quiz:',
            err
          );

          this.generatingQuiz =
            false;

          this.cdr.markForCheck();
        }
      });
  }

  submitQuiz(): void {
    /*
     * Quiz submission can be implemented here.
     */
  }

  formatDate(
    date: string
  ): string {

    return new Date(
      date
    ).toLocaleDateString();
  }
}
