import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoundtrackServicesService {

  private baseUrl = 'http://localhost:8083/users';

  constructor(private http: HttpClient) {}


  // ✅ get total soundtracks count
  getTotalSoundtracks(email: string): Observable<number> {

    return this.http.get<number>(
      `${this.baseUrl}/${email}/soundtracks/total`
    );
  }


  // ✅ get rated soundtracks count
  getRatedSoundtracks(email: string): Observable<number> {

    return this.http.get<number>(
      `${this.baseUrl}/${email}/soundtracks/rated`
    );
  }


  // ✅ get all soundtracks for a user
  getUserSoundtracks(email: string): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/${email}/soundtracks`
    );
  }


  // ✅ create new soundtrack
  createSoundtrack(
    email: string,
    soundtrackData: any
  ): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/${email}/soundtracks`,
      soundtrackData
    );
  }


  // ✅ delete soundtrack
  deleteSoundtrack(
    email: string,
    soundtrackId: string
  ): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${email}/soundtracks/${soundtrackId}`
    );
  }

}
