import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-playlist',
  templateUrl: './dash-playlist.component.html',
  styleUrl: './dash-playlist.component.scss'
})
export class DashPlaylistComponent {

  availableTracks = [

    { id: 100, title: "Skyline", author: "Artist A" },

    { id: 101, title: "Dreamscape", author: "Artist B" },

    { id: 102, title: "Night Drive", author: "Artist C" },

    { id: 103, title: "Echo Waves", author: "Artist D" },

    { id: 104, title: "Neon Lights", author: "Artist E" }

  ];

  selectedTracks: any[] = [];

  prepareTrackSelection() {

    this.selectedTracks = [];

  }


  toggleTrack(track: any) {

    const exists = this.selectedTracks.find(
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


  isSelected(trackId: number) {

    return this.selectedTracks.some(
      t => t.id === trackId
    );

  }


  confirmTrackSelection() {

    if (!this.selectedPlaylist) return;


    this.selectedTracks.forEach(track => {

      const alreadyExists =
        this.selectedPlaylist.tracks.some(
          (t: any) => t.id === track.id
        );

      if (!alreadyExists) {

        this.selectedPlaylist.tracks.push(track);

      }

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

    const modalElement =
      document.getElementById("addTrackModal");

    if (modalElement) {

      const modal =
        new (window as any).bootstrap.Modal(
          modalElement,
          {
            backdrop: "static",
            keyboard: false
          }
        );

      modal.show();

    }

  }

  playlists = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `Playlist ${i + 1}`,
    tracks: [
      { id: i * 3 + 1, title: "Song A", author: "Artist X" },
      { id: i * 3 + 2, title: "Song B", author: "Artist Y" },
      { id: i * 3 + 3, title: "Song C", author: "Artist Z" }
    ]
  }));


  selectedPlaylist: any = null;


  openPlaylist(playlist: any) {

    this.selectedPlaylist = playlist;

  }


  removeTrack(trackId: number) {

    this.selectedPlaylist.tracks =
      this.selectedPlaylist.tracks.filter(
        (t: any) => t.id !== trackId
      );

  }


  addTrack() {

    const newTrack = {
      id: Date.now(),
      title: "New Track",
      author: "Unknown"
    };

    this.selectedPlaylist.tracks.push(newTrack);

  }

}
