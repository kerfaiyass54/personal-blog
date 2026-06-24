import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GeneratedPlan, Plan, PlanService} from "../services/plan.service";



@Component({
  selector: 'app-plan-generate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './plan-generate.component.html',
  styleUrl: './plan-generate.component.scss',
})
export class PlanGenerateComponent {

  private planService = inject(PlanService);

  title = signal('');

  loading = signal(false);

  generatedPlan =
    signal<GeneratedPlan | null>(null);

  generatePlan() {

    if (!this.title().trim()) return;

    this.loading.set(true);

    this.planService
      .generatePlan(this.title())
      .subscribe({
        next: (plan) => {

          this.generatedPlan.set(plan);

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  savePlan() {

    const generated =
      this.generatedPlan();

    if (!generated) return;

    const payload: Plan = {
      title: this.title(),
      articleType:
      generated.article_type,
      targetAudience:
      generated.target_audience,
      searchIntent:
      generated.search_intent,
      estimatedWordCount:
      generated.estimated_word_count,
      seoKeywords:
      generated.seo_keywords,
      outline:
      generated.outline,
    };

    this.planService
      .savePlan(payload)
      .subscribe({
        next: () => {

          alert(
            'Plan saved successfully'
          );

        }
      });
  }
}
