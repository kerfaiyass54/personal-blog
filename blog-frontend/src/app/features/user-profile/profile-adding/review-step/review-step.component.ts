import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Interest } from '../../../shared/models/Interest';
import { Nationality } from '../../../shared/models/Nationality';

@Component({
  selector: 'app-review-step',
  standalone: true,
  templateUrl: './review-step.component.html',
  styleUrl: './review-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewStepComponent {
  readonly firstName = input('');
  readonly lastName = input('');
  readonly job = input('');
  readonly birthDate = input('');
  readonly city = input('');
  readonly nationality = input<Nationality | null>(null);
  readonly interests = input<Interest[]>([]);
  readonly initials = input('');

  age(): number {
    const birth = new Date(this.birthDate());
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  formattedDate(): string {
    return this.birthDate() ? new Date(this.birthDate()).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
  }
}
