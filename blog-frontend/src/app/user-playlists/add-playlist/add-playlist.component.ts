import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent {

  step = signal(1);

  steps = [
    'Title',
    'Description',
    'Soundtracks',
    'Review'
  ];

  animationDirection = signal<'forward' | 'backward'>('forward');

  title = signal('');

  description = signal('');

  selectedSoundtracks = signal<string[]>([]);


  /* MOCK DATA (replace with API later) */

  soundtracks = signal([
    { id: '1', title: 'Interstellar', author: 'Hans Zimmer' },
    { id: '2', title: 'Time', author: 'Hans Zimmer' },
    { id: '3', title: 'Cornfield Chase', author: 'Hans Zimmer' },
    { id: '4', title: 'Experience', author: 'Ludovico Einaudi' }
  ]);


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


  toggleSoundtrack(id: string) {

    const list = this.selectedSoundtracks();

    if (list.includes(id)) {

      this.selectedSoundtracks.set(
        list.filter(x => x !== id)
      );

    } else {

      this.selectedSoundtracks.set([
        ...list,
        id
      ]);

    }

  }

}
