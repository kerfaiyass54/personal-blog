import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dash-music',
  templateUrl: './dash-music.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './dash-music.component.scss'
})
export class DashMusicComponent {

  constructor(private router: Router) {}

  songs = [
    { id: 1, title: 'Track One', author: 'Artist A', link: 'https://youtube.com' },
    { id: 2, title: 'Track Two', author: 'Artist B', link: 'https://spotify.com' }
  ];

  selectedSong: any;

  activePlatformValue = '';

  search = {
    value: '',
    set: (v: string) => this.search.value = v
  };


  goBack() {

    const role = sessionStorage.getItem('role')?.toLowerCase();

    this.router.navigate(
      [`/${role}/playlists`],
      { replaceUrl: true }
    );

  }


  openSongs(platform: string) {

    this.activePlatformValue = platform;

  }


  activePlatform() {

    return this.activePlatformValue;

  }


  selectSong(song: any) {

    this.selectedSong = song;

  }


  listenSong(song: any) {

    window.open(song.link, '_blank');

  }


  updateSong() {

    console.log('updated:', this.selectedSong);

  }


  deleteSong() {

    this.songs = this.songs.filter(
      s => s.id !== this.selectedSong.id
    );

  }


  spotifyCount() {

    return this.songs.length;

  }


  youtubeCount() {

    return this.songs.length;

  }


  paginatedSongs() {

    return this.songs.filter(song =>
      song.title.toLowerCase()
        .includes(this.search.value.toLowerCase())
    );

  }

}
