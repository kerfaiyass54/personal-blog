import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FavoriteDTO {
  id: string;
  userEmail: string;
  skillName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8083/api/favorites';

  constructor(private http: HttpClient) {}

  getFavoriteSkills(email: string): Observable<FavoriteDTO[]> {
    return this.http.get<FavoriteDTO[]>(
      `${this.apiUrl}/${email}`
    );
  }

  addFavoriteSkill(email: string, skillId: string): Observable<FavoriteDTO> {
    return this.http.post<FavoriteDTO>(
      `${this.apiUrl}/${email}/${skillId}`,
      {}
    );
  }

  removeFavoriteSkill(email: string, skillId: string): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/${email}/${skillId}`,
      { responseType: 'text' }
    );
  }
}
