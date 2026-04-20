import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {SoundtrackServicesService} from "../service/soundtrack-services.service";

@Component({
  selector: 'app-dash-music',
  standalone: true,
  templateUrl: './dash-music.component.html',
  styleUrl: './dash-music.component.scss',
  imports: [FormsModule, CommonModule]
})
export class DashMusicComponent implements OnInit {

  constructor(
    private router: Router,
    private soundtrackService: SoundtrackServicesService
  ) {}

  email = sessionStorage.getItem('email') || '';

  songs: any[] = [];

  selectedSong: any;

  activePlatformValue = '';

  search = {
    value: '',
    set: (v: string) => this.search.value = v
  };



  ngOnInit(): void {

    this.loadSoundtracks();

  }



  loadSoundtracks() {

    // this.soundtrackService
    //   .getAllSoundtracks(this.email)
    //   .subscribe(res => {
    //
    //     this.songs = res;
    //
    //   });

  }



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



  deleteSong() {

    this.soundtrackService
      .deleteSoundtrack(this.email, this.selectedSong.id)
      .subscribe(() => {

        this.loadSoundtracks();

      });

  }



  spotifyCount() {

    return this.songs
      .filter(s => s.platform === 'SPOTIFY')
      .length;

  }



  youtubeCount() {

    return this.songs
      .filter(s => s.platform === 'YOUTUBE')
      .length;

  }



  paginatedSongs() {

    return this.songs
      .filter(song =>
        song.platform === this.activePlatformValue
      )
      .filter(song =>
        song.title
          .toLowerCase()
          .includes(this.search.value.toLowerCase())
      );

  }

}
