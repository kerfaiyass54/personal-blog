import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SoundtrackServicesService } from "../service/soundtrack-services.service";

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

  selectedSong: any | null = null;

  activePlatformValue = '';

  spotifyTotal = 0;
  youtubeTotal = 0;

  search = {
    value: '',
    set: (v: string) => this.search.value = v
  };

  ngOnInit(): void {
    this.loadCounts();
  }

  /* ✅ LOAD TOTAL COUNT PER TYPE */
  loadCounts() {

    this.soundtrackService
      .getSoundtracksByType(this.email, 'SPOTIFY', 0, 1)
      .subscribe(res => {
        this.spotifyTotal = res.totalElements;
      });

    this.soundtrackService
      .getSoundtracksByType(this.email, 'YOUTUBE', 0, 1)
      .subscribe(res => {
        this.youtubeTotal = res.totalElements;
      });
  }

  /* ✅ LOAD SONGS BY TYPE */
  loadSongsByType(type: 'SPOTIFY' | 'YOUTUBE') {

    this.soundtrackService
      .getSoundtracksByType(this.email, type, 0, 100)
      .subscribe(res => {
        this.songs = res.content;
      });
  }

  goBack() {
    const role = sessionStorage.getItem('role')?.toLowerCase();
    this.router.navigate([`/${role}/playlists`], { replaceUrl: true });
  }

  openSongs(platform: 'SPOTIFY' | 'YOUTUBE') {
    this.activePlatformValue = platform;
    this.loadSongsByType(platform);
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

    if (!this.selectedSong) return;

    this.soundtrackService
      .deleteSoundtrack(this.email, this.selectedSong.id)
      .subscribe(() => {

        this.loadSongsByType(this.activePlatformValue as any);
        this.loadCounts();

      });
  }

  /* ✅ COUNTS FROM BACKEND */
  spotifyCount() {
    return this.spotifyTotal;
  }

  youtubeCount() {
    return this.youtubeTotal;
  }

  /* ✅ FILTER ONLY (NO PLATFORM FILTER NEEDED ANYMORE) */
  paginatedSongs() {
    return this.songs
      .filter(song =>
        song.title
          .toLowerCase()
          .includes(this.search.value.toLowerCase())
      );
  }

}
