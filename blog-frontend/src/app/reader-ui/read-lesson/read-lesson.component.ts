import { ChangeDetectionStrategy } from '@angular/core';
import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
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

  private readonly lessonService =
    inject(LessonService);

  private readonly lessonReadingService =
    inject(LessonReadingService);

  private readonly quizService =
    inject(QuizService);

  lesson?: LessonResponse;

  loading = true;

  progress = 0;

  /**
   * Keeps track of the highest progress
   * reached during this lesson.
   */
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

      return;
    }

    this.lessonService
      .getLessonById(lessonId)
      .subscribe({

        next: lesson => {

          this.lesson = lesson;

          /*
           * Check if the user already has
           * a reading record for this lesson.
           */
          this.initializeReading();

          this.loading = false;
        },

        error: () => {

          this.loading = false;
        }
      });
  }

  /**
   * Checks whether the user has already
   * read this lesson.
   *
   * If yes:
   *     -> don't create another reading.
   *
   * If no:
   *     -> create a new reading.
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

        next: hasRead => {

          if (hasRead) {

            /*
             * The reading already exists.
             *
             * Do not create another one.
             *
             * Keep the current progress.
             */
            return;
          }

          /*
           * No reading exists yet.
           * Create the initial reading.
           */
          this.createReading();
        },

        error: err => {

          console.error(
            'Error checking lesson reading:',
            err
          );
        }
      });
  }

  /**
   * Creates the reading record for
   * a user who has not started this lesson yet.
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
        },

        error: err => {

          console.error(
            'Error creating lesson reading:',
            err
          );
        }
      });
  }

  /**
   * Updates the lesson progress.
   *
   * Progress is never allowed to go backwards.
   */
  updateProgress(): void {

    if (
      !this.lesson ||
      !this.emailUser
    ) {
      return;
    }

    /*
     * Make sure the progress is between
     * 0 and 100.
     */
    const currentProgress =
      Math.min(
        100,
        Math.max(
          0,
          this.progress
        )
      );

    /*
     * Keep the highest progress reached.
     */
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

          /*
           * Use the backend response as
           * the final progress value.
           */
          this.progress =
            Math.max(
              this.progress,
              response.progress ?? 0
            );

          this.maxProgress =
            this.progress;
        },

        error: err => {

          console.error(
            'Error updating lesson progress:',
            err
          );
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

          const modal =
            new bootstrap.Modal(
              document.getElementById(
                'quizModal'
              )
            );

          modal.show();
        },

        error: err => {

          console.error(err);

          this.generatingQuiz =
            false;
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
