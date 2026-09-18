import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Skill } from '../../models/skill.model';
import {SkillService} from "../services/skill.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-skills.component.html',
  styleUrl: './list-skills.component.scss',
})
export class ListSkillsComponent implements OnInit {

  private readonly skillService = inject(SkillService);
  private readonly router = inject(Router);


  skills: Skill[] = [];

  ngOnInit(): void {
    this.loadSkills();
  }

  goBack(): void {
    this.router.navigate(['/writer/check-skills']);
  }

  private loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: console.error
    });
  }

  getFieldEmoji(field: string): string {

    const value = field.toLowerCase();

    if (value.includes('frontend')) return '🎨';
    if (value.includes('backend')) return '⚙️';
    if (value.includes('database')) return '🗄️';
    if (value.includes('devops')) return '🚀';
    if (value.includes('cloud')) return '☁️';
    if (value.includes('security')) return '🔐';
    if (value.includes('mobile')) return '📱';
    if (value.includes('ai')) return '🤖';
    if (value.includes('machine')) return '🤖';
    if (value.includes('testing')) return '🧪';
    if (value.includes('data')) return '📊';

    return '💡';
  }
}
