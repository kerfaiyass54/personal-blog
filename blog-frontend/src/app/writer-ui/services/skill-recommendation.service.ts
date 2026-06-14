import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillRecommendationService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8083/api/skills-recommendations';

  getLatestRecommendationsByField(field: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${field}`);
  }
}
