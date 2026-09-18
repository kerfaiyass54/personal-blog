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
  styleUrl: './read-lesson.component.scss'
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

          this.createReading();

          this.loading = false;
        },

        error: () => {

          this.loading = false;
        }
      });
  }

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
            response.progress;
        }
      });
  }

  updateProgress(): void {

    if (
      !this.lesson ||
      !this.emailUser
    ) {
      return;
    }

    this.lessonReadingService
      .updateProgress(

        this.lesson.id,

        this.emailUser,

        {
          progress:
          this.progress
        }
      )
      .subscribe();
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

    // if (!this.quizGenerated) {
    //   return;
    // }
    //
    // this.submittingQuiz = true;
    //
    // this.quizService
    //   .submitQuiz({
    //
    //     quizId:
    //     this.quizGenerated.quizId,
    //
    //     userId:
    //     this.emailUser,
    //
    //     answers:
    //       this.quizGenerated.questions.map(
    //         (question, index) => ({
    //
    //           questionId:
    //           question.id,
    //
    //           selectedAnswer:
    //             this.answers[index] ?? ''
    //
    //         })
    //       )
    //   })
    //   .subscribe({
    //
    //     next: result => {
    //
    //       this.quizResult =
    //         result;
    //
    //       this.submittingQuiz =
    //         false;
    //
    //       bootstrap
    //         .Modal
    //         .getInstance(
    //           document.getElementById(
    //             'quizModal'
    //           )
    //         )
    //         ?.hide();
    //
    //       const resultModal =
    //         new bootstrap.Modal(
    //           document.getElementById(
    //             'resultModal'
    //           )
    //         );
    //
    //       resultModal.show();
    //     },
    //
    //     error: err => {
    //
    //       console.error(err);
    //
    //       this.submittingQuiz =
    //         false;
    //     }
    //   });
  }

  formatDate(
    date: string
  ): string {

    return new Date(
      date
    ).toLocaleDateString();
  }
}
