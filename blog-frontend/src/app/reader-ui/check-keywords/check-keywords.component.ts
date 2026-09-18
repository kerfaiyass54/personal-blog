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
  styleUrl: './check-keywords.component.scss'
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

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {

    this.skillService
      .getAllSkills()
      .subscribe({
        next: skills => {
          this.skills = skills;
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

        },
        error: () => {

          this.generatedKeywords = [];

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
        next: (response: any) => {

          /*
           Expected:
           {
             skill: "Python",
             keywords: [...]
           }
          */
          this.onSkillChange();

          this.keywords =
            response?.keywords ?? [];

          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}
