import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nationality } from '../../../shared/models/Nationality';
import { getAllNationalities } from '../../../shared/utils/countries.utils';

@Component({
  selector: 'app-location-step',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-step.component.html',
  styleUrl: './location-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationStepComponent {
  readonly city = input('');
  readonly search = input('');
  readonly selected = input<Nationality | null>(null);
  readonly cityChange = output<string>();
  readonly searchChange = output<string>();
  readonly selectedChange = output<Nationality>();
  readonly cleared = output<void>();
  readonly nationalities = getAllNationalities();
  readonly filtered = computed(() => {
    const query = this.search().toLowerCase().trim();
    return query ? this.nationalities.filter((item) => item.label.toLowerCase().includes(query)).slice(0, 8) : [];
  });
}
