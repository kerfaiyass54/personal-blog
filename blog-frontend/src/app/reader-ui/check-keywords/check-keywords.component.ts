import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Skill } from '../../models/skill.model';
import {SkillService} from "../../writer-ui/services/skill.service";
import {SkillKeywordService} from "../services/skill-keyword.service";
import {KeywordService} from "../services/keyword.service";



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

  generatedKeywords: string[] = [];

  private readonly skillService = inject(SkillService);

  private readonly keywordService =
    inject(SkillKeywordService);

  private readonly keywordsService = inject(KeywordService);

  skills: Skill[] = [];

  selectedSkill = '';

  loading = false;

  keywords: string[] = [];

  keywordSearch = '';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get filteredGeneratedKeywords(): string[] {
    const search = this.keywordSearch.trim().toLowerCase();
    if (!search) return this.generatedKeywords;
    return this.generatedKeywords.filter(keyword =>
      keyword.toLowerCase().includes(search)
    );
  }

  ngOnInit(): void {
    this.loadSkills();
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

    this.generatedKeywords = [];
    this.keywords = [];

    if (!this.selectedSkill) {
      return;
    }

    this.keywordsService
      .getKeywordsBySkill(
        this.selectedSkill
      )
      .subscribe({
        next: response => {

          this.generatedKeywords =
            response.keywords ?? [];
          this.cdr.markForCheck();

        },
        error: () => {

          this.generatedKeywords = [];
          this.cdr.markForCheck();

        }
      });
  }

  checkKeywords(): void {

    if (!this.selectedSkill) {
      return;
    }

    this.loading = true;

    this.keywordService
      .publishSkill(this.selectedSkill)
      .subscribe({
        next: () => {
          this.keywordsService.getKeywordsBySkill(this.selectedSkill).subscribe({
            next: response => {
              const generatedKeywords = response.keywords ?? [];
              this.generatedKeywords = generatedKeywords;
              this.keywords = generatedKeywords;
              this.loading = false;
              this.cdr.markForCheck();
            },
            error: () => {
              this.loading = false;
              this.cdr.markForCheck();
            }
          });
        },
        error: () => {
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }
}
