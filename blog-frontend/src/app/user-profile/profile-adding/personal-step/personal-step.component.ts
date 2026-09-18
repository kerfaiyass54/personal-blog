import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-step',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personal-step.component.html',
  styleUrl: './personal-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalStepComponent {
  readonly firstName = input('');
  readonly lastName = input('');
  readonly job = input('');
  readonly birthDate = input('');
  readonly firstNameChange = output<string>();
  readonly lastNameChange = output<string>();
  readonly jobChange = output<string>();
  readonly birthDateChange = output<string>();
}
