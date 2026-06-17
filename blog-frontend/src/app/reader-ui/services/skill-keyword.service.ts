import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillKeywordService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8083/api/skill-keywords';

  publishSkill(skill: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/publish/${encodeURIComponent(skill)}`,
      {},
      {
        responseType: 'text'
      }
    );
  }
}
