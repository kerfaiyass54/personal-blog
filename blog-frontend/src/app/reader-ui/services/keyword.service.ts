import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8083/api/keywords';

  getKeywordsBySkill(
    skill: string
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${encodeURIComponent(skill)}`
    );
  }
}
