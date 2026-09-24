import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

export interface ArticleDisplayDTO {
  id: string;
  title: string;
  content: string;
}

export interface SavedDTO {
  id: string;
  userEmail: string;
  articleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readonly articlesUrl =
    'http://localhost:8083/api/articles';

  private readonly savedUrl =
    'http://localhost:8083/api/saved';

  constructor(private http: HttpClient) {}

  // ==========================
  // ARTICLES
  // ==========================

  getAllArticles(): Observable<ArticleDisplayDTO[]> {
    return this.http.get<ArticleDisplayDTO[]>(
      this.articlesUrl
    );
  }

  getArticle(id: string): Observable<ArticleDisplayDTO> {
    return this.http.get<ArticleDisplayDTO>(
      `${this.articlesUrl}/${id}`
    );
  }

  // ==========================
  // SAVED ARTICLES
  // ==========================

  saveArticle(
    userEmail: string,
    articleId: string
  ): Observable<SavedDTO> {

    return this.http.post<SavedDTO>(
      `${this.savedUrl}?userEmail=${encodeURIComponent(userEmail)}&articleId=${encodeURIComponent(articleId)}`,
      {}
    );
  }

  getSavedArticles(
    userEmail: string
  ): Observable<SavedDTO[]> {

    return this.http.get<SavedDTO[]>(
      `${this.savedUrl}/${encodeURIComponent(userEmail)}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]);
        }

        return throwError(() => error);
      })
    );
  }

  removeSavedArticle(
    userEmail: string,
    articleId: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.savedUrl}?userEmail=${encodeURIComponent(userEmail)}&articleId=${encodeURIComponent(articleId)}`
    );
  }

  isArticleSaved(
    userEmail: string,
    articleId: string
  ): Observable<boolean> {

    return this.http.get<boolean>(
      `${this.savedUrl}/is-saved?userEmail=${encodeURIComponent(userEmail)}&articleId=${encodeURIComponent(articleId)}`
    );
  }
}
