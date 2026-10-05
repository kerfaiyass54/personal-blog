import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../service/profile.service';
import { ProfileAddDTO } from '../../models/ProfileAddDTO';
import { LoginServiceService } from '../../shared/services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { Nationality } from '../../shared/models/Nationality';
import { Interest } from '../../shared/models/Interest';
import { PersonalStepComponent } from './personal-step/personal-step.component';
import { LocationStepComponent } from './location-step/location-step.component';
import { InterestsStepComponent } from './interests-step/interests-step.component';
import { ReviewStepComponent } from './review-step/review-step.component';

@Component({
  selector: 'app-profile-adding',
  standalone: true,
  imports: [CommonModule, PersonalStepComponent, LocationStepComponent, InterestsStepComponent, ReviewStepComponent],
  templateUrl: './profile-adding.component.html',
  styleUrl: './profile-adding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileAddingComponent {
  readonly profileCreated = output<void>();
  readonly currentStep = signal(1);
  readonly visitedSteps = signal(new Set([1]));
  readonly submitting = signal(false);

  readonly firstName = signal('');
  readonly lastName = signal('');
  readonly job = signal('');
  readonly birthDate = signal('');
  readonly city = signal('');
  readonly nationalitySearch = signal('');
  readonly selectedNationality = signal<Nationality | null>(null);
  readonly selectedInterests = signal<Interest[]>([]);

  readonly steps = [
    { number: 1, label: 'Personal' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Interests' },
    { number: 4, label: 'Review' },
  ];

  readonly canProceed = computed(() => {
    switch (this.currentStep()) {
      case 1: return !!this.firstName().trim() && !!this.lastName().trim() && !!this.job().trim() && !!this.birthDate();
      case 2: return !!this.selectedNationality() && !!this.city().trim();
      case 3: return this.selectedInterests().length > 0;
      default: return true;
    }
  });

  readonly avatarInitials = computed(() => `${this.firstName().charAt(0)}${this.lastName().charAt(0)}`.toUpperCase());

  constructor(
    private readonly profileService: ProfileService,
    private readonly loginService: LoginServiceService,
    private readonly toasterService: ToastrService,
  ) {}

  goToStep(step: number): void {
    if (this.visitedSteps().has(step)) this.currentStep.set(step);
  }

  next(): void {
    if (this.currentStep() < this.steps.length && this.canProceed()) {
      const nextStep = this.currentStep() + 1;
      this.currentStep.set(nextStep);
      this.visitedSteps.update((visited) => new Set(visited).add(nextStep));
    }
  }

  previous(): void {
    if (this.currentStep() > 1) this.currentStep.update((step) => step - 1);
  }

  submit(): void {
    const nationality = this.selectedNationality();
    if (!nationality || this.submitting()) return;

    const dto: ProfileAddDTO = {
      firstName: this.firstName().trim(),
      lastName: this.lastName().trim(),
      job: this.job().trim(),
      birthDate: `${this.birthDate()}T00:00:00Z`,
      nationality: nationality.label,
      city: this.city().trim(),
      interests: this.selectedInterests().map((interest) => interest.label),
    };

    const email = sessionStorage.getItem('email');
    if (!email) return;
    this.submitting.set(true);
    this.loginService.getUsername(email).subscribe({
      next: (username) => this.profileService.addProfile(dto, username).subscribe({
        next: () => {
          this.submitting.set(false);
          this.toasterService.success('Profile added', 'Success');
          this.profileCreated.emit();
        },
        error: () => {
          this.submitting.set(false);
          this.toasterService.error('Could not create your profile.', 'Something went wrong');
        },
      }),
      error: () => {
        this.submitting.set(false);
        this.toasterService.error('Could not identify your account.', 'Something went wrong');
      },
    });
  }
}
