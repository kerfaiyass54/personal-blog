import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Interest } from '../../../shared/models/Interest';
import { getAllInterests } from '../../../shared/utils/interests.utils';

@Component({
  selector: 'app-interests-step',
  standalone: true,
  templateUrl: './interests-step.component.html',
  styleUrl: './interests-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestsStepComponent {
  readonly selected = input<Interest[]>([]);
  readonly selectedChange = output<Interest[]>();
  readonly interests = getAllInterests();

  toggle(interest: Interest): void {
    const selected = this.selected();
    this.selectedChange.emit(
      selected.some((item) => item.label === interest.label)
        ? selected.filter((item) => item.label !== interest.label)
        : [...selected, interest],
    );
  }

  isSelected(interest: Interest): boolean {
    return this.selected().some((item) => item.label === interest.label);
  }
}
