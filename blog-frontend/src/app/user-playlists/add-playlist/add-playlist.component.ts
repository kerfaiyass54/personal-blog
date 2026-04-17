import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  cancel() {

    const role = sessionStorage.getItem('role')?.toLowerCase();

    this.router.navigate([`/${role}/playlists`]);

  }

  animationDirection = signal<'forward' | 'backward'>('forward');

  title = signal('');

  description = signal('');

  selectedSoundtracks = signal<string[]>([]);

  searchTerm = signal('');


  /* MOCK DATA */

  soundtracks = signal([
    { id: '1', title: 'Interstellar', author: 'Hans Zimmer' },
    { id: '2', title: 'Time', author: 'Hans Zimmer' },
    { id: '3', title: 'Cornfield Chase', author: 'Hans Zimmer' },
    { id: '4', title: 'Experience', author: 'Ludovico Einaudi' }
  ]);


  /* FILTERED TABLE DATA */

  filteredSoundtracks = computed(() => {

    const term = this.searchTerm().toLowerCase();

    if (!term) return this.soundtracks();

    return this.soundtracks().filter(track =>
      track.title.toLowerCase().includes(term) ||
      track.author.toLowerCase().includes(term)
    );

  });


  /* STEP VALIDATION */

  canProceed(): boolean {

    switch (this.step()) {

      case 1:
        return this.title().trim().length > 0;

      case 2:
        return this.description().trim().length > 0;

      case 3:
        return this.selectedSoundtracks().length > 0;

      default:
        return true;

    }

  }


  nextStep() {

    if (!this.canProceed()) return;

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
