import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PlaylistServicesService } from "./service/playlist-services.service";
import { SoundtrackServicesService } from "./service/soundtrack-services.service";

@Component({
  selector: 'app-user-playlists',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-playlists.component.html',
  styleUrl: './user-playlists.component.scss',
})
export class UserPlaylistsComponent implements OnInit {

  role: string = '';

  email: string | null = null;

  playlistsCount: number = 0;

  playlistTracksCount: number = 0;

  soundtracksCount: number = 0;

  ratedSoundtracksCount: number = 0;

  constructor(
    private playlistService: PlaylistServicesService,
    private soundtrackService: SoundtrackServicesService
  ) {}

  ngOnInit(): void {

    this.role = sessionStorage
      .getItem('role')
      ?.toLowerCase() || '';

    this.email = sessionStorage
      .getItem('email');

    if (!this.email) return;


    // PLAYLISTS COUNT
    this.playlistService
      .getPlaylistsCount(this.email)
      .subscribe(res => {

        this.playlistsCount = res;

      });


    // TRACKS COUNT
    this.playlistService
      .getInsertedTracksCount(this.email)
      .subscribe(res => {

        this.playlistTracksCount = res;

      });


    // SOUNDTRACKS COUNT
    this.soundtrackService
      .getTotalSoundtracks(this.email)
      .subscribe(res => {

        this.soundtracksCount = res;

      });


    // RATED SOUNDTRACKS COUNT
    this.soundtrackService
      .getRatedSoundtracks(this.email)
      .subscribe(res => {

        this.ratedSoundtracksCount = res;

      });

  }

}
