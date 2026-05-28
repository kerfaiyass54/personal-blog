import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



// --------------------------------
// SERVICE
// --------------------------------

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private http = inject(HttpClient);

  private readonly API =
    'http://localhost:8083/api/recommendations';

  // --------------------------------
  // GENERATE RECOMMENDATIONS
  // POST /generate
  // --------------------------------

  generateRecommendations(
    request: any
  ): Observable<any> {

    return this.http.post(
      `${this.API}/generate`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  // --------------------------------
  // GET BY USER ID
  // GET /user/{userId}
  // --------------------------------

  getRecommendationsByUserId(
    email: any
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.API}/email/${email}`
    );
  }
}
