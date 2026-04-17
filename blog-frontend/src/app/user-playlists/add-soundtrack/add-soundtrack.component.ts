import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-soundtrack',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-soundtrack.component.html',
  styleUrl: './add-soundtrack.component.scss'
})
export class AddSoundtrackComponent {

  step = signal(1);

  steps = [
    'Type',
    'Link',
    'Metadata',
    'Review'
  ];

  animationDirection = signal<'forward' | 'backward'>('forward');

  selectedType = signal<'SPOTIFY' | 'YOUTUBE'>('SPOTIFY');

  title = signal('');

  author = signal('');

  link = signal('');


  nextStep() {

    if (this.step() < this.steps.length) {

      this.animationDirection.set('forward');

      this.step.update(v => v + 1);

    }

  }


  prevStep() {

    if (this.step() > 1) {

      this.animationDirection.set('backward');

      this.step.update(v => v - 1);

    }

  }


  selectType(type: 'SPOTIFY' | 'YOUTUBE') {

    this.selectedType.set(type);

  }

}
