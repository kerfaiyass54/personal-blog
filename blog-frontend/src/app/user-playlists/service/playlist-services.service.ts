import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistServicesService {

  private baseUrl = 'http://localhost:8083/users';

  constructor(private http: HttpClient) {}



  // ✅ get playlists count
  getPlaylistsCount(email: string): Observable<number> {

    return this.http.get<number>(
      `${this.baseUrl}/${email}/playlists/total`
    );
  }



  // ✅ get total tracks inserted inside playlists
  getInsertedTracksCount(email: string): Observable<number> {

    return this.http.get<number>(
      `${this.baseUrl}/${email}/playlists/tracks/total`
    );
  }



  // ✅ get all playlists
  getPlaylists(email: string): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/${email}/playlists`
    );
  }



  // ✅ create playlist
  createPlaylist(email: string, playlistData: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/${email}/playlists`,
      playlistData
    );
  }



  // ✅ delete playlist
  deletePlaylist(email: string, playlistId: string): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${email}/playlists/${playlistId}`
    );
  }



  // ✅ get soundtracks inside playlist (paginated)
  getPlaylistSoundtracks(
    email: string,
    playlistId: string,
    page: number = 0,
    size: number = 10
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get(
      `${this.baseUrl}/${email}/playlists/${playlistId}/soundtracks`,
      { params }
    );
  }



  // ✅ add soundtrack to playlist
  addSoundtrackToPlaylist(
    email: string,
    playlistId: string,
    soundtrackId: string
  ): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/${email}/playlists/${playlistId}/soundtracks/${soundtrackId}`,
      {}
    );
  }



  // ✅ remove soundtrack from playlist
  removeSoundtrackFromPlaylist(
    email: string,
    playlistId: string,
    soundtrackId: string
  ): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${email}/playlists/${playlistId}/soundtracks/${soundtrackId}`
    );
  }

}
