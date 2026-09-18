import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nationality } from '../../shared/models/Nationality';
import { Interest } from '../../shared/models/Interest';
import { getAllNationalities } from '../../shared/utils/countries.utils';
import { ProfileService } from '../service/profile.service';
import { ProfileAddDTO } from '../../models/ProfileAddDTO';
import { getAllInterests } from '../../shared/utils/interests.utils';
import { LoginServiceService } from '../../shared/services/login-service.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile-adding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-adding.component.html',
  styleUrl: './profile-adding.component.scss',
})
export class ProfileAddingComponent {

  currentStep = 1;
  totalSteps  = 4;

  visitedSteps = new Set<number>([1]);

  steps = [
    { number: 1, label: 'Personal'  },
    { number: 2, label: 'Location'  },
    { number: 3, label: 'Interests' },
    { number: 4, label: 'Review'    },
  ];

  // ── Step 1 ──────────────────────────────────────────
  firstName = '';
  lastName  = '';
  job       = '';
  birthDate = '';

  // ── Step 2 ──────────────────────────────────────────
  selectedNationality: Nationality | null = null;
  city                = '';
  nationalitySearch   = '';

  // ── Step 3 ──────────────────────────────────────────
  selectedInterests: Interest[] = [];

  // ── Data sources ────────────────────────────────────
  allNationalities: Nationality[] = getAllNationalities();
  allInterests: Interest[]        = getAllInterests();

  constructor(
    private profileService: ProfileService,
    private loginService: LoginServiceService, private toasterService:ToastrService
  ) {}

  // ── Computed ─────────────────────────────────────────
  get filteredNationalities(): Nationality[] {
    const q = this.nationalitySearch.toLowerCase();
    return q
      ? this.allNationalities.filter(n => n.label.toLowerCase().includes(q))
      : this.allNationalities;
  }

  get avatarInitials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
  }

  get age(): number {
    if (!this.birthDate) return 0;
    const today = new Date();
    const birth = new Date(this.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  get formattedBirthDate(): string {
    if (!this.birthDate) return '';
    return new Date(this.birthDate).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  }

  // ── Navigation ───────────────────────────────────────
  goToStep(step: number): void {
    if (this.visitedSteps.has(step)) {
      this.currentStep = step;
    }
  }

  next(): void {
    if (this.currentStep < this.totalSteps && this.canProceed()) {
      this.currentStep++;
      this.visitedSteps.add(this.currentStep);
    }
  }

  prev(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // ── Validation ───────────────────────────────────────
  canProceed(): boolean {
    switch (this.currentStep) {
      case 1: return !!this.firstName && !!this.lastName && !!this.job && !!this.birthDate;
      case 2: return !!this.selectedNationality && !!this.city;
      case 3: return this.selectedInterests.length > 0;
      default: return true;
    }
  }

  // ── Nationality ──────────────────────────────────────
  selectNationality(n: Nationality): void {
    this.selectedNationality = n;
    this.nationalitySearch   = n.label;
  }

  clearNationality(): void {
    this.selectedNationality = null;
    this.nationalitySearch   = '';
  }

  // ── Interests ────────────────────────────────────────
  toggleInterest(interest: Interest): void {
    const idx = this.selectedInterests.findIndex(i => i.label === interest.label);
    if (idx > -1) {
      this.selectedInterests.splice(idx, 1);
    } else {
      this.selectedInterests.push(interest);
    }
  }

  isInterestSelected(interest: Interest): boolean {
    return this.selectedInterests.some(i => i.label === interest.label);
  }

  // ── Submit ───────────────────────────────────────────
  submit(): void {
    const dto: ProfileAddDTO = {
      firstName:   this.firstName,
      lastName:    this.lastName,
      job:         this.job,
      birthDate:   `${this.birthDate}T00:00:00Z`,
      nationality: this.selectedNationality!.label,
      city:        this.city,
      interests:   this.selectedInterests.map(i => i.label),
    };

    const email = sessionStorage.getItem('email');

    this.loginService.getUsername(email).subscribe({
      next: (username) => {
        this.profileService.addProfile(dto, username).subscribe({
          next: () => {
            window.location.reload();
            this.toasterService.success("SUCCESS","Profile added");
          },
          error: (e) => console.error(e),
        });
      },
      error: (e) => console.error('Could not resolve username', e),
    });
  }
}
