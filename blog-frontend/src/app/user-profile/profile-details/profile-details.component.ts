import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../shared/models/UserProfile';
import { Nationality } from '../../shared/models/Nationality';
import { Interest } from '../../shared/models/Interest';
import { getNationalityByLabel, getAllNationalities } from '../../shared/utils/countries.utils';
import { getInterestsByLabels, getAllInterests } from '../../shared/utils/interests.utils';
import { ProfileService } from '../service/profile.service';
import { LoginServiceService } from '../../shared/services/login-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {

  profile: UserProfile = {
    firstName: '',
    lastName: '',
    job: '',
    birthDate: new Date(),
    nationality: getNationalityByLabel('Tunisian')!,
    city: '',
    avatarInitials: '',
    interests: [],
  };

  // ── Edit form state ──────────────────────────────────
  editFirstName             = '';
  editLastName              = '';
  editJob                   = '';
  editBirthDate             = '';
  editCity                  = '';
  editNationalitySearch     = '';
  editSelectedNationality: Nationality | null = null;
  editSelectedInterests: Interest[]           = [];

  allNationalities: Nationality[] = getAllNationalities();
  allInterests: Interest[]        = getAllInterests();

  private profileId    = '';
  private modalInstance: any;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginServiceService,
  ) {}

  // ── Lifecycle ────────────────────────────────────────
  ngOnInit(): void {
    const email = sessionStorage.getItem('email');
    this.loginService.getUsername(email).subscribe({
      next: (username) => this.loadProfile(username),
      error: (e) => console.error('Could not resolve username', e),
    });
  }

  private loadProfile(username: string): void {
    this.profileService.getProfile(username).subscribe({
      next: (dto:any) => {
        this.profileId = dto.id;
        this.profile = {
          firstName:      dto.firstName,
          lastName:       dto.lastName,
          job:            dto.job,
          birthDate:      new Date(dto.birthDate),
          nationality:    getNationalityByLabel(dto.nationality) ?? getNationalityByLabel('Tunisian')!,
          city:           dto.city,
          avatarInitials: `${dto.firstName.charAt(0)}${dto.lastName.charAt(0)}`.toUpperCase(),
          interests:      getInterestsByLabels(dto.interestsName),
        };
      },
      error: (e) => console.error('Could not load profile', e),
    });
  }

  // ── Computed ─────────────────────────────────────────
  get age(): number {
    const today = new Date();
    const birth = new Date(this.profile.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  get formattedBirthDate(): string {
    return this.profile.birthDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  }

  get filteredNationalities(): Nationality[] {
    const q = this.editNationalitySearch.toLowerCase();
    return q
      ? this.allNationalities.filter(n => n.label.toLowerCase().includes(q)).slice(0, 8)
      : [];
  }

  // ── Modal ─────────────────────────────────────────────
  onEdit(): void {
    this.editFirstName              = this.profile.firstName;
    this.editLastName               = this.profile.lastName;
    this.editJob                    = this.profile.job;
    this.editBirthDate              = this.profile.birthDate.toISOString().split('T')[0];
    this.editCity                   = this.profile.city;
    this.editSelectedNationality    = this.profile.nationality;
    this.editNationalitySearch      = this.profile.nationality.label;
    this.editSelectedInterests      = [...this.profile.interests];

    const el = document.getElementById('editProfileModal');
    this.modalInstance = new bootstrap.Modal(el);
    this.modalInstance.show();
  }

  selectNationality(n: Nationality): void {
    this.editSelectedNationality = n;
    this.editNationalitySearch   = n.label;
  }

  clearNationality(): void {
    this.editSelectedNationality = null;
    this.editNationalitySearch   = '';
  }

  toggleInterest(interest: Interest): void {
    const idx = this.editSelectedInterests.findIndex(i => i.label === interest.label);
    if (idx > -1) this.editSelectedInterests.splice(idx, 1);
    else          this.editSelectedInterests.push(interest);
  }

  isInterestSelected(interest: Interest): boolean {
    return this.editSelectedInterests.some(i => i.label === interest.label);
  }

  saveChanges(): void {
    const dto = {
      firstName:   this.editFirstName,
      lastName:    this.editLastName,
      job:         this.editJob,
      birthDate:   `${this.editBirthDate}T00:00:00Z`,
      nationality: this.editSelectedNationality?.label ?? this.profile.nationality.label,
      city:        this.editCity,
      interests:   this.editSelectedInterests.map(i => i.label),
    };

    this.profileService.updateProfile(this.profileId, dto).subscribe({
      next: () => {
        // Update local profile
        this.profile.firstName      = this.editFirstName;
        this.profile.lastName       = this.editLastName;
        this.profile.job            = this.editJob;
        this.profile.birthDate      = new Date(this.editBirthDate);
        this.profile.city           = this.editCity;
        this.profile.avatarInitials = `${this.editFirstName.charAt(0)}${this.editLastName.charAt(0)}`.toUpperCase();
        if (this.editSelectedNationality) {
          this.profile.nationality = this.editSelectedNationality;
        }
        this.profile.interests = [...this.editSelectedInterests];
        this.modalInstance?.hide();
      },
      error: (e) => console.error('Update failed', e),
    });
  }

  // ── Export ───────────────────────────────────────────
  onExport(): void {
    const data = {
      name:        `${this.profile.firstName} ${this.profile.lastName}`,
      job:         this.profile.job,
      birthDate:   this.formattedBirthDate,
      age:         this.age,
      nationality: this.profile.nationality.label,
      city:        this.profile.city,
      interests:   this.profile.interests.map(i => i.label),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${this.profile.firstName}-${this.profile.lastName}-profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
