import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SkillStatistics } from '../../models/skill-statistics.model';
import { SkillFieldStats } from '../../models/skill-field-stats.model';
import {SkillService} from "../services/skill.service";

@Component({
  selector: 'app-check-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-skills.component.html',
  styleUrl: './check-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckSkillsComponent implements OnInit {

  private readonly skillService = inject(SkillService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  statistics?: SkillStatistics;

  topFields: SkillFieldStats[] = [];

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {

    this.skillService.getStatistics().subscribe({
      next: (stats) => {

        this.statistics = stats;

        this.topFields = [...stats.skillsByField]
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error(error);
        this.cdr.markForCheck();
      }
    });
  }

  goToSkillsList(): void {
    this.router.navigate(['/writer/list-skills']);
  }
}
