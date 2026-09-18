import { Component, OnInit, inject } from '@angular/core';
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
  styleUrl: './check-skills.component.scss'
})
export class CheckSkillsComponent implements OnInit {

  private readonly skillService = inject(SkillService);
  private readonly router = inject(Router);

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
      },
      error: console.error
    });
  }

  goToSkillsList(): void {
    this.router.navigate(['/writer/list-skills']);
  }
}
