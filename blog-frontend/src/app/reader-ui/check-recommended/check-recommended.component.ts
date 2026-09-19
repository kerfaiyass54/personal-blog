import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillRecommendationService } from '../../writer-ui/services/skill-recommendation.service';

@Component({
  selector: 'app-check-recommended',
  imports: [CommonModule, FormsModule],
  templateUrl: './check-recommended.component.html',
  styleUrl: './check-recommended.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckRecommendedComponent {
  readonly fields = [
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

  constructor(
    private readonly recommendationService: SkillRecommendationService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  loadRecommendations(): void {
    if (!this.selectedField) {
      this.errorMessage = 'Choose a field to discover recommendations.';
      this.recommendations = [];
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.recommendations = [];
    this.cdr.markForCheck();

    this.recommendationService
      .getLatestRecommendationsByField(this.selectedField)
      .subscribe({
        next: recommendations => {
          this.recommendations = recommendations;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'No recommendations found for this field.';
          this.cdr.markForCheck();
        }
      });
  }

}
