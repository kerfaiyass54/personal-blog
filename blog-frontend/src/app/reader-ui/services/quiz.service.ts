import { Injectable, inject } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Quiz
} from '../../models/quiz.model';

import {
  Question
} from '../../models/question.model';

import {
  QuizGenerated
} from '../../models/quiz-generated.model';

import {
  SubmitQuizRequest
} from '../../models/submit-quiz-request.model';

import {
  QuizResult
} from '../../models/quiz-result.model';

import {
  UserQuizResult
} from '../../models/user-quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly http =
    inject(HttpClient);

  private readonly API =
    'http://localhost:8080/api/quizzes';

  getGeneratedQuizzes():
    Observable<QuizGenerated[]> {

    return this.http.get<
      QuizGenerated[]
    >(
      `${this.API}/generated`
    );
  }

  saveGeneratedQuizzes():
    Observable<string> {

    return this.http.post(
      `${this.API}/save`,
      {},
      {
        responseType: 'text'
      }
    );
  }

  getAllQuizzes():
    Observable<Quiz[]> {

    return this.http.get<
      Quiz[]
    >(
      this.API
    );
  }

  getQuizQuestions(
    quizId: string
  ): Observable<Question[]> {

    return this.http.get<
      Question[]
    >(
      `${this.API}/${quizId}/questions`
    );
  }

  submitQuiz(
    request: SubmitQuizRequest
  ): Observable<QuizResult> {

    return this.http.post<
      QuizResult
    >(
      `${this.API}/submit`,
      request
    );
  }

  getUserResults(
    userId: string
  ): Observable<UserQuizResult[]> {

    return this.http.get<
      UserQuizResult[]
    >(
      `${this.API}/results/${userId}`
    );
  }
}
