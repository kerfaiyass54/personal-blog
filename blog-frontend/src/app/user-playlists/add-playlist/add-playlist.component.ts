import {
  Component,
  computed,
  signal,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {PlaylistServicesService} from "../service/playlist-services.service";
import {SoundtrackServicesService} from "../service/soundtrack-services.service";



@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {

  constructor(
    private router: Router,
    private playlistService: PlaylistServicesService,
    private soundtrackService: SoundtrackServicesService
  ) {}



  email = sessionStorage.getItem('email') || '';



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

  searchTerm = signal('');



  /* SOUNDTRACK DATA FROM BACKEND */

  soundtracks = signal<any[]>([]);



  ngOnInit(): void {

    this.loadSoundtracks();

  }



  loadSoundtracks() {

    // this.soundtrackService
    //   .getAllSoundtracks(this.email)
    //   .subscribe(res => {
    //
    //     this.soundtracks.set(res);
    //
    //   });

  }



  cancel() {

    const role = sessionStorage.getItem('role')?.toLowerCase();

    this.router.navigate([`/${role}/playlists`]);

  }



  /* FILTER TABLE */

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

    }

    else {

      this.selectedSoundtracks.set([

        ...list,
        id

      ]);

    }

  }



  /* FINAL PLAYLIST CREATION */

  createPlaylist() {

    const playlistPayload = {
      title: this.title(),
      description: this.description(),
      soundtrackIds: this.selectedSoundtracks()
    };

    this.playlistService
      .createPlaylist(this.email, playlistPayload)
      .subscribe(() => {

        const role = sessionStorage.getItem('role')?.toLowerCase();

        this.router.navigate([`/${role}/playlists`]);

      });

  }

}
