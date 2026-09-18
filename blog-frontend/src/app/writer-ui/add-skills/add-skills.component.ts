import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { SkillCreate } from '../../models/skill-create.model';
import {SkillService} from "../services/skill.service";

@Component({
  selector: 'app-add-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.scss',
})
export class AddSkillsComponent {

  private readonly skillService = inject(SkillService);
  private readonly toastr = inject(ToastrService);

  currentStep = 1;

  skillName = '';
  selectedField = '';

  readonly fieldSuggestions = [
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

  nextStep(): void {

    if (!this.skillName.trim()) {
      this.toastr.warning('Please enter a skill name');
      return;
    }

    this.autoSuggestField();

    this.currentStep = 2;
  }

  previousStep(): void {
    this.currentStep = 1;
  }

  private autoSuggestField(): void {

    const skill = this.skillName.toLowerCase();

    const mapping: Record<string, string> = {
      angular: 'Frontend',
      react: 'Frontend',
      vue: 'Frontend',
      html: 'Frontend',
      css: 'Frontend',
      javascript: 'Frontend',

      java: 'Backend',
      spring: 'Backend',
      node: 'Backend',
      express: 'Backend',

      docker: 'DevOps',
      kubernetes: 'DevOps',
      jenkins: 'DevOps',

      mysql: 'Database',
      mongodb: 'Database',
      postgres: 'Database',

      aws: 'Cloud',
      azure: 'Cloud',
      gcp: 'Cloud',

      python: 'Programming',
      csharp: 'Programming',
      cpp: 'Programming'
    };

    for (const key in mapping) {
      if (skill.includes(key)) {
        this.selectedField = mapping[key];
        return;
      }
    }
  }

  createSkill(): void {

    if (!this.selectedField.trim()) {
      this.toastr.warning('Please select a field');
      return;
    }

    const payload: SkillCreate = {
      name: this.skillName.trim(),
      field: this.selectedField
    };

    this.skillService.createSkill(payload).subscribe({
      next: () => {

        this.toastr.success(
          'Skill created successfully',
          'Success'
        );

        this.resetForm();
      },

      error: (error) => {

        console.error(error);

        this.toastr.error(
          'Failed to create skill',
          'Error'
        );
      }
    });
  }

  private resetForm(): void {

    this.skillName = '';
    this.selectedField = '';
    this.currentStep = 1;
  }
}
