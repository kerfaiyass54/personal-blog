import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillRecommendationService } from '../services/skill-recommendation.service';

@Component({
  selector: 'app-skill-recommandation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-recommandation.component.html',
  styleUrl: './skill-recommandation.component.scss',
})
export class SkillRecommandationComponent {
  private recommendationService = inject(SkillRecommendationService);

  readonly fieldSuggestions = [
    'Frontend',
    'Backend',
    'Programming',
    'DevOps',
    'Database',
    'Cloud',
    'Mobile',
    'AI / Machine Learning',
    'Cyber Security',
    'Testing',
    'Data Science',
    'Architecture'
  ];

  selectedField = '';
  recommendations: string[] = [];

  loading = false;
  errorMessage = '';

  loadRecommendations(): void {
    if (!this.selectedField) {
      this.errorMessage = 'Please select a field.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.recommendations = [];

    this.recommendationService
      .getLatestRecommendationsByField(this.selectedField)
      .subscribe({
        next: (data) => {
          this.recommendations = data;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'No recommendations found.';
          this.loading = false;
        }
      });
  }
}
