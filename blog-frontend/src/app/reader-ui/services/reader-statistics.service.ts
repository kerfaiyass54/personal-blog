import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReaderDashboardStatistics {
  favoriteSkills: number;
  readLessons: number;
  submittedQuizzes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReaderStatisticsService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8083/api/reader/statistics';

  /**
   * PB-104
   */
  getFavoriteSkillsCount(email: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/favorite-skills/${email}`
    );
  }

  /**
   * PB-106
   */
  getReadLessonsCount(email: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/read-lessons/${email}`
    );
  }

  /**
   * PB-103
   */
  getSubmittedQuizzesCount(email: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/submitted-quizzes/${email}`
    );
  }

  /**
   * Dashboard
   */
  getDashboardStatistics(
    email: string
  ): Observable<ReaderDashboardStatistics> {

    return this.http.get<ReaderDashboardStatistics>(
      `${this.apiUrl}/dashboard/${email}`
    );
  }
}
