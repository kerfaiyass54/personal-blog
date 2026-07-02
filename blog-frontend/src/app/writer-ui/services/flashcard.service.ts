import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from "../../environment";
import {Flashcard} from "../../models/flashcard.model";
import {ApiResponse} from "../../models/api-response.model";


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.springApiUrl}/flashcards`;

  getGeneratedFlashcards():
    Observable<Flashcard[]> {

    return this.http.get<Flashcard[]>(
      `${this.apiUrl}/generated`
    );
  }

  getAllFlashcards():
    Observable<Flashcard[]> {

    return this.http.get<Flashcard[]>(
      `${this.apiUrl}/all`
    );
  }

  saveGeneratedFlashcards():
    Observable<ApiResponse> {

    return this.http.post<ApiResponse>(
      `${this.apiUrl}/save`,
      {}
    );
  }

  getLessonFlashcards(
    lessonId: string
  ): Observable<Flashcard[]> {

    return this.http.get<Flashcard[]>(
      `${this.apiUrl}/lesson/${lessonId}`
    );
  }
}
