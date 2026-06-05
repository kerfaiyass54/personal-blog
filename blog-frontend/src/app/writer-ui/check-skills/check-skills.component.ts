import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillStatistics } from '../../models/skill-statistics.model';
import {SkillService} from "../services/skill.service";

@Component({
  selector: 'app-check-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-skills.component.html',
  styleUrl: './check-skills.component.scss',
})
export class CheckSkillsComponent implements OnInit {

  private readonly skillService = inject(SkillService);

  statistics?: SkillStatistics;
  loading = true;

  ngOnInit(): void {
    this.skillService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }
}
