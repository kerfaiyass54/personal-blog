import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProfileEditableDTO} from "../../models/ProfileEditableDTO";
import {ProfileAddDTO} from "../../models/ProfileAddDTO";


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private readonly BASE_URL = 'http://localhost:8083/profiles';
  private readonly BASE_URL_USER = 'http://localhost:8083/user';


  constructor(private http: HttpClient) {}

  addProfile(profile: ProfileAddDTO, username: string): Observable<ProfileEditableDTO> {
    const params = new HttpParams().set('username', username);
    return this.http.post<ProfileEditableDTO>(`${this.BASE_URL}/`, profile, { params });
  }

  getProfile(username: string): Observable<ProfileEditableDTO> {
    return this.http.get<ProfileEditableDTO>(`${this.BASE_URL}/${username}`);
  }

  updateProfile(id: string, profile: ProfileEditableDTO): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, profile);
  }

  checkUserProfile(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL_USER}/profile/${username}`);
  }
}
