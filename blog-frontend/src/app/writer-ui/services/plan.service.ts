import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OutlineSection {
  heading: string;
  purpose: string;
  ideas: string[];
}

export interface GeneratedPlan {
  article_type: string;
  target_audience: string;
  search_intent: string;
  estimated_word_count: number;
  seo_keywords: string[];
  outline: OutlineSection[];
}

export interface Plan {
  id?: string;
  title: string;
  articleType: string;
  targetAudience: string;
  searchIntent: string;
  estimatedWordCount: number;
  seoKeywords: string[];
  outline: OutlineSection[];
}

export interface PlanSummary {
  id: string;
  title: string;
  articleType: string;
  estimatedWordCount: number;
  sectionsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private http = inject(HttpClient);

  private readonly AI_API =
    'http://localhost:8000/api';

  private readonly SPRING_API =
    'http://localhost:8083/api/plans';

  /**
   * Generate plan using FastAPI + Gemini
   */
  generatePlan(title: string): Observable<GeneratedPlan> {
    return this.http.post<GeneratedPlan>(
      `${this.AI_API}/generate-plan`,
      { title }
    );
  }

  /**
   * Save plan to Spring Boot
   */
  savePlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(
      this.SPRING_API,
      plan
    );
  }

  /**
   * Get all plans (summary)
   */
  getPlans(): Observable<PlanSummary[]> {
    return this.http.get<PlanSummary[]>(
      this.SPRING_API
    );
  }

  /**
   * Get one plan by id
   */
  getPlan(id: string): Observable<Plan> {
    return this.http.get<Plan>(
      `${this.SPRING_API}/${id}`
    );
  }
}
