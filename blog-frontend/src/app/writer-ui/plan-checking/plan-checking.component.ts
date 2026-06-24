import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanService, PlanSummary} from "../services/plan.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-plan-checking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-checking.component.html',
  styleUrl: './plan-checking.component.scss',
})
export class PlanCheckingComponent implements OnInit {

  private planService = inject(PlanService);

  plans = signal<PlanSummary[]>([]);
  loading = signal(true);
  private router = inject(Router);
  selectedPlan = signal<any>(null);

  ngOnInit(): void {
    this.loadPlans();
  }

  goToGeneratePlan(): void {
    this.router.navigate(['/writer/generate-plan']);
  }

  viewPlan(plan: PlanSummary): void {
    this.planService.getPlan(plan.id)
      .subscribe({
        next: (response) => {
          this.selectedPlan.set(response);
        }
      });
  }
  exportPlan(): void {

    const plan = this.selectedPlan();

    if (!plan) return;

    let content = '';

    content += `TITLE\n`;
    content += `${plan.title}\n\n`;

    content += `ARTICLE TYPE\n`;
    content += `${plan.articleType}\n\n`;

    content += `TARGET AUDIENCE\n`;
    content += `${plan.targetAudience}\n\n`;

    content += `SEARCH INTENT\n`;
    content += `${plan.searchIntent}\n\n`;

    content += `ESTIMATED WORD COUNT\n`;
    content += `${plan.estimatedWordCount}\n\n`;

    content += `SEO KEYWORDS\n`;

    plan.seoKeywords?.forEach(
      (keyword: string) => {
        content += `- ${keyword}\n`;
      }
    );

    content += `\n`;

    content += `OUTLINE\n\n`;

    plan.outline?.forEach(
      (section: any, index: number) => {

        content += `${index + 1}. ${section.heading}\n`;
        content += `${section.purpose}\n\n`;

        section.ideas?.forEach(
          (idea: string) => {
            content += `   • ${idea}\n`;
          }
        );

        content += '\n';
      }
    );

    const blob = new Blob(
      [content],
      { type: 'text/plain;charset=utf-8' }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement('a');

    a.href = url;

    a.download =
      `${plan.title
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}_plan.txt`;

    a.click();

    window.URL.revokeObjectURL(url);
  }


  loadPlans(): void {
    this.loading.set(true);

    this.planService.getPlans().subscribe({
      next: (plans) => {
        this.plans.set(plans);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
      },
    });
  }

  trackById(_: number, item: PlanSummary) {
    return item.id;
  }

  openPlan(id: string) {
    console.log('Open plan:', id);

    // router navigation later
    // this.router.navigate(['/plans', id]);
  }
}
