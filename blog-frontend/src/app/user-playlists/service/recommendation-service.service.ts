import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecommendationService {

  private baseUrl =
    'http://localhost:8083/users';

  constructor(
    private http: HttpClient
  ) {}

  /* ========================= */
  /* GENERATE RECOMMENDATIONS */
  /* ========================= */

  generateRecommendations(
    email: string
  ): Observable<string> {

    return this.http.post(

      `${this.baseUrl}/${email}/recommendations`,

      {},

      {
        responseType: 'text'
      }

    );
  }

  /* ========================= */
  /* GET ALL */
  /* ========================= */

  getRecommendations(
    email: string
  ): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.baseUrl}/${email}/recommendations`

    );
  }

  /* ========================= */
  /* FILTER BY AUTHOR */
  /* ========================= */

  getRecommendationsByAuthor(

    email: string,

    author: string

  ): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.baseUrl}/${email}/recommendations/author/${author}`

    );
  }

  /* ========================= */
  /* FILTER BY TYPE */
  /* ========================= */

  getRecommendationsByType(

    email: string,

    type: string

  ): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.baseUrl}/${email}/recommendations/type/${type}`

    );
  }

}
