import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-playlists',
  imports: [
    RouterLink
  ],
  templateUrl: './user-playlists.component.html',
  styleUrl: './user-playlists.component.scss',
})
export class UserPlaylistsComponent implements OnInit {

  role: string | undefined = '';

  ngOnInit() {
    this.role = sessionStorage.getItem('role')?.toLowerCase();
  }

}
