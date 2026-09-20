import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Skill } from '../../models/skill.model';
import { SkillService } from '../../writer-ui/services/skill.service';
import { SkillKeywordService } from '../services/skill-keyword.service';
import { KeywordService } from '../services/keyword.service';

@Component({
  selector: 'app-check-keywords',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './check-keywords.component.html',
  styleUrl: './check-keywords.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckKeywordsComponent implements OnInit {

  private readonly skillService = inject(SkillService);
  private readonly keywordService = inject(SkillKeywordService);
  private readonly keywordsService = inject(KeywordService);
  private readonly location = inject(Location);

  skills: Skill[] = [];
  selectedSkill = '';

  loading = false;
  errorMessage = '';

  keywords: string[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  goBack(): void {
    this.location.back();
  }

  loadSkills(): void {
    this.skillService
      .getAllSkills()
      .subscribe({
        next: skills => {
          this.skills = skills;
          this.cdr.markForCheck();
        }
      });
  }

  onSkillChange(): void {
    this.keywords = [];
    this.errorMessage = '';

    this.cdr.markForCheck();
  }

  checkKeywords(): void {
    if (!this.selectedSkill) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.keywords = [];

    this.keywordService
      .publishSkill(this.selectedSkill)
      .subscribe({
        next: () => {
          this.keywordsService
            .getKeywordsBySkill(this.selectedSkill)
            .subscribe({
              next: response => {
                this.keywords = response.keywords ?? [];
                this.loading = false;
                this.cdr.markForCheck();
              },
              error: () => {
                this.loading = false;
                this.errorMessage =
                  'The keywords were generated, but the results could not be loaded yet.';

                this.cdr.markForCheck();
              }
            });
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Keyword generation failed. Please try again.';
          this.cdr.markForCheck();
        }
      });
  }
}
