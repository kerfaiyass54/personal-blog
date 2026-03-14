import { Component } from '@angular/core';
import {UserProfile} from "../../shared/models/UserProfile";
import {getNationalityByLabel} from "../../shared/utils/countries.utils";
import {getInterestsByLabels} from "../../shared/utils/interests.utils";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent {

  profile: UserProfile = {
    firstName: 'Yassine',
    lastName: 'KERFAI',
    job: 'Full-Stack Developer',
    birthDate: new Date('1997-06-14'),
    nationality: getNationalityByLabel('German')!,
    city: 'Tunis',
    avatarInitials: 'YB',
    interests: getInterestsByLabels([
      'Technology',
      'Photography',
      'Travel',
      'Reading',
      'Music',
      'Design',
    ]),
  };

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
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  onEdit(): void {
    console.log('Edit profile clicked');
  }

  onExport(): void {
    const data = {
      name: `${this.profile.firstName} ${this.profile.lastName}`,
      job: this.profile.job,
      birthDate: this.formattedBirthDate,
      age: this.age,
      nationality: this.profile.nationality.label,
      city: this.profile.city,
      interests: this.profile.interests.map(i => i.label),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.profile.firstName}-${this.profile.lastName}-profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
