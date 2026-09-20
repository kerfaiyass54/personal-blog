import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  QuizService
} from '../services/quiz.service';

import {
  UserQuizResult
} from '../../models/user-quiz-result.model';

declare const bootstrap: any;

@Component({
  selector: 'app-check-quizzes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './check-quizzes.component.html',
  styleUrl: './check-quizzes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckQuizzesComponent
  implements OnInit {

  private readonly quizService =
    inject(QuizService);

  results: UserQuizResult[] = [];

  selectedResult?: UserQuizResult;

  loading = true;

  email = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.email =
      sessionStorage.getItem(
        'email'
      ) ?? '';

    if (!this.email) {

      this.loading = false;
      this.cdr.markForCheck();

      return;
    }

    this.quizService
      .getUserResults(this.email)
      .subscribe({

        next: results => {

          this.results = results;

          this.loading = false;
          this.cdr.markForCheck();
        },

        error: error => {

          console.error(error);

          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  openResult(
    result: UserQuizResult
  ): void {

    this.selectedResult =
      result;

    const modalElement = document.getElementById('quizResultModal');
    if (!modalElement) return;

    new bootstrap.Modal(modalElement).show();
  }

  getGrade(
    percentage: number
  ): string {

    if (percentage >= 90) {
      return 'Excellent';
    }

    if (percentage >= 75) {
      return 'Very Good';
    }

    if (percentage >= 50) {
      return 'Good';
    }

    return 'Needs Improvement';
  }
}
