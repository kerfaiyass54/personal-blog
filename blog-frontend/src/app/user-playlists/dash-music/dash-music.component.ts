import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-dash-music',
  standalone: true,
  imports: [],
  templateUrl: './dash-music.component.html',
  styleUrl: './dash-music.component.scss',
})
export class DashMusicComponent {

  activePlatform = signal<'SPOTIFY' | 'YOUTUBE' | null>(null);

  search = signal('');

  selectedSong = signal<any>(null);

  page = signal(1);

  pageSize = 5;


  songs = signal([
    { id: 1, title: 'Interstellar', author: 'Hans Zimmer', platform: 'SPOTIFY' },
    { id: 2, title: 'Time', author: 'Hans Zimmer', platform: 'SPOTIFY' },
    { id: 3, title: 'Experience', author: 'Einaudi', platform: 'SPOTIFY' },
    { id: 4, title: 'Cornfield Chase', author: 'Hans Zimmer', platform: 'SPOTIFY' },

    { id: 5, title: 'Numb', author: 'Linkin Park', platform: 'YOUTUBE' },
    { id: 6, title: 'Believer', author: 'Imagine Dragons', platform: 'YOUTUBE' },
    { id: 7, title: 'Faded', author: 'Alan Walker', platform: 'YOUTUBE' }
  ]);


  spotifyCount = computed(() =>
    this.songs().filter(x => x.platform === 'SPOTIFY').length
  );


  youtubeCount = computed(() =>
    this.songs().filter(x => x.platform === 'YOUTUBE').length
  );


  filteredSongs = computed(() => {

    if (!this.activePlatform()) return [];

    return this.songs()
      .filter(song =>
        song.platform === this.activePlatform()
      )
      .filter(song =>
        song.title.toLowerCase().includes(this.search().toLowerCase())
      );

  });


  paginatedSongs = computed(() => {

    const start = (this.page() - 1) * this.pageSize;

    return this.filteredSongs().slice(
      start,
      start + this.pageSize
    );

  });


  openSongs(platform: 'SPOTIFY' | 'YOUTUBE') {

    this.activePlatform.set(platform);

    this.page.set(1);

  }


  selectSong(song: any) {

    this.selectedSong.set(song);

  }


  deleteSong() {

    this.songs.set(
      this.songs().filter(
        s => s.id !== this.selectedSong()?.id
      )
    );

  }


  updateSong() {

    alert('Update modal confirmed (connect API later)');

  }


  listenSong() {

    alert('Redirect to listen page');

  }

}
