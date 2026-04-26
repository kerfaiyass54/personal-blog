import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // ✅ get all soundtracks (DTO)
  getUserSoundtracks(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/${email}/soundtracks`
    );
  }

  // ✅ create new soundtrack
  createSoundtrack(
    email: string,
    soundtrackData: {
      title: string;
      link: string;
      type: any;
    }
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
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${email}/soundtracks/${soundtrackId}`
    );
  }

  /* ✅ NEW: PAGINATED + FILTER BY TYPE */
  getSoundtracksByType(
    email: string,
    type: any,
    page: number = 0,
    size: number = 10
  ): Observable<any> {

    const params = new HttpParams()
      .set('type', type)
      .set('page', page)
      .set('size', size);

    return this.http.get<any>(
      `${this.baseUrl}/${email}/soundtracks/filter`,
      { params }
    );
  }
}
