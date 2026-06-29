import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateLessonReadingRequest,
  LessonReadingResponse,
  UpdateProgressRequest
} from "../../models/lesson-reading.model";



@Injectable({
  providedIn: 'root'
})
export class LessonReadingService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8083/api/lesson-readings';

  createReading(
    request: CreateLessonReadingRequest
  ): Observable<LessonReadingResponse> {

    return this.http.post<LessonReadingResponse>(
      this.apiUrl,
      request
    );
  }

  updateProgress(
    lessonId: string,
    emailUser: string,
    request: UpdateProgressRequest
  ): Observable<LessonReadingResponse> {

    const params = new HttpParams()
      .set('emailUser', emailUser);

    return this.http.put<LessonReadingResponse>(
      `${this.apiUrl}/${lessonId}/progress`,
      request,
      { params }
    );
  }

  getReadingsByUser(
    emailUser: string
  ): Observable<LessonReadingResponse[]> {

    return this.http.get<LessonReadingResponse[]>(
      `${this.apiUrl}/user/${emailUser}`
    );
  }

  getCompletedLessons(
    emailUser: string
  ): Observable<LessonReadingResponse[]> {

    return this.http.get<LessonReadingResponse[]>(
      `${this.apiUrl}/user/${emailUser}/completed`
    );
  }
}
