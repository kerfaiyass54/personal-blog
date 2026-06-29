import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateLessonRequest, LessonResponse, UpdateLessonRequest} from "../../models/lesson.model";


@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8083/api/lessons';

  createLesson(
    request: CreateLessonRequest
  ): Observable<LessonResponse> {
    return this.http.post<LessonResponse>(
      this.apiUrl,
      request
    );
  }

  getAllLessons(): Observable<LessonResponse[]> {
    return this.http.get<LessonResponse[]>(
      this.apiUrl
    );
  }

  getLessonById(id: string): Observable<LessonResponse> {
    return this.http.get<LessonResponse>(
      `${this.apiUrl}/${id}`
    );
  }

  updateLesson(
    id: string,
    request: UpdateLessonRequest
  ): Observable<LessonResponse> {
    return this.http.put<LessonResponse>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteLesson(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
