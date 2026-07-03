import { Injectable, inject } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Question
} from '../../models/question.model';

import {
  QuizGenerated
} from '../../models/quiz-generated.model';

import {
  QuizGenerationRequest
} from '../../models/quiz-generation-request.model';

import {
  QuizGenerationResponse
} from '../../models/quiz-generation-response.model';

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

  /**
   * Spring Boot API
   */
  private readonly API =
    'http://localhost:8083/api/quizzes';

  /**
   * Python AI Generator
   */
  private readonly PYTHON_API =
    'http://localhost:8000';

  // ====================================================
  // PYTHON
  // ====================================================

  generateQuiz(
    request: QuizGenerationRequest
  ): Observable<QuizGenerationResponse> {

    return this.http.post<
      QuizGenerationResponse
    >(
      `${this.PYTHON_API}/quiz/generate`,
      request
    );
  }

  // ====================================================
  // GENERATED QUIZZES FROM KAFKA CACHE
  // ====================================================

  getGeneratedQuizzes():
    Observable<QuizGenerated[]> {

    return this.http.get<
      QuizGenerated[]
    >(
      `${this.API}/generated`
    );
  }

  /**
   * Saves all quizzes currently received from Kafka
   * into MongoDB
   */
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

  // ====================================================
  // QUIZ QUESTIONS
  // ====================================================

  getQuizQuestions(
    quizId: string
  ): Observable<Question[]> {

    return this.http.get<
      Question[]
    >(
      `${this.API}/${quizId}/questions`
    );
  }

  // ====================================================
  // USER SUBMISSION
  // ====================================================

  /**
   * Calculates score
   * Saves UserQuizResult
   * Returns correction
   */
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

  // ====================================================
  // USER HISTORY
  // ====================================================

  getUserResults(
    userEmail: string
  ): Observable<UserQuizResult[]> {

    return this.http.get<
      UserQuizResult[]
    >(
      `${this.API}/results/${userEmail}`
    );
  }
}
