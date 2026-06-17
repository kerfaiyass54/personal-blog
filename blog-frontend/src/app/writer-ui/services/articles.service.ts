import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleCreateDTO {
  title: string;
  content: string;
}

export interface ArticleUpdateDTO {
  title: string;
  content: string;
}

export interface ArticleDisplayDTO {
  id: string;
  title: string;
  content: string;
  dateInsert: Date;
  dateUpdate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {

  private readonly apiUrl = 'http://localhost:8083/api/articles';

  constructor(private http: HttpClient) {}

  /**
   * Create article
   */
  createArticle(article: ArticleCreateDTO): Observable<ArticleDisplayDTO> {
    return this.http.post<ArticleDisplayDTO>(this.apiUrl, article);
  }

  /**
   * Get all articles
   */
  getAllArticles(): Observable<ArticleDisplayDTO[]> {
    return this.http.get<ArticleDisplayDTO[]>(this.apiUrl);
  }

  /**
   * Get article by id
   */
  getArticle(id: string): Observable<ArticleDisplayDTO> {
    return this.http.get<ArticleDisplayDTO>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update article
   */
  updateArticle(
    id: string,
    article: ArticleUpdateDTO
  ): Observable<ArticleDisplayDTO> {
    return this.http.put<ArticleDisplayDTO>(
      `${this.apiUrl}/${id}`,
      article
    );
  }

  /**
   * Delete article
   */
  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
