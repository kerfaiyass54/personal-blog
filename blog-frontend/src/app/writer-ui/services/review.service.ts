import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleReviewRequest {
  article: string;
}

export interface Mistake {
  original: string;
  correction: string;
  explanation: string;
}

export interface ArticleReviewResponse {
  mistakes: Mistake[];
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'http://localhost:8000/api';

  reviewArticle(
    article: string
  ): Observable<ArticleReviewResponse> {

    const payload: ArticleReviewRequest = {
      article
    };

    return this.http.post<ArticleReviewResponse>(
      `${this.API_URL}/review`,
      payload
    );
  }
}
