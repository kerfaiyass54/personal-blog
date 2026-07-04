import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStatistics {
  skills: number;
  articles: number;
  lessons: number;
  favoriteSkills: number;
  readers: number;
  quizzes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WriterStatisticsService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8083/api/writer/statistics';

  getSkillsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/skills`);
  }

  getArticlesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/articles`);
  }

  getLessonsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/lessons`);
  }

  getFavoriteSkillsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/favorite-skills`);
  }

  getReadersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/readers`);
  }

  getQuizzesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/quizzes`);
  }

  getDashboardStatistics(): Observable<DashboardStatistics> {
    return this.http.get<DashboardStatistics>(
      `${this.apiUrl}/dashboard`
    );
  }
}
