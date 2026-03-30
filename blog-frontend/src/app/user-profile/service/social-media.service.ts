import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SocialMedia, SocialMediaCreation} from "../../models/SocialMedia";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private readonly BASE_URL = 'http://localhost:8083/socials';

  constructor(private http: HttpClient) {}

  createSocialMedia(socialMediaCreation: SocialMediaCreation, email: string): Observable<SocialMedia> {
    const params = new HttpParams().set('email', email);
    return this.http.post<SocialMedia>(`${this.BASE_URL}/`, socialMediaCreation, { params });
  }

  getSocialMediaById(id: string): Observable<SocialMedia> {
    return this.http.get<SocialMedia>(`${this.BASE_URL}/${id}`);
  }

  deleteSocialMediaById(id: any): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getAllSocialMedia(page: number, size: number, email: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('email', email);
    return this.http.get<any>(`${this.BASE_URL}/`, { params });
  }

  updateSocialMediaById(id: any, socialMediaDTO: SocialMedia): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, socialMediaDTO);
  }

  isLinkUsed(link: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/link/${link}`);
  }

  getSocialMediaByType(page: number, size: number, type: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('email', email);
    return this.http.get<any>(`${this.BASE_URL}/type/${type}`, { params });
  }
}
