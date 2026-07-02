import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from "../../environment";
import {Lesson} from "../../models/lesson.model";
import {GenerationResponse} from "../../models/generation-response.model";



@Injectable({
  providedIn: 'root'
})
export class AiFlashcardService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.aiApiUrl}/flashcards`;

  generateFlashcards(
    lesson: Lesson
  ): Observable<GenerationResponse> {

    return this.http.post<GenerationResponse>(
      `${this.apiUrl}/generate`,
      lesson
    );
  }
}
