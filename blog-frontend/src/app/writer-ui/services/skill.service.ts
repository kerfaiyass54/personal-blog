import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Skill } from '../../models/skill.model';
import { SkillCreate } from '../../models/skill-create.model';
import { SkillStatistics } from '../../models/skill-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8083/api/skills';

  createSkill(skill: SkillCreate): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getSkillById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  getSkillsByField(field: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(
      `${this.apiUrl}/field/${field}`
    );
  }

  skillExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/exists?name=${encodeURIComponent(name)}`
    );
  }

  getStatistics(): Observable<SkillStatistics> {
    return this.http.get<SkillStatistics>(
      `${this.apiUrl}/statistics`
    );
  }
}
