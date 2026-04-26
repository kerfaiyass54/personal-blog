import { Component, OnInit } from '@angular/core';
import {PlaylistServicesService} from "../service/playlist-services.service";
import {SoundtrackServicesService} from "../service/soundtrack-services.service";


@Component({
  selector: 'app-dash-playlist',
  templateUrl: './dash-playlist.component.html',
  styleUrl: './dash-playlist.component.scss',
  standalone: true,
})
export class DashPlaylistComponent implements OnInit {

  email: string | null = null;

  playlists: any[] = [];

  availableTracks: any[] = [];

  selectedTracks: any[] = [];

  selectedPlaylist: any = null;

  trackToDelete: string | null = null;


  constructor(
    private playlistService: PlaylistServicesService,
    private soundtrackService: SoundtrackServicesService
  ) {}


  ngOnInit(): void {

    this.email = sessionStorage.getItem('email');

    if (!this.email) return;

    this.loadPlaylists();

    this.loadAvailableTracks();

  }


  // ================= LOAD PLAYLISTS =================

  loadPlaylists() {

    this.playlistService
      .getPlaylists(this.email!)
      .subscribe((res: any) => {

        this.playlists = res.map((playlist: any) => ({
          id: playlist.id,
          name: playlist.title,
          tracks: []
        }));

      });

  }


  // ================= LOAD USER SOUNDTRACKS =================

  loadAvailableTracks() {

    this.soundtrackService
      .getUserSoundtracks(this.email!)
      .subscribe((res: any) => {

        this.availableTracks = res;

      });

  }


  // ================= OPEN PLAYLIST =================

  openPlaylist(playlist: any) {

    this.selectedPlaylist = playlist;

    this.playlistService
      .getPlaylistSoundtracks(
        this.email!,
        playlist.id,
        0,
        50
      )
      .subscribe((res: any) => {

        this.selectedPlaylist.tracks =
          res.content.map((track: any) => ({
            id: track.id,
            title: track.title,
            author: track.type
          }));

      });

  }


  // ================= TRACK SELECTION =================

  prepareTrackSelection() {

    this.selectedTracks = [];

  }


  toggleTrack(track: any) {

    const exists =
      this.selectedTracks.find(
        t => t.id === track.id
      );

    if (exists) {

      this.selectedTracks =
        this.selectedTracks.filter(
          t => t.id !== track.id
        );

    }

    else {

      this.selectedTracks.push(track);

    }

  }


  isSelected(trackId: string) {

    return this.selectedTracks.some(
      t => t.id === trackId
    );

  }


  // ================= ADD TRACK TO PLAYLIST =================

  confirmTrackSelection() {

    if (!this.selectedPlaylist) return;


    this.selectedTracks.forEach(track => {

      this.playlistService
        .addSoundtrackToPlaylist(
          this.email!,
          this.selectedPlaylist.id,
          track.id
        )
        .subscribe(() => {

          this.selectedPlaylist.tracks.push({
            id: track.id,
            title: track.title,
            author: track.type
          });

        });

    });


    this.selectedTracks = [];


    const modal =
      document.getElementById("addTrackModal");

    if (modal) {

      (window as any)
        .bootstrap
        .Modal
        .getInstance(modal)
        ?.hide();

    }

  }


  openAddTrackModal() {

    this.prepareTrackSelection();

    const modal =
      document.getElementById("addTrackModal");

    if (!modal) return;

    new (window as any)
      .bootstrap
      .Modal(modal)
      .show();

  }


  // ================= DELETE TRACK =================

  openDeleteModal(trackId: string) {

    this.trackToDelete = trackId;

    const modal =
      document.getElementById("deleteTrackModal");

    if (!modal) return;

    new (window as any)
      .bootstrap
      .Modal(modal)
      .show();

  }


  confirmDeleteTrack() {

    if (
      !this.selectedPlaylist ||
      !this.trackToDelete
    ) return;


    this.playlistService
      .removeSoundtrackFromPlaylist(
        this.email!,
        this.selectedPlaylist.id,
        this.trackToDelete
      )
      .subscribe(() => {

        this.selectedPlaylist.tracks =
          this.selectedPlaylist.tracks.filter(
            (t: any) =>
              t.id !== this.trackToDelete
          );

      });


    this.trackToDelete = null;


    const modal =
      document.getElementById("deleteTrackModal");

    if (modal) {

      (window as any)
        .bootstrap
        .Modal
        .getInstance(modal)
        ?.hide();

    }

  }

}
